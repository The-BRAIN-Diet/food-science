import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {secTotals} from '../../../src/lib/secAssessments.mjs';
const report=JSON.parse(fs.readFileSync(new URL('./intervention-appraisals.json',import.meta.url)));
test('all seven PM3 interventions have separate propositions; no Finding score inheritance',()=>{
 assert.equal(report.records.length,7);assert.equal(new Set(report.records.map(r=>r.interventionId)).size,7);
 for(const r of report.records){assert.ok(r.proposition);assert.equal(r.inheritedFindingScore,false);assert.ok(!('findingId' in r));assert.deepEqual(r.totals,secTotals(r.factors));}
});
test('pending dimensions have actionable tracked assessment gaps and never contribute a total',()=>{
 for(const r of report.records)for(const [dimension,value] of Object.entries(r.factors))if(value===null){
  assert.equal(r.totals,null);assert.ok(report.assessmentIssues.some(g=>r.assessmentGaps.includes(g.id)&&g.interventionId===r.interventionId&&g.dimensions.includes(dimension)&&g.attempts.length&&g.resolution));
 }
});
test('verified uncontrolled causal claim invokes existing bias ceiling',()=>{
 const r=report.records.find(r=>r.interventionId==='PM3-SOP-4');assert.equal(r.factors.B,0);assert.equal(r.totals.raw,3);assert.equal(r.totals.adjusted,2);
});
test('between-diet PET null and exercise counterevidence remain explicit',()=>{
 assert.ok(report.records.find(r=>r.interventionId==='PM3-SOP-3').limitations.some(x=>/No significant PET difference/.test(x)));
 assert.match(report.records.find(r=>r.interventionId==='PM3-LP-1').rationale.R,/null/);
});
