#!/usr/bin/env node
/**
 * Validate fish food pages against current editorial specs.
 *
 * Scope: seafood/fish foods as defined on the Foods Shopping List.
 *
 * Checks:
 * - Overview: 2 paragraphs, reasonable word count, presence of inline [n] citations
 * - Essential Amino Acid Profile: for fish, no "Notable amino acids" subsection,
 *   includes a statement about complete EAA profile
 * - References: numbered list of markdown links pointing to BRAIN-Diet-References,
 *   and every key exists in BRAIN-diet.bib.
 *
 * Note: Key-in-bib is necessary but not sufficient for links to work. The references
 * page deduplicates by DOI/URL/signature; if another entry has the same DOI or URL,
 * only one is shown and the fragment #citationKey is that entry's key. After adding
 * a new BibTeX entry, verify it appears on the references page and the food-page
 * link scrolls to it. See Foods-Pages.mdc "References and connection to BibTeX".
 *
 * Outputs:
 * - reports/fish-validation.json
 * - reports/fish-validation.md
 *
 * Usage:
 *   node scripts/foods-pipeline/validate-fish.mjs
 */

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const FOODS_DIR = path.join(ROOT, "docs", "foods")
const BIB_PATH = path.join(ROOT, "static", "bibtex", "BRAIN-diet.bib")
const REPORT_DIR = path.join(ROOT, "reports")

// Fish/seafood slugs taken from the Foods Shopping List "Seafood" section.
const FISH_SLUGS = [
  "clams",
  "cod",
  "trout-roe",
  "herring",
  "lumpfish-roe",
  "mackerel",
  "mussels",
  "oysters",
  "salmon",
  "salmon-roe",
  "sardines",
  "scallops",
  "seaweed",
  "shrimp",
  "tuna",
]

function readFileSafe(p) {
  try {
    return fs.readFileSync(p, "utf8")
  } catch {
    return null
  }
}

function extractSection(content, heading) {
  const re = new RegExp(`^${heading}\\n([\\s\\S]*?)(?=^## |^$)`, "m")
  const m = content.match(re)
  return m ? m[1].trim() : ""
}

function analyzeOverview(content) {
  const section = extractSection(content, "## Overview")
  if (!section) {
    return {
      present: false,
      paragraphs: 0,
      wordCount: 0,
      inlineCitations: 0,
      issues: ["Overview section missing"],
    }
  }
  const paras = section
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
  const textOnly = section.replace(/\n+/g, " ")
  const words = textOnly.split(/\s+/).filter(Boolean)
  const inlineCitations = (section.match(/\[\d+\]/g) || []).length
  const issues = []
  if (paras.length !== 2) {
    issues.push(`Expected 2 paragraphs, found ${paras.length}`)
  }
  if (words.length < 80 || words.length > 200) {
    issues.push(`Overview word count out of range (got ${words.length}, want ~90–160)`)
  }
  if (inlineCitations === 0) {
    issues.push("No inline numeric citations [n] found in Overview")
  }
  return {
    present: true,
    paragraphs: paras.length,
    wordCount: words.length,
    inlineCitations,
    issues,
  }
}

function analyzeEAA(content) {
  const section = extractSection(content, "### Essential Amino Acid Profile")
  if (!section) {
    return {
      present: false,
      issues: ["Essential Amino Acid Profile section missing"],
    }
  }
  const issues = []
  if (!/complete essential amino acid profile/i.test(section)) {
    issues.push('Missing phrase indicating "complete essential amino acid profile"')
  }
  if (/Notable amino acids:/i.test(section)) {
    issues.push('Animal food should not list "Notable amino acids" unless strongly justified')
  }
  return { present: true, issues }
}

function analyzeReferences(content, bibKeys) {
  const section = extractSection(content, "## References")
  if (!section) {
    return {
      present: false,
      items: 0,
      missingBibKeys: [],
      issues: ["References section missing"],
    }
  }
  const lines = section
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
  const itemLines = lines.filter((l) => /^\d+\.\s+\[.+\]\(.+\)$/.test(l))
  const issues = []
  if (itemLines.length === 0) {
    issues.push("No numbered markdown link items found in References")
  }
  const usedKeys = []
  for (const l of itemLines) {
    const m = l.match(/\((\/docs\/papers\/BRAIN-Diet-References#([^)]+))\)/)
    if (!m) {
      issues.push(`Reference item with unexpected link format: "${l}"`)
      continue
    }
    const key = m[2]
    usedKeys.push(key)
  }
  const missingBib = usedKeys.filter((k) => !bibKeys.has(k))
  if (missingBib.length) {
    issues.push(`Missing BibTeX entries for keys: ${missingBib.join(", ")}`)
  }
  return {
    present: true,
    items: itemLines.length,
    usedKeys,
    missingBibKeys: missingBib,
    issues,
  }
}

function loadBibKeys() {
  const bib = readFileSafe(BIB_PATH)
  if (!bib) return new Set()
  const keys = new Set()
  const re = /@[\w]+\{([^,]+),/g
  let m
  while ((m = re.exec(bib)) !== null) {
    keys.add(m[1])
  }
  return keys
}

function main() {
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true })
  }
  const bibKeys = loadBibKeys()

  const results = {}

  for (const slug of FISH_SLUGS) {
    const filePath = path.join(FOODS_DIR, `${slug}.md`)
    const content = readFileSafe(filePath)
    if (!content) {
      results[slug] = { error: `File not found: ${filePath}` }
      continue
    }
    const overview = analyzeOverview(content)
    const eaa = analyzeEAA(content)
    const refs = analyzeReferences(content, bibKeys)
    results[slug] = {
      filePath,
      overview,
      eaa,
      references: refs,
    }
  }

  const jsonPath = path.join(REPORT_DIR, "fish-validation.json")
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2))

  const mdLines = []
  mdLines.push("# Fish Category Validation Report")
  mdLines.push("")
  mdLines.push(`Generated: ${new Date().toISOString()}`)
  mdLines.push("")

  const allIssues = []
  for (const [slug, res] of Object.entries(results)) {
    if (res.error) {
      allIssues.push(`- \`${slug}\`: ${res.error}`)
      continue
    }
    const { overview, eaa, references } = res
    const issues = []
    if (overview.issues?.length) issues.push(...overview.issues)
    if (eaa.issues?.length) issues.push(...eaa.issues)
    if (references.issues?.length) issues.push(...references.issues)
    if (issues.length) {
      mdLines.push(`## ${slug}`)
      mdLines.push("")
      mdLines.push(`File: \`${res.filePath}\``)
      mdLines.push("")
      mdLines.push("**Issues:**")
      mdLines.push("")
      for (const i of issues) mdLines.push(`- ${i}`)
      mdLines.push("")
      allIssues.push(...issues.map((i) => `- \`${slug}\`: ${i}`))
    }
  }

  if (!allIssues.length) {
    mdLines.push("No issues found across fish foods for the current validators.")
  } else {
    mdLines.unshift("## Summary of Issues", "")
    mdLines.splice(
      2,
      0,
      ...Array.from(new Set(allIssues)) // deduplicate
    )
    mdLines.splice(2, 0, "") // blank line after summary list
  }

  const mdPath = path.join(REPORT_DIR, "fish-validation.md")
  fs.writeFileSync(mdPath, mdLines.join("\n"))

  console.log(`Wrote ${jsonPath}`)
  console.log(`Wrote ${mdPath}`)
}

main()

