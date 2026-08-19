import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {test} from "node:test"
import {fileURLToPath} from "node:url"
import matter from "gray-matter"
import {
  ALL_CALC_KEYS,
  KEY_MICRONUTRIENT_DISPLAY_PERCENT,
  MAX_KEY_MICRONUTRIENTS,
  PUBLIC_BRAIN_KEYS,
  UNRESOLVED_FATTY_ACID_KEYS,
  PENDING_NUTRITION_MESSAGE,
  PUBLIC_CONTRIBUTORS_PER_ROW,
  PUBLIC_CORE_KEYS,
  PUBLIC_MICRONUTRIENT_KEYS,
  calculateRecipeNutrition,
  canCalculateDefault,
  completeNutrientDataset,
  defaultCombination,
  isDefaultIncluded,
  isKeyMicronutrient,
  materialContributors,
  meetsKeyMicronutrientThreshold,
  normalizeRecipeIngredients,
  resolveFoodDoc,
  scaleNutrient,
  selectKeyMicronutrients,
  selectPublicRows,
} from "../src/utils/recipeNutritionCalculate.mjs"
import {
  NUTRIENT_REFERENCES,
  exceedsUpperLimit,
  percentOfReference,
  referenceBasis,
  referenceBasisLabel,
} from "../src/utils/nutrientReference.mjs"
import {
  conciseCompositionRecord,
  displayPercent,
  formatAmount,
  formatPercent,
  roundForDisplay,
} from "../src/utils/nutrientDisplay.mjs"
import {
  PENDING_MATRIX_MESSAGE,
  isRecipeMatrixValidated,
} from "../src/utils/recipeMatrixGate.mjs"
import {NUTRIENT_LABELS} from "./lib/food-truth-levels.mjs"
import {SUBSTITUTED_RECORDS, checkExactFoodMatch} from "./lib/composition-provenance.mjs"
import {RECIPE_COMPOSITION_SNAPSHOTS} from "../src/data/recipeCompositionSnapshots.mjs"
import {extractNutrients} from "./lib/usda-nutrient-extract.mjs"
import {reconcileFoodPage} from "./lib/food-truth-reconciliation.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const FOODS_DIR = path.join(ROOT, "docs/foods")
const RECIPES_DIR = path.join(ROOT, "docs/recipes")

function loadFoodDocs() {
  return fs
    .readdirSync(FOODS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(FOODS_DIR, f), "utf8")
      const {data} = matter(raw)
      const slug = path.basename(f, ".md")
      return {
        title: data.title || slug,
        permalink: `/docs/foods/${data.id || slug}`,
        frontMatter: data,
        tags: (data.tags || []).map((label) => ({label})),
      }
    })
}

function walkMd(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walkMd(full, acc)
    else if (ent.name.endsWith(".md")) acc.push(full)
  }
  return acc
}

function loadRecipe(relOrName) {
  const name = relOrName || "Breakfast/Ginger Yogurt & Blueberry Bowl.md"
  const full = path.isAbsolute(name) ? name : path.join(RECIPES_DIR, name)
  const raw = fs.readFileSync(full, "utf8")
  return {raw, ...matter(raw), path: full}
}

const foodDocs = loadFoodDocs()
const bowl = loadRecipe()

test("100 g per linked food fallback is removed from RecipeFoods and docs", () => {
  const ui = fs.readFileSync(path.join(ROOT, "src/theme/RecipeFoods/index.tsx"), "utf8")
  const calc = fs.readFileSync(path.join(ROOT, "src/utils/recipeNutritionCalculate.mjs"), "utf8")
  const readme = fs.readFileSync(path.join(ROOT, "docs/system/nutrition-calculation/README.md"), "utf8")
  const rule = fs.readFileSync(path.join(ROOT, "docs/recipes/.cursor/rules/Recipe-Pages.mdc"), "utf8")
  assert.doesNotMatch(ui, /100 g per linked food/)
  assert.doesNotMatch(ui, /adds one full/)
  assert.doesNotMatch(ui, /used_default_100g/)
  assert.doesNotMatch(calc, /used_default_100g\s*=\s*true/)
  assert.match(calc, /100 g per linked food fallback is forbidden/)
  assert.doesNotMatch(ui, /PROTEIN_REF_G_PER_KG/)
  assert.match(readme, /pending ingredient-weight reconciliation/)
  assert.doesNotMatch(readme, /If `recipe_nutrition` is omitted, the recipe page falls back/)
  assert.match(rule, /Never render a quantitative recipe nutrition table/)
  assert.doesNotMatch(rule, /falls back to the legacy tag-sum/)
})

test("unresolved recipes must not render quantitative totals", () => {
  const pending = calculateRecipeNutrition({tags: ["Chia Seeds", "Walnuts"]}, foodDocs)
  assert.equal(pending.status, "pending")
  assert.equal(pending.pendingMessage, PENDING_NUTRITION_MESSAGE)
  assert.deepEqual(pending.perServing, {})
  assert.equal(canCalculateDefault([], foodDocs), false)
})

test("optional ingredients are excluded from the default total", () => {
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  assert.equal(result.status, "calculated")
  const cinnamon = result.audit.find((row) => /cinnamon/i.test(row.food || "") || /cinnamon/i.test(row.display || ""))
  assert.equal(cinnamon, undefined)
  const optional = normalizeRecipeIngredients(bowl.data).ingredients.filter((i) => !isDefaultIncluded(i))
  assert.equal(optional.length, 1)
  assert.equal(optional[0].food_slug, "cinnamon")
  assert.equal(
    Object.keys(result.byFood.kcal || {}).some((name) => /cinnamon/i.test(name)),
    false,
  )
})

test("composite mixed seeds are 3 g each, not one full portion per seed", () => {
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  const seedRows = result.audit.filter((row) =>
    ["Chia Seeds", "Flax Seeds", "Pumpkin Seeds"].includes(row.food),
  )
  assert.equal(seedRows.length, 3)
  for (const row of seedRows) {
    assert.equal(row.weight_g, 3)
  }
  const chiaKcal = seedRows.find((r) => r.food === "Chia Seeds").contributions.kcal
  const chiaPer100 = foodDocs.find((d) => d.frontMatter.id === "chia-seeds").frontMatter.nutrition_per_100g.kcal
  assert.ok(Math.abs(chiaKcal - chiaPer100 * 0.03) < 1e-9)
  assert.ok(chiaKcal < chiaPer100 * 0.5)
  const flaxAla = seedRows.find((r) => r.food === "Flax Seeds").contributions.ala_mg
  assert.ok(Math.abs(flaxAla - 22813 * 0.03) < 1e-6, "recipes consume flax's interpreted ALA")
  const flaxRow = seedRows.find((r) => r.food === "Flax Seeds")
  assert.equal(
    (flaxRow.supplementaryNumeric || []).length,
    0,
    "the asterisked 22.8 g row must not be summed on top of ala_mg",
  )
  const walnutRow = result.audit.find((row) => row.food === "Walnuts")
  assert.ok(walnutRow)
  assert.ok(Math.abs(walnutRow.contributions.ala_mg - 9080 * 0.073125) < 1e-6, "recipes consume walnut's interpreted ALA")
  assert.equal(
    (walnutRow.supplementaryNumeric || []).length,
    0,
    "the asterisked 9.08 g row must not be summed on top of ala_mg",
  )
})

test("missing nutrient data is not treated as analytical zero", () => {
  const missing = scaleNutrient(undefined, 150)
  const explicitZero = scaleNutrient(0, 150)
  assert.equal(missing.status, "not_reported")
  assert.equal(explicitZero.status, "numeric")
  assert.equal(explicitZero.value, 0)
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  assert.ok(result.notReported.fibre_g.includes("Greek Yogurt"))
  assert.notEqual(result.perServing.fibre_g, 0)
})

test("qualitative or range values are not numerically summed", () => {
  const walnut = foodDocs.find((d) => d.frontMatter.id === "walnuts")
  const poly = (walnut.frontMatter.nutrition_supplementary_sources || []).find((s) =>
    /polyphenol|ellagitannin/i.test(`${s.label} ${s.key}`),
  )
  assert.ok(poly)
  assert.equal(typeof poly.value, "undefined")
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  assert.equal(result.perServing.walnut_polyphenols_proxy_mg, undefined)
  assert.equal(
    result.perServing.anthocyanins_mg,
    undefined,
    "order-of-magnitude blueberry anthocyanins must not be summed",
  )
})

