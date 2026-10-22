import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import Module, {createRequire} from 'node:module';
import ts from 'typescript';
import * as foodSelection from '../src/data/inputSubstanceFoodSelection.mjs';
import matter from 'gray-matter';
import { buildInputSubstanceFood, selectQuantified } from './lib/input-substance-food.mjs';
import { readRegisteredSubstanceForms } from './lib/substance-input-pages.mjs';
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
 assert.deepEqual(d.summary.dietary_input, {yes:36,no:9,unset:5});
 for (const r of d.views) {
  assert.ok([true,false,null].includes(r.dietary_input));
  if(r.dietary_input !== true && r.foods.length) assert.ok(r.substance_id, r.id);
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

test('duplicate qualitative citations share the evidence material and retain both source pointers', () => {
 const pc=d.food_sources.filter(f=>f.substance_id==='phosphatidylcholine');
 for (const id of ['mussels','oysters']) {
  const rows=pc.filter(f=>f.food_id===id);
  assert.equal(rows.length,1);
  assert.equal(rows[0].presence_records.length,2);
  assert.ok(rows[0].presence_records.some(p=>p.record.includes('#substance_relationships/')));
  assert.ok(rows[0].presence_records.some(p=>p.record.includes('#nutrition_supplementary_sources/')));
 }
 assert.equal(pc.find(f=>f.food_id==='oysters').material,'Pacific oyster edible tissue');
 assert.equal(selectQuantified(pc).qualification,'Food sources identified; quantities not established.');
});

test('quinoa DHA hold preserves the source observation and suppresses lists without erasing other inputs', () => {
 const q=matter(fs.readFileSync('docs/foods/quinoa.md','utf8')).data;
 const review=q.nutrition_value_reviews.find(r=>r.nutrient_key==='dha_mg');
 assert.equal(review.original_observation.nutrient_id,1272);
 assert.equal(review.original_observation.value,0.047);
 assert.equal(review.exclude_from_food_lists,true);
 assert.equal(q.nutrition_per_100g.dha_mg,undefined);
 assert.equal(q.nutrition_per_100g.omega3_mg,undefined);
 assert.ok(!d.food_sources.some(f=>f.food_id==='quinoa' && f.substance_id==='dha-docosahexaenoic-acid'));
 assert.ok(d.food_sources.some(f=>f.food_id==='quinoa' && f.substance_id==='betaine'));
 assert.ok(d.gaps.some(g=>g.kind==='composition-observation-held'&&g.food_id==='quinoa'));
});

test('all preparations include dried and raw observations without cross-state ranking', () => {
 const sources=d.food_sources.filter(f=>f.substance_id==='tryptophan');
 const all=selectQuantified(sources);
 assert.ok(all.sources.some(f=>f.preparation==='dried'));
 assert.ok(all.sources.some(f=>f.preparation==='raw'));
 assert.equal(all.ranked,false);
 const raw=selectQuantified(sources,10,'raw');
 assert.ok(raw.sources.length);assert.ok(raw.sources.every(f=>f.preparation==='raw'));
 const dried=selectQuantified(sources,10,'dried');
 assert.ok(dried.sources.length);assert.ok(dried.sources.every(f=>f.preparation==='dried'));
});

test('four independent dietary-filter combinations consistently project PM/substance/food views', async () => {
 const {projectMappingReview,relationshipFilterCategory}=await import('../src/data/inputSubstanceFoodSelection.mjs');
 for(const owned of [false,true]) for(const upstream of [false,true]) {
  const p=projectMappingReview(d,{owned,upstream});
  const expected=d.relationships.filter(r=>relationshipFilterCategory(r)==='owned'?owned:relationshipFilterCategory(r)==='upstream'?upstream:false);
  assert.deepEqual(p.relationships.map(r=>r.id),expected.map(r=>r.id));
  assert.equal(p.counts.relationships,expected.length);
  assert.ok(p.pm.every(r=>expected.some(e=>e.id===r.id)));
  for(const s of p.substance) {assert.ok(s.relationships.length);assert.ok(s.relationships.every(r=>expected.some(e=>e.id===r.id)));}
  for(const f of p.food) {
   assert.equal(f.dietary_count,new Set(f.substances).size);
   assert.ok(f.relationships.every(r=>expected.some(e=>e.id===r.id)));
   assert.deepEqual([...f.pms].sort(),[...new Set(f.relationships.map(r=>r.pm))].sort());
  }
  assert.ok(p.context.some(r=>r.substance_id==='glutamate'));
  assert.equal(p.relationships.some(r=>r.substance_id==='vitamin-b5'&&relationshipFilterCategory(r)==='owned'),owned);
  if(!owned&&!upstream) {assert.equal(p.pm.length,0);assert.equal(p.substance.length,0);assert.equal(p.food.length,0);}
 }
 const p=projectMappingReview(d,{preparation:'dried'});
 assert.ok(p.food.length);assert.ok(p.food.every(f=>f.sources.every(s=>s.preparation==='dried')));
 const both=projectMappingReview(d);
 const choline=both.substance.find(s=>s.id==='choline');
 assert.ok(choline.relationships.some(r=>relationshipFilterCategory(r)==='owned'));
 assert.ok(choline.relationships.some(r=>relationshipFilterCategory(r)==='upstream'));
 assert.ok(!both.substance.some(s=>both.relationships.filter(r=>r.accounting==='D').some(r=>r.substance_id===s.id)));
});

test('cooked observations are eligible and source-specific measurements remain separate', () => {
 const base=d.food_sources.find(f=>f.observations.some(o=>o.rank_eligible));
 const o=base.observations.find(o=>o.rank_eligible);
 const raw={...base,id:'fixture-raw',preparation:'raw',observations:[{...o,comparison_group:'edible::raw'}]};
 const cooked={...base,id:'fixture-cooked',preparation:'cooked',observations:[{...o,id:'cooked-observation',comparison_group:'edible::cooked'}]};
 const all=selectQuantified([raw,cooked]);
 assert.equal(all.sources.length,2);assert.equal(all.ranked,false);
 assert.deepEqual(selectQuantified([raw,cooked],10,'cooked').sources.map(s=>s.id),['fixture-cooked']);
 assert.equal(cooked.observations[0].id,'cooked-observation');
});

test('BRS2 generation inventories every structured atom and consumes recorded dietary decisions', () => {
 const b=buildInputSubstanceFood(root,{brs:'BRS2'});
 assert.equal(b.scope,'BRS2');assert.equal(b.coverage.length,7);
 for(const pm of b.coverage){const data=matter(fs.readFileSync(pm.record,'utf8')).data;for(const a of data.dietary_lever_atoms||[])assert.ok(b.relationships.some(r=>r.id===pm.pm_id+'::'+a.atom_id));}
 assert.ok(b.relationships.every(r=>r.brs==='BRS2'));
 assert.equal(new Set(b.relationships.map(r=>r.id)).size,b.relationships.length);
 assert.deepEqual(b.summary.dietary_input,{yes:32,no:20,unset:1});
 assert.ok(b.food_sources.length>0);
 assert.equal(b.pools.length,2);
 assert.ok(b.relationships.filter(r=>r.accounting==='D').every(r=>r.dietary_input===false));
 assert.deepEqual(b.pilot_pms,b.coverage.map(p=>p.pm_id));
});

test('SAMe methionine gets ontology-backed high-methionine food sources', () => {
 const b=buildInputSubstanceFood(root,{brs:'BRS2'});
 const r=b.views.find(r=>r.id==='BRS2-FM1-PM3::PM3-DIT-1');
 assert.equal(r.dietary_input,true);
 assert.equal(r.substance_id,'methionine');
 assert.deepEqual(r.foods.map(f=>f.food_id).sort(),['chicken','eggs','salmon','sardines','tuna']);
 assert.equal(r.gap,null);
 assert.ok(r.foods.every(f=>f.presence_records.some(p=>p.record.includes('#substance_relationships/'))));
 assert.ok(r.foods.every(f=>f.observations.some(o=>o.record.includes('#nutrition_per_100g/methionine_g'))));
 assert.match(r.selected.qualification,/Verified per-100 g observations/);
});

test('SAMe catalytic ions resolve to mineral food composition context without becoming dietary requirements', () => {
 const b=buildInputSubstanceFood(root,{brs:'BRS2'});
 for (const [atom, substance] of [['PM3-DIT-3','magnesium'],['PM3-DIT-4','potassium']]) {
  const r=b.views.find(r=>r.id===`BRS2-FM1-PM3::${atom}`);
  assert.equal(r.dietary_input,false);
  assert.equal(r.substance_id,substance);
  assert.ok(r.foods.some(f=>f.observations.length));
 }
});

test('BRS selector uses independent datasets and shows ungenerated BRSs without fallback', async () => {
 const {selectBrsReviewData,projectMappingReview}=await import('../src/data/inputSubstanceFoodSelection.mjs');
 const b=buildInputSubstanceFood(root,{brs:'BRS2'});
 assert.equal(selectBrsReviewData(d,{BRS2:b},'BRS1').data,d);
 assert.equal(selectBrsReviewData(d,{BRS2:b},'BRS2').data,b);
 for(const brs of ['BRS3','BRS4','BRS5','BRS6']) {
  const result=selectBrsReviewData(d,{BRS2:b},brs);assert.equal(result.available,false);
  const p=projectMappingReview(result.data);assert.equal(p.relationships.length,0);assert.equal(p.context.length,0);
 }
 assert.equal(selectBrsReviewData({...d,scopes:{BRS2:b}},{},'BRS2').data,b);
});

test('BRS3–6 inventories preserve every structured admission and keep datasets isolated', async () => {
 const {selectBrsReviewData}=await import('../src/data/inputSubstanceFoodSelection.mjs');
 const scopes={};
 for(const n of [3,4,5,6]) {
  const brs=`BRS${n}`,b=buildInputSubstanceFood(root,{brs});scopes[brs]=b;
  assert.ok(b.coverage.length);
  for(const pm of b.coverage) {
   const source=matter(fs.readFileSync(pm.record,'utf8')).data;
   for(const a of source.dietary_lever_atoms||[])assert.ok(b.relationships.some(r=>r.id===pm.pm_id+'::'+a.atom_id)||b.gaps.some(g=>g.pm_id===pm.pm_id&&g.id===a.atom_id));
   if(!source.dietary_lever_atoms?.length) assert.ok(b.gaps.some(g=>g.pm_id===pm.pm_id));
  }
  assert.ok(b.relationships.every(r=>r.brs===brs));
  assert.equal(new Set(b.relationships.map(r=>r.id)).size,b.relationships.length);
  assert.equal(new Set(b.pools.map(p=>p.id)).size,b.pools.length);
  assert.ok(b.food_sources.length>0);assert.ok(b.summary.dietary_input.yes>0);
 }
 for(const brs of Object.keys(scopes)) {
  const selected=selectBrsReviewData(d,scopes,brs);assert.equal(selected.available,true);assert.equal(selected.data.scope,brs);
 }
 assert.ok(scopes.BRS5.conflicts.some(c=>c.kind==='stale-missing-substance-status'));
});

test('all BRSs use grouped substance context without promoting unset entries to food supplies', async () => {
 const {projectMappingReview}=await import('../src/data/inputSubstanceFoodSelection.mjs');
 for(let n=1;n<=6;n++) {
  const data=buildInputSubstanceFood(root,{brs:`BRS${n}`}),p=projectMappingReview(data);
  assert.equal(p.contextSubstances.flatMap(s=>s.relationships).length,p.context.length);
  assert.equal(new Set(p.contextSubstances.map(s=>s.id)).size,p.contextSubstances.length);
  for(const s of p.contextSubstances) assert.ok(s.relationships.every(r=>r.substance_id===s.substance_id || (!r.substance_id&&!s.substance_id)));
  assert.ok(p.substance.length>0);assert.ok(p.food.length>0);assert.ok(p.relationships.filter(r=>r.accounting!=='D').every(r=>r.dietary_input===true));
 }
});

test('rollout records every accepted atom decision and retains evidence and precursor distinctions', () => {
 for(let n=1;n<=6;n++) {
  const b=buildInputSubstanceFood(root,{brs:`BRS${n}`});
  for(const pm of b.coverage) {
   const source=matter(fs.readFileSync(pm.record,'utf8')).data;
   for(const a of source.dietary_input_traceability||[]) {
    assert.ok([true,false,null].includes(a.dietary_input),pm.pm_id+' '+a.atom_id);
    assert.ok(a.dietary_input_note);
    if(a.dietary_input===null)assert.ok(a.dietary_input_flags?.length);
    const r=b.relationships.find(r=>r.id===pm.pm_id+'::'+a.atom_id);
    if(r){assert.equal(r.dietary_input,a.dietary_input);assert.equal(r.biological_role,a.biological_role);assert.deepEqual(r.evidence,a.evidence_source);assert.equal(r.limitation,a.evidence_limitation);}
   }
   for(const k of source.pm_kc_relationships||[])assert.equal(k.dietary_input,false);
  }
  for(const r of b.views)if(r.dietary_input!==true && r.foods.length)assert.ok(r.substance_id);
  assert.ok(b.pilot_pms.every(id=>id.startsWith('BRS'+n+'-')));
 }
 const b2=buildInputSubstanceFood(root,{brs:'BRS2'});
 assert.equal(b2.relationships.find(r=>r.id==='BRS2-FM1-PM3::PM3-DIT-2').dietary_input,false); // ATP
 assert.equal(b2.relationships.find(r=>r.id==='BRS2-FM2-PM5::PM5-DIT-4').dietary_input,true); // explicit dietary serine
 const b5=buildInputSubstanceFood(root,{brs:'BRS5'});
 for(const id of ['PM1-DIT-1','PM1-DIT-3','PM1-DIT-6'])assert.equal(b5.relationships.find(r=>r.id==='BRS5-FM1-PM1::'+id).dietary_input,null);
});

test('food strategy rollup preserves independently admitted SOP science and separate intervention scopes', () => {
 const s=JSON.parse(fs.readFileSync('src/data/foodStrategyRollup.generated.json','utf8'));
 // PM2's two protocols plus the two independently assessed PM8 protocols.
 assert.equal(s.strategies.length,29);assert.equal(s.relationships.length,30);
 assert.equal(new Set(s.relationships.map(r=>r.id)).size,s.relationships.length);
 for(const r of s.relationships) {
  const file=r.source_record.split('#')[0],source=matter(fs.readFileSync(file,'utf8')).data;
  const a=source.system_optimisation_practices.find(a=>source.pm_id+'::'+a.atom_id===r.id);
  assert.ok(a);assert.equal(r.biological_role,a.biological_role);assert.equal(r.limitation,a.evidence_limitation);assert.deepEqual(r.evidence,a.evidence_source);
  assert.equal(r.strategy_id,a.food_strategy_id);assert.ok(!Object.hasOwn(r,'quantity'));
 }
 assert.ok(s.strategies.some(g=>g.relationship_ids.length>1));
 assert.ok(s.relationships.some(r=>r.scope==='mixed-food-and-timing'));
 assert.ok(s.relationships.some(r=>r.scope==='mixed-food-and-behaviour'));
 assert.ok(!s.relationships.some(r=>r.pm==='BRS6-FM3-PM6')); // pure meditation excluded
 assert.ok(!s.relationships.some(r=>r.id==='BRS6-FM3-PM7::PM7-SOP-1')); // breathing excluded
});

test("active-form section admission does not override a conflicting accepted precursor supply route", () => {
 const b=buildInputSubstanceFood(root,{brs:"BRS2"});
 for (const atom of ["PM1-DIT-3"]) {
  const r=b.relationships.find(r=>r.id===`BRS2-FM1-PM1::${atom}`);
  assert.equal(r.dietary_input,null);
  assert.ok(b.gaps.some(g=>g.kind==="dietary-input-unset" && g.relationship_id===r.id));
 }
 for (const atom of ["PM1-DIT-2","PM1-DIT-4"]) assert.equal(b.relationships.find(r=>r.id===`BRS2-FM1-PM1::${atom}`).dietary_input,true);
});

test('preformed 5-MTHF is dietary Yes with form-specific source observations',()=>{
 const b=buildInputSubstanceFood(root,{brs:'BRS2'});
 const r=b.relationships.find(r=>r.id==='BRS2-FM1-PM1::PM1-DIT-1');
 assert.equal(r.dietary_input,true);assert.equal(r.substance_id,'5-methyltetrahydrofolate');
 const sources=b.food_sources.filter(f=>f.substance_id===r.substance_id);
 for(const food of ['spinach','broccoli','kale','swiss-chard','cauliflower']) {
  const source=sources.find(f=>f.food_id===food && f.observations.some(o=>o.record.endsWith("5_mthf_wang_2010")));assert.ok(source);
  assert.ok(source.observations.length>=1);assert.ok(source.presence_records.length);
  const expected={spinach:288,broccoli:101,kale:54,"swiss-chard":242,cauliflower:92};
  assert.equal(source.observations.find(o=>o.record.endsWith("5_mthf_wang_2010")).value,expected[food]);
  assert.equal(source.observations[0].unit,"µg");
 }
});

test('Show All BRS retains relationship roles and deduplicates canonical supplies',async()=>{
 const {selectBrsReviewData,projectMappingReview,relationshipFilterCategory}=await import('../src/data/inputSubstanceFoodSelection.mjs');
 const scopes=Object.fromEntries([1,2,3,4,5,6].map(n=>[`BRS${n}`,buildInputSubstanceFood(root,{brs:`BRS${n}`})]));
 const all=selectBrsReviewData(scopes.BRS1,scopes,'all').data;
 assert.equal(all.relationships.length,Object.values(scopes).reduce((n,s)=>n+s.relationships.length,0));
 for(const key of ['relationships','food_sources','substances']) assert.equal(all[key].length,new Set(all[key].map(r=>r.id)).size);
 assert.equal(all.pools.length,new Set(Object.values(scopes).flatMap(s=>s.pools.map(p=>p.id || p.kc_id))).size);
 for(const owned of [false,true]) for(const upstream of [false,true]) {
  const view=projectMappingReview(all,{owned,upstream});
  assert.ok(view.relationships.every(r=>relationshipFilterCategory(r)==='owned'?owned:upstream));
  assert.equal(view.counts.substances,view.substance.length);
  assert.equal(view.counts.foods,view.food.length);
  if(!owned&&!upstream)assert.equal(view.counts.relationships,0);
 }
});

test('Nrf2 admits the compound separately from its preparation SOP',async()=>{
 const {createRequire}=await import('node:module');
 const {validateDominanceAssessment,dominancePlan}=createRequire(import.meta.url)('../src/plugin/pm-lever-layout/index.cjs');
 const file='docs/biological-targets/brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation.mdx';
 const fm=matter(fs.readFileSync(file,'utf8')).data;
 const b=buildInputSubstanceFood(root,{brs:'BRS3'});
 const r=b.relationships.find(r=>r.id==='BRS3-FM2-PM3::PM3-DIT-1');
 assert.equal(r.input,'Sulforaphane');assert.equal(r.dietary_input,true);assert.equal(r.substance_id,'sulforaphane');assert.equal(r.accounting,'A');
 const lever=fm.dietary_lever_atoms.find(a=>a.atom_id==='PM3-DIT-1');
 assert.equal(lever.relationship_mode,'state-regulation');assert.equal(lever.requirement_classification,'direct');assert.equal(lever.claim_ceiling,'modulation-demonstrated');
 assert.deepEqual(validateDominanceAssessment(fm),[]);
 assert.deepEqual(dominancePlan(fm).promoted,['3.1']);
 assert.equal(fm.system_optimisation_practices[0].atom_id,'PM3-SOP-1');
 assert.match(fm.system_optimisation_practices[0].input,/homogenate/);
 assert.match(r.limitation,/human brain/);assert.match(r.limitation,/COPD/);
});

test('newer canonical source revision supersedes stale preview mappings',async()=>{
 const {selectBrsReviewData}=await import('../src/data/inputSubstanceFoodSelection.mjs');
 const current=buildInputSubstanceFood(root,{brs:'BRS3'});
 const stale={...current,source_revision:current.source_revision-1,food_sources:[]};
 assert.equal(selectBrsReviewData({scopes:{BRS3:stale}},{BRS3:current},'BRS3').data,current);
 assert.equal(selectBrsReviewData({scopes:{BRS3:current}},{BRS3:stale},'BRS3').data,current);
 for(const food of ['broccoli','broccoli-sprouts'])assert.ok(current.food_sources.some(f=>f.substance_id==='sulforaphane' && f.food_id===food));
});

test('PM2 transport inputs retain upstream supply and food links across section numbering',async()=>{
 const {canonicalInputSection}=await import('../src/data/inputSubstanceFoodSelection.mjs');
 for(const n of [1,2,3])assert.equal(canonicalInputSection(`1.1.${n}`),`3.1.${n}`);
 for(const n of [1,2,3])assert.equal(canonicalInputSection(`3.1.${n}`),`3.1.${n}`);
 const b=buildInputSubstanceFood(root);
 for(const atom of ['PM2-DIT-1','PM2-DIT-2']) {
  const r=b.relationships.find(r=>r.id===`BRS1-FM1-PM2::${atom}`);
  assert.equal(r.dietary_input,true);assert.equal(r.accounting,'B');
  assert.equal(r.upstream[0].pm_id,'BRS1-FM1-PM1');
  assert.ok(r.upstream[0].relationship_ids.length);
  assert.ok(b.food_sources.some(f=>f.substance_id===r.substance_id));
 }
});

// These synthetic composition observations exist only in disposable fixtures.
function b3IdentityFixture(t, supplementary = []) {
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'b3-form-identity-'));
 t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const copy=file=>{fs.mkdirSync(path.dirname(path.join(dir,file)),{recursive:true});fs.copyFileSync(path.join(root,file),path.join(dir,file));};
 for(const file of ['registry/substances.json','docs/substances/nutrients/micronutrients/vitamins/vitamin-b3.md','src/data/nutritionTableMapping.ts','docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx']) copy(file);
 const chicken=structuredClone(matter(fs.readFileSync(path.join(root,'docs/foods/chicken.md'),'utf8')).data);
 chicken.substance_relationships=[];
 chicken.nutrition_supplementary_sources=supplementary;
 fs.mkdirSync(path.join(dir,'docs/foods'),{recursive:true});
 fs.writeFileSync(path.join(dir,'docs/foods/chicken.md'),matter.stringify('',chicken));
 const family={pm_id:'BRS4-FM1-PM99',parent_fm:'BRS4(FM1)',dietary_input_traceability:[{atom_id:'FAMILY',input:'Vitamin B3',input_type:'precursor',dietary_input:true}],dietary_lever_atoms:[{atom_id:'FAMILY',requirement_classification:'direct'}],dietary_lever_presentations:[{atom_id:'FAMILY',label:'Vitamin B3',presentation_section:'3.1.1'}]};
 fs.writeFileSync(path.join(dir,'docs/biological-targets/brs4/fm1/fixture-family.mdx'),matter.stringify('',family));
 return dir;
}

