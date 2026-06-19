/**
 * Build FM §4.4 Evidence Highlights from FM narrative + child PM evidence.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

function themeFromFm(fmData) {
  return (fmData.title || fmData.fm_id || "This functional state")
    .replace(/\([^)]*\)/g, "")
    .trim();
}

function themeSlug(theme) {
  return theme.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function repoPath(rootDir, href) {
  if (!href?.startsWith("/docs/biological-targets/")) return null;
  const rel = href.replace("/docs/biological-targets/", "").replace(/\.mdx?$/, "");
  return path.join(rootDir, "docs/biological-targets", `${rel}.mdx`);
}

export function extractPmEvidenceBullets(pmContent) {
  const m = pmContent.match(
    /### 5\.1 Evidence Highlights[\s\S]*?<details>[\s\S]*?<\/summary>\s*([\s\S]*?)<\/details>/i,
  );
  if (!m) return [];
  return m[1]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "));
}

function extractSection42Paragraphs(content) {
  const m = content.match(
    /### 4\.2 Integrated Functional Narrative\s*\n+([\s\S]*?)(?=\n### 4\.3|\n## 5\.)/,
  );
  if (!m) return [];
  return m[1]
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 50 && !/^Together,/i.test(p));
}

function collectPmBullets(rootDir, pms, pmCount) {
  const perPm = pmCount === 1 ? 3 : 1;
  const max = pmCount === 1 ? 3 : 4;
  const out = [];
  for (const pm of pms) {
    const filePath = repoPath(rootDir, pm.href);
    if (!filePath || !fs.existsSync(filePath)) continue;
    const { content } = matter(fs.readFileSync(filePath, "utf8"));
    for (const bullet of extractPmEvidenceBullets(content).slice(0, perPm)) {
      if (out.length >= max) return out;
      out.push(bullet);
    }
  }
  return out;
}

function narrativeParagraphToBullet(paragraph) {
  if (paragraph.startsWith("- ")) return paragraph;
  const text = paragraph.replace(/\s+/g, " ").trim();
  return `- ${text.endsWith(".") ? text : `${text}.`}`;
}

function buildIntro(fmData, pmCount) {
  const theme = themeFromFm(fmData);
  if (pmCount === 1) {
    return `The evidence below supports why ${theme.toLowerCase()} matters as an integrated FM state — functional significance, connected-system context, and downstream consequences — not merely whether the primary mechanism exists.`;
  }
  return `The studies below support ${theme.toLowerCase()} as an integrated FM state emerging from coordinated child PM biology — why the combined state matters for framework interpretation, not PM mechanism existence alone.`;
}

export function buildFmEvidenceHighlightsBlock(fmData, content, rootDir) {
  const pms = fmData.mechanisms_covered || [];
  const pmCount = pms.length || 1;
  const theme = themeFromFm(fmData);
  const intro = buildIntro(fmData, pmCount);
  const pmBullets = collectPmBullets(rootDir, pms, pmCount);
  const narrativeParas = extractSection42Paragraphs(content);

  const bullets = [...pmBullets];
  for (const para of narrativeParas) {
    if (bullets.length >= 4) break;
    const bullet = narrativeParagraphToBullet(para);
    if (!bullets.includes(bullet)) bullets.push(bullet);
  }

  if (!bullets.length) {
    const summary = String(fmData.summary || theme).trim();
    bullets.push(
      `- ${summary.endsWith(".") ? summary : `${summary}.`} *(Expand with FM-level evidence during review.)*`,
    );
  }

  const summaryLabel = themeSlug(theme);

  return `### 4.4 Evidence Highlights

#### Introduction/Summary

${intro}

<details>
<summary><strong>Evidence highlights — ${summaryLabel}</strong></summary>

${bullets.join("\n")}

</details>`;
}

export function insertEvidenceHighlightsInContent(content, evidenceBlock) {
  if (!evidenceBlock || fmHasEvidenceHighlights(content)) return content;
  if (!/### 4\.3 Functional Failure Modes/m.test(content)) return content;
  return content.replace(
    /(### 4\.3 Functional Failure Modes[\s\S]*?)(?=\n## 5\. Connected Mechanisms)/,
    `$1\n\n${evidenceBlock}\n`,
  );
}

function fmHasEvidenceHighlights(content) {
  return /^### 4\.4 Evidence Highlights/m.test(content);
}
