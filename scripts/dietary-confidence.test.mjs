import fs from 'node:fs';
import path from 'node:path';
import Module, {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {compile} from '@mdx-js/mdx';
import {load} from 'cheerio';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import * as confidence from '../src/lib/dietaryConfidence.mjs';
import {historicalAdmission,validateInputGovernance} from './lib/dietary-input-governance.mjs';
import {buildDietaryLeverDisclosureMap as serverMap} from './lib/dietary-lever-disclosure.mjs';
import {validateScientificHypotheses,renderScientificHypotheses} from './lib/scientific-hypotheses.mjs';
import * as findingPresentation from '../src/lib/scientificFindingPresentation.mjs';
const BASE='7c01ae09a541c1ef8b1958fee1deb43b742a0287';
const files=['brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity','brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling','brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation'].map(s=>'docs/biological-targets/'+s+'.mdx');
const pages=files.map(file=>({file,...matter(fs.readFileSync(file,'utf8'))}));
const hypothesisFile='docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx';
const pm1=matter(fs.readFileSync(hypothesisFile,'utf8'));
const hypothesis=JSON.parse(fs.readFileSync('review/dietary-confidence-pilot-2026-10-24/proposed-pm1-h1.json'));
const resolvePm=id=>[...pages.map(p=>p.data),pm1.data].find(d=>d.pm_id===id);
const validate=data=>confidence.validateDietaryConfidence(data,{isHistoricallyAdmitted:a=>historicalAdmission(data,a),resolvePm:id=>id===data.pm_id?data:resolvePm(id)});
function loadTs(file,append=''){
 const absolute=path.resolve(file),mod=new Module(absolute);mod.filename=absolute;mod.paths=Module._nodeModulePaths(path.dirname(absolute));
 const native=createRequire(absolute);
 mod.require=id=>id.endsWith('dietaryConfidence.mjs')?confidence:id.endsWith('scientificFindingPresentation.mjs')?findingPresentation:id==='@site/src/lib/dietaryLeverDisclosure'?client:id.startsWith('@docusaurus/')?{}:id==='@site/src/lib/pmInputFoodDisclosure'?{}:native(id);
 const result=ts.transpileModule(fs.readFileSync(absolute,'utf8')+append,{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true},reportDiagnostics:true});
 assert.deepEqual(result.diagnostics,[]);mod._compile(result.outputText,absolute);return mod.exports;
}
const client=loadTs('src/lib/dietaryLeverDisclosure.ts');
const enhancer=loadTs('src/components/PmDietaryLeverEnhancer.tsx','\nexport {buildDetailHtml};');

test('three scoped adjudications preserve all pre-existing records and page bodies byte for byte',()=>{
 assert.deepEqual(pages.map(p=>p.data.dietary_confidence_assessments[0].confidence),['High','Moderate','Low']);
 for(const p of pages){const previous=matter(execFileSync('git',['show',BASE+':'+p.file],{encoding:'utf8'}));const data=structuredClone(p.data);delete data.dietary_confidence_assessments;assert.deepEqual(data,previous.data);assert.equal(p.content,previous.content);assert.deepEqual(validate(p.data),[]);const issues=[];validateInputGovernance(p.data,issues,{content:p.content});assert.deepEqual(issues,[]);}
 const previous=matter(execFileSync('git',['show',BASE+':'+hypothesisFile],{encoding:'utf8'}));const existing=structuredClone(pm1.data);delete existing.scientific_hypotheses;assert.deepEqual(existing,previous.data);assert.equal(pm1.content.replace(renderScientificHypotheses(pm1.data)+'\n\n',''),previous.content);
});

test('absent assessment renders nothing; non-confidence and inferred numerical labels fail',()=>{
 for(const value of ['Unassessed','Not admitted',null,0,3,'Very high']){const d=structuredClone(pages[0].data);d.dietary_confidence_assessments[0].confidence=value;assert.ok(validate(d).length);assert.equal(confidence.dietaryConfidenceFor(d,'PM9-DIT-3'),null);}
 const d=structuredClone(pages[0].data);delete d.dietary_confidence_assessments;assert.deepEqual(validate(d),[]);assert.equal(confidence.renderDietaryConfidence(confidence.dietaryConfidenceFor(d,'PM9-DIT-3')),'');
});

