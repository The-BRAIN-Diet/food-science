import fs from 'node:fs';import matter from 'gray-matter';import yaml from 'js-yaml';
const dir='review/pm-food-source-coverage-2026-11-06';const log=[];
function backup(food,t){const p=`${dir}/before/${food}-before-betaine-frozen.md`;if(!fs.existsSync(p))fs.writeFileSync(p,t);}
const source='https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf';
for(const [food,value,ndb,n,material,prep]of [['spinach',120,'11463',3,'Spinach, frozen, chopped or leaf, unprepared; NDB 11463','frozen, unprepared']]){
 const file=`docs/foods/${food}.md`,t=fs.readFileSync(file,'utf8'),d=matter(t).data,key='betaine_usda_release2_'+ndb;if(d.nutrition_supplementary_sources?.some(r=>r.key===key))continue;backup(food,t);
 const ref=Math.max(0,...[...t.matchAll(/^\[(\d+)\]/gm)].map(m=>+m[1]))+1;
 const note=`Source-specific Release 2 assay (${n} sample${n>1?'s':''}); not a universal value or a cooked-food equivalent. Release 2 corrected earlier betaine overestimation. Choline confidence codes do not grade betaine. Preserve the specified material; no bioavailability or clinical efficacy inferred.`;
 const row={key,label:'Betaine',substance_id:'betaine',value,unit:'mg',basis:'per 100 g food',evidence_material:material,preparation_state:prep,source_url:source,source_reference:`#food-source-${ref}`,source_note:note,rank_eligible:true,comparison_group:'betaine::USDA-release2::food-mass',composition_review_status:'research-qualified-local',sample_count:n};
 const rel={substance:'Betaine',substance_id:'betaine',relationship:'contains',evidence_status:'supported',presence_status:'presence_and_amount_supported',source_url:source,source_reference:`#food-source-${ref}`,citation_keys:['patterson_choline_2008'],evidence_material:material,preparation_state:prep,requires_supplementary_key:key,material_limitations:note};
 let updated=t;for(const [field,values]of [['nutrition_supplementary_sources',[row]],['substance_relationships',[rel]]]){const block=yaml.dump(values,{lineWidth:110,noRefs:true}).trimEnd().split('\n').map(s=>'  '+s).join('\n')+'\n';if(new RegExp(`^${field}:\\s*$`,'m').test(updated))updated=updated.replace(new RegExp(`^${field}:\\s*\\n`,'m'),`${field}:\n${block}`);else updated=updated.replace(/^---\n/,`---\n${field}:\n${block}`);}
 updated+=`\n<span id="food-source-${ref}" />\n\n[${ref}] Patterson et al. (2008). [USDA Database for the Choline Content of Common Foods, Release 2](/docs/papers/BRAIN-Diet-References#patterson_choline_2008). Betaine, NDB ${ndb}; source-specific food measurement and preparation, separate from the general nutrient panel.\n`;
 matter(updated);fs.writeFileSync(file,updated);log.push({food_id:food,substance_id:'betaine',action:'Added source-specific corrected USDA Release 2 measurement; older provenance preserved',source,value,unit:'mg',basis:row.basis,material,preparation:prep});
}
fs.writeFileSync(dir+'/betaine-frozen-results.json',JSON.stringify(log,null,2));console.log(log.length,'records qualified/backfilled');
