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
  assert.equal(pages.length, 17);
  for (const {file, data, content} of pages) {
    const intro = hasScientificFindings(data)
      ? data.scientific_findings_intro
      : content.match(/#### Summary\s*\n([\s\S]*?)(?=\n<div)/)?.[1];
    assert.ok(intro?.trim(), `${file}: missing summary`);
    assert.ok(!intro.includes('The findings below'), `${file}: section announcement instead of summary`);
    const citations = [...intro.matchAll(/\[\[(\d+)\]\]\(#pm-ref-(\d+)\)/g)];
    assert.ok(citations.length, `${file}: summary has no numbered evidence links`);
    for (const [, visible, target] of citations) {
      assert.equal(visible, target);
      assert.ok(data.references[Number(target) - 1], `${file}: missing reference record ${target}`);
      assert.ok(content.includes(`id="pm-ref-${target}"`), `${file}: missing citation destination ${target}`);
    }
    if (hasScientificFindings(data)) {
      assert.deepEqual(validateScientificFindings(data, [], {entityLabel: data.pm_id}), []);
      const expected = expectedFindingsSection(data, content);
      assert.ok(content.includes(expected.block), `${file}: stale generated section`);
      assert.ok(expected.block.includes('#### Summary\n'));
    }
  }
});

test('legacy PM1 retains its summary through the PM generator while the FM heading default stays unchanged', async () => {
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
  assert.ok(pm1.content.includes(config.intro), 'legacy generator source must match the published summary');
  assert.ok(renderEvidenceHighlightsSection(opts).includes('#### Introduction/Summary\n'));
});
