import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
const root=process.cwd();
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const validScopes=new Set(['food-preparation','dietary-protocol','supplementation','mixed-food-and-timing','mixed-food-and-behaviour']);
const relationships=[],gaps=[],strategies=new Map();
for(const scope of ['brs1','brs2','brs3','brs4','brs5','brs6','brs-x']) for(const file of walk(path.join(root,`docs/biological-targets/${scope}`)).filter(f=>/\.mdx?$/.test(f))) {
 const d=matter(fs.readFileSync(file,'utf8')).data;if(!d.pm_id)continue;
 for(const row of d.system_optimisation_practices||[]) {
  if(!row.food_strategy_scope)continue;
  if(!validScopes.has(row.food_strategy_scope)||!row.food_strategy_id)throw Error('Invalid food strategy scope/ID: '+d.pm_id+' '+row.atom_id);
  const source=path.relative(root,file),r={id:d.pm_id+'::'+row.atom_id,strategy_id:row.food_strategy_id,brs:scope.toUpperCase(),fm:d.parent_fm,pm:d.pm_id,pm_page:'/docs/'+source.replace(/^docs\//,'').replace(/\.mdx?$/,''),input:row.input,input_type:row.input_type,scope:row.food_strategy_scope,category:row.optimisation_category,biological_role:row.biological_role,evidence:row.evidence_source,limitation:row.evidence_limitation,source_record:source+'#system_optimisation_practices/'+row.atom_id,food_ids:row.food_ids||[],substance_ids:row.substance_ids||[]};
  if(!r.evidence?.finding_ids?.length||!r.evidence?.citation_keys?.length)gaps.push({kind:'strategy-evidence-pointer-gap',relationship_id:r.id});
  if(!r.food_ids.length&&!r.substance_ids.length)gaps.push({kind:'canonical-food-substance-links-not-recorded',relationship_id:r.id,reason:'Original strategy remains admitted. Do not infer foods, isolated constituents or dose equivalence from its label.'});
  relationships.push(r);
  if(!strategies.has(r.strategy_id))strategies.set(r.strategy_id,{id:r.strategy_id,title:r.input,scope:r.scope,category:r.category,relationship_ids:[]});
  const s=strategies.get(r.strategy_id);if(s.title!==r.input||s.scope!==r.scope||s.category!==r.category)throw Error('Strategy grouping conflict '+r.strategy_id);
  s.relationship_ids.push(r.id);
 }
}
const data={schema_version:1,scope:'All canonical PMs: BRS1–6 and Cross-BRS',strategies:[...strategies.values()],relationships,gaps,summary:{strategies:strategies.size,relationships:relationships.length,pms:new Set(relationships.map(r=>r.pm)).size,brs:[...new Set(relationships.map(r=>r.brs))]}};
fs.writeFileSync(path.join(root,'src/data/foodStrategyRollup.generated.json'),JSON.stringify(data,null,2)+'\n');
fs.mkdirSync(path.join(root,'system/generated/food-strategy-rollup'),{recursive:true});
fs.writeFileSync(path.join(root,'system/generated/food-strategy-rollup/rollup.generated.json'),JSON.stringify(data,null,2)+'\n');
const cell=v=>String(v||'').replace(/\|/g,' / ').replace(/\n/g,' ');
fs.writeFileSync(path.join(root,'system/generated/food-strategy-rollup/index.md'),'# Food-related SOP strategies and interventions\n\nGenerated from admitted PM-owned SOPs. Separate from dietary nutrient supply; no quantities, diet score or automatic No → SOP admission.\n\n| Strategy ID | PM | Strategy | Scope | Accepted role | Limitation | Source record |\n| --- | --- | --- | --- | --- | --- | --- |\n'+relationships.map(r=>'| '+[r.strategy_id,r.pm,r.input,r.scope,r.biological_role,r.limitation,r.source_record].map(cell).join(' | ')+' |').join('\n')+'\n');
console.log(data.summary);
