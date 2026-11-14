// Scoped, local-only reconciliation. Does not regenerate unrelated ranked targets or admission records.
import fs from 'node:fs';import crypto from 'node:crypto';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {selectRankedFoodSources} from '../src/data/rankedFoodSources.mjs';
import {attributeSharedReferencePanels} from './lib/shared-reference-attribution.mjs';
const snapshotFile='src/data/rankedFoodSources.generated.json',snapshot=JSON.parse(fs.readFileSync(snapshotFile));
const policy=JSON.parse(fs.readFileSync('system/ranked-food-source-policy.json'));
const changes=[];let sources=[];
for(const scope of ['brs1','brs2','brs3','brs4','brs5','brs6','brs-x']){
 const file=`src/data/${scope}InputMapping.generated.json`,old=JSON.parse(fs.readFileSync(file));
 if(!old.relationships.some(r=>r.substance_id==='tyrosine'))continue;
 const fresh=buildInputSubstanceFood(process.cwd(),{brs:scope.toUpperCase(),includeProfileConstituents:true});
 const newSources=fresh.food_sources.filter(s=>s.substance_id==='tyrosine');for(const s of newSources)for(const o of s.observations){o.source_url ||= o.nutrition_source?.fdc_id?'https://fdc.nal.usda.gov/food-details/'+o.nutrition_source.fdc_id+'/nutrients':null;o.source_note ||= s.presence_records.map(p=>p.limitations).filter(Boolean).join(' ');}sources.push(...newSources);
 const ids=new Map(old.relationships.filter(r=>r.substance_id==='tyrosine').map(r=>[r.id,r]));
 old.food_sources=[...old.food_sources.filter(s=>s.substance_id!=='tyrosine'),...newSources];
 // Preserve the relationship and adjudication; replace only its generated source joins.
 for(const r of old.relationships.filter(r=>r.substance_id==='tyrosine')){const f=fresh.relationships.find(x=>x.id===r.id);if(!f)throw Error('Missing canonical relationship '+r.id);r.food_targets=f.food_targets;}
 fs.writeFileSync(file,JSON.stringify(old,null,2)+'\n');changes.push(file);
}
sources=[...new Map(sources.map(s=>[s.id,s])).values()];
const rankedSources=attributeSharedReferencePanels(sources,snapshot.duplicate_panels,policy);
for(const t of snapshot.targets.filter(t=>t.substance_id==='tyrosine')){
 if(t.hold)continue;const result=selectRankedFoodSources(rankedSources);
 t.selected=result.selected.map((x,i)=>{const source=sources.find(s=>s.id===x.source_id);return {...x,rank:i+1,source:{...source,observations:undefined,presence_records:undefined},edge_id:x.food_id+'|tyrosine|'+t.pm_id};});
 t.excluded=result.excluded;t.comparisons=result.comparisons;t.ranking_status=t.selected.length?'ranked':'unranked';
}
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const audit=JSON.parse(fs.readFileSync('review/tyrosine-animal-coverage-2026-11-09/usda-audit.json'));
for(const file of [...audit.filter(a=>a.installed_mg_per_100g!=null).map(a=>a.file),'scripts/lib/input-substance-food.mjs'])snapshot.source_hashes[file]=hash(fs.readFileSync(file));
snapshot.local_reconciliation={date:'2026-11-09',substance:'tyrosine',authority:'Author-approved verified composition recovery and compatible-preparation correction; top ten retained. Development only, publication review pending.',evidence:'review/tyrosine-animal-coverage-2026-11-09/usda-audit.json'};
snapshot.snapshot_id=hash(JSON.stringify({source_hashes:snapshot.source_hashes,targets:snapshot.targets,policy:snapshot.policy}));
snapshot.counts={targets:snapshot.targets.length,covered_targets:snapshot.targets.filter(t=>t.selected.length).length,connections:snapshot.targets.reduce((n,t)=>n+t.selected.length,0),foods:new Set(snapshot.targets.flatMap(t=>t.selected.map(s=>s.food_id))).size};
fs.writeFileSync(snapshotFile,JSON.stringify(snapshot,null,2)+'\n');
console.log(snapshot.counts);console.log(snapshot.targets.find(t=>t.substance_id==='tyrosine').selected.map(r=>({food:r.food_id,mg:r.contained_amount.low,power:r.relative_power})));
