/**
 * Display-architecture pass: nutrition_per_100g is composition (A);
 * tags are not a vitamin/mineral whitelist (D). Tahini is the proof case.
 * Sample foods are regression-checked only — do not rewrite them here.
 */
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {test} from "node:test"
import {fileURLToPath} from "node:url"
import matter from "gray-matter"
import {
  MICRONUTRIENT_KEYS,
  NUTRIENT_LABELS,
  editorialSubstanceTags,
  isKeyFoodMicronutrient,
  isPublicTableKey,
  labelsOverlap,
  tableBackedLabels,
} from "./lib/food-truth-levels.mjs"
import {calculateRecipeNutrition} from "../src/utils/recipeNutritionCalculate.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const FOODS_DIR = path.join(ROOT, "docs/foods")
const SAMPLE_SLUGS = [
  "tahini",
  "almonds",
  "spinach",
  "extra-virgin-olive-oil",
  "beetroot",
]

function loadFood(slug) {
  const raw = fs.readFileSync(path.join(FOODS_DIR, `${slug}.md`), "utf8")
  const {data} = matter(raw)
  return data
}

function loadFoodDocs() {
  return fs
    .readdirSync(FOODS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const {data} = matter(fs.readFileSync(path.join(FOODS_DIR, f), "utf8"))
      const id = data.id || path.basename(f, ".md")
      return {
        title: data.title || id,
        permalink: `/docs/foods/${id}`,
        frontMatter: data,
        tags: (data.tags || []).map((label) => ({label})),
      }
    })
}

function keyMicronutrients(fm) {
  return MICRONUTRIENT_KEYS.filter((key) => isKeyFoodMicronutrient(fm, key))
}

function publicMicronutrients(fm) {
  return MICRONUTRIENT_KEYS.filter((key) => isPublicTableKey(fm, key))
}

function stripMicronutrientTags(fm) {
  const tags = Array.isArray(fm.tags) ? fm.tags : []
  const stripped = tags.filter((tag) => {
    const label = typeof tag === "string" ? tag : tag?.label
    if (!label) return true
    return !MICRONUTRIENT_KEYS.some((key) =>
      labelsOverlap(label, NUTRIENT_LABELS[key]?.label || key),
    )
  })
  return {...fm, tags: stripped}
}

