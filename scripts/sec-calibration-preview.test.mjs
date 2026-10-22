import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import matter from 'gray-matter';
import {listMechanismMdxFiles} from './lib/mechanism-page-validation.mjs';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const config = fs.readFileSync('docusaurus.config.ts', 'utf8');
const canonical = matter(fs.readFileSync('docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx', 'utf8'));
const preview = matter(fs.readFileSync('docs/system/sec-calibration/gaba.mdx', 'utf8'));
const code = config.slice(config.indexOf('const includeInternalDocs'), config.indexOf('const wipSitemapIgnore'));
const excludes = env => vm.runInNewContext(`${code}\ndocsExclude`, {process: {env}});

test('strict opt-in excludes docs in default dev, production and internal builds', () => {
 for (const env of [{}, {NODE_ENV:'production'}, {INCLUDE_INTERNAL_DOCS:'true'}, {SEC_CALIBRATION_PREVIEW:'false'}, {SEC_CALIBRATION_PREVIEW:'1'}]) {
  assert.ok(excludes(env).includes('**/system/sec-calibration/**'));
 }
 assert.ok(!excludes({SEC_CALIBRATION_PREVIEW:'true'}).includes('**/system/sec-calibration/**'));
 assert.match(config, /exclude: docsExclude/);
});
test('preview front matter has no scientific identity, evidence or relationship registration', () => {
 assert.deepEqual(Object.keys(preview.data).sort(), ['hide_title','id','list_image','slug','title']);
 assert.equal(preview.data.id, 'sec-calibration-gaba-preview');
 assert.equal(preview.data.slug, '/system/sec-calibration/gaba');
 assert.equal(preview.data.pm_id, undefined);
 assert.equal(preview.data.scientific_findings, undefined);
});
test('entire canonical body, Findings, lessons, references and numbered sections survive', () => {
 assert.ok(preview.content.includes(canonical.content.replaceAll('<ScientificFinding finding=', '<CalibrationFinding finding=')));
 const originals = [...canonical.content.matchAll(/<ScientificFinding finding=/g)].length;
 assert.equal([...preview.content.matchAll(/<CalibrationFinding finding=/g)].length, originals);
 assert.ok(originals > 5);
 assert.match(preview.content, /brs1-4-9-f1-l1/);
});
test('preview is outside canonical PM and evidence inventories', () => {
 assert.ok(!listMechanismMdxFiles(process.cwd(), 'pm').some(p => p.includes('/docs/system/sec-calibration/')));
 for (const file of ['scripts/lib/input-substance-food.mjs','scripts/generate-food-strategy-rollup.mjs','scripts/lib/phenome-relationship-index.mjs']) {
  const source = fs.readFileSync(file,'utf8');
  assert.match(source, /biological-targets|listMechanismMdxFiles/);
  assert.doesNotMatch(source, /docs\/system/);
 }
});
test('ontology sees only loaded documents and no preview scientific metadata', async () => {
 const plugin = await require('../src/plugin/ontology-projection')();
 let output;
 const run = async docs => plugin.allContentLoaded({actions:{setGlobalData: data => output=data}, allContent:{'docusaurus-plugin-content-docs':{default:{loadedVersions:[{docs}]}}}});
 await run([]); assert.equal(output.docs.length,0);
 await run([{title:preview.data.title,permalink:'/docs/system/sec-calibration/gaba',frontMatter:preview.data,tags:[]}]);
 assert.equal(output.docs[0].frontMatter.pm_id,undefined);
 assert.equal(output.docs[0].frontMatter.scientific_findings,undefined);
});
test('actual lever claims stay unscored; multiple Finding support is explicit', () => {
 const component=fs.readFileSync('src/components/SecCalibrationPreview/index.tsx','utf8');
 assert.match(component, /<strong>Not scored<\/strong>/);
 assert.match(component, /href="#pm9-f1">F1<\/a> \+ <a href="#pm9-f2">F2/);
 assert.match(component, /No explicit canonical Finding linkage/);
 assert.match(component, /not assigned to F1/);
 assert.match(component, /Calculated raw SEC 0\/8/);
 assert.match(component, /Not assessed/);
 assert.doesNotMatch(component, /Math\.(max|min)|\.reduce\(/);
});

test('historical preview distinguishes approved assessment governance from illustrative values', () => {
 const component=fs.readFileSync('src/components/SecCalibrationPreview/index.tsx','utf8');
 for (const label of ['Not scored:', 'Conditional estimate:', 'Provisionally assessed:', 'Scientifically reviewed:']) assert.ok(component.includes(label),label);
 assert.match(component, /Human expert approval is not required for Codex-assessed provisional SEC/);
 assert.match(component, /not the later SF1\/SF2 conditional assessments/);
 assert.match(component, /Illustrative values are not provisional scientific assessments/);
 assert.match(component, /Factor anchors and numerical caps remain proposals/);
 assert.match(component, /Assessment status, confidence level, evidence-review status and correction status remain separate/);
 assert.match(component, /Unknown factors are not zero/);
 assert.match(component, /Methodology under calibration/);
 assert.match(component, /<strong>\{finding.id\} · Not scored/);
 assert.match(component, /Object.freeze\(\{score: 6, label: 'Moderate–High', factors: 'D2\/B2\/P2\/R0'\}\)/);
 assert.doesNotMatch(component, /Assessment pending|copied from current main/);
 assert.match(component, /<details className=\{styles.rationale\}>\s*<summary>Assessment states and governance/);
});
