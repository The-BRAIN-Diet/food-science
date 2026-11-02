import {transparencyErrors} from '../src/lib/scientificTransparency.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import matter from 'gray-matter';
import {loadSecRegistry,validateSecRegistry,resolveSecAssessment,secAssessmentView} from './lib/sec-assessments.mjs';
const file='docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx';
const current=matter(fs.readFileSync(file,'utf8'));
const base='87b8f11d';
const git=p=>execFileSync('git',['show',base+':'+p],{encoding:'utf8',maxBuffer:32*1024*1024});
const previous=matter(git(file)),registry=loadSecRegistry();
test('PM4 assessment integration preserves every existing snapshot and validates the full registry',()=>{
 const old=JSON.parse(git('system/sec-assessments/registry.json'));
 assert.equal(old.assessments.length,98);
 assert.deepEqual(validateSecRegistry(registry,{previous:old}),[]);
 assert.deepEqual(registry.assessments.slice(0,98),old.assessments);
});
test('PM4 scientific propositions, active counts, admissions and complete page body are unchanged',()=>{
 const data=structuredClone(current.data);
 for(const f of data.scientific_findings)delete f.sec_assessment_ref;
 // Only the separately authorised gap review may add contextual source records.
 const contextual=data.scientific_findings[1].evidence_considered.splice(1);
 assert.deepEqual(contextual.map(e=>e.citation_key),['mcdonald_american_gut_2018','stanford_plant_diversity_ckd_2025','creedon_biome_2026']);
 data.evidence_gaps=previous.data.evidence_gaps;
 delete data.scientific_findings_placement;
 assert.deepEqual(data,previous.data);
 assert.equal(current.content.split('## 4.')[0],previous.content.split('## 4.')[0]);
 assert.equal(current.content.slice(current.content.indexOf('## 5.')),previous.content.slice(previous.content.indexOf('## 5.')));
 assert.equal((current.content.match(/<ScientificFinding finding=/g)||[]).length,4);
 assert.equal(current.data.scientific_findings_placement,'section-4');
 assert.equal(data.scientific_findings.length,4);
});
test('three exact propositions receive provisional totals and SF3 never acquires a fabricated score',()=>{
 const scores=[4,4,null,5];
 current.data.scientific_findings.forEach((finding,i)=>{
  const result=resolveSecAssessment(registry,{pmId:current.data.pm_id,finding});
  assert.deepEqual(result.errors,[]);
  assert.equal(result.record.adjustedScore,scores[i]);
  assert.equal(result.record.canonicalProposition,finding.finding_statement);
  assert.equal(result.record.humanReview,null);
  assert.equal(result.record.assessmentStatus,i===2?'not-scored':'codex-provisional');
  if(i===2){assert.equal(result.record.factors.B,null);assert.equal(result.record.factors.P,null);}
 });
});
test('publication checker handles the historical registry above the default child-process buffer',()=>{
 assert.ok(Buffer.byteLength(git('system/sec-assessments/registry.json'))>1024*1024);
 const output=execFileSync(process.execPath,['scripts/check-sec-assessments.mjs',base],{encoding:'utf8'});
 assert.match(output,/immutable history and canonical references valid/);
});

test('plant-count threshold has its own sourced gap, separate from diversity mediation',()=>{
 const [diversity,plants]=current.data.evidence_gaps;
 assert.equal(diversity.id,'PM4-EG-RECOVERY-1');
 assert.doesNotMatch(JSON.stringify(diversity),/30 plants|30-plant/);
 assert.equal(plants.id,'PM4-EG-PLANT-VARIETY-1');
 assert.deepEqual(plants.finding_ids,['PM4-F2']);
 assert.equal(plants.citation_keys.length,3);
 assert.match(plants.missing_link,/No SOP is admitted/);
 assert.match(plants.establishes,/richness decreased/);
});

test('both separate gaps resolve all canonical Finding and source references',()=>{assert.deepEqual(transparencyErrors(current.data,[]),[]);});
