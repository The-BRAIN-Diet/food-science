#!/usr/bin/env node
/**
 * Script B — Overview-driven compound enrichment
 *
 * Reads a food page and its payload (from Script A). Detects compounds
 * that should appear in the table but are missing; looks them up in
 * approved secondary sources and adds nutrition_supplementary_sources.
 *
 * Enrichment trigger (deterministic order):
 *   1. If front matter has overview_key_compounds (list of names), use that.
 *   2. Otherwise fall back to **bold** phrases in the ## Overview section.
 *
 * Deduplication: never adds an entry whose key is already in
 * nutrition_supplementary_sources or already added in this run.
 *
 * Usage:
 *   node scripts/enrich-nutrition-from-overview.mjs --page docs/foods/salmon.md --payload scripts/out/salmon.json
 *   node scripts/enrich-nutrition-from-overview.mjs --all --pages-dir docs/foods --payload-dir scripts/out
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SKIP_SLUGS = new Set(["index", "shopping-list"])

// Labels for core table keys (must stay in sync with nutritionTableMapping.ts / schema)
const NUTRIENT_LABELS = {
  kcal: "Energy",
  protein_g: "Protein",
  fat_g: "Total fat",
  sat_fat_g: "Saturated fat",
  carbs_g: "Carbohydrates",
  iron_mg: "Iron",
  zinc_mg: "Zinc",
  magnesium_mg: "Magnesium",
  selenium_ug: "Selenium",
  calcium_mg: "Calcium",
  potassium_mg: "Potassium",
  choline_mg: "Choline",
  folate_ug: "Folate",
  vitamin_b12_ug: "Vitamin B12",
  vitamin_b6_mg: "Vitamin B6",
  omega3_mg: "Total omega-3",
  epa_mg: "EPA",
  dha_mg: "DHA",
}

function getFoodSlugs(pagesDir) {
  const abs = path.resolve(process.cwd(), pagesDir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.basename(f, ".md"))
    .filter((slug) => !SKIP_SLUGS.has(slug))
    .sort()
}

function buildPayloadFromFrontMatter(data) {
  const payload = {
    nutrition_per_100g: data.nutrition_per_100g || {},
    nutrition_source: data.nutrition_source || {},
  }
  if (data.nutrition_supplementary_sources?.length) payload.nutrition_supplementary_sources = data.nutrition_supplementary_sources
  if (data.protein_profile_note != null) payload.protein_profile_note = data.protein_profile_note
  if (data.amino_acid_strengths != null) payload.amino_acid_strengths = data.amino_acid_strengths
  if (data.limiting_amino_acids != null) payload.limiting_amino_acids = data.limiting_amino_acids
  if (data.complementary_pairings != null) payload.complementary_pairings = data.complementary_pairings
  return payload
}

function parseArgs() {
  const args = process.argv.slice(2)
  const out = { page: null, payload: null, all: false, pagesDir: "docs/foods", payloadDir: "scripts/out" }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--page" && args[i + 1]) {
      out.page = args[++i]
    } else if (args[i] === "--payload" && args[i + 1]) {
      out.payload = args[++i]
    } else if (args[i] === "--all") {
      out.all = true
    } else if (args[i] === "--pages-dir" && args[i + 1]) {
      out.pagesDir = args[++i]
    } else if (args[i] === "--payload-dir" && args[i + 1]) {
      out.payloadDir = args[++i]
    }
  }
  return out
}

/**
 * Extract the first paragraph/section under ## Overview (up to next ## or end).
 */
