/**
 * Shared mapping from nutrition_per_100g keys to display labels and units.
 * Used by NutritionTable and FoodSubstancesFromTable so public tables stay
 * selective while the ontology remains comprehensive.
 *
 * Layout groups (see NutritionTable):
 * - Core nutrients
 * - Vitamins and minerals
 * - Fatty acids and extended BRAIN-relevant substances
 *
 * Public tables do not dump every stored key. Internal nutrition_per_100g
 * values remain available for algorithms even when hidden from the page.
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
  "phosphorus_mg",
  "manganese_mg",
  "selenium_ug",
  "calcium_mg",
  "potassium_mg",
  "copper_mg",
  "sodium_mg",
  "iodine_ug",
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
]

/** Individual fatty acids, carotenoids, amino acids, and other extended analytes */
export const BIOACTIVE_LIPID_KEYS: readonly string[] = [
  "linoleic_g",
  "ala_mg",
  "epa_mg",
  "dha_mg",
  "lycopene_ug",
  "beta_carotene_ug",
  "lutein_zeaxanthin_ug",
  "caprylic_g",
  "capric_g",
  "caproic_g",
  "tryptophan_g",
  "tyrosine_g",
  "leucine_g",
  "lysine_g",
  "arginine_g",
  "glycine_g",
  "methionine_g",
]

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
  phosphorus_mg: {label: "Phosphorus", unit: "mg"},
  manganese_mg: {label: "Manganese", unit: "mg"},
  selenium_ug: {label: "Selenium", unit: "µg"},
  calcium_mg: {label: "Calcium", unit: "mg"},
  potassium_mg: {label: "Potassium", unit: "mg"},
  copper_mg: {label: "Copper", unit: "mg"},

  choline_mg: {label: "Choline", unit: "mg"},
  folate_ug: {label: "Folate", unit: "µg"},
  vitamin_b12_ug: {label: "Vitamin B12", unit: "µg"},
  vitamin_b6_mg: {label: "Vitamin B6", unit: "mg"},
  vitamin_b2_mg: {label: "Vitamin B2", unit: "mg"},
  vitamin_b1_mg: {label: "Vitamin B1", unit: "mg"},
  vitamin_b3_mg: {label: "Vitamin B3", unit: "mg"},
  vitamin_b5_mg: {label: "Vitamin B5", unit: "mg"},
  vitamin_c_mg: {label: "Vitamin C", unit: "mg"},
  vitamin_a_rae_ug: {label: "Vitamin A", unit: "µg"},
  vitamin_d_ug: {label: "Vitamin D", unit: "µg"},
  vitamin_e_mg: {label: "Vitamin E", unit: "mg"},
  vitamin_k_ug: {label: "Vitamin K", unit: "µg"},
  sodium_mg: {label: "Sodium", unit: "mg"},
  iodine_ug: {label: "Iodine", unit: "µg"},

  omega3_mg: {label: "Total omega-3", unit: "mg"},
  ala_mg: {label: "ALA", unit: "mg"},
  epa_mg: {label: "EPA", unit: "mg"},
  dha_mg: {label: "DHA", unit: "mg"},
  linoleic_g: {label: "Linoleic Acid", unit: "g"},
  lycopene_ug: {label: "Lycopene", unit: "µg"},
  beta_carotene_ug: {label: "Beta-Carotene", unit: "µg"},
  lutein_zeaxanthin_ug: {label: "Lutein + zeaxanthin", unit: "µg"},
  caprylic_g: {label: "Caprylic Triglyceride", unit: "g"},
  capric_g: {label: "Capric Triglyceride", unit: "g"},
  caproic_g: {label: "Caproic Triglyceride", unit: "g"},
  tryptophan_g: {label: "Tryptophan", unit: "g"},
  tyrosine_g: {label: "Tyrosine", unit: "g"},
  leucine_g: {label: "Leucine", unit: "g"},
  lysine_g: {label: "Lysine", unit: "g"},
  arginine_g: {label: "Arginine", unit: "g"},
  glycine_g: {label: "Glycine", unit: "g"},
  methionine_g: {label: "Methionine", unit: "g"},
}

