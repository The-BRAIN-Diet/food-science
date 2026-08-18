/**
 * Letter-audit editorial record schema (rules, not presentation).
 * Do not fill the next letter batch from a schema update.
 * Do not replace the Author (Year) and linked-title bibliographic core.
 */
export const FOOD_PAGE_ROLES = Object.freeze([
  "distinctive",
  "matrix-preparation",
  "dietary-pattern",
  "culinary-support",
  "review-inclusion",
])

export const FOOD_PAGE_EVIDENCE_TYPES = Object.freeze([
  "direct-food",
  "characteristic-substance",
  "preparation",
  "composition",
  "generic-context",
  "recipe-context",
  "mismatched",
])

export const FOOD_PAGE_DEPTHS = Object.freeze(["short", "standard", "extended"])

export const CITATION_CORRECTNESS_STATES = Object.freeze(["exact-key", "needs-join-repair"])

/** Relevance-queue numeric class → editorial evidence type. Join success is a separate check. */
export const RELEVANCE_QUEUE_TO_EVIDENCE_TYPE = Object.freeze({
  1: "direct-food",
  2: "characteristic-substance",
  3: "preparation",
  4: "generic-context",
  5: "recipe-context",
  6: "mismatched",
})

export const EDITORIAL_AUDIT_RECORDS_REL = "scripts/data/food-editorial-audit-records.json"
export const LETTER_AUDIT_SCHEMA_REL = "system/food-page-letter-audit-schema.md"

export function emptyEditorialRecord({ slug = "", title = "", letter = "" } = {}) {
  return {
    slug,
    title,
    letter,
    role: null,
    meaningful_reference_count: null,
    evidence_types: [],
    distinctive_story_or_inclusion_reason: null,
    missing_research: [],
    destined_for_substance_or_brs_matrix: [],
    recommended_depth: null,
    citation_correctness: null,
    filled: false,
  }
}

export function formatEditorialSchemaSummary() {
  return [
    "Food-page letter-audit editorial schema (read-only; does not rewrite pages or start a letter batch).",
    `Roles: ${FOOD_PAGE_ROLES.join(" / ")}`,
    `Evidence types: ${FOOD_PAGE_EVIDENCE_TYPES.join(" / ")}`,
    `Recommended depth: ${FOOD_PAGE_DEPTHS.join(" / ")}`,
    "Citation correctness and citation relevance are separate checks.",
    `Schema: ${LETTER_AUDIT_SCHEMA_REL}`,
  ].join("\n")
}
