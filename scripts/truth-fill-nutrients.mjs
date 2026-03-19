#!/usr/bin/env node
/**
 * Truth-fill selected nutrient keys in food page frontmatter by scraping MyFoodData.
 *
 * Target nutrient keys:
 * - vitamin_e_mg (Vitamin E, alpha-tocopherol)
 * - vitamin_k_ug (Vitamin K)
 * - ala_mg (alpha-linolenic acid / ALA)
 * - omega3_mg (total omega-3)
 * - epa_mg (EPA)
 * - dha_mg (DHA)
 *
 * The pages already have `nutrition_source.fdc_id` + `nutrition_per_100g`.
 * We fetch MyFoodData for that FDC ID, parse the serving size weight from
 * "Detailed Nutrition Facts", scale everything to per-100g, and then
 * update nutrition_per_100g fields only when:
 *   - the key is missing, or
 *   - the current value is <= 0 (placeholder/unknown)
 *
 * Why scrape instead of “internal API”:
 * - This repo currently stores a partial USDA extraction in frontmatter.
 * - MyFoodData provides the missing nutrients (vitamin E/K and ALA/omega-3 breakdown)
 *   for many of the targeted foods.
 */

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const FOOD_DIR = path.resolve(process.cwd(), "docs/foods")

const TARGET_SLUGS = [
  // Grains / pseudograins
  "barley",
  "oats",
  "rice",
  "wheat",
  "quinoa",
  "amaranth",
  "buckwheat",
  "spelt",
  "whole-grains",
  "wheat-germ",

  // Nuts / seeds
  "almonds",
  "walnuts",
  "cashews",
  "pistachios",
  "chia-seeds",
  "flax-seeds",
  "sunflower-seeds",
  "pumpkin-seeds",
  "sesame-seeds",

  // Optional "nut" category page (tagged elsewhere); safe to include.
  "peanuts",
]

const NUTRIENT_KEYS = {
  vitamin_e_mg: {
    unit: "mg",
    // Nutrient row in MyFoodData (serving table): "Vitamin E | 20.3mg"
    regex: /Vitamin E\s*\|\s*([0-9]+(?:\.[0-9]+)?)mg/,
  },
  vitamin_k_ug: {
    unit: "mcg",
    // "Vitamin K | 3.4mcg"
    regex: /Vitamin K\s*\|\s*([0-9]+(?:\.[0-9]+)?)mcg/,
  },
  magnesium_mg: {
    unit: "mg",
    // "Magnesium | 40.4mg"
    regex: /Magnesium\s*\|\s*([0-9]+(?:\.[0-9]+)?)mg/,
  },
  ala_mg: {
    unit: "g",
    // "alpha-Linolenic Acid (ALA) | 5.064g"
    regex: /alpha-Linolenic Acid\s*\(ALA\)\s*\|\s*([0-9]+(?:\.[0-9]+)?)g/,
  },
  omega3_mg: {
    unit: "g",
    // "Omega 3s | 0.938g"
    regex: /Omega 3s\s*\|\s*([0-9]+(?:\.[0-9]+)?)g/,
  },
  epa_mg: {
    unit: "g",
    // "Eicosapentaenoic Acid (EPA) | 0g"
    regex: /Eicosapentaenoic Acid\s*\(EPA\)\s*\|\s*([0-9]+(?:\.[0-9]+)?)g/,
  },
  dha_mg: {
    unit: "g",
    // "Docosahexaenoic Acid (DHA) | 0g"
    regex: /Docosahexaenoic Acid\s*\(DHA\)\s*\|\s*([0-9]+(?:\.[0-9]+)?)g/,
  },
}

function parseServingWeightGrams(html) {
  // In MyFoodData HTML/text output, "Detailed Nutrition Facts" contains a "| Weight | XXg" row.
  const re = /Detailed Nutrition Facts[\s\S]*?\|\s*Weight\s*\|\s*([0-9]+(?:\.[0-9]+)?)g/
  const m = html.match(re)
  if (!m) return null
  const w = Number(m[1])
  if (!Number.isFinite(w) || w <= 0) return null
  return w
}

function parseNutrientValues(html) {
  const values = {}
  for (const [key, cfg] of Object.entries(NUTRIENT_KEYS)) {
    const m = html.match(cfg.regex)
    if (!m) continue
    const raw = Number(m[1])
    if (!Number.isFinite(raw)) continue
    values[key] = raw
  }
  return values
}

