import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as runtime from 'react/jsx-runtime';
import {evaluate} from '@mdx-js/mdx';
import {expectedFindingsSection, authoredFindingLessons} from './lib/scientific-findings-gate.mjs';
import {findingOnMainPage} from '../src/lib/scientificFindingPresentation.mjs';
import * as principles from '../src/lib/scientificPrinciples.mjs';
import * as sec from '../src/lib/secAssessments.mjs';

const read = p => fs.readFileSync(p, 'utf8');
const file = 'docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling.mdx';
const {data, content} = matter(read(file));
const section = content.slice(content.indexOf('## 4.'), content.indexOf('## 5.'));
const summary = section.slice(section.indexOf('### Summary'), section.indexOf('<div class="brs-fm-hub-item"'));
const findings = data.scientific_findings;

test('all ten Findings map from Summary to unique mechanisms and reciprocal SF records', () => {
  assert.equal(findings.length, 10);
  assert.equal(data.scientific_principles.length, 2);
  assert.equal((section.match(/<ScientificFinding /g) || []).length, 10);
  const lessons = authoredFindingLessons(section);
  for (const f of findings) {
    const id = f.id.toLowerCase(), mechanism = 'pm8-mechanism-f' + f.id.split('-F')[1];
    assert.ok(summary.includes(`](#${id})`), f.id + ' Summary link');
    assert.ok(summary.includes(`](#${mechanism})`), f.id + ' mechanism link');
    assert.equal(section.split(`id="${mechanism}"`).length - 1, 1);
    assert.ok(lessons.get(f.id).includes(`href="#${mechanism}"`));
  }
  assert.ok(section.indexOf('#### (Boundaries of the mechanism)') < section.indexOf('#### (Integration within BRS6)'));
  assert.ok(section.indexOf('#### (Integration within BRS6)') < section.indexOf('### 4.1 Scientific Findings'));
});

test('canonical Finding regeneration is fresh and retains reciprocal authored links', () => {
  const expected = expectedFindingsSection(data, content);
  assert.equal(expected.auditOnly, undefined);
  assert.ok(content.includes(expected.block));
  assert.equal(authoredFindingLessons(expected.block).size, 10);
  const previous = {...data}; delete previous.scientific_findings_placement;
  assert.equal(expectedFindingsSection(previous, content).auditOnly, true);
});

test('main-page routing is explicit and leaves Principles, historical Findings and SEC anchors in audit', () => {
  assert.ok(findings.every(f => findingOnMainPage(data, f.id.toLowerCase())));
  for (const id of ['pm8-sp1', 'pm8-f1', 'sec-pm8-pm8-f12-assessment-v2']) assert.equal(findingOnMainPage(data, id), false);
  assert.equal(findingOnMainPage({...data, scientific_findings_placement: undefined}, 'pm8-f12'), false);
});

test('actual MDX and shared heading renderer produce ten Findings without counting Principles', async () => {
  const layout = createRequire(import.meta.url)('../src/plugin/pm-lever-layout/index.cjs');
  const evaluated = await evaluate({value: content, data: {frontMatter: data}}, {...runtime, remarkPlugins: [layout]});
  const html = renderToStaticMarkup(React.createElement(evaluated.default, {components: {
    ScientificFinding: ({finding}) => React.createElement('section', {id: finding.id.toLowerCase()}, finding.finding_label),
  }}));
  assert.ok(html.includes('4. Mechanistic Basis + Scientific Findings (SFs 10)'));
  assert.ok(html.includes('4.1 Scientific Findings (10)'));
  assert.ok(html.includes('id="4-mechanistic-basis"'));
  assert.ok(html.includes('id="41-scientific-findings"'));
  for (const f of findings) assert.equal(html.split(`id="${f.id.toLowerCase()}"`).length - 1, 1);
});

function renderAudit(frontMatter) {
  const module = {exports: {}};
  const registry = JSON.parse(read('system/sec-assessments/registry.json'));
  const requires = name => {
    if (name === 'react') return React;
    if (name.includes('scientificPrinciples')) return principles;
    if (name.includes('secAssessments')) return sec;
    if (name.endsWith('registry.json')) return registry;
    if (name.includes('PmCuratedProvenance')) return {pmCuratedSources: () => []};
    if (name === '../ScientificFinding') return ({finding}) => React.createElement('section', {className: 'brain-sf', id: finding.id.toLowerCase()});
    if (name.includes('EvidenceAudit')) return props => React.createElement('div', {'data-assessments': props.assessmentRecords.length}, props.scientificFindings, props.scientificPrinciples);
    if (name.includes('Disclosure')) return ({id, children}) => React.createElement('div', {id: id.toLowerCase()}, children);
    return () => null;
  };
  vm.runInNewContext(ts.transpileModule(read('src/components/SecAssessment/index.tsx'), {compilerOptions: {jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS, esModuleInterop: true}}).outputText, {module, exports: module.exports, require: requires});
  return renderToStaticMarkup(React.createElement(module.exports.CanonicalSecAudit, {findings, pmId: data.pm_id, page: {}, panelId: 'review-corrections-panel', frontMatter}));
}

test('Evidence & Audit retains all current assessments and both Principles, with zero duplicate SF records', () => {
  const html = renderAudit(data);
  assert.ok(html.includes('data-assessments="10"'));
  assert.ok(html.includes('id="pm8-sp1"'));
  assert.ok(html.includes('id="pm8-sp2"'));
  assert.ok(!html.includes('class="brain-sf"'));
  assert.ok(!html.includes('id="scientific-findings"'));
  for (const f of findings) assert.ok(!html.includes(`id="${f.id.toLowerCase()}"`));
  const old = renderAudit({...data, scientific_findings_placement: undefined});
  assert.equal((old.match(/class="brain-sf"/g) || []).length, 10, 'unmigrated pages retain their existing view');
});

test('all Section 4 numbered citations and local mechanism links have targets', () => {
  const ids = new Set([...content.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
  for (const match of section.matchAll(/\]\(#(pm-ref-\d+|pm8-mechanism-f\d+)\)/g)) assert.ok(ids.has(match[1]), match[1]);
});
