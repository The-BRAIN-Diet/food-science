/**
 * Recipe nutrition calculator.
 *
 * Never sums 100 g of each linked food. A quantitative table is allowed only when
 * every default-included ingredient has a composition record and a resolved edible
 * weight in grams.
 */

import {resolveCompositionSnapshot} from "../data/recipeCompositionSnapshots.mjs"
import {
  ADULT_REFERENCE_INTAKE,
  percentOfReference,
  referenceBasis,
} from "./nutrientReference.mjs"

export {ADULT_REFERENCE_INTAKE}

export const PENDING_NUTRITION_MESSAGE =
  "Detailed nutrition calculation pending ingredient-weight reconciliation."

/**
 * Fraction of the intake target at which a vitamin or mineral earns a place in
 * the public *Key vitamins and minerals* panel. Everything below it is still
 * calculated, still returned, and still available to daily aggregation; it is
 * simply not claimed as a headline of this meal.
 */
export const KEY_MICRONUTRIENT_FRACTION = 0.15

/** Ceiling on the public panel, so a long valid list cannot become a wall of rows. */
export const MAX_KEY_MICRONUTRIENTS = 8

/**
 * A food is a public nutrient *contributor* only when it supplies at least this
 * fraction of that nutrient’s recipe total. Trace analytical values may still
 * enter the numeric total; they must not clutter contributor display.
 */
export const MATERIAL_CONTRIBUTOR_FRACTION = 0.1

/** Leading contributors named per summary row. The full arithmetic stays in `byFood`. */
export const PUBLIC_CONTRIBUTORS_PER_ROW = 2

/** Visible meal summary, in public display order. */
export const PUBLIC_CORE_KEYS = [
  "kcal",
  "protein_g",
  "carbs_g",
  "sugar_g",
  "fibre_g",
  "fat_g",
  "sat_fat_g",
  "sodium_mg",
]

export const PUBLIC_MICRONUTRIENT_KEYS = [
  "iron_mg",
  "zinc_mg",
  "magnesium_mg",
  "phosphorus_mg",
  "manganese_mg",
  "selenium_ug",
  "calcium_mg",
  "potassium_mg",
  "copper_mg",
  "choline_mg",
  "folate_ug",
  "vitamin_b12_ug",
  "vitamin_b6_mg",
  "vitamin_b2_mg",
  "vitamin_b1_mg",
  "vitamin_b3_mg",
  "vitamin_b5_mg",
  "vitamin_c_mg",
  "vitamin_a_rae_ug",
  "vitamin_d_ug",
  "vitamin_e_mg",
  "vitamin_k_ug",
  "iodine_ug",
]

export const PUBLIC_BRAIN_KEYS = ["ala_mg", "epa_mg", "dha_mg"]

/** Internal USDA ALA+EPA+DHA rollup. Never shown beside the component acids. */
export const OMEGA3_SUM_KEY = "omega3_mg"

const ALL_CALC_KEYS = [
  ...PUBLIC_CORE_KEYS,
  ...PUBLIC_MICRONUTRIENT_KEYS,
  ...PUBLIC_BRAIN_KEYS,
  OMEGA3_SUM_KEY,
]

function isFinitePositive(n) {
  return typeof n === "number" && Number.isFinite(n) && n > 0
}

function isNumericNutrient(v) {
  return typeof v === "number" && Number.isFinite(v)
}

function permalinkSlug(permalink) {
  if (!permalink) return ""
  const parts = String(permalink).split("/").filter(Boolean)
  return (parts[parts.length - 1] || "").toLowerCase()
}

export function resolveFoodDoc(slugOrTitle, foodDocs) {
  if (!slugOrTitle || !Array.isArray(foodDocs)) return null
  const raw = String(slugOrTitle).trim()
  const slug = raw.toLowerCase().replace(/_/g, "-")
  const title = raw.toLowerCase()
  return (
    foodDocs.find((d) => permalinkSlug(d.permalink) === slug) ||
    foodDocs.find((d) => String(d.frontMatter?.id || "").toLowerCase() === slug) ||
    foodDocs.find((d) => String(d.title || "").toLowerCase() === title) ||
    null
  )
}

