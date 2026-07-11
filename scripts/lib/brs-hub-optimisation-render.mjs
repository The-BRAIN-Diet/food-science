/**
 * Render Optimisation Levers panel HTML for BRS hub pages.
 * @see scripts/data/brs-hub-optimisation-levers.mjs
 */
import fs from "node:fs";
import { HUB_OPTIMISATION_LEVERS } from "../data/brs-hub-optimisation-levers.mjs";
import { listPmMdxFiles, parsePmMeta } from "./brs-hub-levers.mjs";

function escapeHtml(text) {
  return String(text || "").replace(/</g, "&lt;");
}

function renderPmTags(sourcePms) {
  if (!sourcePms?.length) return "";
  const tags = sourcePms
    .map((pm) => `<a href="${pm.href}" class="brs-hub-lever-pm">${escapeHtml(pm.id)}</a>`)
    .join(" ");
  return ` <span class="brs-hub-lever-pms">${tags}</span>`;
}

function renderOptimisationItem(item) {
  const body = `<p class="brs-hub-optimisation-text"><strong>${escapeHtml(item.action)}</strong> ${escapeHtml(item.explanation)}</p>`;
  const supports = item.source_pms?.length
    ? `<p class="brs-hub-optimisation-supports"><span class="brs-hub-optimisation-supports-label">Supports:</span>${renderPmTags(item.source_pms)}</p>`
    : "";
  return `<li class="brs-hub-optimisation-lever">${body}${supports}</li>`;
}

/**
 * @param {string} brsId
 * @param {string} [rootDir]
 * @returns {Array<{ action: string, explanation: string, source_pms: Array<{ id: string, href: string }> }>}
 */
export function buildOptimisationLeversForHub(brsId, rootDir = process.cwd()) {
  const curated = HUB_OPTIMISATION_LEVERS[brsId];
  if (!curated?.length) return [];

  const pmIndex = new Map();
  for (const file of listPmMdxFiles(rootDir)) {
    const content = fs.readFileSync(file, "utf8");
    const { id, href } = parsePmMeta(content, file);
    pmIndex.set(id, { id, href });
  }

  return curated.map((lever) => ({
    action: lever.action,
    explanation: lever.explanation,
    source_pms: (lever.match_pm_ids || [])
      .map((id) => pmIndex.get(id))
      .filter(Boolean),
  }));
}

/**
 * @param {string} brsId
 */
export function renderOptimisationLeversPanelHtml(brsId, rootDir = process.cwd()) {
  const levers = buildOptimisationLeversForHub(brsId, rootDir);
  if (!levers.length) {
    return `<p class="brs-hub-optimisation-empty"><em>No optimisation levers are curated for ${escapeHtml(brsId)} yet.</em></p>`;
  }
  const items = levers.map((item) => renderOptimisationItem(item)).join("\n");
  return `<ul class="brs-hub-lever-list brs-hub-optimisation-list">\n${items}\n</ul>`;
}
