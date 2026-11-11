import fs from 'node:fs';
import {documentedSourcesForRelationships,isCanonicalAnimalSource} from '../src/data/documentedFoodSources.mjs';
import {rankedSourcesForRelationships} from '../src/data/rankedFoodSources.mjs';
import {renderFoodWheel} from './lib/food-wheel-render.mjs';
const review=process.argv.includes('--reference-preview');
const reviewDir='review/ranked-food-reconciliation/reference-pool';
const out=review?reviewDir+'/explore/food-wheel/':'static/explore/food-wheel/',html=fs.readFileSync(out+'index.html','utf8');
const data=JSON.parse(html.split('<script>const DATA=')[1].split(';const $=')[0]);
const snapshot=JSON.parse(fs.readFileSync(review?reviewDir+'/ranking.json':'src/data/rankedFoodSources.generated.json'));
// Apply only explicitly reconciled development targets; preserve the frozen published/reference snapshot.
const refreshedIds=new Set(review?snapshot.targets.map(t=>t.substance_id):snapshot.local_reconciliation?.substance?[snapshot.local_reconciliation.substance]:[]);
const refreshedTargets=snapshot.targets.filter(t=>refreshedIds.has(t.substance_id));
const ranked=[...data.canonicalNetworks.topFive.selections.filter(e=>!refreshedIds.has(e.substance_id)),...refreshedTargets.flatMap(t=>t.selected.map(r=>({edge_id:r.edge_id,food_id:r.food_id,substance_id:t.substance_id,pm_id:t.pm_id,brs:t.brs,status:t.status,relationship_ids:t.relationship_ids,limitations:t.limitations,network:'approved',food_pair_id:r.food_id+'|'+t.substance_id,delivery:'Documented composition; PM association does not establish efficacy',rank:r.rank,relative_power:r.relative_power,threshold_status:'provisional',ranking_observation:r.observation,comparison_group:r.comparison_group})))];
data.foodPairs=data.foodPairs.filter(p=>!refreshedIds.has(p.substance));
for(const t of refreshedTargets)for(const r of t.selected){
 if(!data.foods.some(f=>f.id===r.food_id))data.foods.push({id:r.food_id,title:r.source.food_title,page:r.source.food_page,record:r.source.food_record,targets:0,pairs:[]});
 const id=r.food_id+'|'+t.substance_id;let pair=data.foodPairs.find(p=>p.id===id);if(!pair){pair={id,food:r.food_id,substance:t.substance_id,existing:true,sources:[r.source],observations:[r.observation],occurrences:[],qualified:[]};data.foodPairs.push(pair);}pair.qualified.push(ranked.find(e=>e.edge_id===r.edge_id));
}
const edges=new Map(),excluded=[];
for(const scope of ['brs1','brs2','brs3','brs4','brs5','brs6','brs-x']){
 const mapping=JSON.parse(fs.readFileSync(`src/data/${scope}InputMapping.generated.json`));
 for(const pm of new Set(mapping.relationships.map(r=>r.pm))){
  const rs=mapping.relationships.filter(r=>r.pm===pm&&r.presentations?.length),q=rankedSourcesForRelationships(snapshot,pm,rs);
  for(const s of documentedSourcesForRelationships(mapping,pm,rs,q,snapshot)){
   // Whole Grains documents a food category. Its wheat evidence belongs on the food pages.
   if (s.food_id === 'whole-grains') {
    excluded.push({pm,food:s.food_id,substance:s.substance_id,reason:'Category-level food identity'});
    continue;
   }
   const node=data.network.inventory.find(n=>n.id===s.substance_id&&n.inclusion==='included');
   const rel=data.network.connections.find(c=>c.substance===s.substance_id&&c.records?.some(r=>r.pm===pm));
   if(!node||!rel){excluded.push({pm,food:s.food_id,substance:s.substance_id,reason:'No existing wheel substance–PM relationship; not manufactured'});continue;}
   // Project only this identified chicken preparation onto the chicken node.
   const roastedChicken = s.food_id === 'dark-meat-poultry' && s.substance_id === 'iron'
    && s.presence_records.some(p => p.source_url === 'https://fdc.nal.usda.gov/food-details/171065/nutrients');
   const foodId = roastedChicken ? 'chicken' : s.food_id;
   if(ranked.some(e=>e.food_id===foodId&&e.substance_id===s.substance_id&&e.pm_id===pm))continue;
   const key=[foodId,s.substance_id,pm].join('|');
   const layer=s.observations.length?(s.measurement_kind==='estimated'?'Sequence-derived estimate, unranked':s.measurement_kind==='calculated'?'Calculated, unranked':'Measured, unranked'):s.presence_records.some(p=>p.presence_status==='product_or_preparation_dependent')?'Preparation-dependent — not ranked':'Presence-only — quantity not established, not ranked';
   if(!edges.has(key))edges.set(key,{edge_id:key,food_id:foodId,substance_id:s.substance_id,pm_id:pm,brs:rel.brs,status:'documented-unranked',layer:roastedChicken ? 'Roasted chicken dark meat with skin · '+layer : layer,relationship_ids:[],limitations:[],network:'approved',food_pair_id:foodId+'|'+s.substance_id,delivery:'Documented food occurrence/provision; not intervention efficacy',sources:[]});
   const e=edges.get(key);e.sources.push(s);e.relationship_ids=[...new Set([...e.relationship_ids,...s.relationship_ids])];e.limitations=[...new Set([...e.limitations,...rs.filter(r=>s.relationship_ids.includes(r.id)).map(r=>r.limitation).filter(Boolean)])];
  }
 }
}
data.documentedUnranked=[...edges.values()];data.relatedSources=JSON.parse(fs.readFileSync(review?reviewDir+'/explore/pm-explorer/pm-sources.json':'static/explore/pm-explorer/pm-sources.json')).foods.filter(f=>f.status==='contextual-related').map(f=>({edge_id:[f.food,f.substance,f.pm,'related'].join('|'),food_id:f.food,substance_id:f.substance,pm_id:f.pm,brs:'BRS5',status:'contextual-related',layer:f.layer,relationship_ids:f.member_pathways.map(p=>'resistant-starch-'+p.related_id),limitations:[f.limitation],network:'approved',food_pair_id:f.food+'|'+f.substance,related_source:f,direct_containment:false}));
 data.displaySelections=[...ranked,...data.documentedUnranked,...data.relatedSources];
