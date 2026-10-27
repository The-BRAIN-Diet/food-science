/** Reciprocal projection of the same admitted PM records used by food dropdowns. */
export function foodDietaryRelationships(scopes, foodId) {
  return Object.values(scopes).flatMap(scope=>(scope.relationships||[]).filter(r=>r.scientific_admission==='admitted' && r.dietary_input===true).flatMap(r=>{
    const foods=(r.food_targets||[]).filter(f=>f.food_id===foodId && f.mapping_status==='verified');
    return foods.length?[{id:r.id,pm:r.pm,pm_page:r.pm_page,input:r.input,substance_page:r.substance_page,type:r.scientific_assessment?.type || (r.relationship_type?.mode==='capacity-requirement'?'A':r.relationship_type?.mode==='state-regulation'?'B':null),classification:r.scientific_assessment?.classification||r.relationship_type?.classification,limitation:r.limitation,foods}]:[];
  }));
}