function extractOverviewText(mdContent) {
  const match = mdContent.match(/(?:^|\n)##\s+Overview\s*\n([\s\S]*?)(?=\n##\s|$)/i)
  return match ? match[1].trim() : ""
}

/**
 * Extract **bold** phrases from text; return normalized identifiers (lowercase, single space).
 */
function extractBoldPhrases(text) {
  const boldRegex = /\*\*([^*]+)\*\*/g
  const set = new Set()
  let m
  while ((m = boldRegex.exec(text)) !== null) {
    const normalized = m[1].trim().toLowerCase().replace(/\s+/g, " ")
    if (normalized.length > 0) set.add(normalized)
  }
  return [...set]
}

/**
 * Build set of compound labels already represented in the table (core + supplementary).
 */
function buildTableLabelSet(nutritionPer100g, supplementarySources) {
  const set = new Set()
  for (const label of Object.values(NUTRIENT_LABELS)) {
    if (label) set.add(label.trim().toLowerCase())
  }
  if (nutritionPer100g && typeof nutritionPer100g === "object") {
    for (const key of Object.keys(nutritionPer100g)) {
      const label = NUTRIENT_LABELS[key] || key
      set.add(String(label).trim().toLowerCase())
    }
  }
  if (Array.isArray(supplementarySources)) {
    for (const s of supplementarySources) {
      if (s && typeof s.label === "string") set.add(s.label.trim().toLowerCase())
    }
  }
  return set
}

/**
 * Map a compound name (from overview_key_compounds or bold phrase) to a literature-compounds key.
 */
function phraseToCompoundId(phrase, literatureKeys) {
  const n = phrase.trim().toLowerCase().replace(/\s+/g, " ")
  if (literatureKeys.has(n)) return n
  const withoutSpaces = n.replace(/\s/g, "")
  if (literatureKeys.has(withoutSpaces)) return withoutSpaces
  return null
}

/**
 * Get the list of compound names to consider for enrichment.
 * Prefer front matter overview_key_compounds; fall back to bold phrases in ## Overview.
 * Returns a deduplicated array of normalized strings (lowercase, single space).
 */
function getCandidateCompounds(pagePath) {
  const pageAbs = path.resolve(process.cwd(), pagePath)
  const raw = fs.readFileSync(pageAbs, "utf8")
  const parsed = matter(raw)

  const fromFrontMatter = parsed.data?.overview_key_compounds
  if (Array.isArray(fromFrontMatter) && fromFrontMatter.length > 0) {
    const seen = new Set()
    return fromFrontMatter.filter((item) => {
      const s = String(item).trim()
      if (!s) return false
      const normalized = s.toLowerCase().replace(/\s+/g, " ")
      if (seen.has(normalized)) return false
      seen.add(normalized)
      return true
    })
  }

  const overviewText = extractOverviewText(parsed.content)
  return extractBoldPhrases(overviewText)
}

/**
 * Strict supplementary entry: all five fields required.
 */
function isStrictSupplementary(entry) {
  return (
    entry &&
    typeof entry.key === "string" &&
    typeof entry.label === "string" &&
    typeof entry.value === "number" &&
    typeof entry.unit === "string" &&
    typeof entry.source_note === "string"
  )
}

function runOne(pagePath, payloadPath, options = {}) {
  const { createPayloadIfMissing = false } = options
  const pageAbs = path.resolve(process.cwd(), pagePath)
  const payloadAbs = path.resolve(process.cwd(), payloadPath)

  if (!fs.existsSync(pageAbs)) {
    if (createPayloadIfMissing) return { skipped: true, reason: "page not found" }
    console.error(`Page not found: ${pageAbs}`)
    process.exit(1)
  }
  if (!fs.existsSync(payloadAbs)) {
    if (!createPayloadIfMissing) {
      console.error(`Payload not found: ${payloadAbs}`)
      process.exit(1)
    }
    const raw = fs.readFileSync(pageAbs, "utf8")
    const parsed = matter(raw)
    const payload = buildPayloadFromFrontMatter(parsed.data)
    fs.writeFileSync(payloadAbs, JSON.stringify(payload, null, 2) + "\n", "utf8")
  }

  const candidatePhrases = getCandidateCompounds(pagePath)

  let payload
  try {
    payload = JSON.parse(fs.readFileSync(payloadAbs, "utf8"))
  } catch (e) {
    console.error(`Invalid JSON payload: ${payloadAbs}`, e.message)
    process.exit(1)
  }

  const nutritionPer100g = payload.nutrition_per_100g || {}
  const existingSupplementary = Array.isArray(payload.nutrition_supplementary_sources)
    ? payload.nutrition_supplementary_sources.filter(isStrictSupplementary)
    : []

  const tableLabelSet = buildTableLabelSet(nutritionPer100g, existingSupplementary)

  const literaturePath = path.join(__dirname, "data", "literature-compounds.json")
  let literature = {}
  if (fs.existsSync(literaturePath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(literaturePath, "utf8"))
      for (const [k, v] of Object.entries(raw)) {
        if (k !== "comment" && v && typeof v === "object" && v.key && v.label && typeof v.value === "number" && v.unit && v.source_note) {
          literature[k] = v
        }
      }
    } catch (_) {}
  }
  const literatureKeys = new Set(Object.keys(literature))

  const existingByKey = new Map(existingSupplementary.map((s) => [s.key, s]))
  const toAdd = []

  for (const phrase of candidatePhrases) {
    const normalizedPhrase = phrase.trim().toLowerCase().replace(/\s+/g, " ")
    if (tableLabelSet.has(normalizedPhrase)) continue
    const compoundId = phraseToCompoundId(phrase, literatureKeys)
    if (!compoundId || !literature[compoundId]) continue
    const entry = literature[compoundId]
    if (existingByKey.has(entry.key)) continue
    toAdd.push({
      key: entry.key,
      label: entry.label,
      value: entry.value,
      unit: entry.unit,
      source_note: entry.source_note,
    })
    existingByKey.set(entry.key, entry)
  }

  const mergedSupplementary = [...existingSupplementary]
  for (const e of toAdd) {
    mergedSupplementary.push(e)
    console.log(`Enriched: ${e.label} (${e.value} ${e.unit})`)
  }

  payload.nutrition_supplementary_sources = mergedSupplementary.length > 0 ? mergedSupplementary : undefined
  if (payload.nutrition_supplementary_sources === undefined) {
    delete payload.nutrition_supplementary_sources
  }

  fs.writeFileSync(payloadAbs, JSON.stringify(payload, null, 2) + "\n", "utf8")
  if (!options?.quiet) console.log(`Updated payload: ${payloadPath}`)
  return { skipped: false }
}