export const SUBSTANCE_LABEL_ALIASES: Record<string, string[]> = {
  "vitamin b2": ["Vitamin B2", "Riboflavin", "Vitamin B2 (Riboflavin)"],
  riboflavin: ["Vitamin B2", "Riboflavin", "Vitamin B2 (Riboflavin)"],
  "vitamin b2 (riboflavin)": ["Vitamin B2", "Riboflavin", "Vitamin B2 (Riboflavin)"],
  "vitamin b1": ["Vitamin B1", "Thiamine", "Thiamin"],
  thiamine: ["Vitamin B1", "Thiamine", "Thiamin"],
  thiamin: ["Vitamin B1", "Thiamine", "Thiamin"],
  "vitamin b3": ["Vitamin B3", "Niacin"],
  niacin: ["Vitamin B3", "Niacin"],
  "vitamin b5": ["Vitamin B5", "Pantothenic acid"],
  "pantothenic acid": ["Vitamin B5", "Pantothenic acid"],
  "vitamin b9": ["Vitamin B9", "Folate"],
  folate: ["Vitamin B9", "Folate"],
  "vitamin c": ["Vitamin C", "Ascorbate", "Vitamin C (Ascorbate)"],
  ascorbate: ["Vitamin C", "Ascorbate"],
  "linoleic acid": ["Linoleic Acid", "Linoleic Acid (LA, n-6)", "Linoleic Acid (n-6)"],
  "linoleic acid (la, n-6)": ["Linoleic Acid", "Linoleic Acid (LA, n-6)"],
  "linoleic acid (n-6)": ["Linoleic Acid", "Linoleic Acid (LA, n-6)"],
  "vitamin e": ["Vitamin E", "Vitamin E (Tocopherols/Tocotrienols)"],
  "vitamin e (tocopherols/tocotrienols)": ["Vitamin E"],
  ala: ["ALA", "Alpha-Linolenic Acid"],
  "lutein + zeaxanthin": ["Lutein", "Zeaxanthin", "Lutein + zeaxanthin"],
  lutein: ["Lutein", "Lutein + zeaxanthin"],
  zeaxanthin: ["Zeaxanthin", "Lutein + zeaxanthin"],
  "beta-glucans": ["Beta-Glucans", "Beta-glucan"],
  "beta-glucan": ["Beta-Glucans", "Beta-glucan"],
}

export function normaliseSubstanceLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
}

export function substanceLabelTokens(label: string): Set<string> {
  const base = label.split("(")[0].trim()
  const tokens = new Set([normaliseSubstanceLabel(label), normaliseSubstanceLabel(base)])
  const aliases =
    SUBSTANCE_LABEL_ALIASES[normaliseSubstanceLabel(label)] ||
    SUBSTANCE_LABEL_ALIASES[normaliseSubstanceLabel(base)]
  if (aliases) {
    for (const alias of aliases) tokens.add(normaliseSubstanceLabel(alias))
  }
  return tokens
}

export function substanceLabelsOverlap(a: string, b: string): boolean {
  const left = substanceLabelTokens(a)
  for (const token of substanceLabelTokens(b)) {
    if (left.has(token)) return true
  }
  return false
}

/** Labels that correspond to substance pages (for linking). Same as NUTRIENT_LABELS.label where it's a compound name. */
export function getSubstanceLabelForKey(key: string): string {
  return NUTRIENT_LABELS[key]?.label ?? key
}

export const PUBLIC_DISPLAY = {
  TABLE: "table",
  SUBSTANCE_ONLY: "substance-only",
  INTERNAL_ONLY: "internal-only",
  EXCLUDED_ERROR: "excluded-error",
} as const

export type PublicDisplayStatus = (typeof PUBLIC_DISPLAY)[keyof typeof PUBLIC_DISPLAY]

const TRACE_CONTRIBUTION = "Presence only (trace)"

const AMINO_ACID_KEYS = new Set([
  "tryptophan_g",
  "tyrosine_g",
  "leucine_g",
  "lysine_g",
  "arginine_g",
  "glycine_g",
  "methionine_g",
])