test('B3 forms resolve independently with shared documentation and no invented food values',()=>{
 const b=buildInputSubstanceFood(root,{brs:'BRS4'});
 const nad=b.relationships.filter(r=>r.pm==='BRS4-FM1-PM2');
 assert.deepEqual(nad.map(r=>[r.id,r.substance_id,r.identity_status,r.dietary_input,r.relationship_type.classification]),[
  ['BRS4-FM1-PM2::PM2-DIT-1','nicotinamide','resolved',true,'direct'],
  ['BRS4-FM1-PM2::PM2-DIT-2','nicotinic-acid','resolved',true,'direct'],
  ['BRS4-FM1-PM2::PM2-DIT-3','tryptophan','resolved',true,'derived'],
 ]);
 assert.equal(nad[2].derived_target_atom_id,nad[0].id);
 assert.equal(nad[2].derived_target,nad[0].input);
 for(const r of nad.slice(0,2)){
  assert.equal(b.food_sources.filter(f=>f.substance_id===r.substance_id).length,0);
  assert.ok(r.substance_page.endsWith('#'+r.substance_id));
  assert.ok(r.presentations.every(p=>p.section==='3.1.1'));
 }
 assert.equal(b.food_sources.filter(f=>f.substance_id==='tryptophan').length,3);
 const forms=readRegisteredSubstanceForms(root);
 for(const id of ['nicotinamide','nicotinic-acid']){
  assert.equal(forms.get(id).parent_substance_id,'vitamin-b3');
  assert.equal(forms.get(id).documented,true);
 }
 // Existing standalone identities retain their original public destinations.
 assert.equal(b.substances.find(s=>s.id==='tryptophan').page,'/docs/substances/nutrients/macronutrients/amino-acids/essential/tryptophan');
});

