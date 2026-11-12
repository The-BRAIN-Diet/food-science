import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import matter from 'gray-matter';
import {loadSecRegistry, validateSecRegistry, resolveSecAssessment} from './lib/sec-assessments.mjs';

const file='docs/biological-targets/brs6/fm2/brs6-fm2-pm4-cortisol-rhythm-regulation.mdx';
const current=matter(fs.readFileSync(file,'utf8'));
const registry=loadSecRegistry();
const expected={
  'PM4-F1':{raw:5, adjusted:5, factors:{D:2,B:1,P:2,R:0}},
  'PM4-F2':{raw:4, adjusted:4, factors:{D:2,B:1,P:1,R:0}},
  'PM4-F3':{raw:4, adjusted:4, factors:{D:2,B:1,P:1,R:0}},
  'PM4-F4':{raw:4, adjusted:4, factors:{D:2,B:1,P:1,R:0}},
  'PM4-F5':{raw:5, adjusted:5, factors:{D:2,B:1,P:1,R:1}},
  'PM4-F6':{raw:4, adjusted:4, factors:{D:2,B:1,P:1,R:0}},
  'PM4-F7':{raw:5, adjusted:5, factors:{D:2,B:1,P:1,R:1}},
};

test('BRS6-FM2-PM4 assessments append without rewriting published snapshots',()=>{
  const old=JSON.parse(execFileSync('git',['show','origin/main:system/sec-assessments/registry.json'],{encoding:'utf8',maxBuffer:64*1024*1024}));
  assert.deepEqual(validateSecRegistry(registry,{previous:old}),[]);
  assert.deepEqual(registry.assessments.slice(0, old.assessments.length), old.assessments);
  assert.equal(registry.assessments.length, old.assessments.length + 7);
});

test('seven cortisol Findings resolve to provisional exact-proposition scores',()=>{
  assert.equal(current.data.scientific_findings.length, 7);
  for (const finding of current.data.scientific_findings) {
    const result=resolveSecAssessment(registry,{pmId:current.data.pm_id, finding});
    assert.deepEqual(result.errors,[]);
    assert.equal(result.record.assessmentStatus,'codex-provisional');
    assert.equal(result.record.humanReview, null);
    assert.equal(result.record.canonicalProposition, finding.finding_statement);
    const exp=expected[finding.id];
    assert.deepEqual(result.record.factors, exp.factors);
    assert.equal(result.record.rawScore, exp.raw);
    assert.equal(result.record.adjustedScore, exp.adjusted);
  }
});