const AMINO_ACID_LABELS = new Set([
  "Phenylalanine",
  "Threonine",
  "Valine",
  "Isoleucine",
  "Histidine",
  "Lysine",
  "Methionine",
  "Leucine",
  "Tryptophan",
  "Tyrosine",
  "Arginine",
  "Glycine",
])

/** Keep in sync with scripts/lib/food-truth-levels.mjs SUBSTANCE_ONLY_BY_SLUG. */
export const SUBSTANCE_ONLY_BY_SLUG: Record<string, readonly string[]> = {
  nori: ["Creatine", "Glycine", "Arginine", "Methionine"],
  bananas: ["Tryptophan"],
  potatoes: ["Cyanidin"],
  rice: ["Cyanidin"],
  broccoli: ["CoQ10"],
  spinach: ["CoQ10"],
  mankai: ["Vitamin B12"],
  "avocado-oil": ["Lutein"],
  butter: ["Vitamin D"],
  ghee: ["Vitamin D"],
  "grass-fed-butter": ["Vitamin D"],
  mussels: ["Vitamin D"],
  oysters: ["Vitamin D"],
  oats: ["Selenium"],
  "broccoli-sprouts": ["Vitamin A", "Vitamin B1", "Vitamin B2", "Vitamin E"],
}

const EXCLUDED_ERROR_BY_SLUG: Record<string, readonly string[]> = {
  watermelon: ["Nitric Oxide"],
}

function tagLabels(fm: Record<string, unknown>): string[] {
  const tags = Array.isArray(fm.tags) ? fm.tags : []
  return tags
    .map((tag) => {
      if (typeof tag === "string") return tag
      if (tag && typeof tag === "object" && "label" in tag) return String((tag as {label: string}).label)
      return ""
    })
    .filter((tag) => tag.trim().length > 0)
}

export function isTraceContribution(fm: Record<string, unknown>, label: string): boolean {
  const levels = (fm.contribution_levels as Record<string, string> | undefined) || {}
  if (levels[label] === TRACE_CONTRIBUTION) return true
  return Object.entries(levels).some(
    ([key, value]) => value === TRACE_CONTRIBUTION && substanceLabelsOverlap(key, label),
  )
}

function explicitDisplay(fm: Record<string, unknown>, name: string): PublicDisplayStatus | null {
  const map = fm.public_display as Record<string, string> | undefined
  const value = map?.[name]
  if (
    value === PUBLIC_DISPLAY.TABLE ||
    value === PUBLIC_DISPLAY.SUBSTANCE_ONLY ||
    value === PUBLIC_DISPLAY.INTERNAL_ONLY ||
    value === PUBLIC_DISPLAY.EXCLUDED_ERROR
  ) {
    return value
  }
  return null
}

export function resolvePublicDisplayForKey(fm: Record<string, unknown>, key: string): PublicDisplayStatus {
  const label = NUTRIENT_LABELS[key]?.label ?? key
  const explicit = explicitDisplay(fm, key) || explicitDisplay(fm, label)
  if (explicit) return explicit
  if (key === "omega3_mg") return PUBLIC_DISPLAY.INTERNAL_ONLY

  const publicKeys = Array.isArray(fm.nutrition_public_keys) ? (fm.nutrition_public_keys as string[]) : null
  if (publicKeys && publicKeys.length) {
    if (publicKeys.includes(key) || (CORE_NUTRIENT_KEYS as readonly string[]).includes(key)) {
      return PUBLIC_DISPLAY.TABLE
    }
    return PUBLIC_DISPLAY.INTERNAL_ONLY
  }

  if ((CORE_NUTRIENT_KEYS as readonly string[]).includes(key)) return PUBLIC_DISPLAY.TABLE
  if (AMINO_ACID_KEYS.has(key)) return PUBLIC_DISPLAY.SUBSTANCE_ONLY

  const slug = String(fm.id || "")
  const excluded = EXCLUDED_ERROR_BY_SLUG[slug] || []
  if (excluded.some((tag) => substanceLabelsOverlap(tag, label))) return PUBLIC_DISPLAY.EXCLUDED_ERROR
  const only = SUBSTANCE_ONLY_BY_SLUG[slug] || []
  if (only.some((tag) => substanceLabelsOverlap(tag, label))) return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  if (isTraceContribution(fm, label)) return PUBLIC_DISPLAY.SUBSTANCE_ONLY

  const tagged = tagLabels(fm).some((tag) => substanceLabelsOverlap(tag, label))
  if (
    (MICRONUTRIENT_KEYS as readonly string[]).includes(key) ||
    (BIOACTIVE_LIPID_KEYS as readonly string[]).includes(key)
  ) {
    return tagged ? PUBLIC_DISPLAY.TABLE : PUBLIC_DISPLAY.INTERNAL_ONLY
  }
  return tagged ? PUBLIC_DISPLAY.SUBSTANCE_ONLY : PUBLIC_DISPLAY.INTERNAL_ONLY
}

