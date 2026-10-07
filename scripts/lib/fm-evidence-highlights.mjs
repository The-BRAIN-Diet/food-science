/** FM evidence summaries are reviewed durable strings, not copied PM dropdowns. */
import { fmHasEvidenceHighlights } from './fm-schema-gate.mjs';
export { fmHasEvidenceHighlights, assertAllFmsHaveEvidenceHighlights } from './fm-schema-gate.mjs';
import { renderFmEvidenceSummary } from './fm-synthesis-layout.mjs';

export const FM_EVIDENCE_PLACEHOLDER_RE = /Expand with FM-level evidence during review/;
export function fmHasPlaceholderEvidence(content) { return FM_EVIDENCE_PLACEHOLDER_RE.test(content); }
export function buildFmEvidenceHighlightsBlock(fmData) { return renderFmEvidenceSummary(fmData); }
export function insertEvidenceHighlightsInContent(content, block) {
  if (!block || fmHasEvidenceHighlights(content)) return content;
  if (!/^### 4\.3 Suboptimal Function & Its Effects/m.test(content)) throw new Error('FM Suboptimal Function heading is missing');
  return content.replace(/^### 4\.3 Suboptimal Function & Its Effects/m, block + '\n\n### 4.3 Suboptimal Function & Its Effects');
}
export function replaceEvidenceHighlightsInContent(content, block) {
  if (!block) return content;
  if (fmHasEvidenceHighlights(content)) return content.replace(/(?:<span id="44-evidence-highlights" \/>\s*\n)?### 4\.2 Evidence Summary[\s\S]*?(?=\n### 4\.3)/m, block + '\n');
  return insertEvidenceHighlightsInContent(content, block);
}
