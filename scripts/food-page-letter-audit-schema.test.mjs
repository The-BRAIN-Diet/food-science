import test from "node:test"
import assert from "node:assert/strict"
import {
  CITATION_CORRECTNESS_STATES,
  FOOD_PAGE_DEPTHS,
  FOOD_PAGE_EVIDENCE_TYPES,
  FOOD_PAGE_ROLES,
  RELEVANCE_QUEUE_TO_EVIDENCE_TYPE,
  emptyEditorialRecord,
  formatEditorialSchemaSummary,
} from "./lib/food-page-letter-audit-schema.mjs"

test("letter-audit editorial schema enums match the documented record", () => {
  assert.deepEqual(FOOD_PAGE_ROLES, [
    "distinctive",
    "matrix-preparation",
    "dietary-pattern",
    "culinary-support",
    "review-inclusion",
  ])
  assert.deepEqual(FOOD_PAGE_EVIDENCE_TYPES, [
    "direct-food",
    "characteristic-substance",
    "preparation",
    "composition",
    "generic-context",
    "recipe-context",
    "mismatched",
  ])
  assert.deepEqual(FOOD_PAGE_DEPTHS, ["short", "standard", "extended"])
  assert.deepEqual(CITATION_CORRECTNESS_STATES, ["exact-key", "needs-join-repair"])
  assert.equal(RELEVANCE_QUEUE_TO_EVIDENCE_TYPE[4], "generic-context")
  assert.equal(RELEVANCE_QUEUE_TO_EVIDENCE_TYPE[6], "mismatched")
  const record = emptyEditorialRecord({ slug: "cucumber", title: "Cucumber", letter: "C" })
  assert.equal(record.filled, false)
  assert.equal(record.role, null)
  assert.equal(record.recommended_depth, null)
  const summary = formatEditorialSchemaSummary()
  assert.match(summary, /does not rewrite pages/)
  assert.match(summary, /Citation correctness and citation relevance are separate/)
})