export function isPublicTableKey(fm: Record<string, unknown>, key: string): boolean {
  return resolvePublicDisplayForKey(fm, key) === PUBLIC_DISPLAY.TABLE
}

interface SupplementaryDisplayRow {
  key: string
  label: string
  value?: number
  unit?: string
  amount_display?: string
  status?: string
  public_display?: string
}

export function isPublicSupplementaryRow(
  fm: Record<string, unknown>,
  row: SupplementaryDisplayRow,
): boolean {
  const explicit =
    (row.public_display as PublicDisplayStatus | undefined) ||
    explicitDisplay(fm, row.key) ||
    explicitDisplay(fm, row.label)
  if (explicit) return explicit === PUBLIC_DISPLAY.TABLE

  const slug = String(fm.id || "")
  const excluded = EXCLUDED_ERROR_BY_SLUG[slug] || []
  if (excluded.some((tag) => substanceLabelsOverlap(tag, row.label))) return false
  const only = SUBSTANCE_ONLY_BY_SLUG[slug] || []
  if (only.some((tag) => substanceLabelsOverlap(tag, row.label))) return false
  if (isTraceContribution(fm, row.label)) return false

  const qualitative =
    !(typeof row.value === "number" && row.value > 0) &&
    Boolean((row.status && row.status.trim()) || (row.amount_display && row.amount_display.trim()))
  if (qualitative) {
    return tagLabels(fm).some((tag) => substanceLabelsOverlap(tag, row.label))
  }
  return typeof row.value === "number" && row.value > 0
}

export function resolvePublicDisplayForTag(fm: Record<string, unknown>, tag: string): PublicDisplayStatus {
  const explicit = explicitDisplay(fm, tag)
  if (explicit) return explicit
  const slug = String(fm.id || "")
  const excluded = EXCLUDED_ERROR_BY_SLUG[slug] || []
  if (excluded.some((item) => substanceLabelsOverlap(item, tag))) return PUBLIC_DISPLAY.EXCLUDED_ERROR
  if (AMINO_ACID_LABELS.has(tag)) return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  const only = SUBSTANCE_ONLY_BY_SLUG[slug] || []
  if (only.some((item) => substanceLabelsOverlap(item, tag))) return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  if (isTraceContribution(fm, tag)) return PUBLIC_DISPLAY.SUBSTANCE_ONLY

  const nutrition = (fm.nutrition_per_100g || {}) as Record<string, unknown>
  for (const key of Object.keys(nutrition)) {
    const label = NUTRIENT_LABELS[key]?.label ?? key
    if (substanceLabelsOverlap(tag, label) && isPublicTableKey(fm, key)) return PUBLIC_DISPLAY.TABLE
  }
  const supplementary = Array.isArray(fm.nutrition_supplementary_sources)
    ? (fm.nutrition_supplementary_sources as SupplementaryDisplayRow[])
    : []
  for (const row of supplementary) {
    if (row?.label && substanceLabelsOverlap(tag, row.label) && isPublicSupplementaryRow(fm, row)) {
      return PUBLIC_DISPLAY.TABLE
    }
  }
  return PUBLIC_DISPLAY.SUBSTANCE_ONLY
}