test('B3 family aliases and total-niacin amounts never become form identities or amounts',t=>{
 const dir=b3IdentityFixture(t);
 const pmFile=path.join(dir,'docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx');
 const pm=matter(fs.readFileSync(pmFile,'utf8'));
 pm.data.dietary_input_traceability[0].input='Niacinamide';
 pm.data.dietary_input_traceability[1].input='Nicotinic acid';
 fs.writeFileSync(pmFile,matter.stringify(pm.content,pm.data));
 const b=buildInputSubstanceFood(dir,{brs:'BRS4'});
 assert.equal(b.relationships.find(r=>r.input==='Niacinamide').substance_id,'nicotinamide');
 assert.equal(b.relationships.find(r=>r.input==='Nicotinic acid').substance_id,'nicotinic-acid');
 assert.equal(b.relationships.find(r=>r.pm==='BRS4-FM1-PM99').substance_id,'vitamin-b3');
 assert.ok(b.food_sources.some(f=>f.substance_id==='vitamin-b3'&&f.observations.length));
 assert.equal(b.food_sources.some(f=>['nicotinamide','nicotinic-acid'].includes(f.substance_id)),false);
 assert.deepEqual(b.conflicts.filter(c=>/alias/.test(c.kind)),[]);
});

test('B3 form observations keep independent provenance and explicitly unknown preparation',t=>{
 const rows=[
  {key:'fixture_nam',label:'Nicotinamide',substance_id:'nicotinamide',value:1.25,unit:'mg',basis:'per 100 g test material',preparation_state:null,source_url:'https://example.org/fixture-nam',source_note:'Synthetic method fixture; preparation is unknown.'},
  {key:'fixture_na',label:'Nicotinic acid',substance_id:'nicotinic-acid',value:25,unit:'µg',basis:'per 100 g test material',preparation_state:'cooked',source_url:'https://example.org/fixture-na',source_note:'Separate synthetic observation.'},
  {key:'fixture_nam_unknown',label:'Nicotinamide',substance_id:'nicotinamide',status:'Present — quantity not established',preparation_state:'unknown',source_url:'https://example.org/fixture-presence',source_note:'Synthetic qualitative observation; no quantitative result.'},
 ];
 const dir=b3IdentityFixture(t,rows),b=buildInputSubstanceFood(dir,{brs:'BRS4'});
 const nam=b.food_sources.find(f=>f.substance_id==='nicotinamide'&&f.preparation===null);
 assert.ok(nam);assert.equal(nam.observations[0].value,1.25);assert.equal(nam.observations[0].unit,'mg');
 assert.equal(nam.observations[0].basis,rows[0].basis);assert.equal(nam.observations[0].source_url,rows[0].source_url);
 assert.equal(nam.observations[0].rank_eligible,false);
 const na=b.food_sources.find(f=>f.substance_id==='nicotinic-acid');
 assert.equal(na.preparation,'cooked');assert.equal(na.observations[0].value,25);assert.equal(na.observations[0].unit,'µg');
 assert.equal(na.observations[0].source_url,rows[1].source_url);
 const unknown=b.food_sources.find(f=>f.substance_id==='nicotinamide'&&f.preparation==='unknown');
 assert.ok(unknown);assert.deepEqual(unknown.observations,[]);
 const family=b.food_sources.filter(f=>f.substance_id==='vitamin-b3');
 assert.equal(family.length,1);assert.deepEqual(family[0].observations.map(o=>o.value),[6.801]);
});

