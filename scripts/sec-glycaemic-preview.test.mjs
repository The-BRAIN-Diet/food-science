import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import matter from 'gray-matter';
import {readPilotBaseline, pilotArchivePath} from './lib/sec-pilot-baseline.mjs';
import {compile} from '@mdx-js/mdx';
import {listMechanismMdxFiles} from './lib/mechanism-page-validation.mjs';
import {glycaemicAudits} from '../src/components/SecCalibrationPreview/glycaemicAudit.mjs';
import {audit, sf2Audit, secAssessmentStatusErrors, isAuditPreview} from '../src/components/SecCalibrationPreview/assessmentAudit.mjs';
import {assessmentPresentation} from '../src/components/SecCalibrationPreview/auditPresentation.mjs';

const read = readPilotBaseline;
const canonicalPath = 'docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx';
const previewPath = 'docs/system/sec-calibration/glycaemic-variability.mdx';
const canonical = matter(read(canonicalPath));
const preview = matter(read(previewPath));

test('complete PM copy preserves science outside explicitly proposed intervention sections and new preview Findings', () => {
  const proposedBody = canonical.content.replaceAll('<ScientificFinding finding=', '<GlycaemicFinding finding=')
    .replace('- Fish before rice in the studied meal sequence', '<GlycaemicInterventions section="3.2" />')
    .replace('- Regular aerobic activity (studied seven-day programme)', '<GlycaemicInterventions section="3.3" />')
    .replace('## 5. BRS Pathways and Connections', '<GlycaemicStage2Findings />\n\n## 5. BRS Pathways and Connections');
  assert.ok(preview.content.includes(proposedBody.trimEnd()));
  const data = JSON.parse(preview.content.match(/export const previewDisplayData = (.*);/)[1]);
  for (const key of Object.keys(data)) assert.deepEqual(data[key], canonical.data[key]);
  assert.equal(data.pm_id, 'BRS6-FM1-PM2');
  assert.equal((preview.content.match(/<GlycaemicFinding finding=/g) || []).length, 4);
  assert.deepEqual(Object.keys(preview.data).sort(), ['hide_title','id','list_image','slug','title']);
  assert.deepEqual(glycaemicAudits.map(r => r.findingId), canonical.data.scientific_findings.map(f => f.id));
  for (const r of glycaemicAudits) {
    const original = canonical.data.scientific_findings.find(f => f.id === r.findingId);
    assert.equal(r.proposition, original.finding_statement);
    assert.equal(r.canonicalProposition, original.finding_statement);
    assert.deepEqual(r.sources.supporting, original.evidence_considered.map(e => e.citation_key));
  }
});

test('preview compiles as MDX without a production build', async () => {
  const result = await compile(preview.content);
  assert.match(String(result), /GlycaemicFinding/);
});

test('production excludes both previews even with the preview opt-in enabled', () => {
  const config = read('docusaurus.config.ts');
  const code = config.slice(config.indexOf('const includeInternalDocs'), config.indexOf('const wipSitemapIgnore'));
  const excludes = env => vm.runInNewContext(`${code}\ndocsExclude`, {process: {env}});
  for (const env of [{}, {NODE_ENV:'production'}, {NODE_ENV:'production', SEC_CALIBRATION_PREVIEW:'true', INCLUDE_INTERNAL_DOCS:'true'}]) assert.ok(excludes(env).includes('**/system/sec-calibration/**'));
  assert.ok(!excludes({NODE_ENV:'development',SEC_CALIBRATION_PREVIEW:'true'}).includes('**/system/sec-calibration/**'));
  assert.ok(!listMechanismMdxFiles(process.cwd(), 'pm').some(path => path.includes('/system/sec-calibration/')));
  assert.equal(preview.data.pm_id, undefined);
  assert.equal(preview.data.scientific_findings, undefined);
  const component = read('src/components/SecCalibrationPreview/GlycaemicPreview.tsx');
  assert.match(component, /<PmDietaryLeverEnhancer frontMatter=\{data\}/);
  assert.doesNotMatch(component, /generate|registerOntology|foodStrategy/);
});

