import fs from 'node:fs';
import crypto from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
const manifest=JSON.parse(fs.readFileSync('system/ranked-food-publication-sources.json'));
const snapshot=JSON.parse(fs.readFileSync('src/data/rankedFoodSources.generated.json'));
test('author-approved food records and snapshot use the same exact hashes',()=>{
 for(const id of ['brazil-nuts','cloves','capers','chicken-liver']){const file=`docs/foods/${id}.md`;const hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');assert.equal(manifest.files[file],hash);assert.equal(snapshot.source_hashes[file],hash);}
 assert.equal(manifest.files['docs/foods/capers.md'],'639f000cd17f707d647dd3ee4d55ee943ab62093d732a652dc5446ff2c7b74d7');
 assert.equal(snapshot.publication_exclusions.length,0);
});
test('approved Brazil nuts, cloves and chicken liver compete without forced selection',()=>{
 const ids=new Set(snapshot.targets.flatMap(t=>t.selected.map(r=>r.food_id)));for(const id of ['brazil-nuts','cloves','chicken-liver'])assert(ids.has(id));
 for(const target of snapshot.targets){assert(target.selected.length<=10);for(const row of target.selected)assert(row.relative_power>=10);}
});
test('chicken liver raw panel and pan-fried betaine remain separate; below-threshold betaine is not ranked',()=>{
 const food=matter(fs.readFileSync('docs/foods/chicken-liver.md','utf8')).data;
 assert.equal(food.nutrition_source.fdc_id,171060);assert.match(food.nutrition_source.food_name,/raw/);
 const betaine=food.nutrition_supplementary_sources.find(x=>x.substance_id==='betaine');assert.equal(betaine.value,21);assert.equal(betaine.unit,'mg');assert.equal(betaine.preparation_state,'pan-fried');assert.equal(betaine.exclude_from_recipe_sum,true);
 const targets=snapshot.targets.filter(t=>t.substance_id==='betaine');assert(targets.length);for(const target of targets){assert(!target.selected.some(r=>r.food_id==='chicken-liver'));assert(target.excluded.some(r=>r.food_id==='chicken-liver'&&/one-tenth/.test(r.reason)));}
});

test('ranked Brazil-nut selenium has no contradictory unranked fallback',()=>{const wheel=JSON.parse(fs.readFileSync('static/explore/food-wheel/display-network.json'));assert(wheel.canonicalNetworks.topFive.selections.some(e=>e.food_id==='brazil-nuts'&&e.substance_id==='selenium'));assert(!wheel.documentedUnranked.some(e=>e.edge_id==='brazil-nuts|selenium|food-composition'));});
