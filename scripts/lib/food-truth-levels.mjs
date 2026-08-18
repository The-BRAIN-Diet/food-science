/**
 * Shared mapping and label helpers for food nutrition tables.
 * Used by NutritionTable / FoodSubstancesFromTable (via nutritionTableMapping.ts)
 * and by build-time validation of the Three Sources of Truth (page layers).
 */

export const CATEGORY_TAGS = new Set([
  "Substance",
  "Nutrient",
  "Bioactive",
  "Metabolite",
  "Vitamin",
  "Mineral",
  "Fatty Acid",
  "Amino Acid",
  "Polyphenol",
  "Carotenoid",
  "Flavonoid",
  "Terpene",
  "Omega-3 Fatty Acids",
  "Omega-6 Fatty Acids",
  "SCFAs",
  "Antioxidant",
  "Lipid",
  "Food",
  "Vegan",
  "Vegetarian",
  "Recipe",
  "Area",
  "Pufa",
  "Protein",
  "Fibre",
  "Condiments",
  "Dairy",
  "Yogurt",
  "Mushrooms",
  "Cacao",
  "Cocoa",
  "Fermented Vegetables",
  "Duckweed",
  "Lupins",
  "White Button Mushroom",
])

export const EXCLUDED_SUBSTANCE_KEYS = new Set([
  "kcal",
  "protein_g",
  "fat_g",
  "sat_fat_g",
  "carbs_g",
  "sugar_g",
  "fibre_g",
  "omega3_mg",
])

export const QUALITATIVE_PRESENT = "Present — quantity not established"
export const TRACE_CONTRIBUTION = "Presence only (trace)"

/** Provenance/claim-strength levels — not three mandatory public lists. */
export const TRUTH_LEVEL = {
  STANDARD: "standard",
  EXTENDED: "extended",
  ONTOLOGY: "ontology",
}

/**
 * Public-display status for a food–substance relationship or nutrient key.
 * table: show in the public nutritional / extended table
 * substance-only: ontology + Substances section; no table row
 * internal-only: retain values for algorithms; not shown on the page
 * excluded-error: incorrectly scoped or unsupported; delete or re-scope
 */
export const PUBLIC_DISPLAY = {
  TABLE: "table",
  SUBSTANCE_ONLY: "substance-only",
  INTERNAL_ONLY: "internal-only",
  EXCLUDED_ERROR: "excluded-error",
}

export const VALID_PUBLIC_DISPLAY = new Set(Object.values(PUBLIC_DISPLAY))

export const CORE_NUTRIENT_KEYS = [
  "kcal",
  "protein_g",
  "fat_g",
  "sat_fat_g",
  "carbs_g",
  "sugar_g",
  "fibre_g",
]

