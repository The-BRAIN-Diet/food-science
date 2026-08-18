import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {test} from "node:test"
import {fileURLToPath} from "node:url"
import matter from "gray-matter"
import {
  PENDING_NUTRITION_MESSAGE,
  calculateRecipeNutrition,
  canCalculateDefault,
  isDefaultIncluded,
  normalizeRecipeIngredients,
  resolveFoodDoc,
  scaleNutrient,
  selectPublicRows,
} from "../src/utils/recipeNutritionCalculate.mjs"
import {
  PENDING_MATRIX_MESSAGE,
  isRecipeMatrixValidated,
} from "../src/utils/recipeMatrixGate.mjs"
import {RECIPE_COMPOSITION_SNAPSHOTS} from "../src/data/recipeCompositionSnapshots.mjs"

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

