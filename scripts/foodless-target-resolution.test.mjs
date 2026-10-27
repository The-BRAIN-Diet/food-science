import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import matter from 'gray-matter';
import {EAA_IDS,validateAminoAcidProfile,resolveAggregateFoodSources,formatAggregateSumForDropdown} from '../src/lib/aggregateFoodComposition.mjs';
import {structuredEvidence} from '../src/lib/foodTargetReconciliation.mjs';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
const read=f=>matter(fs.readFileSync(f,'utf8')).data;
const aggregate=read('docs/substances/nutrients/macronutrients/amino-acids/indispensable-amino-acids.md');
const foods=fs.readdirSync('docs/foods').filter(f=>f.endsWith('.md')).map(f=>({file:'docs/foods/'+f,data:read('docs/foods/'+f)}));
const scopes=['BRS1','BRS2','BRS3','BRS4','BRS5','BRS6','BRS-X'].map(brs=>buildInputSubstanceFood(process.cwd(),{brs}));
const rows=scopes.flatMap(s=>s.manuscript_rows);
const sources=foods.flatMap(f=>resolveAggregateFoodSources(f.data,aggregate,f.file));
test('20 complete same-record EAA profiles: 10 plant and 10 animal',()=>{assert.equal(sources.length,20);for(const group of ['plant','animal'])assert.equal(sources.filter(s=>s.food_group===group).length,10);for(const s of sources){assert.deepEqual(validateAminoAcidProfile(s.aggregate_composition.profile),[]);assert.equal(structuredEvidence(s).length,1);assert.equal(s.relationship,'constituent-composition');}});
test('all amino-acid and protein quantities match the retrieved USDA rows exactly',()=>{const source=JSON.parse(fs.readFileSync('review/foodless-targets-2026-10-26/eaa-source-extract.json'));for(const s of sources){const x=source.find(x=>x.food_id===s.food_id),p=s.aggregate_composition.profile;assert.equal(p.material,x.description);for(const id of EAA_IDS){const n=x.nutrients.find(n=>n.name.toLowerCase()===id);assert.equal(p.amino_acids[id].value,Number(n.amount));assert.equal(p.amino_acids[id].source_row_id,n.id);}assert.equal(p.protein_g,Number(x.nutrients.find(n=>n.name==='Protein').amount));const portion=x.portions.find(n=>n.id===p.portion.source_row_id);assert.equal(p.portion.source_grams,Number(portion.gram_weight));}});
test('missing constituents, incompatible basis, false source or missing portion never become zero or a source',()=>{const food=structuredClone(foods.find(f=>f.data.id==='milk').data);for(const change of [p=>delete p.amino_acids.histidine,p=>p.unit='mg',p=>p.basis='per 100 g dry matter',p=>p.protein_g=0,p=>p.source.fdc_id=1,p=>delete p.portion.source_row_id]){const f=structuredClone(food);change(f.nutrition_amino_acid_profiles[0]);assert.equal(resolveAggregateFoodSources(f,aggregate,'docs/foods/milk.md').length,0);}});
test('aggregate cannot be inferred from total protein or a synthetic contains edge',()=>{const food={id:'example',title:'Example',nutrition_per_100g:{protein_g:25},substance_relationships:[{substance:'Indispensable amino acids',relationship:'contains'}]};assert.equal(resolveAggregateFoodSources(food,aggregate).length,0);assert.equal(structuredEvidence({presence_records:[{projection_kind:'constituent-composition',record:'x#nutrition_amino_acid_profiles/test'}]}).length,0);});
test('PM1 aggregate sources retain separate evidence and existing admission',()=>{const r=scopes[0].relationships.find(r=>r.id==='BRS1-FM1-PM1::PM1-DIT-1');assert.equal(r.food_targets.length,20);assert.equal(r.scientific_admission,'admitted');for(const f of r.food_targets){assert.equal(f.mapping_status,'verified');assert.equal(f.relationship,'constituent-composition');assert.ok(f.aggregate_composition);assert.equal(f.delivery,'direct-input-source');}});
test('eight formerly foodless targets now have source-qualified direct composition',()=>{for(const id of ['uridine','pyridoxal-5-phosphate','flavin-mononucleotide','glutamine','glutamate','cysteine','glucose','arabinan'])assert.ok(rows.some(r=>r.canonical_substance_id===id&&r.mapping_status==='verified'),id);});
test('NAC and exact oligofructose preparation retain admissions without invented foods',()=>{for(const id of ['n-acetylcysteine','oligofructose']){const rs=scopes.flatMap(s=>s.relationships).filter(r=>r.substance_id===id&&r.dietary_input===true);assert.ok(rs.length);for(const r of rs){assert.equal(r.scientific_admission,'admitted');assert.equal(r.food_targets.length,0);assert.equal(r.food_delivery_assessment.status,'no-ordinary-food-source');assert.ok(r.coverage_warnings.some(w=>w.includes(r.food_delivery_assessment.reason)));}}});
test('chemical forms and qualitative uncertainty survive the projection',()=>{for(const id of ['uridine','pyridoxal-5-phosphate','flavin-mononucleotide','glutamine','glutamate','arabinan']){const fs=scopes.flatMap(s=>s.relationships).filter(r=>r.substance_id===id).flatMap(r=>r.food_targets||[]);assert.ok(fs.length);for(const f of fs){assert.ok(f.chemical_form);assert.ok(f.food_delivery_notes);assert.equal(f.observations.length,0,`${id}: no borrowed total or calculated amount`);}}const c=scopes.flatMap(s=>s.relationships).filter(r=>r.substance_id==='cysteine').flatMap(r=>r.food_targets||[]);assert.ok(c.every(f=>!f.observations.length));});
test('glucose comes from the specific nutrient rather than total sugars',()=>{const targets=rows.filter(r=>r.canonical_substance_id==='glucose'&&r.food_target);assert.ok(targets.some(r=>r.food_target==='bananas'));const d=read('docs/foods/bananas.md');const g=d.nutrition_supplementary_sources.find(r=>r.key==='glucose_sr_173944');assert.equal(g.value,4.98);assert.equal(g.unit,'g');assert.equal(g.fdc_id,173944);});
test('same 51 admitted identities; food coverage changes independently',()=>{const ids=[...new Set(rows.map(r=>r.canonical_substance_id).filter(Boolean))];assert.equal(ids.length,51);const verified=ids.filter(id=>rows.some(r=>r.canonical_substance_id===id&&r.mapping_status==='verified'));const provisional=ids.filter(id=>!verified.includes(id)&&rows.some(r=>r.canonical_substance_id===id&&r.mapping_status==='research-supported-provisional'));assert.equal(verified.length,42);assert.equal(provisional.length,7);assert.deepEqual(ids.filter(id=>!verified.includes(id)&&!provisional.includes(id)).sort(),['n-acetylcysteine','oligofructose']);});
test('all protected PM, KC and SEC files remain byte-for-byte unchanged',()=>{const baseline=JSON.parse(fs.readFileSync('review/foodless-targets-2026-10-26/protected-baseline.json'));for(const [f,hash] of Object.entries(baseline))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'),hash,f);});

test('reciprocal food projection uses admitted records and preserves composition versus intervention',async()=>{
 const {foodDietaryRelationships}=await import('../src/lib/foodDietaryProjection.mjs');
 const milk=foodDietaryRelationships(scopes,'milk');
 assert.ok(milk.some(r=>r.id==='BRS1-FM1-PM1::PM1-DIT-1'&&r.foods.every(f=>f.relationship==='constituent-composition')));
 assert.ok(milk.some(r=>r.input.includes('Uridine')));
 assert.ok(milk.every(r=>r.pm_page&&r.substance_page&&r.limitation));
 const synthetic={relationships:[{id:'unresolved',dietary_input:true,scientific_admission:'unresolved',food_targets:[{food_id:'milk',mapping_status:'verified'}]}]};
 assert.deepEqual(foodDietaryRelationships([synthetic],'milk'),[]);
});

test('shared TSX projections parse without syntax regressions',async()=>{
 const {default:ts}=await import('typescript');
 for(const f of ['src/theme/SubstanceFoods/index.tsx','src/theme/DocItem/Content/index.tsx','src/components/AminoAcidComposition/index.tsx','src/components/FoodDietaryRelationships/index.tsx','src/lib/pmInputFoodDisclosure.ts']){
  const source=ts.createSourceFile(f,fs.readFileSync(f,'utf8'),ts.ScriptTarget.Latest,true,f.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  assert.deepEqual(source.parseDiagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[],f);
 }
});

 test('compact aggregate totals fit the canonical column without changing underlying amino-acid values',()=>{
  const pumpkin=sources.find(s=>s.food_id==='pumpkin-seeds');
  const before=JSON.stringify(pumpkin.aggregate_composition);
  assert.equal(formatAggregateSumForDropdown(pumpkin.aggregate_composition.eaa_g),'11.21');
  assert.equal(formatAggregateSumForDropdown(12.865),'12.87');
  assert.equal(formatAggregateSumForDropdown(1.005),'1.01');
  assert.equal(pumpkin.aggregate_composition.eaa_g,11.205);
  assert.equal(JSON.stringify(pumpkin.aggregate_composition),before);
  assert.equal(Object.keys(pumpkin.aggregate_composition.profile.amino_acids).length,9);
 });
