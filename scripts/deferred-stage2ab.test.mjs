import {readReviewJson} from './lib/review-json.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import {createHash} from 'node:crypto';
import {assessAdmission} from '../src/lib/dietaryInputGovernance.mjs';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {expectedFindingsSection,checkScientificFindings} from './lib/scientific-findings-gate.mjs';
import {validatePmReferenceIntegrity} from './lib/pm-reference-index.mjs';
import {buildDietaryLeverDisclosureMap} from './lib/dietary-lever-disclosure.mjs';
const dir='review/deferred-stage2ab-2026-10-23',read=p=>readReviewJson(p);
const base=read(dir+'/complete-baseline.json'),admissions=read(dir+'/new-admissions.json'),registry=read('registry/substances.json');
for(const b of base)test(b.pm_id+' preserves existing science, narrative and decision provenance',()=>{
 const p=matter(fs.readFileSync(b.file,'utf8'));
 for(const [k,v]of Object.entries(b.data)){
  if(Array.isArray(v))for(const [i,item]of v.entries()){
   let current=p.data[k][i];
   if(b.pm_id==='BRS5-FM1-PM1'&&k==='dietary_input_traceability'&&item.atom_id==='PM1-DIT-6'){
    assert.ok(item.dietary_input==null);assert.equal(current.dietary_input,true);current={...current};
    assert.deepEqual(current.evidence_source.finding_ids.slice(0,item.evidence_source.finding_ids.length),item.evidence_source.finding_ids);
    assert.deepEqual(current.evidence_source.citation_keys.slice(0,item.evidence_source.citation_keys.length),item.evidence_source.citation_keys);
    assert.ok(current.evidence_limitation.startsWith(item.evidence_limitation));
    current.evidence_source=item.evidence_source;current.evidence_limitation=item.evidence_limitation;
    for(const key of ['dietary_input','dietary_input_note']){if(Object.hasOwn(item,key))current[key]=item[key];else delete current[key];}
   }
   if(b.pm_id==='BRS4-FM3-PM6'&&k==='dietary_input_traceability'&&item.atom_id==='PM6-DEFERRED-BIO-1'){assert.equal(current.canonical_identity.substance_id,'l-carnitine');current={...current,canonical_identity:item.canonical_identity};delete current.identity_resolution_note;}
   assert.deepEqual(current,item,k+'/'+i);
  }else assert.deepEqual(p.data[k],v,k);
 }
 let original=b.content;
 if(b.data.scientific_findings?.length){const old=expectedFindingsSection(b.data,b.content);assert.ok(old&&!old.missingHeading);original=original.replace(old.block,'');}
 // References are reprojected from a preserved-prefix array. Preserve original authored annexes separately.
 const ref=original.search(/^##\s+(?:\d+\.\s+)?References\s*$/m);if(ref>=0)original=original.slice(0,ref);
 // New disclosures may split an existing HTML paragraph. Check every original line,
 // rather than requiring an untouched container around an enriched list.
 for(let line of original.split('\n').map(x=>x.trim()).filter(Boolean)){
  if(b.pm_id==='BRS4-FM3-PM6'&&line==='<strong>3.1.1 Direct and/or Derived Dietary Requirements</strong>')line='<strong>3.1.1 Dietary Inputs &amp; Regulatory Modulators</strong>';
  if(/^### \d+\.1 Evidence Highlights$/.test(line))line=line.replace('Evidence Highlights','Scientific Findings');
  assert.ok(p.content.includes(line),b.pm_id+' removed narrative: '+line.slice(0,120));
 }
 const issues=[];validatePmReferenceIntegrity(p.data.references,p.content,issues,{entityLabel:b.pm_id});assert.deepEqual(issues,[]);
});
test('scope is exactly the thirty deferred identities; the completed and blocked PMs remain byte-identical',()=>{
 const original=read('review/rapid-stage2ab-2026-10-23/pm-inventory.json').filter(r=>r.final_disposition==='DEFERRED').map(r=>r.pm_id).sort();assert.deepEqual(base.map(r=>r.pm_id).sort(),original);
 const hashes=read(dir+'/source-fingerprints.json'),changed=new Set(base.map(r=>r.file));
 for(const [file,digest]of Object.entries(hashes))if(file.startsWith('docs/biological-targets/')&&!changed.has(file))assert.equal(createHash('sha256').update(fs.readFileSync(file)).digest('hex'),digest,file);
});
test('all four new admissions satisfy their independent gates and resolve existing identities',()=>{
 assert.equal(admissions.length,4);
 for(const r of admissions){const b=base.find(b=>b.pm_id===r.pm_id),p=matter(fs.readFileSync(b.file,'utf8')).data,a=p.dietary_input_traceability.find(a=>a.atom_id===r.atom_id),s=p.dietary_input_assessments.find(a=>a.atom_id===r.atom_id),o=p.dietary_lever_atoms.find(a=>a.atom_id===r.atom_id);assert.equal(assessAdmission({...a,operation:p.mission,relationship_type:{mode:o.relationship_mode,classification:o.requirement_classification}},s,{substances:registry}).status,'admitted');assert.equal(s.classification,'direct');assert.ok(registry[s.canonical_substance_id]);}
 assert.equal(admissions.filter(a=>a.type==='A').length,3);assert.equal(admissions.filter(a=>a.type==='B').length,1);
});
test('all new Findings remain unscored; every existing score and Phenome field is preserved',()=>{
 let n=0;for(const b of base){const d=matter(fs.readFileSync(b.file,'utf8')).data;assert.deepEqual(d.phenome_relationships,b.data.phenome_relationships);for(const f of(d.scientific_findings||[]).slice((b.data.scientific_findings||[]).length)){n++;assert.equal(f.synthesised_evidence_confidence,'not-yet-scored');assert.equal(f.fm_rollup,false);assert.ok(!f.sec_assessment);}}
 assert.equal(n,19);assert.equal(checkScientificFindings(process.cwd()).ok,true);
});
test('new dietary disclosures have six scientific fields and bounded source interpretation',()=>{
 for(const r of admissions){const b=base.find(b=>b.pm_id===r.pm_id),d=matter(fs.readFileSync(b.file,'utf8')).data;const disclosure=[...buildDietaryLeverDisclosureMap(d).values()].find(x=>x.atomId===r.atom_id);assert.ok(disclosure);for(const key of ['title','inputType','biologicalRole','evidenceReferences','evidenceLimitation','dietaryInput'])assert.ok(disclosure[key]!==undefined,key);}
 const la=admissions.find(a=>a.substance_id==='linoleic-acid');assert.match(la.assessment.assessment_limitations,/not a beneficial direction|not a reason/i);assert.match(la.assessment.assessment_limitations,/food|Foods/);
});
test('verified, provisional and missing food coverage remain independent of scientific admission',()=>{
 const maps=[1,2,3,4,5,6].map(n=>buildInputSubstanceFood(process.cwd(),{brs:'BRS'+n}));let rows=[];
 for(const a of admissions){const r=maps.flatMap(m=>m.relationships).find(r=>r.pm===a.pm_id&&r.id.endsWith('::'+a.atom_id));assert.equal(r.scientific_admission,'admitted');rows.push(...maps.flatMap(m=>m.manuscript_rows).filter(x=>x.pm===a.pm_id&&x.dietary_input===r.input));if(a.substance_id==='glutamine'){assert.equal(r.food_targets.length,0);assert.match(r.coverage_warnings.join(' '),/Food ontology coverage unresolved/);}}
 assert.equal(rows.filter(r=>r.mapping_status==='verified').length,11);assert.equal(rows.filter(r=>r.mapping_status==='research-supported-provisional').length,6);assert.equal(rows.filter(r=>r.mapping_status==='unresolved').length,1);
 const inulin=rows.filter(r=>r.canonical_substance_id==='inulin');assert.deepEqual(inulin.map(r=>r.food_target).sort(),['chicory-root','jerusalem-artichokes']);assert.ok(inulin.every(r=>/extract|laboratory|Harvest/i.test(r.preparation)));
});
test('no food edges, existing identities, SEC or governance changed; only authorised L-carnitine identity added',()=>{
 const old=read('review/brs4-candidate-reconciliation-2026-10-23/before-files.json')['registry/substances.json'];const expected=JSON.parse(old.content);const actual=read('registry/substances.json');assert.ok(actual['l-carnitine']);delete actual['l-carnitine'];assert.deepEqual(actual,expected);const hashes=read(dir+'/source-fingerprints.json');for(const [file,digest]of Object.entries(hashes))if(file.startsWith('docs/foods/')||file.startsWith('registry/')&&file!=='registry/substances.json'||file.startsWith('system/sec-assessments/')||['system/scientific-finding-schema.md','system/dietary-input-traceability-contract.md','system/primary-mechanism-schema.md','system/dietary-input-governance-v2.md','system/dietary-input-historical-baseline.json'].includes(file))assert.equal(createHash('sha256').update(fs.readFileSync(file)).digest('hex'),digest,file);
});
test('six generated BRS shards reconstruct the consolidated historical catalogue',()=>{
 const p='system/generated/dietary-food-targets/';const shards=[1,2,3,4,5,6].flatMap(n=>read(p+'manuscript-rollup-brs'+n+'.json').records);assert.deepEqual(shards,read(p+'manuscript-rollup.json').records);
});
