import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {buildInputSubstanceFood} from './input-substance-food.mjs';
import {buildDietaryPathwayIndex} from '../../src/lib/dietaryPathways.mjs';
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
export function createDietaryPathwayIndex(root) {
 const docs=walk(path.join(root,'docs')).filter(f=>/\.mdx?$/.test(f)).map(f=>{const d=matter(fs.readFileSync(f,'utf8'));return {title:d.data.title,frontMatter:d.data,permalink:'/docs/'+path.relative(path.join(root,'docs'),f).replace(/\.mdx?$/,'')};});
 const scopes=['BRS1','BRS2','BRS3','BRS4','BRS5','BRS6','BRS-X'].map(brs=>buildInputSubstanceFood(root,{brs}));
 const registry=JSON.parse(fs.readFileSync(path.join(root,'registry/substances.json'),'utf8'));
 const registeredIdentities=Object.fromEntries(Object.entries(registry).map(([id,r])=>[id,{id,title:docs.find(d=>d.permalink==='/docs/substances/'+String(r.path||'').replace(/\.mdx?$/,''))?.frontMatter?.title||r.title||id,exists:!!r.path&&fs.existsSync(path.join(root,'docs/substances',r.path)),page:r.path?'/docs/substances/'+r.path.replace(/\.mdx?$/,''):null}]));
 return buildDietaryPathwayIndex({docs,scopes,registeredIdentities});
}
