import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import {compile} from '@mdx-js/mdx';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {validateScientificFindings} from './lib/scientific-findings.mjs';
import {validateDietaryLeverAtoms} from './lib/dietary-lever-atoms.mjs';
import {validatePmReferenceIntegrity} from './lib/pm-reference-index.mjs';
import {validateSecRegistry,resolveSecAssessment} from './lib/sec-assessments.mjs';

const read=p=>fs.readFileSync(p,'utf8');
const baseline=matter(read('review/pm1-reassessment/baseline.mdx'));
const canonical=matter(read('docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx'));
const registry=JSON.parse(read('system/sec-assessments/registry.json'));
const require=createRequire(import.meta.url);
const layout=require('../src/plugin/pm-lever-layout/index.cjs');

test('real canonical PM1 uses existing schema, Findings generator and exact versioned SEC references',async()=>{
  assert.equal(canonical.data.pm_id,'BRS1-FM1-PM1');
  assert.equal(canonical.data.slug,baseline.data.slug);
  assert.doesNotMatch(canonical.content,/<PM1Page|<PM1Finding|<PM1Enhancements|SecCalibrationPreview/);
  assert.deepEqual(validateScientificFindings(canonical.data,[],{entityLabel:canonical.data.pm_id}),[]);
  assert.deepEqual(validateSecRegistry(registry),[]);
  assert.ok(canonical.content.includes(expectedFindingsSection(canonical.data,canonical.content).block));
  for(const f of canonical.data.scientific_findings) {
    const resolved=resolveSecAssessment(registry,{pmId:canonical.data.pm_id,finding:f});
    assert.deepEqual(resolved.errors,[]);assert.equal(resolved.kind,'resolved');
    assert.equal(resolved.record.recordVersion,2);assert.equal(resolved.record.proposition,f.finding_statement);
    assert.equal(resolved.record.previousAssessments[0].recordVersion,1);
  }
  await compile(canonical.content);
});

test('local integration preserves six atoms, Unset tyrosine, KC decisions and original paper numbering',()=>{
  const manifest=JSON.parse(read('review/pm1-reassessment/baseline-manifest.json'));
  for(const key of manifest.preserved)assert.deepEqual(canonical.data[key],baseline.data[key],key);
  assert.equal(canonical.data.dietary_input_traceability.find(a=>a.atom_id==='PM1-DIT-4').dietary_input,null);
  const issues=[];validateDietaryLeverAtoms(canonical.data,issues,{entityLabel:canonical.data.pm_id});assert.deepEqual(issues,[]);
  assert.deepEqual(canonical.data.references.slice(0,baseline.data.references.length),baseline.data.references);
  assert.deepEqual(validatePmReferenceIntegrity(canonical.data.references,canonical.content),[]);
});

test('unresolved preparation SOP is evidence, not a selected or registered canonical intervention',()=>{
  assert.deepEqual(canonical.data.system_optimisation_practices,[]);
  assert.deepEqual(canonical.data.lifestyle_priorities,[]);
  assert.doesNotMatch(JSON.stringify(canonical.data.system_optimisation_practices),/PM1-SOP-REVIEW-1/);
  const f5=registry.assessments.find(e=>e.record.findingId==='PM1-F5'&&e.record.pmId===canonical.data.pm_id&&e.record.recordVersion===2).record;
  assert.match(f5.limitations.join(' '),/No approved canonical preparation SOP/);
  assert.match(canonical.content,/No PM-specific preparation protocol is currently selected/);
  assert.doesNotMatch(read('system/generated/food-strategy-rollup/rollup.generated.json'),/PM1-SOP-REVIEW-1/);
});

test('canonical layout promotes dietary group once and retains stable section identity',()=>{
  const plan=layout.dominancePlan(canonical.data);
  assert.deepEqual(plan.promoted,['3.1']);assert.equal(plan.headings['3.1'],'1.1');
  assert.equal((canonical.content.match(/<strong>3.1 Dietary Requirements<\/strong>/g)||[]).length,1);
  assert.equal((canonical.content.match(/<strong>3.1.1 Direct and\/or Derived Dietary Requirements<\/strong>/g)||[]).length,1);
});

test('all inherited assessment snapshots remain byte-identical and PM1 history is additive',()=>{
  const previous=JSON.parse(read('../sec-three-pm-integration/system/sec-assessments/registry.json'));
  assert.deepEqual(validateSecRegistry(registry,{previous}),[]);
  for(const old of previous.assessments)assert.deepEqual(registry.assessments.find(e=>e.record.id===old.record.id&&e.record.recordVersion===old.record.recordVersion),old);
  assert.equal(read('system/sec-assessments/history/pm1-before-local-integration.mdx'),read('review/pm1-reassessment/baseline.mdx'));
});

test('every PM1 Finding has a matching mechanism title and reciprocal links retained by section generation',()=>{
  const mechanism=canonical.content.slice(canonical.content.indexOf('## 4. Mechanistic Basis'),canonical.content.indexOf('### 4.1 Scientific Findings'));
  for(const f of canonical.data.scientific_findings) {
    const target='pm1-mechanism-f'+f.id.split('-F')[1];
    assert.ok(mechanism.includes('#### '+f.id+'\n'),f.id+' heading resolves the canonical descriptive label at render time');
    assert.ok(mechanism.includes('id="'+target+'"'),f.id+' mechanism destination');
    assert.ok(mechanism.includes(`[${f.id}](#${f.id.toLowerCase()})`),f.id+' evidence link');
    assert.ok(expectedFindingsSection(canonical.data,canonical.content).block.includes('href="#'+target+'"'),f.id+' durable return link');
  }
  assert.deepEqual(canonical.data.system_optimisation_practices,[]);
});
