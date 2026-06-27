/**
 * Shared validation logic for food pages.
 * Baseline: system/food-page-model.md (EAA, tags).
 * Canonical: system/food-page-schema.md (dark-chocolate structure).
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { isExplainedReferenceLine } from "./bib-citation-format.mjs"

export const PROTEIN_THRESHOLD_G = 5
export const FOODS_DIR_DEFAULT = "docs/foods"
export const SKIP_SLUGS = new Set(["index", "shopping-list"])

export const PROTEIN_SOURCE_SLUGS = new Set([
  "oats", "barley", "quinoa", "lentils", "chickpeas", "black-beans", "kidney-beans",
  "tofu", "tempeh", "edamame", "soy", "peas", "peanuts", "almonds", "pumpkin-seeds",
  "chia-seeds", "flax-seeds", "sunflower-seeds", "whey-protein", "nutritional-yeast",
])

/** Spices/herbs: USDA protein per 100 g is not meaningful for typical pinches. */
export const EAA_EXCLUDE_SLUGS = new Set(["saffron", "black-pepper", "cinnamon"])

export const DOWNSTREAM_METABOLITE_TAGS = new Set([
  "SCFAs", "Butyrate", "Propionate", "Acetate", "Short-chain fatty acids",
  "Short-Chain Fatty Acids (SCFAs)",
])

