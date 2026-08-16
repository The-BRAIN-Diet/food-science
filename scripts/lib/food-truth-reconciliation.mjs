/**
 * Build-time directional reconciliation of food page layers.
 *
 * Canonical Three Sources of Truth (system/food-page-model.md):
 * Overview → Database nutrition table → Substances list.
 *
 * - Every Substances card must resolve to a supported nutrition-table row.
 * - Not every nutrition-table row requires a Substances card.
 * - Mere database detection, especially trace, does not auto-admit ontology membership.
 * - Headline Overview compounds without a table row are flagged for verification.
 * - Values must never be copied from a related food.
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { getFoodSlugs, FOODS_DIR_DEFAULT } from "./food-page-validation.mjs"
import {
  CATEGORY_TAGS,
  EXCLUDED_SUBSTANCE_KEYS,
  QUALITATIVE_PRESENT,
  allTableRows,
  editorialSubstanceTags,
  isQualitativePresentRow,
  labelsOverlap,
  overviewHeadlineCompounds,
  publicTableRows,
  tableBackedLabels,
} from "./food-truth-levels.mjs"

export function loadSubstanceLookup(repoRoot = process.cwd()) {
  const substancesDir = path.join(repoRoot, "docs/substances")
  const lookup = []
  if (!fs.existsSync(substancesDir)) return lookup
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
        continue
      }
      if (!entry.name.endsWith(".md") && !entry.name.endsWith(".mdx")) continue
      if (entry.name === "index.md" || entry.name === "index.mdx") continue
      const raw = fs.readFileSync(full, "utf8")
      const { data } = matter(raw)
      lookup.push({
        title: String(data.title || "").trim(),
        sidebar: String(data.sidebar_label || "").trim(),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        file: path.relative(repoRoot, full),
      })
    }
  }
  walk(substancesDir)
  return lookup
}

export function substancePageForLabel(label, lookup) {
  return lookup.find((entry) => {
    if (labelsOverlap(label, entry.title) || labelsOverlap(label, entry.sidebar)) return true
    return entry.tags.some((tag) => !CATEGORY_TAGS.has(tag) && labelsOverlap(label, tag))
  })
}

function hasNamedSource(fm) {
  const source = fm.nutrition_source && typeof fm.nutrition_source === "object" ? fm.nutrition_source : {}
  const database = String(source.database || "").trim()
  const basis = String(source.basis || "").trim()
  return { database, basis, source }
}

function tableRowsMissingSupport(fm) {
  const { database, basis } = hasNamedSource(fm)
  const issues = []
  const publicRows = publicTableRows(fm)
  const hasStandardPublic = publicRows.some((row) => row.level === "standard")
  if (hasStandardPublic && !database) {
    issues.push("public table has compositional rows but nutrition_source.database is missing")
  }
  if (hasStandardPublic && !basis) {
    issues.push("public table has compositional rows but nutrition_source.basis is missing")
  }
  for (const row of publicRows) {
    if (row.quantitative) {
      if (typeof row.value !== "number" || !row.unit) {
        issues.push(`${row.label}: public quantitative row missing value or unit`)
      }
      if (row.level === "extended" && !row.source_note) {
        issues.push(`Supplementary ${row.label}: public numeric row without source_note`)
      }
    }
    if (row.qualitative) {
      if (!row.source_note) {
        issues.push(`${row.label}: public qualitative row missing source_note`)
      }
      if (!isQualitativePresentRow(row) && !row.status) {
        issues.push(
          `${row.label}: public qualitative row needs status or amount_display "${QUALITATIVE_PRESENT}"`,
        )
      }
    }
  }
  return issues
}

function tableRowsUnresolvedSubstance(fm, lookup) {
  return tableBackedLabels(fm).filter((label) => {
    const key = publicTableRows(fm).find((row) => row.label === label)?.key
    if (key && EXCLUDED_SUBSTANCE_KEYS.has(key)) return false
    if (key && key in (fm.nutrition_per_100g || {}) && fm.nutrition_source?.database) return false
    return !substancePageForLabel(label, lookup)
  })
}

function editorialMissingFromTables(fm) {
  const tableLabels = tableBackedLabels(fm)
  return editorialSubstanceTags(fm).filter(
    (tag) => !tableLabels.some((label) => labelsOverlap(tag, label)),
  )
}

function overviewMissingFromTables(fm, markdownBody = "") {
  const tableLabels = tableBackedLabels(fm)
  const allLabels = allTableRows(fm).map((row) => row.label)
  return overviewHeadlineCompounds(fm, markdownBody).filter((compound) => {
    const inPublic = tableLabels.some((label) => labelsOverlap(compound, label))
    const inAny = allLabels.some((label) => labelsOverlap(compound, label))
    return !inPublic && !inAny
  })
}

export function reconcileFoodPage(fm, { substanceLookup = [], markdownBody = "" } = {}) {
  const missingSupport = tableRowsMissingSupport(fm)
  return {
    substancesMissingFromTables: editorialMissingFromTables(fm),
    overviewCompoundsMissingFromTables: overviewMissingFromTables(fm, markdownBody),
    tableRowsMissingSupport: missingSupport,
    tableRowsUnresolvedSubstance: tableRowsUnresolvedSubstance(fm, substanceLookup),
    unsupportedQuantitative: missingSupport.filter((item) => !item.toLowerCase().includes("qualitative")),
    qualitativeMissingEvidence: missingSupport.filter((item) => item.toLowerCase().includes("qualitative")),
  }
}

export function runTruthLevelValidation(foodsDir = FOODS_DIR_DEFAULT, slugFilter = null) {
  const dirAbs = path.resolve(process.cwd(), foodsDir)
  const repoRoot = path.resolve(process.cwd())
  const substanceLookup = loadSubstanceLookup(repoRoot)
  const slugs = getFoodSlugs(foodsDir).filter((s) => !slugFilter || s === slugFilter)
  const report = {
    substancesMissingFromTables: [],
    overviewCompoundsMissingFromTables: [],
    tableRowsMissingSupport: [],
    tableRowsUnresolvedSubstance: [],
    unsupportedQuantitative: [],
    qualitativeMissingEvidence: [],
  }

  for (const slug of slugs) {
    const filePath = path.join(dirAbs, `${slug}.md`)
    if (!fs.existsSync(filePath)) continue
    const raw = fs.readFileSync(filePath, "utf8")
    const { data: fm, content } = matter(raw)
    const result = reconcileFoodPage(fm, { substanceLookup, markdownBody: content })
    if (result.substancesMissingFromTables.length) {
      report.substancesMissingFromTables.push({ slug, items: result.substancesMissingFromTables })
    }
    if (result.overviewCompoundsMissingFromTables.length) {
      report.overviewCompoundsMissingFromTables.push({
        slug,
        items: result.overviewCompoundsMissingFromTables,
      })
    }
    if (result.tableRowsMissingSupport.length) {
      report.tableRowsMissingSupport.push({ slug, items: result.tableRowsMissingSupport })
    }
    if (result.tableRowsUnresolvedSubstance.length) {
      report.tableRowsUnresolvedSubstance.push({
        slug,
        items: result.tableRowsUnresolvedSubstance,
      })
    }
    if (result.unsupportedQuantitative.length) {
      report.unsupportedQuantitative.push({ slug, items: result.unsupportedQuantitative })
    }
    if (result.qualitativeMissingEvidence.length) {
      report.qualitativeMissingEvidence.push({ slug, items: result.qualitativeMissingEvidence })
    }
  }

  return report
}

export function truthLevelHasFailures(report) {
  return (
    report.substancesMissingFromTables.length > 0 ||
    (report.tableRowsMissingSupport && report.tableRowsMissingSupport.length > 0) ||
    (report.unsupportedQuantitative && report.unsupportedQuantitative.length > 0) ||
    (report.qualitativeMissingEvidence && report.qualitativeMissingEvidence.length > 0)
  )
}

export function printTruthLevelReport(report) {
  console.log("--- Food page layer reconciliation (Overview → table → Substances) ---\n")

  const printGroup = (title, rows, emptyLabel, fail = true) => {
    if (!rows?.length) {
      console.log(`OK: ${emptyLabel}\n`)
      return
    }
    console.log(`${fail ? "FAIL" : "NOTE"}: ${title} (${rows.length} page(s)):`)
    for (const { slug, items } of rows) {
      console.log(`  ${slug}.md: ${items.join("; ")}`)
    }
    console.log("")
  }

  printGroup(
    "Substances cards missing a supported nutrition-table row",
    report.substancesMissingFromTables,
    "every Substances card resolves to a supported nutrition-table row",
  )
  printGroup(
    "headline Overview compounds missing a supported table row (flagged for verification)",
    report.overviewCompoundsMissingFromTables,
    "headline Overview compounds resolve to a table row or are flagged here",
    false,
  )
  printGroup(
    "public table rows missing value or source support",
    report.tableRowsMissingSupport,
    "public table rows have a supported value and source",
  )
  printGroup(
    "unsupported quantitative values",
    report.unsupportedQuantitative,
    "quantitative rows have value, unit, basis, and named source",
  )
  printGroup(
    "qualitative presence claims lacking food-specific evidence",
    report.qualitativeMissingEvidence,
    "qualitative rows have explicit status and source_note",
  )
  printGroup(
    "table compounds without a canonical substance page (not a hard fail; not every row requires a card)",
    report.tableRowsUnresolvedSubstance,
    "named table compounds either have a substance page or do not require one",
    false,
  )
}

