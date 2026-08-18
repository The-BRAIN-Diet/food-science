/**
 * USDA FoodData Central nutrient extraction and candidate ranking.
 * Shared by Script A (fetch) so abbreviated branded/Foundation panels
 * cannot silently drop BRAIN-relevant nutrients.
 */

export const MIN_STANDARD_PANEL_KEYS = 12

/** Prefer cis n-6 linoleic; never CLA or trans isomers. */
function isLinoleicName(name) {
  if (!name.includes("18:2")) return false
  if (name.includes("cla") || name.includes("trans") || /\b18:2 t\b/.test(name)) return false
  return name.includes("n-6 c,c") || name.includes("18:2 n-6") || name === "pufa 18:2"
}

/** Prefer cis n-9 oleic; never trans 18:1. */
function isOleicName(name) {
  if (!name.includes("18:1")) return false
  if (name.includes("trans") || /\b18:1 t\b/.test(name)) return false
  return (
    name.includes("n-9") ||
    name.includes("oleic") ||
    name === "mufa 18:1" ||
    name === "18:1"
  )
}

export function extractNutrients(food) {
  const out = {}
  const nutrients = food.foodNutrients || []
  for (const fn of nutrients) {
    const n = fn.nutrient || fn
    const name = String(n.name || "").toLowerCase()
    const unitRaw = String(n.unitName || "").toLowerCase()
    const unit = unitRaw === "µg" ? "ug" : unitRaw
    const amount = fn.amount
    if (amount == null || (typeof amount === "number" && amount <= 0)) continue

    if (name === "energy" && unit === "kcal") {
      if (out.kcal == null) out.kcal = amount
      continue
    }
    if (name.startsWith("energy") && unit === "kcal" && out.kcal == null) {
      out.kcal = amount
      continue
    }
    if (name === "protein" && unit === "g") { out.protein_g = amount; continue }
    if (name.startsWith("total lipid") && unit === "g") { out.fat_g = amount; continue }
    if (name.startsWith("fatty acids, total saturated") && unit === "g") { out.sat_fat_g = amount; continue }
    if (name.startsWith("carbohydrate, by difference") && unit === "g") { out.carbs_g = amount; continue }
    if (name.startsWith("sugars, total") && unit === "g") { out.sugar_g = amount; continue }
    if (name.startsWith("fiber, total dietary") && unit === "g") { out.fibre_g = amount; continue }
    if (name === "iron, fe" && unit === "mg") { out.iron_mg = amount; continue }
    if (name === "zinc, zn" && unit === "mg") { out.zinc_mg = amount; continue }
    if (name === "magnesium, mg" && unit === "mg") { out.magnesium_mg = amount; continue }
    if (name === "phosphorus, p" && unit === "mg") { out.phosphorus_mg = amount; continue }
    if (name === "manganese, mn" && unit === "mg") { out.manganese_mg = amount; continue }
    if (name === "selenium, se" && (unit === "ug" || unit === "mcg")) { out.selenium_ug = amount; continue }
    if (name === "calcium, ca" && unit === "mg") { out.calcium_mg = amount; continue }
    if (name === "potassium, k" && unit === "mg") { out.potassium_mg = amount; continue }
    if (name === "copper, cu" && unit === "mg") { out.copper_mg = amount; continue }
    if (name === "sodium, na" && unit === "mg") { out.sodium_mg = amount; continue }
    if (name === "iodine, i" && (unit === "ug" || unit === "mcg")) { out.iodine_ug = amount; continue }
    if (name.startsWith("choline, total") && unit === "mg") { out.choline_mg = amount; continue }
    if (name === "folate, total" && (unit === "ug" || unit === "mcg")) { out.folate_ug = amount; continue }
    if (name.startsWith("vitamin b-12") && !name.includes("added") && (unit === "ug" || unit === "mcg")) {
      out.vitamin_b12_ug = amount
      continue
    }
    if (name.startsWith("vitamin b-6") && unit === "mg") { out.vitamin_b6_mg = amount; continue }
    if (name.includes("vitamin e") && name.includes("alpha-tocopherol") && !name.includes("added") && unit === "mg") {
      out.vitamin_e_mg = amount
      continue
    }
    if ((name === "riboflavin" || name.startsWith("riboflavin,")) && !name.includes("added") && unit === "mg") {
      out.vitamin_b2_mg = amount
      continue
    }
    if ((name === "thiamin" || name.startsWith("thiamin,")) && !name.includes("added") && unit === "mg") {
      out.vitamin_b1_mg = amount
      continue
    }
    if ((name === "niacin" || name.startsWith("niacin,")) && !name.includes("added") && !name.includes("equivalent") && !name.includes("tryptophan") && unit === "mg") {
      out.vitamin_b3_mg = amount
      continue
    }
    if (name.startsWith("pantothenic acid") && unit === "mg") { out.vitamin_b5_mg = amount; continue }
    if (name.startsWith("vitamin c, total ascorbic") && !name.includes("added") && unit === "mg") {
      out.vitamin_c_mg = amount
      continue
    }
    if (name === "vitamin a, rae" && (unit === "ug" || unit === "mcg")) {
      out.vitamin_a_rae_ug = amount
      continue
    }
    if (name === "vitamin d (d2 + d3)" && (unit === "ug" || unit === "mcg")) {
      out.vitamin_d_ug = amount
      continue
    }
    if (name.startsWith("vitamin k (phylloquinone)") && (unit === "ug" || unit === "mcg")) {
      out.vitamin_k_ug = amount
      continue
    }
    if (name === "lycopene" && (unit === "ug" || unit === "mcg")) {
      out.lycopene_ug = amount
      continue
    }
    if (name === "carotene, beta" && (unit === "ug" || unit === "mcg")) {
      out.beta_carotene_ug = amount
      continue
    }
    if (name === "lutein + zeaxanthin" && (unit === "ug" || unit === "mcg")) {
      out.lutein_zeaxanthin_ug = amount
      continue
    }
    if ((name === "sfa 8:0" || name === "8:0") && unit === "g") { out.caprylic_g = amount; continue }
    if ((name === "sfa 10:0" || name === "10:0") && unit === "g") { out.capric_g = amount; continue }
    if ((name === "sfa 6:0" || name === "6:0") && unit === "g") { out.caproic_g = amount; continue }
    if (name === "tryptophan" && unit === "g") { out.tryptophan_g = amount; continue }
    if (name === "tyrosine" && unit === "g") { out.tyrosine_g = amount; continue }
    if (name === "leucine" && unit === "g") { out.leucine_g = amount; continue }
    if (name === "lysine" && unit === "g") { out.lysine_g = amount; continue }
    if (name === "arginine" && unit === "g") { out.arginine_g = amount; continue }
    if (name === "glycine" && unit === "g") { out.glycine_g = amount; continue }
    if (name === "methionine" && unit === "g") { out.methionine_g = amount; continue }
    if (isLinoleicName(name) && (unit === "g" || unit === "mg")) {
      const grams = unit === "mg" ? amount / 1000 : amount
      if (out.linoleic_g == null || name.includes("n-6")) out.linoleic_g = grams
      continue
    }
    if (isOleicName(name) && (unit === "g" || unit === "mg")) {
      const grams = unit === "mg" ? amount / 1000 : amount
      if (out.oleic_g == null || name.includes("n-9")) out.oleic_g = grams
      continue
    }
    if ((name.includes("epa") || name.includes("20:5 n-3")) && (unit === "g" || unit === "mg")) {
      out.epa_mg = unit === "g" ? amount * 1000 : amount
      continue
    }
    if ((name.includes("dha") || name.includes("22:6 n-3")) && (unit === "g" || unit === "mg")) {
      out.dha_mg = unit === "g" ? amount * 1000 : amount
      continue
    }
    const isAla =
      name.includes("18:3 n-3") ||
      name.includes("alpha-linolenic") ||
      name.includes("α-linolenic") ||
      name === "pufa 18:3" ||
      name === "18:3" ||
      (/\bala\b/.test(name) && !name.includes("alanine"))
    if (isAla && (unit === "g" || unit === "mg")) {
      out.ala_mg = unit === "g" ? amount * 1000 : amount
      continue
    }
  }
  const ala = out.ala_mg ?? null
  const epa = out.epa_mg ?? null
  const dha = out.dha_mg ?? null
  if (ala != null || epa != null || dha != null) {
    out.omega3_mg = [ala, epa, dha].filter((v) => v != null).reduce((a, b) => a + b, 0)
  }
  return out
}

export function mappedNutrientCount(nutrients) {
  return Object.values(nutrients || {}).filter((v) => typeof v === "number" && v > 0).length
}

export function isAbbreviatedPanel(nutrients) {
  return mappedNutrientCount(nutrients) < MIN_STANDARD_PANEL_KEYS
}

export function rankFoodCandidates(foods) {
  if (!foods || foods.length === 0) return []
  const buckets = { Foundation: [], "SR Legacy": [], Branded: [], Survey: [], Other: [] }
  for (const food of foods) {
    if (buckets[food.dataType]) buckets[food.dataType].push(food)
    else buckets.Other.push(food)
  }
  return [
    ...buckets.Foundation,
    ...buckets["SR Legacy"],
    ...buckets.Branded,
    ...buckets.Survey,
    ...buckets.Other,
  ]
}

/**
 * Choose the USDA record with the richest mapped panel.
 * Foundation is preferred only when it is not an abbreviated subset of SR Legacy.
 */
export function scoreCandidate(dataType, nutrients) {
  const count = mappedNutrientCount(nutrients)
  if (count === 0) return -1
  const typeTieBreak =
    dataType === "Foundation" ? 0.3 : dataType === "SR Legacy" ? 0.2 : 0
  return count + typeTieBreak
}
