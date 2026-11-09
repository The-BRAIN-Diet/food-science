import {validateAminoAcidProfile,EAA_IDS} from './aggregateFoodComposition.mjs';
/** Extract explicitly reported constituents, never infer them from total protein or an aggregate sum. */
export function resolveAminoAcidProfileSources(food, needed, record) {
 if(food.retired_identity || food.composition_status==='withdrawn')return [];
 return (food.nutrition_amino_acid_profiles||[]).flatMap(profile=>{
  if(profile.verified===false || profile.rank_eligible===false || ['internal-only','excluded-error','substance-only'].includes(profile.public_display) || validateAminoAcidProfile(profile).length)return [];
  return EAA_IDS.filter(id=>needed.has(id)).flatMap(id=>{
   const measurement=profile.amino_acids[id];
   const reviews=(food.nutrition_value_reviews||[]).filter(r=>r.correction_status!=='resolved'||r.exclude_from_food_lists);
   if(reviews.some(r=>r.substance_id===id||[id+'_g',id+'_mg'].includes(r.nutrient_key||r.key)||(!r.substance_id&&!r.nutrient_key&&!r.key&&r.correction_status==='pending')))return [];
   const pointer=`${record}#nutrition_amino_acid_profiles/${profile.id}/amino_acids/${id}`;
   const limitation=[profile.limitations, 'Individual USDA composition observation in the stated food preparation. Not digestible amino-acid availability, brain delivery, conversion yield or clinical efficacy.'].filter(Boolean).join(' ');
   const observation={...measurement,id:pointer,record:pointer,source_record:`${record}#nutrition_amino_acid_profiles/${profile.id}`,value:measurement.value,unit:profile.unit,display:`${measurement.value} ${profile.unit}`,basis:profile.basis,material:profile.material,preparation:profile.preparation,source_url:profile.source.source_url,nutrition_source:profile.source,verified:true,rank_eligible:true,comparison_group:`edible::${profile.preparation}`,low:measurement.value*1000,high:measurement.value*1000,limitations:limitation,source_note:limitation,material_limitations:limitation};
   return [{id:`${food.id}::${id}::${profile.id}`,food_id:food.id,food_title:food.title,food_page:`/docs/foods/${food.id}`,food_record:record,substance_id:id,material:profile.material,preparation:profile.preparation,food_group:profile.food_group,relationship:'contains',observations:[observation],presence_records:[{record:pointer,source_url:profile.source.source_url,evidence:'Explicit individual amino-acid observation; no disaggregation or inference from total protein.',limitations:limitation}],qualification:[],limitations:limitation}];
  });
 });
}
