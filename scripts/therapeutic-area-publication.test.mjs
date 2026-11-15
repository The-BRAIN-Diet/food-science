import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const mm = require('minimatch');
const matches = typeof mm === 'function' ? mm : mm.minimatch;
const config = fs.readFileSync('docusaurus.config.ts', 'utf8');
const section = config.slice(config.indexOf('const includeInternalDocs ='), config.indexOf('const generatedQcPath ='));
function visibility(env) {
  const context = {process: {env}, result: null};
  vm.runInNewContext(section + '\nresult = {docsExclude, sitemapIgnore, includeTherapeuticAreas};', context);
  return context.result;
}
const files = fs.readdirSync('docs/therapeutic-areas').filter(f => /\.mdx?$/.test(f)).map(f => 'docs/therapeutic-areas/' + f);
for (const flag of [undefined, 'false', 'true']) {
  test(`all therapeutic-area documents are excluded in production, including internal flag ${flag}`, () => {
    const {docsExclude, sitemapIgnore} = visibility({NODE_ENV: 'production', INCLUDE_INTERNAL_DOCS: flag});
    assert.equal(files.length, 10);
    for (const file of [...files, 'docs/therapeutic-areas/future/nested-page.mdx']) assert.ok(docsExclude.some(p => matches(file,p)), file);
    for (const route of ['/docs/therapeutic-areas','/docs/therapeutic-areas/','/docs/therapeutic-areas/adhd/','/docs/therapeutic-areas/future/nested/']) assert.ok(sitemapIgnore.some(p => matches(route,p)), route);
    for (const file of ['docs/foods/eggs.md','docs/biological-targets/brs5/fm2/pm4.mdx','docs/substances/bioactive-compounds/taurine.md']) assert.equal(docsExclude.some(p => matches(file,p)), false, file);
  });
}
test('canonical section remains available only in explicitly opted-in local development', () => {
  for (const flag of [undefined, 'false', 'true']) {
    const {docsExclude} = visibility({NODE_ENV:'development',INCLUDE_INTERNAL_DOCS:flag});
    assert.equal(docsExclude.some(p => matches('docs/therapeutic-areas/index.md',p)),flag !== 'true');
  }
});
test('old public root and descendant URLs have forced not-found responses', () => {
  const redirects=fs.readFileSync('netlify.toml','utf8').split('[[redirects]]');
  for (const from of ['/docs/therapeutic-areas','/docs/therapeutic-areas/*']) {
    const block=redirects.find(b => b.includes(`from = "${from}"`));
    assert.ok(block,from);assert.match(block,/to = "\/404\.html"/);assert.match(block,/status = 404/);assert.match(block,/force = true/);
  }
});

// Execute the actual shared renderer with controlled canonical claims.
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const renderer = fs.readFileSync('src/theme/TherapeuticAreaDetail/index.tsx', 'utf8');
const component = renderer.slice(renderer.indexOf('export function TherapeuticAreaPmLinks'), renderer.indexOf('function OverviewTab'));
function renderLinks(enabled) {
  const context = {React, useDocusaurusContext: () => ({siteConfig:{customFields:{includeTherapeuticAreas:enabled}}}),
    getClaimsForPm: () => [{taId:'TA001',id:'test',currentClaim:'Preserved evidence'}],
    getTherapeuticAreaEntry: () => ({name:'ADHD'}), pmEvidenceMarker: () => 'test',
    getTaPath: () => '/docs/therapeutic-areas/adhd/', styles:{},
    Link: ({to,children}) => React.createElement('a',{href:to},children)};
  vm.createContext(context);
  vm.runInContext(ts.transpile(component.replace('export function','function'), {jsx:ts.JsxEmit.React,target:ts.ScriptTarget.ES2020}),context);
  return renderToStaticMarkup(React.createElement(context.TherapeuticAreaPmLinks,{pmId:'BRS1-FM1-PM1'}));
}
test('shared PM renderer follows the section publication flag, including TA001', () => {
  assert.match(config,/customFields:\s*\{[^}]*includeTherapeuticAreas/s);
  for (const internal of [undefined,'false','true']) {
    assert.equal(renderLinks(visibility({NODE_ENV:'production',INCLUDE_INTERNAL_DOCS:internal}).includeTherapeuticAreas),'');
  }
  assert.equal(renderLinks(undefined),'');
  assert.match(renderLinks(visibility({NODE_ENV:'development',INCLUDE_INTERNAL_DOCS:'true'}).includeTherapeuticAreas),/href="\/docs\/therapeutic-areas\/adhd\//);
  assert.match(config,/onBrokenLinks: ['"]throw['"]/);
});
