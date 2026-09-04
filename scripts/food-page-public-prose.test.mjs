import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {
  extractPublicEditorialProse,
  findPublicProseAdminLanguage,
} from "./lib/food-page-public-prose.mjs"
import { slugsForLetters } from "./lib/food-page-letter-schedule.mjs"
import { FOODS_DIR_DEFAULT } from "./lib/food-page-validation.mjs"

const FOODS_DIR = path.resolve(FOODS_DIR_DEFAULT)

function readFood(slug) {
  return fs.readFileSync(path.join(FOODS_DIR, `${slug}.md`), "utf8")
}

test("editorial extraction excludes front matter, source notes, recipes and bibliography", () => {
  const raw = readFood("beetroot")
  const prose = extractPublicEditorialProse(raw)
  assert.match(prose, /## Overview/)
  assert.match(prose, /## Food Context/)
  assert.doesNotMatch(prose, /USDA FoodData Central/)
  assert.doesNotMatch(prose, /A comparable quantity is not established here/)
  assert.doesNotMatch(prose, /Schroeter/)
  assert.doesNotMatch(prose, /FoodRecipes/)
  assert.doesNotMatch(prose, /## References/)
})

test("admin-language finder flags Overview commentary and ignores provenance fields", () => {
  const flagged = findPublicProseAdminLanguage(`---
nutrition_source:
  database: USDA FoodData Central
  fdc_id: 169145
nutrition_supplementary_sources:
  - source_note: A comparable quantity is not established here.
---
## Overview

Nitrate is present; USDA does not quantify it.

## Recipes
`)
  assert.equal(flagged.some((hit) => hit.id === "usda"), true)
  assert.equal(flagged.some((hit) => hit.id === "does-not-quantify"), true)

  const beetrootHits = findPublicProseAdminLanguage(readFood("beetroot"))
  assert.deepEqual(beetrootHits, [])
})

test("B-food public editorial prose has no composition-administration language", () => {
  const slugs = slugsForLetters(FOODS_DIR_DEFAULT, ["B"])
  assert.ok(slugs.length >= 15, `expected B foods, got ${slugs.join(", ")}`)
  const failures = []
  for (const slug of slugs) {
    const hits = findPublicProseAdminLanguage(readFood(slug))
    if (hits.length) {
      failures.push(`${slug}: ${hits.map((h) => `${h.id}="${h.match}"`).join("; ")}`)
    }
  }
  assert.deepEqual(failures, [])
})

test("B-food pages omit Highlights or use the canonical Other Nutritional Highlights heading", () => {
  const slugs = slugsForLetters(FOODS_DIR_DEFAULT, ["B"])
  for (const slug of slugs) {
    const body = readFood(slug).replace(/^---[\s\S]*?---\n/, "")
    assert.doesNotMatch(body, /^##\s+Key Nutritional Highlights\s*$/m, slug)
    assert.doesNotMatch(body, /^##\s+Nutritional Highlights\s*$/m, slug)
  }
})
