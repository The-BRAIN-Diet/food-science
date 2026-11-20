import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {createDietaryPathwayIndex} from './lib/dietary-pathway-index.mjs';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {buildRelatedSubstanceIndex} from '../src/data/relatedSubstanceRelationships.mjs';
import {twoRingModel} from '../static/explore/food-wheel/two-ring/wheel.mjs';

// Accept the shared generator's --reference-preview ranking.json for this local view.
const rankingFile = process.argv[2];
if (!rankingFile) throw new Error('Supply the shared reference-preview ranking.json');
const wheelDir = 'static/explore/food-wheel';
const base = JSON.parse(fs.readFileSync(`${wheelDir}/display-network.json`, 'utf8'));
const ranking = JSON.parse(fs.readFileSync(rankingFile, 'utf8'));
if (!ranking.review_only) throw new Error('Use a shared reference-preview ranking');
const open = twoRingModel(base).substances.filter(substance => !substance.hasChords);
const byId = new Map(open.map(item => [item.id, item]));
const mapping = buildInputSubstanceFood(process.cwd(), {
  brs: 'BRS4', analysisCompositionOnly: true, additionalSubstanceIds: [...byId.keys()]
});
const foodDocs = fs.readdirSync('docs/foods').filter(name => /\.mdx?$/.test(name)).map(name => {
  const record = `docs/foods/${name}`;
  const frontMatter = matter(fs.readFileSync(record, 'utf8')).data;
  const id = frontMatter.id ?? path.parse(name).name;
  return {id, title: frontMatter.title ?? id, record, frontMatter};
}).filter(food => !food.frontMatter.retired_identity);
const foods = new Map(foodDocs.map(food => [food.id, food]));
const ranked = [];
const unranked = [];

for (const target of ranking.targets.filter(t => byId.has(t.substance_id) && /^BRS[1-6]$/.test(t.brs))) {
  if (target.hold) continue;
  for (const item of target.selected) {
    const o = item.observation;
    if (!foods.has(item.food_id) || !o.verified || !o.rank_eligible || o.publication_hold ||
        o.measurement_kind === 'sequence-derived estimate' || o.calculation ||
        !Number.isFinite(o.value) || !Number.isFinite(item.relative_power)) continue;
    ranked.push({
      food_id: item.food_id, substance_id: target.substance_id, pm_id: target.pm_id,
      brs: target.brs, status: 'admitted', relative_power: item.relative_power,
      record: o.record, amount: o.value, unit: o.unit, basis: o.basis,
      comparison_group: item.comparison_group
    });
  }
}

