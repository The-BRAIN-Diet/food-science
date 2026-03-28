/**
 * Portion-weighted recipe nutrition from grams per tagged food + per-100g panels.
 * "Trace" when the weighted total is below absolute or %RDA floors.
 */

import {
  BIOACTIVE_LIPID_KEYS,
  CORE_NUTRIENT_KEYS,
  MICRONUTRIENT_KEYS,
} from "@site/src/data/nutritionTableMapping"

/** Same reference intakes as RecipeFoods / NutritionTable (adult, simplified). */
export const RDA_VALUES: Record<string, number> = {
  iron_mg: 18,
  zinc_mg: 11,
  magnesium_mg: 420,
  selenium_ug: 55,
  calcium_mg: 1000,
  potassium_mg: 3400,
  choline_mg: 550,
  folate_ug: 400,
  vitamin_b12_ug: 2.4,
  vitamin_b6_mg: 1.7,
  vitamin_e_mg: 15,
  vitamin_k_ug: 120,
  copper_mg: 0.9,
}

export type RecipeNutritionIngredient = {
  /** Must match a food `title` or a recipe tag that resolves to that food (same as RecipeFoods). */
  food: string
  /** Edible grams for this recipe (all servings combined unless you set servings > 1). */
  grams: number
}

export type RecipeNutritionBlock = {
  /** Optional; totals are shown per recipe as written unless you divide in the UI. */
  servings?: number
  ingredients: RecipeNutritionIngredient[]
}

type NutritionValues = Record<string, number | null | undefined>

function matchFoodDoc(
  label: string,
  foods: {title: string; tags: {label: string}[]}[]
): {title: string; tags: {label: string}[]} | undefined {
  const t = label.trim().toLowerCase()
  return foods.find((f) => {
    const title = f.title.toLowerCase()
    if (title === t) return true
    if (title.startsWith(t + " ") || title.endsWith(" " + t)) return true
    return f.tags.some((tag) => tag.label.toLowerCase() === t)
  })
}

/** Weighted contribution of one nutrient from one food. */
export function nutrientContribution(
  valuePer100g: number | undefined,
  grams: number
): number {
  if (typeof valuePer100g !== "number" || !Number.isFinite(grams) || grams <= 0) return 0
  return (valuePer100g * grams) / 100
}

/**
 * Returns true if the weighted total should display as "trace" (negligible amount).
 */
export function isTraceTotal(key: string, total: number): boolean {
  if (!Number.isFinite(total) || total <= 0) return true
  const rda = RDA_VALUES[key]
  if (rda && rda > 0 && total / rda < 0.005) return true
  if (key === "kcal" && total < 0.5) return true
  if (key.endsWith("_ug") && total < 0.1) return true
  if (key.endsWith("_mg") && total < 0.05) return true
  if ((key.endsWith("_g") || key === "fibre_g" || key === "sugar_g") && total < 0.05) return true
  return false
}

export function isTraceContribution(key: string, amount: number): boolean {
  return isTraceTotal(key, amount)
}

export type WeightedNutrientResult = {
  totals: Map<string, number>
  /** For each nutrient key, map food title -> contribution */
  byFood: Map<string, Map<string, number>>
}

/**
 * Compute portion-weighted totals and per-food contributions for
 * core + micronutrients + bioactive lipids.
 */
export function computeWeightedNutrients(
  recipeNutrition: RecipeNutritionBlock,
  foodDocs: {title: string; permalink: string; frontMatter: Record<string, unknown>; tags: {label: string}[]}[]
): WeightedNutrientResult | null {
  if (!recipeNutrition?.ingredients?.length) return null

  const totals = new Map<string, number>()
  const byFood = new Map<string, Map<string, number>>()

  const allKeys = [...CORE_NUTRIENT_KEYS, ...MICRONUTRIENT_KEYS, ...BIOACTIVE_LIPID_KEYS, "omega3_mg"]

  for (const ing of recipeNutrition.ingredients) {
    const doc = matchFoodDoc(ing.food, foodDocs)
    if (!doc) continue
    const grams = ing.grams
    if (!Number.isFinite(grams) || grams <= 0) continue

    const nutrition = (doc.frontMatter?.nutrition_per_100g || {}) as NutritionValues
    const foodTitle = doc.title

    for (const key of allKeys) {
      const v = nutrition[key]
      if (typeof v !== "number") continue
      const c = nutrientContribution(v, grams)
      if (c === 0) continue
      totals.set(key, (totals.get(key) || 0) + c)
      if (!byFood.has(key)) byFood.set(key, new Map())
      const m = byFood.get(key)!
      m.set(foodTitle, (m.get(foodTitle) || 0) + c)
    }
  }

  return {totals, byFood}
}

/**
 * List a food in "Foods in recipe" only if it is both non-trace and at least this
 * fraction of the row total. Stops every tagged ingredient appearing on rows where
 * USDA carries negligible analytical omega-3 (e.g. a few mg ALA in citrus) that is
 * not meaningful next to fish roe.
 */
export const MIN_FOOD_SHARE_OF_ROW_TOTAL = 0.02

export function foodsContributingToNutrient(
  key: string,
  byFood: Map<string, Map<string, number>>,
  rowTotal?: number
): string[] {
  const m = byFood.get(key)
  if (!m) return []

  const nonTrace = [...m.entries()].filter(([, amount]) => !isTraceContribution(key, amount))
  if (nonTrace.length === 0) return []

  const totalFromMap = nonTrace.reduce((s, [, c]) => s + c, 0)
  const total =
    typeof rowTotal === "number" && Number.isFinite(rowTotal) && rowTotal > 0 ? rowTotal : totalFromMap

  if (!Number.isFinite(total) || total <= 0) return []

  const byShare = nonTrace.filter(([, c]) => c / total >= MIN_FOOD_SHARE_OF_ROW_TOTAL)
  if (byShare.length > 0) {
    return byShare.map(([title]) => title).sort((a, b) => a.localeCompare(b))
  }

  // Non-trace total but no food reaches min share (rare): attribute to the largest contributor only.
  nonTrace.sort((a, b) => b[1] - a[1])
  return [nonTrace[0][0]]
}
