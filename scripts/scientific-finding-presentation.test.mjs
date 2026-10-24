import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as runtime from 'react/jsx-runtime';
import {evaluate} from '@mdx-js/mdx';
import {shortFindingId,findingReaderLabel,findingInterventionLinks} from '../src/lib/scientificFindingPresentation.mjs';
const require=createRequire(import.meta.url),ts=require('typescript');
const layout=require('../src/plugin/pm-lever-layout/index.cjs');
const read=p=>fs.readFileSync(p,'utf8');
const pm=matter(read('docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx'));
const f=pm.data.scientific_findings[0];
function component(frontMatter={}) {
  const mod={exports:{}};
  const code=ts.transpileModule(read('src/components/ScientificFinding.tsx'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const imports={'@docusaurus/plugin-content-docs/client':{useDoc:()=>({frontMatter})},'../client/brsFmHubDropdown':{initBrsFmHubDropdowns(){}},'./SecAssessment':{SecAssessmentSummary:()=>null},'../lib/scientificFindingPresentation.mjs':{findingReaderLabel,findingInterventionLinks}};
  new Function('exports','require','module',code)(mod.exports,id=>imports[id]||require(id),mod);
  return mod.exports.default;
}
test('actual Finding component derives SF title while preserving canonical anchor and technical identity',()=>{
  const html=renderToStaticMarkup(React.createElement(component(),{finding:f,pmId:pm.data.pm_id}));
  assert.match(html,/>SF1 — Dietary protein and amino-acid availability<\/strong>/);
  assert.match(html,/id="pm1-f1"/);assert.match(html,/<code>PM1-F1<\/code>/);
  assert.equal(shortFindingId('PM2-F7'),'SF7');
});
async function heading(findings,extras='') {
  const body='## 4. Mechanistic Basis + Scientific Findings\n\n### 4.1 Scientific Findings\n\n'+findings.map(f=>`<ScientificFinding finding={${JSON.stringify(f)}} />`).join('\n\n')+'\n\n'+extras+'\n\n## 5. Next\n';
  const evaluated=await evaluate({value:body,data:{frontMatter:{pm_id:pm.data.pm_id,scientific_findings:findings}}},{...runtime,remarkPlugins:[layout]});
  return renderToStaticMarkup(React.createElement(evaluated.default,{components:{ScientificFinding:component()}}));
}
test('compiled heading count changes with rendered Findings, not provenance, constraints or audit versions',async()=>{
  for(const n of [1,2,6]) {
    const html=await heading(pm.data.scientific_findings.slice(0,n));
    assert.ok(html.includes(`id="4-mechanistic-basis">4. Mechanistic Basis + Scientific Findings (SFs ${n})`));
    assert.match(html,new RegExp(`id="41-scientific-findings">4.1 Scientific Findings \\(${n}\\)`));
  }
  const html=await heading([f],'<div id="curated-record">Curated reference</div>\n\n<ScientificFinding finding={'+JSON.stringify({...f,id:'PM1-IC1',presentation:'interpretive-constraint'})+'} />');
  assert.match(html,/Scientific Findings \(1\)/);
});
test('exact intervention relationships are rendered, retired/proposed and shared-keyword cases are not admitted',()=>{
  const data={system_optimisation_practices:[{atom_id:'PM1-SOP-TEST',input:'Exact synthetic protocol',description_finding_id:'PM1-F1'}],lifestyle_priorities:[]};
  const links=findingInterventionLinks(data,f.id);
  assert.equal(links.length,1);
  const html=renderToStaticMarkup(React.createElement(component(data),{finding:f}));
  assert.match(html,/Supports SOP:/);assert.match(html,/href="#pm-lever-optimisation"/);
  data.system_optimisation_practices[0].status='retired';assert.deepEqual(findingInterventionLinks(data,f.id),[]);
  assert.doesNotMatch(renderToStaticMarkup(React.createElement(component(data),{finding:f})),/Supports SOP:/);
  data.system_optimisation_practices[0].status='proposed';assert.deepEqual(findingInterventionLinks(data,f.id),[]);
  assert.deepEqual(findingInterventionLinks(pm.data,'PM1-F5'),[],'Unapproved PM1 SOP remains absent');
  assert.deepEqual(findingInterventionLinks({system_optimisation_practices:[{atom_id:'other',input:f.finding_label}]},f.id),[]);
});
test('reference PM reverse links resolve exact admitted protocols without changing records',()=>{
  const data=matter(read('docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx')).data;
  const links=findingInterventionLinks(data,'PM2-F7');assert.equal(links[0].id,'PM2-LIFE-2');assert.equal(links[0].kind,'Lifestyle Lever');
  assert.deepEqual(findingInterventionLinks(data,'PM2-F2'),[],'Retired fish-before-rice is not resurrected');
});

test('governing authoring instructions agree on descriptive labels, dynamic counts and admission boundaries',()=>{
  assert.match(read('system/scientific-finding-schema.md'),/Stage 2A authors a concise, precise descriptive label/);
  assert.match(read('system/dietary-input-traceability-contract.md'),/Stage 2B must verify that each descriptive `finding_label`/);
  const shared=read('system/primary-mechanism-schema.md');
  assert.match(shared,/actual section's rendered Scientific Finding collection/);
  assert.match(shared,/Proposed SOP relationship/);
  assert.match(shared,/Recompute\nlinks after retirement/);
  assert.match(shared,/Preserve the pre-count section anchor/);
});

test('reader-facing return links use short labels without changing destinations or technical code',async()=>{
  const evaluated=await evaluate({value:'[Return to PM1-F1](#pm1-f1)\n\n`PM1-F1`',data:{frontMatter:{pm_id:pm.data.pm_id,scientific_findings:[f]}}},{...runtime,remarkPlugins:[layout]});
  const html=renderToStaticMarkup(React.createElement(evaluated.default));
  assert.match(html,/href="#pm1-f1">Return to SF1 — Dietary protein and amino-acid availability/);
  assert.match(html,/<code>PM1-F1<\/code>/);
});

test('actual compiled PM1 renders matching mechanism titles and reciprocal evidence links for all six Findings',async()=>{
  const body=pm.content.replace(/^import ScientificFinding[^\n]*\n/m,'');
  const evaluated=await evaluate({value:body,data:{frontMatter:pm.data}},{...runtime,remarkPlugins:[layout]});
  const html=renderToStaticMarkup(React.createElement(evaluated.default,{components:{ScientificFinding:component(pm.data)}}));
  for(const finding of pm.data.scientific_findings) {
    const number=finding.id.split('-F')[1];
    assert.ok(html.includes(`id="pm1-mechanism-f${number}"`));
    assert.match(html,new RegExp(`<h4[^>]*>SF${number} — `));
    assert.ok(html.includes(`href="#pm1-f${number}">SF${number} — ${finding.finding_label}`));
    assert.ok(html.includes(`href="#pm1-mechanism-f${number}">Mechanistic explanation: ${finding.finding_label}`));
  }
  assert.match(html,/Scientific Findings \(6\)/);
  assert.doesNotMatch(html,/Supports SOP:/);
});