test('registered B3 identity is independent of documentation availability; links still verify',t=>{
 const dir=b3IdentityFixture(t),page=path.join(dir,'docs/substances/nutrients/micronutrients/vitamins/vitamin-b3.md');
 fs.writeFileSync(page,fs.readFileSync(page,'utf8').replace('{#nicotinamide}','{#different-anchor}'));
 let b=buildInputSubstanceFood(dir,{brs:'BRS4'});
 let nam=b.relationships.find(r=>r.substance_id==='nicotinamide');
 assert.equal(nam.identity_status,'resolved');assert.equal(nam.substance_page,null);
 assert.ok(b.gaps.some(g=>g.kind==='substance-documentation'&&g.substance_id==='nicotinamide'));
 fs.appendFileSync(page,'\n## Duplicate {#nicotinic-acid}\n');
 assert.equal(readRegisteredSubstanceForms(dir).get('nicotinic-acid').href,null);
 fs.rmSync(page);
 b=buildInputSubstanceFood(dir,{brs:'BRS4'});
 nam=b.relationships.find(r=>r.substance_id==='nicotinamide');
 assert.equal(nam.identity_status,'resolved');assert.equal(nam.substance_page,null);
 const registryFile=path.join(dir,'registry/substances.json'),registry=JSON.parse(fs.readFileSync(registryFile,'utf8'));
 registry.nicotinamide.parent_substance_id='unregistered-family';
 fs.writeFileSync(registryFile,JSON.stringify(registry));
 assert.throws(()=>readRegisteredSubstanceForms(dir),/Invalid registered nutrient form/);
});

