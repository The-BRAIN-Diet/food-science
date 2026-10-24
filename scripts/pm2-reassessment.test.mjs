import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as runtime from 'react/jsx-runtime';
import {evaluate} from '@mdx-js/mdx';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {validateScientificFindings} from './lib/scientific-findings.mjs';
import {validateDietaryLeverAtoms} from './lib/dietary-lever-atoms.mjs';
import {validatePmReferenceIntegrity} from './lib/pm-reference-index.mjs';
import {resolveSecAssessment,validateSecRegistry,secAssessmentView,secTotals,SEC_INTEGRATION_PM_IDS} from './lib/sec-assessments.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const dir='review/pm2-reassessment',manifest=JSON.parse(read(dir+'/manifest.json'));
const before=matter(read(dir+'/baseline.mdx')),pm=matter(read(manifest.canonical));
const registry=JSON.parse(read('system/sec-assessments/registry.json')),previous=JSON.parse(read(dir+'/baseline-registry.json'));
const require=createRequire(import.meta.url),layout=require('../src/plugin/pm-lever-layout/index.cjs');

test('PM2 uses canonical schema and generated Findings without a simulation renderer',()=>{
 assert.equal(pm.data.pm_id,'BRS1-FM1-PM2');
 assert.deepEqual(validateScientificFindings(pm.data,[],{entityLabel:pm.data.pm_id}),[]);
 assert.ok(pm.content.includes(expectedFindingsSection(pm.data,pm.content).block));
 assert.doesNotMatch(pm.content,/SecCalibrationPreview|<PM2Preview/);
 assert.deepEqual(pm.data.scientific_findings.map(f=>f.id),before.data.scientific_findings.map(f=>f.id));
});
test('six-atom admissions, upstream supply, KCs and existing reference identities remain intact',()=>{
 for(const field of manifest.preserved)assert.deepEqual(pm.data[field],before.data[field],field);
 assert.deepEqual(pm.data.references.slice(0,before.data.references.length),before.data.references);
 const issues=[];validateDietaryLeverAtoms(pm.data,issues,{entityLabel:pm.data.pm_id});assert.deepEqual(issues,[]);
 assert.deepEqual(validatePmReferenceIntegrity(pm.data.references,pm.content),[]);
 assert.deepEqual(pm.data.system_optimisation_practices,[]);assert.deepEqual(pm.data.lifestyle_priorities,[]);
});
test('only explicitly authorised PM2 is added to SEC scope and immutable history is additive',()=>{
 assert.equal(SEC_INTEGRATION_PM_IDS.length,5);
 assert.ok(SEC_INTEGRATION_PM_IDS.includes('BRS1-FM1-PM2'));
 assert.deepEqual(validateSecRegistry(registry,{previous}),[]);
 assert.equal(registry.assessments.length,previous.assessments.length+8);
 for(const entry of previous.assessments)assert.deepEqual(registry.assessments.find(e=>e.sha256===entry.sha256),entry);
});
test('exact propositions resolve and plasma confidence does not become a brain or clinical score',()=>{
 for(const f of pm.data.scientific_findings){const resolved=resolveSecAssessment(registry,{pmId:pm.data.pm_id,finding:f});assert.deepEqual(resolved.errors,[]);assert.equal(resolved.kind,'resolved');assert.equal(resolved.record.proposition,f.finding_statement);}
 const f2=pm.data.scientific_findings.find(f=>f.id==='PM2-F2');
 const r=resolveSecAssessment(registry,{pmId:pm.data.pm_id,finding:f2}).record;
 assert.deepEqual(r.factors,{D:2,B:1,P:1,R:1});assert.equal(secTotals(r.factors).adjusted,5);
 assert.equal(secAssessmentView(r).statusLabel,'Provisionally assessed');
 assert.equal(r.humanReview,undefined);assert.match(r.proposition,/without establishing increased human brain transport/);
 for(const id of ['PM2-F1','PM2-F3','PM2-IC1']){const f=pm.data.scientific_findings.find(f=>f.id===id);assert.equal(resolveSecAssessment(registry,{pmId:pm.data.pm_id,finding:f}).record.adjustedScore,null);}
});
test('source-specific correction and contradictory evidence are retained',()=>{
 const f2=pm.data.scientific_findings.find(f=>f.id==='PM2-F2');
 assert.match(f2.evidence_considered.find(e=>e.citation_key==='wurtman_effects_2003').directional_finding,/Both.*fell from baseline/);
 assert.ok(f2.evidence_considered.some(e=>e.citation_key==='pm2-source-evening1982'));
 assert.ok(f2.evidence_considered.some(e=>e.citation_key==='pm2-source-protein2013'));
 assert.doesNotMatch(pm.content,/protein-rich meals raised the tyrosine ratio|protein-forward meals favour tyrosine|Protein-forward meals can raise/);
});
test('dietary regulatory dominance does not create a new SOP or capacity admission',()=>{
 const plan=layout.dominancePlan(pm.data);assert.deepEqual(plan.promoted,['3.1']);
 assert.equal(plan.headings['3.1'],'1.1');
 assert.equal(pm.data.intervention_dominance_assessment.principal_route_selection.disposition,'established');
 assert.equal(pm.data.dietary_lever_atoms.find(a=>a.atom_id==='PM2-DIT-3').relationship_mode,'state-regulation');
});
test('actual compiled PM2 derives matching SF headings, live counts and reciprocal links',async()=>{
 const body=pm.content.replace(/^import ScientificFinding[^\n]*\n/m,'');
 const evaluated=await evaluate({value:body,data:{frontMatter:pm.data}},{...runtime,remarkPlugins:[layout]});
 const html=renderToStaticMarkup(React.createElement(evaluated.default,{components:{ScientificFinding:({finding})=>React.createElement('div',{id:finding.id.toLowerCase()},finding.finding_label)}}));
 assert.match(html,/4\. Mechanistic Basis \+ Scientific Findings \(SFs 2\)/);
 assert.match(html,/4\.1 Scientific Findings \(2\)/);
 for(const n of [1,2]){assert.ok(html.includes(`id="pm2-mechanism-f${n}"`));assert.match(html,new RegExp(`<h4[^>]*>SF${n} — `));assert.ok(html.includes(`href="#pm2-f${n}">SF${n}`));assert.ok(html.includes(`href="#pm2-mechanism-f${n}"`));}
 assert.ok(html.includes('id="4-mechanistic-basis"'));assert.ok(html.includes('id="41-scientific-findings"'));
});
test('reference PMs, current governance and generated food mappings are byte-identical',()=>{
 for(const [file,hash] of Object.entries(manifest.protectedFiles))assert.equal(createHash('sha256').update(read(file)).digest('hex'),hash,file);
 assert.equal(createHash('sha256').update(read(dir+'/baseline.mdx')).digest('hex'),manifest.baselineSha256);
});