test("ingredient totals are scaled by actual weight and servings are applied", () => {
  const yogurt = foodDocs.find((d) => d.frontMatter.id === "greek-yogurt").frontMatter.nutrition_per_100g
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  assert.equal(result.servings, 1)
  const yogurtRow = result.audit.find((r) => r.food === "Greek Yogurt")
  assert.equal(yogurtRow.weight_g, 150)
  assert.ok(Math.abs(yogurtRow.contributions.kcal - yogurt.kcal * 1.5) < 1e-9)
  const doubled = calculateRecipeNutrition({...bowl.data, servings: 2}, foodDocs)
  assert.equal(doubled.servings, 2)
  assert.ok(Math.abs(doubled.perServing.kcal * 2 - result.recipeTotals.kcal) < 1e-6)
})

test("ginger-yogurt bowl is nowhere near the invalid 2714 kcal proxy total", () => {
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  assert.equal(result.status, "calculated")
  assert.ok(result.perServing.kcal < 450, `kcal ${result.perServing.kcal}`)
  assert.ok(result.perServing.kcal > 200, `kcal ${result.perServing.kcal}`)
  assert.ok(result.perServing.protein_g < 25)
  assert.ok(result.perServing.fibre_g < 20)
  assert.ok(Math.abs(result.perServing.kcal - 2714) > 2000)
})

test("ginger-yogurt programmatic total matches independent hand calculation from the same records", () => {
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  const byId = Object.fromEntries(foodDocs.map((d) => [d.frontMatter.id, d.frontMatter.nutrition_per_100g]))
  const honeyRef = bowl.data.recipe_ingredients.find((i) => i.composition_ref === "honey")
  assert.ok(honeyRef, "honey uses a named snapshot rather than an inline panel")
  const honey = RECIPE_COMPOSITION_SNAPSHOTS.honey.nutrition_per_100g
  const weights = {
    "greek-yogurt": 150,
    blueberries: 74,
    "chia-seeds": 3,
    "flax-seeds": 3,
    "pumpkin-seeds": 3,
    walnuts: 7.3125,
    ginger: 1,
  }
  let handKcal = (honey.kcal * 3.5) / 100
  let handProtein = (honey.protein_g * 3.5) / 100
  for (const [id, g] of Object.entries(weights)) {
    handKcal += (byId[id].kcal * g) / 100
    handProtein += (byId[id].protein_g * g) / 100
  }
  assert.ok(Math.abs(result.perServing.kcal - handKcal) < 0.05, `${result.perServing.kcal} vs ${handKcal}`)
  assert.ok(Math.abs(result.perServing.protein_g - handProtein) < 0.05)
  const editorialKcal = 350
  const editorialProtein = 18
  assert.ok(
    Math.abs(result.perServing.kcal - editorialKcal) > 20,
    "calculated energy is not forced to the old 350 kcal editorial line",
  )
  assert.ok(Math.abs(result.perServing.protein_g - editorialProtein) < 3)
})

