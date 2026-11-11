import fs from 'node:fs';
import matter from 'gray-matter';
import crypto from 'node:crypto';
import {isCanonicalAnimalSource} from '../src/data/documentedFoodSources.mjs';
const file='static/explore/pm-explorer/pm-sources.json',source=JSON.parse(fs.readFileSync(file));
const wheel=JSON.parse(fs.readFileSync('static/explore/food-wheel/display-network.json'));
const registry=JSON.parse(fs.readFileSync('registry/substances.json'));
const foodIds=[...new Set(source.foods.map(f=>f.food))];
const foods=foodIds.map(id=>{const path='docs/foods/'+id+'.md';const f=fs.existsSync(path)?matter(fs.readFileSync(path,'utf8')).data:{};
return {id,title:f.title||id,page:'/docs/foods/'+id,group:(f.tags||[]).some(t=>/^vegan$/i.test(t))?'plant':(isCanonicalAnimalSource({food_id:id})||['heart','ghee'].includes(id))?'animal':'plant',source:f.nutrition_source||null,tags:f.tags||[],serving:null};});
const ids=[...new Set(source.relationships.map(r=>r.substance_id).filter(Boolean))];
const substances=ids.map(id=>{const r=registry[id]||{};return {id,name:source.identities[id]?.name||id,page:source.identities[id]?.page,tags:r.tags||[],systems:wheel.network.connections.filter(c=>c.substance===id).map(c=>c.brs)};});
const data={generated_at:new Date().toISOString(),canonical_snapshot:source.snapshot,source_file:file,source_sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),pms:source.pms,systems:source.systems,foods,substances,relationships:source.relationships,records:source.foods,shortlist_exclusions:[],overlaps:[
{foods:['eggs','egg-yolks'],type:'whole / part',action:'Whole egg and yolk have separate composition panels. Each selection uses its own measured food form.'},
{foods:['soy','edamame','tofu','tempeh','soy-lecithin'],type:'same crop, different preparations / fractions',action:'Retain exact food identities; do not sum as independent dietary variety.'},
{foods:['sesame-seeds','tahini'],type:'seed / processed paste',action:'Retain distinct observations; flag recipe overlap.'},
{foods:['sunflower-seeds','sunflower-lecithin'],type:'seed / extracted fraction',action:'No equivalent composition or serving inference.'},
{foods:['broccoli','broccoli-sprouts'],type:'mature plant / sprouts',action:'Distinct analytical records and preparation-dependent formation.'},
{foods:['cocoa','cacao-powder','cacao-nibs-raw','dark-chocolate'],type:'processing / formulation; possible shared panels',action:'Keep identities; shared source observations cannot earn two independent ranking positions.'},
{foods:['extra-virgin-olive-oil','early-harvest-olive-oil'],type:'distinct oils, shared generic panel risk',action:'Retain canonical identities and current holds; no copied-panel ranking.'},
{foods:['chicken','dark-meat-poultry'],type:'broader food / cut',action:'Flag overlapping source materials; no automatic merge.'},
{foods:['liver','kidney','heart','beef'],type:'organ / muscle',action:'Distinct tissues, not duplicate foods.'}
]};
fs.writeFileSync('static/explore/food-intelligence/data.json',JSON.stringify(data,null,2)+'\n');
console.log({foods:foods.length,records:data.records.length,pms:data.pms.length,substances:substances.length});