function compositionPanel(ingredient, foodDocs) {
  if (ingredient.nutrition_per_100g && typeof ingredient.nutrition_per_100g === "object") {
    return {
      panel: ingredient.nutrition_per_100g,
      source: ingredient.composition_basis || "ingredient snapshot",
      foodTitle: ingredient.display || ingredient.food_slug || "snapshot",
      foodDoc: null,
    }
  }
  if (ingredient.composition_ref) {
    const snapshot = resolveCompositionSnapshot(ingredient.composition_ref)
    if (!snapshot) return null
    return {
      panel: snapshot.nutrition_per_100g,
      source:
        ingredient.composition_basis ||
        `${snapshot.description} (USDA FDC ${snapshot.fdc_id})`,
      foodTitle: ingredient.display || snapshot.description,
      foodDoc: null,
    }
  }
  const slug = ingredient.food_slug || ingredient.food
  const doc = resolveFoodDoc(slug, foodDocs)
  const panel = doc?.frontMatter?.nutrition_per_100g
  if (!doc || !panel || typeof panel !== "object") return null
  return {
    panel,
    source: ingredient.composition_basis || `${doc.title} food-page record`,
    foodTitle: doc.title,
    foodDoc: doc,
  }
}

export function isDefaultIncluded(ingredient) {
  if (ingredient.included_in_default === false) return false
  if (ingredient.optional === true && ingredient.included_in_default !== true) return false
  return true
}

/**
 * Map either canonical `recipe_ingredients` or legacy `recipe_nutrition.ingredients`.
 */
export function normalizeRecipeIngredients(frontMatter) {
  const canonical = frontMatter?.recipe_ingredients
  if (Array.isArray(canonical) && canonical.length) {
    return {
      servings:
        typeof frontMatter.servings === "number" && frontMatter.servings > 0
          ? frontMatter.servings
          : typeof frontMatter.recipe_nutrition?.servings === "number" &&
              frontMatter.recipe_nutrition.servings > 0
            ? frontMatter.recipe_nutrition.servings
            : 1,
      ingredients: canonical,
      source: "recipe_ingredients",
    }
  }
  const legacy = frontMatter?.recipe_nutrition
  if (legacy && Array.isArray(legacy.ingredients) && legacy.ingredients.length) {
    return {
      servings: typeof legacy.servings === "number" && legacy.servings > 0 ? legacy.servings : 1,
      ingredients: legacy.ingredients.map((ing) => ({
        display: ing.display || ing.food,
        food_slug: ing.food_slug || null,
        food: ing.food,
        quantity: ing.quantity ?? null,
        unit: ing.unit ?? (typeof ing.grams === "number" ? "g" : null),
        calculation_weight_g: ing.calculation_weight_g ?? ing.grams ?? null,
        included_in_default: ing.included_in_default !== false,
        optional: Boolean(ing.optional),
        composition_basis: ing.composition_basis || "named food-page record",
        conversion_source: ing.conversion_source || "recipe_nutrition.grams",
        nutrition_per_100g: ing.nutrition_per_100g || null,
      })),
      source: "recipe_nutrition",
    }
  }
  return { servings: 1, ingredients: [], source: null }
}

export function scaleNutrient(valuePer100g, weightG) {
  if (!isNumericNutrient(valuePer100g)) return { status: "not_reported" }
  if (typeof weightG !== "number" || !Number.isFinite(weightG) || weightG <= 0) {
    return { status: "unresolved_weight" }
  }
  return { status: "numeric", value: (valuePer100g * weightG) / 100 }
}

export function defaultIngredientBlockers(ingredient, foodDocs) {
  const blockers = []
  if (!isDefaultIncluded(ingredient)) return blockers
  const weight = ingredient.calculation_weight_g
  if (!isFinitePositive(weight)) {
    blockers.push("unresolved_weight")
  }
  const comp = compositionPanel(ingredient, foodDocs)
  if (!comp) blockers.push("missing_composition")
  if (ingredient.quantity_is_range && ingredient.calculation_weight_g == null) {
    blockers.push("unresolved_range")
  }
  return blockers
}