const CANONICAL_SECTIONS = [
  { id: "overview", re: /^##\s+Overview\s*$/m },
  { id: "knh", re: /^##\s+Key Nutritional Highlights\s*$/m },
  { id: "foodContext", re: /^##\s+Food Context\s*$/m },
  { id: "recipes", re: /^##\s+Recipes\s*$/m },
  { id: "substances", re: /^##\s+Substances\s*$/m },
  { id: "references", re: /^##\s+References\s*$/m },
]

const BIB_LINK_RE = /\/docs\/papers\/BRAIN-Diet-References#[a-z0-9_-]+/i

export function getFoodSlugs(foodsDir) {
  const abs = path.resolve(process.cwd(), foodsDir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.basename(f, ".md"))
    .filter((slug) => !SKIP_SLUGS.has(slug))
    .sort()
}

export function requiresEaaSection(slug, nutrition) {
  if (EAA_EXCLUDE_SLUGS.has(slug)) return false
  const protein = nutrition?.protein_g
  if (typeof protein === "number" && protein >= PROTEIN_THRESHOLD_G) return true
  return PROTEIN_SOURCE_SLUGS.has(slug)
}

export function hasEaaSection(content) {
  if (!content || typeof content !== "string") return false
  return /^###\s+Essential\s+Amino\s+Acid\s+Profile\s*$/m.test(content)
}

export function hasDownstreamMetaboliteTags(tags) {
  if (!Array.isArray(tags)) return []
  return tags.filter((t) => DOWNSTREAM_METABOLITE_TAGS.has(String(t).trim()))
}

function sectionIndex(content, re) {
  const m = content.match(re)
  return m ? m.index : -1
}

function extractSection(content, startRe, endRes) {
  const start = sectionIndex(content, startRe)
  if (start === -1) return null
  const slice = content.slice(start)
  const firstLineEnd = slice.indexOf("\n")
  const bodyStart = firstLineEnd === -1 ? slice.length : firstLineEnd + 1
  const rest = slice.slice(bodyStart)
  let end = slice.length
  for (const endRe of endRes) {
    const m = rest.match(endRe)
    if (m) {
      end = Math.min(end, bodyStart + m.index)
    }
  }
  return slice.slice(0, end)
}

function countKnHBullets(knhSection) {
  if (!knhSection) return 0
  const lines = knhSection.split("\n")
  let count = 0
  for (const line of lines) {
    if (/^-\s+/.test(line)) count += 1
  }
  return count
}

function referencesMissingBibLinks(referencesSection) {
  if (!referencesSection) return ["References section missing"]
  const issues = []
  const lines = referencesSection
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^##\s/.test(l))

  if (lines.length === 0) {
    issues.push("References section has no entries")
    return issues
  }

  for (const line of lines) {
    if (line.startsWith("-")) {
      issues.push(`Reference uses bullet prefix (canonical: no bullets): ${line.slice(0, 60)}…`)
      continue
    }
    if (!BIB_LINK_RE.test(line)) {
      issues.push(`Reference without bibliography link: ${line.slice(0, 80)}…`)
      continue
    }
    if (!isExplainedReferenceLine(line)) {
      issues.push(`Reference not in explained canonical format: ${line.slice(0, 80)}…`)
    }
  }
  return issues
}

function hasNutritionLayer(fm) {
  const n = fm.nutrition_per_100g
  if (n && typeof n === "object" && Object.keys(n).length > 0) return true
  if (Array.isArray(fm.nutrition_supplementary_sources) && fm.nutrition_supplementary_sources.length) {
    return true
  }
  if (Array.isArray(fm.nutrition_functional_metrics) && fm.nutrition_functional_metrics.length) {
    return true
  }
  return false
}

/**
 * Canonical structure checks (dark-chocolate schema).
 * @returns {Array<{slug: string, issues: string[]}>}
 */
export function runCanonicalValidation(foodsDir = FOODS_DIR_DEFAULT, slugFilter = null) {
  const dirAbs = path.resolve(process.cwd(), foodsDir)
  const slugs = getFoodSlugs(foodsDir).filter((s) => !slugFilter || s === slugFilter)
  const failures = []

  const sectionLabels = {
    overview: "Overview",
    knh: "Key Nutritional Highlights",
    foodContext: "Food Context",
    recipes: "Recipes",
    substances: "Substances",
    references: "References",
  }

  for (const slug of slugs) {
    const filePath = path.join(dirAbs, `${slug}.md`)
    if (!fs.existsSync(filePath)) continue
    const raw = fs.readFileSync(filePath, "utf8")
    const { data: fm, content } = matter(raw)
    const issues = []

    const positions = {}
    for (const { id, re } of CANONICAL_SECTIONS) {
      positions[id] = sectionIndex(content, re)
      if (positions[id] === -1) {
        issues.push(`Missing section: ## ${sectionLabels[id]}`)
      }
    }

    const orderPairs = [
      ["overview", "knh"],
      ["knh", "foodContext"],
      ["foodContext", "recipes"],
      ["recipes", "substances"],
      ["substances", "references"],
    ]
    for (const [a, b] of orderPairs) {
      if (positions[a] !== -1 && positions[b] !== -1 && positions[a] >= positions[b]) {
        issues.push(`Section order: ## ${sectionLabels[a]} must appear before ## ${sectionLabels[b]}`)
      }
    }

    const knhSection = extractSection(content, /^##\s+Key Nutritional Highlights\s*$/m, [/^##\s+/m])
    const knhCount = countKnHBullets(knhSection)
    if (positions.knh !== -1 && (knhCount < 3 || knhCount > 6)) {
      issues.push(`Key Nutritional Highlights: expected 3–6 bullets, found ${knhCount}`)
    }

    if (!/<FoodRecipes\s/.test(content)) {
      issues.push("Missing component: <FoodRecipes />")
    }

    if (hasNutritionLayer(fm)) {
      if (!/<NutritionTable\s/.test(content)) {
        issues.push("Missing component: <NutritionTable /> (page has nutrition front matter)")
      }
      if (!/<FoodSubstancesFromTable\s/.test(content)) {
        issues.push("Missing component: <FoodSubstancesFromTable /> (page has nutrition front matter)")
      }
    }

    const nutritionIdx = content.search(/<NutritionTable\s/)
    const recipesIdx = positions.recipes
    const substancesIdx = positions.substances
    if (recipesIdx !== -1 && nutritionIdx !== -1 && recipesIdx > nutritionIdx) {
      issues.push("Component order: <FoodRecipes /> block should appear before <NutritionTable />")
    }
    if (nutritionIdx !== -1 && substancesIdx !== -1 && nutritionIdx > substancesIdx) {
      issues.push("Component order: <NutritionTable /> should appear before ## Substances")
    }

    const refsSection = extractSection(content, /^##\s+References\s*$/m, [])
    for (const refIssue of referencesMissingBibLinks(refsSection)) {
      issues.push(refIssue)
    }

    if (requiresEaaSection(slug, fm.nutrition_per_100g || {}) && !hasEaaSection(content)) {
      issues.push("Missing ### Essential Amino Acid Profile (required for this food)")
    }

    if (issues.length) {
      failures.push({ slug, issues })
    }
  }

  return failures
}

/**
 * Run baseline validation on all food pages.
 */
export function runValidation(foodsDir = FOODS_DIR_DEFAULT) {
  const dirAbs = path.resolve(process.cwd(), foodsDir)
  const slugs = getFoodSlugs(foodsDir)
  const missingEaa = []
  const downstreamInTags = []

  for (const slug of slugs) {
    const filePath = path.join(dirAbs, `${slug}.md`)
    if (!fs.existsSync(filePath)) continue
    const raw = fs.readFileSync(filePath, "utf8")
    const { data: fm, content } = matter(raw)
    const nutrition = fm.nutrition_per_100g || {}
    const tags = fm.tags || []

    if (requiresEaaSection(slug, nutrition) && !hasEaaSection(content)) {
      missingEaa.push({ slug, protein_g: nutrition.protein_g })
    }
    const bad = hasDownstreamMetaboliteTags(tags)
    if (bad.length) downstreamInTags.push({ slug, tags: bad })
  }

  return { missingEaa, downstreamInTags }
}
