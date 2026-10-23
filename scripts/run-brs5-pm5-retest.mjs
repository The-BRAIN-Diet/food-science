/** Bounded PM5 retest: reads canonical records; writes review artifacts only. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as runtime from 'react/jsx-runtime';
import {evaluate} from '@mdx-js/mdx';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {validateInputGovernance} from './lib/dietary-input-governance.mjs';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {renderTarget,renderCoverageWarning,escapeHtml} from '../src/lib/foodTargetTraceability.mjs';
import {findingReaderLabel,findingInterventionLinks} from '../src/lib/scientificFindingPresentation.mjs';
export const PM5_FILE='docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx';
export const REVIEW_DIR='review/brs5-pm5-retest-2026-10-23';
export function inspectPm5() {
 const pm=matter(fs.readFileSync(PM5_FILE,'utf8'));
 const data=buildInputSubstanceFood(process.cwd(),{brs:'BRS5'});
 const relationships=data.relationships.filter(r=>r.pm===pm.data.pm_id&&r.presentations.some(p=>p.section==='3.1.1'));
 return {pm,data,relationships,rows:data.manuscript_rows.filter(r=>r.pm===pm.data.pm_id),queue:data.cursor_queue.filter(q=>q.affected_pms.includes(pm.data.pm_id))};
}
export async function compilePm5(pm) {
 const require=createRequire(import.meta.url),ts=require('typescript'),mod={exports:{}};
 const imports={'@docusaurus/plugin-content-docs/client':{useDoc:()=>({frontMatter:pm.data})},'../client/brsFmHubDropdown':{initBrsFmHubDropdowns(){}},'./SecAssessment':{SecAssessmentSummary:()=>null},'../lib/scientificFindingPresentation.mjs':{findingReaderLabel,findingInterventionLinks}};
 const code=ts.transpileModule(fs.readFileSync('src/components/ScientificFinding.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
 new Function('exports','require','module',code)(mod.exports,id=>imports[id]||require(id),mod);
 const evaluated=await evaluate({value:pm.content.replace(/^import ScientificFinding[^\n]*\n/m,''),data:{frontMatter:pm.data}},{...runtime,remarkPlugins:[require('../src/plugin/pm-lever-layout/index.cjs')]});
 return renderToStaticMarkup(React.createElement(evaluated.default,{components:{ScientificFinding:mod.exports.default}}));
}
export async function runRetest() {
 const s=inspectPm5(),{pm,data,relationships,rows,queue}=s;
 const rs=relationships.find(r=>r.input==='Resistant starch'),p=relationships.find(r=>r.input==='Pectin'),fos=relationships.find(r=>r.id.endsWith('PM5-DIT-2'));
 const sources=pm.data.scientific_findings[0].evidence_considered,van=sources.find(x=>x.citation_key==='van_trijp_intraintestinal_2024'),review=sources.find(x=>x.citation_key==='pascale_potential_2022'),bang=sources.find(x=>x.citation_key==='bang_pectin_2018');
 const old=matter(execFileSync('git',['show','96b08913b917fffb8c96862ac4aab50a46a8d4fe:'+PM5_FILE],{encoding:'utf8'})).data;
 const issues=[];validateInputGovernance(pm.data,issues,{entityLabel:pm.data.pm_id,content:pm.content});
 const compiled=await compilePm5(pm);
 const checks=[
 ['canonical-class-capacity',rs?.substance_id==='resistant-starch'&&rs.scientific_admission==='admitted'&&rs.scientific_assessment.type==='A'&&rs.scientific_assessment.classification==='direct'],
 ['verified-class-foods', ['bananas','black-beans','chickpeas','potatoes'].every(id=>rs.food_targets.some(f=>f.food_id===id&&f.mapping_status==='verified'&&f.preparation))],
 ['no-transferred-intervention-effect',/does not establish an equivalent butyrate response/.test(rs.limitation)&&!/increased faecal butyrate/.test(rs.biological_role)&&rows.filter(r=>r.canonical_substance_id==='resistant-starch').every(r=>r.limitations.some(l=>/does not establish an equivalent butyrate response/.test(l)))],
 ['no-stale-rs-queue',!queue.some(q=>q.target_entity==='resistant-starch'&&q.relationship_type==='contains')],
 ['fos-gos-held-for-review',fos.scientific_admission==='unresolved'&&fos.scientific_assessment.review_required&&fos.coverage_warnings.some(w=>/Scientific admission requires review/.test(w))&&!rows.some(r=>r.dietary_input===fos.input)],
 ['anatomical-and-tracer-boundaries',/distal.ileal/.test(van.study_finding)&&/proximal.colonic/.test(van.study_finding)&&/Separately infused/.test(van.study_finding)&&/indirect/.test(van.assessment.limitations)&&/does not disprove colonic/.test(van.assessment.limitations)],
 ['secondary-versus-primary',/Secondary systematic-review/.test(review.study_exposure)&&/not an independent primary/.test(review.assessment.limitations)&&/Primary anaerobic/.test(bang.study_exposure)&&/rumen fluid/.test(bang.assessment.population)],
 ['duplicated-source-fields-consistent',sources.every(x=>x.directional_finding===x.study_finding&&x.study_finding===x.assessment.result&&x.assessment.result===x.assessment.evidence_summary&&x.study_exposure===x.assessment.study)],
 ['generated-findings-current',pm.content.includes(expectedFindingsSection(pm.data,pm.content).block)],
 ['apple-provisional-queued',p.food_targets.some(f=>f.food_id==='apples'&&f.mapping_status==='research-supported-provisional')&&queue.some(q=>q.source_entity==='apples'&&q.target_entity==='pectin')],
 ['no-unrelated-apple-projection',!data.relationships.filter(r=>r.pm!==pm.data.pm_id&&r.substance_id==='pectin').some(r=>(r.food_targets||[]).some(f=>f.food_id==='apples'&&f.material?.includes('thirteen apple cultivars')))],
 ['inulin-unadmitted',!relationships.some(r=>r.substance_id==='inulin')&&!rows.some(r=>r.canonical_substance_id==='inulin')],
 ['mission-and-f2-preserved',pm.data.mission===old.mission&&JSON.stringify(pm.data.scientific_findings[1])===JSON.stringify(old.scientific_findings[1])],
 ['no-new-scores-or-phenome',pm.data.scientific_findings.every(f=>f.synthesised_evidence_confidence==='not-yet-scored')&&JSON.stringify(pm.data.phenome_relationships)===JSON.stringify(old.phenome_relationships)],
 ['governance-check',issues.length===0],
 ['compiled-source-assessments',compiled.includes('Separately infused labelled SCFAs')&&compiled.includes('Secondary systematic-review')&&compiled.includes('bovine rumen fluid')],
 ];
 fs.mkdirSync(REVIEW_DIR,{recursive:true});
 const classified=relationships.map(r=>({atom_id:r.id.split('::')[1],input:r.input,type:r.scientific_assessment.type,classification:r.scientific_assessment.classification,scientific_admission:r.scientific_admission,review_reason:r.scientific_assessment.review_reason||null,canonical_id:r.substance_id,admission_errors:r.admission_errors,food_targets:r.food_targets}));
 const result={baseline:'96b08913b917fffb8c96862ac4aab50a46a8d4fe',pm_id:pm.data.pm_id,status:checks.every(([,pass])=>pass)?'PASS WITH LIMITATIONS':'BLOCK',checks:checks.map(([id,pass])=>({id,pass})),counts:{verified:rows.filter(r=>r.mapping_status==='verified').length,provisional:rows.filter(r=>r.mapping_status==='research-supported-provisional').length,unresolved:rows.filter(r=>r.mapping_status==='unresolved').length,repair_items:queue.length,admitted_inputs:classified.filter(r=>r.scientific_admission==='admitted').length,held_for_review:classified.filter(r=>r.scientific_admission==='unresolved').length},governance_issues:issues,limitations:['FOS/GOS mixture admission requires review and is excluded from admitted export.','Apple-pectin remains provisional pending independent food-edge verification.','Composition does not establish food-specific SCFA or brain efficacy; inulin remains an unadmitted candidate.']};
 for(const[name,value]of Object.entries({'controlled-result.json':result,'classification-matrix.json':classified,'manuscript-rollup.json':{qualification:'Food composition establishes supply, not Baxter-equivalent butyrate responses or brain benefit.',records:rows},'cursor-repair-queue.json':{schema_version:1,items:queue},'scientific-findings.json':pm.data.scientific_findings}))fs.writeFileSync(path.join(REVIEW_DIR,name),JSON.stringify(value,null,2)+'\n');
 const disclosures=relationships.map(r=>{const atoms=[['Input',r.input],['Input type',r.input_type],['Biological role',r.biological_role],['Evidence source',JSON.stringify(r.evidence)],['Limitation',r.limitation],['Dietary input',r.dietary_input?'Yes':'Unset']];return `<section data-atom="${r.id.split('::')[1]}"><h2>${escapeHtml(r.input)}</h2><p>Scientific admission: ${escapeHtml(r.scientific_admission)}${r.scientific_assessment.review_required?' — requires review':''}</p><details><summary>Six atoms</summary>${renderCoverageWarning(r.coverage_warnings)}${atoms.map(([key,value])=>`<p data-atom-key="${key}"><b>${key}</b> = ${key==='Input'&&r.substance_page?`<a href="${r.substance_page}">${escapeHtml(value)}</a>`:escapeHtml(value)}</p>`).join('')}</details><details><summary>Food targets</summary>${r.food_targets.length?'<ul>'+r.food_targets.map(f=>'<li>'+renderTarget(f)+'</li>').join('')+'</ul>':'<p>No admitted food-target output: scientific admission requires review.</p>'}</details></section>`;}).join('');
 const shell=body=>'<!doctype html><meta charset="utf-8"><title>PM5 controlled retest</title><style>body{font:16px/1.6 system-ui;max-width:1100px;margin:2em auto}section{border-top:1px solid #bbb;margin:1em 0}details{margin:1em 0}</style>'+body;
 fs.writeFileSync(path.join(REVIEW_DIR,'controlled-render.html'),shell('<h1>PM5 controlled dietary-input retest</h1><p>Food delivery is distinct from intervention effectiveness.</p>'+disclosures));
 fs.writeFileSync(path.join(REVIEW_DIR,'compiled-pm.html'),shell(compiled));
 return result;
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){const result=await runRetest();console.log(JSON.stringify(result,null,2));if(result.status==='BLOCK')process.exitCode=1;}
