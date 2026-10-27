import {canonicalContainsRelationships} from "./foodSubstanceRelationships.mjs"

/**
 * One-hop substance-to-substance relationships.
 * Food associations are generated from canonical contains edges. This is not a
 * traversal engine, and a related substance is never treated as contained.
 *
 * Generic fibre is intentionally absent: fibre content does not establish a
 * short-chain fatty acid. Pectin and the studied FOS/GOS preparation do not
 * establish a butyrate-specific yield, so they are not related-substance
 * pathways. A relationship is registered once here. Food rows are generated
 * only from verified contains records.
 */
export const RELATED_SUBSTANCE_RELATIONSHIPS = [
  {
    id: "resistant-starch-acetate",
    intermediate_id: "resistant-starch",
    intermediate_label: "Resistant starch",
    related_id: "acetate",
    related_label: "Acetate",
    related_href: "/docs/substances/microbial-metabolites/scfas/acetate",
    relationship: "microbial-production",
    relationship_label: "Microbial production",
    evidence: {
      citation_keys: ["fassler_resistant_starch_2006", "sobh_tolerability_2022"],
      statement:
        "Resistant-starch fermentation can yield acetate among the short-chain fatty acids produced in suitable communities.",
    },
    limitation:
      "The food's resistant-starch range is not an acetate concentration or yield. Community and preparation change the product mixture.",
  },
  {
    id: "resistant-starch-propionate",
    intermediate_id: "resistant-starch",
    intermediate_label: "Resistant starch",
    related_id: "propionate",
    related_label: "Propionate",
    related_href: "/docs/substances/microbial-metabolites/scfas/propionate",
    relationship: "microbial-production",
    relationship_label: "Microbial production",
    evidence: {
      citation_keys: ["fassler_resistant_starch_2006", "sobh_tolerability_2022"],
      statement:
        "Resistant-starch fermentation can yield propionate among the short-chain fatty acids produced in suitable communities.",
    },
    limitation:
      "The food's resistant-starch range is not a propionate concentration or yield. Community and preparation change the product mixture.",
  },
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

function containedAmount(frontMatter, edge) {
  const rows = Array.isArray(frontMatter?.nutrition_supplementary_sources)
    ? frontMatter.nutrition_supplementary_sources
    : []
  for (const row of rows) {
    if (!row || row.public_display === "internal-only") continue
    if (norm(row.label) !== norm(edge?.substance)) continue
    if (
      row.preparation_state &&
      edge?.preparation_state &&
      norm(row.preparation_state) !== norm(edge.preparation_state)
    ) continue
    const range = row.range
    if (!Array.isArray(range) || range.length !== 2 || range.some((value) => typeof value !== "number" || Number.isNaN(value))) continue
    const unit = String(row.unit || "").trim()
    const basis = String(row.basis || "").trim()
    return {
      display: [range[0] + "–" + range[1], unit, basis].filter(Boolean).join(" "),
      low: range[0],
      high: range[1],
      unit: unit || null,
      basis: basis || null,
      source_url: row.source_url || edge.source_url || null,
    }
  }
  const observation = (edge?.observations || []).find((item) => item?.verified && item.display)
  if (!observation) return null
  return {
    display: [observation.display, observation.basis].filter(Boolean).join(" "),
    low: Number.isFinite(observation.low) ? observation.low : null,
    high: Number.isFinite(observation.high) ? observation.high : null,
    unit: observation.unit || null,
    basis: observation.basis || null,
    source_url: observation.source_url || null,
  }
}

function associationFrom(edge, relationship, frontMatter) {
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
    limitation: [relationship.limitation, edge?.material_limitations, edge?.limitations, ...recordLimitations].filter(Boolean).join(" "),
    quantity: null,
    contained_amount: containedAmount(frontMatter, edge),
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
      rows.push(associationFrom(edge, relationship, frontMatter))
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

/** Indirect foods for an input. These rows are not composition quantities or contains edges. */
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
        if (food.substance_id !== item.intermediate_id || !canonicalContainsSource(food)) continue
        const key = [food.food_id, food.preparation || "", item.id].join(":")
        if (seen.has(key)) continue
        seen.add(key)
        rows.push({
          food_id: food.food_id,
          food_title: food.food_title,
          food_page: food.food_page,
          ...associationFrom(food, item, food),
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
      const amount = row.contained_amount?.display
        ? ` ${escapeHtml(row.intermediate_label)} ${escapeHtml(row.contained_amount.display)}`
        : ""
      return `<li data-related-source="true" data-quantity="none" data-related-quantity="none" title="${escapeHtml(title)}"><a href="${escapeHtml(row.food_page)}">${escapeHtml(row.food_title)}</a> — via ${escapeHtml(via)}${preparation}${amount}</li>`
    })
    .join("")
  return `<details class="pm-input-food-sources" data-food-source-kind="related"><summary><span class="pm-input-food-source-arrow" aria-hidden="true">▶</span>Related sources</summary><p>Indirect sources. These foods are not recorded as containing the input, and they are not ranked by amount.</p><ul>${items}</ul></details>`
}

/** Rank only comparable measurements of one contained upstream substance. */
export function relativeSourcePower(records, threshold = 10) {
  const groups = new Map()
  for (const record of records || []) {
    const amount = record.contained_amount
    if (!amount || !Number.isFinite(amount.low) || !amount.unit || !amount.basis) continue
    const key = [record.intermediate_id, amount.unit, amount.basis].join("|")
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(record)
  }
  return [...groups.entries()].map(([key, group]) => {
    const seen = new Set()
    const foods = group.filter((record) => {
      const id = [record.food_id, record.preparation || ""].join("|")
      if (seen.has(id)) return false
      seen.add(id)
      return true
    })
    const max = Math.max(...foods.map((record) => record.contained_amount.low))
    const ranked = foods
      .map((record) => ({
        ...record,
        relative_power: max > 0 ? (record.contained_amount.low / max) * 100 : 0,
      }))
      .filter((record) => record.relative_power >= threshold)
      .sort((a, b) => b.relative_power - a.relative_power)
    return {
      comparison_group: key,
      intermediate_id: foods[0].intermediate_id,
      related_id: null,
      threshold,
      ranked,
    }
  })
}

/** Separate roll-up class. Intermediate amounts are not added into the related substance. */
export function relatedSubstanceRollup(records) {
  const seen = new Set()
  const rows = []
  for (const record of records || []) {
    const key = [record.food_id, record.intermediate_id, record.related_id, record.preparation || ""].join("|")
    if (seen.has(key)) continue
    seen.add(key)
    rows.push({
      class: "related-substance",
      food_id: record.food_id,
      food_title: record.food_title,
      food_page: record.food_page,
      intermediate_id: record.intermediate_id,
      intermediate_label: record.intermediate_label,
      related_id: record.related_id,
      related_label: record.related_label,
      relationship: record.relationship,
      preparation: record.preparation || null,
      contained_amount: record.contained_amount || null,
      related_quantity: null,
      evidence: record.evidence || null,
      limitation: record.limitation || null,
      quantity_policy: "The contained amount belongs to the intermediate substance. Do not add intermediate amounts into the related substance, and do not count one food twice for the same pathway.",
    })
  }
  return rows
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
