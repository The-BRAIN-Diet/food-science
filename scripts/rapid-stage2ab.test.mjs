import {readReviewJson} from './lib/review-json.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {load} from 'cheerio';
const dir='review/rapid-stage2ab-2026-10-23/';
const read=name=>readReviewJson(dir+name);
const output=read('manuscript-dietary-rollup.json'),rows=output.records;
const config=JSON.parse(fs.readFileSync('system/rapid-stage2ab-2026-10-23/adjudications.json'));
const queue=read('cursor-repair-queue.json').items;
test('all active PMs have an explicit disposition; deferral is not an evidence-absence claim',()=>{
 const inv=read('pm-inventory.json').filter(p=>p.pm_id);assert.equal(inv.length,64);assert.equal(new Set(inv.map(p=>p.pm_id)).size,64);
 assert.ok(inv.every(p=>['ASSESSED','DEFERRED','BLOCKED'].includes(p.final_disposition)));
 assert.equal(inv.find(p=>p.pm_id==='BRS6-FM4-PM8').final_disposition,'BLOCKED');
 assert.ok(config.pm_reviews.filter(p=>p.final_disposition==='DEFERRED').every(p=>p.stop_rationale.includes('not a claim')));
});
test('only individually adjudicated eligible canonical admissions enter the manuscript',()=>{
 const accepted=new Set(config.pm_reviews.flatMap(p=>p.inputs.map(a=>p.pm_id+'::'+a.atom_id)));
 assert.ok(rows.every(r=>accepted.has(r.pm+'::'+r.atom_id)&&r.scientific_admission==='admitted'));
 assert.ok(rows.every(r=>['A','B'].includes(r.type)&&['direct','derived'].includes(r.classification)&&r.mechanistic_evidence.length));
 assert.deepEqual(new Set([...rows,...output.practices].map(r=>r.brs).filter(b=>/^BRS[1-6]$/.test(b))),new Set(['BRS1','BRS2','BRS3','BRS4','BRS5','BRS6']));
 assert.ok(rows.some(r=>r.type==='B'&&r.canonical_substance_id==='sulforaphane'));
 assert.ok(!rows.some(r=>r.pm==='BRS6-FM4-PM8'||r.canonical_substance_id==='fructo-galacto-oligosaccharides'||r.canonical_substance_id==='inulin'));
});
test('food identity, evidence and mapping status remain independently traceable',()=>{
 assert.ok(rows.every(r=>r.canonical_substance_id&&r.pm_mission&&r.review_id));
 assert.ok(rows.filter(r=>r.food_target).every(r=>r.food_evidence&&r.food_preparation&&r.exposure_qualification));
 const provisional=rows.filter(r=>r.mapping_status==='research-supported-provisional');assert.equal(provisional.length,12);
 assert.ok(provisional.some(r=>r.food_target==='apples'&&r.canonical_substance_id==='pectin'));
 assert.ok(provisional.some(r=>r.food_target==='pomegranates'&&r.food_material.includes('juice')));
 assert.ok(provisional.filter(r=>['nicotinamide','nicotinic-acid'].includes(r.canonical_substance_id)).every(r=>/extract|121|native/i.test([...r.limitation,r.food_preparation].join(' '))));
});
test('experimental responses and downstream metabolites do not become ordinary food claims',()=>{
 const rs=rows.filter(r=>r.canonical_substance_id==='resistant-starch');assert.equal(rs.length,4);
 assert.ok(rs.every(r=>r.mapping_status==='verified'&&r.limitation.some(l=>/equivalent butyrate response/.test(l))));
 assert.ok(rs.find(r=>r.food_target==='potatoes').preparation.match(/cool|chill/i));
 assert.ok(!rows.some(r=>['butyrate','urolithin-a'].includes(r.canonical_substance_id)));
 assert.ok(!rows.some(r=>r.food_target==='broccoli'&&r.canonical_substance_id==='sulforaphane'));
 assert.ok(rows.some(r=>r.food_target==='broccoli-sprouts'&&r.canonical_substance_id==='sulforaphane'));
 assert.ok(rows.filter(r=>r.classification==='derived').every(r=>r.conversion_traceability));
});
test('food deduplication preserves PM-specific relationships, distinct materials and reviews',()=>{
 const f=read('food-target-rollup.json').records;
 const keys=f.map(r=>JSON.stringify([r.food_id,r.substance_id,r.material,r.preparation,r.mapping_status]));assert.equal(new Set(keys).size,keys.length);
 assert.ok(f.some(r=>r.affected_pms.length>1));
 assert.ok(f.filter(r=>r.material_equivalence_status==='review-required').every(r=>r.display_material_context));
});
test('queue is deduplicated, retains coverage/conversion tasks and has no stale repaired walnut/RS edges',()=>{
 const keys=queue.map(q=>JSON.stringify([q.relationship_type==='identity-resolution'?'unresolved-identity':q.source_entity,q.target_entity,q.relationship_type,q.material||null,q.preparation||null]));
 assert.equal(new Set(keys).size,keys.length);
 assert.ok(!queue.some(q=>q.relationship_type==='contains'&&(q.target_entity==='resistant-starch'||q.source_entity==='walnuts'&&q.target_entity==='ellagitannins')));
 assert.equal(queue.filter(q=>q.relationship_type==='food-coverage-research').length,6);
 assert.ok(queue.some(q=>q.relationship_type==='identity-resolution'));
 assert.ok(queue.some(q=>q.relationship_type==='precursor-conversion'));
 assert.ok(queue.some(q=>q.source_entity==='broccoli'&&q.relationship_type==='presentation-join-review'));
 assert.ok(queue.some(q=>q.source_entity==='apples'&&q.target_entity==='pectin'));
});
test('six BRS shards reconstruct the consolidated food-input records exactly',()=>{
 let combined=[];for(let n=1;n<=6;n++)combined.push(...read('manuscript-rollup-brs'+n+'.json').records);
 const norm=x=>x.map(r=>JSON.stringify(r)).sort();assert.deepEqual(norm(combined),norm(rows));
});
test('timing, grain processing and exercise remain separate from six-atom dietary requirements',()=>{
 assert.equal(output.practices.length,8);assert.ok(output.practices.some(p=>p.section==='3.3'));
 assert.ok(output.practices.every(p=>p.mechanistic_evidence.length&&p.exposure_qualification));
 assert.ok(output.practices.find(p=>p.atom_id==='PM2-SOP-3').mechanistic_evidence.some(s=>s.id==='early-eating-null'));
 assert.ok(output.practices.find(p=>p.pm.startsWith('BRS-X')).exposure_qualification.includes('does not establish health improvement'));
});
test('rendered records show six atoms, pending icons and warnings before the first atom',()=>{
 const $=load(fs.readFileSync(dir+'manuscript-preview.html','utf8'));
 assert.equal($('section').length,313);assert.equal($('.food-target-info').length,12);
 for(const section of $('section').toArray()){
  const details=$(section).find('details');assert.equal(details.children('p:not(.food-target-coverage-warning)').length,6);
  if(details.find('.food-target-info').length){
   assert.match(details.html(),/ontology link pending|material equivalence review required/);
   assert.ok(details.html().indexOf('class="food-target-coverage-warning"')<details.html().indexOf('<p>Input ='));
   assert.match(details.find('.food-target-info').attr('style'),/color:#c62828/);
  }
  assert.equal(details.find('a').first().attr('style'),undefined);
 }
});
test('canonical changes remain within approved additive PM and component-repair scopes; food edges, governance and scores are untouched',()=>{
 const changed=execFileSync('git',['diff','--name-only','110a26bc52663ba6a2e5bdd1a02e4014278b5233'],{encoding:'utf8'}).trim().split('\n');
 const preservation=JSON.parse(fs.readFileSync('system/reviews/stage2ab-preservation-2026-10-23/preservation-manifest.json'));const deferred=readReviewJson('review/deferred-stage2ab-2026-10-23/assessment-matrix.json');const allowedPms=new Set([...preservation.pms.map(p=>p.file),...deferred.map(p=>p.file)]);assert.ok(!changed.some(f=>f.startsWith('docs/biological-targets/')&&!allowedPms.has(f)));assert.ok(!changed.some(f=>f.startsWith('docs/foods/')||f.startsWith('registry/')&&f!=='registry/substances.json'||f.startsWith('system/sec/')));assert.ok(changed.filter(f=>f.startsWith('docs/substances/')).every(f=>['docs/substances/nutrients/macronutrients/amino-acids/essential/phenylalanine.md','docs/substances/bioactive-compounds/lipid-based/l-carnitine.md'].includes(f))); // Approved component repair plus explicitly authorised L-carnitine identity; registry preservation is tested separately.  additive PM content is checked against immutable pre-run record hashes by stage2ab-preservation.test.mjs.
 assert.ok(!changed.includes('system/scientific-finding-schema.md')&&!changed.includes('system/dietary-input-governance-v2.md')&&!changed.includes('system/dietary-input-traceability-contract.md'));
});