test("schema documents A/B/C/D and forbids tags as a nutrition-table whitelist", () => {
  const schema = fs.readFileSync(path.join(ROOT, "system/food-page-schema.md"), "utf8")
  const nutrition = fs.readFileSync(path.join(ROOT, "system/food-nutrition-schema.md"), "utf8")
  const shapes = fs.readFileSync(path.join(ROOT, "system/food-page-frontmatter-shapes.md"), "utf8")
  const foodsRule = fs.readFileSync(path.join(ROOT, "docs/foods/.cursor/rules/Foods-Pages.mdc"), "utf8")

  assert.match(schema, /A\/B\/C\/D/)
  assert.match(schema, /A Composition/)
  assert.match(schema, /B Ontology/)
  assert.match(schema, /C Evidence/)
  assert.match(schema, /D Presentation/)
  assert.match(schema, /Tags must not determine D for vitamins and minerals/)
  assert.match(nutrition, /Tags are not a whitelist/)
  assert.match(nutrition, /nutrition_per_100g` is the only quantitative composition store/)
  assert.match(shapes, /Do not tag nutrients in order for them to appear/)
  assert.match(foodsRule, /Do not tag nutrients in order for them to appear in the nutrition table/)
  assert.doesNotMatch(nutrition, /Untagged micronutrients and bioactives in `nutrition_per_100g` remain \*\*internal\*\*/)
})

test("tahini Key vitamins come from composition, not mineral tags", () => {
  const tahini = loadFood("tahini")
  const tags = editorialSubstanceTags(tahini)
  const withoutMineralTags = stripMicronutrientTags(tahini)

  assert.equal(tahini.nutrition_per_100g.copper_mg, 1.61)
  assert.equal(tahini.nutrition_per_100g.phosphorus_mg, 732)
  assert.equal(tahini.nutrition_per_100g.iron_mg, 8.95)
  assert.equal(tahini.nutrition_per_100g.vitamin_b1_mg, 1.22)
  assert.equal(tahini.nutrition_per_100g.oleic_g, 20.045)

  for (const key of ["copper_mg", "phosphorus_mg", "iron_mg", "vitamin_b1_mg"]) {
    assert.equal(isKeyFoodMicronutrient(tahini, key), true, `${key} must be a Key row`)
    assert.equal(
      isKeyFoodMicronutrient(withoutMineralTags, key),
      true,
      `${key} must remain Key after mineral tags are removed`,
    )
  }

  assert.ok(tags.includes("Calcium"), "Calcium remains an intentional Substance relationship")
  assert.ok(!tags.includes("Copper"), "Copper must not be tagged merely to appear in the table")
  assert.ok(!tags.includes("Phosphorus"))
  assert.ok(!tags.includes("Iron"))
  assert.ok(!tags.includes("Vitamin B1"))

  const labels = tableBackedLabels(tahini)
  assert.ok(labels.some((label) => labelsOverlap(label, "Copper")), "untagged Copper is still a table row")
  assert.ok(labels.some((label) => labelsOverlap(label, "Calcium")), "tagged Calcium is a table row")
  assert.ok(tags.includes("Sesamin"))
  assert.ok(tags.includes("Sesamolin"))
  assert.ok(tags.includes("Linoleic Acid"))
  assert.ok(tags.includes("Oleic Acid"))

  const keySet = new Set(keyMicronutrients(tahini))
  assert.ok(keySet.has("selenium_ug"))
  assert.ok(keySet.has("manganese_mg"))
  assert.ok(keySet.has("zinc_mg"))
  assert.equal(isKeyFoodMicronutrient(tahini, "vitamin_b5_mg"), false, "B5 is below 15% RI")
  assert.equal(isPublicTableKey(tahini, "vitamin_b5_mg"), true, "B5 remains a rendered Advanced row")
})

test("sample foods keep core tables and tagged Substance rows without using tags as a Key whitelist", () => {
  const edgeCases = []

  for (const slug of SAMPLE_SLUGS) {
    const fm = loadFood(slug)
    const stripped = stripMicronutrientTags(fm)
    const nutrition = fm.nutrition_per_100g || {}

    const corePresent = ["kcal", "protein_g", "fat_g"].filter(
      (key) => typeof nutrition[key] === "number",
    )
    assert.ok(corePresent.length > 0, `${slug} must still have a composition panel`)
    for (const key of corePresent) {
      assert.equal(isPublicTableKey(fm, key), true, `${slug} ${key} remains a public core row`)
    }

    const liveKey = keyMicronutrients(fm)
    const strippedKey = keyMicronutrients(stripped)
    assert.deepEqual(
      liveKey,
      strippedKey,
      `${slug} Key vitamins must not depend on mineral tags`,
    )

    for (const tag of editorialSubstanceTags(fm)) {
      const matchingKey = MICRONUTRIENT_KEYS.find((key) =>
        labelsOverlap(tag, NUTRIENT_LABELS[key]?.label || key),
      )
      if (!matchingKey) continue
      if (typeof nutrition[matchingKey] !== "number" || nutrition[matchingKey] <= 0) continue
      assert.equal(
        isPublicTableKey(fm, matchingKey),
        true,
        `${slug} tagged ${tag} must remain a rendered row so the Substance card survives`,
      )
    }

    const gained = liveKey.filter((key) => {
      const label = NUTRIENT_LABELS[key]?.label || key
      return !editorialSubstanceTags(fm).some((tag) => labelsOverlap(tag, label))
    })
    const movedToAdvanced = editorialSubstanceTags(fm).filter((tag) => {
      const matchingKey = MICRONUTRIENT_KEYS.find((key) =>
        labelsOverlap(tag, NUTRIENT_LABELS[key]?.label || key),
      )
      if (!matchingKey) return false
      return isPublicTableKey(fm, matchingKey) && !isKeyFoodMicronutrient(fm, matchingKey)
    })
    if (gained.length || movedToAdvanced.length) {
      edgeCases.push({
        slug,
        untaggedKeyRows: gained,
        taggedNowAdvanced: movedToAdvanced,
      })
    }
  }

  assert.ok(edgeCases.length >= 1, "sample should surface at least one presentation-only edge case")
})

test("Caesar composition is unchanged except tahini oleic", () => {
  const raw = fs.readFileSync(
    path.join(ROOT, "docs/recipes/Lunch/mixed-leaf-tahini-caesar-salad.md"),
    "utf8",
  )
  const {data} = matter(raw)
  const result = calculateRecipeNutrition(data, loadFoodDocs())
  assert.equal(result.status, "calculated")

  const tahini = result.audit.find((row) => row.food_slug === "tahini")
  assert.ok(tahini)
  assert.equal(tahini.weight_g, 30)
  assert.ok(Math.abs(tahini.contributions.copper_mg - 1.61 * 0.3) < 1e-9)
  assert.ok(Math.abs(tahini.contributions.phosphorus_mg - 732 * 0.3) < 1e-9)
  assert.ok(Math.abs(tahini.contributions.iron_mg - 8.95 * 0.3) < 1e-9)
  assert.ok(Math.abs(tahini.contributions.vitamin_b1_mg - 1.22 * 0.3) < 1e-9)
  assert.ok(Math.abs(tahini.contributions.oleic_g - 20.045 * 0.3) < 1e-9)
})
