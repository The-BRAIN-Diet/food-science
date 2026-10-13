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
 assert.equal(s.strategies.length,25);assert.equal(s.relationships.length,27);
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
