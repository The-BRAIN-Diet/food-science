import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import {execFileSync} from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {load} from 'cheerio';
import {createProcessorUncached} from '@docusaurus/mdx-loader/lib/processor.js';
import layout from '../src/plugin/pm-lever-layout/index.cjs';
import {renderScientificHypotheses,validateScientificHypotheses} from './lib/scientific-hypotheses.mjs';
import {validateDietaryConfidence,dietaryConfidenceFor} from '../src/lib/dietaryConfidence.mjs';
import {buildCrossBrsMechanismGraph} from './lib/cross-brs-mechanism-graph.mjs';
import {buildEntityIndex,collectFromText} from './lib/connected-mechanisms-populate.mjs';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
const root=process.cwd(),file='docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx';
const p=matter(fs.readFileSync(file,'utf8')),h=p.data.scientific_hypotheses.find(h=>h.id==='PM1-H1');
const previousText=execFileSync('git',['show','7c01ae09a541c1ef8b1958fee1deb43b742a0287:'+file],{encoding:'utf8'}),previous=matter(previousText);
const prepared=JSON.parse(fs.readFileSync('review/dietary-confidence-pilot-2026-10-24/proposed-pm1-h1.json'));
const dir='review/brs5-pm1-hypothesis-2026-10-24';

test('canonical hypothesis uses existing schema, correct direction and immediate placement',()=>{
 assert.equal(p.data.scientific_hypotheses.length,1);assert.equal(h.title,'Resistant Starch–Derived Butyrate and Tight-Junction Regulation');assert.equal(h.status,'Unestablished');assert.equal(h.proposed_direction,'BRS5-FM2-PM5 → BRS5-FM1-PM1');assert.deepEqual(validateScientificHypotheses(p.data,[],{content:p.content}),[]);assert.ok(p.content.includes(renderScientificHypotheses(p.data)+'\n\n### 4.1 Scientific Findings'));
});
test('reviewed evidence and five links survive without conflating different endpoints',()=>{
 assert.deepEqual(h.evidence_sources,prepared.evidence_sources);assert.deepEqual(h.finding_links,prepared.finding_links);assert.deepEqual(h.limitations,prepared.limitations);assert.deepEqual(h.required_evidence,prepared.required_evidence);
 for(const n of [1,2,3,4,5])assert.ok(h.rationale.includes(`(${n})`));
 const source=id=>h.evidence_sources.find(s=>s.study_id===id);
 assert.match(source('moreau-2004-dss').proposition,/followed healing/);assert.match(source('moreau-2004-dss').limitations,/not tracing starch carbon/);assert.match(source('peng-2009-caco2').proposition,/AMPK.*Caco-2/);assert.equal(source('human-colonic-biopsy-2020').role,'contradictory_or_null');assert.match(source('scharf-2025-colonoscopy').proposition,/transcellular/);assert.match(source('scharf-2025-colonoscopy').limitations,/not demonstrated paracellular/);
});
test('all previous PM1 scientific fields and original body are preserved exactly',()=>{
 const data=structuredClone(p.data);delete data.scientific_hypotheses;assert.deepEqual(data,previous.data);assert.equal(p.content.replace(renderScientificHypotheses(p.data)+'\n\n',''),previous.content);
 for(const key of ['dietary_input_traceability','dietary_lever_atoms','dietary_input_assessments','scientific_findings','references','cofactors','phenome_relationships'])assert.deepEqual(p.data[key],previous.data[key]);
 assert.deepEqual(validateDietaryConfidence(p.data),[]);assert.equal(dietaryConfidenceFor(p.data,h.id),null);assert.ok(!p.data.dietary_confidence_assessments);assert.ok(!Object.keys(h).some(k=>/confidence|score|^sec$|^cc$/.test(k)));
});
test('actual hypothesis component renders visible Unestablished status before unchanged Findings',()=>{
 const name=path.resolve('src/components/ScientificHypothesis.tsx');const result=ts.transpileModule(fs.readFileSync(name,'utf8'),{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.CommonJS,esModuleInterop:true},reportDiagnostics:true});assert.deepEqual(result.diagnostics,[]);const mod=new Module(name);mod.paths=Module._nodeModulePaths(root);mod._compile(result.outputText,name);
 const rendered=renderToStaticMarkup(React.createElement(mod.exports.default,{hypothesis:h}));const $=load(rendered);assert.equal($('details#pm1-h1').length,1);assert.equal($('.hypothesis-status').text(),'Unestablished');assert.equal($('[data-dietary-confidence],[data-sec-assessment]').length,0);assert.match($('summary').text(),/Hypothesis-1.*Resistant Starch/);
 const html='<!doctype html><html lang="en"><meta charset="utf-8"><title>BRS5 PM1 — Hypothesis 1</title><style>body{font:16px/1.5 system-ui;max-width:980px;margin:2rem auto;padding:1rem}a{color:#125bb5}</style><h1>BRS5-FM1-PM1 — Gut Barrier / Tight Junction Integrity</h1><h2>4. Mechanistic Basis</h2><h3>Scientific Hypotheses</h3>'+rendered.replaceAll('href="/docs/','href="https://thebraindiet.org/docs/')+'<h3 id="41-scientific-findings">4.1 Scientific Findings</h3><p>Existing Scientific Findings remain unchanged. This preview uses the canonical hypothesis record and existing component.</p></html>';
 fs.writeFileSync(dir+'/rendered-canonical-hypothesis.html',html);fs.writeFileSync(dir+'/canonical-record.json',JSON.stringify(h,null,2)+'\n');
});
test('complete PM1 MDX compiles through the existing Docusaurus layout pipeline',async()=>{
 const options={siteDir:root,staticDirs:[path.resolve('static')],markdownConfig:{anchors:{maintainCase:false},format:'mdx',mermaid:false,mdx1Compat:{comments:true,admonitions:true,headingIds:true}},beforeDefaultRemarkPlugins:[layout],remarkPlugins:[],rehypePlugins:[],admonitions:true};
 const compiler=await createProcessorUncached({options,format:'mdx'});const compiled=await compiler.process({content:p.content,filePath:path.resolve(file),frontMatter:p.data,compilerName:'server'});assert.ok(String(compiled.content).includes('ScientificHypothesis'));assert.ok(String(compiled.content).includes('41-scientific-findings'));
});
test('hypothesis leaves causal extraction, food targets and manuscript decisions identical',()=>{
 const afterGraph=buildCrossBrsMechanismGraph(root),index=buildEntityIndex(root),opts={hostKey:'brs5',selfHref:'/docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity',crossBrsOnly:false};
 assert.deepEqual(collectFromText(p.content,opts,index),collectFromText(previous.content,opts,index));
 const after=buildInputSubstanceFood(root,{brs:'BRS5'});let beforeGraph,before;
 const original=fs.readFileSync;
 try{fs.readFileSync=function(name,options){if(typeof name==='string'&&path.resolve(name)===path.resolve(file))return typeof options==='string'||options?.encoding?previousText:Buffer.from(previousText);return original.call(fs,name,options);};beforeGraph=buildCrossBrsMechanismGraph(root);before=buildInputSubstanceFood(root,{brs:'BRS5'});}finally{fs.readFileSync=original;}
 assert.deepEqual(afterGraph,beforeGraph);assert.deepEqual(after.manuscript_rows,before.manuscript_rows);assert.deepEqual(after.cursor_queue,before.cursor_queue);assert.deepEqual(after.relationships,before.relationships);assert.ok(!after.relationships.some(r=>r.id.endsWith('::PM1-H1')));assert.ok(!JSON.stringify(after.manuscript_rows).includes('PM1-H1'));
 fs.writeFileSync(dir+'/extraction-preservation.json',JSON.stringify({causal_graph_unchanged:true,connected_extraction_unchanged:true,manuscript_rows_unchanged:true,food_relationships_unchanged:true,repair_queue_unchanged:true,confidence_not_applicable:true,brs5_rows:after.manuscript_rows.length},null,2)+'\n');
});
