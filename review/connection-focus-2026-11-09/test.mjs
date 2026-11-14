import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const dir='review/connection-focus-2026-11-09/',source=fs.readFileSync('static/explore/food-wheel/index.html','utf8'),trial=fs.readFileSync(dir+'wheel.html','utf8');
const data=s=>JSON.parse(s.split('<script>const DATA=')[1].split(';const $=')[0]);assert.deepEqual(data(trial),data(source));
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync(dir+'focus.js','utf8'),ctx);
let count=0;for(const m of source.matchAll(/<path class="(?:food-link|link)"[^>]* d="([^"]+)"/g)){assert.equal(ctx.widenRibbon(m[1],1),m[1]);for(const f of [1.5,2])assert.ok(!/NaN|Infinity/.test(ctx.widenRibbon(m[1],f)));count++;}assert.ok(count>100);
for(const file of ['wheel.html','recipe.html']){const h=fs.readFileSync(dir+file,'utf8');new vm.Script(h.split('<script>')[1].split('</script>')[0]);}
const recipe=fs.readFileSync(dir+'recipe.html','utf8'),base=fs.readFileSync('static/preview/recipe-brs-matrix/index.html','utf8');const rd=s=>JSON.parse(s.split('const DATA=')[1].split(';\n')[0]);assert.deepEqual(rd(recipe),rd(base));
console.log('PASS: identical scientific snapshots; '+count+' ribbons at 1×/1.5×/2×; exact reset geometry; runtime syntax.');
