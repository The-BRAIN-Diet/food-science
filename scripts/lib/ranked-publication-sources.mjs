// Publication eligibility is independent of canonical existence and PM admission.
export function partitionPublicationSources(sources, manifest) {
 const allowed=new Set(Object.keys(manifest.files||{}));
 const eligible=[], excluded=[], seen=new Set();
 for(const source of sources){
  const record=String(source.food_record||'').split('#')[0];
  if(allowed.has(record)){eligible.push(source);continue;}
  const key=source.food_id+'|'+record;
  if(!seen.has(key)){seen.add(key);excluded.push({food_id:source.food_id,food_record:record||null,reason:'Missing publication-source approval',action:`Review ${record||source.food_id}; after author publication approval, register its exact hash in system/ranked-food-publication-sources.json. Canonical composition and unranked evidence remain available.`});}
 }
 return {eligible,excluded:excluded.sort((a,b)=>a.food_id.localeCompare(b.food_id))};
}
