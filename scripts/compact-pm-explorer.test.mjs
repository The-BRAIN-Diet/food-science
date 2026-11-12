import fs from 'node:fs';import test from 'node:test';import assert from 'node:assert/strict';import {buildPilot} from '../static/explore/pm-explorer/model.mjs';
const html=fs.readFileSync('static/explore/food-wheel/index.html','utf8'),data=JSON.parse(html.split('<script>const DATA=')[1].split(';const $=')[0]),ledger=JSON.parse(fs.readFileSync('static/explore/food-wheel/evidence-ledger.json')),m=buildPilot(data,ledger);
test('network retains eight BRS5 PMs and all five qualified experimental relationships',()=>{assert.equal(m.pms.filter(p=>p.group==='BRS5').length,8);assert.equal(m.relationships.filter(r=>r.child).length,5);assert(m.relationships.every(r=>m.pms.some(p=>p.id===r.pm)));});
test('ranked observations are preserved without new selection',()=>{const original=data.canonicalNetworks.topFive.selections;assert.equal(m.foods.filter(f=>f.layer==='Ranked').length,original.length);for(const f of m.foods.filter(f=>f.layer==='Ranked'))assert.deepEqual(f.ranking_observation,original.find(e=>e.edge_id===f.edge_id).ranking_observation);});
test('unranked records retain provenance; children inherit no food edges',()=>{assert.equal(m.foods.filter(f=>f.layer!=='Ranked').length,ledger.parents.length);assert(m.foods.every(f=>!ledger.children.some(c=>c.substance_id===f.substance)));assert(m.foods.some(f=>f.food==='apples'&&f.substance==='pectin'&&f.pm==='BRS5-FM1-PM1'));assert(!m.foods.some(f=>f.substance==='pectin'&&f.pm==='BRS5-FM2-PM4'));});
test('PM4 uses PM dropdown sources: asparagus/inulin and peas/arabinan; restrictions remain',()=>{const sources=JSON.parse(fs.readFileSync('static/explore/pm-explorer/pm-sources.json'));const pilot=buildPilot(data,ledger,sources),pm='BRS5-FM2-PM4',foods=pilot.foods.filter(f=>f.pm===pm);assert(foods.some(f=>f.food==='asparagus'&&f.substance==='inulin'&&f.observations[0].value===1.3&&f.observations[0].basis==='per 100 g dry matter'));assert(foods.some(f=>f.food==='peas'&&f.substance==='arabinan'));assert(!foods.some(f=>f.substance==='pectin'&&f.food==='apples'));assert(pilot.foods.every(f=>!ledger.children.some(c=>c.substance_id===f.substance)));});

test('all nine systems expose the 67 current canonical PMs without altering BRS5 foods',()=>{
 const sources=JSON.parse(fs.readFileSync('static/explore/pm-explorer/pm-sources.json'));
 const all=buildPilot(data,ledger,sources);
 assert.equal(all.pms.length,67);assert.equal(new Set(all.pms.map(p=>p.id)).size,67);assert.equal(sources.systems.length,9);
 for(const g of sources.systems)assert(all.pms.some(p=>p.group===g.id));
 for(const p of all.pms)assert(fs.existsSync(p.file));
 for(const f of all.foods){assert(all.pms.some(p=>p.id===f.pm));assert(all.relationships.some(r=>r.pm===f.pm&&r.substance===f.substance),f.pm+' '+f.substance);}
 const brs5=all.foods.filter(f=>f.pm.startsWith('BRS5-'));
 const snapshot=JSON.parse(fs.readFileSync('src/data/rankedFoodSources.generated.json'));
 const rankedKey=(pm,sub,food,rank,power)=>JSON.stringify([pm,sub,food,rank,power]);
 const expected=snapshot.targets.filter(t=>t.pm_id.startsWith('BRS5-')).flatMap(t=>t.selected.map(r=>rankedKey(t.pm_id,t.substance_id,r.food_id,r.rank,r.relative_power)));
 assert.deepEqual(brs5.filter(f=>f.layer==='Ranked').map(f=>rankedKey(f.pm,f.substance,f.food,f.rank,f.relative_power)).sort(),expected.sort());
 assert.equal(brs5.filter(f=>f.layer!=='Ranked').length,63);
 assert(all.pms.some(p=>p.id==='BRS-X(Circadian-FM1-PM3)'));
 assert(all.pms.some(p=>p.id==='BRS-X(Hormones-PM7)'));
 const historical=all.relationships.find(r=>r.id==='BRS5-FM2-PM5::PM5-DIT-2');assert.equal(historical.admitted,false);assert.equal(historical.projection_status,'blocked');
});

test('food presentation is plant-first then animal, retaining descending ranked values',async()=>{
 const {orderedFoodGroups}=await import('../static/explore/pm-explorer/model.mjs');
 const sources=JSON.parse(fs.readFileSync('static/explore/pm-explorer/pm-sources.json'));
 const rows=sources.foods.filter(f=>f.pm==='BRS1-FM1-PM1'&&f.substance==='tyrosine');
 const before=JSON.stringify(rows);
 assert.deepEqual(orderedFoodGroups(rows).map(x=>x.food),['soy','pumpkin-seeds','tofu','parmesan-cheese','cheddar-cheese','anchovies','sardines','liver','tuna','salmon']);
 assert.equal(JSON.stringify(rows),before);
});

test('lamb creatine is grouped as animal in the shared helper and Explorer',async()=>{
 const {isCanonicalAnimalSource}=await import('../src/data/documentedFoodSources.mjs');
 assert.equal(isCanonicalAnimalSource({food_id:'lamb'}),true);
 assert.equal(isCanonicalAnimalSource({food_id:'tahini',material:'Compared with lamb'}),false);
 const sources=JSON.parse(fs.readFileSync('static/explore/pm-explorer/pm-sources.json'));
 const rows=sources.foods.filter(f=>f.food==='lamb'&&f.pm==='BRS4-FM1-PM3'&&f.substance==='creatine');
 assert(rows.length>0);assert(rows.every(f=>f.food_group==='animal'));
});
