import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import {readPilotBaseline} from './lib/sec-pilot-baseline.mjs';
import {stage2Assessment, stage2Studies, stage2Candidates, proposedSops, proposedLifestyle, stage2Audits, stage2Findings, expandedGlycaemicAudits, stage2DisplayData, hubScreen} from '../src/components/SecCalibrationPreview/glycaemicStage2.mjs';
import {glycaemicAudits} from '../src/components/SecCalibrationPreview/glycaemicAudit.mjs';
import {secAssessmentStatusErrors} from '../src/components/SecCalibrationPreview/assessmentAudit.mjs';
import {assessmentPresentation} from '../src/components/SecCalibrationPreview/auditPresentation.mjs';
import * as stage2Data from '../src/components/SecCalibrationPreview/glycaemicStage2.mjs';
const read = readPilotBaseline;
const root = 'src/components/SecCalibrationPreview/';
const canonicalPath = 'docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx';
const original = matter(read(canonicalPath)).data;

test('presentation ceilings are not quotas; exposure-only protocols are retained but not admitted', () => {
  assert.ok(proposedSops.length <= 3 && proposedLifestyle.length <= 3);
  assert.equal(proposedLifestyle.length,2);
  assert.match(stage2Assessment.scope,/ceiling, not a quota/);
  for (const id of ['whey','postmeal','acid','sitting']) {
    const row = stage2Candidates.find(r=>r.id===id);
    assert.equal(row.decision,'Not admitted to PM2 preview');
    assert.match(row.owner,/PM1\/PM3/);
  }
  assert.match(stage2Candidates.find(r=>r.id==='mct').reason,/CV.*primary exposure null/);
  assert.match(stage2Candidates.find(r=>r.id==='starch').reason,/daily SD null/);
  assert.equal(stage2Candidates.find(r=>r.id==='sitting').finding,'PM2-F4');
});

test('each proposed intervention has exactly the existing six evidence dimensions and Finding links', () => {
  const data = stage2DisplayData(original);
  for (const row of [...proposedSops,...proposedLifestyle]) {
    for (const key of ['input','input_type','biological_role','evidence_source','evidence_limitation','dietary_input']) assert.ok(key in row);
    assert.equal(typeof row.dietary_input,'boolean');
    assert.ok(row.evidence_source.finding_ids.includes(row.description_finding_id));
    assert.ok(data.scientific_findings.some(f=>f.id===row.description_finding_id));
    assert.ok(row.evidence_source.citation_keys.every(key=>data.references.some(ref=>ref.includes(`#${key})`))));
  }
  assert.ok(proposedSops.every(row=>row.dietary_input===true));
  assert.ok(proposedLifestyle.every(row=>row.dietary_input===false));
  for (const key of ['dietary_input_traceability','dietary_lever_atoms','dietary_lever_presentations']) assert.deepEqual(data[key],original[key]);
  assert.deepEqual(original.system_optimisation_practices.map(r=>r.atom_id),['PM2-SOP-1']);
});

