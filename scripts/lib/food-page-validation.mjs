/**
 * Shared validation logic for food pages (system/food-page-model.md).
 * Used by validate-food-pages.mjs and repair-food-pages.mjs.
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export const PROTEIN_THRESHOLD_G = 5
export const FOODS_DIR_DEFAULT = "docs/foods"
export const SKIP_SLUGS = new Set(["index", "shopping-list"])

export const PROTEIN_SOURCE_SLUGS = new Set([
  "oats", "barley", "quinoa", "lentils", "chickpeas", "black-beans", "kidney-beans",
  "tofu", "tempeh", "edamame", "soy", "peas", "peanuts", "almonds", "pumpkin-seeds",
  "chia-seeds", "flax-seeds", "sunflower-seeds", "whey-protein", "nutritional-yeast",
])

export const DOWNSTREAM_METABOLITE_TAGS = new Set([
  "SCFAs", "Butyrate", "Propionate", "Acetate", "Short-chain fatty acids",
  "Short-Chain Fatty Acids (SCFAs)",
])

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

/**
 * Run validation on all food pages. Returns structured results (no exit).
 * @param {string} [foodsDir=FOODS_DIR_DEFAULT]
 * @returns {{ missingEaa: Array<{slug: string, protein_g?: number}>, downstreamInTags: Array<{slug: string, tags: string[]}> }}
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