test('Low cannot compensate for unsupported dietary delivery or engagement',()=>{
 for(const value of confidence.DIETARY_CONFIDENCE_VALUES)for(const key of ['mechanism_engagement','dietary_exposure']){const d=structuredClone(pages[2].data);const row=d.dietary_confidence_assessments[0];row.confidence=value;row.essential_links.find(l=>l.link===key).status='unresolved';assert.ok(validate(d).length);assert.equal(confidence.dietaryConfidenceFor(d,row.atom_id),null);}
 for(const status of ['unresolved','rejected']){const d=structuredClone(pages[2].data);d.dietary_input_assessments[0].status=status;assert.ok(validate(d).length);assert.equal(confidence.dietaryConfidenceFor(d,'PM7-DIT-DEFERRED-1'),null);}
 const d=structuredClone(pages[2].data);d.dietary_input_assessments[0].dietary_exposure.status='unresolved';assert.ok(validate(d).length);assert.equal(confidence.dietaryConfidenceFor(d,'PM7-DIT-DEFERRED-1'),null);
});

test('hypotheses never receive confidence, including Supported hypotheses or sidecar records',()=>{
 for(const value of confidence.DIETARY_CONFIDENCE_VALUES){const d=structuredClone(pm1.data);d.scientific_hypotheses=[{...hypothesis,status:'Supported'}];d.dietary_confidence_assessments=[{...structuredClone(pages[0].data.dietary_confidence_assessments[0]),id:'DC-BRS5-FM1-PM1-PM1-H1',atom_id:'PM1-H1',confidence:value}];assert.ok(validate(d).length);assert.equal(confidence.dietaryConfidenceFor(d,'PM1-H1'),null);}
 const embedded={...pm1.data,scientific_hypotheses:[{...hypothesis,dietary_confidence:'High'}]};assert.ok(validate(embedded).length);
 assert.equal(pm1.data.scientific_hypotheses?.length,1);assert.equal(pm1.data.scientific_hypotheses[0].status,'Unestablished');assert.ok(!pm1.data.dietary_confidence_assessments);assert.ok(!('confidence' in hypothesis));
 const proposal={...pm1.data,scientific_hypotheses:[hypothesis]};const body='## 4. Mechanistic Basis\n\n'+renderScientificHypotheses(proposal)+'\n\n### 4.1 Scientific Findings\n';assert.deepEqual(validateScientificHypotheses(proposal,[],{content:body,resolvePm}),[]);
});

test('Type and distance conflicts, duplicate assessments, score inheritance and invalid references fail',()=>{
 for(const mutation of [d=>d.dietary_confidence_assessments[0].classification='direct',d=>d.dietary_confidence_assessments[0].type='B',d=>d.dietary_confidence_assessments.push(d.dietary_confidence_assessments[0]),d=>d.dietary_confidence_assessments[0].sec=3,d=>d.dietary_confidence_assessments[0].finding_links[0].finding_id='PM9-F999']){const d=structuredClone(pages[0].data);mutation(d);assert.ok(validate(d).length);}
 const d=structuredClone(pages[0].data);for(const f of d.scientific_findings){delete f.sec_assessment_ref;f.synthesised_evidence_confidence='fixture-changed';}assert.equal(confidence.dietaryConfidenceFor(d,'PM9-DIT-3').confidence,'High');
});

