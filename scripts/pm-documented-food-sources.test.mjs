import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import Module,{createRequire} from 'node:module';
import ts from 'typescript';
import * as documented from '../src/data/documentedFoodSources.mjs';
import * as ranked from '../src/data/rankedFoodSources.mjs';
import * as trace from '../src/lib/foodTargetTraceability.mjs';
import * as selection from '../src/data/inputSubstanceFoodSelection.mjs';
import * as aggregate from '../src/lib/aggregateFoodComposition.mjs';
const snapshot=JSON.parse(fs.readFileSync('src/data/rankedFoodSources.generated.json'));
const data=JSON.parse(fs.readFileSync('src/data/brs2InputMapping.generated.json'));
const pm='BRS2-FM3-PM7';
const relation=id=>data.relationships.find(r=>r.id===`${pm}::${id}`);
const sources=id=>{const rs=[relation(id)];return documented.documentedSourcesForRelationships(data,pm,rs,ranked.rankedSourcesForRelationships(snapshot,pm,rs));};
const file=process.cwd()+'/src/lib/pmInputFoodDisclosure.ts',mod=new Module(file),require=createRequire(file);
mod.filename=file;mod.require=id=>id.endsWith('documentedFoodSources.mjs')?documented:id.endsWith('rankedFoodSources.mjs')?ranked:id.endsWith('foodTargetTraceability.mjs')?trace:id.endsWith('inputSubstanceFoodSelection.mjs')?selection:id.endsWith('aggregateFoodComposition.mjs')?aggregate:id.endsWith('inputMappingScopes.mjs')?{default:{BRS2:data}}:require(id);
mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
test('PC restores exactly six evidence-qualified occurrences without ranks or quantities',()=>{const s=sources('PM7-DIT-4');assert.deepEqual(s.map(x=>x.food_id).sort(),['mussels','oysters','salmon-roe','soy-lecithin','sunflower-lecithin','trout-roe']);for(const x of s){assert.equal(x.rank,undefined);assert.equal(x.relative_power,undefined);assert.deepEqual(x.observations,[]);}const html=mod.exports.renderDocumentedFoodSources(s);assert.match(html,/Quantity not established — not ranked/);assert.match(html,/Source qualifications/);assert.doesNotMatch(html,/data-rank=|data-relative-power=/);});
test('uridine retains free-form distinction, delivery limits and original reference',()=>{const s=sources('PM7-DIT-7');assert.deepEqual(s.map(x=>x.food_id),['milk']);const html=mod.exports.renderDocumentedFoodSources(s);assert.match(html,/free uridine/);assert.match(html,/UMP/);assert.match(html,/adult systemic delivery/);assert.match(html,/10.3168/);});
test('qualitative choline coexists with eight unchanged ranked sources',()=>{const rs=[relation('PM7-DIT-3')];assert.equal(ranked.rankedSourcesForRelationships(snapshot,pm,rs).length,8);assert.deepEqual(sources('PM7-DIT-3').map(x=>x.food_id).sort(),['salmon-roe','sunflower-lecithin','tempeh','tofu','trout-roe','wheat-germ']);});
test('methionine retains ten; approved local betaine ranks coexist with qualitative shrimp',()=>{const met=data.relationships.find(r=>r.pm===pm&&r.input==='Methionine');assert.equal(ranked.rankedSourcesForRelationships(snapshot,pm,[met]).length,10);assert.deepEqual(documented.documentedSourcesForRelationships(data,pm,[met]),[]);assert.deepEqual(sources('PM7-DIT-6').map(s=>s.food_id),['shrimp']);});
test('no biochemical participant or unadmitted route creates qualitative food admission',()=>{for(const r of data.relationships.filter(r=>r.pm===pm&&r.dietary_input!==true))assert.deepEqual(documented.documentedSourcesForRelationships(data,pm,[r]),[]);});
test('blocked targets, internal-only duplicate records, quantities and unsupported assertions remain excluded',()=>{const r=relation('PM7-DIT-4'),s=sources('PM7-DIT-4')[0];for(const patch of [{observations:[{value:1,ranking_hold:'held'}]},{presence_records:s.presence_records.map(p=>({...p,public_display:'internal-only'}))},{presence_records:[{evidence:'Unsupported',source_url:'https://example.org',presence_status:'unsupported'}]},{mapping_status:'research-supported-provisional'}])assert.deepEqual(documented.documentedSourcesForRelationships({...data,food_sources:[]},pm,[{...r,food_targets:[{...s,...patch}]}]),[]);assert.deepEqual(documented.documentedSourcesForRelationships(data,pm,[{...r,food_targets:[]}]),[]);});
test('identity-based grouping ignores misleading analytical prose',()=>{assert.equal(documented.isCanonicalAnimalSource({food_id:'trout-roe'}),true);assert.equal(documented.isCanonicalAnimalSource({food_id:'tahini',material:'Compared with egg and liver'}),false);for(const id of ['herring','heart','ghee','lumpfish-roe'])assert.equal(documented.isCanonicalAnimalSource({food_id:id}),true,id);for(const id of ['kidney-beans','oyster-mushroom','turkey-tail-mushroom','aubergine'])assert.equal(documented.isCanonicalAnimalSource({food_id:id}),false,id);});
test('deduplication retains provenance and excludes ranked food pairs',()=>{const r=relation('PM7-DIT-4'),s=sources('PM7-DIT-4');assert.equal(documented.documentedSourcesForRelationships(data,pm,[r,r]).length,6);assert.equal(documented.documentedSourcesForRelationships(data,pm,[r],[s[0]]).length,5);});
test('all scopes keep qualitative connections separate from ranked snapshot without mutation',()=>{
 const before=JSON.stringify(snapshot), edges=new Set();
 for(const brs of ['brs1','brs2','brs3','brs4','brs5','brs6','brs-x']) {
  const d=JSON.parse(fs.readFileSync(`src/data/${brs}InputMapping.generated.json`));
  for(const id of new Set(d.relationships.map(r=>r.pm))) {
   const rs=d.relationships.filter(r=>r.pm===id&&r.presentations?.length),q=ranked.rankedSourcesForRelationships(snapshot,id,rs);
   for(const source of documented.documentedSourcesForRelationships(d,id,rs,q)) {
    assert(!q.some(s=>s.food_id===source.food_id&&s.substance_id===source.substance_id));
    assert.equal(source.observations.length,0);assert.equal(source.rank,undefined);
    assert(source.presence_records.every(p=>p.public_display!=='internal-only'));
    edges.add(`${id}|${source.substance_id}|${source.food_id}`);
   }
  }
 }
 assert.equal(JSON.stringify(snapshot),before);assert.equal(edges.size,204); // Refreshed snapshot includes four approved documented connections.
});

