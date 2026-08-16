#!/usr/bin/env node
/**
 * Read-only A–C food-layer audit.
 *
 * Scope is the displayed food name (sidebar_label || title), not the filename.
 * Confidence is report metadata only — never written to food pages.
 *
 * Usage:
 *   node scripts/audit-food-page-layers.mjs --letters ABC
 *   node scripts/audit-food-page-layers.mjs --letters ABC --out scripts/out/food-layer-audit-a-c.json
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { DOWNSTREAM_METABOLITE_TAGS, FOODS_DIR_DEFAULT, getFoodSlugs } from "./lib/food-page-validation.mjs"
import {
  CATEGORY_TAGS,
  TRACE_CONTRIBUTION,
  allTableRows,
  editorialSubstanceTags,
  extractOverviewSection,
  isFoodIdentityTag,
  isLikelyOverviewCompoundName,
  isTraceContribution,
  labelsOverlap,
  overviewHeadlineCompounds,
  tableBackedLabels,
} from "./lib/food-truth-levels.mjs"
import { loadSubstanceLookup, substancePageForLabel } from "./lib/food-truth-reconciliation.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const DISCREPANCY_CLASSES = [
  "Overview → table gap",
  "Table → card candidate",
  "Card → table violation",
  "Unsupported Overview claim",
  "Trace-only presence",
  "Scope error",
  "Admitted card with missing substance page",
]

const MECHANISM_TOKENS = [
  ...DOWNSTREAM_METABOLITE_TAGS,
  "Serotonin",
  "GABA",
  "Butyrate",
  "Propionate",
  "Acetate",
  "Nitric Oxide",
  "Nitric oxide",
]

function parseArgs(argv) {
  const lettersIdx = argv.indexOf("--letters")
  const outIdx = argv.indexOf("--out")
  const lettersRaw = lettersIdx !== -1 && argv[lettersIdx + 1] ? argv[lettersIdx + 1] : "ABC"
  const letters = new Set(
    String(lettersRaw)
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .split(""),
  )
  return {
    letters,
    out:
      outIdx !== -1 && argv[outIdx + 1]
        ? argv[outIdx + 1]
        : path.join(__dirname, "out/food-layer-audit-a-c.json"),
  }
}

export function displayedFoodName(fm) {
  return String(fm.sidebar_label || fm.title || "").trim()
}

export function displayedNameInitial(name) {
  const stripped = String(name || "")
    .replace(/^the\s+/i, "")
    .trim()
  const match = stripped.match(/[A-Za-z]/)
  return match ? match[0].toUpperCase() : ""
}

function inLetterScope(name, letters) {
  const initial = displayedNameInitial(name)
  return letters.has(initial)
}

const NOT_CONSTITUENT_PHRASES = new Set([
  "whole fruit",
  "exercise",
  "food synergy",
  "polyphenol-class food",
  "complete protein",
  "lean marine protein",
  "lean seafood rotation",
  "nutrient-dense shellfish",
  "unsweetened",
  "green",
  "microalgae",
  "water",
  "lysine-rich",
  "anthocyanin-rich",
  "saturated-fat-rich",
  "monounsaturated-fat-rich",
  "monounsaturated-fat",
])

const STRATEGY_PAIRING_NOT_IN_FOOD = {
  curcumin: ["black-pepper"],
}

const MECHANISM_OUTCOME_TAXA = new Set(["bifidobacterium", "lactobacillus"])

function normalised(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
}

function isEditorialProseNotCompound(label) {
  const n = normalised(label)
  if (NOT_CONSTITUENT_PHRASES.has(n)) return true
  if (n.endsWith("-rich") || n.endsWith("-class food")) return true
  if (/\b(rotation|synergy|framework|ingredient)\b/.test(n)) return true
  return false
}

function isExcludedCardLabel(label) {
  if (CATEGORY_TAGS.has(label)) return true
  const n = normalised(label)
  return ["fibre", "fiber", "protein", "energy", "carbohydrates", "sugars", "total fat", "saturated fat"].includes(n)
}

function tableMatch(label, tableLabels) {
  for (const rowLabel of tableLabels) {
    if (labelsOverlap(label, rowLabel)) return rowLabel
  }
  const paren = String(label).match(/\(([^)]+)\)/)
  if (paren) {
    for (const rowLabel of tableLabels) {
      if (labelsOverlap(paren[1], rowLabel)) return rowLabel
    }
  }
  const lead = String(label).trim().split(/[\s-]+/)[0]
  if (lead && lead.length <= 5) {
    for (const rowLabel of tableLabels) {
      if (labelsOverlap(lead, rowLabel)) return rowLabel
    }
  }
  return null
}

function overviewLinkedCompounds(overviewText) {
  const out = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  while ((match = re.exec(overviewText)) !== null) {
    const text = match[1].trim()
    const href = match[2]
    if (!/\/docs\/substances\//i.test(href)) continue
    if (!isLikelyOverviewCompoundName(text)) continue
    out.push(text.split("(")[0].trim())
  }
  return out
}

function uniqueLabels(labels) {
  const seen = new Set()
  const out = []
  for (const label of labels) {
    const key = String(label || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim()
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(label)
  }
  return out
}

function isMechanismName(label) {
  return MECHANISM_TOKENS.some((token) => labelsOverlap(label, token))
}

function overviewSnippet(overviewText, label) {
  const text = String(overviewText || "").replace(/\s+/g, " ")
  const idx = text.toLowerCase().indexOf(String(label).toLowerCase())
  if (idx === -1) return text.slice(0, 220)
  const start = Math.max(0, idx - 60)
  const end = Math.min(text.length, idx + String(label).length + 80)
  return text.slice(start, end).trim()
}

function finding({
  slug,
  displayed_name,
  cls,
  entity,
  evidence,
  proposed_resolution,
  confidence,
}) {
  return {
    food: displayed_name,
    slug,
    class: cls,
    entity,
    evidence,
    proposed_resolution,
    confidence,
    confidence_scope: "audit_finding_only",
  }
}

export function auditFoodPage(fm, content, { substanceLookup = [] } = {}) {
  const slug = String(fm.id || "")
  const displayed_name = displayedFoodName(fm)
  const overviewText = extractOverviewSection(content)
  const tableLabels = tableBackedLabels(fm)
  const allRows = allTableRows(fm)
  const editorial = editorialSubstanceTags(fm)
  const headlines = uniqueLabels([
    ...overviewHeadlineCompounds(fm, content),
    ...overviewLinkedCompounds(overviewText),
  ])
  const findings = []

  const tags = Array.isArray(fm.tags) ? fm.tags.map((t) => (typeof t === "string" ? t : t?.label)).filter(Boolean) : []
  for (const tag of tags) {
    if (!isMechanismName(tag)) continue
    findings.push(
      finding({
        slug,
        displayed_name,
        cls: "Scope error",
        entity: tag,
        evidence: `Tagged as a food substance, but ${tag} is mechanism truth (downstream / endogenous), not an intrinsic constituent.`,
        proposed_resolution:
          "Remove the tag. Keep the biology in Overview prose as an outcome if needed. Do not create a contains-relationship or substance card.",
        confidence: "high",
      }),
    )
  }

  for (const compound of headlines) {
    if (isEditorialProseNotCompound(compound)) continue
    if (isExcludedCardLabel(compound)) continue
    if (isMechanismName(compound) || MECHANISM_OUTCOME_TAXA.has(normalised(compound))) {
      findings.push(
        finding({
          slug,
          displayed_name,
          cls: "Scope error",
          entity: compound,
          evidence: `Overview names ${compound} among headline compounds. ${overviewSnippet(overviewText, compound)}`,
          proposed_resolution:
            "Treat as mechanism/strategy truth in prose if accurate. Do not add a table row, card, or canonical page for a non-constituent.",
          confidence: "high",
        }),
      )
      continue
    }
    const pairingFoods = STRATEGY_PAIRING_NOT_IN_FOOD[normalised(compound)]
    if (pairingFoods?.includes(slug)) {
      findings.push(
        finding({
          slug,
          displayed_name,
          cls: "Scope error",
          entity: compound,
          evidence: `Overview mentions ${compound} in a pairing/synergy context; it is not a constituent of ${displayed_name}. ${overviewSnippet(overviewText, compound)}`,
          proposed_resolution:
            "Keep pairing advice in Food Context / synergies. Do not add a contains-relationship, table row, or card on this food.",
          confidence: "high",
        }),
      )
      continue
    }
    if (CATEGORY_TAGS.has(compound) || isFoodIdentityTag(compound, fm)) continue
    const publicMatch = tableMatch(compound, tableLabels)
    const anyMatch = publicMatch || tableMatch(compound, allRows.map((r) => r.label))
    if (!anyMatch) {
      const substanceHit = substancePageForLabel(compound, substanceLookup)
      findings.push(
        finding({
          slug,
          displayed_name,
          cls: "Overview → table gap",
          entity: compound,
          evidence: `Named in Overview${substanceHit ? ` (canonical page ${substanceHit.file})` : ""} with no supported table row. ${overviewSnippet(overviewText, compound)}`,
          proposed_resolution:
            "Verify in USDA or food-specific literature for this food only. If supported, add a quantitative or qualitative table row with provenance, then consider a card. Do not copy a related food. Do not create a card or page from the mention alone.",
          confidence: substanceHit ? "medium" : "low",
        }),
      )
    }
  }

  for (const tag of editorial) {
    if (isMechanismName(tag)) continue
    const match = tableMatch(tag, tableLabels) || tableMatch(tag, allRows.map((r) => r.label))
    if (isTraceContribution(fm, tag)) {
      findings.push(
        finding({
          slug,
          displayed_name,
          cls: "Trace-only presence",
          entity: tag,
          evidence: `contribution_levels is "${TRACE_CONTRIBUTION}". Tagged as a Substances-layer entity.`,
          proposed_resolution:
            "Keep the internal trace record. Do not admit a public Substances card. Do not create a table row solely to justify the tag.",
          confidence: "high",
        }),
      )
      continue
    }
    if (!match) {
      findings.push(
        finding({
          slug,
          displayed_name,
          cls: "Card → table violation",
          entity: tag,
          evidence: "Editorial substance tag / Substances card has no supported quantitative or qualitative table row.",
          proposed_resolution:
            "Either add a supported table row for this food (USDA or curated food-specific source) or remove the card/tag. Do not invent a value or copy a related food.",
          confidence: "high",
        }),
      )
      continue
    }
    const page = substancePageForLabel(tag, substanceLookup)
    if (!page) {
      findings.push(
        finding({
          slug,
          displayed_name,
          cls: "Admitted card with missing substance page",
          entity: tag,
          evidence: `Has a table row (${match}) and is tagged for the Substances list, but no canonical substance page resolves.`,
          proposed_resolution:
            "Propose a canonical substance page after confirming the entity is not a synonym of an existing page. Do not silently create the file in this audit.",
          confidence: "medium",
        }),
      )
    }
  }

  for (const compound of headlines) {
    if (isEditorialProseNotCompound(compound) || isExcludedCardLabel(compound)) continue
    if (isMechanismName(compound) || MECHANISM_OUTCOME_TAXA.has(normalised(compound))) continue
    const pairingFoods = STRATEGY_PAIRING_NOT_IN_FOOD[normalised(compound)]
    if (pairingFoods?.includes(slug)) continue
    const match = tableMatch(compound, tableLabels)
    if (!match) continue
    const tagged = editorial.some((tag) => labelsOverlap(tag, compound))
    if (tagged) continue
    if (isTraceContribution(fm, compound)) {
      findings.push(
        finding({
          slug,
          displayed_name,
          cls: "Trace-only presence",
          entity: compound,
          evidence: `Overview names ${compound} and a table/internal value exists, but contribution is trace-only.`,
          proposed_resolution: "Do not admit a Substances card. Keep trace internally. Qualify Overview if it implies a meaningful source.",
          confidence: "medium",
        }),
      )
      continue
    }
    findings.push(
      finding({
        slug,
        displayed_name,
        cls: "Table → card candidate",
        entity: compound,
        evidence: `Overview names ${compound} and a supported table row exists (${match}), but it is not in the Substances tags.`,
        proposed_resolution:
          "Editorial judgement: admit a Substances card if this is a meaningful BRAIN identity compound. Do not auto-admit every table row.",
        confidence: "medium",
      }),
    )
  }

  const levels = fm.contribution_levels && typeof fm.contribution_levels === "object" ? fm.contribution_levels : {}
  for (const [name, level] of Object.entries(levels)) {
    if (level !== TRACE_CONTRIBUTION) continue
    if (findings.some((f) => f.entity === name && f.class === "Trace-only presence" && f.slug === slug)) continue
    if (editorial.some((tag) => labelsOverlap(tag, name))) continue
    findings.push(
      finding({
        slug,
        displayed_name,
        cls: "Trace-only presence",
        entity: name,
        evidence: `contribution_levels records "${TRACE_CONTRIBUTION}" without Substances-card admission.`,
        proposed_resolution: "No promotion. Retain internally. Do not add a card or treat as a meaningful source.",
        confidence: "high",
      }),
    )
  }

  return {
    slug,
    displayed_name,
    initial: displayedNameInitial(displayed_name),
    filename: `${slug}.md`,
    overview_compounds: headlines,
    table_row_count: tableLabels.length,
    substance_tags: editorial,
    finding_count: findings.length,
    findings,
  }
}

function totalsByClass(findings) {
  const totals = Object.fromEntries(DISCREPANCY_CLASSES.map((cls) => [cls, 0]))
  for (const item of findings) {
    if (totals[item.class] == null) totals[item.class] = 0
    totals[item.class] += 1
  }
  return totals
}

function totalsByConfidence(findings) {
  const totals = { high: 0, medium: 0, low: 0 }
  for (const item of findings) {
    if (totals[item.confidence] == null) totals[item.confidence] = 0
    totals[item.confidence] += 1
  }
  return totals
}

function main() {
  const { letters, out } = parseArgs(process.argv.slice(2))
  const foodsDir = FOODS_DIR_DEFAULT
  const substanceLookup = loadSubstanceLookup(process.cwd())
  const allSlugs = getFoodSlugs(foodsDir)
  const pages = []
  const excluded = []

  for (const slug of allSlugs) {
    const filePath = path.join(foodsDir, `${slug}.md`)
    if (!fs.existsSync(filePath)) continue
    const raw = fs.readFileSync(filePath, "utf8")
    const { data: fm, content } = matter(raw)
    const name = displayedFoodName(fm)
    const initial = displayedNameInitial(name)
    if (!inLetterScope(name, letters)) {
      excluded.push({ slug, displayed_name: name, initial, filename: `${slug}.md` })
      continue
    }
    pages.push(auditFoodPage(fm, content, { substanceLookup }))
  }

  pages.sort((a, b) => a.displayed_name.localeCompare(b.displayed_name))
  const findings = pages.flatMap((page) => page.findings)
  const report = {
    generated_at: new Date().toISOString(),
    read_only: true,
    writes_food_pages: false,
    writes_substance_pages: false,
    writes_ontology_tags: false,
    confidence_scope: "audit_finding_only — not added to food-page content or front matter",
    model: "Three Sources of Truth: Overview → Database nutrition table → Substances list",
    content_boundary_model: "Intrinsic / Mechanism / Strategy (scope, not admission)",
    letter_scope: [...letters].sort().join(""),
    scope_rule: "Displayed food name (sidebar_label || title), first alphabetic character after optional leading 'The'. Filename is not the scope key.",
    pages_examined: pages.length,
    pages_excluded_outside_letter_scope: excluded.length,
    pages: pages.map((page) => ({
      displayed_name: page.displayed_name,
      slug: page.slug,
      filename: page.filename,
      initial: page.initial,
      finding_count: page.finding_count,
      overview_compounds: page.overview_compounds,
      substance_tags: page.substance_tags,
    })),
    totals_by_class: totalsByClass(findings),
    totals_by_confidence: totalsByConfidence(findings),
    findings,
  }

  const outAbs = path.resolve(process.cwd(), out)
  fs.mkdirSync(path.dirname(outAbs), { recursive: true })
  fs.writeFileSync(outAbs, JSON.stringify(report, null, 2) + "\n", "utf8")

  console.log("--- Food-layer audit (read-only) ---")
  console.log("Letter scope (displayed name):", report.letter_scope)
  console.log("Pages examined:", report.pages_examined)
  console.log("Findings:", findings.length)
  console.log("By class:")
  for (const [cls, count] of Object.entries(report.totals_by_class)) {
    console.log(`  ${cls}: ${count}`)
  }
  console.log("By audit confidence (report metadata only):")
  for (const [level, count] of Object.entries(report.totals_by_confidence)) {
    console.log(`  ${level}: ${count}`)
  }
  console.log("Report:", path.relative(process.cwd(), outAbs))
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isDirectRun) main()
