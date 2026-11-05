import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import matter from 'gray-matter';import{validatePmNonDietaryLeverEvidence}from'./lib/dietary-input-traceability.mjs';
const data=matter(fs.readFileSync('docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control.mdx','utf8')).data;
const check=d=>{const issues=[];validatePmNonDietaryLeverEvidence(d,issues,{entityLabel:d.pm_id});return issues;};
test('independent exact intervention evidence passes without fabricated Finding',()=>assert.deepEqual(check(data),[]));
for(const field of ['measuredEffect','pmRelevance'])test('missing '+field+' fails',()=>{const d=structuredClone(data);delete d.system_optimisation_practices[0].biologicalRelationship[field];assert.ok(check(d).some(x=>x.code==='pm_lever_missing_finding_source'));});
test('wrong SEC hash fails',()=>{const d=structuredClone(data);d.system_optimisation_practices[0].sec_assessment_ref.sha256='0'.repeat(64);assert.ok(check(d).length);});
test('missing typed limitations fails',()=>{const d=structuredClone(data);d.system_optimisation_practices[0].limitations=[];assert.ok(check(d).length);});
