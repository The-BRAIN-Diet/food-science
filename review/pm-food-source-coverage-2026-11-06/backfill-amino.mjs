// Reuse saved official FDC records. Explicit occurrence is independent of PM admission.
import fs from 'node:fs';import crypto from 'node:crypto';import matter from 'gray-matter';import yaml from 'js-yaml';
const dir='review/pm-food-source-coverage-2026-11-06';fs.mkdirSync(`${dir}/before`,{recursive:true});
const rows=[];
for(const food of ['beef','eggs','salmon','chicken','soy']){
 const file=`docs/foods/${food}.md`,text=fs.readFileSync(file,'utf8'),d=matter(text).data;
 const sourcePath=fs.readdirSync('review/visualisations/brain-food-wheel-2026-11-06/research-sources').find(p=>p.startsWith(food+'-fdc-'));
 const rawPath=`review/visualisations/brain-food-wheel-2026-11-06/research-sources/${sourcePath}`,fdc=JSON.parse(fs.readFileSync(rawPath));
 if(d.nutrition_source.fdc_id!==fdc.fdcId||d.nutrition_source.food_name!==fdc.description)throw Error(`Material mismatch ${food}`);
 const ref=food==='beef'?6:food==='salmon'?4:food==='soy'?7:food==='eggs'?6:2;
 const supp=[],edges=[];
 for(const name of ['Glycine','Serine','Phenylalanine']){
  const id=name.toLowerCase(),key=`${id}_fdc_${fdc.fdcId}_g`;
  if((d.nutrition_supplementary_sources||[]).some(r=>r.key===key))continue;
  const n=fdc.foodNutrients.find(n=>n.nutrient.name===name);if(!n||n.nutrient.unitName!=='g')throw Error('Missing exact nutrient');
  const derivation=n.foodNutrientDerivation?.description||'Derivation method not reported in this API record';
  const measured=n.foodNutrientDerivation?.code==='A';
  const limitation=`${fdc.description}. USDA derivation: ${derivation}. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy.`;
  const source=`https://fdc.nal.usda.gov/food-details/${fdc.fdcId}/nutrients`;
  supp.push({key,label:name,substance_id:id,value:n.amount,unit:'g',basis:'per 100 g edible portion',evidence_material:fdc.description,preparation_state:'raw',source_url:source,source_reference:`#food-source-${ref}`,source_note:limitation,public_note:`Raw-food composition; ${measured?'USDA analytical value':'USDA database value; derivation qualified in source record'}.`,evidence_status:'supported',presence_status:'presence_and_amount_supported',nutrition_panel_eligible:true,source_group:`USDA SR Legacy ${fdc.fdcId}`,food_nutrient_id:n.id,food_nutrient_derivation:n.foodNutrientDerivation||null,data_points:n.dataPoints??null,limitations:limitation});
  edges.push({substance:name,substance_id:id,relationship:'contains',description:`USDA FoodData Central records ${name.toLowerCase()} in this exact raw food. No dietary intervention efficacy inferred.`,evidence_status:'supported',presence_status:'presence_and_amount_supported',evidence_source:`USDA SR Legacy ${fdc.fdcId}`,evidence_material:fdc.description,preparation_state:'raw',source_url:source,source_reference:`#food-source-${ref}`,requires_supplementary_key:key});
  rows.push({food_id:food,substance_id:id,value:n.amount,unit:'g',basis:'per 100 g edible portion',derivation,measurement_class:measured?'analytical':'database-derived or unspecified; not described as measured',source,source_file:rawPath,source_sha256:crypto.createHash('sha256').update(fs.readFileSync(rawPath)).digest('hex'),record:file,key,limitation});
 }
 if(!supp.length)continue;
 const backup=`${dir}/before/${food}.md`;if(!fs.existsSync(backup))fs.writeFileSync(backup,text);
 let updated=text;
 const append=(field,values)=>{const block=yaml.dump(values,{lineWidth:110,noRefs:true}).split('\n').filter((v,i,a)=>i<a.length-1).map(l=>'  '+l).join('\n')+'\n';
 if(new RegExp(`^${field}:\\s*$`,'m').test(updated))updated=updated.replace(new RegExp(`^${field}:\\s*\\n`,'m'),`${field}:\n${block}`);
 else updated=updated.replace(/^---\n/,`---\n${field}:\n${block}`);};
 append('nutrition_supplementary_sources',supp);append('substance_relationships',edges);
 if(!updated.includes(`id="food-source-${ref}"`))updated+=`\n<span id="food-source-${ref}" />\n\n[${ref}] USDA Agricultural Research Service (2018). [FoodData Central SR Legacy: source-specific amino-acid composition](/docs/papers/BRAIN-Diet-References#usda_sr_foodless_targets_2018). ${fdc.description}; FDC ${fdc.fdcId}. Raw edible-portion values with source-specific derivation retained.\n`;
 const after=matter(updated).data;for(const r of supp)if(!after.nutrition_supplementary_sources.find(x=>x.key===r.key))throw Error('Write validation');
 fs.writeFileSync(file,updated);
}
fs.writeFileSync(`${dir}/amino-backfill-results.json`,JSON.stringify(rows,null,2));console.log(`Backfilled ${rows.length} exact-source observations; original documents preserved under before/`);
