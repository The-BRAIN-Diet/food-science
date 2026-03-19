#!/usr/bin/env node
/**
 * add-rank-highlights.mjs
 *
 * Scans nutrition_per_100g across food pages by category and, when justified,
 * injects a single rank-style bullet into `## Key Nutritional Highlights`.
 *
 * Editorial rules (Rank Claim Rule for Key Nutritional Highlights):
 * - Only add a rank bullet when it is genuinely distinctive and useful.
 * - Do NOT add a rank bullet merely because a food is numerically highest.
 *
 * A rank highlight is allowed only if ALL are true:
 * 1. Nutrient is relevant to the category (controlled by per‑category priority map).
 * 2. Food is highest or joint-highest within the category (per 100 g).
 * 3. Tie group is small enough to be meaningful (we cap ties at 2 by default).
 * 4. Top value is meaningfully higher than most peers (margin over next is non-trivial).
 * 5. Claim adds real differentiation, not just a feature that is flat across the category.
 *
 * Suppress rank claims when:
 * - More than 2–3 foods share the top value.
 * - Difference from the next foods is negligible.
 * - The nutrient is broadly similar across the category (flat distribution).
 * - The resulting bullet would be uninformative or generic.
 *
 * Implementation details:
 * - Categories are defined over a subset of foods (meat/organ, fish/seafood, grains/pseudograins).
 * - For each category and nutrient in its priority list:
 *   - Compute max, ties, next-best, median, spread.
 *   - Compute a simple "distinctiveness" score:
 *     - unique top → bonus
 *     - smaller tie group → bonus
 *     - larger margin over next-best → bonus
 *     - larger spread across category → bonus
 *   - Only keep candidates whose score exceeds a threshold.
 * - For each food, pick the single highest-scoring nutrient and inject:
 *   - "Highest X among BRAIN Diet <category label> pages (per 100 g)."
 *   - or "Joint-highest X ..." when tie size > 1 (and allowed).
 *
 * Safe to re-run: before inserting, the script removes any existing auto-generated
 * "Highest/Joint-highest ... among BRAIN Diet ... pages (per 100 g)." bullets
 * from the Key Nutritional Highlights section for that page.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FOODS_DIR = path.join(__dirname, "..", "docs", "foods")

// Category definitions (subset of foods where rank bullets are useful)
const CATEGORIES = {
  "meat/organ": [
    "beef",
    "lamb",
    "pork",
    "chicken",
    "turkey",
    "liver",
    "organ-meats",
    "heart",
    "kidney",
  ],
  "fish/seafood": [
    "salmon",
    "tuna",
    "cod",
    "herring",
    "scallops",
    "shrimp",
    "sardines",
    "mussels",
    "oysters",
    "mackerel",
  ],
  "grains/pseudograins": [
    "amaranth",
    "quinoa",
    "buckwheat",
    "wheat",
    "barley",
    "oats",
    "rice",
    "whole-grains",
    "wheat-germ",
  ],
}

// Human-facing category labels for the bullet text
const CATEGORY_LABEL = {
  "meat/organ": "meat and organ",
  "fish/seafood": "fish and seafood",
  "grains/pseudograins": "grain and pseudograin",
}

// Nutrient priorities per category (only these are eligible for rank bullets)
const PRIORITY_NUTRIENTS = {
  "meat/organ": ["protein_g", "iron_mg", "zinc_mg", "selenium_ug", "choline_mg"],
  "fish/seafood": ["omega3_mg", "epa_mg", "dha_mg", "protein_g", "selenium_ug"],
  "grains/pseudograins": ["fibre_g", "magnesium_mg", "iron_mg", "protein_g", "folate_ug"],
}

// Short human labels for nutrients
const NUTRIENT_LABEL = {
  protein_g: "protein",
  iron_mg: "iron",
  zinc_mg: "zinc",
  selenium_ug: "selenium",
  choline_mg: "choline",
  omega3_mg: "total omega-3",
  epa_mg: "EPA",
  dha_mg: "DHA",
  fibre_g: "fibre",
  magnesium_mg: "magnesium",
  folate_ug: "folate",
}

// Editorial thresholds
const MAX_TIE_COUNT = 2 // allow unique or joint-highest with at most 2 foods
const MIN_MARGIN_RATIO = 0.10 // at least 10% above next-best for macros/minerals
const MIN_SPREAD_RATIO = 0.10 // distribution must not be too flat across category
const SCORE_THRESHOLD = 3 // minimal distinctiveness score required to emit a bullet

function readNutritionPer100g(slug) {
  const filePath = path.join(FOODS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf8")
  const parsed = matter(raw)
  const nut = parsed.data?.nutrition_per_100g || {}
  const numeric = {}
  for (const [k, v] of Object.entries(nut)) {
    if (typeof v === "number") numeric[k] = v
  }
  return { filePath, raw, parsed, nutrition: numeric }
}

function computeStatsForNutrient(slugs, slugToNut, key) {
  const entries = slugs
    .map((s) => [s, slugToNut[s]?.[key] ?? Number.NEGATIVE_INFINITY])
    .filter(([, v]) => v !== Number.NEGATIVE_INFINITY)
  if (entries.length === 0) return null

  const values = entries.map(([, v]) => v)
  const max = Math.max(...values)
  const min = Math.min(...values)

  const tops = entries.filter(([, v]) => v === max).map(([s]) => s)

  // next-best value (strictly less than max)
  const lower = values.filter((v) => v < max)
  const nextBest = lower.length ? Math.max(...lower) : null

  // median (for potential future use)
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  const median =
    sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]

  return { max, min, tops, nextBest, median }
}

function scoreCandidate({ max, min, tops, nextBest }) {
  const tieCount = tops.length
  if (!max || max <= 0) return 0
  if (!nextBest || nextBest <= 0 || nextBest === Number.NEGATIVE_INFINITY) return 0

  const marginRatio = (max - nextBest) / nextBest
  const spreadRatio = (max - min) / max

  let score = 0

  // Unique top vs joint-highest
  if (tieCount === 1) score += 2
  else if (tieCount === 2) score += 1
  // larger tie groups are filtered earlier

  // Margin over next-best
  if (marginRatio >= 0.20) score += 2
  else if (marginRatio >= MIN_MARGIN_RATIO) score += 1

  // Spread across category (avoid flat distributions)
  if (spreadRatio >= 0.30) score += 2
  else if (spreadRatio >= MIN_SPREAD_RATIO) score += 1

  return score
}

function chooseBestRankForSlug(category, slug, slugs, slugToNut) {
  const priorities = PRIORITY_NUTRIENTS[category] || []
  let best = null

  for (const key of priorities) {
    const label = NUTRIENT_LABEL[key]
    if (!label) continue

    const stats = computeStatsForNutrient(slugs, slugToNut, key)
    if (!stats) continue

    const { max, min, tops, nextBest } = stats
    const value = slugToNut[slug]?.[key]
    if (!value || value <= 0) continue

    // must be top or joint-top
    if (!tops.includes(slug)) continue

    const tieCount = tops.length

    // tie group must be small enough
    if (tieCount > MAX_TIE_COUNT) continue

    // require meaningful spread across category
    const spreadRatio = (max - min) / max
    if (spreadRatio < MIN_SPREAD_RATIO) continue

    // require meaningful margin over next-best
    if (!nextBest || nextBest <= 0 || nextBest === Number.NEGATIVE_INFINITY) continue
    const marginRatio = (max - nextBest) / nextBest
    if (marginRatio < MIN_MARGIN_RATIO) continue

    const score = scoreCandidate({ max, min, tops, nextBest })
    if (score < SCORE_THRESHOLD) continue

    if (!best || score > best.score) {
      best = { key, label, score, tieCount }
    }
  }

  return best
}

function updateHighlightsForSlug(slug, category, best) {
  const filePath = path.join(FOODS_DIR, `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const marker = "## Key Nutritional Highlights"
  const idx = raw.indexOf(marker)
  if (idx === -1) return false

  const nextHeadingIdx = raw.indexOf("\n## ", idx + marker.length)
  const sectionEnd = nextHeadingIdx === -1 ? raw.length : nextHeadingIdx
  const before = raw.slice(0, idx)
  const section = raw.slice(idx, sectionEnd)
  const after = raw.slice(sectionEnd)

  const lines = section.split("\n")

  // Remove any previously auto-inserted rank bullet
  const rankPattern =
    /^(?:- )?(?:Joint-highest|Highest) .* among BRAIN Diet .* pages \(per 100 g\)\.\s*$/
  const cleaned = lines.filter((ln) => !rankPattern.test(ln.trim()))

  if (!best) {
    // No new rank claim selected: just write back cleaned section if changed
    const newSection = cleaned.join("\n")
    const newRaw = before + newSection + after
    if (newRaw !== raw) {
      fs.writeFileSync(filePath, newRaw)
      return true
    }
    return false
  }

  const catLabel = CATEGORY_LABEL[category] || category
  const prefix = best.tieCount > 1 ? "Joint-highest" : "Highest"
  const bullet = `- ${prefix} ${best.label} among BRAIN Diet ${catLabel} pages (per 100 g).`

  // Insert the bullet as the first bullet in the section (after heading and any blank line)
  let insertIdx = cleaned.length
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i].trim().startsWith("- ")) {
      insertIdx = i
      break
    }
  }
  // Ensure a blank line between heading and bullets if needed
  if (insertIdx === cleaned.length && cleaned.length > 0 && cleaned[cleaned.length - 1].trim() !== "") {
    cleaned.push("")
    insertIdx = cleaned.length
  }
  cleaned.splice(insertIdx, 0, bullet)

  const newSection = cleaned.join("\n")
  const newRaw = before + newSection + after
  if (newRaw !== raw) {
    fs.writeFileSync(filePath, newRaw)
    return true
  }
  return false
}

function main() {
  const changed = []

  for (const [category, slugs] of Object.entries(CATEGORIES)) {
    // Load nutrition data once per category
    const slugToNut = {}
    for (const slug of slugs) {
      const info = readNutritionPer100g(slug)
      if (!info) continue
      slugToNut[slug] = info.nutrition
    }

    for (const slug of slugs) {
      if (!slugToNut[slug]) continue
      const best = chooseBestRankForSlug(category, slug, slugs, slugToNut)
      const updated = updateHighlightsForSlug(slug, category, best)
      if (updated) changed.push(slug)
    }
  }

  if (changed.length) {
    console.log("Updated rank highlights for:", changed.join(", "))
  } else {
    console.log("No rank highlights updated.")
  }
}

main()

