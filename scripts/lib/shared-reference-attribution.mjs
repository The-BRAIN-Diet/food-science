/** Selection-only attribution. Never edits canonical values or supplementary evidence. */
export function attributeSharedReferencePanels(sources, panels, policy) {
  const holds=new Map(policy.identity_holds.flatMap(h=>h.food_ids.map(id=>[id,h.reason])));
  return sources.map(source=>({...source,observations:source.observations.map(observation=>{
    if(holds.has(source.food_id))return {...observation,ranking_hold:holds.get(source.food_id)};
    const panel=panels.find(p=>p.food_ids.includes(source.food_id));
    if(!panel || !observation.record.includes('#nutrition_per_100g/'))return {...observation};
    const decision=policy.shared_reference_attributions?.find(d=>String(d.fdc_id)===panel.source.split('|')[1] && d.food_ids.includes(source.food_id));
    const attribution={source_panel:panel.source,source_description:decision?.source_description,representative_food_id:decision?.representative_food_id??null,status:decision?.status??'unresolved',qualification:decision?.qualification??'Shared reference panel; attribution unresolved'};
    if(decision?.status==='source-description-match' && decision.representative_food_id===source.food_id)
      return {...observation,shared_reference:attribution,source_note:[observation.source_note,decision.qualification].filter(Boolean).join(' ')};
    return {...observation,shared_reference:attribution,ranking_hold:decision?.representative_food_id?`Shared reference observation attributed once to ${decision.representative_food_id}; not an independent measurement of ${source.food_id}`:attribution.qualification};
  })}));
}
