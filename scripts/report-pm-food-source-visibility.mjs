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
const file=process.cwd()+'/src/lib/pmInputFoodDisclosure.ts',mod=new Module(file),require=createRequire(file);
mod.filename=file;mod.require=id=>id.endsWith('documentedFoodSources.mjs')?documented:id.endsWith('rankedFoodSources.mjs')?ranked:id.endsWith('foodTargetTraceability.mjs')?trace:id.endsWith('inputSubstanceFoodSelection.mjs')?selection:id.endsWith('aggregateFoodComposition.mjs')?aggregate:id.endsWith('inputMappingScopes.mjs')?{default:{BRS2:data}}:require(id);
mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);

const dir='review/pm-food-source-visibility-2026-11-09';
const connections=new Map(), scopeCounts=[];
for(const brs of ['brs1','brs2','brs3','brs4','brs5','brs6','brs-x']) {
 const scope=JSON.parse(fs.readFileSync(`src/data/${brs}InputMapping.generated.json`));
 const local=new Set();
 for(const pmId of new Set(scope.relationships.map(r=>r.pm))) {
  const rs=scope.relationships.filter(r=>r.pm===pmId&&r.presentations?.length);
  const selected=ranked.rankedSourcesForRelationships(snapshot,pmId,rs);
  for(const s of documented.documentedSourcesForRelationships(scope,pmId,rs,selected)) {
   const key=[pmId,s.substance_id,s.food_id].join('|');
   connections.set(key,{pm:pmId,food:s.food_id,substance:s.substance_id,source_records:s.presence_records.map(p=>p.record),preparation:s.preparation});local.add(key);
  }
 }
 scopeCounts.push({scope:brs,connections:local.size});
}
const result={definition:'Unique food–substance–PM triples; unranked occurrences carry no RSP and do not enter wheel counts.',snapshot:snapshot.snapshot_id,before:{ranked:snapshot.counts.connections,documented_unranked:0},after:{ranked:snapshot.counts.connections,documented_unranked:connections.size},unranked_pms:new Set([...connections.values()].map(c=>c.pm)).size,scopeCounts,connections:[...connections.values()]};
fs.writeFileSync(dir+'/counts.json',JSON.stringify(result,null,2)+'\n');
let html='<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>PM7 two-layer source review</title><style>body{font:16px system-ui;max-width:900px;margin:32px auto;padding:16px}details{margin:10px 0}li{margin:8px 0}summary{cursor:pointer}a{color:#a22222}h2{margin-top:32px}</style><h1>PM7 — source-layer regression fixture</h1><p>Local renderer output for review. No ranking or admission changes.</p>';
for(const input of ['Choline','Phosphatidylcholine','Uridine','Betaine','Methionine']) {
 const rs=data.relationships.filter(r=>r.pm===pm&&r.input===input&&r.dietary_input===true),q=ranked.rankedSourcesForRelationships(snapshot,pm,rs),u=documented.documentedSourcesForRelationships(data,pm,rs,q);
 html+=`<h2>${input}</h2><p>Ranked sources: ${q.length}</p><ul>${q.map(s=>`<li>${s.food_title}: ${s.observations[0].display} — ${s.preparation}; rank ${s.rank}</li>`).join('')}</ul>`+mod.exports.renderDocumentedFoodSources(u);
}
fs.writeFileSync(dir+'/pm7-example.html',html);console.log(JSON.stringify({...result,connections:undefined}));
