import matter from 'gray-matter';
import {constituentPathwayFoods} from '../src/data/relatedSubstanceRelationships.mjs';
import {scfaRelatedSources} from '../src/data/scfaRelatedSources.mjs';
// Presentation adapter: use the same source selectors and generated records as PM dropdowns.
import fs from 'node:fs';
import {isCanonicalAnimalSource,documentedSourcesForRelationships} from '../src/data/documentedFoodSources.mjs';
import {rankedSourcesForRelationships} from '../src/data/rankedFoodSources.mjs';
const mappings=['brs1','brs2','brs3','brs4','brs5','brs6','brs-x'].map(scope=>JSON.parse(fs.readFileSync('src/data/'+scope+'InputMapping.generated.json')));
const data=mappings.find(d=>d.scope==='BRS5')||mappings[4];
const snapshot=JSON.parse(fs.readFileSync('src/data/rankedFoodSources.generated.json'));
const foods=[],relationships=mappings.flatMap(d=>d.relationships.filter(r=>r.presentations?.length));
for(const mapping of mappings){
for(const pm of new Set(mapping.relationships.map(r=>r.pm))){
 const rs=relationships.filter(r=>r.pm===pm),ranked=rankedSourcesForRelationships(snapshot,pm,rs);
 for(const s of ranked)foods.push({...s,pm,substance:s.substance_id,food:s.food_id,layer:'Ranked'});
 for(const s of documentedSourcesForRelationships(mapping,pm,rs,ranked,snapshot))foods.push({...s,pm,substance:s.substance_id,food:s.food_id,layer:s.observations.length?(s.measurement_kind==='calculated'?'Calculated, unranked':'Measured, unranked'):'Presence-only, unranked'});
}
}
const wheel=JSON.parse(fs.readFileSync('static/explore/food-wheel/index.html','utf8').split('<script>const DATA=')[1].split(';const $=')[0]);
for(const c of wheel.network.connections.filter(c=>['butyrate','acetate','propionate','scfas'].includes(c.substance)&&c.brs==='BRS5'))for(const pm of new Set(c.records.map(r=>r.pm))){
 const rs=data.relationships.filter(r=>r.pm===pm&&r.substance_id===c.substance);
 const inputs=rs.length?rs:[{substance_id:c.substance}];
 for(const r of scfaRelatedSources(inputs,data.food_sources))foods.push({...r,pm,substance:c.substance,food:r.food_id,layer:'Related — via resistant starch · Microbial production',status:'contextual-related',direct_containment:false});
}
for(const food of foods)food.food_group=isCanonicalAnimalSource(food)?'animal':'plant';
const sourceFoods=fs.readdirSync('docs/foods').filter(f=>/\.mdx?$/.test(f)).map(f=>{const frontMatter=matter(fs.readFileSync('docs/foods/'+f,'utf8')).data;return {id:frontMatter.id||f.replace(/\.mdx?$/,''),title:frontMatter.title,frontMatter};});
const constituentPathways=constituentPathwayFoods(sourceFoods,'fructo-galacto-oligosaccharides');
const pm5file='docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx';
const pm5=matter(fs.readFileSync(pm5file,'utf8')).data;
const findAtom=(v)=>{if(!v||typeof v!=='object')return null;if(v.atom_id==='PM5-DIT-2'&&v.evidence_source)return v;for(const x of Object.values(v)){const a=findAtom(x);if(a)return a;}return null;};
const atom=findAtom(pm5);if(!atom)throw Error('Historical PM5 FOS/GOS atom missing');
const historicalRelationships=[{id:'BRS5-FM2-PM5::PM5-DIT-2',pm:'BRS5-FM2-PM5',substance:'fructo-galacto-oligosaccharides',status:'Historical — admission under review',route:'Historical — admission under review',projection_status:atom.canonical_identity.projection_status,evidence:atom.evidence_source,limitation:atom.evidence_limitation,source:pm5file,admitted:false,constituentPathways}];
const pmIds=new Set(mappings.flatMap(d=>d.pilot_pms));
const pms=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const file=dir+'/'+e.name;if(e.isDirectory())walk(file);else if(/\.mdx?$/.test(file)&&/pm\d/.test(file)){const fm=matter(fs.readFileSync(file,'utf8')).data;if(pmIds.has(fm.pm_id))pms.push({id:fm.pm_id,group:fm.pm_id.startsWith('BRS-X')?'BRS-X/'+fm.pm_id.match(/BRS-X\(([^-)]+)/)[1].toLowerCase():fm.pm_id.split('-')[0],file,title:fm.title,mission:fm.mission});}}}
walk('docs/biological-targets');
pms.sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
if(pms.length!==pmIds.size)throw Error('PM registry/file mismatch '+pms.length+'/'+pmIds.size);
const systems=wheel.network.systems.map((id,i)=>({id,name:({'BRS-X/circadian':'Circadian regulation','BRS-X/ecs':'Endocannabinoid system','BRS-X/hormones':'Hormonal regulation'}[id]||wheel.network.names[i]),color:wheel.network.colors[i]}));
const registry=JSON.parse(fs.readFileSync('registry/substances.json'));
const identities=Object.fromEntries(Object.entries(registry).filter(([k,v])=>v&&typeof v==='object').map(([k,v])=>[k,{name:v.title||v.label||v.name||k,page:v.path?'/docs/substances/'+v.path.replace(/\.mdx?$/,'')+(v.page_anchor?'#'+v.page_anchor:''):v.page||null}]));
fs.writeFileSync('static/explore/pm-explorer/titles.json',JSON.stringify(Object.fromEntries(pms.map(p=>[p.id,p.title])),null,2)+'\n');
fs.writeFileSync('static/explore/pm-explorer/pm-sources.json',JSON.stringify({source:'PM dropdown shared selectors; all seven generated scope mappings + rankedFoodSources.generated.json',snapshot:snapshot.snapshot_id,foods,relationships,historicalRelationships,pms,systems,identities},null,2)+'\n');
console.log(JSON.stringify({sourceRecords:foods.length}));
