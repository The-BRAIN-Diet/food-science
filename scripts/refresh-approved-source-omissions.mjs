// Targeted canonical regeneration: preserve concurrent unpublished mapping work.
import fs from 'node:fs';import assert from 'node:assert/strict';import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
const dir='review/dietary-connectivity-2026-11-09/source-omissions/page-verification';fs.mkdirSync(dir,{recursive:true});
for(const brs of ['BRS3','BRS5']){
 const file=`src/data/${brs.toLowerCase()}InputMapping.generated.json`,text=fs.readFileSync(file,'utf8'),old=JSON.parse(text),fresh=buildInputSubstanceFood(process.cwd(),{brs}),out=structuredClone(old);
 const match=s=>brs==='BRS3'?s.substance_id==='sulforaphane'&&['broccoli','broccoli-sprouts'].includes(s.food_id):s.substance_id==='pectin'&&s.food_id==='apples';
 out.food_sources=old.food_sources.filter(s=>!match(s)).concat(fresh.food_sources.filter(match));
 const ids=brs==='BRS3'?['BRS3-FM2-PM3::PM3-DIT-1']:['BRS5-FM1-PM1::PM1-KC1-UPSTREAM-2','BRS5-FM2-PM4::PM4-DIT-2','BRS5-FM2-PM5::PM5-DIT-3'];
 for(const id of ids){const r=out.relationships.find(x=>x.id===id),f=fresh.relationships.find(x=>x.id===id);assert(r&&f,id);assert.equal(r.dietary_input,f.dietary_input);for(const key of ['food_targets','projection_status'])if(key in f)r[key]=f[key];}
 assert.deepEqual(out.relationships.filter(r=>!ids.includes(r.id)),old.relationships.filter(r=>!ids.includes(r.id)));
 assert.deepEqual(out.food_sources.filter(s=>!match(s)),old.food_sources.filter(s=>!match(s)));
 const backup=`${dir}/${brs}-before.json`;if(!fs.existsSync(backup))fs.writeFileSync(backup,text);
 fs.writeFileSync(file,JSON.stringify(out,null,2)+'\n');console.log(`${brs}: refreshed ${fresh.food_sources.filter(match).length} source records; ${ids.length} bounded PM projections; unrelated mappings preserved.`);
}
