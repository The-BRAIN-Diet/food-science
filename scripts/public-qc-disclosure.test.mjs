import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as auditPresentation from '../src/components/SecCalibrationPreview/auditPresentation.mjs';

function loadTs(file, require) {
  const module = {exports: {}};
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS, esModuleInterop: true},
    reportDiagnostics: true,
  });
  assert.deepEqual(compiled.diagnostics, []);
  vm.runInNewContext(compiled.outputText, {module, exports: module.exports, require, URLSearchParams});
  return module.exports;
}
const data = loadTs('src/data/frameworkQcPublic.ts', name => {
  if (name.endsWith('.json')) return JSON.parse(fs.readFileSync(`src/data/${name.slice(2)}`, 'utf8'));
  throw Error(name);
});
function component(file, overrides = {}) {
  return loadTs(`src/components/ReviewCorrections/${file}.tsx`, name => {
    if (name === 'react') return React;
    if (name === '@docusaurus/Link') return ({to, children}) => React.createElement('a', {href: to}, children);
    if (name === '@docusaurus/useDocusaurusContext') return () => ({siteConfig: {customFields: {includeInternalDocs: true}}});
    if (name === '@docusaurus/router') return {useHistory: () => ({replace() {}}), useLocation: () => ({search: '', pathname: '/'})};
    if (name.includes('frameworkQcPublic')) return {...data, ...overrides};
    if (name.endsWith('.css')) return {};
    throw Error(name);
  }).default;
}
const render = (C, props = {}) => renderToStaticMarkup(React.createElement(C, props));

test('missing review history is disclosed, not represented as unreviewed or cleared', () => {
  const html = render(component('PageReviewPanel'), {page: null, panelId: 'review-corrections-panel'});
  assert.ok(html.includes(data.PUBLIC_QC_HISTORY_DISCLOSURE));
  assert.match(html, /role="note"/);
  assert.match(html, /Review history unavailable \/ incomplete/);
  assert.doesNotMatch(html, /No accepted corrections|Evidence review status: Unreviewed|No pending or accepted/);
});

test('available pending history is retained, never silently closed by disclosure', () => {
  const page = {page_type: 'PM', last_checked: '2026-09-14', review_status: 'issues_logged', corrections: [{title: 'Historical issue', correction_status: 'pending', decision: 'Await verification'}]};
  const before = JSON.stringify(page);
  const html = render(component('PageReviewPanel'), {page, panelId: 'review-corrections-panel'});
  assert.match(html, /Historical issue/);
  assert.match(html, /Correction status: pending/);
  assert.match(html, /Issues logged/);
  assert.ok(html.includes(data.PUBLIC_QC_HISTORY_DISCLOSURE));
  assert.equal(JSON.stringify(page), before);
});

test('empty public register reports incomplete history, not zero known issues', () => {
  const html = render(component('PublicRegister'));
  assert.ok(html.includes(data.PUBLIC_QC_HISTORY_DISCLOSURE));
  assert.match(html, /Available review entries: 0 \(history incomplete\)/);
  assert.doesNotMatch(html, /No issues match|0 issues/);
});

test('available register entries retain their existing pending/open status', () => {
  const issue = {id: 'FW001', title: 'Existing review', status: 'open', visibility: 'public', findings: ['Needs verification'], affected_pages: []};
  const html = render(component('PublicRegister', {frameworkQcRegister: {issues: [issue]}}));
  assert.match(html, /FW001/);
  assert.match(html, /Status: open/);
  assert.match(html, /Needs verification/);
  assert.doesNotMatch(html, /Status: resolved/);
});


test('partial applied history cannot imply all outstanding decisions were resolved', () => {
  const page = {page_type: 'PM', last_checked: '2026-09-14', review_status: 'issues_logged', corrections: [{title: 'Recorded correction', correction_status: 'applied'}]};
  const html = render(component('PageReviewPanel'), {page, panelId: 'review-corrections-panel'});
  assert.match(html, /Recorded correction/);
  assert.match(html, /Correction status: applied/);
  assert.match(html, /available entries; review history remains incomplete/);
  assert.doesNotMatch(html, /No pending or accepted decisions remain for this page/);
});


function pmAudit() {
  const empty = () => null;
  return loadTs('src/components/SecCalibrationPreview/EvidenceAudit.tsx', name => {
    if (name === 'react') return React;
    if (name === '@docusaurus/router') return {useLocation: () => ({pathname: '/docs/biological-targets/brs5/fm2/pm4/'})};
    if (name.endsWith('frameworkQcPublic')) return data;
    if (name.endsWith('PageReviewPanel')) return component('PageReviewPanel');
    if (name.endsWith('auditPresentation.mjs')) return auditPresentation;
    if (name.endsWith('EvidenceConfidenceIndicator')) return {__esModule: true, default: empty, SEC_DISPLAY_LEVELS: []};
    if (name.endsWith('brsFmHubDropdown')) return {initBrsFmHubDropdowns() {}};
    if (name.endsWith('sameAudit.mjs')) return {sameAudits: []};
    if (name.endsWith('glycaemicStage2.mjs')) return {expandedGlycaemicAudits: []};
    if (name.endsWith('.json')) return [];
    if (name.endsWith('.css') || name.endsWith('assessmentAudit.mjs')) return {};
    if (name.endsWith('V1Preview')) return {V1DecisionAudit: empty};
    if (name.endsWith('GlycaemicInterventionPreview')) return {GlycaemicStage2Audit: empty};
    if (name.endsWith('Disclosure')) return empty;
    throw Error(name);
  }).default;
}

test('outer PM Evidence & Audit discloses missing history before its nested review records', () => {
  const page = {page_type: 'PM', review_status: 'unreviewed', corrections: [], issues: []};
  const html = render(pmAudit(), {panelId: 'review-corrections-panel', assessmentRecords: [], assessmentPage: page});
  assert.match(html, /Evidence &amp; Audit/);
  assert.match(html, /Review history unavailable \/ incomplete/);
  assert.equal(html.split(data.PUBLIC_QC_HISTORY_DISCLOSURE).length - 1, 1);
  assert.ok(html.indexOf(data.PUBLIC_QC_HISTORY_DISCLOSURE) < html.indexOf('Review and correction records'));
  assert.doesNotMatch(html, /No corrections recorded|Corrections resolved/);
});

test('outer PM audit preserves pending corrections and qualifies partial applied history', () => {
  for (const status of ['pending', 'applied']) {
    const page = {page_type: 'PM', corrections: [{title: 'Retained review', correction_status: status}], issues: []};
    const html = render(pmAudit(), {panelId: 'review-corrections-panel', assessmentRecords: [], assessmentPage: page});
    assert.match(html, /Available records: .* \(review history incomplete\)/);
    assert.ok(html.includes('Correction status: ' + status));
    assert.match(html, /Retained review/);
  }
});
