import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import {compile} from '@mdx-js/mdx';
import {sameAudits} from '../src/components/SecCalibrationPreview/sameAudit.mjs';
import {sameCuratedReferences, sameSourcesFor} from '../src/components/SecCalibrationPreview/sameSources.mjs';
import {secAssessmentStatusErrors, isAuditPreview} from '../src/components/SecCalibrationPreview/assessmentAudit.mjs';
import {assessmentPresentation} from '../src/components/SecCalibrationPreview/auditPresentation.mjs';
import {buildDietaryLeverDisclosureMap, dietaryLeverBulletKey} from './lib/dietary-lever-disclosure.mjs';
import * as sourceData from '../src/components/SecCalibrationPreview/sameSources.mjs';
import * as auditData from '../src/components/SecCalibrationPreview/sameAudit.mjs';
import * as presentationData from '../src/components/SecCalibrationPreview/auditPresentation.mjs';

const read = p => fs.readFileSync(p, 'utf8');
const path = 'docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx';
const canonical = matter(read(path));
const preview = matter(read('docs/system/sec-calibration/same-synthesis.mdx'));
const display = JSON.parse(preview.content.match(/export const previewDisplayData = (.*);/)[1]);

test('complete isolated copy preserves canonical records, all numbered sections and dietary relationships', () => {
  assert.equal(read(path), execFileSync('git', ['show', 'HEAD:' + path], {encoding:'utf8'}));
  for (const key of Object.keys(display)) assert.deepEqual(display[key], canonical.data[key]);
  assert.deepEqual([...preview.content.matchAll(/^#{2,3} (\d+\.[^\n]*)/gm)].map(m=>m[1]), [...canonical.content.matchAll(/^#{2,3} (\d+\.[^\n]*)/gm)].map(m=>m[1]));
  for (const f of canonical.data.scientific_findings) assert.deepEqual(sameAudits.find(r=>r.findingId===f.id).canonicalRecord,f);
  assert.ok(display.dietary_lever_atoms.some(a=>a.atom_id==='PM3-DIT-5'));
  assert.ok(!display.dietary_lever_presentations.some(a=>a.atom_id==='PM3-DIT-5'));
  assert.deepEqual(display.dietary_input_traceability.slice(0,4).map(a=>a.dietary_input),[true,false,false,false]);
  for (const p of ['docs/system/sec-calibration/gaba.mdx','docs/system/sec-calibration/glycaemic-variability.mdx','static/bibtex/BRAIN-diet.bib','system/primary-mechanism-schema.md','system/scientific-finding-schema.md','system/dietary-input-traceability-contract.md']) assert.equal(read(p),execFileSync('git',['show','HEAD:'+p],{encoding:'utf8'}));
});

test('MDX compilation and production isolation without a full build', async () => {
  assert.match(String(await compile(preview.content)),/SameExperimentalFinding/);
  assert.equal(preview.data.pm_id,undefined);
  assert.equal(preview.data.scientific_findings,undefined);
  const config=read('docusaurus.config.ts');
  const code=config.slice(config.indexOf('const includeInternalDocs'),config.indexOf('const wipSitemapIgnore'));
  assert.ok(vm.runInNewContext(code+'\ndocsExclude',{process:{env:{NODE_ENV:'production',SEC_CALIBRATION_PREVIEW:'true',INCLUDE_INTERNAL_DOCS:'true'}}}).includes('**/system/sec-calibration/**'));
  assert.ok(isAuditPreview('/docs/system/sec-calibration/same-synthesis/'));
});

test('chemistry and construct gaps are not assigned artificial SEC scores', () => {
  for (const r of sameAudits.filter(r=>r.findingId!=='PM3-F5')) {
    assert.equal(r.rawScore,null);assert.equal(r.adjustedScore,null);
    assert.equal(assessmentPresentation(r).score,null);
    assert.deepEqual(secAssessmentStatusErrors(r),[]);
  }
  assert.match(sameAudits[0].scopeNote,/ATP-first.*random binding/);
  assert.match(sameAudits.find(r=>r.findingId==='PM3-IC1').scopeNote,/not a headline/);
});

test('proposed experimental synthesis has defensible factors, existing caps and no human-review inference', () => {
  const r=sameAudits.find(r=>r.findingId==='PM3-F5');
  assert.deepEqual(r.factors,{D:2,B:1,P:1,R:1});
  assert.equal(r.rawScore,5);assert.equal(r.adjustedScore,5);
  assert.deepEqual(secAssessmentStatusErrors(r),[]);
  assert.equal(assessmentPresentation(r).statusLabel,'Provisionally assessed');
  assert.equal(r.humanReview,null);
  assert.match(r.proposition,/not an exclusive explanation.*human SAMe synthesis flux/);
  assert.match(r.rationale.R,/partial independent corroboration/);
  assert.ok(r.sources.targetedChecks.some(s=>s.role.startsWith('Contradictory substrate')));
  assert.ok(r.sources.retrievalLimited.length);
});

test('curated records are unique, PM-local, unscored and do not alter six-atom Evidence source data', () => {
  assert.equal(new Set(sameCuratedReferences.map(r=>r.anchor)).size,sameCuratedReferences.length);
  assert.equal(new Set(sameCuratedReferences.map(r=>r.accession)).size,sameCuratedReferences.length);
  for (const r of sameCuratedReferences) {assert.match(r.href,/^https:\/\//);assert.ok(r.accessed);}
  assert.deepEqual(sameSourcesFor('unknown'),[]);
  assert.ok(sameSourcesFor('PM3-DIT-3').length);
  const component=read('src/components/SecCalibrationPreview/SamePreview.tsx');
  assert.match(component,/brs-dietary-lever-detail-evidence/);
  assert.match(component,/<PmDietaryLeverEnhancer frontMatter=\{data\}/);
  assert.doesNotMatch(component,/dietary_input\s*=/);
  const audit=read('src/components/SecCalibrationPreview/EvidenceAudit.tsx');
  assert.match(audit,/same-synthesis.*sameAudits/);
  assert.match(audit,/brs-fm-hub-summary" aria-expanded="false"/);
  assert.match(audit,/secFactors\[factor\]\.name/);
});

test('Methionine legacy and foodless keys resolve the same disclosure; minerals and upstream inputs survive', () => {
  const map = buildDietaryLeverDisclosureMap(display);
  for (const row of display.dietary_lever_presentations) {
    const full = map.get(dietaryLeverBulletKey(row.label,row.foods,row.presentation_section));
    assert.ok(full,row.atom_id);
    if (row.foods) assert.equal(map.get(dietaryLeverBulletKey(row.label,'',row.presentation_section)),full);
    const atom=display.dietary_input_traceability.find(a=>a.atom_id===row.atom_id);
    assert.equal(full.dietaryInput,atom.dietary_input);
    assert.equal(full.biologicalRole,atom.biological_role);
    assert.equal(full.evidenceLimitation,atom.evidence_limitation);
  }
});

test('actual React preview renders provenance, proposed score, limitations and unique canonical source links', () => {
  const require=createRequire(import.meta.url), ts=require('typescript'), React=require('react');
  const {renderToStaticMarkup}=require('react-dom/server');
  const js=ts.transpileModule(read('src/components/SecCalibrationPreview/SamePreview.tsx'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const sfJs=ts.transpileModule(read('src/components/ScientificFinding.tsx'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const sf={exports:{}};
  new Function('exports','require','module',sfJs)(sf.exports,id=>id==='../client/brsFmHubDropdown'?{initBrsFmHubDropdowns(){}}:require(id),sf);
  const mod={exports:{}};
  const localRequire=id=>id==='./sameSources.mjs'?sourceData:id==='./sameAudit.mjs'?auditData:id==='./auditPresentation.mjs'?presentationData:id.endsWith('.module.css')?{}:id==='../ScientificFinding'?sf.exports:id==='../EvidenceConfidenceIndicator'?({score})=>React.createElement('span',null,score===null?'Not scored':score+'/8'):id==='../PmDietaryLeverEnhancer'?()=>null:require(id);
  new Function('exports','require','module',js)(mod.exports,localRequire,mod);
  const render=(C,p)=>renderToStaticMarkup(React.createElement(C,p));
  const experimental=render(mod.exports.SameExperimentalFinding);
  assert.match(experimental,/5\/8/);assert.match(experimental,/Provisionally assessed/);
  assert.match(experimental,/same-pm3-f5-assessment-v1/);
  assert.match(experimental,/not an exclusive explanation/);
  assert.match(experimental,/brs-fm-hub-summary" aria-expanded="false"/);
  assert.match(experimental,/10.1038\/s41419-024-07093-8/);
  const provenance=render(mod.exports.SameFinding,{finding:canonical.data.scientific_findings[0]});
  assert.match(provenance,/Biochemical provenance/);assert.doesNotMatch(provenance,/5\/8/);
  const references=render(mod.exports.SameReferences);
  for (const r of sameCuratedReferences) {
    assert.ok(references.includes('id="'+r.anchor+'"'));
    assert.ok(references.includes('href="'+r.href+'"'));
  }
});
