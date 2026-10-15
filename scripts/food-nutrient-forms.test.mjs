/** Synthetic B3 observations below are test fixtures only, never production food records. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module, {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ts from 'typescript';
import matter from 'gray-matter';
import * as projection from '../src/data/foodNutrientForms.mjs';
import * as references from '../src/utils/nutrientReference.mjs';
const root=process.cwd();
const registry=JSON.parse(fs.readFileSync('registry/substances.json','utf8'));
const links=JSON.parse(fs.readFileSync('src/data/substance-input-pages.json','utf8'));
const project=food=>projection.projectFoodNutrientForms(food,registry,links);
const fixtureRow=(overrides={})=>({key:'synthetic_nam_1',label:'Nicotinamide',substance_id:'nicotinamide',value:1.234,unit:'mg',basis:'per 100 g synthetic test material',preparation_state:'raw',evidence_material:'Synthetic material, not a production food',evidence_status:'supported',source_url:'https://example.org/synthetic-assay',source_reference:'#food-source-4',source_note:'Synthetic assay: heated acid extraction is laboratory treatment, not food preparation.',public_note:'Synthetic assay measures extractable forms, not native free vitamers.',...overrides});
const fixture=(rows=[fixtureRow()],overrides={})=>({id:'synthetic-b3-food',preparation_state:'roasted',nutrition_supplementary_sources:rows,...overrides});

// Render the real TSX component and real nutrition grouping, with only router/slot adapters.
const namespaces=new Map([
 [path.join(root,'src/data/foodNutrientForms.mjs'),projection],
 [path.join(root,'src/utils/nutrientReference.mjs'),references],
]);
const cache=new Map();let location={pathname:'/docs/foods/synthetic-b3-food',search:'?advanced=1&context=fixture'};
function loadTs(file){
 if(cache.has(file))return cache.get(file).exports;
 const mod=new Module(file);mod.filename=file;cache.set(file,mod);
 const require=createRequire(file);
 mod.require=id=>{
  if(id==='@docusaurus/router')return {useLocation:()=>location};
  if(id==='@site/src/components/AdvancedNutrition')return {__esModule:true,default:({children})=>React.createElement('aside',{'data-test-advanced-slot':'true'},children)};
  let target=id.startsWith('@site/')?path.join(root,id.slice(6)):id.startsWith('.')?path.resolve(path.dirname(file),id):null;
  if(target){
   if(!path.extname(target))target=['.ts','.tsx','.json'].map(ext=>target+ext).find(fs.existsSync)||target;
   if(namespaces.has(target))return namespaces.get(target);
   if(/\.tsx?$/.test(target))return loadTs(target);
   return require(target);
  }
  return require(id);
 };
 const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2020},reportDiagnostics:true});
 assert.deepEqual(compiled.diagnostics,[]);
 mod._compile(compiled.outputText,file);return mod.exports;
}
const NutritionTable=loadTs(path.join(root,'src/components/NutritionTable.tsx')).default;
const render=(details,view='advanced')=>renderToStaticMarkup(React.createElement(NutritionTable,{details,view}));

test('B1 identities and anchored documentation are reused without mutation',()=>{
 const before=JSON.stringify({registry,links});
 const food=fixture([fixtureRow(),fixtureRow({key:'synthetic_na',label:'Nicotinic acid',substance_id:'nicotinic-acid',value:250,unit:'µg'})]);
 const saved=structuredClone(food),rows=project(food).observations;
 assert.deepEqual(rows.map(r=>r.substance_id),['nicotinamide','nicotinic-acid']);
 assert.ok(rows[0].href.endsWith('vitamin-b3#nicotinamide'));
 assert.ok(rows[1].href.endsWith('vitamin-b3#nicotinic-acid'));
 assert.deepEqual(food,saved);assert.equal(JSON.stringify({registry,links}),before);
});

test('family quantities, niacin equivalents and tryptophan never supply form observations',()=>{
 const food=fixture([],{nutrition_per_100g:{vitamin_b3_mg:16,niacin_equivalents_mg:25,tryptophan_g:1}});
 assert.deepEqual(project(food).observations,[]);
 const parent=structuredClone(food.nutrition_per_100g);food.nutrition_supplementary_sources=[fixtureRow()];
 project(food);assert.deepEqual(food.nutrition_per_100g,parent);
 const formsOnly=fixture();project(formsOnly);assert.equal(formsOnly.nutrition_per_100g,undefined);
});

test('values, units, bases, preparations, source references and analytical qualifications remain separate',()=>{
 const rows=project(fixture([fixtureRow(),fixtureRow({key:'synthetic_nam_2',value:50,unit:'µg',basis:'per g dry test material',preparation_state:'dried',source_reference:'#food-source-7',source_url:'https://example.org/second-assay'})])).observations;
 assert.equal(rows.length,2);assert.equal(rows[0].value,1.234);assert.equal(rows[1].value,50);
 assert.equal(rows[1].unit,'µg');assert.equal(rows[1].basis,'per g dry test material');assert.equal(rows[1].preparation,'dried');
 assert.equal(rows[1].source_reference,'#food-source-7');assert.equal(rows[1].source_url,'https://example.org/second-assay');
 assert.match(rows[0].limitation,/not native free vitamers/);assert.match(rows[0].provenance,/laboratory treatment/);
});

test('unknown quantities stay unknown; missing preparation never inherits the food state',()=>{
 for(const preparation of [undefined,null,'','unknown','unspecified','not reported']){
  const row=project(fixture([fixtureRow({value:null,status:'Present — quantity not established',preparation_state:preparation})])).observations[0];
  assert.equal(row.value,null);assert.equal(row.unit,null);assert.equal(row.preparation,null);
 }
 const html=render(fixture([fixtureRow({value:null,preparation_state:null})]));
 assert.match(html,/Present — quantity not established/);assert.match(html,/Preparation not established/);assert.doesNotMatch(html,/>0 mg</);
});

test('explicitly supported zero and ranges are reported without invented conversion or averaging',()=>{
 assert.match(render(fixture([fixtureRow({value:0})])),/>0 mg</);
 const row=project(fixture([fixtureRow({value:undefined,range:[1,3]})])).observations[0];
 assert.deepEqual(row.range,[1,3]);assert.match(render(fixture([fixtureRow({value:undefined,range:[1,3]})])),/1–3 mg/);
});

test('numeric content and a citation URL alone never establish eligibility',()=>{
 const result=project(fixture([fixtureRow({evidence_status:undefined})]));
 assert.deepEqual(result.observations,[]);assert.ok(result.issues.some(i=>i.reason==='display-evidence-or-reference-unresolved'));
 assert.doesNotMatch(render(fixture([fixtureRow({evidence_status:undefined})])),/Vitamin B3 — Individual Forms/);
});

test('quantity holds and pending citations retain supported presence but never promote the amount',()=>{
 for(const overrides of [{quantity_citation_pending:true},{source_group:'representative estimate'},{presence_status:'presence_supported_amount_unavailable'},{status:'Present — quantity not established'},{amount_display:'Estimate; not a verified amount'}]){
  const row=project(fixture([fixtureRow(overrides)])).observations[0];assert.equal(row.value,null);assert.equal(row.quantity_status,'not-established');
 }
 const food=fixture(undefined,{nutrition_value_reviews:[{nutrient_key:'synthetic_nam_1',correction_status:'pending',exclude_from_food_lists:true}]});
 assert.equal(project(food).observations[0].value,null);assert.doesNotMatch(render(food),/1\.234 mg/);
 for(const status of ['unresolved','rejected'])assert.deepEqual(project(fixture([fixtureRow({evidence_status:status})])).observations,[]);
});

test('a source-bound canonical contains decision can support a supplementary observation',()=>{
 const row=fixtureRow({evidence_status:undefined});
 const edge={substance:'Nicotinamide',substance_id:'nicotinamide',relationship:'contains',evidence_status:'supported',presence_status:'presence_and_amount_supported',requires_supplementary_key:row.key};
 assert.equal(project(fixture([row],{substance_relationships:[edge]})).observations[0].value,1.234);
 assert.equal(project(fixture([{...row,presence_status:'presence_supported_amount_unavailable'}],{substance_relationships:[edge]})).observations[0].value,null);
 const unrelated={...edge,requires_supplementary_key:'different-observation'};
 assert.deepEqual(project(fixture([row],{substance_relationships:[unrelated]})).observations,[]);
});

test('qualitative canonical relationships retain their own identity and source, without invented quantities',()=>{
 const edge={relationship_id:'synthetic-presence-1',substance:'Nicotinamide',substance_id:'nicotinamide',relationship:'contains',evidence_status:'supported',source_reference:'#food-source-4',evidence_source:'Synthetic presence assay only.',preparation_state:null};
 const result=project(fixture([],{substance_relationships:[edge,edge]}));
 assert.equal(result.observations.length,1);assert.equal(result.observations[0].value,null);
 assert.match(render(fixture([],{substance_relationships:[edge]})),/Present — quantity not established/);
 assert.deepEqual(project(fixture([],{substance_relationships:[{...edge,relationship_id:undefined}]})).observations,[]);
});

test('combined analytes, rejected presence decisions, private records and missing references do not render',()=>{
 for(const overrides of [{analyte_scope:'combined'},{public_display:'internal-only'},{source_reference:'https://example.org/source'},{source_reference:undefined}]){
  assert.deepEqual(project(fixture([fixtureRow(overrides)])).observations,[]);
 }
 assert.deepEqual(project(fixture(undefined,{public_display:{synthetic_nam_1:'excluded-error'}})).observations,[]);
 const edge={substance_id:'nicotinamide',substance:'Nicotinamide',relationship:'contains',evidence_status:'rejected'};
 assert.deepEqual(project(fixture(undefined,{substance_relationships:[edge]})).observations,[]);
});

test('duplicate observation keys cannot silently choose one source or suppress another Bioactive row',()=>{
 const food=fixture([fixtureRow(),fixtureRow({source_reference:'#food-source-8'})]);
 assert.deepEqual(project(food).observations,[]);
 assert.ok(project(food).issues.some(i=>i.reason==='missing-or-duplicate-observation-key'));
});

test('the real Advanced renderer shows compact form rows and working local source destinations',()=>{
 const html=render(fixture());
 assert.match(html,/Vitamin B3 — Individual Forms/);assert.match(html,/Nicotinamide \(Niacinamide\)/);
 assert.match(html,/vitamin-b3#nicotinamide/);assert.match(html,/1\.234 mg/);
 assert.match(html,/per 100 g synthetic test material/);assert.match(html,/not native free vitamers/);
 assert.match(html,/href="\/docs\/foods\/synthetic-b3-food\?context=fixture#food-source-4"/);
 assert.doesNotMatch(html,/% reference intake/);assert.doesNotMatch(html,/Vitamins and minerals \(per 100 g\)/);
});

test('form-only content registers Advanced and suppresses only the corresponding Bioactive observation',()=>{
 const unadmitted=fixtureRow({key:'synthetic-unadmitted',value:9,evidence_status:undefined});
 const unrelated={key:'synthetic-other',label:'Synthetic unrelated compound',value:3,unit:'mg',source_note:'Unrelated test observation.'};
 const html=render(fixture([fixtureRow(),unadmitted,unrelated]),'highlights');
 assert.match(html,/data-test-advanced-slot/);assert.equal((html.match(/id="nutrition-row-synthetic_nam_1"/g)||[]).length,1);
 assert.match(html,/id="nutrition-row-synthetic-unadmitted"/);assert.match(html,/Synthetic unrelated compound/);
 assert.match(html,/>9 mg \[4\]</);assert.match(html,/>3 mg</);
});

test('empty and unrelated foods have no B3 subsection or empty form entries',()=>{
 assert.deepEqual(project(fixture([null,undefined,{}])).observations,[]);
 assert.equal(render(fixture([]),'highlights'),'');
 for(const slug of ['chicken','almonds','spinach']){
  const food=matter(fs.readFileSync(`docs/foods/${slug}.md`,'utf8')).data;
  assert.deepEqual(project(food).observations,[]);
  assert.doesNotMatch(render(food,'highlights'),/Vitamin B3 — Individual Forms/);
  assert.doesNotMatch(render(food),/Vitamin B3 — Individual Forms/);
 }
});

test('evidence navigation removes only advanced and preserves meaningful parameters and the canonical anchor',()=>{
 assert.equal(projection.foodFormReferenceHref('#food-source-4',{pathname:'/docs/foods/test',search:'?advanced=1&serving=50&context=review'}),'/docs/foods/test?serving=50&context=review#food-source-4');
 assert.equal(projection.foodFormReferenceHref('#other-anchor',location),null);
 assert.equal(projection.foodFormReferenceHref('https://example.org/source',location),null);
});
