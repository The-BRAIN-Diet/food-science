/**
 * Render System Optimisation Practices panel HTML for BRS hub pages.
 * Five nested category dropdowns; empty categories show "Coming soon".
 * @see scripts/data/brs-hub-optimisation-levers.mjs
 */
import fs from "node:fs";
import {
  HUB_OPTIMISATION_LEVERS,
  SOP_CATEGORIES,
} from "../data/brs-hub-optimisation-levers.mjs";
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

function buildPmIndex(rootDir) {
  const pmIndex = new Map();
  for (const file of listPmMdxFiles(rootDir)) {
    const content = fs.readFileSync(file, "utf8");
    const { id, href } = parsePmMeta(content, file);
    pmIndex.set(id, { id, href });
  }
  return pmIndex;
}

/**
 * @param {import("../data/brs-hub-optimisation-levers.mjs").OptimisationLeverDef[]} curated
 * @param {Map<string, { id: string, href: string }>} pmIndex
 */
function resolveItems(curated, pmIndex) {
  return (curated || []).map((lever) => ({
    action: lever.action,
    explanation: lever.explanation,
    source_pms: (lever.match_pm_ids || [])
      .map((id) => pmIndex.get(id))
      .filter(Boolean),
  }));
}

function renderCategoryDropdown(category, items) {
  const body = items.length
    ? `<ul class="brs-hub-lever-list brs-hub-optimisation-list">\n${items.map(renderOptimisationItem).join("\n")}\n</ul>`
    : `<p class="brs-hub-optimisation-coming-soon"><em>Coming soon</em></p>`;

  return `<div class="brs-fm-hub-item brs-hub-sop-category" data-brs-fm-hub data-brs-sop-category="${escapeHtml(category.id)}">
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>${escapeHtml(category.title)}</strong>
</button>
<div class="brs-fm-hub-panel" hidden>
<p class="brs-hub-sop-category-desc">${escapeHtml(category.description)}</p>
${body}
</div>
</div>
</div>`;
}

/**
 * @param {string} brsId
 * @param {string} [rootDir]
 */
export function buildOptimisationLeversForHub(brsId, rootDir = process.cwd()) {
  const curated = HUB_OPTIMISATION_LEVERS[brsId];
  if (!curated) return [];

  const pmIndex = buildPmIndex(rootDir);
  /** @type {Array<{ action: string, explanation: string, source_pms: Array<{ id: string, href: string }> }>} */
  const flat = [];
  for (const category of SOP_CATEGORIES) {
    flat.push(...resolveItems(curated[category.id], pmIndex));
  }
  return flat;
}

/**
 * @param {string} brsId
 * @param {string} [rootDir]
 */
export function renderOptimisationLeversPanelHtml(brsId, rootDir = process.cwd()) {
  const curated = HUB_OPTIMISATION_LEVERS[brsId] || {};
  const pmIndex = buildPmIndex(rootDir);

  const intro = `<p class="brs-hub-sop-intro">Targeted interventions that may enhance biological system performance beyond foundational dietary guidance and lifestyle priorities. They complement — rather than replace — Key Constraints, Dietary Guidance and Lifestyle Priorities.</p>`;

  const categories = SOP_CATEGORIES.map((category) =>
    renderCategoryDropdown(category, resolveItems(curated[category.id], pmIndex)),
  ).join("\n");

  return `${intro}\n<div class="brs-hub-sop-categories" data-brs-sop-categories>\n${categories}\n</div>`;
}
