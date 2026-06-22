/**
 * Render PM §5.1 / FM §4.4 Evidence Highlights using the same dropdown
 * structure as PM §3 Phenome Connections (BRS-X canonical).
 * @see system/phenome-relationship-schema.md
 */

import {
  enrichReferenceWithDataLevel,
  phenomeRefToBibItem,
  referenceNotesFromKeys,
} from "./reference-data-levels.mjs";
import { dedupeAdjacentCitationBrackets } from "./dedupe-citations.mjs";

export function renderEvidenceReferencesBlock(references = []) {
  const items = references.map(enrichReferenceWithDataLevel).map(phenomeRefToBibItem);
  if (!items.length) return [];
  const serialized = JSON.stringify(items).replace(/</g, "\\u003c");
  return ["- **Key References:**", "", `<PhenomeBibLinks items={${serialized}} />`];
}

/**
 * @param {object} entry
 * @param {string} entry.title — `<details>` summary label
 * @param {string} entry.confidence — low | low-medium | medium | high
 * @param {string} entry.evidence_level — mechanistic | observational | intervention | clinical
 * @param {string} entry.rationale
 * @param {object[]} entry.references — phenome reference shape
 */
export function renderEvidenceEntryDropdown(entry) {
  const lines = [
    "<details>",
    `<summary><strong>${entry.title}</strong></summary>`,
    "",
    `- **Confidence:** ${entry.confidence}`,
    `- **Evidence Level:** ${entry.evidence_level}`,
    `- **Rationale:** ${dedupeAdjacentCitationBrackets(String(entry.rationale).trim())}`,
  ];
  lines.push(...renderEvidenceReferencesBlock(entry.references || []));
  lines.push("", "</details>", "");
  return lines.join("\n");
}

export function renderEvidenceHighlightsSection({
  heading = "### 5.1 Evidence Highlights",
  intro,
  entries = [],
}) {
  if (!entries.length) return "";
  const body = entries.map(renderEvidenceEntryDropdown).join("\n");
  return `${heading}

#### Introduction/Summary

${intro}

${body}`.trimEnd();
}

/** Match [Author et al., Year] citations in rationale text to reference key list. */
export function matchReferencesInRationale(rationale, referenceKeys = []) {
  const notes = referenceNotesFromKeys(referenceKeys);
  if (!notes.length) return [];
  const text = String(rationale || "");
  return notes.filter((ref) => {
    const author = String(ref.label || "").split(" (")[0].trim();
    return author && text.includes(`[${author}`);
  });
}

/**
 * Convert legacy { heading, body, confidence?, evidence_level?, referenceKeys? } blocks
 * into phenome-aligned evidence entries.
 */
export function blocksToEvidenceEntries(blocks = [], { referenceNoteKeys = [], defaults = {} } = {}) {
  const fallbackKeys = referenceNoteKeys || [];
  return blocks.map((block) => {
    const refs =
      block.references ||
      (block.referenceKeys ? referenceNotesFromKeys(block.referenceKeys) : null) ||
      matchReferencesInRationale(block.rationale || block.body, fallbackKeys);
    return {
      title: block.title || block.heading,
      confidence: block.confidence || defaults.confidence || "low-medium",
      evidence_level: block.evidence_level || defaults.evidence_level || "mechanistic",
      rationale: block.rationale || block.body,
      references: refs.map(enrichReferenceWithDataLevel),
    };
  });
}

export function normalizeEvidenceConfig(config) {
  if (config.entries?.length) {
    return config.entries.map((e) => ({
      ...e,
      references: (e.references || []).map(enrichReferenceWithDataLevel),
    }));
  }
  if (config.blocks?.length) {
    return blocksToEvidenceEntries(config.blocks, {
      referenceNoteKeys: config.referenceNoteKeys,
      defaults: {
        confidence: config.defaultConfidence,
        evidence_level: config.defaultEvidenceLevel,
      },
    });
  }
  return [];
}

/** Parse PM §5.1 phenome-style entry dropdowns from rendered MDX. */
export function extractPmEvidenceEntries(pmContent) {
  const section = pmContent.match(/^### 5\.1 Evidence Highlights[\s\S]*?(?=\n## \d+\. )/m);
  if (!section) return [];

  const entries = [];
  const re =
    /<details>\s*\n<summary><strong>([^<]+)<\/strong><\/summary>\s*\n\n- \*\*Confidence:\*\* ([^\n]+)\n- \*\*Evidence Level:\*\* ([^\n]+)\n- \*\*Rationale:\*\* ([^\n]+(?:\n(?!- \*\*Key)[^\n]+)*)\n(?:- \*\*Key References:\*\*[\s\S]*?<PhenomeBibLinks items=\{(\[[\s\S]*?\])\} \/>\s*)?<\/details>/g;

  let m;
  while ((m = re.exec(section[0])) !== null) {
    let references = [];
    if (m[5]) {
      try {
        references = JSON.parse(m[5]).map((item) => ({
          label: item.label,
          citation_key: item.href?.split("#")[1] || "",
          href: item.href,
          data_level: item.dataLevel,
        }));
      } catch {
        references = [];
      }
    }
    entries.push({
      title: m[1].trim(),
      confidence: m[2].trim(),
      evidence_level: m[3].trim(),
      rationale: m[4].trim(),
      references,
    });
  }
  return entries;
}
