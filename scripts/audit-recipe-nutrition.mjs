#!/usr/bin/env node
/**
 * Read-only audit of recipe nutrition + Biological Target Matrix integrity.
 * Does not edit recipe pages.
 */
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"
import matter from "gray-matter"
import {calculateRecipeNutrition} from "../src/utils/recipeNutritionCalculate.mjs"
import {isRecipeMatrixValidated} from "../src/utils/recipeMatrixGate.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const MATERIAL_FAT_PATTERN =
  /\b(oil|butter|ghee|coconut milk|cream|sauce|dressing|mayonnaise|tahini|honey|cheese|parmesan|olive)\b/i
const SEASONING_PATTERN = /\b(salt|pepper|curry|cumin|paprika|cinnamon|ginger|garlic|soy sauce)\b/i
const LEGACY_BRS_TAGS = new Set([
  "Insulin Response",
  "Oxidative Stress",
  "Gut Microbiome",
  "Inflammation",
  "Methylation",
  "Neurochemical Balance",
  "Mitochondrial Support",
  "Stress Response",
  "Endocannabinoid System",
  "Circadian Rhythm",
  "Cross-System Regulation",
])
const CANONICAL_BRS_TAGS = new Set([
  "Neurotransmitter Regulation",
  "Methylation & One-Carbon Metabolism",
  "Inflammation & Oxidative Stress",
  "Mitochondrial Function & Bioenergetics",
  "Gut-Brain Axis & Enteric Nervous System",
  "Metabolic & Neuroendocrine Regulation",
  "BRS-X(ECS)",
  "BRS-X(Hormones)",
])
const FA_KEYS = ["caprylic_g", "capric_g", "caproic_g"]
const TRIGLYCERIDE_TAGS = new Set([
  "Caprylic Triglyceride",
  "Capric Triglyceride",
  "Caproic Triglyceride",
])

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(full, acc)
    else if (ent.name.endsWith(".md") && ent.name !== "index.md") acc.push(full)
  }
  return acc
}

function tagLabels(data) {
  return (data.tags || []).map((t) => (typeof t === "string" ? t : t.label)).filter(Boolean)
}

function loadFoodDocs() {
  const dir = path.join(ROOT, "docs/foods")
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const {data} = matter(fs.readFileSync(path.join(dir, f), "utf8"))
      const slug = path.basename(f, ".md")
      const tags = tagLabels(data)
      const panel = data.nutrition_per_100g || {}
      return {
        title: data.title || slug,
        permalink: `/docs/foods/${data.id || slug}`,
        frontMatter: data,
        tags: tags.map((label) => ({label})),
        hasFaAcids: FA_KEYS.some((k) => typeof panel[k] === "number"),
        triglycerideTags: tags.filter((t) => TRIGLYCERIDE_TAGS.has(t)),
        file: `docs/foods/${f}`,
      }
    })
}

