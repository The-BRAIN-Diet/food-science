/**
 * Exact-food source matching and omega-3 identity.
 *
 * The rules under test are in `system/food-nutrition-schema.md`. They exist
 * because 99 pages published an amino acid as an omega-3 and five published
 * another food's entire panel; these assertions are what stops either
 * returning quietly.
 */
import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"
import {
  SUBSTITUTED_RECORDS,
  checkExactFoodMatch,
  checkOmega3Identity,
} from "./lib/composition-provenance.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const readDoc = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8")

test("a record proven to describe a related food cannot be cited again", () => {
  const issues = checkExactFoodMatch(
    {nutrition_source: {fdc_id: 748278, database: "USDA FoodData Central"}},
    "mct-oil",
  )
  assert.ok(
    issues.some((i) => /748278.*Oil, canola.*substituted/.test(i)),
    `re-citing canola on the MCT oil page must fail: ${issues.join("; ")}`,
  )

  // The same id on a page it genuinely describes is not a fault.
  assert.deepEqual(checkExactFoodMatch({nutrition_source: {fdc_id: 748278}}, "rapeseed-oil"), [])
})

test("every substituted record names the food it actually describes", () => {
  for (const [slug, record] of Object.entries(SUBSTITUTED_RECORDS)) {
    assert.equal(typeof record.fdc_id, "number", `${slug} has no numeric record id`)
    assert.ok(record.describes, `${slug} does not say what the record describes`)
    assert.ok(record.identity_failure, `${slug} does not say which identity axis failed`)
  }
})

test("withdrawal takes the whole panel, not the nutrient that exposed it", () => {
  const partiallyWithdrawn = {
    composition_status: "withdrawn",
    composition_withdrawn: {
      withdrawn_record: "USDA FDC 2003603, 'Mushroom, beech'",
      reason: "a different species",
      queue: "system/specialist-composition-review-queue.md",
    },
    // The page dropped its ALA but kept everything else from the same record.
    nutrition_per_100g: {kcal: 33, protein_g: 2.18},
    nutrition_source: {database: "USDA FoodData Central", fdc_id: 2003603},
  }
  const issues = checkExactFoodMatch(partiallyWithdrawn, "reishi-mushroom")
  assert.ok(issues.some((i) => /still publishes quantitative values/.test(i)))
  assert.ok(issues.some((i) => /still cites the record/.test(i)))
})

test("a withdrawn page must stay legible about what it withdrew", () => {
  const issues = checkExactFoodMatch({composition_status: "withdrawn"}, "reishi-mushroom")
  assert.ok(issues.some((i) => /does not name the record/.test(i)))
  assert.ok(issues.some((i) => /does not say why/.test(i)))
  assert.ok(issues.some((i) => /review queue/.test(i)))
})

test("a withdrawn page cannot keep a quantity from the discredited record", () => {
  const issues = checkExactFoodMatch(
    {
      composition_status: "withdrawn",
      composition_withdrawn: {withdrawn_record: "x", reason: "y", queue: "z"},
      nutrition_supplementary_sources: [{key: "beta_glucans_mg", label: "Beta-glucans", value: 300}],
    },
    "turkey-tail-mushroom",
  )
  assert.ok(issues.some((i) => /beta_glucans_mg carries a quantity/.test(i)))
})

test("an omega-3 total must name its components and equal their sum", () => {
  const unnamed = checkOmega3Identity({nutrition_per_100g: {omega3_mg: 2507}})
  assert.ok(unnamed.some((i) => /names no components/.test(i)))

  const mismatched = checkOmega3Identity({
    nutrition_per_100g: {omega3_mg: 2507},
    omega3_components: [{nutrient: "dha_mg", identity: "22:6 n-3 (DHA)", amount_mg: 1000}],
  })
  assert.ok(mismatched.some((i) => /is not the sum of its components/.test(i)))

  const sound = checkOmega3Identity({
    nutrition_per_100g: {omega3_mg: 1983, ala_mg: 148},
    omega3_components: [
      {nutrient: "dha_mg", identity: "22:6 n-3 (DHA)", amount_mg: 1363},
      {nutrient: "epa_mg", identity: "20:5 n-3 (EPA)", amount_mg: 472},
      {nutrient: "ala_mg", identity: "18:3 n-3 (ALA)", amount_mg: 148},
    ],
  })
  assert.deepEqual(sound, [])
})