test('all factors and caps are documented, calculable and valid without human-review inference', () => {
  assert.deepEqual(glycaemicAudits.map(r => r.rawScore), [3,4,4,6]);
  for (const record of glycaemicAudits) {
    assert.deepEqual(secAssessmentStatusErrors(record), []);
    assert.equal(record.rawScore, Object.values(record.factors).reduce((a,b) => a+b, 0));
    let ceiling = 8;
    if (record.factors.D === 1) ceiling = Math.min(ceiling,5);
    if (record.factors.B === 0) ceiling = Math.min(ceiling,2);
    if (record.factors.P === 0) ceiling = Math.min(ceiling,4);
    assert.equal(record.adjustedScore, Math.min(record.rawScore,ceiling));
    assert.ok(record.factors.D > 0);
    assert.equal(record.humanReview, null);
    assert.equal(record.conditional, undefined);
    assert.equal(assessmentPresentation(record).statusLabel, 'Provisionally assessed');
    assert.ok(Object.values(record.rationale).every(Boolean));
    assert.ok(Object.values(record.factorStates).every(v => v === 'established'));
    assert.ok(record.history.length && record.process && record.lastEvidenceAssessmentDate);
    assert.match(record.rationale.R, /Independent replication was not established in this assessment\./);
  }
});

test('positive, null and contradictory sources have distinct roles and endpoint-specific scope', () => {
  const [f1,f2,f3,f4] = glycaemicAudits;
  assert.match(f1.rationale.B,/without a randomized inactive comparator/);
  assert.match(f1.rationale.P,/p=0.07.*p=0.06/);
  assert.match(f1.recommendation,/Proposed wording for separate approval/);
  assert.match(f2.scopeNote,/15 minutes.*240 minutes/);
  assert.match(f2.rationale.P,/Healthy-group.*not significantly/);
  assert.ok(f3.sources.contradictory.includes('10.1177/193229681100500112'));
  assert.match(f3.rationale.R,/p=0.29/);
  assert.match(f4.scopeNote,/not continuous glucose variability/);
  assert.equal(f4.factors.R,1);
  assert.match(f4.sources.targetedChecks[1].role,/independent partial/);
  assert.match(f4.sources.targetedChecks[2].role,/Contextual null/);
  assert.match(f4.sources.targetedChecks[2].assessment,/Non-significance is not equivalence/);
  for (const record of glycaemicAudits) assert.match(record.stoppingRationale,/Scite.*citation.*publisher\/repository/);
});

test('audit uses existing collapsed component, full factors and matching SF links/statuses', () => {
  const panel = read('src/components/SecCalibrationPreview/EvidenceAudit.tsx');
  const finding = read('src/components/SecCalibrationPreview/GlycaemicPreview.tsx');
  assert.match(panel,/records\.map/);
  assert.match(panel,/className="brs-fm-hub-summary" aria-expanded="false"/);
  assert.match(panel,/className="brs-fm-hub-panel" hidden/);
  assert.match(panel,/initBrsFmHubDropdowns\(root.current\)/);
  assert.match(panel,/secFactors\[factor\]\.name/);
  assert.match(panel,/Raw SEC.*adjusted SEC/);
  assert.match(panel,/Evidence review status/); assert.match(panel,/Correction status/);
  assert.match(finding,/assessmentPresentation\(record\)/);
  assert.match(finding,/\?review=1#\$\{record.id\}/);
  assert.match(finding,/Synthesised Evidence Confidence/);
  assert.doesNotMatch(finding,/under calibration.*statusLabel|Math\.(max|min)|reduce\(/);
  assert.equal(new Set(glycaemicAudits.map(r=>r.id)).size,4);
  assert.equal(isAuditPreview('/docs/system/sec-calibration/glycaemic-variability/'),true);
  assert.equal(isAuditPreview('/docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation'),false);
});

test('GABA calibration, archived pilot sources and bibliography remain byte-identical to baseline', () => {
  for (const file of [canonicalPath,'docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx','docs/system/sec-calibration/gaba.mdx','src/components/SecCalibrationPreview/curatedSources.mjs']) {
    assert.equal(read(file), execFileSync('git',['show',`HEAD:${pilotArchivePath(file)}`],{encoding:'utf8',maxBuffer:5e6}));
  }
  const bib = execFileSync('git',['ls-files','*BRAIN*diet.bib','*BRAIN*Diet*.bib'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
  for (const file of bib) assert.equal(read(file),execFileSync('git',['show',`HEAD:${pilotArchivePath(file)}`],{encoding:'utf8',maxBuffer:20e6}));
  assert.equal(audit.conditional.adjustedScore,4); assert.equal(sf2Audit.conditional.adjustedScore,5);
  assert.equal(audit.history.length,5); assert.equal(sf2Audit.history.length,2);
});
