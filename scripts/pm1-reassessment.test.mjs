import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import {compile} from '@mdx-js/mdx';
import {validateScientificFindings} from './lib/scientific-findings.mjs';
import {validateDietaryLeverAtoms} from './lib/dietary-lever-atoms.mjs';
import {buildDietaryLeverDisclosureMap,dietaryLeverBulletKey} from './lib/dietary-lever-disclosure.mjs';
import {validatePmReferenceIntegrity} from './lib/pm-reference-index.mjs';
import {secTotals,secRecordErrors} from '../src/lib/secAssessments.mjs';
import {secAssessmentStatusErrors} from '../src/components/SecCalibrationPreview/assessmentAudit.mjs';
import {assessmentPresentation} from '../src/components/SecCalibrationPreview/auditPresentation.mjs';
import * as auditPresentation from '../src/components/SecCalibrationPreview/auditPresentation.mjs';
import {sources,candidates} from '../review/pm1-reassessment/evidence.mjs';

const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const dir='review/pm1-reassessment', manifest=json(dir+'/baseline-manifest.json');
const original=matter(read(dir+'/baseline.mdx')),draft=matter(read(dir+'/proposed-pm1.mdx'));
const preview=matter(read('docs/system/sec-calibration/pm1-reassessment.mdx'));
const records=json(dir+'/assessments-v1.json');
const layout=createRequire(import.meta.url)('../src/plugin/pm-lever-layout/index.cjs');

test('archived PM1 baseline, reference PMs, registries and bibliography remain byte-identical to integration source',()=>{
  const source=path.resolve('../sec-three-pm-integration');
  assert.equal(createHash('sha256').update(read(dir+'/baseline.mdx')).digest('hex'),manifest.sha256);
  assert.equal(read(dir+'/baseline.mdx'),read(path.join(source,manifest.canonical)));
  for(const p of ['docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx','docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx','docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx',
    'src/components/ReviewCorrections/DocUtilityBar.tsx','registry/substances.json','static/bibtex/BRAIN-diet.bib'])assert.equal(read(p),read(path.join(source,p)),p);
});

test('all six-atom decisions, canonical identities, KC and phenome histories are preserved',()=>{
  for(const key of manifest.preserved)assert.deepEqual(draft.data[key],original.data[key],key);
  for(const a of draft.data.dietary_input_traceability)for(const key of ['input','input_type','biological_role','evidence_source','evidence_limitation','dietary_input'])assert.ok(Object.hasOwn(a,key),a.atom_id+':'+key);
  assert.equal(draft.data.dietary_input_traceability.find(a=>a.atom_id==='PM1-DIT-4').dietary_input,null);
  assert.equal(draft.data.dietary_lever_presentations.filter(p=>p.atom_id==='PM1-DIT-5').length,1);
  assert.ok(!draft.data.dietary_lever_presentations.some(p=>p.atom_id==='PM1-DIT-2'));
});

test('scientific Finding and existing dietary/SOP validators pass without changed rules',()=>{
  assert.deepEqual(validateScientificFindings(draft.data,[],{entityLabel:draft.data.pm_id}),[]);
  const issues=[];validateDietaryLeverAtoms(draft.data,issues,{entityLabel:draft.data.pm_id});assert.deepEqual(issues,[]);
  assert.deepEqual(draft.data.scientific_findings.slice(0,4).map(f=>f.id),original.data.scientific_findings.map(f=>f.id));
});

test('dominance is separately justified and retains dietary principal route and original label',()=>{
  assert.deepEqual(layout.validateDominanceAssessment(draft.data),[]);
  const plan=layout.dominancePlan(draft.data);
  assert.deepEqual(plan.promoted,['3.1']);
  assert.equal(draft.data.intervention_dominance,original.data.intervention_dominance);
  assert.match(preview.content,/1\.1\.1 Direct and\/or Derived/);
  assert.equal((preview.content.match(/<strong>1\.1 Dietary Requirements<\/strong>/g)||[]).length,1);
});

test('three is not a quota; exact SOP is six-atom, dietary, evidence-linked and not registered',()=>{
  assert.equal(draft.data.system_optimisation_practices.length,1);assert.deepEqual(draft.data.lifestyle_priorities,[]);
  const sop=draft.data.system_optimisation_practices[0];
  assert.equal(sop.dietary_input,true);assert.equal(sop.optimisation_category,'food_prep');assert.equal(sop.description_finding_id,'PM1-F5');
  assert.ok(!sop.food_strategy_id);assert.match(sop.dietary_input_note,/preview-local/);
  assert.ok(draft.data.scientific_findings.some(f=>f.id===sop.description_finding_id));
  for(const key of ['input','input_type','biological_role','evidence_source','evidence_limitation','dietary_input'])assert.ok(Object.hasOwn(sop,key));
});

