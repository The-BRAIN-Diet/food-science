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

/**
 * USDA nutrient ids whose names state the n-3 isomer explicitly, mapped to the
 * key each one is stored under. Nothing outside this set is an omega-3.
 */
export const EXPLICIT_N3_IDS = {
  1404: "ala_mg", // PUFA 18:3 n-3 c,c,c (ALA)
  1278: "epa_mg", // PUFA 20:5 n-3 (EPA)
  1280: "dpa_mg", // PUFA 22:5 n-3 (DPA)
  1272: "dha_mg", // PUFA 22:6 n-3 (DHA)
  1405: "n3_20_3_mg", // PUFA 20:3 n-3
  1407: "n3_20_4_mg", // PUFA 20:4 n-3
}

/** The compound each key names, carried alongside every published total. */
export const N3_IDENTITY = {
  ala_mg: "18:3 n-3 (ALA)",
  epa_mg: "20:5 n-3 (EPA)",
  dpa_mg: "22:5 n-3 (DPA)",
  dha_mg: "22:6 n-3 (DHA)",
  n3_20_3_mg: "20:3 n-3",
  n3_20_4_mg: "20:4 n-3",
}

/** An 18:3 with no stated isomer. Never ALA, never part of an n-3 total. */
export const UNRESOLVED_18_3_ID = 1270

/** Name fallback for sources that supply no nutrient id, held to the same rule. */
function explicitN3ByName(name) {
  if (/18:3\s*\(?\s*n-?\s*3/.test(name) || name.includes("alpha-linolenic") || name.includes("α-linolenic"))
    return "ala_mg"
  if (/20:5\s*n-?\s*3/.test(name) || name.includes("(epa)") || name.includes("eicosapentaenoic"))
    return "epa_mg"
  if (/22:6\s*n-?\s*3/.test(name) || name.includes("(dha)") || name.includes("docosahexaenoic"))
    return "dha_mg"
  if (/22:5\s*n-?\s*3/.test(name) || name.includes("(dpa)") || name.includes("docosapentaenoic"))
    return "dpa_mg"
  if (/20:3\s*n-?\s*3/.test(name)) return "n3_20_3_mg"
  if (/20:4\s*n-?\s*3/.test(name)) return "n3_20_4_mg"
  return null
}

function isUnqualified183(name) {
  return name.includes("18:3") && !/n-?\s*[36]/.test(name) && !name.includes("linolenic")
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
    // USDA 6:0 / 8:0 / 10:0 are fatty acids (free/total SFA), not named triglycerides.
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
    /*
     * Omega-3 identity is decided by the source's own nutrient identifier where
     * one is present, because a name can be misread and an identifier cannot.
     * Only the ids in EXPLICIT_N3_IDS state an n-3 isomer.
     *
     * Anything containing "alanine" is disqualified before any name test runs.
     * Alanine is an amino acid sharing three letters with ALA, and roe records
     * carry over a gram of it per 100 g — enough to be published as an omega-3
     * larger than the food's own DHA. The same guard excludes phenylalanine,
     * which was being published as ALA on the mushroom pages.
     *
     * An acronym alone is never sufficient, and neither is a bare "18:3": that
     * carbon count gives chain length and double bonds but not the isomer, and
     * 18:3 n-6 is gamma-linolenic acid. Where a source does not identify the
     * n-3 or alpha form, the value is kept as chemically unresolved rather than
     * promoted to ALA.
     */
    if (name.includes("alanine")) continue
    if (unit === "g" || unit === "mg") {
      const mg = unit === "g" ? amount * 1000 : amount
      const byId = EXPLICIT_N3_IDS[n.id]
      if (byId) {
        out[byId] = mg
        continue
      }
      if (n.id == null) {
        const named = explicitN3ByName(name)
        if (named) {
          out[named] = mg
          continue
        }
      }
      if (n.id === UNRESOLVED_18_3_ID || (n.id == null && isUnqualified183(name))) {
        out.pufa_18_3_unresolved_mg = mg
        continue
      }
    }
  }

  /*
   * Total omega-3 is the sum of the n-3 acids this record explicitly identified,
   * and it records which ones. A total whose parts cannot be named is not a
   * measurement, and where nothing n-3 was identified the total is omitted
   * rather than written as zero: unmeasured is unknown, not absent.
   */
  // Records commonly report the same 18:3 under both the generic and the n-3
  // identifier. Once the isomer is established there is nothing left unresolved.
  if (out.ala_mg != null) delete out.pufa_18_3_unresolved_mg

  const components = []
  for (const [key, identity] of Object.entries(N3_IDENTITY)) {
    const value = out[key]
    if (typeof value === "number" && value > 0) components.push({nutrient: key, identity, amount_mg: value})
  }
  if (components.length) {
    out.omega3_mg = components.reduce((sum, c) => sum + c.amount_mg, 0)
    out.omega3_components = components
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
