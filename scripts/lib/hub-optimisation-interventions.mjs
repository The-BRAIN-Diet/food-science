/**
 * Canonical hub System Optimisation interventions and qualified cross-BRS PM relationships.
 * @see scripts/data/brs-hub-optimisation-levers.mjs
 */
import fs from "node:fs";
import {
  HUB_OPTIMISATION_LEVERS,
  SOP_CATEGORIES,
} from "../data/brs-hub-optimisation-levers.mjs";
import { HUB_PAGES } from "./brs-hub-levers.mjs";
import { listPmMdxFiles, parsePmMeta } from "./brs-hub-levers.mjs";
import { loadBibIndex } from "./bib-citation-format.mjs";

/** @typedef {{ target_pm_id: string, context?: string, evidence?: { status?: string, level?: string, citation_keys?: string[], limitation?: string } }} HubOptimisationRelationship */

/**
 * @param {import("../data/brs-hub-optimisation-levers.mjs").OptimisationLeverDef} lever
 * @returns {HubOptimisationRelationship[]}
 */
export function normalizeRelationships(lever) {
  if (Array.isArray(lever.relationships) && lever.relationships.length > 0) {
    return lever.relationships.map((rel) => ({
      target_pm_id: rel.target_pm_id,
      context: rel.context,
      evidence: rel.evidence,
    }));
  }
  return (lever.match_pm_ids || []).map((target_pm_id) => ({ target_pm_id }));
}

/** @param {HubOptimisationRelationship} rel */
export function isQualifiedRelationship(rel) {
  return Boolean(rel.context || rel.evidence);
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

function hubDocsHref(authorBrsId) {
  const rel = HUB_PAGES[authorBrsId];
  if (!rel) return null;
  return `/docs/biological-targets/${rel.replace(/^docs\/biological-targets\//, "").replace(/\.md$/, "")}`;
}

function categoryTitle(categoryId) {
  return SOP_CATEGORIES.find((c) => c.id === categoryId)?.title || categoryId;
}

function formatCitationRefs(citationKeys, bibIndex) {
  return (citationKeys || []).map((key) => {
    const entry = bibIndex.get(key);
    const label = entry?.label || key;
    return {
      citation_key: key,
      label,
      href: `/docs/papers/BRAIN-Diet-References#${key}`,
    };
  });
}

/**
 * @param {import("../data/brs-hub-optimisation-levers.mjs").OptimisationLeverDef} lever
 * @param {Map<string, { id: string, href: string }>} pmIndex
 */
export function resolveLeverItem(lever, pmIndex) {
  const relationships = normalizeRelationships(lever);
  const standard = relationships.filter((rel) => !isQualifiedRelationship(rel));
  const qualified = relationships.filter((rel) => isQualifiedRelationship(rel));

  return {
    id: lever.id,
    action: lever.action,
    explanation: lever.explanation,
    source_pms: standard
      .map((rel) => pmIndex.get(rel.target_pm_id))
      .filter(Boolean),
    qualified_relationships: qualified.map((rel) => ({
      target_pm_id: rel.target_pm_id,
      target_pm: pmIndex.get(rel.target_pm_id) || null,
      context: rel.context,
      evidence: rel.evidence,
    })),
    source_kcs: [],
  };
}

/**
 * Derived qualified interventions for PM §3.2 / §4.2 (not hub authorship).
 * @param {string} pmId
 * @param {string} [rootDir]
 */
export function getDerivedInterventionsForPm(pmId, rootDir = process.cwd()) {
  const pmIndex = buildPmIndex(rootDir);
  const bibIndex = loadBibIndex();
  /** @type {Array<Record<string, unknown>>} */
  const derived = [];

  for (const [authorBrsId, categories] of Object.entries(HUB_OPTIMISATION_LEVERS)) {
    for (const category of SOP_CATEGORIES) {
      for (const lever of categories[category.id] || []) {
        for (const rel of normalizeRelationships(lever)) {
          if (rel.target_pm_id !== pmId || !isQualifiedRelationship(rel)) continue;
          derived.push({
            intervention_id: lever.id || null,
            author_brs_id: authorBrsId,
            category_id: category.id,
            category_title: categoryTitle(category.id),
            author_hub_href: hubDocsHref(authorBrsId),
            action: lever.action,
            explanation: lever.explanation,
            presentation_role: "upstream_metabolic_intervention",
            is_direct_dietary_lever: false,
            context: rel.context || "",
            evidence: rel.evidence
              ? {
                  status: rel.evidence.status || "",
                  level: rel.evidence.level || "",
                  limitation: rel.evidence.limitation || "",
                  references: formatCitationRefs(rel.evidence.citation_keys, bibIndex),
                }
              : null,
            target_pm_id: rel.target_pm_id,
            target_pm_href: pmIndex.get(rel.target_pm_id)?.href || null,
          });
        }
      }
    }
  }

  return derived;
}

/**
 * @param {string} [rootDir]
 */
export function buildPmSopDerivedInterventionsIndex(rootDir = process.cwd()) {
  const pmIndex = buildPmIndex(rootDir);
  /** @type {Record<string, ReturnType<typeof getDerivedInterventionsForPm>>} */
  const byPmId = {};

  for (const { id } of pmIndex.values()) {
    const rows = getDerivedInterventionsForPm(id, rootDir);
    if (rows.length > 0) byPmId[id] = rows;
  }

  return { byPmId, generated_at: new Date().toISOString() };
}

/**
 * Find canonical ketogenic lever (single authorship in BRS4).
 */
export function getStructuredKetogenicLever() {
  const levers = HUB_OPTIMISATION_LEVERS.BRS4?.dietary_protocols || [];
  return levers.find((l) => l.id === "structured-ketogenic-approaches") || null;
}
