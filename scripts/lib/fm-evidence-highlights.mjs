/**
 * Build FM §4.4 Evidence Highlights from child PM §5.1 evidence entries.
 * Uses the same dropdown structure as PM §3 Phenome Connections (BRS-X canonical).
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  extractPmEvidenceEntries,
  renderEvidenceHighlightsSection,
  blocksToEvidenceEntries,
} from "./evidence-highlights-render.mjs";
import { FM_EVIDENCE_HIGHLIGHTS } from "../data/fm-evidence-highlights.mjs";
import { hasScientificFindings, rollUpFindings } from "./scientific-findings.mjs";

export const FM_EVIDENCE_PLACEHOLDER_RE = /Expand with FM-level evidence during review/;

function parseReferenceNoteKeys(references = []) {
  return (references || [])
    .map((line) => {
      const m = String(line).match(/\[([^\]]+)\]\([^#]+#([^)]+)\)/);
      if (!m) return null;
      const label = m[1].includes(" — ") ? m[1].split(" — ")[0].trim() : m[1].trim();
      return { citation_key: m[2], label };
    })
    .filter(Boolean);
}

function themeFromFm(fmData) {
  return (fmData.title || fmData.fm_id || "This functional state")
    .replace(/\([^)]*\)/g, "")
    .trim();
}

function repoPath(rootDir, href) {
  if (!href?.startsWith("/docs/biological-targets/")) return null;
  const rel = href.replace("/docs/biological-targets/", "").replace(/\.mdx?$/, "");
  return path.join(rootDir, "docs/biological-targets", `${rel}.mdx`);
}

/**
 * PMs carrying the canonical Scientific Finding model roll up from front matter
 * (the durable source) rather than by parsing the generated body, so a
 * corrected or retracted Finding cannot survive at FM level.
 */
function pmFindingEntries(data) {
  if (!hasScientificFindings(data)) return null;
  return rollUpFindings(data.scientific_findings).map((finding) => ({
    // Compact reference — the canonical record stays on the PM page at §4.1.
    title: String(finding.finding_label || finding.finding_statement || finding.id).trim(),
    sec: finding.synthesised_evidence_confidence,
    rationale: finding.synthesis,
    references: (finding.evidence_considered || []).map((item) => ({
      label: item.label,
      citation_key: item.citation_key,
      href: item.href,
      data_level: item.data_level,
    })),
  }));
}

function collectPmEvidenceEntries(rootDir, pms, pmCount) {
  const perPm = pmCount === 1 ? 3 : 2;
  const max = pmCount === 1 ? 3 : 4;
  const candidates = [];
  for (const pm of pms) {
    const filePath = repoPath(rootDir, pm.href);
    if (!filePath || !fs.existsSync(filePath)) continue;
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    const refKeys = parseReferenceNoteKeys(data.references);
    const pmEntries = pmFindingEntries(data) || extractPmEvidenceEntries(content, refKeys);
    candidates.push(pmEntries.slice(0, perPm));
  }

  // Represent each child PM once before using a second entry from any sibling.
  // Otherwise an early declaration-order PM can exhaust the FM cap and make an
  // explicitly selected later-PM Finding invisible.
  const out = [];
  for (let entryIndex = 0; entryIndex < perPm; entryIndex++) {
    for (const entries of candidates) {
      const entry = entries[entryIndex];
      if (!entry) continue;
      out.push(entry);
      if (out.length >= max) return out;
    }
  }
  return out;
}

function curatedFmEvidenceEntries(fmId) {
  const config = FM_EVIDENCE_HIGHLIGHTS[fmId];
  if (!config?.blocks?.length) return [];
  return blocksToEvidenceEntries(config.blocks, {
    referenceNoteKeys: config.referenceNoteKeys || [],
    defaults: { confidence: "low-medium", evidence_level: "mechanistic" },
  });
}

function buildIntro(fmData, pmCount) {
  const theme = themeFromFm(fmData);
  if (pmCount === 1) {
    return `The evidence below supports why ${theme.toLowerCase()} matters as an integrated FM state — mechanism-qualifying findings from child PM biology, not functional outcome or phenome claims.`;
  }
  return `The studies below support ${theme.toLowerCase()} as an integrated FM state emerging from coordinated child PM biology — mechanism-qualifying findings that refine framework interpretation, not phenome/outcome science (which belongs in §3).`;
}

export function fmHasPlaceholderEvidence(content) {
  return FM_EVIDENCE_PLACEHOLDER_RE.test(content);
}

export function buildFmEvidenceHighlightsBlock(fmData, content, rootDir) {
  const pms = fmData.mechanisms_covered || [];
  const pmCount = pms.length || 1;
  const intro = buildIntro(fmData, pmCount);
  let entries = collectPmEvidenceEntries(rootDir, pms, pmCount);

  if (!entries.length) {
    entries = curatedFmEvidenceEntries(fmData.fm_id);
  }

  if (!entries.length) {
    const summary = String(fmData.summary || themeFromFm(fmData)).trim();
    entries = [
      {
        title: "Integrated FM significance",
        confidence: "low",
        evidence_level: "mechanistic",
        rationale: `${summary}${summary.endsWith(".") ? "" : "."} *(Expand with FM-level evidence during review.)*`,
        references: [],
      },
    ];
  }

  return renderEvidenceHighlightsSection({
    heading: "### 4.4 Evidence Highlights",
    intro,
    entries,
  });
}

export function insertEvidenceHighlightsInContent(content, evidenceBlock) {
  if (!evidenceBlock || fmHasEvidenceHighlights(content)) return content;
  if (!/### 4\.3 Suboptimal Function & Its Effects/m.test(content)) return content;
  return content.replace(
    /(### 4\.3 Suboptimal Function & Its Effects[\s\S]*?)(?=\n## 5\. Connected Mechanisms)/,
    `$1\n\n${evidenceBlock}\n`,
  );
}

export function replaceEvidenceHighlightsInContent(content, evidenceBlock) {
  if (!evidenceBlock) return content;
  if (fmHasEvidenceHighlights(content)) {
    return content.replace(
      /^### 4\.4 Evidence Highlights[\s\S]*?(?=\n## 5\. Connected Mechanisms)/m,
      `${evidenceBlock}\n`,
    );
  }
  return insertEvidenceHighlightsInContent(content, evidenceBlock);
}

function fmHasEvidenceHighlights(content) {
  return /^### 4\.4 Evidence Highlights/m.test(content);
}

export { fmHasEvidenceHighlights };