test("prose ingredients match unique structured display lines", () => {
  const displays = [
    ...new Set(bowl.data.recipe_ingredients.map((i) => i.display).filter(Boolean)),
  ]
  const section = bowl.content.split("## Ingredients")[1]?.split("## ")[0] || ""
  for (const line of displays) {
    assert.match(section, new RegExp(line.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  }
})

test("no recipe page still documents the 100 g proxy as acceptable", () => {
  for (const file of walkMd(RECIPES_DIR)) {
    const raw = fs.readFileSync(file, "utf8")
    assert.doesNotMatch(raw, /100 g per linked food/)
    assert.doesNotMatch(raw, /adds one full “100 g”/)
  }
})

test("public table omits optional cinnamon and does not list every trace food", () => {
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  const rows = selectPublicRows(result)
  assert.ok(rows.some((r) => r.key === "kcal"))
  assert.ok(rows.some((r) => r.key === "protein_g"))
  assert.ok(rows.some((r) => r.key === "ala_mg"))
  assert.equal(
    rows.some((r) => r.key === "omega3_mg"),
    false,
    "do not show Total omega-3 beside ALA/EPA/DHA",
  )
  assert.equal(
    rows.some((r) => /cinnamon/i.test(r.key)),
    false,
  )
})

test("legacy recipe_nutrition without 100 g fallback still calculates when grams exist", () => {
  const neuro = matter(
    fs.readFileSync(path.join(ROOT, "docs/recipes/Snacks/neuroeshot.md"), "utf8"),
  )
  const result = calculateRecipeNutrition(neuro.data, foodDocs)
  assert.equal(result.status, "calculated")
  assert.ok(result.perServing.kcal < 200)
})

test("creamed-corn calculates from a named coconut-milk record, never coconut oil", () => {
  const corn = loadRecipe("Dinner/creamed-corn-roasted-sweet-potato.md")
  const result = calculateRecipeNutrition(corn.data, foodDocs)
  assert.equal(result.status, "calculated")
  assert.equal(result.servings, 1)

  const milk = result.audit.find((row) => /coconut milk/i.test(row.display))
  assert.ok(milk, "coconut milk is included in the default total")
  assert.match(milk.composition_basis, /170173/)
  assert.ok(Math.abs(milk.weight_g - 143.3) < 0.1, "150 ml converted by a sourced cup weight, not 1 g/ml")

  const oilPanel = RECIPE_COMPOSITION_SNAPSHOTS["coconut-milk-canned"].nutrition_per_100g
  assert.ok(oilPanel.kcal < 300, "coconut milk is ~197 kcal/100 g, not coconut oil at 892")

  for (const seasoning of ["curry powder", "sweetcorn", "butter", "parmesan", "broccoli", "olive oil"]) {
    assert.ok(
      result.audit.some((row) => new RegExp(seasoning, "i").test(row.display)),
      `${seasoning} is part of the calculated recipe`,
    )
  }

  assert.ok(result.recipeTotals.kcal > 1150 && result.recipeTotals.kcal < 1320)
  assert.ok(
    result.recipeTotals.kcal > 910,
    "the calculated plate exceeds the withdrawn 880–910 kcal estimate",
  )
  assert.ok(result.recipeTotals.sat_fat_g > 40, "saturated fat is far above the withdrawn 26–28 g estimate")

  // Resolution still refuses to reach a related food by name.
  assert.equal(resolveFoodDoc("coconut milk", foodDocs), null)
  assert.equal(resolveFoodDoc("curried coconut milk", foodDocs), null)
  assert.ok(resolveFoodDoc("coconut-oil", foodDocs))
})

test("every composition snapshot names its source record", () => {
  for (const [key, snapshot] of Object.entries(RECIPE_COMPOSITION_SNAPSHOTS)) {
    assert.match(snapshot.fdc_id, /^\d+$/, key)
    assert.ok(snapshot.description, key)
    assert.match(snapshot.database, /USDA/, key)
    assert.ok(Object.keys(snapshot.nutrition_per_100g).length >= 5, key)
  }
})

test("preparation state is not silently swapped for a food-page record", () => {
  const cases = [
    ["Breakfast/savoury-greens-egg-breakfast-skillet.md", /cooked quinoa/i, "quinoa-cooked"],
    ["Lunch/mitochondrial-power-bowl.md", /cooked quinoa/i, "quinoa-cooked"],
    ["Dinner/black-bean-sweet-potato-chilli.md", /black beans/i, "black-beans-canned-low-sodium"],
    ["Dinner/creamed-corn-roasted-sweet-potato.md", /sweetcorn/i, "sweetcorn-canned-drained"],
    ["Snacks/neuroeshot.md", /lemon juice/i, "lemon-juice-raw"],
    ["Lunch/Salmon-beetroot-toast-lemon.md", /cooked salmon/i, "salmon-farmed-cooked"],
  ]
  for (const [file, matchDisplay, expectedRef] of cases) {
    const recipe = loadRecipe(file)
    const ingredient = recipe.data.recipe_ingredients.find((i) => matchDisplay.test(i.display || ""))
    assert.ok(ingredient, `${file}: no ingredient matching ${matchDisplay}`)
    assert.equal(ingredient.composition_ref, expectedRef, file)
  }
})

test("non-gram quantities cite a sourced household measure", () => {
  for (const file of walkMd(RECIPES_DIR)) {
    const {data} = matter(fs.readFileSync(file, "utf8"))
    for (const ingredient of data.recipe_ingredients || []) {
      if (!ingredient.calculation_weight_g) continue
      const unit = String(ingredient.unit || "").toLowerCase()
      if (!unit || unit === "g") continue
      assert.ok(
        ingredient.conversion_source,
        `${path.basename(file)}: "${ingredient.display}" states ${unit} without a conversion source`,
      )
      assert.match(
        ingredient.conversion_source,
        /USDA|FDC|recipe|midpoint|drained weight|proviso|teaspoon|tablespoon/i,
        `${path.basename(file)}: "${ingredient.display}" conversion is not traceable`,
      )
    }
  }
})

test("salt added to taste is excluded and disclosed rather than guessed", () => {
  const corn = loadRecipe("Dinner/creamed-corn-roasted-sweet-potato.md")
  const result = calculateRecipeNutrition(corn.data, foodDocs)
  const salt = result.exclusions.find((e) => /salt/i.test(e.display))
  assert.ok(salt)
  assert.match(salt.reason, /to taste/i)
  assert.ok(result.assumptions.some((a) => /salt added to taste/i.test(a)))
})

test("a nutrient the sources cannot establish is never printed as a number", () => {
  const neuro = loadRecipe("Snacks/neuroeshot.md")
  const result = calculateRecipeNutrition(neuro.data, foodDocs)
  assert.equal(result.status, "calculated")
  assert.match(result.unresolved.sodium_mg, /brine|label/i)
  const sodiumRow = selectPublicRows(result).find((r) => r.key === "sodium_mg")
  assert.ok(sodiumRow)
  assert.equal(sodiumRow.amount, null)
  assert.ok(sodiumRow.unresolvedReason)
})

test("recipes that cannot be calculated say why", () => {
  const stillPending = []
  for (const file of walkMd(RECIPES_DIR)) {
    const {data} = matter(fs.readFileSync(file, "utf8"))
    if (!data?.id || String(data.id).endsWith("-recipes") || data.id === "recipes") continue
    const result = calculateRecipeNutrition(data, foodDocs)
    if (result.status === "calculated") continue
    stillPending.push(data.id)
    assert.ok(
      result.pendingReason || result.blockers.some((b) => b !== "no_structured_ingredients"),
      `${data.id} is pending without a stated reason`,
    )
  }
  assert.ok(stillPending.length <= 4, `too many recipes still pending: ${stillPending.join(", ")}`)
})

test("public rows are grouped into summary, micronutrient and bioactive sections", () => {
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  const rows = selectPublicRows(result)
  const groups = new Set(rows.map((r) => r.group))
  assert.ok(groups.has("core"))
  assert.ok(groups.has("micronutrient"))
  const summaryKeys = rows.filter((r) => r.group === "core").map((r) => r.key)
  assert.deepEqual(summaryKeys.slice(0, 3), ["kcal", "protein_g", "carbs_g"])
  const ui = fs.readFileSync(path.join(ROOT, "src/theme/RecipeNutrition/index.tsx"), "utf8")
  assert.match(ui, /Key vitamins and minerals/)
  assert.match(ui, /Bioactive compounds/)
  assert.match(ui, /Calculation details/)
  assert.doesNotMatch(ui, /Foods in recipe/)
})

test("unvalidated RecipeMatrix is suppressed", () => {
  const corn = loadRecipe("Dinner/creamed-corn-roasted-sweet-potato.md")
  const bowlFm = bowl.data
  assert.equal(isRecipeMatrixValidated(corn.data), false)
  assert.equal(isRecipeMatrixValidated(bowlFm), false)
  assert.equal(isRecipeMatrixValidated({recipe_matrix_validated: true}), true)
  const matrixSrc = fs.readFileSync(path.join(ROOT, "src/theme/RecipeMatrix/index.tsx"), "utf8")
  assert.match(matrixSrc, /isRecipeMatrixValidated/)
  assert.match(matrixSrc, /PENDING_MATRIX_MESSAGE/)
  const rule = fs.readFileSync(path.join(ROOT, "docs/recipes/.cursor/rules/Recipe-Pages.mdc"), "utf8")
  assert.match(rule, /pending canonical BRS validation/)
  assert.equal(PENDING_MATRIX_MESSAGE, "Biological Target Matrix pending canonical BRS validation.")
})

test("USDA C6/C8/C10 labels are fatty acids, not triglycerides", () => {
  const mapping = fs.readFileSync(path.join(ROOT, "src/data/nutritionTableMapping.ts"), "utf8")
  const truth = fs.readFileSync(path.join(ROOT, "scripts/lib/food-truth-levels.mjs"), "utf8")
  for (const src of [mapping, truth]) {
    assert.match(src, /Caprylic acid \(C8:0\)/)
    assert.match(src, /Capric acid \(C10:0\)/)
    assert.match(src, /Caproic acid \(C6:0\)/)
    assert.doesNotMatch(src, /caprylic_g: \{label: "Caprylic Triglyceride"/)
    assert.doesNotMatch(src, /caprylic_g: \{ label: "Caprylic Triglyceride"/)
  }
})

test("no recipe is matrix-validated in this integrity pass", () => {
  for (const file of walkMd(RECIPES_DIR)) {
    const {data} = matter(fs.readFileSync(file, "utf8"))
    assert.notEqual(data.recipe_matrix_validated, true, file)
  }
})

/** Recipe pages, excluding the category index stubs that carry no ingredients. */
function recipePages() {
  return walkMd(RECIPES_DIR)
    .map((file) => ({file, raw: fs.readFileSync(file, "utf8")}))
    .filter(({raw}) => raw.includes("<RecipeFoods"))
    .map((entry) => ({...entry, ...matter(entry.raw)}))
}

test("each recipe publishes its per-serving figures in exactly one place", () => {
  const foods = fs.readFileSync(path.join(ROOT, "src/theme/RecipeFoods/index.tsx"), "utf8")
  assert.doesNotMatch(foods, /calculateRecipeNutrition/, "RecipeFoods must not also render nutrition")
  assert.doesNotMatch(foods, /Recipe nutrition/)

  for (const {file, raw} of recipePages()) {
    const calls = raw.match(/<RecipeNutrition\b/g) || []
    assert.equal(calls.length, 1, `${file} should call RecipeNutrition exactly once`)
    const section = raw.split(/^## /m).find((part) => part.startsWith("Nutrition"))
    assert.ok(section, `${file} needs a "## Nutrition" heading`)
    assert.match(section, /<RecipeNutrition details=\{frontMatter\} \/>/, file)
  }
})

const skillet = loadRecipe("Breakfast/savoury-greens-egg-breakfast-skillet.md")

test("public values are rounded by unit, and only for display", () => {
  assert.equal(roundForDisplay(426.773, "kcal"), 430)
  assert.equal(roundForDisplay(23.989, "g"), 24)
  assert.equal(roundForDisplay(216.172, "mg"), 220)
  assert.equal(roundForDisplay(7.324, "g"), 7.3)
  assert.equal(roundForDisplay(0.784, "g"), 0.78)
  assert.equal(roundForDisplay(6.503, "mg"), 6.5)
  assert.equal(roundForDisplay(44.56, "µg"), 45)
  assert.equal(roundForDisplay(351.04, "µg"), 350)
  assert.equal(roundForDisplay(23.4, "kcal"), 23, "small energy values keep unit precision")

  assert.equal(formatAmount(426.773, "kcal"), "430 kcal")
  assert.equal(formatAmount(23.989, "g"), "24 g")
  assert.equal(formatPercent(0.4), "<1%", "sub-1% coverage is not shown as 0%")

  // Full precision survives in the calculated result; rounding is a display step.
  const result = calculateRecipeNutrition(skillet.data, foodDocs)
  assert.ok(result.perServing.kcal % 1 !== 0, "per-serving energy keeps its fraction")
  assert.ok(Math.abs(result.perServing.kcal - 426.77) < 0.1)
})

test("key vitamins and minerals are selective, ranked and capped", () => {
  for (const recipe of [bowl, skillet]) {
    const result = calculateRecipeNutrition(recipe.data, foodDocs)
    const key = selectKeyMicronutrients(result, recipe.data)
    assert.ok(key.length <= MAX_KEY_MICRONUTRIENTS, `${recipe.path} exceeds the row cap`)
    for (const row of key) {
      if (row.promoted) continue
      assert.ok(
        displayPercent(row.pct) >= KEY_MICRONUTRIENT_DISPLAY_PERCENT,
        `${row.key} at ${formatPercent(row.pct)} is below the threshold`,
      )
    }
    const pcts = key.filter((r) => !r.promoted).map((r) => r.pct)
    assert.deepEqual(pcts, [...pcts].sort((a, b) => b - a), "rows are ranked by proportion")
  }

  const skilletResult = calculateRecipeNutrition(skillet.data, foodDocs)
  assert.equal(selectKeyMicronutrients(skilletResult, skillet.data).length, MAX_KEY_MICRONUTRIENTS)
})

test("salmon roe publishes EPA and DHA but no alanine dressed as ALA", () => {
  const roe = foodDocs.find((doc) => doc.title === "Salmon Roe")
  assert.ok(roe, "the salmon roe food page is loaded")
  const panel = roe.frontMatter.nutrition_per_100g

  // USDA FDC 175132 holds 1.428 g alanine per 100 g. That number was stored as
  // ala_mg and published as an omega-3 larger than the food's own DHA.
  assert.equal(panel.ala_mg, undefined, "ALA is unreported, not restated from alanine")
  assert.notEqual(panel.ala_mg, 1428)
  assert.equal(panel.epa_mg, 983)
  assert.equal(panel.dha_mg, 1363)

  // The total is EPA, DHA and the record's DPA — every component named, and each
  // one carrying an n-3 isomer in its own source field.
  const components = roe.frontMatter.omega3_components
  assert.deepEqual(
    components.map((c) => c.nutrient).sort(),
    ["dha_mg", "dpa_mg", "epa_mg"],
    "the total states which verified components were summed",
  )
  for (const component of components) {
    assert.match(component.identity, /n-3/, `${component.nutrient} names its isomer`)
  }
  assert.equal(
    panel.omega3_mg,
    components.reduce((sum, c) => sum + c.amount_mg, 0),
    "the rollup is its components and carries no phantom ALA",
  )
  assert.ok(panel.omega3_mg < 3774, "the pre-repair total included 1428 mg of alanine")

  const neuroshot = loadRecipe("Snacks/neuroeshot.md")
  const result = calculateRecipeNutrition(neuroshot.data, foodDocs)
  assert.equal(result.status, "calculated")

  const bioactives = selectPublicRows(result, neuroshot.data).filter((row) => row.group === "brain")
  const keys = bioactives.map((row) => row.key)
  assert.ok(!keys.includes("ala_mg"), "no ALA row is published for this recipe")
  assert.ok(keys.includes("epa_mg") && keys.includes("dha_mg"))

  assert.ok(Math.abs(result.perServing.epa_mg - 147.45) < 0.01)
  assert.ok(Math.abs(result.perServing.dha_mg - 204.45) < 0.01)

  // The 15 g serving would have carried about 214 mg of alanine as ALA.
  assert.ok(
    !(result.perServing.ala_mg > 100),
    "no serving-scaled alanine survives anywhere in the total",
  )
})

test("flax and walnuts lost their alanine-sized ALA; chia's real value survived", () => {
  const panel = (title) => {
    const doc = foodDocs.find((d) => d.title === title)
    assert.ok(doc, `${title} is loaded`)
    return {values: doc.frontMatter.nutrition_per_100g, components: doc.frontMatter.omega3_components}
  }

  /*
   * Flax and walnuts are the foods a reader would expect to be highest in ALA,
   * which is what made their corruption hard to see: 925 mg and 696 mg look
   * unremarkable for a seed and a nut. Both were the record's alanine.
   * Flax later received a combined-provenance ALA from the record's 18:3, not
   * from that amino acid. Walnuts follow the same pattern.
   */
  const flax = panel("Flax Seeds")
  assert.equal(flax.values.ala_mg, 22813, "flax ALA is USDA's 18:3 quantity, interpreted")
  assert.notEqual(flax.values.ala_mg, 925, "the 925 mg figure was alanine")
  assert.equal(flax.values.pufa_18_3_unresolved_mg, undefined, "the 18:3 is no longer unresolved")
  assert.equal(flax.values.omega3_mg, 22813)
  assert.deepEqual(flax.components.map((c) => c.nutrient), ["ala_mg"])

  const walnuts = panel("Walnuts")
  assert.equal(walnuts.values.ala_mg, 9080, "walnut ALA is USDA's 18:3 quantity, interpreted")
  assert.notEqual(walnuts.values.ala_mg, 696, "the 696 mg figure was alanine")
  assert.equal(walnuts.values.pufa_18_3_unresolved_mg, undefined)
  assert.equal(walnuts.values.omega3_mg, 9080)
  assert.deepEqual(walnuts.components.map((c) => c.nutrient), ["ala_mg"])

  // Chia's record states 18:3 n-3 outright, so the value is real and stays.
  const chia = panel("Chia Seeds")
  assert.equal(chia.values.ala_mg, 17830, "an explicitly identified ALA survives the repair")
  assert.deepEqual(chia.components.map((c) => c.nutrient), ["ala_mg"])
  assert.equal(chia.values.omega3_mg, 17830)
})

test("flax publishes USDA 18:3 as ALA under combined provenance", () => {
  const doc = foodDocs.find((d) => d.title === "Flax Seeds")
  const page = fs.readFileSync(path.join(ROOT, "docs/foods/flax-seeds.md"), "utf8")
  const fm = doc.frontMatter
  const row = (fm.nutrition_supplementary_sources || []).find((r) => r.key === "ala_interpreted")

  assert.ok(row, "flax states no combined-provenance ALA row")
  assert.equal(row.label, "Alpha-linolenic acid (ALA; 18:3 n-3)")
  assert.equal(row.value, 22.8)
  assert.equal(row.unit, "g")
  assert.equal(row.source_note, "This value uses a documented composition interpretation. See FCIR-003.")
  assert.equal(row.fcir_case, "FCIR-003")
  assert.equal(row.exclude_from_recipe_sum, true)
  assert.equal(row.public_display, "table")
  assert.equal(fm.public_display?.ala_mg, "internal-only", "the mg panel value must not render twice")

  assert.equal(fm.nutrition_per_100g.ala_mg, 22813)
  assert.equal(fm.nutrition_per_100g.omega3_mg, 22813)
  assert.match(fm.omega3_components[0].identity, /n-3/)
  assert.match(fm.omega3_components[0].identity, /interpreted/)
  assert.match(String(fm.nutrition_source.limitations), /FCIR-003/)
  assert.deepEqual(fm.fcir_cases, ["FCIR-003"])
})

test("flax ALA is a food-level interpretation of USDA 1270, not an extractor promotion", () => {
  const extractor = fs.readFileSync(path.join(ROOT, "scripts/lib/usda-nutrient-extract.mjs"), "utf8")
  assert.doesNotMatch(extractor, /flax|hemp|walnut/i, "extraction has no food-name 1270 exception")

  const extracted = extractNutrients({
    description: "Seeds, flaxseed",
    foodNutrients: [{nutrient: {id: 1270, name: "PUFA 18:3", unitName: "g"}, amount: 22.813}],
  })
  assert.equal(extracted.ala_mg, undefined, "nutrient 1270 remains generically unresolved in the extractor")
  assert.equal(extracted.pufa_18_3_unresolved_mg, 22813)

  const hempExtracted = extractNutrients({
    description: "Seeds, hemp seed, hulled",
    foodNutrients: [{nutrient: {id: 1270, name: "PUFA 18:3", unitName: "g"}, amount: 20.17}],
  })
  assert.equal(hempExtracted.ala_mg, undefined, "hemp cannot inherit flax's page-level interpretation")
  assert.equal(
    fs.existsSync(path.join(FOODS_DIR, "hemp-seeds.md")) || fs.existsSync(path.join(FOODS_DIR, "hemp.md")),
    false,
    "there is no hemp page that could copy the flax exception",
  )

  const flaxDoc = foodDocs.find((d) => d.frontMatter.id === "flax-seeds")
  const flaxFm = flaxDoc.frontMatter
  const isomerRow = (flaxFm.nutrition_supplementary_sources || []).find((r) => r.key === "ala_interpreted")
  assert.ok(isomerRow, "flax publishes 22.8 g ALA only because supplementary provenance identifies the isomer")
  assert.equal(isomerRow.value, 22.8)
  assert.equal(isomerRow.public_display, "table")
  assert.equal(isomerRow.source_note, "This value uses a documented composition interpretation. See FCIR-003.")
  assert.equal(flaxFm.public_display?.ala_mg, "internal-only")
  assert.ok((flaxFm.tags || []).includes("ALA"))

  const intact = reconcileFoodPage(flaxFm, {substanceLookup: [], markdownBody: ""})
  assert.equal(
    intact.substancesMissingFromTables.some((tag) => /ALA|alpha-linolenic/i.test(tag)),
    false,
    "with the isomer source present, the ALA card reconciles",
  )

  const withoutIsomer = structuredClone(flaxFm)
  withoutIsomer.nutrition_supplementary_sources = (withoutIsomer.nutrition_supplementary_sources || []).filter(
    (r) => r.key !== "ala_interpreted",
  )
  const broken = reconcileFoodPage(withoutIsomer, {substanceLookup: [], markdownBody: ""})
  assert.ok(
    broken.substancesMissingFromTables.some((tag) => /ALA|alpha-linolenic/i.test(tag)),
    "removing the supporting isomer source makes the ALA card fail reconciliation",
  )

  const bowlResult = calculateRecipeNutrition(bowl.data, foodDocs)
  const flaxAudit = bowlResult.audit.find((row) => row.food === "Flax Seeds")
  assert.ok(Math.abs(flaxAudit.contributions.ala_mg - 22813 * 0.03) < 1e-6, "recipes receive 22,813 mg/100 g internally")
  assert.equal(
    (flaxAudit.supplementaryNumeric || []).length,
    0,
    "the public 22.8 g row is not duplicated on top of ala_mg",
  )
})

test("walnut publishes USDA 18:3 as ALA under combined provenance", () => {
  const doc = foodDocs.find((d) => d.title === "Walnuts")
  const page = fs.readFileSync(path.join(ROOT, "docs/foods/walnuts.md"), "utf8")
  const fm = doc.frontMatter
  const row = (fm.nutrition_supplementary_sources || []).find((r) => r.key === "ala_interpreted")

  assert.ok(row, "walnuts states no combined-provenance ALA row")
  assert.equal(row.label, "Alpha-linolenic acid (ALA; 18:3 n-3)")
  assert.equal(row.value, 9.08)
  assert.equal(row.unit, "g")
  assert.equal(row.source_note, "This value uses a documented composition interpretation. See FCIR-004.")
  assert.equal(row.fcir_case, "FCIR-004")
  assert.equal(row.exclude_from_recipe_sum, true)
  assert.equal(row.public_display, "table")
  assert.equal(fm.public_display?.ala_mg, "internal-only")
  assert.equal(fm.nutrition_per_100g.ala_mg, 9080)
  assert.equal(fm.nutrition_per_100g.omega3_mg, 9080)
  assert.match(fm.omega3_components[0].identity, /interpreted/)
  assert.deepEqual(fm.fcir_cases, ["FCIR-004"])
})

test("soy cluster publishes USDA 18:3 as ALA from soybean-oil 1404, not the oil quantity", () => {
  const expected = [
    {title: "Soy", ala: 1330, display: 1.33, fdc: "174270"},
    {title: "Tofu", ala: 582, display: 0.582, fdc: "172475"},
    {title: "Natto", ala: 734, display: 0.734, fdc: "172443"},
    {title: "Miso", ala: 405, display: 0.405, fdc: "172442"},
    {title: "Tempeh", ala: 248, display: 0.248, fdc: "174272"},
  ]
  for (const row of expected) {
    const doc = foodDocs.find((d) => d.title === row.title)
    assert.ok(doc, row.title)
    const fm = doc.frontMatter
    const supp = (fm.nutrition_supplementary_sources || []).find((r) => r.key === "ala_interpreted")
    assert.ok(supp, `${row.title} states no combined-provenance ALA row`)
    assert.equal(supp.value, row.display, row.title)
    assert.equal(supp.unit, "g")
    assert.equal(supp.source_note, `This value uses a documented composition interpretation. See ${row.title === "Soy" ? "FCIR-007" : "FCIR-018"}.`)
    assert.equal(supp.exclude_from_recipe_sum, true)
    assert.equal(fm.nutrition_per_100g.ala_mg, row.ala, row.title)
    assert.equal(fm.nutrition_per_100g.pufa_18_3_unresolved_mg, undefined, row.title)
    assert.equal(fm.public_display?.ala_mg, "internal-only", row.title)
    assert.equal(String(fm.nutrition_source.fdc_id), row.fdc, row.title)
    assert.notEqual(fm.nutrition_per_100g.ala_mg, 6789, `${row.title} must not inherit soybean-oil milligrams`)
  }
})

test("spirulina 18:3 is not promoted to ALA", () => {
  const doc = foodDocs.find((d) => d.title === "Spirulina")
  const fm = doc.frontMatter
  assert.equal(fm.nutrition_per_100g.ala_mg, undefined)
  assert.equal(fm.nutrition_per_100g.pufa_18_3_unresolved_mg, 823)
  assert.deepEqual(fm.fcir_cases, ["FCIR-019"])
  assert.match(String(fm.nutrition_source.limitations), /FCIR-019/)
  assert.equal(fm.nutrition_source.fdc_id, 170495)
})

test("an unqualified 18:3 stays chemically unresolved and reaches nothing", () => {
  // The value is retained for provenance, never promoted. Being absent from the
  // calculation keys and the label table is what stops it becoming an n-3.
  assert.ok(UNRESOLVED_FATTY_ACID_KEYS.includes("pufa_18_3_unresolved_mg"))
  for (const key of UNRESOLVED_FATTY_ACID_KEYS) {
    assert.ok(!ALL_CALC_KEYS.includes(key), `${key} is not calculated`)
    assert.ok(!PUBLIC_BRAIN_KEYS.includes(key), `${key} is not published as a fatty acid`)
    assert.equal(NUTRIENT_LABELS[key], undefined, `${key} has no reader-facing label`)
  }

  const carriers = foodDocs.filter(
    (doc) => typeof doc.frontMatter.nutrition_per_100g?.pufa_18_3_unresolved_mg === "number",
  )
  assert.ok(carriers.length > 0, "the repair retained unresolved values rather than deleting them")
  for (const doc of carriers) {
    const values = doc.frontMatter.nutrition_per_100g
    assert.equal(values.ala_mg, undefined, `${doc.title} cannot hold ALA and an unresolved 18:3`)
    for (const component of doc.frontMatter.omega3_components || []) {
      assert.ok(
        !UNRESOLVED_FATTY_ACID_KEYS.includes(component.nutrient),
        `${doc.title} summed an unresolved fatty acid into its n-3 total`,
      )
    }
  }
})

test("every published omega-3 total names the components it was summed from", () => {
  for (const doc of foodDocs) {
    const values = doc.frontMatter.nutrition_per_100g || {}
    const components = doc.frontMatter.omega3_components
    const total = values.omega3_mg

    if (typeof total !== "number") {
      assert.equal(components, undefined, `${doc.title} lists components with no total`)
      continue
    }

    assert.ok(Array.isArray(components) && components.length, `${doc.title} states no components`)
    assert.notEqual(total, 0, `${doc.title} stores a zero total; an unmeasured nutrient is unknown`)

    const sum = components.reduce((acc, c) => acc + c.amount_mg, 0)
    assert.ok(Math.abs(sum - total) < 0.5, `${doc.title} total ${total} is not its components ${sum}`)
    for (const component of components) {
      assert.match(component.identity, /n-3/, `${doc.title}: ${component.nutrient} names no isomer`)
    }
    if (typeof values.ala_mg === "number") {
      assert.ok(
        components.some((c) => c.nutrient === "ala_mg"),
        `${doc.title} publishes ALA outside its own total`,
      )
    }
  }
})

test("a withdrawn composition panel publishes nothing quantitative", () => {
  const withdrawn = foodDocs.filter((doc) => doc.frontMatter.composition_status === "withdrawn")

  /*
   * The four pages for which the completed source search found nothing usable.
   * `mct-oil` was the fifth and has since been resolved against a manufacturer
   * specification, so it is deliberately absent.
   */
  const stillWithdrawn = ["sunflower-lecithin", "reishi-mushroom", "turkey-tail-mushroom", "cordyceps-mushroom"]
  for (const slug of stillWithdrawn) {
    assert.ok(
      withdrawn.some((doc) => doc.frontMatter.id === slug),
      `${slug} has a substituted record and no replacement source, so it must stay withdrawn`,
    )
  }

  for (const doc of withdrawn) {
    const values = doc.frontMatter.nutrition_per_100g || {}
    assert.equal(
      Object.keys(values).length,
      0,
      `${doc.title} still publishes a panel derived from another food`,
    )
    assert.equal(
      doc.frontMatter.nutrition_source,
      undefined,
      `${doc.title} still cites the record its values came from`,
    )
    assert.equal(doc.frontMatter.omega3_components, undefined)

    // The record that was withdrawn is named, so the failure stays legible.
    const record = doc.frontMatter.composition_withdrawn
    assert.ok(record?.withdrawn_record, `${doc.title} does not name the record it withdrew`)
    assert.ok(record?.reason, `${doc.title} does not say why`)
    assert.ok(record?.queue, `${doc.title} is not pointed at a review queue`)

    // What survives is qualitative only. A number here would be a value from the
    // discredited record returning by another door.
    for (const row of doc.frontMatter.nutrition_supplementary_sources || []) {
      assert.equal(
        typeof row.value,
        "undefined",
        `${doc.title}: ${row.key} carries a quantity with no established source`,
      )
      assert.match(String(row.amount_display), /not established/i)
    }
  }
})

test("a restored panel cannot cite the record that was withdrawn from it", () => {
  /*
   * The banned list lives in `scripts/lib/composition-provenance.mjs` so the
   * validator and this test cannot disagree about which records are barred.
   * A page may leave the withdrawal queue only on a new source, so re-citing
   * one of these would silently reinstate the substitution.
   */
  for (const [slug, record] of Object.entries(SUBSTITUTED_RECORDS)) {
    const doc = foodDocs.find((d) => d.frontMatter.id === slug)
    assert.ok(doc, `${slug} is missing`)
    assert.deepEqual(
      checkExactFoodMatch(doc.frontMatter, slug),
      [],
      `${slug} fails exact-food validation`,
    )
    const cited = doc.frontMatter.nutrition_source?.fdc_id
    if (cited === undefined) continue
    assert.notEqual(Number(cited), record.fdc_id, `${slug} cites the record withdrawn from it`)
  }

  // A page that publishes again must say where the replacement came from.
  const mct = foodDocs.find((d) => d.frontMatter.id === "mct-oil")
  if (Object.keys(mct.frontMatter.nutrition_per_100g || {}).length) {
    const source = mct.frontMatter.nutrition_source
    assert.ok(source?.fdc_id, "mct-oil publishes values without naming a record")
    assert.ok(source?.basis, "mct-oil publishes values without stating a basis")
    assert.ok(source?.limitations, "mct-oil publishes label-derived values without stating limitations")
  }
})

test("a withdrawal takes the ontology claims the record was the only support for", () => {
  /*
   * The three mushroom pages tagged Vitamin B3 on the strength of the beech
   * mushroom record alone. Withdrawing a panel and leaving its tags behind
   * keeps the claim in the ontology after its evidence has gone.
   */
  for (const slug of ["reishi-mushroom", "turkey-tail-mushroom", "cordyceps-mushroom"]) {
    const doc = foodDocs.find((d) => d.frontMatter.id === slug)
    assert.ok(
      !(doc.frontMatter.tags || []).includes("Vitamin B3"),
      `${slug} still tags a nutrient whose only source was the withdrawn record`,
    )
  }
})

test("recipes cannot consume a withdrawn record", () => {
  const withdrawn = foodDocs.filter((doc) => doc.frontMatter.composition_status === "withdrawn")
  const slugs = new Set(withdrawn.map((doc) => doc.frontMatter.id))

  // No recipe reaches one today.
  for (const file of walkMd(RECIPES_DIR)) {
    const data = matter(fs.readFileSync(file, "utf8")).data
    for (const ing of data.recipe_ingredients || []) {
      const slug = ing.food_slug || ing.food
      assert.ok(
        !slugs.has(String(slug)),
        `${path.basename(file)} names ${slug}, whose composition is withdrawn`,
      )
    }
  }

  // And one that tried could not calculate. The panel is refused at resolution,
  // so the ingredient is unresolved and the recipe says so rather than
  // silently costing a meal at zero.
  const target = withdrawn[0].frontMatter.id
  const result = calculateRecipeNutrition(
    {
      servings: 1,
      recipe_ingredients: [{food_slug: target, display: "test", quantity_g: 100}],
    },
    foodDocs,
  )
  assert.equal(result.status, "pending", "a withdrawn record cannot produce a calculated recipe")
  assert.ok(
    result.blockers.some((b) => b.startsWith(`${target}:`)),
    `the blocker names ${target}: ${result.blockers.join(", ")}`,
  )
  assert.ok(!(result.perServing?.kcal > 0), "no energy is drawn from a withdrawn panel")
})

test("the public label states the fatty acid, not the bare acronym", () => {
  // "ALA" alone is what let an amino acid pass for an omega-3 in the first
  // place, so the public label spells the compound out and states the isomer.
  assert.equal(NUTRIENT_LABELS.ala_mg.label, "Alpha-linolenic acid (ALA; 18:3 n-3)")
  assert.equal(NUTRIENT_LABELS.epa_mg.label, "EPA")
  assert.equal(NUTRIENT_LABELS.dha_mg.label, "DHA")

  // The site and the scripts keep separate label tables; they must not disagree.
  const tsx = fs.readFileSync(path.join(ROOT, "src/data/nutritionTableMapping.ts"), "utf8")
  assert.match(tsx, /ala_mg: \{label: "Alpha-linolenic acid \(ALA; 18:3 n-3\)"/)
})

test("admission is decided on the percentage the reader sees", () => {
  // The rule is a display admission rule: a row printed as 15% is admitted, and
  // one printed as 14% is not. It says nothing about intake adequacy and is not
  // a regulatory content threshold, which would need the unrounded value.
  assert.equal(meetsKeyMicronutrientThreshold(14.49), false, "prints as 14%")
  assert.equal(meetsKeyMicronutrientThreshold(14.5), true, "prints as 15%")
  assert.equal(meetsKeyMicronutrientThreshold(14.86), true, "prints as 15%")
  assert.equal(meetsKeyMicronutrientThreshold(15.0), true, "prints as 15%")

  for (const pct of [14.49, 14.5, 14.86, 15.0]) {
    assert.equal(
      meetsKeyMicronutrientThreshold(pct),
      formatPercent(pct) === `${KEY_MICRONUTRIENT_DISPLAY_PERCENT}%`,
      `admission at ${pct} must agree with what the page prints`,
    )
  }

  assert.equal(meetsKeyMicronutrientThreshold(null), false)
  assert.equal(meetsKeyMicronutrientThreshold(undefined), false)
  assert.equal(meetsKeyMicronutrientThreshold(Number.NaN), false)

  // Whatever the arithmetic produces, admission and display cannot disagree.
  for (const recipe of [bowl, skillet]) {
    const result = calculateRecipeNutrition(recipe.data, foodDocs)
    for (const key of PUBLIC_MICRONUTRIENT_KEYS) {
      const amount = result.perServing[key]
      if (typeof amount !== "number" || !Number.isFinite(amount)) continue
      const shown = displayPercent(percentOfReference(key, amount))
      if (shown == null) continue
      assert.equal(
        isKeyMicronutrient(key, amount),
        shown >= KEY_MICRONUTRIENT_DISPLAY_PERCENT,
        `${recipe.path}: ${key} prints as ${shown}% but is judged otherwise`,
      )
    }
  }

  // The bowl's corrected B6 is the case that prompted the rule: 14.86% raw,
  // printed as 15%, and now admitted rather than silently withheld.
  const bowlResult = calculateRecipeNutrition(bowl.data, foodDocs)
  const b6 = percentOfReference("vitamin_b6_mg", bowlResult.perServing.vitamin_b6_mg)
  assert.ok(b6 > 14.8 && b6 < 15, "B6 sits just under the raw threshold")
  assert.equal(formatPercent(b6), "15%")
  assert.equal(isKeyMicronutrient("vitamin_b6_mg", bowlResult.perServing.vitamin_b6_mg), true)
})

test("ranking uses the unrounded percentage", () => {
  const result = calculateRecipeNutrition(skillet.data, foodDocs)
  const rows = selectKeyMicronutrients(result, skillet.data).filter((r) => !r.promoted)
  const raw = rows.map((r) => r.pct)
  assert.deepEqual(raw, [...raw].sort((a, b) => b - a), "rows are ordered by the true proportion")

  // Two rows can print the same percentage; their order must still be truthful.
  const bowlRows = selectKeyMicronutrients(
    calculateRecipeNutrition(bowl.data, foodDocs),
    bowl.data,
  )
  const copper = bowlRows.find((r) => r.key === "copper_mg")
  const selenium = bowlRows.find((r) => r.key === "selenium_ug")
  assert.equal(formatPercent(copper.pct), formatPercent(selenium.pct), "both print as 32%")
  assert.ok(copper.pct > selenium.pct, "copper is genuinely higher")
  assert.ok(
    bowlRows.indexOf(copper) < bowlRows.indexOf(selenium),
    "the tie on screen is broken by the unrounded value, not by key order",
  )
})

test("completeNutrientDataset is NDC-ready: complete, unrounded and honestly labelled", () => {
  const result = calculateRecipeNutrition(skillet.data, foodDocs)
  const shown = new Set(selectKeyMicronutrients(result, skillet.data).map((r) => r.key))
  const dataset = completeNutrientDataset(result)
  const byKey = new Map(dataset.map((row) => [row.key, row]))

  // 1. Public display thresholds do not remove anything from the dataset.
  const hidden = PUBLIC_MICRONUTRIENT_KEYS.filter(
    (key) => !shown.has(key) && typeof result.perServing[key] === "number",
  )
  assert.ok(hidden.length > 0, "this recipe should have micronutrients held back from the panel")
  for (const key of hidden) {
    assert.ok(byKey.has(key), `${key} must remain available for daily aggregation`)
  }
  for (const [key, amount] of Object.entries(result.perServing)) {
    if (typeof amount !== "number" || !Number.isFinite(amount)) continue
    assert.ok(byKey.has(key), `${key} is calculated but missing from the complete dataset`)
  }

  // 2. The reference basis travels with the value.
  assert.equal(byKey.get("vitamin_k_ug").basis, "ai")
  assert.equal(byKey.get("iron_mg").basis, "rda")

  // 3. No-target compounds get an amount and no invented coverage.
  const ala = byKey.get("ala_mg")
  assert.ok(ala && ala.amount > 0)
  assert.equal(ala.pct, null, "a compound with no target must not be given a percentage")
  assert.equal(byKey.get("sodium_mg").pct, null, "sodium has a guideline, not a target")

  // 4. A nutrient the sources cannot establish stays absent, never zero.
  const neuroshot = loadRecipe("Snacks/neuroeshot.md")
  const shotResult = calculateRecipeNutrition(neuroshot.data, foodDocs)
  assert.ok(shotResult.unresolved.sodium_mg, "neuroshot sodium is unresolved")
  const shotRows = selectPublicRows(shotResult, neuroshot.data)
  assert.equal(shotRows.find((r) => r.key === "sodium_mg").amount, null)

  // 5. Public rounding never writes back to the stored value.
  const storedEnergy = byKey.get("kcal").amount
  assert.equal(storedEnergy, result.perServing.kcal)
  assert.equal(formatAmount(storedEnergy, "kcal"), "430 kcal")
  assert.equal(byKey.get("kcal").amount, storedEnergy, "display did not mutate the dataset")
  for (const key of hidden) {
    assert.equal(byKey.get(key).amount, result.perServing[key], `${key} keeps full precision`)
  }

  const doc = fs.readFileSync(path.join(ROOT, "system/nutrient-reference-values.md"), "utf8")
  assert.match(doc, /NDC-ready infrastructure/)
  assert.match(doc, /No NDC component exists in this repository yet/)
})

test("an editorial exception can promote a nutrient below the threshold", () => {
  const result = calculateRecipeNutrition(bowl.data, foodDocs)
  const promotedKey = "vitamin_k_ug"
  assert.equal(
    isKeyMicronutrient(promotedKey, result.perServing[promotedKey]),
    false,
    "the promoted nutrient must be one the rule genuinely excludes",
  )

  const withException = {
    ...bowl.data,
    nutrition_key_micronutrients: [{key: promotedKey, reason: "relevant to the ginger base"}],
  }
  const rows = selectKeyMicronutrients(result, withException)
  const promoted = rows.find((r) => r.key === promotedKey)
  assert.ok(promoted, "the promoted nutrient appears")
  assert.equal(promoted.reason ?? promoted.promoted, "relevant to the ginger base")
  assert.equal(rows.length, MAX_KEY_MICRONUTRIENTS, "promotion does not lift the cap")
})

test("reference values describe the 19–50 adult population the site declares", () => {
  // Both were inherited from older age bands: 1.7 mg B6 is the 51+ male RDA and
  // 20 µg vitamin D is the 71+ RDA.
  assert.equal(NUTRIENT_REFERENCES.vitamin_b6_mg.target, 1.3)
  assert.equal(NUTRIENT_REFERENCES.vitamin_b6_mg.basis, "rda")
  assert.equal(NUTRIENT_REFERENCES.vitamin_d_ug.target, 15)
  assert.equal(NUTRIENT_REFERENCES.vitamin_d_ug.basis, "rda")

  const doc = fs.readFileSync(path.join(ROOT, "system/nutrient-reference-values.md"), "utf8")
  assert.match(doc, /`vitamin_b6_mg` \| 1\.3 \| mg/)
  assert.match(doc, /`vitamin_d_ug` \| 15 \| µg/)
  assert.doesNotMatch(doc, /Values under review/)

  // Food pages and recipe pages must read one table, not two that can drift.
  const foodTable = fs.readFileSync(path.join(ROOT, "src/components/NutritionTable.tsx"), "utf8")
  assert.match(foodTable, /ADULT_REFERENCE_INTAKE/)
  assert.doesNotMatch(foodTable, /vitamin_b6_mg: 1\.7/)
  assert.doesNotMatch(foodTable, /const RDA_VALUES: Record<string, number> = \{\n/)
  assert.equal(
    fs.existsSync(path.join(ROOT, "src/utils/recipeNutritionWeighted.ts")),
    false,
    "the stale third copy of the reference table is gone",
  )
})

test("the reference recipes display the recalculated rows", () => {
  const cases = [
    {
      recipe: bowl,
      summary: ["290 kcal", "17 g", "23 g", "17 g", "4.3 g", "16 g", "4.5 g", "55 mg"],
      keys: [
        "vitamin_b12_ug",
        "phosphorus_mg",
        "vitamin_b2_mg",
        "manganese_mg",
        "copper_mg",
        "selenium_ug",
        "calcium_mg",
        "magnesium_mg",
      ],
      pcts: [47, 46, 36, 35, 32, 32, 19, 17],
    },
    {
      recipe: skillet,
      summary: ["430 kcal", "24 g", "37 g", "5.9 g", "7.3 g", "22 g", "4.8 g", "220 mg"],
      keys: [
        "vitamin_k_ug",
        "vitamin_b2_mg",
        "copper_mg",
        "selenium_ug",
        "phosphorus_mg",
        "manganese_mg",
        "folate_ug",
        "choline_mg",
      ],
      pcts: [293, 89, 86, 81, 75, 70, 66, 65],
    },
  ]

  const unitOf = {
    kcal: "kcal",
    protein_g: "g",
    carbs_g: "g",
    sugar_g: "g",
    fibre_g: "g",
    fat_g: "g",
    sat_fat_g: "g",
    sodium_mg: "mg",
  }

  for (const {recipe, summary, keys, pcts} of cases) {
    const result = calculateRecipeNutrition(recipe.data, foodDocs)
    assert.deepEqual(
      PUBLIC_CORE_KEYS.map((key) => formatAmount(result.perServing[key], unitOf[key])),
      summary,
      `${recipe.path} summary`,
    )
    const rows = selectKeyMicronutrients(result, recipe.data)
    assert.deepEqual(rows.map((r) => r.key), keys, `${recipe.path} key micronutrients`)
    assert.deepEqual(rows.map((r) => Math.round(r.pct)), pcts, `${recipe.path} percentages`)
  }

  // The corrected B6 lifts the bowl to 14.9%, still short of admission, and the
  // skillet to 52.6%, which qualifies but ranks below the eight rows shown.
  const bowlResult = calculateRecipeNutrition(bowl.data, foodDocs)
  const skilletResult = calculateRecipeNutrition(skillet.data, foodDocs)
  assert.ok(percentOfReference("vitamin_b6_mg", bowlResult.perServing.vitamin_b6_mg) < 15)
  assert.ok(percentOfReference("vitamin_b6_mg", skilletResult.perServing.vitamin_b6_mg) > 15)
  assert.equal(
    selectKeyMicronutrients(skilletResult, skillet.data).some((r) => r.key === "vitamin_b6_mg"),
    false,
    "an eligible nutrient outside the top eight is held back by the cap, not by the threshold",
  )
})

test("reference percentages name the right basis and are never invented", () => {
  assert.equal(referenceBasis("iron_mg"), "rda")
  assert.equal(referenceBasisLabel("iron_mg"), "% RDA")
  for (const key of ["vitamin_k_ug", "manganese_mg", "vitamin_b5_mg", "potassium_mg", "choline_mg"]) {
    assert.equal(referenceBasis(key), "ai", `${key} has an Adequate Intake, not an RDA`)
    assert.equal(referenceBasisLabel(key), "% AI")
  }

  // Sodium has a risk-reduction guideline, not a target to reach.
  assert.equal(referenceBasis("sodium_mg"), "guideline")
  assert.equal(percentOfReference("sodium_mg", 500), null)

  // Bioactives have no recognised target, so no percentage may be manufactured.
  for (const key of ["ala_mg", "dha_mg", "epa_mg"]) {
    assert.equal(percentOfReference(key, 500), null, `${key} must not be given a percentage`)
    assert.equal(referenceBasisLabel(key), null)
  }
})

test("upper limits are a boundary, and supplement-only limits never flag a food", () => {
  assert.equal(exceedsUpperLimit("zinc_mg", 45), true, "total-intake limits apply")
  assert.equal(exceedsUpperLimit("zinc_mg", 12), false)
  assert.equal(
    exceedsUpperLimit("magnesium_mg", 900),
    false,
    "the magnesium limit covers supplements, not food",
  )
  assert.equal(exceedsUpperLimit("folate_ug", 5000), false, "the folate limit covers folic acid")
  assert.equal(exceedsUpperLimit("vitamin_a_rae_ug", 9000), false, "preformed retinol only")
})

test("calculation details name a concise composition record", () => {
  assert.deepEqual(
    conciseCompositionRecord("named food-page record (Blueberries, raw; FDC 171711)"),
    {record: "USDA FDC 171711 — Blueberries, raw", note: null},
  )
  const quinoa = conciseCompositionRecord(
    "USDA SR Legacy FDC 168917 (Quinoa, cooked). The Quinoa food page records uncooked grain.",
  )
  assert.equal(quinoa.record, "USDA FDC 168917 — Quinoa, cooked")
  assert.match(quinoa.note, /uncooked grain/)

  const ui = fs.readFileSync(path.join(ROOT, "src/theme/RecipeNutrition/index.tsx"), "utf8")
  assert.match(ui, /Composition record/)
  assert.match(ui, /Weight used/)
  assert.match(ui, /Assumptions and exclusions/)
  assert.doesNotMatch(ui, /Composition source/, "the verbose column header is gone")
})

test("the contributor summary names only the leading foods", () => {
  const result = calculateRecipeNutrition(skillet.data, foodDocs)
  assert.equal(PUBLIC_CONTRIBUTORS_PER_ROW, 2)
  for (const key of ["kcal", "protein_g", "fibre_g"]) {
    const shown = materialContributors(key, result.byFood, result.perServing[key])
    assert.ok(shown.length <= PUBLIC_CONTRIBUTORS_PER_ROW, `${key} lists too many contributors`)
  }
  const full = materialContributors("fibre_g", result.byFood, result.perServing.fibre_g, Infinity)
  assert.ok(full.length >= 3, "the complete arithmetic is still reachable")
})

test("the calculated default combination is stated with the ingredients", () => {
  assert.equal(
    defaultCombination(skillet.data),
    "Nutrition calculation uses spinach and quinoa as the default combination.",
  )
  assert.equal(defaultCombination(bowl.data), null, "a recipe without choices says nothing")

  for (const {file, raw, data} of recipePages()) {
    if (!defaultCombination(data)) continue
    assert.match(
      raw,
      /<RecipeCalculationDefault details=\{frontMatter\} \/>/,
      `${file} offers a choice but never names the calculated default`,
    )
  }
})

test("a sodium exclusion sits beside the summary, not only in the dropdown", () => {
  const ui = fs.readFileSync(path.join(ROOT, "src/theme/RecipeNutrition/index.tsx"), "utf8")
  assert.match(ui, /summaryCaveats/)
  assert.match(ui, /\/\^sodium\\b\/i/, "sodium assumptions are lifted out of the deferred list")
  const result = calculateRecipeNutrition(skillet.data, foodDocs)
  assert.ok(
    (result.assumptions || []).some((a) => /^sodium/i.test(a)),
    "the skillet declares a sodium exclusion to surface",
  )
})

test("recipe pages follow the canonical order and expose no unvalidated matrix", () => {
  for (const {file, raw} of recipePages()) {
    const headings = raw
      .split("\n")
      .filter((line) => /^## /.test(line))
      .map((line) => line.replace(/^## /, "").trim())

    const index = (re) => headings.findIndex((h) => re.test(h))
    const ingredients = index(/^Ingredients/i)
    const method = index(/^Method$/i)
    const nutrition = index(/^Nutrition/i)
    const explore = index(/^Explore the foods and substances$/i)

    assert.ok(ingredients >= 0 && method > ingredients, `${file}: Method must follow Ingredients`)
    assert.ok(nutrition > method, `${file}: Nutrition must follow Method`)
    assert.equal(explore, headings.length - 1, `${file}: foods section must come last`)

    const brain = index(/^Brain Health Notes$/i)
    if (brain >= 0) assert.ok(brain < explore && brain > nutrition, `${file}: Brain notes misplaced`)

    assert.equal(index(/^Foods\/Substances$/i), -1, `${file} still uses the old foods heading`)
    assert.equal(
      index(/^Biological Target Matrix$/i),
      -1,
      `${file} exposes a matrix section that has not passed validation`,
    )
    assert.doesNotMatch(raw, /<RecipeMatrix/, `${file} still renders an unvalidated matrix`)
  }
})

test("recipe prose does not restate the calculated summary table", () => {
  for (const {file, raw, content, data} of recipePages()) {
    assert.doesNotMatch(
      content,
      /^\s*[-*]\s*\*\*(Energy|Protein|Carbohydrates?|Fat|Fibre|Sodium)[:*]/m,
      `${file} hand-types a nutrient summary list that will drift from the table`,
    )

    const result = calculateRecipeNutrition(data, foodDocs)
    if (result.status !== "calculated") continue

    // The published energy figure must appear once, from the component. Prose may
    // still cite withdrawn estimates or alternative serving splits, which differ.
    const published = Math.round(result.perServing.kcal)
    assert.doesNotMatch(
      content,
      new RegExp(`\\b${published}\\s*kcal`),
      `${file} repeats the published ${published} kcal in prose`,
    )
  }
})

