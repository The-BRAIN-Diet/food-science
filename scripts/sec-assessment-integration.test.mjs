import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import {secAssessmentHash,validateSecRegistry,resolveSecAssessment,secTotals,secAssessmentView,secAuditAnchor} from './lib/sec-assessments.mjs';
import {validateScientificFindings,renderScientificFindingsSection} from './lib/scientific-findings.mjs';
import * as auditPresentation from '../src/components/SecCalibrationPreview/auditPresentation.mjs';
import {findingReaderLabel,findingInterventionLinks} from '../src/lib/scientificFindingPresentation.mjs';

const read=p=>fs.readFileSync(p,'utf8');
const copy=x=>structuredClone(x);
const evidence=JSON.parse(read('review/sec-integration/assessments.json'));
function record() {
  const r=copy(evidence.find(r=>r.pmId==='BRS2-FM1-PM3'&&r.findingId==='PM3-F5'));
  r.factorStates={D:'established',B:'established',P:'established',R:'established'};
  return r;
}
const wrap=(...records)=>({schemaVersion:1,assessments:records.map(record=>({sha256:secAssessmentHash(record),record}))});
const finding=r=>({id:r.findingId,finding_statement:r.proposition,sec_assessment_ref:{id:r.id,version:r.recordVersion,sha256:secAssessmentHash(r)}});
const codes=registry=>validateSecRegistry(registry).map(e=>e.code);

test('complete provisional SEC requires defensible factors, not human approval',()=>{
  const r=record();assert.equal(r.assessmentStatus,'codex-provisional');assert.equal(r.humanReview,null);
  assert.deepEqual(validateSecRegistry(wrap(r)),[]);
  assert.equal(secAssessmentView(r).statusLabel,'Provisionally assessed');
  for(const k of ['D','B','P','R']) {
    const bad=copy(r);bad.factors[k]=null;bad.factorStates[k]='unresolved';
    assert.ok(codes(wrap(bad)).includes('sec_incomplete'));
  }
});

test('GABA conditional scores retain formal unknowns and cannot be silently promoted',()=>{
  for(const id of ['PM9-F1','PM9-F2']) {
    const r=copy(evidence.find(r=>r.findingId===id));
    r.factorStates={D:'established',B:'conditional',P:'conditional',R:'conditional'};
    assert.deepEqual(validateSecRegistry(wrap(r)),[]);
    assert.equal(secAssessmentView(r).score,id==='PM9-F1'?4:5);
    assert.equal(secAssessmentView(r).statusLabel,'Conditional estimate');
    r.assessmentStatus='codex-provisional';
    assert.ok(codes(wrap(r)).includes('sec_incomplete'));
  }
});

test('Not scored, assessed zero and D0 are distinct; existing ceilings compose',()=>{
  const r=record();r.assessmentStatus='not-scored';r.assessmentComplete=false;
  r.factors={D:2,B:null,P:null,R:null};r.factorStates={D:'established',B:'unresolved',P:'unresolved',R:'unresolved'};
  r.rawScore=null;r.adjustedScore=null;
  assert.deepEqual(validateSecRegistry(wrap(r)),[]);assert.equal(secAssessmentView(r).score,null);
  assert.equal(secAssessmentView(r).readout,'Not scored');
  for(const f of [{D:0,B:2,P:2,R:2},{D:0,B:0,P:0,R:0}]) {
    const scored=record(),totals=secTotals(f);scored.factors=f;scored.rawScore=totals.raw;scored.adjustedScore=totals.adjusted;
    assert.deepEqual(validateSecRegistry(wrap(scored)),[]);
    assert.equal(secAssessmentView(scored).score,null);
    assert.match(secAssessmentView(scored).readout,/insufficient evidence for this claim/i);
    if(totals.raw===0)assert.match(secAssessmentView(scored).readout,/0\/8.*Assessed zero/);
    scored.adjustedScore=0;assert.ok(codes(wrap(scored)).includes('sec_totals'));
  }
  for(const [f,adjusted] of [[{D:1,B:2,P:2,R:2},5],[{D:2,B:0,P:2,R:2},2],[{D:2,B:2,P:0,R:2},4],[{D:1,B:0,P:0,R:2},2]])assert.equal(secTotals(f).adjusted,adjusted);
});

test('scientific review requires qualified identified human acceptance of the exact version',()=>{
  const r=record();r.assessmentStatus='scientifically-reviewed';
  assert.ok(codes(wrap(r)).includes('sec_human_review'));
  r.humanReview={reviewerType:'human',reviewerIdentity:'Synthetic test reviewer',qualifications:'Synthetic qualified reviewer fixture',reviewDate:r.lastEvidenceAssessmentDate,outcome:'accepted',assessedRecordVersion:r.recordVersion,changes:'No changes (test fixture)'};
  assert.deepEqual(validateSecRegistry(wrap(r)),[]);
  r.humanReview.assessedRecordVersion++;assert.ok(codes(wrap(r)).includes('sec_human_review'));
});

