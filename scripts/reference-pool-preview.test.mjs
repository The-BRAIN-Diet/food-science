import fs from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
import {readState,profile} from '../static/explore/food-wheel/selection-model.mjs';
const dir='review/ranked-food-reconciliation/reference-pool/';
const read=p=>JSON.parse(fs.readFileSync(dir+p));
const snapshot=read('ranking.json'),wheel=read('explore/food-wheel/display-network.json'),pm=read('explore/pm-explorer/pm-sources.json');
test('both viewers publish identical selected observations, powers and ranks for every candidate target',()=>{
 const ranked=pm.foods.filter(r=>r.layer==='Ranked');
 const keys=new Set();
 for(const t of snapshot.targets){
  assert(t.selected.length<=10);
  for(const r of t.selected){
   assert(r.relative_power>=10);
   const w=wheel.displaySelections.find(e=>e.edge_id===r.edge_id);
   const p=ranked.find(e=>e.pm===t.pm_id&&e.food===r.food_id&&e.substance===t.substance_id);
   assert.deepEqual(w.ranking_observation,r.observation);
   assert.deepEqual(p.observations,[r.observation]);
   assert.deepEqual([p.rank,p.relative_power],[w.rank,w.relative_power]);
   assert.deepEqual([p.rank,p.relative_power],[r.rank,r.relative_power]);
   keys.add(r.edge_id);
  }
 }
 assert.equal(keys.size,ranked.length);
 assert.equal(keys.size,wheel.canonicalNetworks.topFive.selections.length);
 assert.equal(pm.snapshot,wheel.ranked_snapshot_id);
});
test('qualified egg yolk and provision-specific reference maxima survive both projections',()=>{
 const ref=id=>snapshot.targets.find(t=>t.substance_id===id&&t.selected.length).selected[0].food_id;
 assert.equal(ref('iron'),'thyme');assert.equal(ref('vitamin-b12'),'liver');assert.equal(ref('choline'),'egg-yolks');
 const yolk=profile(wheel,readState('http://localhost/?foods=egg-yolks',wheel));
 assert.equal(yolk.edges.filter(e=>e.substance_id==='choline'&&e.rank===1).length,9);
 assert(yolk.edges.some(e=>e.substance_id==='vitamin-b5'&&e.rank===4));
 const ledger=read('explore/food-wheel/evidence-ledger.json');
 assert(ledger.comparisonEvidence.some(e=>e.food==='chlorella'&&e.substance==='vitamin-b12'&&e.reason.includes('unverified')&&e.observation.value===300));
 assert(ledger.documentedSources.some(e=>e.layer.includes('Presence-only')));
});
