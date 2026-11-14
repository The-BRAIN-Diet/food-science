import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
export function validateRankedViewerSync(snapshot, wheel, explorer, intelligence) {
 const expected=snapshot.targets.flatMap(t=>t.selected.map(r=>({pm:t.pm_id,substance:t.substance_id,food:r.food_id,rank:r.rank,power:r.relative_power,observation:r.observation})));
 const normal=rows=>rows.sort((a,b)=>[a.pm,a.substance,a.food].join('|').localeCompare([b.pm,b.substance,b.food].join('|')));
 const wheelRows=wheel.canonicalNetworks.topFive.selections.map(r=>({pm:r.pm_id,substance:r.substance_id,food:r.food_id,rank:r.rank,power:r.relative_power,observation:r.ranking_observation}));
 const projection=rows=>rows.filter(r=>r.layer==='Ranked').map(r=>({pm:r.pm,substance:r.substance,food:r.food,rank:r.rank,power:r.relative_power,observation:r.observations[0]}));
 for(const [name,rows] of [['Food Wheel',wheelRows],['PM Explorer',projection(explorer.foods)],['Food Intelligence',projection(intelligence.records)]]) {
  try {assert.deepEqual(normal(rows),normal([...expected]));} catch {
   const key=r=>[r.pm,r.substance,r.food].join('|');const actual=new Map(rows.map(r=>[key(r),JSON.stringify(r)])),want=new Map(expected.map(r=>[key(r),JSON.stringify(r)]));
   const differences=[...new Set([...actual.keys(),...want.keys()])].filter(k=>actual.get(k)!==want.get(k));
   throw Error(`${name} ranked data differs from canonical snapshot ${snapshot.snapshot_id}: ${differences.join(', ')}. Regenerate the viewer after ranked sources; do not publish stale ranking data.`);
  }
 }
 return expected.length;
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
 const read=p=>JSON.parse(fs.readFileSync(p));
 console.log('Verified ranked viewer equivalence:',validateRankedViewerSync(read('src/data/rankedFoodSources.generated.json'),read('static/explore/food-wheel/display-network.json'),read('static/explore/pm-explorer/pm-sources.json'),read('static/explore/food-intelligence/data.json')));
}
