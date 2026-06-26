/**
 * PM §5 Mechanistic Basis — parse, placeholder detection, and MDX replacement.
 *
 * Spreadsheet integration: rows should include:
 *   pm_id, summary, evidence_notes?, key_studies?: [{ index, label, citation_key, href }],
 *   mechanistic_detail?: { summary?, details_title?, blocks?: [{ heading, paragraphs: string[] }] }
 *
 * When mechanistic_detail.blocks is absent, conversion should flag the page for manual authoring
 * (or call with pre-authored content from MECHANISTIC_AUTHORING_REQUIRED).
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderHubCollapsible } from "./hub-collapsible.mjs";

export const MECHANISTIC_PLACEHOLDER_PATTERNS = [
  /^Truth-layer PM\b/i,
  /^Anchor PM for\b/i,
  /^Added to complete\b/i,
  /^Supporting PM\b/i,
  /^Supporting PM inside\b/i,
  /^Supporting PM to prevent\b/i,
  /^Supporting PM linking\b/i,
  /^Mechanistic detail generation pending\b/i,
];

const MECHANISTIC_BASIS_HEADING = /^##\s+(\d+)\.\s+Mechanistic Basis\s*$/m;
/** Integer `## N.` sections only — includes nested `### N.1 Evidence Highlights` within Mechanistic Basis. */
const NEXT_MAJOR_SECTION = /^##\s+\d+\.\s+(?!\d)/m;

function listOverlayMdxFiles(rootDir, subdir) {
  const base = path.join(rootDir, "docs/biological-targets");
  const out = [];
  if (!fs.existsSync(base)) return out;
  for (const brs of fs.readdirSync(base)) {
    const dir = path.join(base, brs, subdir);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".mdx") || f.endsWith(".md")) out.push(path.join(dir, f));
    }
  }
  return out.sort();
}

export function listPmMdxFiles(rootDir = process.cwd()) {
  return listOverlayMdxFiles(rootDir, "pm");
}

export function listSmMdxFiles(rootDir = process.cwd()) {
  return listOverlayMdxFiles(rootDir, "sm");
}

export function readPmPage(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { raw, data, content };
}

export function writePmPage(filePath, data, content) {
  const out = matter.stringify(content, data, { lineWidth: 9999 });
  fs.writeFileSync(filePath, out);
}

export function extractMechanisticBasisSection(content) {
  const match = content.match(MECHANISTIC_BASIS_HEADING);
  if (!match || match.index === undefined) return null;
  const start = match.index;
  const sectionNum = parseInt(match[1], 10);
  const after = content.slice(start);
  const next = after.slice(1).search(NEXT_MAJOR_SECTION);
  const end = next === -1 ? content.length : start + 1 + next;
  return {
    start,
    end,
    sectionNum,
    block: content.slice(start, end),
  };
}

/** @deprecated Use extractMechanisticBasisSection */
export function extractSection5(content) {
  return extractMechanisticBasisSection(content);
}

export function extractDetailsBody(section5Block) {
  const hubIdx = section5Block.indexOf("data-brs-fm-hub");
  if (hubIdx !== -1) {
    const panelStart = section5Block.indexOf('<div class="brs-fm-hub-panel"', hubIdx);
    if (panelStart !== -1) {
      const panelOpen = section5Block.indexOf(">", panelStart) + 1;
      const panelClose = section5Block.indexOf("</div>\n</div>\n</div>", panelOpen);
      if (panelClose !== -1) {
        return section5Block.slice(panelOpen, panelClose).trim();
      }
    }
  }
  const open = section5Block.indexOf("<details>");
  if (open === -1) return "";
  const close = section5Block.indexOf("</details>", open);
  if (close === -1) return "";
  const inner = section5Block.slice(open, close);
  const afterSummary = inner.replace(/<summary>[\s\S]*?<\/summary>\s*/i, "");
  return afterSummary.replace(/^[\s\S]*?<details>\s*/i, "").trim();
}

export function isPlaceholderMechanisticDetail(text) {
  const t = (text || "").trim();
  if (!t) return true;
  if (t.length < 120) {
    return MECHANISTIC_PLACEHOLDER_PATTERNS.some((re) => re.test(t));
  }
  if (!/####\s*\(/.test(t) && MECHANISTIC_PLACEHOLDER_PATTERNS.some((re) => re.test(t))) {
    return true;
  }
  return false;
}

/** Front matter waiver: missing/placeholder Mechanistic Basis does not fail validation. */
export function isMechanisticAuthoringDeferred(data) {
  return data?.mechanistic_authoring_required === true;
}