test('actual existing disclosure helper resolves six atoms and PM-local references for every proposed lever', () => {
  const require = createRequire(import.meta.url);
  const ts = require('typescript');
  const source = read('src/lib/dietaryLeverDisclosure.ts');
  const js = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;
  const mod = {exports:{}};
  const helperRequire = createRequire(new URL('../src/lib/dietaryLeverDisclosure.ts',import.meta.url));
  new Function('exports','require','module',js)(mod.exports,helperRequire,mod);
  const {buildDietaryLeverDisclosureMap,dietaryLeverBulletKey} = mod.exports;
  const map = buildDietaryLeverDisclosureMap(stage2DisplayData(original));
  for (const [section,rows] of [['3.2',proposedSops],['3.3',proposedLifestyle]]) for (const row of rows) {
    const disclosure = map.get(dietaryLeverBulletKey(row.input,'',section));
    assert.ok(disclosure,row.input);
    assert.equal(disclosure.dietaryInput,row.dietary_input);
    assert.equal(disclosure.biologicalRole,row.biological_role);
    assert.equal(disclosure.evidenceLimitation,row.evidence_limitation);
    assert.ok(disclosure.evidenceReferences.length);
    assert.ok(disclosure.evidenceReferences.every(ref=>/^#pm-ref-\d+$/.test(mod.exports.pmReferenceHref(ref.number))));
    assert.equal(disclosure.supportingFinding.href,`#${row.description_finding_id.toLowerCase()}`);
  }
});

test('new Findings need distinct intervention propositions; all four factors and caps are auditable', () => {
  assert.deepEqual(stage2Audits.map(a=>a.adjustedScore),[5,5,4,4]);
  for (const record of stage2Audits) {
    assert.deepEqual(secAssessmentStatusErrors(record),[]);
    assert.equal(record.rawScore,Object.values(record.factors).reduce((a,b)=>a+b,0));
    assert.equal(record.rawScore,record.adjustedScore);
    assert.equal(assessmentPresentation(record).statusLabel,'Provisionally assessed');
    assert.equal(record.humanReview,null);
    assert.equal(stage2Findings.find(f=>f.id===record.findingId).finding_statement,record.proposition);
    assert.equal(stage2Findings.find(f=>f.id===record.findingId).finding_summary,record.proposition);
  }
  assert.match(stage2Audits[1].rationale.R,/partial corroboration.*six usable CGM/);
  assert.match(stage2Audits[3].proposition,/primary.*not significant/);
  assert.match(stage2Audits[3].rationale.B,/unadjusted multiple secondary/);
  assert.equal(new Set(expandedGlycaemicAudits.map(a=>a.id)).size,8);
});

test('original scores/history are preserved and recovered evidence is versioned, not silently overwritten', () => {
  assert.deepEqual(expandedGlycaemicAudits.slice(0,4).map(a=>a.adjustedScore),[2,4,4,6]);
  for (const old of glycaemicAudits) {
    const current = expandedGlycaemicAudits.find(a=>a.findingId===old.findingId);
    assert.deepEqual(current.factors,old.factors);
    assert.equal(current.proposition,old.proposition);
    assert.deepEqual(current.history.slice(0,old.history.length),old.history);
    if (current.recordVersion===2) assert.deepEqual(current.previousAssessments,[old]);
  }
  const sf1 = expandedGlycaemicAudits[0];
  assert.equal(sf1.sources.retrievalLimited.length,0);
  assert.match(sf1.previousAssessments[0].sources.retrievalLimited[0].limitation,/Scite did not supply/);
});

test('nulls, access limitations, recovery questions and all hub categories remain visible', () => {
  for (const id of ['reynolds','smith','bruno','babir','collins','bailey','liatis']) assert.match(stage2Studies.find(s=>s.id===id).result,/null|not significant|no significant|similar|inconclusive/i);
  const gap = stage2Studies.find(s=>s.id==='touhamy');
  assert.match(gap.role,/Unresolved/); assert.match(gap.result,/No unverified/);
  assert.match(gap.limitation,/ChatGPT-assisted Scite.*allocation|allocation.*ChatGPT-assisted Scite/);
  assert.equal(hubScreen.length,6);
  assert.match(stage2Assessment.recovery,/Independent replication was not established in this assessment\./);
});

test('standard collapsed audit disclosures, sources, reverse links and direct Finding links are reused', () => {
  const component = read(`${root}GlycaemicInterventionPreview.tsx`);
  assert.match(component,/brs-fm-hub-summary" aria-expanded="false"/);
  assert.match(component,/brs-fm-hub-panel" hidden/);
  assert.match(component,/id="glycaemic-stage2-adjudication"/);
  assert.match(component,/id=\{`stage2-ref-\$\{source.id\}`\}/);
  assert.match(component,/id=\{`pm-ref-\$\{index\+7\}`\}/);
  assert.match(read(`${root}EvidenceAudit.tsx`),/records === glycaemicAudits && <GlycaemicStage2Audit/);
  assert.match(read(`${root}GlycaemicPreview.tsx`),/stage2Findings.map/);
  assert.equal(new Set(stage2Studies.map(s=>s.doi)).size,stage2Studies.length);
});

test('actual isolated React components render selected protocols, closed audit and unique source anchors', () => {
  const require = createRequire(import.meta.url);
  const ts = require('typescript');
  const React = require('react');
  const {renderToStaticMarkup} = require('react-dom/server');
  const js = ts.transpileModule(read(`${root}GlycaemicInterventionPreview.tsx`),{compilerOptions:{
    module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,
  }}).outputText;
  const mod = {exports:{}};
  const localRequire = id => id==='./glycaemicStage2.mjs' ? stage2Data : require(id);
  new Function('exports','require','module',js)(mod.exports,localRequire,mod);
  const render = (component,props) => renderToStaticMarkup(React.createElement(component,props));
  const sops = render(mod.exports.GlycaemicInterventions,{section:'3.2'});
  const life = render(mod.exports.GlycaemicInterventions,{section:'3.3'});
  assert.equal((sops.match(/<li>/g)||[]).length,3);
  assert.equal((life.match(/<li>/g)||[]).length,2);
  assert.doesNotMatch(sops+life,/Ten-minute post-meal walking|Seven-day whey/);
  const audit = render(mod.exports.GlycaemicStage2Audit);
  assert.match(audit,/aria-expanded="false"/); assert.match(audit,/hidden=""/);
  assert.match(audit,/Candidate adjudications/);
  assert.match(audit,/href="\?review=0#stage2-ref-aberg"/);
  assert.match(audit,/No unverified numerical result used/);
  const references = render(mod.exports.GlycaemicStage2References);
  for (const [i,source] of stage2Studies.entries()) {
    assert.ok(references.includes(`id="stage2-ref-${source.id}"`));
    assert.ok(references.includes(`id="pm-ref-${i+7}"`));
    assert.ok(references.includes(`href="https://doi.org/${source.doi}"`));
  }
});

test('archived pilot PMs, GABA, audit, methodology and governing contracts remain byte-identical', () => {
  for (const path of [canonicalPath,`${root}glycaemicAudit.mjs`,'docs/system/sec-calibration/gaba.mdx',
    'system/primary-mechanism-schema.md','system/scientific-finding-schema.md','system/dietary-input-traceability-contract.md',
    'system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html']) {
    assert.equal(read(path),execFileSync('git',['show',`HEAD:${path}`],{encoding:'utf8',maxBuffer:10e6}));
  }
});
