/**
 * Shared mapping from nutrition_per_100g keys to display labels and units.
 * Used by NutritionTable and FoodSubstancesFromTable so the substances list
 * mirrors the database table (three sources of truth).
 *
 * Layout groups (see NutritionTable):
 * - Core: macronutrients + fibre (USDA-style “facts panel”)
 * - Micronutrients: vitamins/minerals/trace elements
 * - Bioactive lipids: omega-3 fatty acids reported per 100 g (often alongside polyphenol “truth fill”)
 */

/** Macronutrients + sugars + fibre — first sub-table */
export const CORE_NUTRIENT_KEYS: readonly string[] = [
  "kcal",
  "protein_g",
  "fat_g",
  "sat_fat_g",
  "carbs_g",
  "sugar_g",
  "fibre_g",
]

/** Vitamins and minerals — second sub-table */
export const MICRONUTRIENT_KEYS: readonly string[] = [
  "iron_mg",
  "zinc_mg",
  "magnesium_mg",
  "selenium_ug",
  "calcium_mg",
  "potassium_mg",
  "copper_mg",
  "choline_mg",
  "folate_ug",
  "vitamin_b12_ug",
  "vitamin_b6_mg",
  "vitamin_e_mg",
  "vitamin_k_ug",
]

/** Long-chain / ALA omega-3 — third sub-table (with supplementary bioactives) */
export const BIOACTIVE_LIPID_KEYS: readonly string[] = ["ala_mg", "epa_mg", "dha_mg"]

export const NUTRIENT_ORDER: readonly string[] = [
  ...CORE_NUTRIENT_KEYS,
  ...MICRONUTRIENT_KEYS,
  ...BIOACTIVE_LIPID_KEYS,
  "omega3_mg",
]

export const NUTRIENT_LABELS: Record<string, {label: string; unit: string}> = {
  kcal: {label: "Energy", unit: "kcal"},
  protein_g: {label: "Protein", unit: "g"},
  fat_g: {label: "Total fat", unit: "g"},
  sat_fat_g: {label: "Saturated fat", unit: "g"},
  carbs_g: {label: "Carbohydrates", unit: "g"},
  sugar_g: {label: "Sugars", unit: "g"},
  fibre_g: {label: "Fibre", unit: "g"},

  iron_mg: {label: "Iron", unit: "mg"},
  zinc_mg: {label: "Zinc", unit: "mg"},
  magnesium_mg: {label: "Magnesium", unit: "mg"},
  selenium_ug: {label: "Selenium", unit: "µg"},
  calcium_mg: {label: "Calcium", unit: "mg"},
  potassium_mg: {label: "Potassium", unit: "mg"},
  copper_mg: {label: "Copper", unit: "mg"},

  choline_mg: {label: "Choline", unit: "mg"},
  folate_ug: {label: "Folate", unit: "µg"},
  vitamin_b12_ug: {label: "Vitamin B12", unit: "µg"},
  vitamin_b6_mg: {label: "Vitamin B6", unit: "mg"},
  vitamin_e_mg: {label: "Vitamin E", unit: "mg"},
  vitamin_k_ug: {label: "Vitamin K", unit: "µg"},

  omega3_mg: {label: "Total omega-3", unit: "mg"},
  ala_mg: {label: "ALA", unit: "mg"},
  epa_mg: {label: "EPA", unit: "mg"},
  dha_mg: {label: "DHA", unit: "mg"},
}

/** Labels that correspond to substance pages (for linking). Same as NUTRIENT_LABELS.label where it's a compound name. */
export function getSubstanceLabelForKey(key: string): string {
  return NUTRIENT_LABELS[key]?.label ?? key
}