const scoredPairs = new Set(ranked.map(row => JSON.stringify([row.food_id, row.substance_id])));
const hidden = new Set(['internal-only', 'excluded-error', 'substance-only']);
const eligible = entry => !hidden.has(entry.public_display) && !entry.ranking_hold && !entry.publication_hold;
for (const source of mapping.food_sources) {
  const substance = byId.get(source.substance_id);
  const food = foods.get(source.food_id);
  if (scoredPairs.has(JSON.stringify([source.food_id, source.substance_id]))) continue;
  if (!substance || !food || !eligible(source) || (source.mapping_status && source.mapping_status !== 'verified')) continue;
  const relations = food.frontMatter.substance_relationships ?? [];
  const cited = relations.some(row => row.substance_id === source.substance_id && row.relationship === 'contains' &&
    eligible(row) && (row.source_url || row.source_reference || row.evidence_source || row.citation_keys?.length));
  const occurrences = source.presence_records.filter(record =>
    record.relationship_type === 'contains' && eligible(record) &&
    /supported|preparation_dependent/i.test(record.presence_status ?? '') &&
    Boolean(record.source_url || record.source_reference || record.citation_keys?.length || cited));
  const measurements = source.observations.filter(record =>
    eligible(record) && record.verified && Boolean(record.source_url || record.source_reference) &&
    (Number.isFinite(record.value) || record.range?.length === 2));
  if (!occurrences.length && !measurements.length) continue;
  unranked.push({
    food_id: source.food_id, substance_id: source.substance_id, brs: substance.primary,
    status: 'documented-unranked', network: 'approved',
    layer: measurements.length ? 'Measured composition, unranked' :
      occurrences.some(record => record.presence_status === 'product_or_preparation_dependent') ?
        'Formulation-dependent composition, unranked' : 'Documented occurrence, unranked',
    record: source.food_record,
    preparation: source.preparation,
    source_urls: [...new Set([...occurrences, ...measurements].map(record => record.source_url).filter(Boolean))]
  });
}
for (const source of buildRelatedSubstanceIndex(foodDocs)) {
  const substance = byId.get(source.related_id);
  if (!substance || !foods.has(source.food_id)) continue;
  unranked.push({
    food_id: source.food_id, substance_id: substance.id, brs: substance.primary,
    status: 'documented-unranked', network: 'approved', direct_containment: false,
    layer: `Related via ${source.intermediate_label} · ${source.relationship_label}`,
    record: foods.get(source.food_id).record, limitation: source.limitation
  });
}
for (const source of base.relatedSources ?? []) {
  if (!byId.has(source.substance_id) || !foods.has(source.food_id) || source.direct_containment !== false) continue;
  unranked.push({
    food_id: source.food_id, substance_id: source.substance_id, brs: source.brs, pm_id: source.pm_id,
    status: 'documented-unranked', network: 'approved', direct_containment: false,
    layer: source.layer, record: foods.get(source.food_id).record,
    limitation: source.limitations?.[0]
  });
}
const linked = new Set([...ranked, ...unranked].map(row => row.substance_id));
const remaining = new Set([...byId.keys()].filter(id => !linked.has(id)));
const {paths} = createDietaryPathwayIndex(process.cwd());
for (const pathway of paths) {
  const brs = pathway.pm.match(/^BRS[1-6](?=-)/)?.[0];
  if (!brs || !remaining.has(pathway.target_id) ||
      pathway.pm_specific_status !== 'admitted-derived-pathway') continue;
  for (const source of pathway.food_targets) {
    if (!foods.has(source.food_id) || !eligible(source) || source.mapping_status !== 'verified' ||
        source.delivery !== 'precursor-source' || source.substance_id !== pathway.substance_id) continue;
    const formulation = source.presence_records.some(row => row.presence_status === 'product_or_preparation_dependent');
    unranked.push({
      food_id: source.food_id, substance_id: pathway.target_id, pm_id: pathway.pm, brs,
      status: 'documented-unranked', network: 'approved', direct_containment: false,
      layer: `Endogenous conversion via ${pathway.input}${formulation ? ' (formulation-dependent)' : ''}`,
      precursor_id: pathway.substance_id, record: source.food_record,
      pathway_record: pathway.conversion_pathway[0].record,
      preparation: source.preparation, material: source.material,
      limitation: pathway.conversion_pathway.at(-1).limitations
    });
  }
}

const research = JSON.parse(fs.readFileSync('system/food-target-research.json', 'utf8'));
for (const source of research.targets) {
  if (source.substance_id !== 'l-carnitine' || !remaining.has(source.substance_id) ||
      !foods.has(source.food_id) || !eligible(source) || source.status !== 'research-supported-provisional' ||
      source.evidence?.kind !== 'primary-food-composition' || !source.evidence.sources?.length) continue;
  unranked.push({
    food_id: source.food_id, substance_id: source.substance_id, pm_id: source.pm_ids[0], brs: 'BRS4',
    status: 'documented-unranked', network: 'provisional', direct_containment: true,
    layer: 'Provisional direct occurrence · cut and preparation unresolved',
    record: 'system/food-target-research.json',
    material: source.material, preparation: source.preparation, limitation: source.limitations,
    source_urls: source.evidence.sources
  });
}

const keys = new Set([...ranked, ...unranked].map(row => row.food_id));
const audit = open.map(substance => {
  const targets = ranking.targets.filter(t => t.substance_id === substance.id && /^BRS[1-6]$/.test(t.brs));
  return {
    substance: substance.id,
    ranked_foods: [...new Set(ranked.filter(r => r.substance_id === substance.id).map(r => r.food_id))].sort(),
    documented_foods: [...new Set(unranked.filter(r => r.substance_id === substance.id).map(r => r.food_id))].sort(),
    ranking_holds: [...new Set(targets.map(t => t.hold).filter(Boolean))]
  };
});
const result = {
  ranking_snapshot_id: ranking.snapshot_id, audit,
  foods: [...keys].sort().map(id => ({id, title: foods.get(id).title, page: `/docs/foods/${id}`})),
  ranked, unranked
};
fs.writeFileSync(`${wheelDir}/two-ring/canonical-links.json`, JSON.stringify(result, null, 2)+'\n');
for (const row of audit) console.log(row.substance, row.ranked_foods.length, row.documented_foods.join(', ') || '—');
