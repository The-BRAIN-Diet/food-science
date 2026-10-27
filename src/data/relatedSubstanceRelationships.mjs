import {canonicalContainsRelationships} from "./foodSubstanceRelationships.mjs"

/**
 * One-hop substance-to-substance relationships.
 * Food associations are generated from canonical contains edges. This is not a
 * traversal engine, and a related substance is never treated as contained.
 *
 * Generic fibre is intentionally absent: fibre content does not establish butyrate.
 * Pectin and the studied FOS/GOS preparation are absent because those records do
 * not establish a butyrate-specific relationship.
 */
export const RELATED_SUBSTANCE_RELATIONSHIPS = [
  {
    id: "resistant-starch-butyrate",
    intermediate_id: "resistant-starch",
    intermediate_label: "Resistant starch",
    related_id: "butyrate",
    related_label: "Butyrate",
    related_href: "/docs/substances/microbial-metabolites/scfas/butyrate",
    relationship: "microbial-production",
    relationship_label: "Microbial production",
    evidence: {
      citation_keys: ["baxter_fermentable_fibers_2019", "fassler_resistant_starch_2006"],
      statement:
        "Defined resistant-starch preparations can support microbial butyrate production in suitable communities.",
    },
    limitation:
      "A resistant-potato-starch response and RS2/RS3 culture results do not transfer to every ordinary food. No butyrate quantity or yield is assigned from the food's resistant-starch content.",
  },
  {
    id: "vitamin-a-retinoic-acid",
    intermediate_id: "vitamin-a",
    intermediate_label: "Vitamin A",
    related_id: "retinoic-acid",
    related_label: "Retinoic acid",
    related_href: "/docs/substances/nutrients/micronutrients/vitamins/retinoic-acid",
    relationship: "precursor-formation",
    relationship_label: "Precursor formation",
    evidence: {
      citation_keys: ["cantorna_vitamin_2019", "li_retinoid_junction_2017"],
      statement:
        "Dietary vitamin A supplies retinoids and provitamin A precursors that can support retinoic acid formation.",
    },
    limitation:
      "Conversion depends on vitamin A form, status, absorption and host context. Food vitamin A content is not a retinoic acid concentration.",
  },
]

export function relatedViaLabel(label) {
  return String(label || "").replace(/^[A-Z](?![A-Z])/, (letter) => letter.toLowerCase())
}

function norm(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function sameSubstance(left, right) {
  const a = norm(left)
  const b = norm(right)
  return Boolean(a) && a === b
}

function associationFrom(edge, relationship) {
  const recordLimitations = (edge?.presence_records || []).map((record) => record.limitations).filter(Boolean)
  return {
    intermediate_id: relationship.intermediate_id,
    intermediate_label: relationship.intermediate_label,
    related_id: relationship.related_id,
    related_label: relationship.related_label,
    related_href: relationship.related_href,
    relationship: relationship.relationship,
    relationship_label: relationship.relationship_label,
    preparation: edge?.preparation_state || edge?.preparation || null,
    evidence: relationship.evidence,
    limitation: [relationship.limitation, edge?.material_limitations, ...recordLimitations].filter(Boolean).join(" "),
    quantity: null,
    rank_eligible: false,
    direct_containment: false,
  }
}

/** Related substances for one food, generated from its canonical contains edges. */
export function relatedSubstancesForFood(frontMatter, catalog = RELATED_SUBSTANCE_RELATIONSHIPS) {
  const rows = []
  for (const edge of canonicalContainsRelationships(frontMatter)) {
    for (const relationship of catalog) {
      const matches =
        edge.substance_id === relationship.intermediate_id ||
        sameSubstance(edge.substance, relationship.intermediate_label)
      if (!matches) continue
      rows.push(associationFrom(edge, relationship))
    }
  }
  return rows
}

/** Food-level index. Passing a shorter catalog drops every association that depended on a removed relationship. */
export function buildRelatedSubstanceIndex(foods, catalog = RELATED_SUBSTANCE_RELATIONSHIPS) {
  const associations = []
  for (const food of foods || []) {
    const frontMatter = food.frontMatter || food
    const foodId = food.food_id || food.id || frontMatter.id || null
    for (const association of relatedSubstancesForFood(frontMatter, catalog)) {
      associations.push({
        food_id: foodId,
        food_title: food.food_title || food.title || frontMatter.title || foodId,
        food_page: food.food_page || food.permalink || null,
        ...association,
      })
    }
  }
  return associations.sort((a, b) =>
    String(a.food_title).localeCompare(String(b.food_title)) ||
    String(a.related_label).localeCompare(String(b.related_label)),
  )
}

function canonicalContainsSource(food) {
  if (food.mapping_status && food.mapping_status !== "verified") return false
  return (food.presence_records || []).some((record) => record.relationship_type === "contains")
}

/** Indirect foods for an admitted input. These rows are not composition quantities. */
export function relatedFoodsForInput(relationships, foodSources, catalog = RELATED_SUBSTANCE_RELATIONSHIPS) {
  const rows = []
  const seen = new Set()
  for (const relationship of relationships || []) {
    const matches = catalog.filter(
      (item) =>
        relationship.substance_id === item.related_id ||
        sameSubstance(relationship.input, item.related_label),
    )
    for (const item of matches) {
      for (const food of foodSources || []) {
        if (food.substance_id !== item.intermediate_id) continue
        if (!canonicalContainsSource(food)) continue
        const key = [food.food_id, food.preparation || "", item.id].join(":")
        if (seen.has(key)) continue
        seen.add(key)
        rows.push({
          food_id: food.food_id,
          food_title: food.food_title,
          food_page: food.food_page,
          ...associationFrom(food, item),
        })
      }
    }
  }
  return rows.sort((a, b) =>
    String(a.food_title).localeCompare(String(b.food_title)) ||
    String(a.preparation).localeCompare(String(b.preparation)),
  )
}

export function renderRelatedFoodSources(rows) {
  if (!rows?.length) return ""
  const items = rows
    .map((row) => {
      const via = relatedViaLabel(row.intermediate_label)
      const preparation = row.preparation ? ` (${escapeHtml(row.preparation)})` : ""
      const title = [row.limitation, ...(row.evidence?.citation_keys || [])].filter(Boolean).join(" ")
      return `<li data-related-source="true" data-quantity="none" title="${escapeHtml(title)}"><a href="${escapeHtml(row.food_page)}">${escapeHtml(row.food_title)}</a> — via ${escapeHtml(via)}${preparation}</li>`
    })
    .join("")
  return `<details class="pm-input-food-sources" data-food-source-kind="related"><summary><span class="pm-input-food-source-arrow" aria-hidden="true">▶</span>Related sources</summary><p>Indirect sources. These foods are not recorded as containing the input, and they are not ranked by amount.</p><ul>${items}</ul></details>`
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[character]))
}
