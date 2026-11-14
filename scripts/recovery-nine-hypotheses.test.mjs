import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import matter from 'gray-matter';
import {validateScientificHypotheses} from './lib/scientific-hypotheses.mjs';
const inventory=JSON.parse(fs.readFileSync('review/recovery-readiness-2026-11-14/integration/nine-hypotheses.json'));
test('all nine approved recovered hypotheses retain exact identities and Unestablished status',()=>{
 assert.equal(inventory.length,9);const ids=new Set();
 for(const item of inventory){const p=matter(fs.readFileSync(item.path,'utf8'));assert.equal(p.data.pm_id,item.pm);const h=p.data.scientific_hypotheses.find(x=>x.id===item.id);assert.ok(h);assert.equal(h.status,'Unestablished');assert.equal(h.title,item.title);assert.deepEqual(validateScientificHypotheses(p.data,[],{content:p.content}),[]);ids.add(`${item.pm}::${item.id}`);}
 assert.equal(ids.size,9);
});
test('hypothesis recovery does not change any approved ranked selection or observation',()=>{
 const snapshot=JSON.parse(fs.readFileSync('src/data/rankedFoodSources.generated.json'));
 const selections=snapshot.targets.map(t=>({pm:t.pm_id,substance:t.substance_id,selected:t.selected}));
 assert.equal(createHash('sha256').update(JSON.stringify(selections)).digest('hex'),'1a91631c0b100284494fe2886bec583bb8c05d37b23e1e4432a0e966e9f24ac7');
 assert.equal(selections.reduce((n,t)=>n+t.selected.length,0),984);
});