test('references pin exact PM, Finding, proposition, version and content, never latest',()=>{
  const r=record(),next=copy(r);next.recordVersion++;next.proposition+=' Revised claim.';
  const registry=wrap(r,next),f=finding(r);
  assert.equal(resolveSecAssessment(registry,{pmId:r.pmId,finding:f}).record.recordVersion,r.recordVersion);
  for(const bad of [null,{}, {...f.sec_assessment_ref,version:999},{...f.sec_assessment_ref,sha256:'0'.repeat(64)},{...f.sec_assessment_ref,path:'../arbitrary.json'}])assert.equal(resolveSecAssessment(registry,{pmId:r.pmId,finding:{...f,sec_assessment_ref:bad}}).kind,'invalid');
  assert.equal(resolveSecAssessment(registry,{pmId:'BRS1-FM4-PM9',finding:f}).kind,'invalid');
  assert.equal(resolveSecAssessment(registry,{pmId:r.pmId,finding:{...f,id:'PM3-F2'}}).kind,'invalid');
  assert.equal(resolveSecAssessment(registry,{pmId:r.pmId,finding:{...f,finding_statement:f.finding_statement+' '}}).kind,'invalid');
  assert.equal(resolveSecAssessment(null,{pmId:r.pmId,finding:{id:'legacy'}}).kind,'legacy');
});

test('immutable append-only snapshots reject edits, deletion, backfill, duplicate identity and hash changes',()=>{
  const r=record(),previous=wrap(r),next=copy(r);next.recordVersion++;
  assert.deepEqual(validateSecRegistry(wrap(r,next),{previous}),[]);
  const edited=copy(r);edited.proposition+=' Changed';
  assert.ok(validateSecRegistry(wrap(edited),{previous}).some(e=>e.code==='sec_immutable'));
  assert.ok(validateSecRegistry(wrap(),{previous}).some(e=>e.code==='sec_immutable'));
  const back=copy(r);back.recordVersion--;
  if(back.recordVersion>0)assert.ok(validateSecRegistry(wrap(r,back),{previous}).some(e=>e.code==='sec_version'));
  assert.ok(codes(wrap(r,r)).includes('sec_duplicate'));
  const corrupt=wrap(r);corrupt.assessments[0].record.proposition+=' Tampered';assert.ok(codes(corrupt).includes('sec_hash'));
  assert.ok(codes(null).includes('sec_registry'));
});

test('factor, evidence-role, limitation, version, scope and provenance requirements fail closed',()=>{
  for(const mutate of [r=>r.factors.B=true,r=>r.factors.P=3,r=>delete r.rationale.R,r=>r.limitations=[],r=>r.sources.supporting=[null],r=>r.sources.targetedChecks=[{doi:'test'}],r=>r.recordVersion=0,r=>r.pmId='BRS5-FM1-PM1',r=>r.lastEvidenceAssessmentDate='2026-02-30',r=>r.history=[]]) {
    const r=record();mutate(r);assert.ok(validateSecRegistry(wrap(r)).length);
  }
});

test('legacy scientific finding validation and generated markup stay unchanged without a reference',()=>{
  const canonical=matter(read('system/sec-assessments/history/same-synthesis-before-v1.mdx')).data;
  const before=validateScientificFindings(canonical,[]);
  assert.deepEqual(before,[]);
  const output=renderScientificFindingsSection(canonical);
  assert.doesNotMatch(output,/pmId=|sec_assessment_ref/);
  const data=copy(canonical),f=data.scientific_findings[0],r=record();
  r.findingId=f.id;r.proposition=f.finding_statement;
  f.sec_assessment_ref=finding(r).sec_assessment_ref;
  assert.deepEqual(validateScientificFindings(data,[],{secRegistry:wrap(r)}),[]);
  assert.match(renderScientificFindingsSection(data),/pmId=\{"BRS2-FM1-PM3"\}/);
  f.finding_statement+=' Changed';assert.ok(validateScientificFindings(data,[],{secRegistry:wrap(r)}).some(e=>e.code==='sec_reference'));
});

const require=createRequire(import.meta.url),ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
function component(source,imports={}) {
  const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const mod={exports:{}};new Function('exports','require','module',js)(mod.exports,id=>Object.hasOwn(imports,id)?imports[id]:require(id),mod);return mod.exports;
}
const render=(C,p)=>renderToStaticMarkup(React.createElement(C,p));

test('legacy Finding evidence HTML is unchanged except the approved derived SF title prefix',()=>{
  const imports={'@docusaurus/plugin-content-docs/client':{useDoc:()=>({frontMatter:{}})},'../lib/scientificFindingPresentation.mjs':{findingReaderLabel,findingInterventionLinks},'../client/brsFmHubDropdown':{initBrsFmHubDropdowns(){}},'./SecAssessment':{SecAssessmentSummary(){throw Error('Unexpected legacy SEC call');}}};
  const old=component(execFileSync('git',['show','HEAD:src/components/ScientificFinding.tsx'],{encoding:'utf8'}),imports).default;
  const current=component(read('src/components/ScientificFinding.tsx'),imports).default;
  const data=matter(read('system/sec-assessments/history/same-synthesis-before-v1.mdx')).data;
  for(const f of data.scientific_findings) {
    const html=render(current,{finding:f});
    if(/^PM\d+-F\d+$/.test(f.id))assert.ok(html.includes(findingReaderLabel(f)));
    assert.equal(html.replace(/SF\d+ — /g,''),render(old,{finding:f}));
  }
});

