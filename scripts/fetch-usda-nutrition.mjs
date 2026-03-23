#!/usr/bin/env node
/**
 * Script A — Core nutrition ingestion
 *
 * Scans docs/foods/*.md as the source of truth. For each food page:
 * - Resolves USDA search query from scripts/usda-map.json (slug -> query) or slug.
 * - When USDA_API_KEY is set: fetches from USDA API and writes/updates payload.
 * - When USDA_API_KEY is not set: creates/updates payload from existing front matter.
 *
 * No hard-coded food list. New food pages are picked up automatically.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_KEY = process.env.USDA_API_KEY
const BASE_URL = "https://api.nal.usda.gov/fdc/v1"

const FOODS_DIR_DEFAULT = "docs/foods"
const OUT_DIR_DEFAULT = "scripts/out"
const USDA_MAP_PATH = path.join(__dirname, "usda-map.json")

const SKIP_SLUGS = new Set(["index", "shopping-list"])

function parseArgs() {
  const args = process.argv.slice(2)
  const out = { food: null, outDir: OUT_DIR_DEFAULT, foodsDir: FOODS_DIR_DEFAULT }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--food" && args[i + 1]) out.food = args[++i]
    else if (args[i] === "--out-dir" && args[i + 1]) out.outDir = args[++i]
    else if (args[i] === "--foods-dir" && args[i + 1]) out.foodsDir = args[++i]
  }
  return out
}

function getFoodSlugs(foodsDir) {
  const abs = path.resolve(process.cwd(), foodsDir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.basename(f, ".md"))
    .filter((slug) => !SKIP_SLUGS.has(slug))
    .sort()
}

function loadUsdaMap() {
  if (!fs.existsSync(USDA_MAP_PATH)) return {}
  try {
    const raw = JSON.parse(fs.readFileSync(USDA_MAP_PATH, "utf8"))
    const out = {}
    for (const [k, v] of Object.entries(raw)) {
      if (k.startsWith("_") || typeof v !== "string") continue
      out[k] = v.trim()
    }
    return out
  } catch {
    return {}
  }
}

function slugToQuery(slug, usdaMap) {
  return usdaMap[slug] || slug.replace(/-/g, " ")
}

async function usdaFetch(endpoint, params) {
  const url = new URL(`${BASE_URL}/${endpoint}`)
  url.searchParams.set("api_key", API_KEY)
  for (const [k, v] of Object.entries(params || {})) {
    url.searchParams.set(k, v)
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`USDA request failed ${res.status} ${res.statusText}: ${url}`)
  return res.json()
}

function rankFoodCandidates(foods) {
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

function extractNutrients(food) {
  const out = {}
  const nutrients = food.foodNutrients || []
  for (const fn of nutrients) {
    const n = fn.nutrient || fn
    const name = String(n.name || "").toLowerCase()
    const unit = String(n.unitName || "").toLowerCase()
    const amount = fn.amount
    if (amount == null) continue
    if (name.startsWith("energy") && unit === "kcal") { out.kcal = amount; continue }
    if (name === "protein" && unit === "g") { out.protein_g = amount; continue }
    if (name.startsWith("total lipid") && unit === "g") { out.fat_g = amount; continue }
    if (name.startsWith("fatty acids, total saturated") && unit === "g") { out.sat_fat_g = amount; continue }
    if (name.startsWith("carbohydrate, by difference") && unit === "g") { out.carbs_g = amount; continue }
    if (name.startsWith("sugars, total") && unit === "g") { out.sugar_g = amount; continue }
    if (name.startsWith("fiber, total dietary") && unit === "g") { out.fibre_g = amount; continue }
    if (name === "iron, fe" && unit === "mg") { out.iron_mg = amount; continue }
    if (name === "zinc, zn" && unit === "mg") { out.zinc_mg = amount; continue }
    if (name === "magnesium, mg" && unit === "mg") { out.magnesium_mg = amount; continue }
    if (name === "selenium, se" && (unit === "µg" || unit === "mcg")) { out.selenium_ug = amount; continue }
    if (name === "calcium, ca" && unit === "mg") { out.calcium_mg = amount; continue }
    if (name === "potassium, k" && unit === "mg") { out.potassium_mg = amount; continue }
    if (name.startsWith("choline, total") && unit === "mg") { out.choline_mg = amount; continue }
    if (name === "folate, total" && (unit === "µg" || unit === "mcg")) { out.folate_ug = amount; continue }
    if (name.startsWith("vitamin b-12") && (unit === "µg" || unit === "mcg")) { out.vitamin_b12_ug = amount; continue }
    if (name.startsWith("vitamin b-6") && unit === "mg") { out.vitamin_b6_mg = amount; continue }
    if ((name.includes("epa") || name.includes("20:5 n-3")) && (unit === "g" || unit === "mg")) {
      out.epa_mg = unit === "g" ? amount * 1000 : amount
      continue
    }
    if ((name.includes("dha") || name.includes("22:6 n-3")) && (unit === "g" || unit === "mg")) {
      out.dha_mg = unit === "g" ? amount * 1000 : amount
      continue
    }
    if ((name.includes("ala") || name.includes("18:3 n-3")) && (unit === "g" || unit === "mg")) {
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

function buildPayloadFromUsda(nutrients, chosen) {
  const lastChecked = new Date().toISOString().slice(0, 10)
  return {
    nutrition_per_100g: nutrients,
    nutrition_source: {
      database: "USDA FoodData Central",
      food_name: chosen.description || "",
      fdc_id: chosen.fdcId,
      retrieval_method: "API",
      basis: "per 100 g edible portion",
      last_checked: lastChecked,
    },
  }
}

function buildPayloadFromFrontMatter(data) {
  const payload = {
    nutrition_per_100g: data.nutrition_per_100g || {},
    nutrition_source: data.nutrition_source || {},
  }
  if (data.nutrition_supplementary_sources?.length) payload.nutrition_supplementary_sources = data.nutrition_supplementary_sources
  if (data.nutrition_functional_metrics?.length) payload.nutrition_functional_metrics = data.nutrition_functional_metrics
  if (data.protein_profile_note != null) payload.protein_profile_note = data.protein_profile_note
  if (data.amino_acid_strengths != null) payload.amino_acid_strengths = data.amino_acid_strengths
  if (data.limiting_amino_acids != null) payload.limiting_amino_acids = data.limiting_amino_acids
  if (data.complementary_pairings != null) payload.complementary_pairings = data.complementary_pairings
  return payload
}

function buildNoMatchPayload(slug) {
  return {
    nutrition_per_100g: {},
    nutrition_source: {
      database: "USDA FoodData Central",
      status: "no_match",
      slug,
      note: "No USDA match; add query to scripts/usda-map.json or run with USDA_API_KEY for fetch.",
    },
  }
}

async function main() {
  const args = parseArgs()
  const foodsDirAbs = path.resolve(process.cwd(), args.foodsDir)
  const outDirAbs = path.resolve(process.cwd(), args.outDir)
  if (!fs.existsSync(foodsDirAbs)) {
    console.error(`Foods dir not found: ${foodsDirAbs}`)
    process.exit(1)
  }
  fs.mkdirSync(outDirAbs, { recursive: true })

  let slugs = getFoodSlugs(args.foodsDir)
  if (args.food) {
    if (!slugs.includes(args.food)) {
      console.error(`Food not found: ${args.food}`)
      process.exit(1)
    }
    slugs = [args.food]
  }

  const usdaMap = loadUsdaMap()
  const stats = {
    foodsDetected: slugs.length,
    fetchedFromUsda: 0,
    payloadsCreated: 0,
    payloadsUpdated: 0,
    missingUsdaMatch: [],
    skipped: [],
  }

  for (const slug of slugs) {
    const pagePath = path.join(args.foodsDir, `${slug}.md`)
    const pageAbs = path.resolve(process.cwd(), pagePath)
    const payloadPath = path.join(outDirAbs, `${slug}.json`)
    const payloadExisted = fs.existsSync(payloadPath)

    if (API_KEY) {
      const query = slugToQuery(slug, usdaMap)
      try {
        const search = await usdaFetch("foods/search", {
          query,
          dataType: "Foundation,SR Legacy,Branded",
          pageSize: "15",
        })
        const candidates = rankFoodCandidates(search.foods || [])
        let chosen = null
        let full = null
        for (const candidate of candidates) {
          try {
            full = await usdaFetch(`food/${candidate.fdcId}`, {})
            chosen = candidate
            break
          } catch (e) {
            if (String(e).includes("404")) continue
            throw e
          }
        }
        if (chosen && full) {
          const nutrients = extractNutrients(full)
          const payload = buildPayloadFromUsda(nutrients, chosen)
          fs.writeFileSync(payloadPath, JSON.stringify(payload, null, 2) + "\n", "utf8")
          stats.fetchedFromUsda++
          if (payloadExisted) stats.payloadsUpdated++
          else stats.payloadsCreated++
          console.log(`Fetched: ${slug} -> ${chosen.fdcId}`)
        } else {
          const payload = buildNoMatchPayload(slug)
          fs.writeFileSync(payloadPath, JSON.stringify(payload, null, 2) + "\n", "utf8")
          stats.missingUsdaMatch.push(slug)
          if (payloadExisted) stats.payloadsUpdated++
          else stats.payloadsCreated++
          console.log(`No USDA match: ${slug} (wrote no_match payload)`)
        }
      } catch (err) {
        stats.skipped.push(`${slug} (${err.message})`)
        console.error(`Skip ${slug}:`, err.message)
      }
    } else {
      if (!fs.existsSync(pageAbs)) {
        stats.skipped.push(slug + " (page not found)")
        continue
      }
      const raw = fs.readFileSync(pageAbs, "utf8")
      const parsed = matter(raw)
      const payload = buildPayloadFromFrontMatter(parsed.data)
      fs.writeFileSync(payloadPath, JSON.stringify(payload, null, 2) + "\n", "utf8")
      if (payloadExisted) stats.payloadsUpdated++
      else stats.payloadsCreated++
      console.log(`Payload from front matter: ${slug}`)
    }
  }

  console.log("\n--- Nutrition pipeline summary (Script A) ---")
  console.log("Foods detected:", stats.foodsDetected)
  console.log("Fetched from USDA:", stats.fetchedFromUsda)
  console.log("Payloads created:", stats.payloadsCreated)
  console.log("Payloads updated:", stats.payloadsUpdated)
  console.log("Missing USDA match:", stats.missingUsdaMatch.length)
  if (stats.missingUsdaMatch.length) console.log("  ", stats.missingUsdaMatch.join(", "))
  console.log("Skipped:", stats.skipped.length)
  if (stats.skipped.length) stats.skipped.forEach((s) => console.log("  ", s))
  if (!API_KEY) console.log("(USDA_API_KEY not set; payloads from front matter only)")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
