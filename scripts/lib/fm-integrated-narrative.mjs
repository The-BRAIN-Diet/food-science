/** Render the reviewed FM synthesis layout; never reconstruct PM-by-PM prose. */
import { extractFmSuboptimalBody, placeFmTopInventory, renderFmSynthesisSection } from './fm-synthesis-layout.mjs';

export function buildIntegratedMechanisticBasis(fmData, oldSection4) {
  return renderFmSynthesisSection(fmData, extractFmSuboptimalBody(oldSection4));
}

export function replaceFmSection4(content, fmData) {
  const pattern = /^## 4\. Mechanistic Basis[^\n]*\n[\s\S]*?(?=\n## 5\. Connected Mechanisms)/m;
  const old = content.match(pattern)?.[0];
  if (!old) throw new Error(`${fmData.fm_id}: section 4 is missing`);
  const section = buildIntegratedMechanisticBasis(fmData, old);
  return placeFmTopInventory(content.replace(pattern, section + '\n\n'), fmData);
}

export function fixFmTailFormatting(content) {
  return content.replace(/(## 8\. References)\n(?!\n)/g, '$1\n\n');
}