test('reference renderer reuses indicator and audit, exposes pinned history and preserves review record',()=>{
  const r=record(),older=copy(r);older.recordVersion=Math.max(1,r.recordVersion-1);
  const later=copy(r);later.recordVersion++;
  const registry=wrap(...(older.recordVersion<r.recordVersion?[older]:[]),r,later),auditProps=[];
  const module=component(read('src/components/SecAssessment/index.tsx'),{
    '../../../system/sec-assessments/registry.json':registry,
    '../../lib/secAssessments.mjs':{resolveSecAssessment,secAssessmentView,secAuditAnchor},
    '../EvidenceConfidenceIndicator':({score})=>React.createElement('span',null,score+'/8'),
    '../SecCalibrationPreview/EvidenceAudit':props=>{auditProps.push(props);return React.createElement('div',null,'Existing audit');},
    '../PmCuratedProvenance':{pmCuratedSources:()=>[]},
  });
  const f={...finding(r),finding_label:'Canonical descriptive label'},html=render(module.SecAssessmentSummary,{finding:f,pmId:r.pmId});
  assert.match(html,/5\/8/);assert.match(html,/Provisionally assessed/);assert.ok(html.includes('?review=1#'+secAuditAnchor(r)));
  const page={review_status:'unreviewed',correction_status:'pending'};
  render(module.CanonicalSecAudit,{findings:[f],pmId:r.pmId,page,panelId:'audit'});
  assert.equal(auditProps[0].assessmentPage,page);
  assert.equal(auditProps[0].assessmentView(r).title,f.finding_label);
  assert.equal(auditProps[0].assessmentView(r).shortId,'SF5');
  assert.ok(auditProps[0].assessmentRecords.every(x=>x.recordVersion<=r.recordVersion));
  assert.deepEqual(page,{review_status:'unreviewed',correction_status:'pending'});
  assert.equal(auditProps[0].recordAnchor(r),secAuditAnchor(r));
});

test('publication gate is installed and approved production registry validates',()=>{
  assert.deepEqual(validateSecRegistry(JSON.parse(read('system/sec-assessments/registry.json'))),[]);
  const pkg=JSON.parse(read('package.json'));
  assert.ok(pkg.scripts.prebuild.startsWith('node scripts/check-sec-assessments.mjs &&'));
  assert.equal(pkg.scripts.predeploy,'node scripts/check-sec-assessments.mjs');
  assert.match(read('scripts/check-sec-assessments.mjs'),/SEC_BASE_REF/);
});

test('actual shared audit renders canonical factor states and closed version anchors without invented review',()=>{
  const r=copy(evidence.find(r=>r.findingId==='PM9-F1'));
  r.factorStates={D:'established',B:'conditional',P:'conditional',R:'conditional'};
  delete r.conditional.statuses;
  const Audit=component(read('src/components/SecCalibrationPreview/EvidenceAudit.tsx'),{
    '@docusaurus/router':{useLocation:()=>({pathname:'/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity'})},
    '../ReviewCorrections/PageReviewPanel':()=>null,
    '../../data/frameworkQcPublic':{findPublicPageRecord:()=>null,frameworkQcPublic:{register_path:'/register'}},
    '../EvidenceConfidenceIndicator':{default:({score})=>React.createElement('span',null,score+'/8'),SEC_DISPLAY_LEVELS:[],__esModule:true},
    '../../client/brsFmHubDropdown':{initBrsFmHubDropdowns(){}},
    './assessmentAudit.mjs':{},'./sameAudit.mjs':{},'./glycaemicStage2.mjs':{},
    '../../../review/sec-integration/assessments.json':[],
    './V1Preview':{V1DecisionAudit:()=>null},'./GlycaemicInterventionPreview':{GlycaemicStage2Audit:()=>null},
    './styles.module.css':{},
    './auditPresentation.mjs':auditPresentation,
  }).default;
  const html=render(Audit,{panelId:'audit',assessmentRecords:[r],assessmentPmId:r.pmId,assessmentPage:null,assessmentView:secAssessmentView,recordAnchor:secAuditAnchor});
  assert.match(html,/aria-expanded="false"/);assert.match(html,/hidden=""/);
  assert.ok(html.includes('id="'+secAuditAnchor(r)+'"'));
  assert.match(html,/4\/8/);assert.match(html,/Conditional estimate/);
  assert.match(html,/Directness.*1\/2/);assert.match(html,/Bias Protection.*1\/2/);
  assert.match(html,/Review status not recorded/);assert.match(html,/Status unavailable/);
});
