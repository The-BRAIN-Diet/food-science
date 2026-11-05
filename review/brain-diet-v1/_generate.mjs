/**
 * Read-only reporting extractor for the V1 food-target audit.
 * Does not write scientific records. Emits Markdown annexes and a summary JSON.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { buildInputSubstanceFood } from '../../scripts/lib/input-substance-food.mjs';
import { RELATED_SUBSTANCE_RELATIONSHIPS } from '../../src/data/relatedSubstanceRelationships.mjs';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname)), '../..');
const outDir = path.join(root, 'review/brain-diet-v1');
const SCOPES = ['BRS1', 'BRS2', 'BRS3', 'BRS4', 'BRS5', 'BRS6', 'BRS-X'];

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'review') continue;
      walk(full, acc);
    } else if (entry.name.endsWith('.mdx')) acc.push(full);
  }
  return acc;
}

function systemOf(file, parent) {
  const rel = file.split('biological-targets/')[1] || '';
  if (rel.startsWith('brs-x/circadian/')) return 'Cross-BRS · Circadian';
  if (rel.startsWith('brs-x/ecs/')) return 'Cross-BRS · Endocannabinoid';
  if (rel.startsWith('brs-x/hormones/')) return 'Cross-BRS · Hormones';
  const brs = String(parent || '').match(/BRS[1-6]/)?.[0];
  if (brs) return brs;
  const fromPath = rel.match(/^(brs[1-6])\//i)?.[1];
  return fromPath ? fromPath.toUpperCase() : 'Unassigned';
}

function esc(value) {
  return String(value ?? '').replace(/\|/g, '/').replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function link(label, repoPath) {
  if (!repoPath) return esc(label);
  const rel = repoPath.startsWith('docs/') ? repoPath : repoPath.replace(/^\/docs\//, 'docs/').replace(/\/$/, '');
  const file = rel.endsWith('.md') || rel.endsWith('.mdx') ? rel : `${rel}.md`;
  return `[${esc(label)}](${file})`;
}

function formKey(material, preparation, title) {
  const text = `${material || ''} ${preparation || ''} ${title || ''}`;
  if (/\b(dried|dehydrated|dry roasted|powder|flour|mature seeds)\b/i.test(text)) return 'dry-form';
  return 'as-recorded';
}
function comparableBasis(basis) {
  const text = String(basis || '').replace(/\s+/g, ' ').trim();
  if (!/per\s*100\s*(g|ml)/i.test(text)) return null;
  return text.toLowerCase();
}
function groupKey(substanceId, unit, basis, material, preparation, title) {
  const comparable = comparableBasis(basis);
  if (!comparable) return null;
  return [substanceId, String(unit || '').toLowerCase(), comparable, formKey(material, preparation, title)].join('||');
}

function pointValue(obs) {
  if (!obs?.verified) return null;
  if (Array.isArray(obs.range) && obs.range.length === 2 && obs.range[0] !== obs.range[1]) return null;
  if (Number.isFinite(obs.value)) return obs.value;
  return null;
}

function quantityText(obs) {
  if (Array.isArray(obs.range) && obs.range.length === 2 && obs.range[0] !== obs.range[1]) {
    return `${obs.range[0]}–${obs.range[1]} ${obs.unit || ''}`.trim();
  }
  if (Number.isFinite(obs.value)) return `${obs.value} ${obs.unit || ''}`.trim();
  return obs.display || 'value not known';
}

function originOf(data) {
  const tags = (data?.tags || []).map((tag) => String(tag).toLowerCase());
  if (tags.includes('vegan')) return 'plant';
  return 'animal or mixed';
}

const pmFiles = walk(path.join(root, 'docs/biological-targets')).filter((file) => !file.includes(`${path.sep}review${path.sep}`));
const pms = [];
for (const file of pmFiles) {
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  if (!parsed.data?.pm_id) continue;
  const repo = path.relative(root, file);
  pms.push({
    file: repo,
    pm_id: parsed.data.pm_id,
    title: parsed.data.title || parsed.data.pm_id,
    parent_brs: parsed.data.parent_brs || '',
    system: systemOf(file, parsed.data.parent_brs),
    mission: parsed.data.mission_anchor || parsed.data.mission || '',
    dietary: parsed.data.dietary_input_traceability || [],
    atoms: parsed.data.dietary_lever_atoms || [],
    presentations: parsed.data.dietary_lever_presentations || [],
    sops: parsed.data.system_optimisation_practices || [],
    lifestyle: parsed.data.lifestyle_priorities || [],
    candidates: parsed.data.practice_candidate_adjudications || [],
    findings: parsed.data.scientific_findings || parsed.data.findings || [],
  });
}

const relationships = [];
const foodSources = new Map();
const patternCandidates = [];
for (const brs of SCOPES) {
  const built = buildInputSubstanceFood(root, { brs });
  relationships.push(...built.relationships.map((row) => ({ ...row, build_scope: brs })));
  for (const source of built.food_sources) {
    const key = [source.food_id, source.substance_id, source.preparation || '', source.material || ''].join('::');
    if (!foodSources.has(key)) foodSources.set(key, source);
  }
  patternCandidates.push(...(built.pattern_candidates || []).map((row) => ({ ...row, build_scope: brs })));
}

const foodMeta = new Map();
for (const file of fs.readdirSync(path.join(root, 'docs/foods')).filter((name) => name.endsWith('.md'))) {
  const data = matter(fs.readFileSync(path.join(root, 'docs/foods', file), 'utf8')).data;
  foodMeta.set(data.id || file.replace(/\.md$/, ''), { title: data.title, origin: originOf(data), file: `docs/foods/${file}` });
}

const blockedIds = new Set();
for (const pm of pms) {
  for (const atom of pm.dietary) {
    if (atom.canonical_identity?.status === 'missing-substance' || atom.canonical_identity?.projection_status === 'blocked') {
      blockedIds.add(`${pm.pm_id}::${atom.atom_id}`);
    }
  }
}
const pmById = new Map(pms.map((pm) => [pm.pm_id, pm]));
function pmForRelationship(rel) {
  return pmById.get(rel.pm) || pms.find((pm) => rel.pm_page && pm.file.endsWith(String(rel.pm_page).split('/').pop() + '.mdx'));
}

const admitted = relationships.filter((rel) => rel.dietary_input === true);
const nonInputs = relationships.filter((rel) => rel.dietary_input !== true);

function observationsOf(source) {
  return [...(source.observations || []), ...(source.presence_records || [])];
}

function verifiedObservations(source) {
  return observationsOf(source).filter((obs) => obs.verified);
}

const groups = new Map();
for (const source of foodSources.values()) {
  for (const obs of verifiedObservations(source)) {
    const point = pointValue(obs);
    const kind = point == null ? (Array.isArray(obs.range) ? 'span' : 'presence') : 'point';
    if (kind !== 'point') continue;
    const key = groupKey(source.substance_id, obs.unit, obs.basis, obs.material || source.material, obs.preparation || source.preparation, source.food_title);
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({
      food_id: source.food_id,
      food_title: source.food_title,
      substance_id: source.substance_id,
      preparation: obs.preparation || source.preparation || '',
      material: obs.material || source.material || '',
      value: point,
      unit: obs.unit,
      basis: obs.basis,
      record: obs.record || obs.source_record || source.food_record,
      source_url: obs.source_url || '',
      source_reference: obs.source_reference || '',
    });
  }
}

const ranked = new Map();
for (const [key, rows] of groups) {
  const seen = new Set();
  const uniqueRows = rows.filter((row) => {
    const id = [row.food_id, row.value, row.unit, row.basis, row.preparation || '', row.material || ''].join('|');
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  const max = Math.max(...uniqueRows.map((row) => row.value));
  const sorted = uniqueRows
    .map((row) => ({ ...row, rsp: max > 0 ? Math.round((1000 * row.value) / max) / 10 : null, max }))
    .sort((a, b) => b.value - a.value || a.food_title.localeCompare(b.food_title));
  sorted.forEach((row, index) => { row.rank = index + 1; row.group_size = sorted.length; });
  ranked.set(key, sorted);
}

function bestRank(foodId, substanceId, preparation, unit, basis, value, material, title) {
  const key = groupKey(substanceId, unit, basis, material, preparation, title) || '';
  const rows = ranked.get(key) || [];
  const match = rows.find((row) => row.food_id === foodId && row.value === value && (row.preparation || '') === (preparation || ''));
  return match || null;
}

function substanceLabel(rel) {
  return rel.input || rel.substance_id || 'Unresolved input';
}

const directRows = [];
const provisionalRows = [];
const blockedRows = [];
for (const rel of admitted) {
  if (rel.scientific_admission !== 'admitted') continue;
  const pm = pmForRelationship(rel);
  const blocked = blockedIds.has(rel.id);
  const classification = rel.relationship_type?.classification || 'unclassified';
  const mode = rel.relationship_type?.mode || '';
  for (const food of rel.food_targets || []) {
    const meta = foodMeta.get(food.food_id) || { title: food.food_title, origin: 'unclassified', file: food.food_record };
    if (food.mapping_status && food.mapping_status !== 'verified') {
      provisionalRows.push({ food: meta.title || food.food_title, substance: substanceLabel(rel), pm: pm?.pm_id || rel.pm, status: food.mapping_status, preparation: food.preparation || '' });
      continue;
    }
    if (blocked) {
      blockedRows.push({ food: meta.title || food.food_title, substance: substanceLabel(rel), pm: pm?.pm_id || rel.pm, relationship_id: rel.id });
      continue;
    }
    const observations = (food.observations || []).filter((obs) => obs.verified);
    const usable = observations.length ? observations : [{ display: 'value not known', verified: false }];
    for (const obs of usable) {
      const point = pointValue(obs);
      const rank = point == null ? null : bestRank(food.food_id, food.substance_id || rel.substance_id, obs.preparation || food.preparation, obs.unit, obs.basis, point, obs.material || food.material, meta.title || food.food_title);
      directRows.push({
        food_id: food.food_id,
        food_title: meta.title || food.food_title,
        food_file: meta.file || food.food_record,
        origin: meta.origin,
        system: pm?.system || rel.brs,
        pm_id: pm?.pm_id || rel.pm,
        pm_title: pm?.title || rel.pm,
        pm_file: pm?.file || '',
        substance_id: food.substance_id || rel.substance_id,
        substance: substanceLabel(rel),
        route: classification === 'derived' ? 'derived' : 'direct',
        type: mode === 'state-regulation' ? 'Type B' : mode === 'capacity-requirement' ? 'Type A' : classification,
        quantity: obs.verified ? quantityText(obs) : 'value not known',
        unit: obs.unit || '',
        basis: obs.basis || '',
        preparation: obs.preparation || food.preparation || '',
        record: obs.record || obs.source_record || food.food_record,
        source_url: obs.source_url || '',
        rsp: rank?.rsp ?? null,
        rank: rank ? (rank.group_size === 1 ? 'sole source' : `#${rank.rank} of ${rank.group_size}`) : (obs.verified && Array.isArray(obs.range) ? 'unranked span' : 'unranked'),
        group_size: rank?.group_size || 0,
        scientific_admission: rel.scientific_admission,
        identity_status: rel.identity_status,
        relationship_id: rel.id,
      });
    }
  }
}

const relatedNotes = [];
for (const rel of relationships) {
  const edges = RELATED_SUBSTANCE_RELATIONSHIPS.filter((edge) => edge.related_id === rel.substance_id || edge.related_label === rel.input);
  for (const edge of edges) {
    for (const source of foodSources.values()) {
      if (source.substance_id !== edge.intermediate_id) continue;
      const verified = verifiedObservations(source);
      if (!verified.length) continue;
      const pm = pmForRelationship(rel);
      relatedNotes.push({
        food_title: source.food_title,
        food_id: source.food_id,
        intermediate: edge.intermediate_label,
        intermediate_id: edge.intermediate_id,
        related: edge.related_label,
        related_id: edge.related_id,
        dietary_input: rel.dietary_input,
        scientific_admission: rel.scientific_admission,
        pm_id: pm?.pm_id || rel.pm,
        system: pm?.system || rel.brs,
        quantity: quantityText(verified[0]),
        basis: verified[0].basis || '',
        relationship: edge.relationship_type,
        note: 'Quantity is the intermediate substance. It is not a yield of the related metabolite.',
      });
    }
  }
}

const admittedSubstanceIds = new Set(admitted.map((rel) => rel.substance_id).filter(Boolean));
const relatedAdmittedRows = [];
for (const note of relatedNotes) {
  if (note.dietary_input !== true || note.scientific_admission !== 'admitted') continue;
  if ([...blockedIds].some((id) => id.startsWith(`${note.pm_id}::`) && admitted.some((rel) => rel.id === id && rel.substance_id === note.related_id))) continue;
  const alreadyDirect = directRows.some((row) => row.food_id === note.food_id && row.pm_id === note.pm_id && row.substance_id === note.related_id);
  if (alreadyDirect) continue;
  const meta = foodMeta.get(note.food_id) || { origin: 'unclassified', file: '' };
  const obs = [...foodSources.values()].find((source) => source.food_id === note.food_id && source.substance_id === note.intermediate_id);
  const verified = obs ? verifiedObservations(obs) : [];
  for (const item of verified) {
    const point = pointValue(item);
    const rank = point == null ? null : bestRank(note.food_id, note.intermediate_id, item.preparation || obs.preparation, item.unit, item.basis, point, item.material || obs.material, note.food_title);
    relatedAdmittedRows.push({
      food_id: note.food_id,
      food_title: note.food_title,
      food_file: meta.file,
      origin: meta.origin,
      system: note.system,
      pm_id: note.pm_id,
      pm_title: pmById.get(note.pm_id)?.title || note.pm_id,
      pm_file: pmById.get(note.pm_id)?.file || '',
      substance_id: note.intermediate_id,
      substance: `${note.intermediate} (related route toward ${note.related})`,
      route: 'related',
      type: 'related',
      quantity: quantityText(item),
      unit: item.unit || '',
      basis: item.basis || '',
      preparation: item.preparation || '',
      record: item.record || item.source_record || '',
      source_url: item.source_url || '',
      rsp: rank?.rsp ?? null,
      rank: rank ? (rank.group_size === 1 ? 'sole source' : `#${rank.rank} of ${rank.group_size}`) : 'unranked span',
      group_size: rank?.group_size || 0,
      scientific_admission: note.scientific_admission,
      identity_status: '',
      relationship_id: `${note.intermediate_id}->${note.related_id}`,
    });
  }
}

const inventory = [...directRows, ...relatedAdmittedRows];

const foodPm = new Map();
for (const row of inventory) {
  if (!foodPm.has(row.food_id)) foodPm.set(row.food_id, { title: row.food_title, origin: row.origin, file: row.food_file, pms: new Set(), systems: new Set(), targets: new Set(), rows: [] });
  const bucket = foodPm.get(row.food_id);
  bucket.pms.add(row.pm_id);
  bucket.systems.add(row.system);
  bucket.targets.add(row.substance_id || row.substance);
  bucket.rows.push(row);
}

const substanceName = new Map();
for (const rel of relationships) {
  if (!rel.substance_id || !rel.input) continue;
  const current = substanceName.get(rel.substance_id);
  if (!current || rel.input.length < current.length) substanceName.set(rel.substance_id, rel.input);
}
function targetName(id) {
  return substanceName.get(id) || id;
}
const topFoods = [...foodPm.values()].sort((a, b) => b.pms.size - a.pms.size || a.title.localeCompare(b.title));

function filterGroup(key) {
  const rows = ranked.get(key) || [];
  const kept = rows.filter((row) => row.rsp >= 10).slice(0, 5);
  return { all: rows.length, kept: kept.length, below: rows.filter((row) => row.rsp < 10).length, sole: rows.length === 1 };
}

const substanceGroups = new Map();
for (const [key, rows] of ranked) {
  const [substance] = key.split('||');
  if (![...admitted].some((rel) => rel.substance_id === substance)) continue;
  if (!substanceGroups.has(substance)) substanceGroups.set(substance, []);
  substanceGroups.get(substance).push({ key, rows, ...filterGroup(key) });
}

function sopDimensions(text) {
  const value = String(text || '').toLowerCase();
  return {
    preparation: /prepar|cook|soak|sprout|grind|raw|chill|heat|processing/.test(value),
    matrix: /matrix|co-ingest|meal context|fat-soluble|with fat|synerg/.test(value),
    timing: /timing|sequence|before meal|after meal|fast|meal order|feeding time/.test(value),
    fermentation: /ferment/.test(value),
  };
}

const pmReports = pms.map((pm) => {
  const rels = relationships.filter((rel) => rel.pm === pm.pm_id || (pmForRelationship(rel)?.pm_id === pm.pm_id));
  const admittedRels = rels.filter((rel) => rel.dietary_input === true);
  const foods = inventory.filter((row) => row.pm_id === pm.pm_id);
  const quantified = foods.filter((row) => row.quantity !== 'value not known');
  const flags = [];
  const projectedAdmitted = admittedRels.filter((rel) => rel.scientific_admission === 'admitted' && !blockedIds.has(rel.id));
  const blockedAdmitted = admittedRels.filter((rel) => blockedIds.has(rel.id));
  if (!admittedRels.length) flags.push('No currently admitted dietary contribution');
  else if (quantified.length) flags.push('Ready for V1 dietary extraction');
  if (blockedAdmitted.length || projectedAdmitted.some((rel) => !(rel.food_targets || []).some((food) => food.mapping_status === 'verified') || rel.identity_status !== 'resolved')) flags.push('Food composition/ontology incomplete');
  const sopText = [...pm.sops, ...pm.candidates].map((item) => [item.input, item.optimisation_category, item.biological_role, item.reader_description, item.rationale, item.remaining_gap].join(' ')).join(' ');
  const dims = sopDimensions(sopText);
  const missingDims = Object.entries(dims).filter(([, present]) => !present).map(([name]) => name);
  if (!pm.sops.length || missingDims.length) flags.push('SOP research incomplete');
  if (!pm.lifestyle.length) flags.push('Lifestyle research incomplete');
  if (admittedRels.some((rel) => rel.scientific_admission && rel.scientific_admission !== 'admitted')) flags.push('Mechanistic/Scientific Finding reassessment needed');
  return { ...pm, admittedRels, flags, quantified: quantified.length, foodLinks: foods.length, dims, missingDims };
});

const systems = [...new Set(pms.map((pm) => pm.system))].sort();

function mdTable(headers, rows) {
  const head = `| ${headers.join(' | ')} |`;
  const rule = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${row.map(esc).join(' | ')} |`).join('\n');
  return [head, rule, body].filter(Boolean).join('\n');
}

function rowLine(row) {
  return [
    link(row.food_title, row.food_file),
    row.origin,
    row.substance,
    row.route,
    row.quantity,
    row.basis || 'basis not stated',
    row.preparation || 'not stated',
    row.rsp == null ? '—' : String(row.rsp),
    row.rank,
    row.system,
    link(row.pm_id, row.pm_file),
    'Not established',
  ];
}

const headers = ['Food', 'Origin', 'Target substance', 'Route', 'Quantity', 'Basis', 'Preparation', 'RSP', 'Rank', 'System', 'PM', 'Target dose'];

let annexA = `# Annex A — Foods by BRS and Cross-BRS\n\nBaseline: published \`main\` at \`87b8f11d\` (pull request #229). RSP is a reporting calculation. It is not an approved production ranking. A food is listed when an admitted dietary input (\`dietary_input: true\`) resolves to that food, or when a registered one-hop related-substance route reaches an admitted target and the food has no direct observation of that target. The quantity on a related row is the intermediate substance.\n\nRSP = 100 × food concentration / highest verified point concentration in the same substance, unit, basis and food form. Dry-form records (dried, dehydrated, powder, flour, or mature seeds) are not ranked against foods recorded as prepared or fresh. Measurement spans stay unranked. Presence-only records stay unranked. A blank basis does not receive an RSP. The provisional reporting filter keeps at most five foods with RSP at least 10 and does not fill empty places. A sole source is the only verified point in that group; its RSP of 100 is not a comparison with foods on another basis.\n\n`;
for (const system of systems) {
  const rows = inventory.filter((row) => row.system === system);
  const foods = new Set(rows.map((row) => row.food_id));
  const pmCount = pms.filter((pm) => pm.system === system).length;
  annexA += `## ${system}\n\nPrimary mechanisms inspected: ${pmCount}. Food rows connected to an admitted input: ${rows.length}. Distinct foods: ${foods.size}.\n\n`;
  if (!rows.length) {
    annexA += 'No admitted dietary food row resolves in this grouping.\n\n';
    continue;
  }
  const seen = new Set();
  const compact = [];
  for (const row of rows.sort((a, b) => a.substance.localeCompare(b.substance) || (b.rsp ?? -1) - (a.rsp ?? -1) || a.food_title.localeCompare(b.food_title))) {
    const key = [row.food_id, row.substance_id, row.quantity, row.basis, row.preparation, row.route].join('|');
    if (seen.has(key)) continue;
    seen.add(key);
    compact.push(rowLine(row));
  }
  annexA += mdTable(headers, compact) + '\n\n';
}

let annexB = `# Annex B — Consolidated food inventory\n\nOne food can appear under more than one substance. PM appearances count distinct primary mechanisms. Sections 1.1 and 3.1 of the same atom are one relationship. RSP values are not added together. PM-specific target dose / effective intake: **Not established** for every row.\n\nPlant origin follows the food page tag \`Vegan\`. Pages without that tag are recorded as animal or mixed. That is a page classification, not a new biological claim.\n\n## Foods by distinct PM appearances\n\n`;
annexB += mdTable(
  ['Food', 'Origin', 'PM appearances', 'Systems', 'Unique targets'],
  topFoods.map((food) => [link(food.title, food.file), food.origin, String(food.pms.size), [...food.systems].sort().join(', '), [...food.targets].map(targetName).sort().join('; ')]),
);
annexB += '\n\n## Comparison groups\n\nEach group is one substance, one unit and one exact basis. The filter column marks the provisional reporting subset (RSP at least 10, at most five). Foods below that line remain in the distribution.\n\n';
for (const [substance, bundles] of [...substanceGroups.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const label = admitted.find((rel) => rel.substance_id === substance)?.input || substance;
  annexB += `### ${label}\n\n`;
  for (const bundle of bundles) {
    const [, unit, basis, form] = bundle.key.split('||');
    const keptIds = new Set(bundle.rows.filter((row) => row.rsp >= 10).slice(0, 5).map((row) => `${row.food_id}|${row.value}|${row.preparation}`));
    annexB += `Basis \`${basis}\`, unit \`${unit}\`, form \`${form}\`. Verified point foods: ${bundle.all}. Provisional filter keeps ${bundle.kept}. Below RSP 10: ${bundle.below}.\n\n`;
    annexB += mdTable(
      ['Food', 'Preparation', 'Quantity', 'RSP', 'Rank', 'Provisional filter'],
      bundle.rows.map((row) => [
        row.food_title,
        row.preparation || 'not stated',
        `${row.value} ${row.unit}`,
        String(row.rsp),
        row.group_size === 1 ? 'sole source' : `#${row.rank} of ${row.group_size}`,
        keptIds.has(`${row.food_id}|${row.value}|${row.preparation}`) ? 'kept' : 'shown, outside the five',
      ]),
    );
    annexB += '\n\n';
  }
}

const unrankedSpans = [];
for (const source of foodSources.values()) {
  if (!admittedSubstanceIds.has(source.substance_id)) continue;
  for (const obs of verifiedObservations(source)) {
    if (pointValue(obs) != null) continue;
    if (!Array.isArray(obs.range)) continue;
    unrankedSpans.push([source.food_title, admitted.find((rel) => rel.substance_id === source.substance_id)?.input || source.substance_id, quantityText(obs), obs.basis || '', obs.preparation || 'not stated', 'unranked span']);
  }
}
annexB += `## Verified spans left unranked\n\nThese records are quantitative and verified. They are not converted to a midpoint and they do not receive an RSP.\n\n`;
annexB += unrankedSpans.length ? mdTable(['Food', 'Substance', 'Span', 'Basis', 'Preparation', 'RSP'], unrankedSpans) : 'None.\n';
annexB += `\n\n## Projection blocked by the mechanism record\n\nThese foods were attached by the registry resolution while the primary-mechanism atom still says \`missing-substance\` and \`projection_status: blocked\`. They are not in the extraction inventory above.\n\n`;
annexB += blockedRows.length
  ? mdTable(['Food', 'Substance', 'PM', 'Relationship'], blockedRows.map((row) => [row.food, row.substance, row.pm, row.relationship_id]))
  : 'None.\n';
annexB += `\n\n## Research-supported provisional foods\n\nProvisional mappings stay out of the RSP groups. A provisional row is not a verified contains record.\n\n`;
annexB += provisionalRows.length
  ? mdTable(['Food', 'Substance', 'PM', 'Mapping', 'Preparation'], provisionalRows.map((row) => [row.food, row.substance, row.pm, row.status, row.preparation || 'not stated']))
  : 'None.\n';
annexB += '\n\n## Registered related pathways that are not admitted metabolite delivery\n\n';
const relatedUnadmitted = [];
const seenRelated = new Set();
for (const note of relatedNotes) {
  if (note.dietary_input === true && note.scientific_admission === 'admitted') continue;
  const key = [note.food_id, note.intermediate_id, note.related_id, note.pm_id].join('|');
  if (seenRelated.has(key)) continue;
  seenRelated.add(key);
  relatedUnadmitted.push([note.food_title, note.intermediate, note.quantity, note.basis, note.related, note.pm_id, note.dietary_input === false ? 'dietary input false' : 'admission unresolved', note.relationship]);
}
annexB += relatedUnadmitted.length
  ? mdTable(['Food', 'Measured substance', 'Quantity', 'Basis', 'Related target', 'PM', 'Admission', 'Edge'], relatedUnadmitted)
  : 'None.\n';
annexB += '\n\nThe quantity column is the measured intermediate. No butyrate, acetate, propionate, retinoic acid or urolithin yield is stated.\n';

let annexC = `# Annex C — Dietary patterns, SOPs and lifestyle levers\n\nStructured records are the authority. An empty SOP list means no SOP is admitted. It does not mean the intervention question was investigated and closed. Candidate adjudications are included where a PM recorded a decision.\n\nStudied pattern component, verified food composition and independently demonstrated food effect stay separate.\n\n## Dietary patterns named on primary mechanisms\n\n`;
const patternRels = relationships.filter((rel) => /pattern/i.test(rel.input_type || '') || /pattern/i.test(rel.input || ''));
annexC += patternRels.length
  ? mdTable(['PM', 'Input', 'Type', 'Dietary input', 'Scientific admission', 'Foods resolved'], patternRels.map((rel) => {
      const pm = pmForRelationship(rel);
      return [pm?.pm_id || rel.pm, rel.input, rel.input_type || '', String(rel.dietary_input), rel.scientific_admission || '', String(rel.food_targets?.length || 0)];
    }))
  : 'No primary-mechanism input is typed as a dietary pattern.\n';
annexC += `\n\nSingle-food macronutrient rows exist as pattern candidates inside the composition builder (${patternCandidates.length} candidate rows across the seven builds). A single food’s carbohydrate and protein figures do not establish a meal pattern. They are not promoted here.\n\n## System optimisation practices\n\n`;
const sopRows = [];
for (const pm of pms) {
  if (!pm.sops.length) continue;
  for (const sop of pm.sops) {
    sopRows.push([
      pm.pm_id,
      sop.atom_id || '',
      sop.input || '',
      sop.optimisation_category || '',
      sop.food_strategy_scope || '',
      (sop.evidence_source?.finding_ids || []).join(', ') || 'no finding id',
      (sop.evidence_source?.citation_keys || []).join(', ') || 'no citation key',
      String(sop.dietary_input),
    ]);
  }
}
annexC += sopRows.length
  ? mdTable(['PM', 'Atom', 'Input', 'Category', 'Scope', 'Findings', 'Citations', 'Dietary input'], sopRows)
  : 'No SOP atoms are recorded.\n';
annexC += '\n\n## Practice-candidate adjudications\n\nThese are decisions already recorded on the mechanism. Unresolved and consolidated rows are not new admissions.\n\n';
const candidateRows = [];
for (const pm of pms) {
  for (const item of pm.candidates) {
    candidateRows.push([pm.pm_id, item.input || '', item.disposition || '', (item.evidence_source?.finding_ids || []).join(', '), item.remaining_gap || item.rationale || '']);
  }
}
annexC += candidateRows.length
  ? mdTable(['PM', 'Candidate', 'Disposition', 'Findings', 'Recorded reason or gap'], candidateRows)
  : 'No practice-candidate adjudications are recorded.\n';
annexC += '\n\n## Lifestyle priorities\n\n';
const lifeRows = [];
for (const pm of pms) {
  for (const item of pm.lifestyle) {
    lifeRows.push([
      pm.pm_id,
      item.atom_id || '',
      item.input || '',
      item.input_type || '',
      (item.evidence_source?.finding_ids || []).join(', ') || 'no finding id',
      (item.evidence_source?.citation_keys || []).join(', ') || 'no citation key',
      String(item.dietary_input ?? ''),
    ]);
  }
}
annexC += lifeRows.length
  ? mdTable(['PM', 'Atom', 'Input', 'Type', 'Findings', 'Citations', 'Dietary input'], lifeRows)
  : 'No lifestyle-priority atoms are recorded.\n';
annexC += `\n\n## Coverage of preparation, matrix, timing and fermentation\n\nThe scan reads structured SOP and candidate fields only. A missing word is a missing record, not a finding that the practice is useless.\n\n`;
annexC += mdTable(
  ['PM', 'SOP atoms', 'Candidates', 'Preparation', 'Matrix', 'Timing', 'Fermentation'],
  pmReports.map((pm) => [pm.pm_id, String(pm.sops.length), String(pm.candidates.length), pm.dims.preparation ? 'recorded' : 'absent', pm.dims.matrix ? 'recorded' : 'absent', pm.dims.timing ? 'recorded' : 'absent', pm.dims.fermentation ? 'recorded' : 'absent']),
);

let annexD = `# Annex D — Primary-mechanism research completeness\n\nFlags describe the state of the records. They are not a Scientific Evidence Confidence score. A missing score, including \`not-yet-scored\`, is not the reason for a flag.\n\n- **Ready for V1 dietary extraction** — at least one \`dietary_input: true\` relationship is scientifically admitted and has a verified quantitative food observation.\n- **Food composition/ontology incomplete** — an admitted input has no food target, an unresolved identity, or a scientific admission other than admitted.\n- **SOP research incomplete** — no SOP atom is recorded, or the structured SOP and candidate text does not cover preparation, food-matrix context, meal timing or fermentation.\n- **Lifestyle research incomplete** — no lifestyle-priority atom is recorded.\n- **Mechanistic/Scientific Finding reassessment needed** — a dietary-input relationship is not scientifically admitted.\n- **No currently admitted dietary contribution** — the mechanism has no \`dietary_input: true\` relationship.\n\nA mechanism may carry more than one flag. Readiness for food extraction does not close the SOP or lifestyle question.\n\n`;
annexD += mdTable(
  ['PM', 'Title', 'System', 'Admitted inputs', 'Quantified food rows', 'Flags'],
  pmReports.sort((a, b) => a.system.localeCompare(b.system) || a.pm_id.localeCompare(b.pm_id)).map((pm) => [
    link(pm.pm_id, pm.file),
    pm.title,
    pm.system,
    String(pm.admittedRels.length),
    String(pm.quantified),
    pm.flags.join('; ') || 'none',
  ]),
);
annexD += '\n\n## Sentinel — BRS5-FM2-PM6 Polyphenol Biotransformation\n\n';
const pm6 = pmReports.find((pm) => /PM6/.test(pm.pm_id) && /polyphenol/i.test(pm.title));
if (pm6) {
  annexD += `Record: [${pm6.pm_id}](${pm6.file}). Admitted dietary rows: ${pm6.admittedRels.length}. SOP atoms: ${pm6.sops.length}. Lifestyle atoms: ${pm6.lifestyle.length}. Practice-candidate adjudications: ${pm6.candidates.length}. Scientific findings on the record: ${pm6.findings.length}.\n\n`;
  annexD += 'The findings describe substrate- and community-dependent conversion. They do not record a preparation method, a food matrix, a meal sequence or a fermentation condition as an SOP atom. Juice and donor-culture limits, where stated, are findings about what the evidence does not establish. Empty SOP fields therefore mean the intervention layer was not built. They do not mean a whole-food protocol was tested and found unnecessary.\n\n';
  annexD += mdTable(['Input', 'Dietary input', 'Atom identity', 'Projection', 'Builder identity', 'Scientific admission', 'Food targets'], pm6.admittedRels.map((rel) => {
    const atom = pm6.dietary.find((item) => rel.id.endsWith(`::${item.atom_id}`));
    return [rel.input, 'true', atom?.canonical_identity?.status || 'not stated', atom?.canonical_identity?.projection_status || 'not stated', rel.identity_status || '', rel.scientific_admission || '', String((rel.food_targets || []).length)];
  }));
  annexD += '\n\nThe builder identity can read resolved when the registry now contains the substance. The atom fields remain the projection block. Foods attached despite that block are listed in Annex B and are not counted as verified extraction rows. Epicatechin is not under that block. This mechanism still has no verified quantitative food row in the extraction inventory.\n';
} else {
  annexD += 'The polyphenol biotransformation mechanism was not found under the expected title. The PM table above is the inventory that was inspected.\n';
}

fs.writeFileSync(path.join(outDir, '01-brs-cross-brs-foods.md'), annexA);
fs.writeFileSync(path.join(outDir, '02-consolidated-food-targets.md'), annexB);
fs.writeFileSync(path.join(outDir, '03-patterns-sops-lifestyle.md'), annexC);
fs.writeFileSync(path.join(outDir, '04-pm-research-completeness.md'), annexD);

const summary = {
  pm_count: pms.length,
  systems: systems.map((system) => ({ system, pms: pms.filter((pm) => pm.system === system).length })),
  relationships: relationships.length,
  admitted_relationships: admitted.length,
  non_input_relationships: nonInputs.length,
  admitted_substances: [...new Set(admitted.map((rel) => rel.substance_id).filter(Boolean))].length,
  inventory_rows: inventory.length,
  foods: topFoods.length,
  top10: topFoods.slice(0, 10).map((food) => ({
    title: food.title,
    origin: food.origin,
    file: food.file,
    pms: food.pms.size,
    systems: [...food.systems],
    targets: [...food.targets].map((id) => targetName(id)),
    rsp: [...new Map(food.rows.filter((row) => row.rsp != null).map((row) => [`${row.substance_id}|${row.basis}|${row.quantity}`, row])).values()].sort((a, b) => b.rsp - a.rsp).slice(0, 8).map((row) => ({ substance: targetName(row.substance_id), rsp: row.rsp, quantity: row.quantity, basis: row.basis, rank: row.rank })),
  })),
  ready_ids: pmReports.filter((pm) => pm.flags.includes('Ready for V1 dietary extraction')).map((pm) => pm.pm_id),
  no_diet_ids: pmReports.filter((pm) => pm.flags.includes('No currently admitted dietary contribution')).map((pm) => `${pm.pm_id} ${pm.title}`),
  mechanistic_ids: pmReports.filter((pm) => pm.flags.includes('Mechanistic/Scientific Finding reassessment needed')).map((pm) => pm.pm_id),
  sop_or_life: pmReports.filter((pm) => pm.flags.includes('SOP research incomplete') || pm.flags.includes('Lifestyle research incomplete')).length,
  sop_incomplete: pmReports.filter((pm) => pm.flags.includes('SOP research incomplete')).length,
  life_incomplete: pmReports.filter((pm) => pm.flags.includes('Lifestyle research incomplete')).length,
  no_diet: pmReports.filter((pm) => pm.flags.includes('No currently admitted dietary contribution')).length,
  food_incomplete: pmReports.filter((pm) => pm.flags.includes('Food composition/ontology incomplete')).length,
  mechanistic: pmReports.filter((pm) => pm.flags.includes('Mechanistic/Scientific Finding reassessment needed')).length,
  sop_atoms: sopRows.length,
  lifestyle_atoms: lifeRows.length,
  pattern_rels: patternRels.length,
  spans: unrankedSpans.length,
  related_unadmitted: relatedUnadmitted.length,
  pm6: pm6 ? { id: pm6.pm_id, flags: pm6.flags, admitted: pm6.admittedRels.map((rel) => ({ input: rel.input, identity: rel.identity_status, sci: rel.scientific_admission, foods: rel.food_targets?.length || 0 })) } : null,
  no_sop: pmReports.filter((pm) => !pm.sops.length).length,
  has_sop: pmReports.filter((pm) => pm.sops.length).length,
  provisional_rows: provisionalRows.length,
  blocked_rows: blockedRows.length,
  blocked_relationships: [...blockedIds],
  projected_admitted: admitted.filter((rel) => rel.scientific_admission === 'admitted').length,
  dietary_true_not_projected: admitted.filter((rel) => rel.scientific_admission == null).length,
  missing_foods: admitted.filter((rel) => rel.scientific_admission === 'admitted' && !blockedIds.has(rel.id) && !(rel.food_targets || []).some((food) => food.mapping_status === 'verified')).map((rel) => ({ pm: rel.pm, input: rel.input, identity: rel.identity_status, sci: rel.scientific_admission, foods: (rel.food_targets || []).length, warning: (rel.coverage_warnings || [])[0] || '' })),
  identity_blocked: admitted.filter((rel) => rel.identity_status === 'missing-substance' || rel.identity_status === 'unresolved').map((rel) => ({ pm: rel.pm, input: rel.input, identity: rel.identity_status, foods: rel.food_targets?.length || 0 })),
};
fs.writeFileSync(path.join(outDir, '_summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
