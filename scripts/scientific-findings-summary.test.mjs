import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import { listMechanismMdxFiles } from './lib/mechanism-page-validation.mjs';
import { hasScientificFindings, validateScientificFindings } from './lib/scientific-findings.mjs';
import { expectedFindingsSection } from './lib/scientific-findings-gate.mjs';
const pages = listMechanismMdxFiles(process.cwd(), 'pm')
  .map(file => ({file, ...matter(fs.readFileSync(file, 'utf8'))}))
  .filter(({data}) => /^BRS[12]-/.test(data.pm_id || ''));

test('BRS1/BRS2 evidence summaries render from their durable source with valid local citation destinations', () => {
  const approvedIds = JSON.parse(fs.readFileSync('review/recovery-readiness-2026-11-14/integration/findings-contract-reconciliation/approved-summary-baseline.json')).pm_ids;
  assert.deepEqual(pages.map(p=>p.data.pm_id).sort(), approvedIds);
  for (const {file, data, content} of pages) {
    const intro = hasScientificFindings(data)
      ? data.scientific_findings_intro
      : content.match(/#### Summary\s*\n([\s\S]*?)(?=\n<div)/)?.[1];
    assert.ok(intro?.trim(), `${file}: missing summary`);
    assert.ok(!intro.includes('The findings below'), `${file}: section announcement instead of summary`);
    const citations = [...intro.matchAll(/\[\[(\d+)\]\]\(#pm-ref-(\d+)\)/g)];
    if (!citations.length) {
      const approved = JSON.parse(fs.readFileSync('review/recovery-readiness-2026-11-14/integration/findings-contract-reconciliation/approved-summary-baseline.json')).uncited_intros[data.pm_id];
      assert.ok(approved, `${file}: unapproved uncited summary`);
      assert.equal(intro, approved, `${file}: approved synthesis changed`);
      assert.ok(data.scientific_findings.some(f=>(f.evidence_considered || []).length), `${file}: no underlying evidence`);
    }
    for (const [, visible, target] of citations) {
      assert.equal(visible, target);
      assert.ok(data.references[Number(target) - 1], `${file}: missing reference record ${target}`);
      assert.ok(content.includes(`id="pm-ref-${target}"`), `${file}: missing citation destination ${target}`);
    }
    if (hasScientificFindings(data)) {
      assert.deepEqual(validateScientificFindings(data, [], {entityLabel: data.pm_id}), []);
      const expected = expectedFindingsSection(data, content);
      assert.ok(content.includes(expected.block), `${file}: stale generated section`);
      if (expected.auditOnly) {
        assert.ok(content.includes('?review=1#scientific-findings'));
        assert.ok(!/<ScientificFinding\b/.test(content));
      } else assert.ok(expected.block.includes('#### Summary\n'));
    }
  }
});

test('Findings-owned PM1 uses canonical synthesis while legacy PM/FM renderer headings remain stable', async () => {
  const { renderEvidenceHighlightsSection } = await import('./lib/evidence-highlights-render.mjs');
  const { BRS1_PM_EVIDENCE } = await import('./lib/pm-evidence-highlights.mjs');
  const config = BRS1_PM_EVIDENCE['brs1-fm1-pm1-amino-acid-availability-and-prioritisation'];
  const pm1 = pages.find(({data}) => data.pm_id === 'BRS1-FM1-PM1');
  const opts = {
    intro: config.intro,
    entries: [{title: 'Representative evidence', confidence: 'low', evidence_level: 'mechanistic', rationale: 'Bounded finding'}],
  };
  const rendered = renderEvidenceHighlightsSection({...opts, summaryHeading: 'Summary'});
  assert.ok(rendered.includes('#### Summary\n\n' + config.intro));
  assert.ok(hasScientificFindings(pm1.data));
  assert.notEqual(pm1.data.scientific_findings_intro, config.intro);
  const expected = expectedFindingsSection(pm1.data, pm1.content);
  assert.ok(pm1.content.includes(expected.block), 'canonical Findings generator owns the published summary');
  assert.ok(expected.block.includes(pm1.data.scientific_findings_intro));
  assert.ok(renderEvidenceHighlightsSection(opts).includes('#### Introduction/Summary\n'));
});
