const mentions = {
  turmeric: ['Curcumin'], ginger: ['Gingerols'], spinach: ['Folate'],
};
export function ingredientSources(data, names, id) {
  const records = data.records.filter(r => id && r.food === id);
    // Frozen spinach has a separate composition panel. The recipe starts with raw leaves.
    const compatible = records.filter(r => !(id === 'spinach' && r.preparation !== 'raw'));
    for(const observation of (data.recipeObservations || []).filter(o=>o.food===id)){
      for(const route of data.relationships){
        if(route.substance_id!==observation.substance || route.scientific_admission!=='admitted' ||
           !route.dietary_input || route.projection_status || route.food_target_mapping!=='verified' ||
           route.relationship_type?.layer!=='dietary-requirement') continue;
        if(compatible.some(r=>r.substance===observation.substance && r.pm===route.pm)) continue;
        compatible.push({...observation,pm:route.pm,layer:'Quantified, unranked',
          classification:route.relationship_type.classification,pmLimitation:route.limitation});
      }
    }
    const groups = new Map();
    for (const r of compatible) {
      if (!groups.has(r.substance)) groups.set(r.substance, []);
      groups.get(r.substance).push(r);
    }
    for (const mention of mentions[id] || []) {
      if (![...groups.keys()].some(k => (names.get(k)||k).toLowerCase().includes(mention.toLowerCase()))) groups.set(mention,[]);
    }
  return {groups, compatible};
}