export const MICRONUTRIENT_KEYS = [
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

export const BIOACTIVE_LIPID_KEYS = [
  "oleic_g",
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

export const AMINO_ACID_KEYS = new Set([
  "tryptophan_g",
  "tyrosine_g",
  "leucine_g",
  "lysine_g",
  "arginine_g",
  "glycine_g",
  "methionine_g",
])

export const AMINO_ACID_LABELS = new Set([
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

/**
 * Confirmed relationships that stay in the ontology but are not public table
 * rows by default (trace, variable, or not a meaningful source).
 * Do not delete these tags.
 */
export const SUBSTANCE_ONLY_BY_SLUG = {
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

/** Incorrectly scoped "contains" claims — delete or re-scope; never substance-only. */
export const EXCLUDED_ERROR_BY_SLUG = {
  watermelon: ["Nitric Oxide"],
}

/** Canonical display labels for nutrition_per_100g keys (must match nutritionTableMapping.ts). */
export const NUTRIENT_LABELS = {
  kcal: { label: "Energy", unit: "kcal" },
  protein_g: { label: "Protein", unit: "g" },
  fat_g: { label: "Total fat", unit: "g" },
  sat_fat_g: { label: "Saturated fat", unit: "g" },
  carbs_g: { label: "Carbohydrates", unit: "g" },
  sugar_g: { label: "Sugars", unit: "g" },
  fibre_g: { label: "Fibre", unit: "g" },
  iron_mg: { label: "Iron", unit: "mg" },
  zinc_mg: { label: "Zinc", unit: "mg" },
  magnesium_mg: { label: "Magnesium", unit: "mg" },
  phosphorus_mg: { label: "Phosphorus", unit: "mg" },
  manganese_mg: { label: "Manganese", unit: "mg" },
  selenium_ug: { label: "Selenium", unit: "µg" },
  calcium_mg: { label: "Calcium", unit: "mg" },
  potassium_mg: { label: "Potassium", unit: "mg" },
  copper_mg: { label: "Copper", unit: "mg" },
  choline_mg: { label: "Choline", unit: "mg" },
  folate_ug: { label: "Folate", unit: "µg" },
  vitamin_b12_ug: { label: "Vitamin B12", unit: "µg" },
  vitamin_b6_mg: { label: "Vitamin B6", unit: "mg" },
  vitamin_b2_mg: { label: "Vitamin B2", unit: "mg" },
  vitamin_b1_mg: { label: "Vitamin B1", unit: "mg" },
  vitamin_b3_mg: { label: "Vitamin B3", unit: "mg" },
  vitamin_b5_mg: { label: "Vitamin B5", unit: "mg" },
  vitamin_c_mg: { label: "Vitamin C", unit: "mg" },
  vitamin_a_rae_ug: { label: "Vitamin A", unit: "µg" },
  vitamin_d_ug: { label: "Vitamin D", unit: "µg" },
  vitamin_e_mg: { label: "Vitamin E", unit: "mg" },
  vitamin_k_ug: { label: "Vitamin K", unit: "µg" },
  sodium_mg: { label: "Sodium", unit: "mg" },
  iodine_ug: { label: "Iodine", unit: "µg" },
  omega3_mg: { label: "Total omega-3", unit: "mg" },
  ala_mg: { label: "ALA", unit: "mg" },
  epa_mg: { label: "EPA", unit: "mg" },
  dha_mg: { label: "DHA", unit: "mg" },
  oleic_g: { label: "Oleic Acid", unit: "g" },
  linoleic_g: { label: "Linoleic Acid", unit: "g" },
  lycopene_ug: { label: "Lycopene", unit: "µg" },
  beta_carotene_ug: { label: "Beta-Carotene", unit: "µg" },
  lutein_zeaxanthin_ug: { label: "Lutein + zeaxanthin", unit: "µg" },
  caprylic_g: { label: "Caprylic acid (C8:0)", unit: "g" },
  capric_g: { label: "Capric acid (C10:0)", unit: "g" },
  caproic_g: { label: "Caproic acid (C6:0)", unit: "g" },
  tryptophan_g: { label: "Tryptophan", unit: "g" },
  tyrosine_g: { label: "Tyrosine", unit: "g" },
  leucine_g: { label: "Leucine", unit: "g" },
  lysine_g: { label: "Lysine", unit: "g" },
  arginine_g: { label: "Arginine", unit: "g" },
  glycine_g: { label: "Glycine", unit: "g" },
  methionine_g: { label: "Methionine", unit: "g" },
}

/**
 * Aliases so table labels resolve to substance tags / page titles.
 * Keys are normalised (lowercased) lookup tokens.
 */
export const SUBSTANCE_LABEL_ALIASES = {
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
  "vitamin a": ["Vitamin A", "Vitamin A (Retinol/Carotenoids)"],
  "vitamin d": ["Vitamin D"],
  "oleic acid": ["Oleic Acid", "Oleic Acid (OA, n-9)", "Oleic Acid (n-9)"],
  "oleic acid (oa, n-9)": ["Oleic Acid", "Oleic Acid (OA, n-9)"],
  "oleic acid (n-9)": ["Oleic Acid", "Oleic Acid (OA, n-9)"],
  "linoleic acid": ["Linoleic Acid", "Linoleic Acid (LA, n-6)", "Linoleic Acid (n-6)"],
  "linoleic acid (la, n-6)": ["Linoleic Acid", "Linoleic Acid (LA, n-6)"],
  "linoleic acid (n-6)": ["Linoleic Acid", "Linoleic Acid (LA, n-6)"],
  "vitamin e": ["Vitamin E", "Vitamin E (Tocopherols/Tocotrienols)"],
  "vitamin e (tocopherols/tocotrienols)": ["Vitamin E"],
  ala: ["ALA", "Alpha-Linolenic Acid"],
  "alpha-linolenic acid": ["ALA", "Alpha-Linolenic Acid"],
  dha: ["DHA", "Docosahexaenoic Acid"],
  "docosahexaenoic acid": ["DHA", "Docosahexaenoic Acid"],
  epa: ["EPA", "Eicosapentaenoic Acid"],
  "eicosapentaenoic acid": ["EPA", "Eicosapentaenoic Acid"],
  "lutein + zeaxanthin": ["Lutein", "Zeaxanthin", "Lutein + zeaxanthin"],
  lutein: ["Lutein", "Lutein + zeaxanthin"],
  zeaxanthin: ["Zeaxanthin", "Lutein + zeaxanthin"],
  "beta-carotene": ["Beta-Carotene", "Beta-Carotene"],
  "caprylic acid (c8:0)": ["Caprylic acid (C8:0)"],
  "capric acid (c10:0)": ["Capric acid (C10:0)"],
  "caproic acid (c6:0)": ["Caproic acid (C6:0)"],
  "beta-glucans": ["Beta-Glucans", "Beta-glucan"],
  "beta-glucan": ["Beta-Glucans", "Beta-glucan"],
}

export function normaliseLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
}

export function labelTokens(label) {
  const base = String(label || "")
    .split("(")[0]
    .trim()
  const tokens = new Set([normaliseLabel(label), normaliseLabel(base)])
  const aliases = SUBSTANCE_LABEL_ALIASES[normaliseLabel(label)] || SUBSTANCE_LABEL_ALIASES[normaliseLabel(base)]
  if (aliases) {
    for (const alias of aliases) tokens.add(normaliseLabel(alias))
  }
  return tokens
}

export function labelsOverlap(a, b) {
  const left = labelTokens(a)
  for (const token of labelTokens(b)) {
    if (left.has(token)) return true
  }
  return false
}

export function isFoodIdentityTag(tag, fm) {
  const normalized = String(tag || "").trim()
  const title = String(fm.title ?? "").trim()
  const sidebar = String(fm.sidebar_label ?? title).trim()
  const id = String(fm.id ?? "").trim()
  return (
    normalized === title ||
    normalized === sidebar ||
    normalized.toLowerCase() === id.toLowerCase()
  )
}

export function allFrontMatterTags(fm) {
  const tags = Array.isArray(fm.tags) ? fm.tags : []
  return tags
    .map((tag) => (typeof tag === "string" ? tag : tag?.label))
    .filter((tag) => typeof tag === "string" && tag.trim())
}

/** Substance tags that appear as Substances cards. Category, identity, and trace-only tags excluded. */
export function editorialSubstanceTags(fm) {
  const levels = fm.contribution_levels && typeof fm.contribution_levels === "object" ? fm.contribution_levels : {}
  return allFrontMatterTags(fm)
    .filter((tag) => !CATEGORY_TAGS.has(tag) && !isFoodIdentityTag(tag, fm))
    .filter((tag) => levels[tag] !== TRACE_CONTRIBUTION)
}

export function isTraceContribution(fm, label) {
  const levels = fm.contribution_levels && typeof fm.contribution_levels === "object" ? fm.contribution_levels : {}
  if (levels[label] === TRACE_CONTRIBUTION) return true
  return Object.entries(levels).some(
    ([key, value]) => value === TRACE_CONTRIBUTION && labelsOverlap(key, label),
  )
}

function explicitPublicDisplay(fm, name) {
  const map = fm.public_display && typeof fm.public_display === "object" ? fm.public_display : {}
  const value = map[name]
  return VALID_PUBLIC_DISPLAY.has(value) ? value : null
}

function slugSubstanceOnlyLabels(fm) {
  const slug = String(fm.id || "")
  return SUBSTANCE_ONLY_BY_SLUG[slug] || []
}

function slugExcludedErrorLabels(fm) {
  const slug = String(fm.id || "")
  return EXCLUDED_ERROR_BY_SLUG[slug] || []
}

export function resolvePublicDisplayForKey(fm, key) {
  const label = NUTRIENT_LABELS[key]?.label || key
  const explicit = explicitPublicDisplay(fm, key) || explicitPublicDisplay(fm, label)
  if (explicit) return explicit
  if (key === "omega3_mg") return PUBLIC_DISPLAY.INTERNAL_ONLY

  const publicKeys = Array.isArray(fm.nutrition_public_keys) ? fm.nutrition_public_keys : null
  if (publicKeys && publicKeys.length) {
    if (publicKeys.includes(key) || CORE_NUTRIENT_KEYS.includes(key)) return PUBLIC_DISPLAY.TABLE
    return PUBLIC_DISPLAY.INTERNAL_ONLY
  }

  if (CORE_NUTRIENT_KEYS.includes(key)) return PUBLIC_DISPLAY.TABLE
  if (AMINO_ACID_KEYS.has(key)) return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  if (slugExcludedErrorLabels(fm).some((tag) => labelsOverlap(tag, label))) {
    return PUBLIC_DISPLAY.EXCLUDED_ERROR
  }
  if (slugSubstanceOnlyLabels(fm).some((tag) => labelsOverlap(tag, label))) {
    return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  }
  if (isTraceContribution(fm, label)) return PUBLIC_DISPLAY.SUBSTANCE_ONLY

  const tagged = editorialSubstanceTags(fm).some((tag) => labelsOverlap(tag, label))
  if (MICRONUTRIENT_KEYS.includes(key) || BIOACTIVE_LIPID_KEYS.includes(key)) {
    return tagged ? PUBLIC_DISPLAY.TABLE : PUBLIC_DISPLAY.INTERNAL_ONLY
  }
  return tagged ? PUBLIC_DISPLAY.SUBSTANCE_ONLY : PUBLIC_DISPLAY.INTERNAL_ONLY
}

export function resolvePublicDisplayForSupplementary(fm, row) {
  const explicit =
    (row && VALID_PUBLIC_DISPLAY.has(row.public_display) ? row.public_display : null) ||
    explicitPublicDisplay(fm, row?.key) ||
    explicitPublicDisplay(fm, row?.label)
  if (explicit) return explicit
  if (slugExcludedErrorLabels(fm).some((tag) => labelsOverlap(tag, row.label))) {
    return PUBLIC_DISPLAY.EXCLUDED_ERROR
  }
  if (slugSubstanceOnlyLabels(fm).some((tag) => labelsOverlap(tag, row.label))) {
    return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  }
  if (isTraceContribution(fm, row.label)) return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  if (row.qualitative) {
    const tagged = editorialSubstanceTags(fm).some((tag) => labelsOverlap(tag, row.label))
    return tagged ? PUBLIC_DISPLAY.TABLE : PUBLIC_DISPLAY.INTERNAL_ONLY
  }
  if (row.quantitative && row.value > 0) return PUBLIC_DISPLAY.TABLE
  return PUBLIC_DISPLAY.SUBSTANCE_ONLY
}

export function resolvePublicDisplayForTag(fm, tag) {
  const explicit = explicitPublicDisplay(fm, tag)
  if (explicit) return explicit
  if (slugExcludedErrorLabels(fm).some((item) => labelsOverlap(item, tag))) {
    return PUBLIC_DISPLAY.EXCLUDED_ERROR
  }
  if (AMINO_ACID_LABELS.has(tag)) return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  if (slugSubstanceOnlyLabels(fm).some((item) => labelsOverlap(item, tag))) {
    return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  }
  if (isTraceContribution(fm, tag)) return PUBLIC_DISPLAY.SUBSTANCE_ONLY
  const publicRows = publicTableRows(fm)
  if (publicRows.some((row) => labelsOverlap(row.label, tag))) return PUBLIC_DISPLAY.TABLE
  return PUBLIC_DISPLAY.SUBSTANCE_ONLY
}

export function resolveTruthLevelForTag(fm, tag) {
  const publicRows = publicTableRows(fm)
  const match = publicRows.find((row) => labelsOverlap(row.label, tag))
  if (match) return match.level === "extended" ? TRUTH_LEVEL.EXTENDED : TRUTH_LEVEL.STANDARD
  const internal = allTableRows(fm).find((row) => labelsOverlap(row.label, tag))
  if (internal) return internal.level === "extended" ? TRUTH_LEVEL.EXTENDED : TRUTH_LEVEL.STANDARD
  return TRUTH_LEVEL.ONTOLOGY
}

export function isPublicTableKey(fm, key) {
  return resolvePublicDisplayForKey(fm, key) === PUBLIC_DISPLAY.TABLE
}

export function isPublicSupplementaryRow(fm, row) {
  return resolvePublicDisplayForSupplementary(fm, row) === PUBLIC_DISPLAY.TABLE
}

export function quantitativeTableRows(fm) {
  const nutrition = fm.nutrition_per_100g && typeof fm.nutrition_per_100g === "object" ? fm.nutrition_per_100g : {}
  const rows = []
  for (const [key, raw] of Object.entries(nutrition)) {
    if (typeof raw !== "number" || Number.isNaN(raw) || raw <= 0) continue
    const meta = NUTRIENT_LABELS[key] || { label: key, unit: "" }
    rows.push({
      level: "standard",
      key,
      label: meta.label,
      value: raw,
      unit: meta.unit,
      quantitative: true,
    })
  }
  return rows
}

export function authorisedSpecificationRows(fm) {
  const spec = fm.nutrition_authorised_specifications
  if (!spec || typeof spec !== "object" || !Array.isArray(spec.rows)) return []
  const sourceNote = [
    typeof spec.source_name === "string" ? spec.source_name.trim() : "",
    typeof spec.source_url === "string" ? spec.source_url.trim() : "",
    typeof spec.accessed === "string" ? `accessed ${spec.accessed.trim()}` : "",
  ]
    .filter(Boolean)
    .join(" · ")
  const rows = []
  for (const row of spec.rows) {
    if (!row || typeof row !== "object") continue
    const supports = Array.isArray(row.supports) ? row.supports : []
    for (const label of supports) {
      if (typeof label !== "string" || !label.trim()) continue
      const isEpa = /epa/i.test(label)
      rows.push({
        level: "extended",
        key: `spec_${String(row.formulation || "row")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")}_${isEpa ? "epa" : "dha"}`,
        label: label.trim(),
        value: null,
        unit: "",
        amount_display: isEpa ? String(row.epa || "").trim() : String(row.dha || "").trim(),
        status: "Regulatory minimum specification",
        source_note: sourceNote,
        quantitative: false,
        qualitative: true,
      })
    }
  }
  return rows
}

export function supplementaryTableRows(fm) {
  const list = Array.isArray(fm.nutrition_supplementary_sources) ? fm.nutrition_supplementary_sources : []
  return list
    .filter((s) => s && typeof s.key === "string" && typeof s.label === "string")
    .map((s) => {
      const hasNumeric = typeof s.value === "number" && typeof s.unit === "string" && !Number.isNaN(s.value)
      const display = typeof s.amount_display === "string" ? s.amount_display.trim() : ""
      const status = typeof s.status === "string" ? s.status.trim() : ""
      const sourceNote = typeof s.source_note === "string" ? s.source_note.trim() : ""
      return {
        level: "extended",
        key: s.key,
        label: s.label,
        value: hasNumeric ? s.value : null,
        unit: hasNumeric ? s.unit : "",
        amount_display: display,
        status,
        source_note: sourceNote,
        notes: typeof s.notes === "string" ? s.notes.trim() : "",
        public_display: typeof s.public_display === "string" ? s.public_display.trim() : undefined,
        quantitative: hasNumeric,
        qualitative: !hasNumeric && (display.length > 0 || status.length > 0),
      }
    })
}

/** True when a table row evidences a named compound via its label or qualitative text. */
export function rowEvidencesCompound(row, compound) {
  if (!row || !compound) return false
  if (row.label && labelsOverlap(compound, row.label)) return true
  const blob = [row.amount_display, row.status, row.notes, row.source_note]
    .filter((part) => typeof part === "string" && part.trim())
    .join(" ")
  if (!blob) return false
  const escaped = String(compound).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`\\b${escaped}\\b`, "i").test(blob)
}

export function allTableRows(fm) {
  return [...quantitativeTableRows(fm), ...supplementaryTableRows(fm), ...authorisedSpecificationRows(fm)]
}

/** Rows the public NutritionTable should render. Internal values remain in front matter. */
export function publicTableRows(fm) {
  const quantitative = quantitativeTableRows(fm).filter((row) => isPublicTableKey(fm, row.key))
  const supplementary = supplementaryTableRows(fm).filter((row) => isPublicSupplementaryRow(fm, row))
  const authorised = authorisedSpecificationRows(fm)
  return [...quantitative, ...supplementary, ...authorised]
}

export function tableBackedLabels(fm) {
  return publicTableRows(fm)
    .filter((row) => {
      if (EXCLUDED_SUBSTANCE_KEYS.has(row.key)) return false
      if (row.quantitative && row.value > 0) return true
      return row.qualitative
    })
    .map((row) => row.label)
}

export function isQualitativePresentRow(row) {
  const blob = `${row.status || ""} ${row.amount_display || ""}`.toLowerCase()
  return blob.includes("present") && blob.includes("not established")
}

export function extractOverviewSection(markdownBody) {
  const match = String(markdownBody || "").match(/(?:^|\n)##\s+Overview\s*\n([\s\S]*?)(?=\n##\s|$)/i)
  return match ? match[1].trim() : ""
}

export function extractBoldPhrases(text) {
  const boldRegex = /\*\*([^*]+)\*\*/g
  const seen = new Set()
  const out = []
  let match
  while ((match = boldRegex.exec(String(text || ""))) !== null) {
    const normalized = match[1].trim()
    if (!normalized) continue
    const key = normaliseLabel(normalized)
    if (seen.has(key)) continue
    seen.add(key)
    out.push(normalized)
  }
  return out
}

/** Headline Overview compounds: overview_key_compounds, else bold phrases in ## Overview. */
export function isLikelyOverviewCompoundName(phrase) {
  const text = String(phrase || "").trim()
  if (!text) return false
  if (CATEGORY_TAGS.has(text)) return false
  const words = text.split(/\s+/)
  if (words.length >= 4) return false
  const lower = text.toLowerCase()
  if (
    /\b(limited|support|function|network|pattern|option|source|density|snack|meal)\b/.test(lower)
  ) {
    return false
  }
  if (lower.includes("whole-food") || lower.includes("fat-and-fibre")) return false
  return true
}

export function overviewHeadlineCompounds(fm, markdownBody = "") {
  const fromFm = Array.isArray(fm.overview_key_compounds) ? fm.overview_key_compounds : []
  const explicit = fromFm.map((item) => String(item).trim()).filter(Boolean)
  const raw = explicit.length ? explicit : extractBoldPhrases(extractOverviewSection(markdownBody))
  return raw.filter((phrase) => isLikelyOverviewCompoundName(phrase))
}
