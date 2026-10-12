import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { buildInputSubstanceFood, selectQuantified } from './lib/input-substance-food.mjs';
const root = process.cwd(), d = buildInputSubstanceFood(root), byId = new Map(d.relationships.map(r => [r.id, r]));
test('every accepted structured BRS1 lever is present once, or explicitly unresolved', () => { for (const pm of d.coverage) {
    const a = matter(fs.readFileSync(pm.record, 'utf8')).data;
    for (const l of a.dietary_lever_atoms || [])
        assert.ok(byId.has(pm.pm_id + '::' + l.atom_id) || d.gaps.some(g => g.pm_id === pm.pm_id && g.id === l.atom_id));
} assert.equal(new Set(d.relationships.map(r => r.id)).size, d.relationships.length); assert.equal(new Set(d.rows.map(r => r.row_id)).size, d.rows.length); assert.equal(new Set(d.food_sources.map(f => f.id)).size, d.food_sources.length); });
test('scope reads external mechanism records only for explicit BRS1 dependencies', () => { const external = d.source_records.filter(p => /^docs\/biological-targets\/brs[2-6]\//.test(p)); assert.deepEqual(external.sort(), ['docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx', 'docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool.mdx']); });
test('upstream supply resolves to accepted relationship, with no reference cycles', () => { const graph = new Map(); for (const r of d.relationships) {
    for (const u of r.upstream) {
        assert.ok(u.resolved);
        if (/supply/i.test(u.relationship_label)) {
            assert.ok(u.relationship_ids.length);
            graph.set(r.id, u.relationship_ids);
        }
    }
    if (r.derived_target_atom_id)
        assert.ok(byId.has(r.derived_target_atom_id));
} function check(id, active = new Set()) { assert.ok(!active.has(id), 'cycle ' + id); const next = new Set([...active, id]); for (const target of graph.get(id) || [])
    check(target, next); } for (const id of graph.keys())
    check(id); });
test('shared pools and constituent resources deduplicate without losing independent roles', () => { assert.equal(d.pools.length, 2); assert.equal(new Set(d.pools.map(p => p.id)).size, 2); for (const p of d.pools) {
    assert.equal(new Set(p.constituent_relationships.map(c => c.id)).size, p.constituent_relationships.length);
    assert.ok(p.dependent_pms.length > 1);
} const choline = d.relationships.filter(r => r.substance_id === 'choline'); assert.ok(choline.some(r => r.accounting === 'A')); assert.ok(choline.some(r => r.accounting === 'C')); const r = choline.find(r => r.accounting === 'C'); assert.equal(r.members[0].relationship_type, 'supported-upstream-supply'); assert.ok(r.qualification.includes('not reclassified')); assert.ok(r.presentations.some(p => p.section === '3.1.3')); });
test('B6 and PLP are separate relationships, not two dietary supplies', () => { const b6 = d.relationships.filter(r => r.substance_id === 'vitamin-b6'); assert.ok(b6.length > 1); for (const r of b6) {
    assert.equal(r.relationship_type.classification, 'derived');
    const target = byId.get(r.derived_target_atom_id);
    assert.ok(target.input.includes('PLP'));
    assert.equal(target.accounting, 'E');
    assert.equal(target.substance_id, null);
} });
test('qualitative phosphatidylcholine and betaine survive without numbers', () => { for (const id of ['phosphatidylcholine', 'betaine']) {
    const s = d.substances.find(s => s.id === id);
    assert.ok(s.food_sources.length);
    assert.ok(s.food_sources.some(f => !f.observations.length));
} });
test('quantities are source-specific and combined analytes never split into individual amounts', () => { for (const f of d.food_sources)
    for (const o of f.observations) {
        assert.ok(o.record.includes('#nutrition_'));
        if (o.rank_eligible) {
            assert.ok(o.verified);
            assert.match(o.basis, /per\s*100\s*g/i);
            assert.ok(o.preparation);
        }
        assert.ok(!/omega3_mg|lutein_zeaxanthin|unresolved/.test(o.record));
        if (o.record.includes('#nutrition_per_100g/')) {
            const key = o.record.split('/').at(-1);
            assert.equal(o.value, matter(fs.readFileSync(f.food_record, 'utf8')).data.nutrition_per_100g[key]);
        }
    } });
test('food and substance projections agree, no top-ten or headline eligibility loss', () => { for (const food of d.foods) {
    const expected = [...new Set(d.food_sources.filter(f => f.food_id === food.food_id).map(f => f.substance_id))].sort();
    assert.deepEqual([...food.substance_ids].sort(), expected);
    for (const id of expected)
        assert.ok(d.substances.find(s => s.id === id).food_sources.some(f => f.food_id === food.food_id));
} assert.ok(d.substances.find(s => s.id === 'iron').food_sources.length > 10); assert.ok(d.food_sources.some(f => f.observations.some(o => o.value < 1))); for (const s of d.substances)
    assert.ok(s.selection.sources.length <= 10); });
test('meal pattern remains a pattern with candidate ingredient source pointers, no nutrient substitute', () => { const p = d.views.find(r => r.input_type === 'dietary pattern'); assert.ok(p); assert.equal(p.substance_id, null); assert.ok(p.pattern_candidates.length); assert.ok(p.gap); assert.ok(p.pattern_candidates.every(c => c.composition_record && c.composition_values)); });
test('identity conflicts are explicit when present; missing supply never turns into zero', () => { const current = matter(fs.readFileSync('docs/biological-targets/brs1/fm5/brs1-fm5-pm12-synaptic-structural-plasticity.mdx', 'utf8')).data.dietary_input_traceability.find(a => a.input === 'Uridine'); if (current.canonical_identity?.status === 'missing-substance')
    assert.ok(d.conflicts.some(c => c.input === 'Uridine'));
else
    assert.equal(d.relationships.find(r => r.input === 'Uridine').identity_status, 'resolved'); const r = d.views.find(r => r.input === 'Uridine'); assert.ok(r.gap); assert.equal(r.foods.length, 0); assert.ok(d.gaps.some(g => g.kind === 'no-structured-admissions')); });
test('selection does not impose a precise rank on overlapping source-specific ranges', () => { const source = d.food_sources.find(f => f.observations.some(o => o.rank_eligible)); const o = source.observations.find(o => o.rank_eligible); const result = selectQuantified([{ ...source, id: 'test-left', observations: [{ ...o, range: [o.value, o.value], low: o.low, high: o.high }] }, { ...source, id: 'test-right', observations: [{ ...o, range: [o.value, o.value], low: o.low, high: o.high }] }]); assert.equal(result.ranked, false); });

test('sixth field gates PM lists independently of accounting and preserves unresolved decisions', () => {
 assert.deepEqual(d.summary.dietary_input, {yes:34,no:9,unset:7});
 for (const r of d.views) {
  assert.ok([true,false,null].includes(r.dietary_input));
  if(r.dietary_input !== true) assert.equal(r.foods.length,0,r.id);
  if(r.dietary_input === null) assert.ok(d.gaps.some(g=>g.kind==='dietary-input-unset' && g.relationship_id===r.id));
 }
 assert.equal(byId.get('BRS1-FM2-PM6::PM6-DIT-4').dietary_input,true);
 assert.equal(byId.get('BRS1-FM2-PM6::PM6-DIT-3').dietary_input,false);
 assert.equal(d.relationships.filter(r=>r.dietary_input_flags?.includes('section-supply-contradiction')).length,4);
 for(const r of d.relationships.filter(r=>r.accounting==='D')) assert.equal(r.dietary_input,false);
});

test('schema accepts booleans/null, rejects textual defaults and undocumented ambiguity', async () => {
 const {validateDietaryInputTraceability} = await import('./lib/dietary-input-traceability.mjs');
 for(const value of [true,false,null,'No',0]) {
  const issues=[];
  validateDietaryInputTraceability({dietary_input_traceability:[{input:'Example',input_type:'cofactor',biological_role:'Accepted role',evidence_limitation:'Accepted limitation',evidence_source:{pathway_resources:['existing']},dietary_input:value,dietary_input_note:'Accepted supply decision'}]},issues,{entityLabel:'test'});
  assert.equal(issues.some(i=>i.code==='dit_invalid_dietary_input'), ![true,false,null].includes(value));
 }
 const issues=[];
 validateDietaryInputTraceability({dietary_input_traceability:[{input:'Example',input_type:'cofactor',biological_role:'Accepted role',evidence_limitation:'Accepted limitation',evidence_source:{pathway_resources:['existing']},dietary_input:null}]},issues,{entityLabel:'test'});
 assert.ok(issues.some(i=>i.code==='dit_unset_dietary_input_note'));
});

test('evidence disclosure projects the authoritative dietary field and note', async () => {
 const {buildDietaryLeverDisclosureMap} = await import('./lib/dietary-lever-disclosure.mjs');
 const pm=d.coverage.find(p=>p.pm_id==='BRS1-FM2-PM6');
 const data=matter(fs.readFileSync(pm.record,'utf8')).data;
 const disclosures=[...buildDietaryLeverDisclosureMap(data).values()];
 assert.ok(disclosures.some(x=>/Acetyl-CoA/i.test(x.title) && x.dietaryInput===false));
 assert.ok(disclosures.some(x=>/vitamin b5/i.test(x.title) && x.dietaryInput===true && x.dietaryInputNote));
});
