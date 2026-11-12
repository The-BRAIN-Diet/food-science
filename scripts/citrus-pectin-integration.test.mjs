import fs from 'node:fs';import assert from 'node:assert/strict';import test from 'node:test';import matter from 'gray-matter';import {historicalAdmission} from './lib/dietary-input-governance.mjs';
const sources=JSON.parse(fs.readFileSync('static/explore/pm-explorer/pm-sources.json'));
test('PM4 citrus provision excludes apple and pear and retains tissue qualifications',()=>{const rows=sources.foods.filter(f=>f.pm==='BRS5-FM2-PM4'&&f.substance==='pectin');assert.deepEqual(rows.map(f=>f.food).sort(),['lemon','oranges']);for(const r of rows){assert.equal(r.observations.length,0);assert.equal(r.rank,undefined);assert.match(r.preparation,/not equivalent/);assert(r.presence_records.some(p=>p.source_url));}assert.match(rows.find(r=>r.food==='lemon').material,/Meyer.*juice extraction/);});
test('pears retained only in eligible parent routes, baseline admission retained',()=>{assert.deepEqual(sources.foods.filter(f=>f.food==='pears'&&f.substance==='pectin').map(f=>f.pm).sort(),['BRS5-FM1-PM1','BRS5-FM2-PM5']);const d=matter(fs.readFileSync('docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx','utf8')).data;assert(historicalAdmission(d,d.dietary_input_traceability.find(a=>a.atom_id==='PM4-DIT-2')));});
test('Cursor citations and images resolve locally',()=>{const bib=fs.readFileSync('static/bibtex/BRAIN-diet.bib','utf8');for(const food of ['pears','lemon','oranges']){const d=matter(fs.readFileSync('docs/foods/'+food+'.md','utf8')).data;for(const key of d.substance_relationships.find(r=>r.substance_id==='pectin').citation_keys)assert(bib.includes('{'+key+','));assert(fs.existsSync('static'+d.main_image));}});

test('each eligible PM shows one apple row with both Liu source contexts', () => {
 for (const pm of ['BRS5-FM1-PM1', 'BRS5-FM2-PM5']) {
  const rows = sources.foods.filter(row => row.food === 'apples' && row.substance === 'pectin' && row.pm === pm);
  assert.equal(rows.length, 1);
  const [row] = rows;
  assert.equal(row.layer, 'Presence-only, unranked');
  assert.equal(new Set(row.presence_records.map(record => record.source_id)).size, 2);
  assert(row.presence_records.some(record => record.material.includes('thirteen apple cultivars')));
  assert(row.presence_records.some(record => record.key === 'pectin_qual'));
  assert(row.presence_records.every(record => record.source_url.endsWith('10.1016/j.ijbiomac.2023.125410')));
 }
});