export function canCalculateDefault(ingredients, foodDocs) {
  const defaults = (ingredients || []).filter(isDefaultIncluded)
  if (!defaults.length) return false
  return defaults.every((ing) => defaultIngredientBlockers(ing, foodDocs).length === 0)
}

/**
 * @returns {{
 *   status: "calculated" | "pending",
 *   pendingMessage?: string,
 *   servings: number,
 *   recipeTotals: Record<string, number>,
 *   perServing: Record<string, number>,
 *   notReported: Record<string, string[]>,
 *   audit: object[],
 *   blockers: string[],
 * }}
 */
export function calculateRecipeNutrition(frontMatter, foodDocs) {
  const { servings, ingredients, source } = normalizeRecipeIngredients(frontMatter)
  const defaults = ingredients.filter(isDefaultIncluded)
  const blockers = []
  if (!source || !defaults.length) blockers.push("no_structured_ingredients")
  if (source && frontMatter?.servings_unresolved === true) blockers.push("undeclared_servings")
  for (const ing of defaults) {
    for (const b of defaultIngredientBlockers(ing, foodDocs)) {
      blockers.push(`${ing.food_slug || ing.food || ing.display}:${b}`)
    }
  }

  /** Non-default ingredients, disclosed publicly so the total is never silently short. */
  const exclusions = ingredients
    .filter((ing) => !isDefaultIncluded(ing))
    .map((ing) => ({
      display: ing.display || ing.food_slug || ing.food,
      reason: ing.excluded_reason || (ing.optional ? "optional ingredient" : "excluded from default"),
    }))

  const assumptions = Array.isArray(frontMatter?.nutrition_assumptions)
    ? frontMatter.nutrition_assumptions.map(String)
    : []

  /** Nutrients the sources cannot establish for this recipe. Never rendered as a number. */
  const unresolved = {}
  for (const row of frontMatter?.nutrition_unresolved || []) {
    if (row?.key) unresolved[row.key] = row.reason || "not established from the available records"
  }

  if (blockers.length) {
    return {
      status: "pending",
      pendingMessage: PENDING_NUTRITION_MESSAGE,
      pendingReason:
        typeof frontMatter?.nutrition_pending_reason === "string"
          ? frontMatter.nutrition_pending_reason
          : null,
      servings,
      recipeTotals: {},
      perServing: {},
      notReported: {},
      audit: [],
      exclusions,
      assumptions,
      unresolved,
      blockers,
      source,
    }
  }

  const recipeTotals = {}
  const notReported = {}
  const byFood = {}
  const audit = []

  for (const ing of defaults) {
    const weight = ing.calculation_weight_g
    const comp = compositionPanel(ing, foodDocs)
    const panel = comp.panel
    const foodTitle = comp.foodTitle
    const contributions = {}
    const missing = []

    for (const key of ALL_CALC_KEYS) {
      const scaled = scaleNutrient(panel[key], weight)
      if (scaled.status === "not_reported") {
        missing.push(key)
        if (!notReported[key]) notReported[key] = []
        notReported[key].push(foodTitle)
        continue
      }
      if (scaled.status !== "numeric") continue
      contributions[key] = scaled.value
      recipeTotals[key] = (recipeTotals[key] || 0) + scaled.value
      if (!byFood[key]) byFood[key] = {}
      byFood[key][foodTitle] = (byFood[key][foodTitle] || 0) + scaled.value
    }

    const supplementary = Array.isArray(ing.nutrition_supplementary_sources)
      ? ing.nutrition_supplementary_sources
      : Array.isArray(comp.foodDoc?.frontMatter?.nutrition_supplementary_sources)
        ? comp.foodDoc.frontMatter.nutrition_supplementary_sources
        : []
    const supplementaryNumeric = []
    for (const row of supplementary) {
      if (typeof row?.value !== "number" || !Number.isFinite(row.value)) continue
      const note = `${row.status || ""} ${row.amount_display || ""} ${row.notes || ""} ${row.source_note || ""}`
      if (/present|trace|range|varies|formulation|order-of-magnitude|approx|estimat/i.test(note)) {
        continue
      }
      const unit = String(row.unit || "").toLowerCase()
      let per100 = row.value
      if (unit === "g") per100 = row.value * 1000
      else if (unit && unit !== "mg") continue
      const scaled = scaleNutrient(per100, weight)
      if (scaled.status !== "numeric") continue
      const rawKey = String(row.key || row.label || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "")
      const key = /_(mg|ug|g)$/.test(rawKey) ? rawKey : `${rawKey}_mg`
      supplementaryNumeric.push({
        key,
        label: row.label || row.key,
        value: scaled.value,
      })
      recipeTotals[key] = (recipeTotals[key] || 0) + scaled.value
      if (!byFood[key]) byFood[key] = {}
      byFood[key][foodTitle] = (byFood[key][foodTitle] || 0) + scaled.value
    }

    audit.push({
      display: ing.display,
      food: foodTitle,
      food_slug: ing.food_slug || ing.food || null,
      weight_g: weight,
      conversion_source: ing.conversion_source || null,
      composition_basis: comp.source,
      contributions,
      supplementaryNumeric,
      not_reported_keys: missing,
    })
  }

  const perServing = {}
  for (const [key, total] of Object.entries(recipeTotals)) {
    perServing[key] = total / servings
  }

  return {
    status: "calculated",
    servings,
    recipeTotals,
    perServing,
    notReported,
    byFood,
    audit,
    exclusions,
    assumptions,
    unresolved,
    blockers: [],
    source,
  }
}