test("EPA + DHA is not a total omega-3 when the record identified more", () => {
  /*
   * The pair is its own quantity. Publishing it as the total silently drops the
   * ALA the same record reported, so the total no longer equals what it claims
   * to sum and the page fails rather than under-reporting.
   */
  const issues = checkOmega3Identity({
    nutrition_per_100g: {omega3_mg: 1835, ala_mg: 148},
    omega3_components: [
      {nutrient: "dha_mg", identity: "22:6 n-3 (DHA)", amount_mg: 1363},
      {nutrient: "epa_mg", identity: "20:5 n-3 (EPA)", amount_mg: 472},
    ],
  })
  assert.ok(issues.some((i) => /publishes ALA outside its own omega-3 total/.test(i)))
})

test("an unresolved 18:3 can never be summed into a total", () => {
  const issues = checkOmega3Identity({
    nutrition_per_100g: {omega3_mg: 957},
    omega3_components: [
      {nutrient: "pufa_18_3_unresolved_mg", identity: "18:3 n-3", amount_mg: 957},
    ],
  })
  assert.ok(issues.some((i) => /whose isomer was never stated/.test(i)))
})

test("a component that names no isomer is not an omega-3 measurement", () => {
  const issues = checkOmega3Identity({
    nutrition_per_100g: {omega3_mg: 40},
    omega3_components: [{nutrient: "ala_mg", identity: "alanine", amount_mg: 40}],
  })
  assert.ok(issues.some((i) => /names no n-3 isomer/.test(i)))
})

test("zero and missing are not measurements", () => {
  // A zero total is the shape an unanalysed nutrient took before the repair.
  const zero = checkOmega3Identity({
    nutrition_per_100g: {omega3_mg: 0},
    omega3_components: [{nutrient: "ala_mg", identity: "18:3 n-3 (ALA)", amount_mg: 0}],
  })
  assert.ok(zero.some((i) => /zero omega-3 total/.test(i)))

  // Absent is simply absent, and carries no components of its own.
  assert.deepEqual(checkOmega3Identity({nutrition_per_100g: {protein_g: 21}}), [])
  const orphaned = checkOmega3Identity({
    nutrition_per_100g: {},
    omega3_components: [{nutrient: "dha_mg", identity: "22:6 n-3 (DHA)", amount_mg: 10}],
  })
  assert.ok(orphaned.some((i) => /components with no total/.test(i)))
})

test("each rule has one canonical home and the others point at it", () => {
  /*
   * The rules are cheap to restate and expensive to keep in step, so each lives
   * in exactly one document and the rest link to it.
   */
  const nutrition = readDoc("system/food-nutrition-schema.md")
  const workflow = readDoc("system/nutrition-workflow.md")
  const recipe = readDoc("system/recipe-ingredient-schema.md")

  // Nutrient identity, omega-3 definitions and exact-food matching.
  assert.match(nutrition, /Alanine, beta-alanine and phenylalanine are amino acids/)
  assert.match(nutrition, /Stable source identifiers survive extraction and calculation/)
  assert.match(nutrition, /EPA \+ DHA must never be labelled total omega‑3/)
  assert.match(nutrition, /Combined provenance may publish USDA's 18:3 quantity as ALA/)
  assert.match(nutrition, /Do not present 55% of fatty acids as 55 g per 100 g whole seed/)

  // Source search and the fallback classes.
  assert.match(workflow, /Before recording "absent from USDA"/)
  assert.match(workflow, /Distinguish a failure from an absence/)
  assert.match(workflow, /When no exact USDA record exists/)

  // Recipe propagation and yield.
  assert.match(recipe, /### Propagation from corrected food data/)
  assert.match(recipe, /Regenerate; do not patch/)
  assert.match(recipe, /### Serving and yield integrity/)
  assert.match(recipe, /35–40 g protein per serving/)

  // Downstream documents reference rather than restate.
  for (const rel of ["system/food-page-model.md", "system/food-page-schema.md"]) {
    assert.match(readDoc(rel), /system\/food-nutrition-schema\.md/, `${rel} does not link the rules`)
  }
  for (const rel of ["system/food-page-model.md", "system/recipe-ingredient-schema.md"]) {
    assert.doesNotMatch(
      readDoc(rel),
      /Alanine, beta-alanine and phenylalanine are amino acids/,
      `${rel} restates the identity rule instead of linking it`,
    )
  }
})
