import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import matter from 'gray-matter';
import {attributeSharedReferencePanels} from './lib/shared-reference-attribution.mjs';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {selectRankedFoodSources,RANKED_FOOD_POLICY} from '../src/data/rankedFoodSources.mjs';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex'),root=process.cwd(),policy=JSON.parse(fs.readFileSync('system/ranked-food-source-policy.json'));
const approved=JSON.parse(fs.readFileSync('system/ranked-food-publication-sources.json'));
for(const [file,expected]of Object.entries(approved.files))if(hash(fs.readFileSync(file))!==expected)throw Error('Publication-approved source changed: '+file+'; reconcile before generation');
const maps=['BRS1','BRS2','BRS3','BRS4','BRS5','BRS6','BRS-X'].map(brs=>buildInputSubstanceFood(root,{brs,includeProfileConstituents:true}));
const sources=[...new Map(maps.flatMap(m=>m.food_sources).map(s=>[s.id,s])).values()].sort((a,b)=>a.id.localeCompare(b.id));
const relationships=maps.flatMap(m=>m.relationships),foodDocs=fs.readdirSync('docs/foods').filter(f=>/\.mdx?$/.test(f)).sort().map(f=>({file:'docs/foods/'+f,...matter(fs.readFileSync('docs/foods/'+f,'utf8'))}));
const panelGroups=new Map();for(const f of foodDocs){if(f.data.retired_identity)continue;const n=f.data.nutrition_source;if(n?.fdc_id){const key=[n.database,n.fdc_id,n.food_name,n.basis].join('|');if(!panelGroups.has(key))panelGroups.set(key,[]);panelGroups.get(key).push(f.data.id||path.basename(f.file,'.md'));}}
const duplicatePanels=[...panelGroups].filter(([k,ids])=>ids.length>1).map(([source,food_ids])=>({source,food_ids,reason:'Shared reference panel reused by distinct food preparations; not independent preparation-specific measurements.'}));
const rankingSources=attributeSharedReferencePanels(sources,duplicatePanels,policy);
const sourceFiles=[...new Set([...maps.flatMap(m=>m.source_records),...foodDocs.map(f=>f.file),'system/ranked-food-source-policy.json','system/ranked-food-publication-sources.json','scripts/lib/shared-reference-attribution.mjs','scripts/lib/input-substance-food.mjs','src/data/relatedSubstanceRelationships.mjs','scripts/generate-ranked-food-sources.mjs','src/data/rankedFoodSources.mjs','src/lib/aminoAcidProfileSources.mjs','src/lib/aggregateFoodComposition.mjs'])].sort();
const source_hashes=Object.fromEntries(sourceFiles.filter(f=>fs.existsSync(f)).map(f=>[f,hash(fs.readFileSync(f))]));
const snapshot_id=hash(JSON.stringify({source_hashes,policy:RANKED_FOOD_POLICY})),targets=[];
for(const target_id of [...new Set(relationships.filter(r=>r.dietary_input===true&&r.substance_id).map(r=>r.pm+'|'+r.substance_id))].sort()){
 const rs=relationships.filter(r=>r.pm+'|'+r.substance_id===target_id&&r.dietary_input===true),r=rs[0],hold=policy.target_holds.find(h=>h.target_id===target_id);
 const sourcePool=rankingSources.filter(s=>s.substance_id===r.substance_id),result=hold?{selected:[],excluded:sourcePool.map(s=>({food_id:s.food_id,reason:hold.reason})),comparisons:[]}:selectRankedFoodSources(sourcePool);
 const selected=result.selected.map((x,i)=>{const source=sources.find(s=>s.id===x.source_id);if(!source)throw Error('Missing selected source');return {...x,rank:i+1,source:{...source,observations:undefined,presence_records:undefined},edge_id:x.food_id+'|'+r.substance_id+'|'+r.pm};});
 targets.push({target_id,pm_id:r.pm,pm_page:r.pm_page,substance_id:r.substance_id,brs:r.brs,relationship_ids:rs.map(r=>r.id).sort(),limitations:rs.map(r=>r.limitation).filter(Boolean),status:'admitted',ranking_status:hold?'held':selected.length?'ranked':'unranked',hold:hold?.reason||null,selected,comparisons:result.comparisons,excluded:result.excluded});
}
const counts={targets:targets.length,covered_targets:targets.filter(t=>t.selected.length).length,connections:targets.reduce((n,t)=>n+t.selected.length,0),foods:new Set(targets.flatMap(t=>t.selected.map(s=>s.food_id))).size};
const snapshot={snapshot_id,policy:RANKED_FOOD_POLICY,approved_source_baseline:approved.baseline_commit,source_hashes,counts,duplicate_panels:duplicatePanels,shared_reference_attributions:policy.shared_reference_attributions,identity_holds:policy.identity_holds,targets};
fs.writeFileSync('src/data/rankedFoodSources.generated.json',JSON.stringify(snapshot,null,2)+'\n');
fs.mkdirSync('system/generated/ranked-food-sources',{recursive:true});fs.writeFileSync('system/generated/ranked-food-sources/diagnostics.generated.json',JSON.stringify(snapshot,null,2)+'\n');
console.log('Shared ranked snapshot',snapshot_id,counts);