export function percentReferenceIntake(key, perServingAmount) {
  return percentOfReference(key, perServingAmount)
}

/** Eligible for the public key panel on its own proportion, before ranking or capping. */
export function isKeyMicronutrient(key, perServingAmount) {
  const pct = percentOfReference(key, perServingAmount)
  if (pct == null) return false
  return pct >= KEY_MICRONUTRIENT_FRACTION * 100
}

/**
 * Vitamins and minerals for the public panel: everything at or above the
 * threshold, plus any editorially promoted key, ranked by proportion of target
 * and capped. Promotions are pinned ahead of the ranking because they are there
 * to say something the proportion does not.
 *
 * @returns {{key: string, amount: number, pct: number, basis: string, promoted?: string}[]}
 */
export function selectKeyMicronutrients(result, frontMatter) {
  if (!result || result.status !== "calculated") return []
  const unresolved = result.unresolved || {}
  const promotions = new Map()
  for (const row of frontMatter?.nutrition_key_micronutrients || []) {
    if (row?.key) promotions.set(row.key, row.reason || "editorial exception")
  }

  const candidates = []
  for (const key of PUBLIC_MICRONUTRIENT_KEYS) {
    if (unresolved[key]) continue
    const amount = result.perServing[key]
    if (!isNumericNutrient(amount) || amount <= 0) continue
    const pct = percentOfReference(key, amount)
    if (pct == null) continue
    const promoted = promotions.get(key)
    if (!promoted && pct < KEY_MICRONUTRIENT_FRACTION * 100) continue
    candidates.push({key, amount, pct, basis: referenceBasis(key), promoted})
  }

  candidates.sort((a, b) => {
    if (Boolean(a.promoted) !== Boolean(b.promoted)) return a.promoted ? -1 : 1
    return b.pct - a.pct
  })
  return candidates.slice(0, MAX_KEY_MICRONUTRIENTS)
}

/**
 * The ingredient combination the default calculation used, for recipes that
 * offer a choice. A reader should not have to open Calculation details to learn
 * which version of the recipe the figures describe.
 */
