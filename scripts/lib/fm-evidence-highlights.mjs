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
} from "./evidence-highlights-render.mjs";

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

function collectPmEvidenceEntries(rootDir, pms, pmCount) {
  const perPm = pmCount === 1 ? 3 : 2;
  const max = pmCount === 1 ? 3 : 4;
  const out = [];
  for (const pm of pms) {
    const filePath = repoPath(rootDir, pm.href);
    if (!filePath || !fs.existsSync(filePath)) continue;
    const { content } = matter(fs.readFileSync(filePath, "utf8"));
    for (const entry of extractPmEvidenceEntries(content).slice(0, perPm)) {
      if (out.length >= max) return out;
      out.push(entry);
    }
  }
  return out;
}

function buildIntro(fmData, pmCount) {
  const theme = themeFromFm(fmData);
  if (pmCount === 1) {
    return `The evidence below supports why ${theme.toLowerCase()} matters as an integrated FM state — mechanism-qualifying findings from child PM biology, not functional outcome or phenome claims.`;
  }
  return `The studies below support ${theme.toLowerCase()} as an integrated FM state emerging from coordinated child PM biology — mechanism-qualifying findings that refine framework interpretation, not phenome/outcome science (which belongs in §3).`;
}

export function buildFmEvidenceHighlightsBlock(fmData, content, rootDir) {
  const pms = fmData.mechanisms_covered || [];
  const pmCount = pms.length || 1;
  const intro = buildIntro(fmData, pmCount);
  let entries = collectPmEvidenceEntries(rootDir, pms, pmCount);

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
  if (!/### 4\.3 Functional Failure Modes/m.test(content)) return content;
  return content.replace(
    /(### 4\.3 Functional Failure Modes[\s\S]*?)(?=\n## 5\. Connected Mechanisms)/,
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
