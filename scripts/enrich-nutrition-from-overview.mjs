#!/usr/bin/env node
/**
 * Script B — Overview-driven compound enrichment (curated lookup)
 *
 * Reads a food page and its payload (from Script A). Detects headline Overview
 * compounds missing from the table. Applies a supplementary row only when the
 * compound is already curated in scripts/data/literature-compounds.json for
 * that food slug. Does not invent values or treat arbitrary web results as
 * compositional evidence.
 *
 * Unresolved candidates are written to scripts/out/overview-enrichment-review.json.
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
import {
  NUTRIENT_LABELS as NUTRIENT_LABEL_META,
  SUBSTANCE_LABEL_ALIASES,
  extractOverviewSection,
  labelsOverlap,
  normaliseLabel,
  overviewHeadlineCompounds,
  tableBackedLabels,
} from "./lib/food-truth-levels.mjs"
import { loadSubstanceLookup, substancePageForLabel } from "./lib/food-truth-reconciliation.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SKIP_SLUGS = new Set(["index", "shopping-list", "algal-oil"])

const NUTRIENT_LABELS = Object.fromEntries(
  Object.entries(NUTRIENT_LABEL_META).map(([key, meta]) => [key, meta.label]),
)

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

function addLabelAndAliases(set, label) {
  const normalised = normaliseLabel(label)
  if (!normalised) return
  set.add(normalised)
  const aliases = SUBSTANCE_LABEL_ALIASES[normalised] || []
  for (const alias of aliases) set.add(normaliseLabel(alias))
}

/**
 * Build set of compound labels already represented in the table (core + supplementary).
 */
function buildTableLabelSet(nutritionPer100g, supplementarySources) {
  const set = new Set()
  if (nutritionPer100g && typeof nutritionPer100g === "object") {
    for (const key of Object.keys(nutritionPer100g)) {
      addLabelAndAliases(set, NUTRIENT_LABELS[key] || key)
    }
  }
  if (Array.isArray(supplementarySources)) {
    for (const s of supplementarySources) {
      if (s && typeof s.label === "string") addLabelAndAliases(set, s.label)
    }
  }
  return set
}

/**
 * Headline Overview compounds for enrichment.
function getCandidateCompounds(pagePath) {
  const pageAbs = path.resolve(process.cwd(), pagePath)
  const raw = fs.readFileSync(pageAbs, "utf8")
  const parsed = matter(raw)
  return {
    compounds: overviewHeadlineCompounds(parsed.data, parsed.content),
    overviewText: extractOverviewSection(parsed.content),
    slug: String(parsed.data.id || path.basename(pagePath, ".md")),
    fm: parsed.data,
  }
}

function loadLiteratureDataset() {
  const literaturePath = path.join(__dirname, "data", "literature-compounds.json")
  const literature = {}
  if (!fs.existsSync(literaturePath)) return literature
  try {
    const raw = JSON.parse(fs.readFileSync(literaturePath, "utf8"))
    for (const [k, v] of Object.entries(raw)) {
      if (k === "comment" || !v || typeof v !== "object") continue
      if (!v.key || !v.label || typeof v.source_note !== "string") continue
      literature[k] = v
    }
  } catch (_) {}
  return literature
}

function literatureEntryForPhrase(phrase, literature, slug) {
  const n = phrase.trim().toLowerCase().replace(/\s+/g, " ")
  const withoutSpaces = n.replace(/\s/g, "")
  for (const [id, entry] of Object.entries(literature)) {
    const idNorm = id.toLowerCase().replace(/\s+/g, " ")
    if (idNorm !== n && id.replace(/\s/g, "") !== withoutSpaces && !labelsOverlap(phrase, entry.label)) {
      continue
    }
    const slugs = Array.isArray(entry.slugs) ? entry.slugs : []
    if (!slugs.includes(slug)) continue
    const hasNumeric = typeof entry.value === "number" && entry.unit
    if (!hasNumeric && !entry.amount_display && !entry.status) continue
    return { id, entry }
  }
  return null
}

function isAmbiguousPhrase(phrase) {
  const words = phrase.trim().split(/\s+/)
  if (words.length >= 5) return true
  const lower = phrase.toLowerCase()
  return (
    lower.includes("support") ||
    lower.includes("function") ||
    lower.includes("network") ||
    lower.includes("pattern") ||
    lower.includes("option")
  )
}

function buildReviewItem({
  slug,
  compound,
  overviewText,
  tableMatch,
  substanceMatch,
  decision,
  verificationStatus,
  proposed,
}) {
  return {
    food_slug: slug,
    compound_candidate: compound,
    triggering_overview_text: overviewText.slice(0, 500),
    existing_table_match: tableMatch,
    existing_canonical_substance_match: substanceMatch,
    verification_status: verificationStatus,
    proposed_source: proposed?.source_note ?? null,
    proposed_value: proposed?.value ?? null,
    proposed_unit: proposed?.unit ?? null,
    food_basis: proposed?.basis ?? "per 100 g edible portion",
    decision,
  }
}

/**
 * Strict supplementary entry: key, label, source_note, plus either numeric value+unit or amount_display.
 */
