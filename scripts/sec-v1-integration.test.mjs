import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import {readPilotBaseline} from './lib/sec-pilot-baseline.mjs';
import {compile} from '@mdx-js/mdx';
import {buildDietaryLeverDisclosureMap,dietaryLeverBulletKey} from './lib/dietary-lever-disclosure.mjs';
import {assessmentPresentation} from '../src/components/SecCalibrationPreview/auditPresentation.mjs';
import {secAssessmentStatusErrors,isAuditPreview,audit,sf2Audit} from '../src/components/SecCalibrationPreview/assessmentAudit.mjs';

const read=p=>fs.readFileSync(p,'utf8');
const records=JSON.parse(read('review/sec-integration/assessments.json'));
const reconciliation=JSON.parse(read('review/sec-integration/reconciliation.json'));
const drafts=reconciliation.records.map(row=>({row,...matter(read('review/sec-integration/drafts/'+row.slug+'.mdx'))}));

test('three complete drafts preserve missions, dietary decisions, KC identities and all source sections',()=>{
  for(const draft of drafts) {
    const original=matter(read(draft.row.canonical));
    for(const key of ['pm_id','mission','dietary_input_traceability','dietary_lever_atoms','dietary_lever_presentations','pm_kc_relationships','kc_applicability_adjudications','kc_distinctness_review','key_constraints']) assert.deepEqual(draft.data[key],original.data[key],draft.row.slug+':'+key);
    const headings=[...draft.content.matchAll(/^## \d+\.[^\n]*/gm)].map(m=>m[0]);
    assert.deepEqual(headings,draft.row.originalSections);
    const fIds=draft.data.scientific_findings.map(f=>f.id);
    for(const finding of original.data.scientific_findings) assert.ok(fIds.includes(finding.id));
    assert.equal(new Set(fIds).size,fIds.length);
    for(const f of draft.data.scientific_findings) assert.equal(f.synthesised_evidence_confidence,'not-yet-scored');
    assert.ok(draft.content.includes('References'));
    assert.equal(draft.row.hubReview.length,6);
  }
});

test('all 22 Findings/constraints have unique exact-proposition versioned assessment links',()=>{
  assert.equal(records.length,22);assert.equal(new Set(records.map(r=>r.id)).size,22);
  for(const draft of drafts) for(const f of draft.data.scientific_findings) {
    const r=records.find(r=>r.pmId===draft.data.pm_id && r.findingId===f.id);
    assert.ok(r,f.id);assert.equal(r.proposition,f.finding_statement,f.id);assert.equal(f.finding_summary,r.proposition);
    assert.deepEqual(secAssessmentStatusErrors(r),[],r.findingId);
    assert.ok(r.history.length);assert.ok(r.lastEvidenceAssessmentDate);assert.ok(r.methodology);
  }
});

test('GABA conditional estimates and full history are preserved, not promoted; Field comparator corrected',()=>{
  for(const original of [audit,sf2Audit]) {
    const r=records.find(r=>r.findingId===original.findingId);
    assert.equal(r.assessmentStatus,'conditional');assert.deepEqual(r.conditional,original.conditional);
    assert.equal(r.rawScore,null);assert.deepEqual(r.previousAssessments.at(-1),original);
  }
  const field=records.find(r=>r.findingId==='PM9-F6');
  assert.match(field.proposition,/interaction was not significant \(p=0.140\)/);
  assert.match(field.proposition,/p=0.011/);assert.equal(field.rawScore,null);
  const draft=drafts.find(d=>d.row.slug==='gaba');
  const f6=draft.data.scientific_findings.find(f=>f.id==='PM9-F6');
  assert.match(f6.evidence_considered[0].assessment.result,/p=0.140/);
  const tang=draft.data.scientific_findings.find(f=>f.id==='PM9-F2').evidence_considered.find(e=>e.citation_key==='tang_crystal_2005');
  assert.match(tang.assessment.population,/sheep/);
  assert.match(draft.data.phenome_relationships.find(r=>r.target_phenome==='Apprehensive Worry / Perseverative Thought').rationale,/p=0.140/);
  assert.doesNotMatch(draft.content,/cofactor sufficiency principally governs reserve rather than basal synthesis/);
  assert.deepEqual(draft.data.system_optimisation_practices,[]);assert.deepEqual(draft.data.lifestyle_priorities,[]);
});

test('glycaemic eight Findings, explicit F1 reassessment, no fish quota, exact six-atom protocol evidence',()=>{
  const draft=drafts.find(d=>d.row.slug==='glycaemic-variability');
  const group=records.filter(r=>r.pmId===draft.data.pm_id);
  assert.equal(group.length,8);
  const f1=group.find(r=>r.findingId==='PM2-F1');
  assert.equal(f1.adjustedScore,4);assert.match(f1.proposition,/uncontrolled.*associated.*inconclusive/);
  assert.equal(f1.previousAssessments.at(-1).adjustedScore,2);
  assert.equal(group.find(r=>r.findingId==='PM2-F4').adjustedScore,6);
  assert.equal(draft.data.system_optimisation_practices.length,2);assert.equal(draft.data.lifestyle_priorities.length,2);
  const map=buildDietaryLeverDisclosureMap(draft.data);
  for(const [section,rows] of [['3.2',draft.data.system_optimisation_practices],['3.3',draft.data.lifestyle_priorities]]) for(const row of rows) {
    for(const key of ['input','input_type','biological_role','evidence_source','evidence_limitation','dietary_input']) assert.ok(Object.hasOwn(row,key));
    const r=group.find(r=>r.findingId===row.description_finding_id);
    assert.equal(row.biological_role,r.proposition);
    assert.equal(row.dietary_input,section==='3.2');
    const disclosure=map.get(dietaryLeverBulletKey(row.input,'',section));
    assert.ok(disclosure,row.atom_id);assert.equal(disclosure.dietaryInput,row.dietary_input);
    assert.ok(disclosure.evidenceReferences.length);assert.ok(disclosure.supportingFinding);
  }
  assert.ok(!draft.data.system_optimisation_practices.some(r=>r.description_finding_id==='PM2-F2'));
  assert.ok(group.some(r=>r.findingId==='PM2-F2'));assert.ok(draft.row.candidateDecisions.find(r=>r.id==='sequence').decision.startsWith('Retained'));
});

test('SAMe keeps unscored chemistry and all dietary/KC records; proposed stability is not dietary efficacy',()=>{
  const draft=drafts.find(d=>d.row.slug==='same-synthesis');
  assert.deepEqual(draft.data.system_optimisation_practices,[]);
  for(const id of ['PM3-F1','PM3-F4','PM3-F2','PM3-F3','PM3-IC1']) assert.equal(records.find(r=>r.findingId===id).adjustedScore,null);
  const f5=records.find(r=>r.findingId==='PM3-F5');
  assert.equal(f5.adjustedScore,5);assert.deepEqual(f5.factors,{D:2,B:1,P:1,R:1});
  assert.match(f5.proposition,/not an exclusive explanation.*human SAMe synthesis flux/);
  assert.ok(!draft.data.dietary_lever_presentations.some(r=>r.atom_id==='PM3-DIT-5'));
  assert.ok(draft.data.dietary_lever_atoms.some(r=>r.atom_id==='PM3-DIT-5'));
});

test('SEC calculations and caps apply to exact completed propositions; unknown is never zero',()=>{
  for(const r of records) {
    const presentation=assessmentPresentation(r);
    if(r.assessmentStatus==='not-scored') {assert.equal(presentation.score,null);assert.equal(r.rawScore,null);continue;}
    const f=r.conditional?.factors || r.factors;
    const raw=Object.values(f).reduce((a,b)=>a+b,0);
    assert.equal(r.conditional?.rawScore ?? r.rawScore,raw);
    let cap=8;if(f.D===1)cap=Math.min(cap,5);if(f.B===0)cap=Math.min(cap,2);if(f.P===0)cap=Math.min(cap,4);
    assert.ok(f.D>0);assert.equal(r.conditional?.adjustedScore ?? r.adjustedScore,Math.min(raw,cap));
    assert.equal(r.humanReview,null);
  }
});

test('all isolated drafts compile, resolve component imports and stay excluded from production',async()=>{
  const config=read('docusaurus.config.ts'),code=config.slice(config.indexOf('const includeInternalDocs'),config.indexOf('const wipSitemapIgnore'));
  assert.ok(vm.runInNewContext(code+'\ndocsExclude',{process:{env:{NODE_ENV:'production',SEC_CALIBRATION_PREVIEW:'true',INCLUDE_INTERNAL_DOCS:'true'}}}).includes('**/system/sec-calibration/**'));
  for(const d of drafts) {
    const preview=matter(read('docs/system/sec-calibration/v1/'+d.row.slug+'.mdx'));
    assert.equal(preview.data.pm_id,undefined);assert.equal(preview.data.scientific_findings,undefined);
    assert.equal(preview.content,d.content);
    assert.ok(isAuditPreview('/docs'+preview.data.slug));
    await compile(preview.content);
    const imports=new Set([...preview.content.matchAll(/^import \{([^}]+)\}/gm)].flatMap(m=>m[1].split(',').map(s=>s.trim())));
    imports.add('AccessibleMermaid');
    for(const m of preview.content.matchAll(/<([A-Z][A-Za-z0-9]*)[\s/>]/g)) assert.ok(imports.has(m[1]),d.row.slug+':'+m[1]);
  }
});

test('canonical science, earlier pilots, contracts, rubric, bibliography and dietary validators are untouched',()=>{
  const preserved=[...reconciliation.records.map(r=>r.canonical),...['gaba','glycaemic-variability','same-synthesis'].map(s=>'docs/system/sec-calibration/'+s+'.mdx'),
    'src/components/SecCalibrationPreview/glycaemicStage2.mjs','src/components/SecCalibrationPreview/glycaemicAudit.mjs','src/components/SecCalibrationPreview/sameAudit.mjs',
    'system/primary-mechanism-schema.md','system/scientific-finding-schema.md','system/dietary-input-traceability-contract.md','static/bibtex/BRAIN-diet.bib',
    'system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html','scripts/lib/dietary-lever-atoms.mjs',
    'src/theme/MDXComponents/index.js'];
  for(const p of preserved) assert.equal(readPilotBaseline(p),execFileSync('git',['show','HEAD:'+p],{encoding:'utf8',maxBuffer:10e6}),p);
});

test('actual V1 intervention and audit components reuse collapsed disclosures and canonical evidence links',()=>{
  const require=createRequire(import.meta.url),ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
  const js=ts.transpileModule(read('src/components/SecCalibrationPreview/V1Preview.tsx'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const mod={exports:{}};
  const localRequire=id=>id==='@docusaurus/router'?{useLocation:()=>({pathname:'/docs/system/sec-calibration/v1/glycaemic-variability'})}:id.endsWith('/assessments.json')?records:id.endsWith('/reconciliation.json')?reconciliation:id.endsWith('.module.css')?{}:id==='./auditPresentation.mjs'?{assessmentPresentation}:id.startsWith('.')?()=>null:require(id);
  new Function('exports','require','module',js)(mod.exports,localRequire,mod);
  const render=(C,p)=>renderToStaticMarkup(React.createElement(C,p));
  const data=drafts.find(d=>d.row.slug==='glycaemic-variability').data;
  const html=render(mod.exports.V1Interventions,{section:'3.2',data});
  assert.equal((html.match(/<li>/g)||[]).length,2);assert.doesNotMatch(html,/Fish fifteen/);
  const auditHtml=render(mod.exports.V1DecisionAudit);
  assert.match(auditHtml,/aria-expanded="false"/);assert.match(auditHtml,/hidden=""/);
  assert.match(auditHtml,/pm2-f5/);assert.match(auditHtml,/pm2-f6/);
  assert.match(auditHtml,/Acute fish\/rice/);
});
