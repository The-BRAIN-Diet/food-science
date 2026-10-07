import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAllMechanismPages} from './lib/mechanism-page-validation.mjs';
import {checkScientificFindings} from './lib/scientific-findings-gate.mjs';
const reports=validateAllMechanismPages();
test('PM3 current canonical layout and constituent identities pass the actual page validator',()=>{
 const report=reports.pm.find(r=>r.entityId==='BRS2-FM1-PM3');
 assert.ok(report); assert.deepEqual(report.issues,[]);
});
test('PM4 Findings satisfy canonical source classification, reuse and rendered freshness',()=>{
 const gate=checkScientificFindings(process.cwd());
 assert.deepEqual(gate.issues.filter(i=>JSON.stringify(i).includes('BRS3-FM2-PM4')),[]);
});
test('FM1 no longer publishes a constraint claim outside its PM constraint union',()=>{
 const report=reports.fm.find(r=>r.entityId==='BRS2(FM1)');
 assert.ok(report); assert.deepEqual(report.issues,[]);
});