export function auditOverlayMechanisticBasis(filePath, { idField = "pm_id" } = {}) {
  const { data, content } = readPmPage(filePath);
  const entityId = data[idField] || data.pm_id || data.sm_id;
  const deferred = isMechanisticAuthoringDeferred(data);
  const s5 = extractMechanisticBasisSection(content);

  if (!s5) {
    return {
      filePath,
      pm_id: entityId,
      ok: deferred,
      reason: deferred ? "mechanistic_authoring_required" : "missing_mechanistic_basis",
      sectionNum: null,
      waived: deferred,
    };
  }

  const details = extractDetailsBody(s5.block);
  const bodyForPlaceholder =
    details || s5.block.replace(/^##\s+\d+\.\s+Mechanistic Basis\s*/m, "").trim();
  const placeholder = isPlaceholderMechanisticDetail(bodyForPlaceholder);

  if (placeholder && deferred) {
    return {
      filePath,
      pm_id: entityId,
      ok: true,
      reason: "mechanistic_authoring_required",
      sectionNum: s5.sectionNum,
      waived: true,
      detailsLength: details.length,
    };
  }

  return {
    filePath,
    pm_id: entityId,
    ok: !placeholder,
    reason: placeholder ? "placeholder_mechanistic_detail" : "ok",
    sectionNum: s5.sectionNum,
    waived: false,
    detailsLength: details.length,
  };
}

export function auditPmMechanisticBasis(filePath) {
  return auditOverlayMechanisticBasis(filePath, { idField: "pm_id" });
}

export function auditSmMechanisticBasis(filePath) {
  return auditOverlayMechanisticBasis(filePath, { idField: "sm_id" });
}

/**
 * @param {{ heading: string, paragraphs: string[] }} block
 */
export function renderMechanisticBlock(block) {
  const lines = [`#### ${block.heading}`, ""];
  for (const p of block.paragraphs) {
    lines.push(p, "");
  }
  return lines.join("\n").trimEnd();
}

/**
 * @param {{
 *   summary: string,
 *   detailsTitle: string,
 *   blocks: Array<{ heading: string, paragraphs: string[] }>,
 *   closing?: string,
 * }} spec
 */
export function buildMechanisticBasisMarkdown(spec, sectionNum = 4) {
  const blocks = (spec.blocks || []).map(renderMechanisticBlock).join("\n\n");
  const closing = spec.closing
    ? `\n\n${spec.closing}`
    : "\n\nTogether, these relationships operationalise the mechanism at the meal and dietary-pattern level described in the BRAIN Diet model.";
  return `## ${sectionNum}. Mechanistic Basis

### Summary

${spec.summary.trim()}

${renderHubCollapsible(spec.detailsTitle, `${blocks}${closing}`)}
`;
}

/** @deprecated Use buildMechanisticBasisMarkdown */
export function buildSection5Markdown(spec) {
  return buildMechanisticBasisMarkdown(spec, 5);
}

export function replaceMechanisticBasisInContent(content, sectionMarkdown) {
  const s5 = extractMechanisticBasisSection(content);
  if (!s5) {
    throw new Error("Mechanistic Basis section not found in page body");
  }
  return (
    content.slice(0, s5.start) +
    sectionMarkdown.trimEnd() +
    "\n\n" +
    content.slice(s5.end).replace(/^\n+/, "")
  );
}

/** @deprecated Use replaceMechanisticBasisInContent */
export function replaceSection5InContent(content, section5Markdown) {
  return replaceMechanisticBasisInContent(content, section5Markdown);
}

export function applyMechanisticBasisToFile(filePath, spec, { dryRun = false } = {}) {
  const { data, content } = readPmPage(filePath);
  const existing = extractMechanisticBasisSection(content);
  const sectionNum = existing?.sectionNum ?? (data.intervention_breakdown ? 4 : 2);
  const next = replaceMechanisticBasisInContent(content, buildMechanisticBasisMarkdown(spec, sectionNum));
  if (!dryRun) writePmPage(filePath, data, next);
  return { filePath, pm_id: data.pm_id, dryRun };
}

/**
 * Apply spreadsheet rows that include mechanistic_detail.
 * @param {Array<Record<string, unknown>>} rows
 */
export function applyFromSpreadsheetRows(rows, { rootDir = process.cwd(), dryRun = false } = {}) {
  const byId = new Map();
  for (const row of rows) {
    if (row.pm_id) byId.set(String(row.pm_id), row);
  }
  const results = [];
  for (const filePath of listPmMdxFiles(rootDir)) {
    const { data } = readPmPage(filePath);
    const row = data.pm_id ? byId.get(data.pm_id) : null;
    if (!row?.mechanistic_detail?.blocks?.length) {
      results.push({
        filePath,
        pm_id: data.pm_id,
        applied: false,
        reason: "no_mechanistic_detail_in_spreadsheet_row",
      });
      continue;
    }
    const md = row.mechanistic_detail;
    applyMechanisticBasisToFile(
      filePath,
      {
        summary: md.summary || row.summary || data.summary,
        detailsTitle: md.details_title || md.detailsTitle || "Mechanistic detail",
        blocks: md.blocks,
        closing: md.closing,
      },
      { dryRun },
    );
    results.push({ filePath, pm_id: data.pm_id, applied: true, reason: "ok" });
  }
  return results;
}

export function auditAllPmPages(rootDir = process.cwd()) {
  return listPmMdxFiles(rootDir).map(auditPmMechanisticBasis);
}

export function auditAllSmPages(rootDir = process.cwd()) {
  return listSmMdxFiles(rootDir).map(auditSmMechanisticBasis);
}