// Çatak values are synthetic regression fixtures, never imported production observations.
const catakFixtureRow = (substance_id, value, material, extra = {}) => ({
 key: 'c1_' + substance_id, substance_id, label: substance_id === 'nicotinamide' ? 'Nicotinamide' : 'Nicotinic acid',
 value, unit: 'mg', basis: 'per 100 g sample; fresh/dry basis not reported',
 evidence_material: material, preparation_state: 'unknown', evidence_status: 'supported',
 source_reference: '#food-source-4', source_url: 'https://www.ejast.org/archive/view_article?pid=jast-61-3-138',
 public_note: 'Method-defined extractable analyte; native free-vitamer concentration and dietary availability are not established.',
 source_note: 'Synthetic Çatak regression fixture: 0.1 N HCl, heated acid extraction at 121 °C for 30 min before HPLC. Laboratory extraction is not food preparation.',
 ...extra,
});
function catakFixture(t, extraChicken = [], reviews = []) {
 const chicken = [catakFixtureRow('nicotinamide',5.442,'Chicken breast'),catakFixtureRow('nicotinic-acid',3.739,'Chicken breast'),...extraChicken];
 const dir = b3IdentityFixture(t,chicken);
 const file = path.join(dir,'docs/foods/chicken.md');
 const doc = matter(fs.readFileSync(file,'utf8'));
 doc.data.nutrition_value_reviews = reviews;
 fs.writeFileSync(file,matter.stringify('## References\n\n<span id="food-source-4"></span>\nSynthetic regression reference only.\n',doc.data));
 fs.writeFileSync(path.join(dir,'docs/foods/chickpeas.md'),matter.stringify('## References\n\n<span id="food-source-4"></span>\nSynthetic regression reference only.\n',{
  id:'chickpeas',title:'Chickpeas',preparation_state:'boiled',nutrition_supplementary_sources:[
   catakFixtureRow('nicotinamide',1.412,'Chickpea'),catakFixtureRow('nicotinic-acid',1.681,'Chickpea'),
  ],
 }));
 return dir;
}
test('C1 four disposable Çatak observations preserve exact evidence without inventing comparability',t=>{
 const dir=catakFixture(t), b=buildInputSubstanceFood(dir,{brs:'BRS4'});
 const rows=b.food_sources.filter(f=>['nicotinamide','nicotinic-acid'].includes(f.substance_id));
 assert.equal(rows.length,4);
 const expected={'chicken::nicotinamide':5.442,'chicken::nicotinic-acid':3.739,'chickpeas::nicotinamide':1.412,'chickpeas::nicotinic-acid':1.681};
 for(const source of rows){
  const obs=source.observations[0];
  assert.equal(obs.value,expected[source.food_id+'::'+source.substance_id]);
  assert.equal(obs.display,obs.value+' mg');assert.equal(obs.unit,'mg');
  assert.equal(obs.basis,'per 100 g sample; fresh/dry basis not reported');
  assert.equal(obs.material,source.food_id==='chicken'?'Chicken breast':'Chickpea');
  assert.equal(obs.preparation,'unknown');assert.equal(source.preparation,'unknown');
  assert.match(obs.source_note,/121 °C/);assert.match(obs.public_note,/native free-vitamer/);
  assert.equal(obs.source_reference,'#food-source-4');
  assert.ok(fs.readFileSync(path.join(dir,source.food_record),'utf8').includes('id="food-source-4"'));
  assert.match(obs.source_url,/pid=jast-61-3-138$/);
  assert.equal(obs.evidence_status,'supported');assert.equal(obs.verified,true);
  assert.equal(obs.rank_eligible,false);assert.equal(obs.comparison_group,null);
 }
 // The fixture builder never writes canonical food records; production forms remain empty.
 const production=buildInputSubstanceFood(root,{brs:'BRS4'});
 assert.equal(production.food_sources.filter(f=>['nicotinamide','nicotinic-acid'].includes(f.substance_id)).length,0);
});
test('C1 distinct observations, exact units, explicit comparison decisions and review holds survive',t=>{
 const dir=catakFixture(t,[
  catakFixtureRow('nicotinamide',123,'Chicken breast, alternate assay',{key:'alternate',unit:'µg',basis:'per g dry material',source_url:'https://example.org/alternate',preparation_state:null}),
  catakFixtureRow('nicotinamide',999,'Chicken breast',{key:'unverified',verified:false}),
  catakFixtureRow('nicotinic-acid',777,'Chicken breast',{key:'review-held'}),
  catakFixtureRow('nicotinamide',22,'Chicken breast',{key:'explicit-comparison',basis:'per 100 g edible material',rank_eligible:true,comparison_group:'synthetic-reviewed-extractable-nam',preparation_state:'cooked'}),
 ],[{key:'review-held',correction_status:'pending',title:'Synthetic quantitative review hold'}]);
 const b=buildInputSubstanceFood(dir,{brs:'BRS4'});
 const obs=b.food_sources.filter(f=>['nicotinamide','nicotinic-acid'].includes(f.substance_id)).flatMap(f=>f.observations);
 assert.equal(obs.length,8);
 const find=key=>obs.find(o=>o.key===key);
 assert.equal(find('alternate').display,'123 µg');assert.equal(find('alternate').preparation,null);
 assert.equal(find('unverified').verified,false);assert.equal(find('review-held').verified,false);
 assert.equal(find('review-held').nutrition_value_reviews[0].correction_status,'pending');
 assert.equal(find('explicit-comparison').comparison_group,'synthetic-reviewed-extractable-nam');
 assert.equal(find('explicit-comparison').rank_eligible,true);
 assert.equal(find('unverified').comparison_group,null);
});