function isStrictSupplementary(entry) {
  if (
    !entry ||
    typeof entry.key !== "string" ||
    typeof entry.label !== "string" ||
    typeof entry.source_note !== "string"
  ) {
    return false
  }
  const hasNumeric =
    typeof entry.value === "number" && typeof entry.unit === "string" && !Number.isNaN(entry.value)
  const hasDisplay =
    typeof entry.amount_display === "string" && entry.amount_display.trim().length > 0
  const hasStatus = typeof entry.status === "string" && entry.status.trim().length > 0
  return hasNumeric || hasDisplay || hasStatus
}

function runOne(pagePath, payloadPath, options = {}) {
  const { createPayloadIfMissing = false } = options
  const pageAbs = path.resolve(process.cwd(), pagePath)
  const payloadAbs = path.resolve(process.cwd(), payloadPath)

  if (!fs.existsSync(pageAbs)) {
    if (createPayloadIfMissing) return { skipped: true, reason: "page not found", reviewItems: [] }
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

  const candidateInfo = getCandidateCompounds(pagePath)
  const candidatePhrases = candidateInfo.compounds
  const slug = candidateInfo.slug
  const overviewText = candidateInfo.overviewText

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
  const tableLabels = tableBackedLabels({
    ...candidateInfo.fm,
    nutrition_per_100g: nutritionPer100g,
    nutrition_supplementary_sources: existingSupplementary,
  })
  const literature = loadLiteratureDataset()
  const substanceLookup = loadSubstanceLookup()
  const existingByKey = new Map(existingSupplementary.map((s) => [s.key, s]))
  const toAdd = []
  const reviewItems = []

  for (const phrase of candidatePhrases) {
    const normalizedPhrase = phrase.trim().toLowerCase().replace(/\s+/g, " ")
    const tableMatch =
      tableLabels.find((label) => labelsOverlap(phrase, label)) ||
      (tableLabelSet.has(normalizedPhrase) ? phrase : null)
    const substanceHit = substancePageForLabel(phrase, substanceLookup)
    const substanceMatch = substanceHit ? substanceHit.file : null

    if (tableMatch) {
      continue
    }

    const curated = literatureEntryForPhrase(phrase, literature, slug)
    if (curated && !existingByKey.has(curated.entry.key)) {
      const entry = curated.entry
      toAdd.push({
        key: entry.key,
        label: entry.label,
        value: entry.value,
        unit: entry.unit,
        amount_display: entry.amount_display,
        status: entry.status,
        source_note: entry.source_note,
      })
      existingByKey.set(entry.key, entry)
      reviewItems.push(
        buildReviewItem({
          slug,
          compound: phrase,
          overviewText,
          tableMatch: null,
          substanceMatch,
          decision: "verified",
          verificationStatus: "curated in literature-compounds.json for this food",
          proposed: entry,
        }),
      )
      continue
    }

    const decision = isAmbiguousPhrase(phrase) ? "ambiguous" : "requires-review"
    reviewItems.push(
      buildReviewItem({
        slug,
        compound: phrase,
        overviewText,
        tableMatch: null,
        substanceMatch,
        decision,
        verificationStatus: "not in curated provenance dataset; not applied",
        proposed: null,
      }),
    )
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
  return { skipped: false, reviewItems, applied: toAdd.length }
}

function writeReviewQueue(items, payloadDir) {
  const outDir = path.resolve(process.cwd(), payloadDir || "scripts/out")
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, "overview-enrichment-review.json")
  const payload = {
    generated_at: new Date().toISOString(),
    note: "Script B review queue. Verified rows were already in literature-compounds.json for that food. Do not treat this file as compositional evidence. Curate verified entries into the provenance dataset before applying them.",
    literature_dataset: "scripts/data/literature-compounds.json",
    literature_dataset_entries: Object.keys(loadLiteratureDataset()),
    items,
  }
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n", "utf8")
  console.log(`Review queue: ${path.relative(process.cwd(), outPath)} (${items.length} item(s))`)
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
  const reviewItems = []
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
    if (Array.isArray(result.reviewItems)) reviewItems.push(...result.reviewItems)
  }
  writeReviewQueue(reviewItems, payloadDir)
  console.log("\n--- Nutrition pipeline summary (Script B) ---")
  console.log("Foods detected:", slugs.length)
  console.log("Foods processed:", stats.foodsProcessed)
  console.log("Payloads created (from front matter):", stats.payloadsCreated)
  console.log("Payloads enriched:", stats.payloadsEnriched)
  console.log("Review-queue items:", reviewItems.length)
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
  const result = runOne(args.page, args.payload)
  writeReviewQueue(result.reviewItems || [], path.dirname(args.payload))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