test('SEC arithmetic, status maturity and publication allowlist stay separate',()=>{
  assert.deepEqual(records.filter(r=>r.assessmentStatus==='codex-provisional').map(r=>[r.findingId,r.rawScore,r.adjustedScore]),[['PM1-F1',5,5],['PM1-F5',4,4],['PM1-F6',4,4]]);
  for(const r of records) {
    assert.deepEqual(secAssessmentStatusErrors(r),[],r.findingId);
    assert.equal(r.humanReview,null);assert.equal(r.recordVersion,1);
    assert.equal(r.proposition,draft.data.scientific_findings.find(f=>f.id===r.findingId).finding_statement);
    if(r.assessmentStatus==='codex-provisional')assert.deepEqual([secTotals(r.factors).raw,secTotals(r.factors).adjusted],[r.rawScore,r.adjustedScore]);
    else {assert.equal(r.rawScore,null);assert.equal(assessmentPresentation(r).score,null);}
    assert.deepEqual(secRecordErrors(r),[],'Local canonical integration now explicitly includes PM1');
  }
  assert.deepEqual(secTotals({D:1,B:2,P:2,R:2}),{raw:7,adjusted:5,ceiling:5,ordinal:true});
  assert.equal(secTotals({D:0,B:0,P:0,R:0}).adjusted,null);
});

test('source/retrieval roles and evidence independence are explicit; nulls are not hidden',()=>{
  for(const s of sources)for(const field of ['id','title','role','access','design','protocol','result','uncertainty','independence','url'])assert.ok(s[field],s.id+':'+field);
  assert.match(records.find(r=>r.findingId==='PM1-F5').proposition,/did not differ detectably/);
  assert.match(records.find(r=>r.findingId==='PM1-F6').proposition,/not significantly different/);
  assert.match(records.find(r=>r.findingId==='PM1-F1').rationale.R,/Constituent pooled trials are not counted again/);
  assert.ok(sources.some(s=>s.id==='processing2026'&&s.role.includes('null')));
});

test('every SOP hub category and lifestyle group has a disposition without an invented lever',()=>{
  for(const category of ['Food Preparation & Delivery','Conditional Supplementation','Dietary & Fasting Protocols','Light & Circadian Optimisation','Stress & Autonomic Regulation','Lifestyle Levers'])assert.ok(candidates.some(c=>c.category===category));
  for(const c of candidates)for(const id of c.evidence)assert.ok(sources.some(s=>s.id===id));
});

test('canonical disclosures resolve while original food-mapping files remain unchanged',()=>{
  const map=buildDietaryLeverDisclosureMap(draft.data);
  for(const p of draft.data.dietary_lever_presentations)assert.equal(map.get(dietaryLeverBulletKey(p.label,p.foods,p.presentation_section))?.atomId,p.atom_id);
  const source=path.resolve('../sec-three-pm-integration');
  for(const name of fs.readdirSync('src/data').filter(n=>/Mapping.*generated|inputSubstanceFood/i.test(n))) {
    const file='src/data/'+name;if(fs.statSync(file).isFile()&&fs.existsSync(path.join(source,file)))assert.equal(read(file),read(path.join(source,file)),file);
  }
});