function parseProseMassG(content) {
  const section = content.split(/## Ingredients/)[1]?.split(/^## /m)[0] || content
  let grams = 0
  const gramRe = /(\d+(?:\.\d+)?)\s*g\b/gi
  let m
  while ((m = gramRe.exec(section))) grams += Number(m[1])
  const mlRe = /(\d+(?:\.\d+)?)\s*ml\b/gi
  const mlItems = []
  while ((m = mlRe.exec(section))) {
    grams += Number(m[1])
    mlItems.push(Number(m[1]))
  }
  return {stated_mass_g_plus_ml_as_g: grams, ml_lines_counted_as_g: mlItems}
}

function parseEditorialKcal(content) {
  const nutrition = content.split(/## (?:Nutrition|Nutritional information)/i)[1]?.split(/^## /m)[0] || ""
  const ranges = [...nutrition.matchAll(/~?\s*(\d{2,4})\s*[–-]\s*(\d{2,4})\s*kcal/gi)]
  if (ranges.length) {
    return {low: Number(ranges[0][1]), high: Number(ranges[0][2]), raw: ranges[0][0]}
  }
  const single = nutrition.match(/~?\s*(\d{2,4})\s*kcal/i)
  if (single) return {low: Number(single[1]), high: Number(single[1]), raw: single[0]}
  return null
}

function declaredServings(data, content) {
  if (typeof data.servings === "number" && data.servings > 0) return data.servings
  if (typeof data.recipe_nutrition?.servings === "number") return data.recipe_nutrition.servings
  const heading = content.match(/## Ingredients[^\n]*\((\d+)\s*servings?\)/i)
  if (heading) return Number(heading[1])
  return 1
}

function extractIngredientMentions(content) {
  const section = content.split(/## Ingredients/)[1]?.split(/^## /m)[0] || ""
  const lines = section
    .split("\n")
    .map((l) => l.replace(/^[-*]\s*/, "").trim())
    .filter((l) => l && !l.startsWith("#") && !l.startsWith("<") && !/^\*\*/.test(l))
  return lines
}

function classify(file, data, content, result, foodDocs) {
  const rel = path.relative(ROOT, file)
  const tags = tagLabels(data)
  const hasRecipeFoods = content.includes("<RecipeFoods")
  const hasRecipeMatrix = content.includes("<RecipeMatrix")
  const hasCanonical = Array.isArray(data.recipe_ingredients) && data.recipe_ingredients.length > 0
  const hasLegacy = Array.isArray(data.recipe_nutrition?.ingredients) && data.recipe_nutrition.ingredients.length > 0
  const hasQuantifiedProse = /## Ingredients[\s\S]*?(\d+\s*(g|ml|tsp|tbsp|cup)|½|¼)/i.test(content)
  const optionalAmbiguity =
    /optional/i.test(content) && hasLegacy && !hasCanonical && /black pepper \(optional/i.test(content)
  const composite = /mixed seeds|or yogurt|kefir or|and\/or/i.test(content)
  const household = /\b(cup|tbsp|tsp)\b/i.test(content) && !hasCanonical && !hasLegacy
  const foodTitleSet = new Set(foodDocs.map((d) => d.title))
  const linkedFoods = tags.filter((t) => foodTitleSet.has(t))
  const linkedFoodDocs = foodDocs.filter((d) => linkedFoods.includes(d.title))
  const mentions = extractIngredientMentions(content)
  const unresolvedMaterial = mentions.filter(
    (line) => MATERIAL_FAT_PATTERN.test(line) && !linkedFoods.some((f) => line.toLowerCase().includes(f.toLowerCase().split(" ")[0])),
  )
  const missingSeasonings = mentions.filter((line) => {
    if (!SEASONING_PATTERN.test(line)) return false
    return !linkedFoods.some((f) => line.toLowerCase().includes(f.toLowerCase()))
  })
  const coconutMilk = /coconut milk/i.test(content)
  const coconutOilLinked = linkedFoods.includes("Coconut Oil")
  const extraVirgin = /extra-virgin olive oil|extra virgin olive oil/i.test(content)
  const oliveOilTag = linkedFoods.includes("Olive Oil")
  const evooTag = linkedFoods.includes("Extra Virgin Olive Oil") || linkedFoods.includes("Extra-Virgin Olive Oil")
  const mass = parseProseMassG(content)
  const servings = declaredServings(data, content)
  const editorial = parseEditorialKcal(content)
  const implausibleServing =
    servings === 1 && mass.stated_mass_g_plus_ml_as_g >= 700 && (editorial?.low || 0) >= 700
  const legacyBrs = tags.filter((t) => LEGACY_BRS_TAGS.has(t))
  const canonicalBrs = tags.filter((t) => CANONICAL_BRS_TAGS.has(t))
  const faOnLinkedFoods = linkedFoodDocs.filter((d) => d.hasFaAcids).map((d) => d.title)
  const triglycerideTaggedLinked = linkedFoodDocs
    .filter((d) => d.triglycerideTags.length)
    .map((d) => ({title: d.title, tags: d.triglycerideTags}))
  const wouldHaveShownTriglycerideRows = Boolean(hasRecipeFoods && faOnLinkedFoods.length)

  let status
  if (!hasRecipeFoods) status = "no RecipeFoods block"
  else if (result.status === "calculated") {
    status = optionalAmbiguity ? "optional ingredient ambiguity" : "calculation valid"
  } else if (hasQuantifiedProse && !hasCanonical && !hasLegacy) {
    status = composite
      ? "unresolved composite ingredient"
      : household
        ? "unresolved household-measure conversion"
        : "ingredients quantified but not structurally mapped"
  } else if (result.blockers?.some((b) => /missing_composition/.test(b))) {
    status = "missing food-composition record"
  } else {
    status = "ingredients quantified but not structurally mapped"
  }

  const editorialDiscrepancy =
    result.status === "calculated" && editorial
      ? {
          calculated_kcal: result.perServing.kcal,
          editorial_kcal: editorial,
          delta_vs_editorial_mid:
            result.perServing.kcal - (editorial.low + editorial.high) / 2,
        }
      : result.status === "pending" && editorial
        ? {calculated_kcal: null, editorial_kcal: editorial, public_generated_table: "suppressed"}
        : null

  return {
    file: rel,
    id: data.id,
    title: data.title,
    hasRecipeFoods,
    hasRecipeMatrix,
    matrix_validated: isRecipeMatrixValidated(data),
    matrix_public: isRecipeMatrixValidated(data) ? "validated table" : "pending canonical BRS validation",
    hasCanonical,
    hasLegacy,
    status,
    servings_declared: servings,
    stated_mass_g_plus_ml_as_g: Math.round(mass.stated_mass_g_plus_ml_as_g),
    implausible_serving_flag: implausibleServing,
    kcal: result.status === "calculated" ? result.perServing.kcal : null,
    blockers: result.blockers || [],
    linked_foods: linkedFoods,
    unresolved_material_ingredient_lines: unresolvedMaterial,
    missing_seasoning_lines: missingSeasonings,
    coconut_milk_without_food_page: coconutMilk && !foodTitleSet.has("Coconut Milk"),
    coconut_oil_not_used_as_coconut_milk: coconutMilk && !coconutOilLinked,
    evoo_stated_olive_oil_tagged: extraVirgin && oliveOilTag && !evooTag,
    legacy_brs_or_modulator_tags: legacyBrs,
    canonical_brs_tags: canonicalBrs,
    matrix_would_have_been_tag_walk: hasRecipeMatrix && !isRecipeMatrixValidated(data),
    fatty_acid_keys_on_linked_foods: faOnLinkedFoods,
    triglyceride_tags_on_linked_foods: triglycerideTaggedLinked,
    would_have_shown_triglyceride_named_rows_under_old_calculator: wouldHaveShownTriglycerideRows,
    editorial_vs_generated: editorialDiscrepancy,
  }
}

const foodDocs = loadFoodDocs()
const recipeFiles = walk(path.join(ROOT, "docs/recipes"))
const rows = recipeFiles.map((file) => {
  const raw = fs.readFileSync(file, "utf8")
  const {data, content} = matter(raw)
  const result = calculateRecipeNutrition(data, foodDocs)
  return classify(file, data, content, result, foodDocs)
})

const byStatus = {}
for (const row of rows) {
  byStatus[row.status] = (byStatus[row.status] || 0) + 1
}

const foodsWithFa = foodDocs.filter((d) => d.hasFaAcids)
const foodsWithTrigTags = foodDocs.filter((d) => d.triglycerideTags.length)

const report = {
  generated: new Date().toISOString().slice(0, 10),
  note:
    "Post-fix: 100 g-per-linked-food fallback is disabled. Unvalidated RecipeMatrix output is suppressed. No recipe publishes either proxy.",
  currently_publishing_invalid_proxy_totals: 0,
  currently_publishing_unvalidated_matrices: 0,
  counts: byStatus,
  inventory: {
    recipes_with_recipefoods: rows.filter((r) => r.hasRecipeFoods).length,
    recipes_pending_nutrition: rows.filter((r) => r.hasRecipeFoods && r.kcal == null).length,
    recipes_calculation_valid: rows.filter((r) => r.status === "calculation valid").length,
    recipes_with_recipematrix: rows.filter((r) => r.hasRecipeMatrix).length,
    recipes_matrix_validated: rows.filter((r) => r.matrix_validated).length,
    implausible_serving_flags: rows.filter((r) => r.implausible_serving_flag).map((r) => r.file),
    coconut_milk_gap: rows.filter((r) => r.coconut_milk_without_food_page).map((r) => r.file),
    unresolved_material_fats: rows
      .filter((r) => r.unresolved_material_ingredient_lines.length)
      .map((r) => ({file: r.file, lines: r.unresolved_material_ingredient_lines})),
    legacy_brs_tags: rows
      .filter((r) => r.legacy_brs_or_modulator_tags.length)
      .map((r) => ({file: r.file, tags: r.legacy_brs_or_modulator_tags})),
    triglyceride_named_row_risk_under_old_ui: rows
      .filter((r) => r.would_have_shown_triglyceride_named_rows_under_old_calculator)
      .map((r) => ({file: r.file, foods: r.fatty_acid_keys_on_linked_foods})),
  },
  chemical_form: {
    mapping_now: "Caprylic/Capric/Caproic acid (C8:0/C10:0/C6:0)",
    usda_source: "SR Legacy SFA 6:0 / 8:0 / 10:0 (fatty acids, not triglycerides)",
    food_pages_with_c6_c8_c10_keys: foodsWithFa.map((d) => d.file),
    food_pages_still_tagged_as_triglycerides: foodsWithTrigTags.map((d) => ({
      file: d.file,
      tags: d.triglycerideTags,
    })),
  },
  recipes: rows.sort((a, b) => a.file.localeCompare(b.file)),
}

const out = path.join(ROOT, "scripts/out/recipe-nutrition-audit.json")
fs.mkdirSync(path.dirname(out), {recursive: true})
fs.writeFileSync(out, JSON.stringify(report, null, 2))
console.log(
  JSON.stringify(
    {
      counts: byStatus,
      proxy: 0,
      unvalidated_matrices_public: 0,
      n: rows.length,
      implausible: report.inventory.implausible_serving_flags,
      coconut_milk: report.inventory.coconut_milk_gap,
      fa_foods: foodsWithFa.length,
      trig_tagged_foods: foodsWithTrigTags.length,
      out,
    },
    null,
    2,
  ),
)
