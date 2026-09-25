/**
 * PM page reference numbering — presentation layer over front matter `references`.
 *
 * Canonical citation keys map to 1-based display numbers in array order.
 * Reader-facing prose uses {{cite:key1,key2}} markers resolved at sync time.
 */

const REF_LINE_RE = /\[([^\]]+)\]\([^#]+#([^)]+)\)/;
const CITE_MARKER_RE = /\{\{cite:([^}]+)\}\}/g;

export function citationKeyFromPmReferenceLine(line) {
  const m = String(line || "").match(REF_LINE_RE);
  return m ? String(m[2]).trim() : null;
}

/** @returns {Map<string, number>} citation_key → 1-based index */
export function buildPmReferenceKeyIndex(references = []) {
  const index = new Map();
  for (const line of references || []) {
    const key = citationKeyFromPmReferenceLine(line);
    if (!key || index.has(key)) continue;
    index.set(key, index.size + 1);
  }
  return index;
}

export function pmReferenceAnchorId(number) {
  return `pm-ref-${number}`;
}

/** Linked numeric cluster, e.g. [[6](#pm-ref-6), [19](#pm-ref-19)] */
export function formatPmCitationCluster(citationKeys, keyIndex) {
  const nums = [];
  for (const key of citationKeys) {
    const n = keyIndex.get(String(key).trim());
    if (n && !nums.includes(n)) nums.push(n);
  }
  nums.sort((a, b) => a - b);
  if (!nums.length) return "";
  if (nums.length === 1) {
    const n = nums[0];
    return `[${n}](#${pmReferenceAnchorId(n)})`;
  }
  return `[${nums.map((n) => `[${n}](#${pmReferenceAnchorId(n)})`).join(", ")}]`;
}

export function expandPmCitationMarkers(text, keyIndex) {
  return String(text || "").replace(CITE_MARKER_RE, (_, raw) => {
    const keys = raw
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    const cluster = formatPmCitationCluster(keys, keyIndex);
    return cluster ? ` ${cluster}` : "";
  });
}

export function renderNumberedPmReferencesSection(references = [], { heading = "## 8. References" } = {}) {
  const lines = [heading, ""];
  for (let i = 0; i < (references || []).length; i += 1) {
    const line = String(references[i] || "").trim();
    const m = line.match(/^\-\s*(.+)$/);
    const inner = m ? m[1] : line;
    const parsed = inner.match(REF_LINE_RE);
    if (!parsed) {
      lines.push(`- ${inner}`);
      continue;
    }
    const n = i + 1;
    const label = parsed[1];
    const href = inner.match(/\]\(([^)]+)\)/)?.[1] || "";
    lines.push(
      `- <span id="${pmReferenceAnchorId(n)}">[${n}]</span> [${label}](${href})`,
    );
  }
  return lines.join("\n").trimEnd();
}

export function replacePmReferencesSection(content, referencesBlock) {
  const match = content.match(/^## 8\. References\s*$/m);
  if (!match) return null;
  const start = match.index;
  const after = content.slice(start);
  const next = after.slice(1).search(/^## \d+\. /m);
  const end = next === -1 ? content.length : start + 1 + next;
  return `${content.slice(0, start).trimEnd()}\n\n${referencesBlock}\n\n${content.slice(end).trimStart()}`;
}
