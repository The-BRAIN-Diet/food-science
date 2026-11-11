export function buildPilot(data,ledger,pmSources){
 const pms=pmSources?.pms||data.network.pm_inventory;
 const relationships=data.network.connections.flatMap(c=>(c.records||[]).map(r=>({...r,substance:c.substance})));
 for(const c of ledger.children)relationships.push({...c.relationship,pm:c.relationship.pm,substance:c.substance_id,status:c.publication,route:'experimental identity',limitation:c.limitations_and_nulls,observed:c.observed_endpoints,child:true});
 for(const r of pmSources?.historicalRelationships||[])if(!relationships.some(x=>x.id===r.id))relationships.push(r);
 const foods=data.canonicalNetworks.topFive.selections.map(e=>({...e,pm:e.pm_id,substance:e.substance_id,food:e.food_id,layer:'Ranked',qualification:e.limitations}));
 for(const p of ledger.parents)foods.push({...p,layer:p.source.observations.length?'Measured, unranked':'Presence-only, unranked'});
 if(pmSources){foods.splice(0,foods.length,...pmSources.foods);for(const r of relationships){const canonical=pmSources.relationships.find(x=>x.id===r.id);if(canonical)Object.assign(r,{projection_status:canonical.projection_status??r.projection_status,limitation:canonical.limitation??r.limitation,canonical_relationship:canonical,scientific_admission:canonical.scientific_admission});}}
 for(const r of pmSources?.relationships||[])if(r.substance_id&&!relationships.some(x=>x.id===r.id))relationships.push({...r,substance:r.substance_id,route:r.accounting_label||r.relationship_type?.layer,status:r.scientific_admission});
 const childIds=new Set(ledger.children.map(c=>c.substance_id));
 if(foods.some(f=>childIds.has(f.substance)))throw Error('Experimental child food inheritance prohibited');
 return {pms,relationships,foods};
}

// Presentation order only: never changes eligibility, global ranks or observations.
export function orderedFoodGroups(records) {
 const groups=[...new Set(records.map(r=>r.food))].map(food=>{
  const rows=records.filter(r=>r.food===food);
  return {food,records:rows,group:rows[0].food_group||'plant',rank:Math.min(...rows.filter(r=>r.layer==='Ranked'&&Number.isFinite(r.rank)).map(r=>r.rank))};
 });
 return groups.sort((a,b)=>(a.group==='animal')-(b.group==='animal') || (a.rank===b.rank?0:a.rank-b.rank) || a.food.localeCompare(b.food));
}
