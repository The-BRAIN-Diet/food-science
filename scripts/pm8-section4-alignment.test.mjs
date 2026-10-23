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
import {expectedFindingsSection,authoredFindingLessons} from './lib/scientific-findings-gate.mjs';
import {headlineMechanisticFindings} from './lib/scientific-findings.mjs';
const require=createRequire(import.meta.url),layout=require('../src/plugin/pm-lever-layout/index.cjs');
const read=p=>fs.readFileSync(p,'utf8'),hash=s=>createHash('sha256').update(s).digest('hex');
const manifest=JSON.parse(read('review/pm8-section4-alignment/manifest.json'));
for(const page of manifest.pages){
 const source=read(page.file),pm=matter(source);
 test(page.pmId+': scientific front matter, SEC pins, admissions and original lesson preserved',()=>{
  assert.equal(hash(source.slice(0,source.indexOf(pm.content))),page.frontMatterSha256);
  assert.deepEqual(headlineMechanisticFindings(pm.data).map(f=>({id:f.id,label:f.finding_label})),page.findings);
  assert.ok(pm.content.includes(expectedFindingsSection(pm.data,pm.content).block),'generated section is fresh');
  const lessons=authoredFindingLessons(pm.content);
  for(const before of page.originalLessons)assert.ok(lessons.get(before.id).includes(before.body.trim()),'original lesson unchanged: '+before.id);
  if(!page.changed)assert.equal(hash(source),page.beforeSha256,'already aligned PM1 is byte-identical');
 });
 test(page.pmId+': actual MDX derives matching SF headings, counts and reciprocal destinations',async()=>{
  const body=pm.content.replace(/^import[^\n]*\n/gm,'');
  const evaluated=await evaluate({value:body,data:{frontMatter:pm.data}},{...runtime,remarkPlugins:[layout]});
  // Non-heading client components are fixtures here; their authored content is
  // protected byte-for-byte above, not reimplemented by this alignment test.
  const fixture=({children})=>React.createElement('div',null,children);
  const html=renderToStaticMarkup(React.createElement(evaluated.default,{components:{PmDevelopmentDisclosureLock:()=>null,ScientificFinding:({finding})=>React.createElement('div',{id:finding.id.toLowerCase()},finding.finding_label),AccessibleMermaid:fixture,PmCuratedEvidence:fixture,PmCuratedReferenceList:fixture,PmCuratedReferences:fixture}}));
  assert.ok(html.includes(`4. Mechanistic Basis + Scientific Findings (SFs ${page.findings.length})`));
  assert.ok(html.includes(`4.1 Scientific Findings (${page.findings.length})`));
  assert.ok(html.includes('id="4-mechanistic-basis"'));assert.ok(html.includes('id="41-scientific-findings"'));
  for(const f of page.findings){
   const n=f.id.split('-F')[1],target=f.id.split('-')[0].toLowerCase()+'-mechanism-f'+n;
   assert.equal((html.match(new RegExp('id="'+target+'"','g'))||[]).length,1,'unique mechanism anchor');
   assert.match(html,new RegExp(`<h4[^>]*>SF${n} — `));
   assert.ok(html.includes(`href="#${f.id.toLowerCase()}">SF${n} — `));
   assert.ok(html.includes(`href="#${target}">Mechanistic explanation:`));
  }
 });
}
test('all SEC assessment bytes and scores are unchanged',()=>{
 assert.equal(hash(read('system/sec-assessments/registry.json')),manifest.registrySha256);
});
