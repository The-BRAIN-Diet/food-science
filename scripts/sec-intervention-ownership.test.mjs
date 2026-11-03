import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import {loadSecRegistry,secRecordErrors,resolveInterventionSecAssessment,resolveSecAssessment,validateSecRegistry} from './lib/sec-assessments.mjs';
const registry=loadSecRegistry();
const page=matter(fs.readFileSync('docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx','utf8')).data;
const interventions=[...page.system_optimisation_practices,...page.lifestyle_priorities];
test('seven exact intervention-owned pins resolve independently of linked Findings',()=>{
 assert.equal(interventions.length,7);
 for(const intervention of interventions){const r=resolveInterventionSecAssessment(registry,{pmId:page.pm_id,intervention});assert.equal(r.kind,'resolved',JSON.stringify(r.errors));assert.equal(r.record.findingId,undefined);}
});
test('wrong target, proposition, pin and SF inheritance are rejected',()=>{
 const original=interventions[0];
 for(const patch of [{atom_id:'PM3-SOP-99'},{sec_assessed_proposition:'different claim'},{sec_assessment_ref:{...original.sec_assessment_ref,sha256:'0'.repeat(64)}}])assert.equal(resolveInterventionSecAssessment(registry,{pmId:page.pm_id,intervention:{...original,...patch}}).kind,'invalid');
 assert.equal(resolveSecAssessment(registry,{pmId:page.pm_id,finding:{id:original.atom_id,finding_statement:original.sec_assessed_proposition,sec_assessment_ref:original.sec_assessment_ref}}).kind,'invalid');
});
test('mixed ownership and mismatched Assessment gap ownership fail',()=>{
 const r=structuredClone(registry.assessments.find(e=>e.record.interventionId==='PM3-SOP-1').record);
 assert.ok(secRecordErrors({...r,findingId:'PM3-F1'}).length);
 r.assessmentGaps[0].interventionId='PM3-SOP-2';assert.ok(secRecordErrors(r).some(e=>e.code==='sec_completeness'));
});
test('pending appraisal cannot silently receive a total or disappear',()=>{
 const r=structuredClone(registry.assessments.find(e=>e.record.interventionId==='PM3-SOP-1').record);
 assert.ok(secRecordErrors({...r,rawScore:2,adjustedScore:2}).length);
 assert.ok(secRecordErrors({...r,assessmentGaps:[]}).length);
});
test('old snapshots remain protected when intervention records are appended',()=>{
 const previous={schemaVersion:1,assessments:registry.assessments.filter(e=>!e.record.interventionId)};
 assert.deepEqual(validateSecRegistry(registry,{previous}),[]);
 const changed=structuredClone(registry);changed.assessments[0].record.proposition+=' altered';
 assert.ok(validateSecRegistry(changed,{previous}).some(e=>e.code==='sec_immutable'));
});