test('C1 public-display restrictions never admit a supplementary quantity or a new public material',t=>{
 const dir=catakFixture(t,[catakFixtureRow('nicotinamide',999,'Private different material',{key:'private',public_display:'internal-only'})]);
 const mapping=buildInputSubstanceFood(dir,{brs:'BRS4'});
 assert.equal(mapping.food_sources.some(f=>f.material==='Private different material'),false);
 assert.equal(mapping.food_sources.flatMap(f=>f.observations).some(o=>o.key==='private'),false);
});

// Exercise the actual CLI serialization boundary before feeding the real PM renderer.
test('C1 end-to-end: disposable canonical fixtures → BRS4 JSON → qualified PM summaries',t=>{
 const dir=catakFixture(t,[
  catakFixtureRow('nicotinamide',123,'Chicken breast, alternate synthetic assay',{key:'e2e-alternate',unit:'µg',basis:'per g dry synthetic material',preparation_state:null,source_url:'https://example.org/alternate-assay'}),
  catakFixtureRow('nicotinamide',999,'Chicken breast',{key:'e2e-held'}),
 ],[{key:'e2e-held',correction_status:'pending',title:'Synthetic quantitative review hold'}]);
 const result=spawnSync(process.execPath,[path.join(root,'scripts/generate-input-substance-food.mjs'),'--brs','BRS4'],{cwd:dir,encoding:'utf8'});
 assert.equal(result.status,0,result.stderr);
 const snapshot=JSON.parse(fs.readFileSync(path.join(dir,'src/data/brs4InputMapping.generated.json'),'utf8'));
 const rendererFile=path.join(root,'src/lib/pmInputFoodDisclosure.ts');
 const mod=new Module(rendererFile),require=createRequire(rendererFile);
 mod.filename=rendererFile;
 mod.require=id=>id.endsWith('inputMappingScopes.mjs')?{__esModule:true,default:{BRS4:snapshot}}:id.endsWith('inputSubstanceFoodSelection.mjs')?foodSelection:require(id);
 mod._compile(ts.transpileModule(fs.readFileSync(rendererFile,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,rendererFile);
 const {selectFoodDisclosureSources,renderFoodSourceSummary,renderProvenance}=mod.exports;
 const forms=snapshot.food_sources.filter(f=>['nicotinamide','nicotinic-acid'].includes(f.substance_id));
 const selected=selectFoodDisclosureSources(forms);
 assert.equal(selected.length,6); // Four pilot fixtures plus two independent synthetic observations.
 for(const [food,substance,value] of [['chicken','nicotinamide',5.442],['chicken','nicotinic-acid',3.739],['chickpeas','nicotinamide',1.412],['chickpeas','nicotinic-acid',1.681]]){
  const item=selected.find(f=>f.food_id===food&&f.substance_id===substance&&f.observations[0].value===value);
  assert.ok(item);
  const obs=item.observations[0],html=renderFoodSourceSummary('Fixture category',item);
  assert.equal(obs.unit,'mg');assert.equal(obs.preparation,'unknown');
  assert.ok(html.includes(value+' mg ('+obs.basis+')'));
  assert.ok(html.includes('Studied material: '+obs.material));
  assert.ok(html.includes('unknown'));
  assert.ok(html.includes(obs.public_note));
  assert.ok(html.includes(item.food_page+obs.source_reference));
  assert.ok(html.includes('no concentration ranking'));
  assert.ok(renderProvenance(item).includes(obs.source_url));
  assert.ok(renderProvenance(item).includes('heated acid extraction at 121 °C'));
 }
 const held=selected.find(f=>f.observations[0].key==='e2e-held');
 assert.equal(held.observations[0].verified,false);
 assert.match(renderFoodSourceSummary('Fixture category',held),/quantity not established/);
 assert.doesNotMatch(renderFoodSourceSummary('Fixture category',held),/999/);
 const alternate=selected.find(f=>f.observations[0].key==='e2e-alternate');
 assert.equal(alternate.preparation,null);
 assert.match(renderFoodSourceSummary('Fixture category',alternate),/123 µg \(per g dry synthetic material\)/);
 assert.deepEqual(snapshot.relationships.filter(r=>r.pm==='BRS4-FM1-PM2').map(r=>[r.substance_id,r.dietary_input,r.relationship_type.classification]),[
  ['nicotinamide',true,'direct'],['nicotinic-acid',true,'direct'],['tryptophan',true,'derived'],
 ]);
});