function runAll(pagesDir, payloadDir) {
  const pagesAbs = path.resolve(process.cwd(), pagesDir)
  fs.mkdirSync(path.resolve(process.cwd(), payloadDir), { recursive: true })
  if (!fs.existsSync(pagesAbs)) {
    console.error("--pages-dir not found.")
    process.exit(1)
  }
  const slugs = getFoodSlugs(pagesDir)
  const stats = { foodsProcessed: 0, payloadsCreated: 0, payloadsEnriched: 0, skipped: [] }
  for (const slug of slugs) {
    const pagePath = path.join(pagesDir, `${slug}.md`)
    const payloadPath = path.join(payloadDir, `${slug}.json`)
    const payloadExisted = fs.existsSync(path.resolve(process.cwd(), payloadPath))
    const result = runOne(pagePath, payloadPath, { createPayloadIfMissing: true, quiet: true })
    if (result.skipped) {
      stats.skipped.push(slug)
      continue
    }
    stats.foodsProcessed++
    if (!payloadExisted) stats.payloadsCreated++
    stats.payloadsEnriched++
  }
  console.log("\n--- Nutrition pipeline summary (Script B) ---")
  console.log("Foods detected:", slugs.length)
  console.log("Foods processed:", stats.foodsProcessed)
  console.log("Payloads created (from front matter):", stats.payloadsCreated)
  console.log("Payloads enriched:", stats.payloadsEnriched)
  console.log("Skipped:", stats.skipped.length)
  if (stats.skipped.length) stats.skipped.forEach((s) => console.log("  ", s))
}

async function main() {
  const args = parseArgs()
  if (args.all) {
    if (!args.pagesDir || !args.payloadDir) {
      console.error("With --all, provide --pages-dir and --payload-dir.")
      process.exit(1)
    }
    runAll(args.pagesDir, args.payloadDir)
    return
  }
  if (!args.page || !args.payload) {
    console.error("Usage: node enrich-nutrition-from-overview.mjs --page <path> --payload <path>")
    console.error("   or: node enrich-nutrition-from-overview.mjs --all --pages-dir <dir> --payload-dir <dir>")
    process.exit(1)
  }
  runOne(args.page, args.payload)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
