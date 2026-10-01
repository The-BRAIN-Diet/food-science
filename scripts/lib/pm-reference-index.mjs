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

export function readerAuthorYearFromPmReferenceLabel(label) {
  const authorYear = String(label || "").split(/\s+[—–-]\s+/)[0].trim();
  return authorYear.replace(/\s+&\s+/g, " and ");
}

/** Canonical reader-facing records, all derived from one front-matter reference line. */
export function buildPmReferenceRecords(references = []) {
  const records = [];
  for (let i = 0; i < (references || []).length; i += 1) {
    const line = String(references[i] || "").trim();
    const parsed = line.match(REF_LINE_RE);
    const href = line.match(/\]\(([^)]+)\)/)?.[1] || "";
    records.push({
      number: i + 1,
      citationKey: parsed ? String(parsed[2]).trim() : "",
      label: parsed ? String(parsed[1]).trim() : line.replace(/^\-\s*/, ""),
      authorYear: readerAuthorYearFromPmReferenceLabel(parsed?.[1] || ""),
      href,
    });
  }
  return records;
}

export function buildPmReferenceRecordIndex(references = []) {
  return new Map(
    buildPmReferenceRecords(references)
      .filter((record) => record.citationKey)
      .map((record) => [record.citationKey, record]),
  );
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
    return `[[${n}]](#${pmReferenceAnchorId(n)})`;
  }
  return `[${nums.map((n) => `[${n}](#${pmReferenceAnchorId(n)})`).join(", ")}]`;
}

export function expandPmCitationMarkers(text, keyIndex, references = []) {
  return String(text || "").replace(CITE_MARKER_RE, (_, raw) => {
    const keys = raw
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    const cluster = references.length
      ? formatPmStudyCitations(keys, references)
      : formatPmCitationCluster(keys, keyIndex);
    return cluster ? ` ${cluster}` : "";
  });
}

/** First-mention form: Author et al. (year) [n], with [n] linked to §8. */
export function formatPmStudyCitations(citationKeys, references = []) {
  const index = buildPmReferenceRecordIndex(references);
  const seen = new Set();
  return citationKeys
    .map((key) => index.get(String(key).trim()))
    .filter((record) => record && !seen.has(record.number) && seen.add(record.number))
    .sort((a, b) => a.number - b.number)
    .map(
      (record) =>
        `${record.authorYear || record.label} [[${record.number}]](#${pmReferenceAnchorId(record.number)})`,
    )
    .join("; ");
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

export function validatePmReferenceIntegrity(
  references = [],
  content = "",
  issues = [],
  { entityLabel = "PM" } = {},
) {
  const records = buildPmReferenceRecords(references);
  const seenKeys = new Set();
  for (const record of records) {
    if (!record.citationKey) {
      issues.push({
        code: "pm_reference_missing_key",
        message: `${entityLabel}: reference [${record.number}] has no canonical citation key`,
      });
    } else if (seenKeys.has(record.citationKey)) {
      issues.push({
        code: "pm_reference_duplicate_key",
        message: `${entityLabel}: citation key "${record.citationKey}" appears more than once`,
      });
    }
    seenKeys.add(record.citationKey);
  }

  const referenceHeading = String(content).match(/^## 8\. References\s*$/m);
  if (!referenceHeading) {
    issues.push({
      code: "pm_references_section_missing",
      message: `${entityLabel}: missing ## 8. References`,
    });
    return issues;
  }

  const expected = renderNumberedPmReferencesSection(references);
  const start = referenceHeading.index;
  const after = String(content).slice(start);
  const next = after.slice(1).search(/^## \d+\. /m);
  const end = next === -1 ? String(content).length : start + 1 + next;
  const actual = String(content).slice(start, end).trimEnd();
  if (actual !== expected) {
    issues.push({
      code: "pm_references_section_stale",
      message: `${entityLabel}: §8 does not match the canonical references array`,
    });
  }

  const body = String(content).slice(0, start);
  const anchors = [...String(content).matchAll(/id="pm-ref-(\d+)"/g)].map((match) =>
    Number(match[1]),
  );
  for (let number = 1; number <= records.length; number += 1) {
    const count = anchors.filter((anchor) => anchor === number).length;
    if (count !== 1) {
      issues.push({
        code: count ? "pm_reference_anchor_duplicate" : "pm_reference_anchor_missing",
        message: `${entityLabel}: §8 must contain exactly one pm-ref-${number} anchor`,
      });
    }
  }

  for (const match of body.matchAll(/\[(\d+)\]\(#pm-ref-(\d+)\)/g)) {
    const label = Number(match[1]);
    const target = Number(match[2]);
    if (label !== target || target < 1 || target > records.length) {
      issues.push({
        code: "pm_body_citation_misnumbered",
        message: `${entityLabel}: body citation [${label}] points to invalid #pm-ref-${target}`,
      });
    }
  }

  for (const match of body.matchAll(/(^|[^\[])\[(\d+)\](?!\(#pm-ref-\d+\))/gm)) {
    issues.push({
      code: "pm_body_citation_unlinked",
      message: `${entityLabel}: body citation [${match[2]}] is not linked to its §8 entry`,
    });
  }
  return issues;
}
