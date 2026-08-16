#!/usr/bin/env node
/**
 * Post-apply food-page layer reconciliation (report only).
 *
 * Does not write food pages or create canonical substance pages.
 * Does not promote trace database rows into the Substances list.
 *
 * Usage:
 *   node scripts/reconcile-food-page-layers.mjs
 *   node scripts/reconcile-food-page-layers.mjs --slug almonds
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { FOODS_DIR_DEFAULT, getFoodSlugs } from "./lib/food-page-validation.mjs"
import {
  CORE_NUTRIENT_KEYS,
  EXCLUDED_SUBSTANCE_KEYS,
  NUTRIENT_LABELS,
  TRACE_CONTRIBUTION,
  allTableRows,
  editorialSubstanceTags,
  isTraceContribution,
  labelsOverlap,
  overviewHeadlineCompounds,
  tableBackedLabels,
} from "./lib/food-truth-levels.mjs"
import {
  loadSubstanceLookup,
  reconcileFoodPage,
  substancePageForLabel,
} from "./lib/food-truth-reconciliation.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DEFAULT_OUT = path.join(__dirname, "out/food-page-layer-reconciliation.json")

function parseArgs(argv) {
  const slugIdx = argv.indexOf("--slug")
  const outIdx = argv.indexOf("--out")
  return {
    slug: slugIdx !== -1 ? argv[slugIdx + 1] : null,
    out: outIdx !== -1 ? argv[outIdx + 1] : DEFAULT_OUT,
  }
}

function synonymNotes(label, lookup) {
  const hit = substancePageForLabel(label, lookup)
  if (!hit) return null
  if (labelsOverlap(label, hit.title) && label.trim() === hit.title.trim()) return null
  return {
    queried: label,
    canonical_title: hit.title,
    canonical_file: hit.file,
  }
}

function traceDatabaseRows(fm) {
  const rows = []
  const levels = fm.contribution_levels && typeof fm.contribution_levels === "object" ? fm.contribution_levels : {}
  for (const [name, level] of Object.entries(levels)) {
    if (level === TRACE_CONTRIBUTION) {
      rows.push({ label: name, reason: TRACE_CONTRIBUTION, promote: false })
    }
  }
  const nutrition = fm.nutrition_per_100g && typeof fm.nutrition_per_100g === "object" ? fm.nutrition_per_100g : {}
  const tags = editorialSubstanceTags(fm)
  for (const [key, value] of Object.entries(nutrition)) {
    if (CORE_NUTRIENT_KEYS.includes(key) || EXCLUDED_SUBSTANCE_KEYS.has(key)) continue
    if (typeof value !== "number" || value <= 0) continue
    const label = NUTRIENT_LABELS[key]?.label || key
    if (tags.some((tag) => labelsOverlap(tag, label))) continue
    if (isTraceContribution(fm, label)) {
      rows.push({ key, label, value, reason: "trace contribution; not auto-promoted", promote: false })
    }
  }
  return rows
}

function proposeMissingPages(labels, lookup) {
  return labels
    .filter((label) => !substancePageForLabel(label, lookup))
    .map((label) => ({
      label,
      action: "propose_canonical_substance_page",
      create: false,
      note: "Do not silently create this page. Admit it to the Substances layer first.",
    }))
}

function main() {
  const { slug, out } = parseArgs(process.argv.slice(2))
  const foodsDir = FOODS_DIR_DEFAULT
  const repoRoot = process.cwd()
  const substanceLookup = loadSubstanceLookup(repoRoot)
  const slugs = getFoodSlugs(foodsDir).filter((s) => !slug || s === slug)
  const pages = []

  for (const foodSlug of slugs) {
    const filePath = path.join(foodsDir, `${foodSlug}.md`)
    if (!fs.existsSync(filePath)) continue
    const raw = fs.readFileSync(filePath, "utf8")
    const { data: fm, content } = matter(raw)
    const result = reconcileFoodPage(fm, { substanceLookup, markdownBody: content })
    const tableLabels = tableBackedLabels(fm)
    const editorial = editorialSubstanceTags(fm)
    const headlines = overviewHeadlineCompounds(fm, content)
    const verifiedTableNeedingCards = headlines.filter(
      (compound) =>
        tableLabels.some((label) => labelsOverlap(compound, label)) &&
        !editorial.some((tag) => labelsOverlap(compound, tag)),
    )
    const synonym_resolution = []
    for (const label of [...new Set([...editorial, ...tableLabels])]) {
      const note = synonymNotes(label, substanceLookup)
      if (note) synonym_resolution.push(note)
    }
    const admittedLabels = editorial.filter((tag) => tableLabels.some((label) => labelsOverlap(tag, label)))
    pages.push({
      slug: foodSlug,
      cards_without_table_rows: result.substancesMissingFromTables,
      overview_compounds_without_table_rows: result.overviewCompoundsMissingFromTables,
      verified_table_compounds_requiring_cards: verifiedTableNeedingCards,
      synonym_resolution,
      proposed_missing_canonical_pages: proposeMissingPages(admittedLabels, substanceLookup),
      trace_database_rows_not_promoted: traceDatabaseRows(fm),
      all_table_row_count: allTableRows(fm).length,
      public_table_row_count: tableLabels.length,
    })
  }

  const report = {
    generated_at: new Date().toISOString(),
    model: "Three Sources of Truth: Overview → Database nutrition table → Substances list",
    writes_pages: false,
    creates_substance_pages: false,
    pages,
  }

  const outAbs = path.resolve(process.cwd(), out)
  fs.mkdirSync(path.dirname(outAbs), { recursive: true })
  fs.writeFileSync(outAbs, JSON.stringify(report, null, 2) + "\n", "utf8")

  const cards = pages.filter((p) => p.cards_without_table_rows.length)
  const overview = pages.filter((p) => p.overview_compounds_without_table_rows.length)
  const needingCards = pages.filter((p) => p.verified_table_compounds_requiring_cards.length)
  const proposed = pages.filter((p) => p.proposed_missing_canonical_pages.length)
  const trace = pages.filter((p) => p.trace_database_rows_not_promoted.length)

  console.log("--- Food page layer reconciliation (report only) ---")
  console.log("Pages scanned:", pages.length)
  console.log("Pages with cards missing table rows:", cards.length)
  console.log("Pages with Overview compounds missing table rows:", overview.length)
  console.log("Pages with verified table compounds that may need cards:", needingCards.length)
  console.log("Proposed (not created) missing substance pages:", proposed.reduce((n, p) => n + p.proposed_missing_canonical_pages.length, 0))
  console.log("Pages with unpromoted trace database rows:", trace.length)
  console.log("Report:", path.relative(process.cwd(), outAbs))
}

main()
