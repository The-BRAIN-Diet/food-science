/** Composition-derived class projection. Never creates contains edges or PM admissions. */
export const EAA_IDS = ['histidine','isoleucine','leucine','lysine','methionine','phenylalanine','threonine','tryptophan','valine'];
const round = value => Math.round(value * 1000) / 1000;
/** Compact presentation only; the profile and calculated total retain their precision. */
export const formatAggregateSumForDropdown = value => new Intl.NumberFormat('en', {maximumFractionDigits: 2, useGrouping: false}).format(value);
export function validateAminoAcidProfile(p) {
  const errors = [];
  if (p?.basis !== 'per 100 g edible portion' || p?.unit !== 'g') errors.push('Exact edible 100 g basis and gram units required');
  if (!p?.material || !p?.preparation || !['plant','animal'].includes(p?.food_group)) errors.push('Material, preparation and food group required');
  if (!Number.isInteger(p?.source?.fdc_id) || p?.source?.source_url !== `https://fdc.nal.usda.gov/food-details/${p?.source?.fdc_id}/nutrients`) errors.push('Exact FDC identity required');
  for (const id of EAA_IDS) if (!(Number.isFinite(p?.amino_acids?.[id]?.value) && p.amino_acids[id].value > 0 && p.amino_acids[id].source_row_id)) errors.push(`Missing measured/database constituent: ${id}`);
  if (!(Number.isFinite(p?.protein_g) && p.protein_g > 0 && p.protein_source_row_id)) errors.push('Same-record protein required');
  if (p?.amino_acids && EAA_IDS.reduce((s,id)=>s+(p.amino_acids[id]?.value||0),0) > p.protein_g) errors.push('Constituent sum exceeds protein');
  const portion = p?.portion;
  if (!(portion?.source_row_id && portion.label && portion.source_grams > 0 && portion.multiplier > 0 && portion.multiplier <= 1)) errors.push('Documented portion and explicit scaling required');
  return errors;
}
export function resolveAggregateFoodSources(food, aggregate, record = '') {
  if (aggregate?.identity_type !== 'defined-substrate-class' || aggregate.constituent_ids?.length !== EAA_IDS.length || !EAA_IDS.every(id => aggregate.constituent_ids.includes(id))) return [];
  return (food.nutrition_amino_acid_profiles || []).flatMap(p => {
    if (validateAminoAcidProfile(p).length) return [];
    const value = round(EAA_IDS.reduce((s,id)=>s+p.amino_acids[id].value,0));
    const grams = round(p.portion.source_grams*p.portion.multiplier);
    const pointer = `${record}#nutrition_amino_acid_profiles/${p.id}`;
    const evidence = {record:pointer, source_url:p.source.source_url, evidence:'Sum of nine separately reported indispensable amino acids in the same USDA food record; not inferred from total protein.', projection_kind:'constituent-composition', constituent_ids:EAA_IDS, profile:p};
    const id = food.id;
    return [{id:`${id}::${aggregate.id}::${p.id}`,substance_id:aggregate.id,food_id:id,food_title:food.title,food_page:`/docs/foods/${id}`,food_record:record,material:p.material,preparation:p.preparation,food_group:p.food_group,relationship:'constituent-composition',projection_kind:'constituent-composition',aggregate_composition:{profile:p,protein_g:p.protein_g,eaa_g:value,portion_grams:grams,portion_eaa_g:round(value*grams/100),portion_protein_g:round(p.protein_g*grams/100)},presence_records:[evidence],observations:[{id:pointer,record:pointer,verified:true,value,unit:'g',basis:p.basis,display:`${value} g`,low:value*1000,high:value*1000,source_url:p.source.source_url,rank_eligible:true,comparison_group:'nine-EAA::as-eaten-100g',material:p.material,preparation:p.preparation}],qualification:[],limitations:'Sum of nine amino acids per 100 g of the stated edible form. Water content differs between foods; portions are illustrative. This is not digestible amino-acid content, a protein-quality score, a complete-meal requirement or a PM intervention dose.'}];
  });
}
export function verifiedAggregateEvidence(e) {
  return e?.projection_kind === 'constituent-composition' && String(e.record||'').includes('#nutrition_amino_acid_profiles/') && e.constituent_ids?.length === 9 && EAA_IDS.every(id=>e.constituent_ids.includes(id)) && validateAminoAcidProfile(e.profile).length === 0;
}
