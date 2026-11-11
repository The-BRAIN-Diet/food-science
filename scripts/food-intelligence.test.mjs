import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {prepare,servingContribution} from '../static/explore/food-intelligence/model.mjs';
const data=JSON.parse(fs.readFileSync(new URL('../static/explore/food-intelligence/data.json',import.meta.url)));
test('thresholds preserve ranked eligibility, canonical triples and independent whole egg and yolk',()=>{for(const threshold of [10,25,50]){const v=prepare(data,threshold);assert(v.foods.some(f=>f.id==='egg-yolks'));assert(v.records.every(r=>data.records.some(s=>s.food===r.food&&s.pm===r.pm&&s.substance===r.substance)));assert(v.records.filter(r=>!r.star).every(r=>r.relative_power>=threshold));assert.equal(new Set(v.records.map(r=>[r.food,r.pm,r.substance].join('|'))).size,v.records.length);for(const sub of new Set(v.records.filter(r=>r.star).map(r=>r.substance))){assert(!v.records.some(r=>r.substance===sub&&!r.star));assert(new Set(v.records.filter(r=>r.substance===sub).map(r=>r.food)).size<=2);}}});
test('default counts and plant-before-animal grouping',()=>{const v=prepare(data);assert.deepEqual(v.counts,{foods:64,rankedSubstances:28,starredSubstances:20,substances:48,targets:144,triples:768});const firstAnimal=v.foods.findIndex(f=>f.group==='animal');assert(v.foods.slice(firstAnimal).every(f=>f.group==='animal'));assert(v.foods.find(f=>f.id==='lamb')?.group!=='plant');});
test('BRS filter never introduces edges; expansion preserves default evidence',()=>{const all=prepare(data),expanded=prepare(data,25,true);assert(all.records.every(r=>expanded.records.some(s=>s.food===r.food&&s.pm===r.pm&&s.substance===r.substance)));for(const system of data.systems){const v=prepare(data,25,false,system.id);assert(v.records.every(r=>data.pms.find(p=>p.id===r.pm)?.group===system.id));}});
test('deduplication retains every source observation',()=>{const v=prepare(data,10,true);for(const r of v.records){const expected=data.records.filter(s=>s.food===r.food&&s.pm===r.pm&&s.substance===r.substance&&s.layer===r.layer);assert(r.evidence_records.length>=expected.length);}});
test('serving conversion rejects dry matter, supporting relationships and invalid amounts',()=>{const base={observations:[{value:20,unit:'mg',basis:'per 100 g edible portion'}]};assert.equal(servingContribution(base,50).value,10);assert.equal(servingContribution({...base,star:true},50),null);assert.equal(servingContribution({observations:[{value:20,unit:'mg',basis:'dry matter'}]},50),null);assert.equal(servingContribution(base,0),null);});

test('raw whole egg and yolk retain distinct canonical observations and viewer links',async()=>{
 const {default:matter}=await import('gray-matter');
 const {readState,profile}=await import('../static/explore/food-wheel/selection-model.mjs');
 const wheel=JSON.parse(fs.readFileSync('static/explore/food-wheel/display-network.json'));
 for(const [id,fdc,choline] of [['egg-yolks',172184,820.2],['eggs',171287,293.8]]){
  const page=matter(fs.readFileSync('docs/foods/'+id+'.md')).data;
  assert.equal(page.nutrition_source.fdc_id,fdc);
  assert.equal(page.nutrition_per_100g.choline_mg,choline);
  const view=profile(wheel,readState('http://localhost/?foods='+id,wheel));
  const targets=view.edges.filter(e=>e.substance_id==='choline');
  assert.ok(targets.length);
  for(const edge of targets){
   const row=data.records.find(r=>r.food===id&&r.substance==='choline'&&r.pm===edge.pm_id);
   assert.ok(row);
   assert.equal(row.observations[0].value,choline);
   assert.equal(row.observations[0].nutrition_source.fdc_id,fdc);
   assert.equal(data.foods.find(f=>f.id===id).page,'/docs/foods/'+id);
  }
 }
});