test('preparation-dependent sulforaphane renders its qualified label',()=>{const html=mod.exports.renderDocumentedFoodSources([{food_id:'broccoli',substance_id:'sulforaphane',food_title:'Broccoli',food_page:'/docs/foods/broccoli',preparation:'Sous vide',presence_records:[{presence_status:'product_or_preparation_dependent',evidence:'Preparation-qualified evidence'}]}]);assert.match(html,/Preparation-dependent — not ranked/);assert.doesNotMatch(html,/Quantity not established/);});

test('refreshed PM dropdowns recover four exact sources with provenance and preparation',()=>{
 const checks=[['brs3','BRS3-FM2-PM3','sulforaphane',['broccoli','broccoli-sprouts']],['brs5','BRS5-FM1-PM1','pectin',['apples']],['brs5','BRS5-FM2-PM5','pectin',['apples']]];
 const sections=[];
 for(const [scope,pm,id,expected] of checks){const d=JSON.parse(fs.readFileSync(`src/data/${scope}InputMapping.generated.json`));const rs=d.relationships.filter(r=>r.pm===pm&&r.substance_id===id),s=documented.documentedSourcesForRelationships(d,pm,rs);assert.deepEqual(s.map(x=>x.food_id).sort(),expected);const html=mod.exports.renderDocumentedFoodSources(s);assert.match(html,/Source qualifications/);assert.match(html,/#food-source-|liu_apple_pectin_2023/);assert.doesNotMatch(html,/data-rank=|data-relative-power=/);if(id==='pectin'){assert.match(html,/liu_apple_pectin_2023/);assert.match(html,/cultivar/i);}else{assert.match(html,/Preparation-dependent — not ranked/);assert.match(html,/100 °C/);assert.match(html,/mustard/);assert.match(html,/myrosinase|chopped|chewed/i);}sections.push(`<section><h2>${pm} — ${id}</h2>${html}</section>`);}
 const d=JSON.parse(fs.readFileSync('src/data/brs5InputMapping.generated.json'));assert.deepEqual(documented.documentedSourcesForRelationships(d,'BRS5-FM2-PM4',d.relationships.filter(r=>r.pm==='BRS5-FM2-PM4'&&r.substance_id==='pectin')),[]);
 fs.writeFileSync('review/dietary-connectivity-2026-11-09/source-omissions/page-verification/dropdowns.html','<!doctype html><meta charset="utf-8"><title>PM source dropdown verification</title><style>body{font:16px system-ui;margin:40px;max-width:1000px}details{padding:12px;border:1px solid #bbb;margin:12px 0}summary{cursor:pointer;color:#ad2626}li{margin:12px}a{color:#245cc0}</style><h1>Actual PM dropdown renderer — refreshed local mappings</h1><p>Focused renderer inspection; not a running Docusaurus page.</p>'+sections.join(''));
});

test('measured unranked renderer retains bases, calculation, variability and holds',()=>{
 const b2=JSON.parse(fs.readFileSync('src/data/brs2InputMapping.generated.json')),s=documented.documentedSourcesForRelationships(b2,'BRS2-FM1-PM1',b2.relationships,[],snapshot).filter(s=>s.observations.length);assert.equal(s.length,7);const html=mod.exports.renderDocumentedFoodSources(s);for(const term of ['Calculated from measurements','Measured — not ranked','fresh','41.63','unspecified','monoglutamate','extrapolation'])assert(html.includes(term),term);assert.doesNotMatch(html,/Quantity not established|data-rank=|data-relative-power=/);
 const b5=JSON.parse(fs.readFileSync('src/data/brs5InputMapping.generated.json')),rs=documented.documentedSourcesForRelationships(b5,'BRS5-FM2-PM5',b5.relationships,[],snapshot).filter(s=>s.observations.length),out=mod.exports.renderDocumentedFoodSources(rs);for(const term of ['dry matter','dry weight','moisture-corrected','2.2–5.4','ripening','reheated'])assert(out.includes(term),term);
 const ea=b5.food_sources.find(s=>s.substance_id==='ellagic-acid'&&s.observations.length);const preview=mod.exports.renderDocumentedFoodSources([{...ea,measurement_kind:'measured',presence_records:[],observations:ea.observations.map(o=>({...o,unranked_reason:'Volume basis; single sample'}))}]);assert.match(preview,/3.79 mg per 100 mL/);assert.match(preview,/37.9 mg/);assert.match(preview,/free ellagic acid/i);
});
