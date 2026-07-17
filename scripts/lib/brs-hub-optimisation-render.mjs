/**
 * Render System Optimisation Practices panel HTML for BRS hub pages.
 * Five nested category dropdowns; empty categories show "Coming soon".
 * Conditional Supplementation merges curated items with KC §4 Emerging Biological Supports.
 * @see scripts/data/brs-hub-optimisation-levers.mjs
 * @see scripts/lib/kc-emerging-supports.mjs
 */
import fs from "node:fs";
import {
  HUB_OPTIMISATION_LEVERS,
  SOP_CATEGORIES,
} from "../data/brs-hub-optimisation-levers.mjs";
import { listPmMdxFiles, parsePmMeta } from "./brs-hub-levers.mjs";
import { collectEmergingSupportsForBrs } from "./kc-emerging-supports.mjs";

function escapeHtml(text) {
  return String(text || "").replace(/</g, "&lt;");
}

function normalizeKey(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function renderPmTags(sourcePms) {
  if (!sourcePms?.length) return "";
  const tags = sourcePms
    .map((pm) => `<a href="${pm.href}" class="brs-hub-lever-pm">${escapeHtml(pm.id)}</a>`)
    .join(" ");
  return ` <span class="brs-hub-lever-pms">${tags}</span>`;
}

function renderKcTags(sourceKcs) {
  if (!sourceKcs?.length) return "";
  const tags = sourceKcs
    .map((kc) => {
      const href = kc.anchor ? `${kc.href}#${kc.anchor}` : kc.href;
      const label = kc.label || kc.id;
      return `<a href="${href}" class="brs-hub-lever-pm">${escapeHtml(label)}</a>`;
    })
    .join(" ");
  return ` <span class="brs-hub-lever-pms">${tags}</span>`;
}

function renderOptimisationItem(item) {
  const body = `<p class="brs-hub-optimisation-text"><strong>${escapeHtml(item.action)}</strong> ${escapeHtml(item.explanation)}</p>`;
  const supportTags = `${renderKcTags(item.source_kcs)}${renderPmTags(item.source_pms)}`;
  const supports = supportTags.trim()
    ? `<p class="brs-hub-optimisation-supports"><span class="brs-hub-optimisation-supports-label">Supports:</span>${supportTags}</p>`
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
    source_kcs: [],
  }));
}

function substanceKey(actionOrName) {
  return normalizeKey(
    String(actionOrName || "")
      .replace(/^consider\s+/i, "")
      .replace(/\s+under selected(?:\s+high-demand or low-intake)?\s+conditions\.?$/i, "")
      .replace(/\s+under selected conditions\.?$/i, ""),
  );
}

/**
 * @param {string} brsId
 * @param {string} rootDir
 * @param {ReturnType<typeof resolveItems>} curatedItems
 */
function mergeConditionalSupplementation(brsId, rootDir, curatedItems) {
  const fromKc = collectEmergingSupportsForBrs(brsId, rootDir).map((entry) => ({
    action: entry.action,
    explanation: entry.explanation,
    source_pms: [],
    source_kcs: entry.kc_id
      ? [
          {
            id: entry.kc_id,
            href: entry.kc_href,
            anchor: entry.kc_anchor,
            label: entry.kc_link_label,
            title: entry.kc_title,
          },
        ]
      : [],
    _dedupe: substanceKey(entry.name || entry.action),
  }));

  const curated = curatedItems.map((item) => ({
    ...item,
    _dedupe: substanceKey(item.action),
  }));

  /** @type {Map<string, (typeof fromKc)[number]>} */
  const merged = new Map();
  for (const item of fromKc) {
    if (item._dedupe) merged.set(item._dedupe, item);
  }
  for (const item of curated) {
    const existing = merged.get(item._dedupe);
    if (existing) {
      const pmIds = new Set(existing.source_pms.map((pm) => pm.id));
      const kcIds = new Set(existing.source_kcs.map((kc) => kc.id));
      merged.set(item._dedupe, {
        ...existing,
        // Prefer KC-authored explanation when both exist.
        source_pms: [
          ...existing.source_pms,
          ...item.source_pms.filter((pm) => !pmIds.has(pm.id)),
        ],
        source_kcs: [
          ...existing.source_kcs,
          ...item.source_kcs.filter((kc) => !kcIds.has(kc.id)),
        ],
      });
    } else {
      merged.set(item._dedupe || item.action, item);
    }
  }

  return [...merged.values()].map(({ _dedupe, ...item }) => item);
}

function renderCategoryDropdown(category, items) {
  const populated = items.length > 0;
  const body = populated
    ? `<ul class="brs-hub-lever-list brs-hub-optimisation-list">\n${items.map(renderOptimisationItem).join("\n")}\n</ul>`
    : `<p class="brs-hub-optimisation-coming-soon"><em>Coming soon</em></p>`;

  return `<div class="brs-fm-hub-item brs-hub-sop-category" data-brs-fm-hub data-brs-sop-category="${escapeHtml(category.id)}"${populated ? ' data-brs-sop-populated="true"' : ""}>
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
export function buildCategoryItemsForHub(brsId, rootDir = process.cwd()) {
  const curated = HUB_OPTIMISATION_LEVERS[brsId] || {};
  const pmIndex = buildPmIndex(rootDir);
  /** @type {Record<string, ReturnType<typeof resolveItems>>} */
  const byCategory = {};

  for (const category of SOP_CATEGORIES) {
    let items = resolveItems(curated[category.id], pmIndex);
    if (category.id === "conditional_supplementation") {
      items = mergeConditionalSupplementation(brsId, rootDir, items);
    }
    byCategory[category.id] = items;
  }
  return byCategory;
}

/**
 * @param {string} brsId
 * @param {string} [rootDir]
 */
export function buildOptimisationLeversForHub(brsId, rootDir = process.cwd()) {
  const byCategory = buildCategoryItemsForHub(brsId, rootDir);
  /** @type {Array<{ action: string, explanation: string, source_pms: Array<{ id: string, href: string }> }>} */
  const flat = [];
  for (const category of SOP_CATEGORIES) {
    flat.push(...(byCategory[category.id] || []));
  }
  return flat;
}

/**
 * @param {string} brsId
 * @param {string} [rootDir]
 */
export function renderOptimisationLeversPanelHtml(brsId, rootDir = process.cwd()) {
  const byCategory = buildCategoryItemsForHub(brsId, rootDir);

  const intro = `<p class="brs-hub-sop-intro">Targeted interventions that may enhance biological system performance beyond foundational dietary guidance and lifestyle priorities. They complement — rather than replace — Key Constraints, Dietary Guidance and Lifestyle Priorities.</p>`;

  const categories = SOP_CATEGORIES.map((category) =>
    renderCategoryDropdown(category, byCategory[category.id] || []),
  ).join("\n");

  return `${intro}\n<div class="brs-hub-sop-categories" data-brs-sop-categories>\n${categories}\n</div>`;
}
