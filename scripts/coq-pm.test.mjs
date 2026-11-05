import test from 'node:test';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import matter from 'gray-matter';
import {validateAllMechanismPages} from './lib/mechanism-page-validation.mjs';
import {validateInputGovernance} from './lib/dietary-input-governance.mjs';
import {reconcileSecCoverage} from '../src/lib/secCompleteness.mjs';
import {secRecordErrors,secCanonicalJson} from '../src/lib/secAssessments.mjs';
const file='docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx';
const {data,content}=matter(fs.readFileSync(file,'utf8'));
const registry=JSON.parse(fs.readFileSync('system/sec-assessments/registry.json'));
const substances=JSON.parse(fs.readFileSync('registry/substances.json'));
const hash=s=>createHash('sha256').update(s).digest('hex');
test('CoQ owns supply, preserves identity and is registered once under FM1',()=>{
 assert.equal(data.pm_id,'BRS4-FM1-PM10');assert.equal(data.parent_fm,'BRS4(FM1)');
 assert.equal(data.mission,'Maintain endogenous Coenzyme Q synthesis, maturation and pool availability to support mitochondrial electron transfer and cellular redox functions.');
 const fm=matter(fs.readFileSync('docs/biological-targets/brs4/fm1/brs4-fm1-cellular-bioenergetics.mdx','utf8')).data;
 assert.equal(fm.mechanisms_covered.filter(x=>x.id===data.pm_id).length,1);assert.deepEqual(data.key_constraints,[]);
 assert.match(content,/ETC electron transfer remains with PM1/);
});
test('PM structural and six-atom admission contracts pass without inherited fixtures',()=>{
 const result=validateAllMechanismPages().pm.find(x=>x.entityId===data.pm_id || x.id===data.pm_id || x.filePath?.endsWith(file));assert.deepEqual(result.issues,[]);
 const issues=[];validateInputGovernance(data,issues,{entityLabel:data.pm_id,content});assert.deepEqual(issues,[]);
 assert.equal(data.dietary_input_assessments.length,4);assert.ok(data.dietary_input_assessments.every(x=>x.type==='A'&&x.status==='admitted'));
 assert.equal(data.dietary_lever_presentations.length,4);
});
test('Derived nutrient routes resolve canonical identities without duplicate target admission',()=>{
 for(const a of data.dietary_input_assessments){assert.ok(substances[a.canonical_substance_id]);for(const e of a.conversion_pathway||[]){assert.ok(substances[e.from]);assert.ok(substances[e.to]);assert.ok(e.evidence.sources.length);}}
 for(const id of ['coq10','s-adenosylmethionine','flavin-adenine-dinucleotide'])assert.equal(data.dietary_input_traceability.find(a=>a.substance_id===id).dietary_input,false);
 assert.equal(data.dietary_input_assessments.filter(x=>x.classification==='derived').length,3);
});
test('Six SFs have valid pinned independent assessments and no missing-score zeros',()=>{
 const c=reconcileSecCoverage([data],registry);assert.equal(c.structurallyComplete,true);assert.equal(c.scientificallyAppraised,false);
 assert.deepEqual(c.findings,{eligible:6,completed:5,pending:1,unassessable:0,missingStatus:0,legacyPending:0});
 assert.equal(c.dimensions.pendingTracked,3);assert.equal(c.dimensions.unexplainedMissing,0);
 for(const f of data.scientific_findings){const e=registry.assessments.find(e=>e.record.id===f.sec_assessment_ref.id);assert.equal(e.sha256,hash(secCanonicalJson(e.record)));assert.deepEqual(secRecordErrors(e.record),[]);}
 const pending=registry.assessments.find(e=>e.record.id==='brs4-pm10-f5-assessment').record;
 assert.equal(pending.factors.B,null);assert.equal(pending.factors.P,null);assert.equal(pending.factors.R,null);assert.equal(pending.adjustedScore,null);
 assert.equal(data.scientific_principles.length,1);assert.equal(data.scientific_principles[0].sec_assessment_ref,undefined);
});
test('All pre-existing SEC snapshots and PM scientific records remain exact',()=>{
 const old=JSON.parse(fs.readFileSync('review/coq-pm-2026-11-05/sec-before.json'));
 for(const x of old){const e=registry.assessments.find(e=>e.record.id===x.id&&e.record.recordVersion===x.version);assert.ok(e);assert.equal(e.sha256,x.sha256);assert.deepEqual(e.record,x.record);}
 const baseline=JSON.parse(fs.readFileSync('review/coq-pm-2026-11-05/preservation.json'));
 const later={'docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx':fs.readFileSync('review/lat1-sop-relocation-2026-11-05/before.mdx','utf8'),...JSON.parse(fs.readFileSync('review/priority-intervention-appraisal-2026-11-04/integration-before.json')).pages,...JSON.parse(fs.readFileSync('review/priority-intervention-appraisal-batch2-2026-11-05/integration-before.json')).pages,...JSON.parse(fs.readFileSync('review/priority-intervention-appraisal-batch3-2026-11-05/integration-before.json')).pages};
 for(const [p,digest] of Object.entries(baseline).filter(([p])=>/\/[^/]+-pm\d+-/.test(p))){if(later[p]){assert.equal(hash(later[p]),digest,p+' before authorised Batch3');const current=matter(fs.readFileSync(p,'utf8')).data, prior=matter(later[p]).data;for(const key of ['mission','scientific_findings','scientific_principles'])assert.deepEqual(current[key],prior[key],p+key);if(!p.includes('pm2-lat1'))assert.deepEqual(current.dietary_input_traceability,prior.dietary_input_traceability);else {const archived=JSON.parse(fs.readFileSync('review/lat1-sop-relocation-2026-11-05/historical-dit3.json'));assert.deepEqual([...current.dietary_input_traceability,...archived.records.dietary_input_traceability],prior.dietary_input_traceability);}}else if(JSON.parse(fs.readFileSync('review/release-2026-11-05/reference-repairs.json')).includes(p)){const prior=matter(execFileSync('git',['show','HEAD:'+p],{encoding:'utf8'})).data;assert.deepEqual(matter(fs.readFileSync(p,'utf8')).data,prior,p+' reference-only repair');}else assert.equal(hash(fs.readFileSync(p)),digest,p);}
});
test('Uncontrolled exercise is not silently admitted or given a synthetic mechanism',()=>{
 assert.deepEqual(data.lifestyle_priorities,[]);const candidate=JSON.parse(fs.readFileSync('review/coq-pm-2026-11-05/exercise-candidate.json'));
 assert.equal(candidate.admission_status,'deferred');assert.equal(candidate.biologicalRelationship.moa.status,'unresolved');assert.equal(candidate.sec_status,'Not yet assessed');
 assert.match(data.scientific_findings[3].synthesis,/ATP-production capacity or peak oxygen uptake/);
});
test('Food occurrence remains qualitative and redox forms are not collapsed by aliases',()=>{
 const food=matter(fs.readFileSync('docs/foods/extra-virgin-olive-oil.md','utf8')).data;
 const edge=food.substance_relationships.find(e=>e.substance==='CoQ10');assert.ok(edge);assert.equal(edge.relationship,'contains');assert.equal(edge.value,undefined);assert.equal(edge.amount,undefined);
 assert.match(edge.source_url,/10.1021\/jf5002167/);assert.match(edge.evidence_material,/Fresh extra-virgin/);
 assert.ok(!substances.coq10.aliases.some(a=>/ubiquinol|^ubiquinone$/i.test(a)));
});
test('No new public technical panels or inherited intervention SEC',()=>{
 assert.doesNotMatch(content,/Dietary pathway evidence|Composition, conversion & PM evidence|PM-local source records/);
 assert.ok(!registry.assessments.some(e=>e.record.pmId===data.pm_id&&e.record.interventionId));
 assert.equal(data.intervention_dominance_assessment.principal_route_selection.disposition,'not-established');
});
