import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
const read = file => JSON.parse(fs.readFileSync(file));
const explorer = read('static/explore/pm-explorer/pm-sources.json');
const wheel = read('static/explore/food-wheel/display-network.json');
const pm = 'BRS5-FM1-PM1';
for (const food of ['eggs', 'beef', 'tofu']) {
 test(food + ' glutamine retains the canonical fraction, food basis and ranking boundary', () => {
  const fm = matter(fs.readFileSync('docs/foods/'+food+'.md','utf8')).data;
  const edges = fm.substance_relationships.filter(e=>e.substance_id==='glutamine');
  assert.equal(edges.length,1);
  const source = fm.nutrition_supplementary_sources.find(s=>s.key===edges[0].requires_supplementary_key);
  assert.equal(source.source_url,'https://doi.org/10.1038/ejcn.2009.110');
  const rows = explorer.foods.filter(r=>r.pm===pm && r.food===food && r.substance==='glutamine');
  const ribbons = wheel.displaySelections.filter(r=>r.pm_id===pm && r.food_id===food && r.substance_id==='glutamine');
  assert.equal(rows.length,1); assert.equal(ribbons.length,1);
  const [row]=rows, [ribbon]=ribbons;
  assert.equal(row.rank,undefined); assert.equal(ribbon.relative_power,undefined);
  assert.deepEqual(row.observations,ribbon.sources[0].observations);
  if(food==='eggs'){
   const [o]=row.observations;
   assert.equal(row.observations.length,1); assert.equal(o.value,0.559);
   for(const k of ['value','unit','basis','measurement_kind','chemical_form','source_url','rank_eligible'])assert.equal(o[k],source[k]);
   assert.equal(o.rank_eligible,false); assert.equal(o.chemical_form,'protein-bound glutamine residues');
  } else {
   assert.equal(source.value,undefined); assert.equal(row.observations.length,0);
   assert(row.presence_records.some(r=>r.source_url===source.source_url));
  }
 });
}