for(const e of [...data.documentedUnranked,...data.relatedSources]){
 if(!data.foods.some(f=>f.id===e.food_id)){const s=e.sources[0];data.foods.push({id:e.food_id,title:s.food_title,page:s.food_page,record:s.food_record,targets:0,pairs:[]});}
 let pair=data.foodPairs.find(p=>p.id===e.food_pair_id);if(!pair){pair={id:e.food_pair_id,food:e.food_id,substance:e.substance_id,existing:true,sources:[],observations:[],occurrences:[],qualified:[]};data.foodPairs.push(pair);}pair.qualified.push(e);
}
// Display labels describe the food materials in the selected source records.
const foodLabels = {soy: 'Mature soybeans (raw)', liver: 'Liver (beef)', heart: 'Heart (beef)', kidney: 'Kidney (beef)'};
for (const food of data.foods) {
 if (foodLabels[food.id]) food.title = foodLabels[food.id];
}
for(const f of data.foods){f.targets=new Set(data.displaySelections.filter(e=>e.food_id===f.id).map(e=>e.substance_id+'|'+e.pm_id)).size;f.pairs=[...new Set(data.displaySelections.filter(e=>e.food_id===f.id).map(e=>e.food_pair_id))];}
if(review){
 const group = id => Number(isCanonicalAnimalSource({food_id:id}));
 data.foods=data.foods.filter(f=>f.targets>0).sort((a,b)=>group(a.id)-group(b.id)||a.title.localeCompare(b.title));
 data.displaySelections.sort((a,b)=>group(a.food_id)-group(b.food_id)||(a.rank??Infinity)-(b.rank??Infinity)||a.food_id.localeCompare(b.food_id));
 data.canonicalNetworks.topFive.selections=ranked;
 data.ranked_snapshot_id=snapshot.snapshot_id;
 data.selection_policy=snapshot.policy;
 data.counts={selected_foods:snapshot.counts.foods,ranked_pm_edges:ranked.length,qualified_targets:snapshot.counts.covered_targets,eligible_targets:snapshot.counts.targets};
 data.release={source_sha256:snapshot.snapshot_id,experiment:'Local reference-pool candidate, pending publication review',selection:'Provisional 10% minimum, maximum ten, at least two comparable foods',covered_targets:snapshot.counts.covered_targets,total_targets:snapshot.counts.targets};
 data.composition_authority='Local canonical records; publication-source differences remain under review';
 data.source_hashes=snapshot.source_hashes;
}
data.unrankedAudit={excluded,ranked_preserved:ranked.length,unranked:data.documentedUnranked.length,related:data.relatedSources.length,foods:data.foods.length,targets:new Set(data.displaySelections.map(e=>e.substance_id+'|'+e.pm_id)).size};
fs.writeFileSync(out+'display-network.json',JSON.stringify(data)+'\n');
let svg=renderFoodWheel(data,fs.readFileSync('scripts/templates/food-wheel-substance-layout.svg','utf8'));svg=svg.replace('Food labels: unique power-qualified substance–PM connections. Provisional threshold 10%; maximum ten foods per target.','Food labels: distinct ranked + documented-unranked substance–PM connections. Unranked is not quantity or power.');
fs.writeFileSync(out+'display-network.svg',svg);
console.log(JSON.stringify(data.unrankedAudit));