function urlForFdcId(fdcId, wt) {
  return `https://tools.myfooddata.com/nutrition-facts/${fdcId}/${wt}`
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      // A UA helps avoid occasional 403/blocks.
      "User-Agent": "Mozilla/5.0",
    },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`)
  }
  return await res.text()
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function shouldUpdate(existingValue) {
  // Update when:
  // - missing
  // - explicit placeholder 0
  if (existingValue == null) return true
  if (typeof existingValue !== "number") return true
  return existingValue <= 0
}

function scaleToPer100g({
  servingWeightGrams,
  nutrientRawValue,
  nutrientUnit,
  targetKey,
}) {
  const factor = 100 / servingWeightGrams

  if (nutrientUnit === "mg") {
    // mg per serving -> mg per 100g
    return nutrientRawValue * factor
  }
  if (nutrientUnit === "mcg") {
    // mcg per serving -> mcg per 100g
    return nutrientRawValue * factor
  }
  if (nutrientUnit === "g") {
    // g per serving -> mg per 100g
    // Note: ALA/omega3/EPA/DHA are stored as mg keys in this repo.
    return nutrientRawValue * factor * 1000
  }
  throw new Error(`Unhandled unit for ${targetKey}: ${nutrientUnit}`)
}

async function scrapeNutrientsForFdcId(fdcId) {
  // Try wt1 then wt2; some foods land better in one template.
  const candidates = ["wt1", "wt2"]

  let best = null
  let bestCount = -1

  for (const wt of candidates) {
    const url = urlForFdcId(fdcId, wt)
    const html = await fetchText(url)
    const servingWeightGrams = parseServingWeightGrams(html)
    if (!servingWeightGrams) continue

    const parsed = parseNutrientValues(html)
    const count = Object.keys(parsed).length
    if (count > bestCount) {
      best = { servingWeightGrams, parsed }
      bestCount = count
    }
    // If we already got most fields, don't waste time.
    if (count >= 4) break
  }

  return best
}

function updateFrontMatter(frontMatter, scraped) {
  const servingWeightGrams = scraped.servingWeightGrams
  const parsed = scraped.parsed

  const nutrition = (frontMatter.nutrition_per_100g || {}) as Record<string, unknown>
  let didUpdate = false

  for (const [key, cfg] of Object.entries(NUTRIENT_KEYS)) {
    if (!(key in parsed)) continue
    const raw = parsed[key]
    const current = nutrition[key]

    if (!shouldUpdate(typeof current === "number" ? current : null)) {
      // existing value is positive and we don't want to overwrite.
      continue
    }

    const scaled = scaleToPer100g({
      servingWeightGrams,
      nutrientRawValue: raw,
      nutrientUnit: cfg.unit,
      targetKey: key,
    })

    // Round to 1 decimal for mg/ug display stability.
    nutrition[key] = Math.round(scaled * 10) / 10
    didUpdate = true
  }

  frontMatter.nutrition_per_100g = nutrition
  return didUpdate
}

async function main() {
  if (!fs.existsSync(FOOD_DIR)) {
    throw new Error(`Food dir not found: ${FOOD_DIR}`)
  }

  let updatedCount = 0
  let skippedCount = 0
  let errorCount = 0

  for (const slug of TARGET_SLUGS) {
    const filePath = path.join(FOOD_DIR, `${slug}.md`)
    if (!fs.existsSync(filePath)) {
      console.warn(`Skip (missing file): ${slug}`)
      skippedCount++
      continue
    }

    const raw = fs.readFileSync(filePath, "utf8")
    const parsed = matter(raw)
    const fm = parsed.data || {}

    const fdcId = fm?.nutrition_source?.fdc_id
    if (!fdcId) {
      console.warn(`Skip (no fdc_id): ${slug}`)
      skippedCount++
      continue
    }

    try {
      console.log(`Scraping: ${slug} (FDC ${fdcId})`)
      const scraped = await scrapeNutrientsForFdcId(fdcId)
      if (!scraped) {
        console.warn(`Skip (no parseable nutrients): ${slug}`)
        skippedCount++
        continue
      }

      const didUpdate = updateFrontMatter(fm, scraped)
      if (didUpdate) {
        updatedCount++
        const nextRaw = matter.stringify(parsed.content, fm, { lineWidth: 9999 })
        fs.writeFileSync(filePath, nextRaw, "utf8")
      } else {
        skippedCount++
      }
    } catch (e) {
      errorCount++
      console.error(`Error for ${slug}:`, e?.message || e)
    }

    // Be nice to MyFoodData.
    await sleep(1200)
  }

  console.log(
    `\ntruth-fill complete: updated=${updatedCount}, skipped=${skippedCount}, errors=${errorCount}\n`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