test('references and audit links resolve locally; original paper numbering is preserved',()=>{
  assert.deepEqual(draft.data.references.slice(0,original.data.references.length),original.data.references);
  assert.deepEqual(validatePmReferenceIntegrity(draft.data.references,draft.content),[]);
  const anchors=new Set([...preview.content.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  for(const s of sources.filter(s=>s.id!=='gorissen2020'))assert.ok(anchors.has('stage2-ref-pm1-'+s.id));
  assert.ok(anchors.has('pm-curated-pah'));assert.ok(anchors.has('pm-curated-rhea'));
  const component=read('src/components/SecCalibrationPreview/PM1Preview.tsx');
  assert.match(component,/EvidenceAudit panelId/);assert.match(component,/queryString="review"/);assert.match(component,/\?review=1#/);assert.match(component,/aria-expanded="false"/);
});

test('complete draft and isolated preview compile as MDX without full production build',async()=>{
  await compile(draft.content,{development:true});await compile(preview.content,{development:true});
  for(const heading of ['## 1.','## 2.','## 3.','## 4.','## 5.','## 7.','## 8.','## Scientific Lesson'])assert.ok(draft.content.includes(heading),heading);
  assert.equal((preview.content.match(/<PM1Finding finding=/g)||[]).length,6);
});

test('preview is excluded from normal production loading and canonical scientific inventory',()=>{
  assert.equal(preview.data.pm_id,undefined);assert.equal(preview.data.scientific_findings,undefined);
  assert.match(read('docusaurus.config.ts'),/SEC_CALIBRATION_PREVIEW.*system\/sec-calibration/);
  const canonical=matter(read(manifest.canonical));
  assert.ok(canonical.data.scientific_findings.every(f=>f.sec_assessment_ref?.version===2));
  const registered=read('system/generated/food-strategy-rollup/rollup.generated.json');assert.ok(!registered.includes('PM1-SOP-REVIEW-1'));
});

test('actual PM1 Finding and existing audit render matching scores, exact propositions and collapsed disclosures',()=>{
  const require=createRequire(import.meta.url),ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
  const component=(file,imports)=>{
    const result=ts.transpileModule(read(file),{reportDiagnostics:true,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}});
    assert.ok(!(result.diagnostics||[]).some(d=>d.category===ts.DiagnosticCategory.Error));
    const mod={exports:{}};new Function('exports','require','module',result.outputText)(mod.exports,id=>Object.hasOwn(imports,id)?imports[id]:require(id),mod);return mod.exports;
  };
  const indicator={__esModule:true,default:({score})=>React.createElement('span',null,score+'/8'),SEC_DISPLAY_LEVELS:[]};
  const Audit=component('src/components/SecCalibrationPreview/EvidenceAudit.tsx',{
    '@docusaurus/router':{useLocation:()=>({pathname:'/docs/system/sec-calibration/pm1-reassessment'})},
    '../ReviewCorrections/PageReviewPanel':()=>null,'../../data/frameworkQcPublic':{findPublicPageRecord:()=>null,frameworkQcPublic:{register_path:'/register'}},
    '../EvidenceConfidenceIndicator':indicator,'../../client/brsFmHubDropdown':{initBrsFmHubDropdowns(){}},
    './assessmentAudit.mjs':{},'./sameAudit.mjs':{},'./glycaemicStage2.mjs':{},'../../../review/sec-integration/assessments.json':[],
    './V1Preview':{V1DecisionAudit:()=>null},'./GlycaemicInterventionPreview':{GlycaemicStage2Audit:()=>null},'./styles.module.css':{},'./auditPresentation.mjs':auditPresentation,
  }).default;
  const PM=component('src/components/SecCalibrationPreview/PM1Preview.tsx',{
    '@theme/Tabs':({children})=>React.createElement('div',null,children),'@theme/TabItem':({children})=>React.createElement('div',null,children),
    '@docusaurus/router':{useLocation:()=>({search:'',hash:''})},'../ScientificFinding':({finding})=>React.createElement('div',{id:finding.id.toLowerCase()},finding.finding_statement),
    '../EvidenceConfidenceIndicator':indicator,'../PmDietaryLeverEnhancer':()=>null,'./EvidenceAudit':Audit,'./auditPresentation.mjs':auditPresentation,
    '../../client/brsFmHubDropdown':{initBrsFmHubDropdowns(){}},'../../../review/pm1-reassessment/draft-data.json':draft.data,
    '../../../review/pm1-reassessment/assessments-v1.json':records,'../../../review/pm1-reassessment/evidence.mjs':{sources,candidates},'./styles.module.css':{},
  });
  const render=(C,p)=>renderToStaticMarkup(React.createElement(C,p));
  for(const r of records){
    const html=render(PM.PM1Finding,{finding:draft.data.scientific_findings.find(f=>f.id===r.findingId)});
    assert.ok(html.includes('?review=1#'+r.id));
    if(r.adjustedScore!==null)assert.ok(html.includes(r.adjustedScore+'/8'));else assert.ok(!html.includes('0/8'));
  }
  const html=render(Audit,{panelId:'pm1-evidence-audit',assessmentRecords:records,assessmentPmId:'BRS1-FM1-PM1',assessmentPage:null});
  for(const r of records){assert.ok(html.includes('id="'+r.id+'"'));assert.ok(html.includes(r.proposition.replaceAll('&','&amp;').replaceAll("'",'&#x27;')));}
  assert.match(html,/aria-expanded="false"/);assert.match(html,/hidden=""/);assert.match(html,/How evidence confidence is assessed/);
  assert.match(html,/Review status not recorded/);assert.match(html,/Status unavailable/);assert.match(html,/Provisionally assessed/);
});