test('actual client disclosures and server payloads agree, render confidence separately and preserve six atoms',()=>{
 const html=[];
 for(const p of pages){const id=p.data.dietary_confidence_assessments[0].atom_id;const c=[...client.buildDietaryLeverDisclosureMap(p.data).values()].find(d=>d.atomId===id);const s=[...serverMap(p.data).values()].find(d=>d.atomId===id);assert.ok(c);assert.deepEqual(c.dietaryConfidence,s.dietaryConfidence);const rendered=enhancer.buildDetailHtml(c),$=load(rendered);assert.equal($('.brs-dietary-confidence').length,1);assert.equal($('.brs-dietary-lever-detail-k').length,6);assert.ok(rendered.indexOf('brs-dietary-confidence')<rendered.indexOf('brs-dietary-lever-detail-k'));assert.equal($('.brs-dietary-confidence a').length,p.data.dietary_confidence_assessments[0].finding_links.length);const pageUrl="https://thebraindiet.org/"+p.file.replace(/^docs\//,"docs/").replace(/\.mdx$/, "");const preview=rendered.replaceAll('href="/docs/','href="https://thebraindiet.org/docs/').replaceAll('href="#',`href="${pageUrl}#`);html.push(`<section><h2>${p.data.pm_id}: ${c.title}</h2>${preview}</section>`);}
 const Component=loadTs('src/components/ScientificHypothesis.tsx').default;
 const fourth=renderToStaticMarkup(React.createElement(Component,{hypothesis:pm1.data.scientific_hypotheses[0]}));assert.ok(!fourth.includes('data-dietary-confidence'));html.push('<section><h2>PM1-H1 — canonical unestablished hypothesis</h2><p>Admission: not established. Dietary Confidence: not applicable.</p>'+fourth.replaceAll('href="/docs/','href="https://thebraindiet.org/docs/')+'</section>');
 fs.writeFileSync('review/dietary-confidence-pilot-2026-10-24/rendered-examples.html','<!doctype html><html lang="en"><meta charset="utf-8"><title>Dietary Confidence — four pilot examples</title><style>body{font:16px/1.5 system-ui;max-width:950px;margin:2rem auto;padding:1rem}.brs-dietary-confidence{border-left:3px solid #667085;padding:.1rem 1rem}section{margin-bottom:2rem}a{color:#125bb5}</style><h1>Dietary Confidence — bounded pilot</h1>'+html.join('\n').replace(/[ \t]+$/gm,'')+'</html>');
});

test('escaping is safe; all three unchanged PM bodies still compile',async()=>{
 const row=structuredClone(pages[0].data.dietary_confidence_assessments[0]);row.explanation='<script>bad()</script>';row.finding_links[0].href='javascript:bad()';const html=confidence.renderDietaryConfidence(row);assert.ok(!html.includes('<script>'));assert.ok(!html.includes('javascript:'));
 for(const p of pages)new (Object.getPrototypeOf(async function(){}).constructor)(String(await compile(p.content,{outputFormat:'function-body'})));
});


test('all six BRS mapping outputs and repair tasks are identical to the baseline in memory',()=>{
 const baselines=new Map([...files,hypothesisFile].map(file=>[path.resolve(file),execFileSync('git',['show',BASE+':'+file],{encoding:'utf8'})]));
 const original=fs.readFileSync,report=[];
 for(let n=1;n<=6;n++){
  const current=buildInputSubstanceFood(process.cwd(),{brs:`BRS${n}`});let before;
  try{fs.readFileSync=function(file,options){const saved=typeof file==='string'&&baselines.get(path.resolve(file));return saved!==false&&typeof saved==='string'?(typeof options==='string'||options?.encoding?saved:Buffer.from(saved)):original.call(fs,file,options);};before=buildInputSubstanceFood(process.cwd(),{brs:`BRS${n}`});}
  finally{fs.readFileSync=original;}
  assert.deepEqual(current.manuscript_rows,before.manuscript_rows);assert.deepEqual(current.cursor_queue,before.cursor_queue);assert.deepEqual(current.relationships,before.relationships);
  report.push({brs:`BRS${n}`,rows:current.manuscript_rows.length,repair_items:current.cursor_queue.length,unchanged:true});
 }
 fs.writeFileSync('review/dietary-confidence-pilot-2026-10-24/mapping-preservation.json',JSON.stringify(report,null,2)+'\n');
 for(const file of ['scripts/lib/scientific-hypotheses.mjs','system/sec-assessments/registry.json'])assert.equal(fs.readFileSync(file,'utf8'),execFileSync('git',['show',BASE+':'+file],{encoding:'utf8'}));
});