export function defaultCombination(frontMatter) {
  const stated = frontMatter?.nutrition_default_combination
  if (typeof stated === "string" && stated.trim()) return stated.trim()
  const {ingredients} = normalizeRecipeIngredients(frontMatter)
  const notes = ingredients
    .filter(isDefaultIncluded)
    .map((ing) => ing.formulation_note)
    .filter((note) => typeof note === "string" && /\bdefault\b/i.test(note))
  return notes.length ? notes.join(". ") : null
}

/**
 * Every calculated nutrient with its proportion and reference basis, whether or
 * not it reaches the public panel. This is the complete set for validation and
 * for daily aggregation across meals, where small contributions still count.
 */
export function completeNutrientDataset(result) {
  if (!result || result.status !== "calculated") return []
  return Object.entries(result.perServing)
    .filter(([, amount]) => isNumericNutrient(amount))
    .map(([key, amount]) => ({
      key,
      amount,
      pct: percentOfReference(key, amount),
      basis: referenceBasis(key),
    }))
}

/** ALA / EPA / DHA shown when the per-serving amount is at least 50 mg. */
export const MATERIAL_OMEGA3_MG = 50

export function isMaterialBrainCompound(key, perServingAmount) {
  if (!isNumericNutrient(perServingAmount) || perServingAmount <= 0) return false
  if (key.endsWith("_mg") && perServingAmount >= MATERIAL_OMEGA3_MG) return true
  if (key.includes("anthocyanin") && perServingAmount >= 10) return true
  return false
}

/**
 * Foods materially behind a nutrient, largest first. `limit` trims the public
 * list to the leading contributors; pass `Infinity` for the full arithmetic.
 */
export function materialContributors(key, byFood, rowTotal, limit = PUBLIC_CONTRIBUTORS_PER_ROW) {
  const row = byFood?.[key]
  if (!row) return []
  const total = isNumericNutrient(rowTotal) && rowTotal > 0 ? rowTotal : Object.values(row).reduce((s, v) => s + v, 0)
  if (!(total > 0)) return []
  return Object.entries(row)
    .filter(([, amount]) => amount / total >= MATERIAL_CONTRIBUTOR_FRACTION)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => name)
}

export function selectPublicRows(result, frontMatter) {
  if (!result || result.status !== "calculated") return []
  const unresolved = result.unresolved || {}
  const rows = []
  for (const key of PUBLIC_CORE_KEYS) {
    if (unresolved[key]) {
      rows.push({ key, group: "core", amount: null, unresolvedReason: unresolved[key] })
      continue
    }
    if (!isNumericNutrient(result.perServing[key])) continue
    rows.push({ key, group: "core", amount: result.perServing[key] })
  }
  for (const row of selectKeyMicronutrients(result, frontMatter)) {
    rows.push({ ...row, group: "micronutrient" })
  }
  for (const key of PUBLIC_BRAIN_KEYS) {
    const amount = result.perServing[key]
    if (!isMaterialBrainCompound(key, amount)) continue
    rows.push({ key, group: "brain", amount })
  }
  const hasComponentN3 = PUBLIC_BRAIN_KEYS.some((key) => isNumericNutrient(result.perServing[key]))
  if (
    !hasComponentN3 &&
    isMaterialBrainCompound(OMEGA3_SUM_KEY, result.perServing[OMEGA3_SUM_KEY])
  ) {
    rows.push({
      key: OMEGA3_SUM_KEY,
      group: "brain",
      amount: result.perServing[OMEGA3_SUM_KEY],
    })
  }
  for (const key of Object.keys(result.perServing)) {
    if (!key.includes("anthocyanin")) continue
    const amount = result.perServing[key]
    if (!isMaterialBrainCompound(key, amount)) continue
    rows.push({ key, group: "brain", amount, label: "Anthocyanins" })
  }
  return rows
}

/** Guard: the 100 g-per-food fallback must never be used. */
export function assertNoHundredGramFallback(ingredients) {
  for (const ing of ingredients || []) {
    if (ing.used_default_100g === true) {
      throw new Error("100 g per linked food fallback is forbidden")
    }
  }
}
