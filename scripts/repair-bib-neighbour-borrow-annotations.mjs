#!/usr/bin/env node
/**
 * Mechanical repair: rewrite citation annotations that currently reproduce a
 * neighbouring BibTeX abstract. Each line is resolved from its exact citation
 * key and bounded BibTeX entry (own abstract, else title-derived placeholder).
 *
 * Does not edit Overview / Highlights / Food Context prose.
 *
 *   node scripts/repair-bib-neighbour-borrow-annotations.mjs
 */
import fs from "node:fs"
import path from "node:path"
import {
  formatSalmonRoeRefLine,
  parseReferenceLine,
  fallbackReferenceExplanation,
} from "./lib/bib-citation-format.mjs"
import { scanNeighbourBorrowedAnnotations } from "./lib/bib-neighbour-borrow.mjs"

const ROOT = process.cwd()

function repairLine(line, newIndex) {
  const entry = parseReferenceLine(line)
  if (!entry?.key || entry.n == null) return null
  const explanation = fallbackReferenceExplanation(newIndex.get(entry.key), null)
  return formatSalmonRoeRefLine(entry.n, entry.key, entry.titleOverride, explanation, newIndex)
}

const { hits, newIndex } = scanNeighbourBorrowedAnnotations({ root: ROOT, writeReport: false })

if (!hits.length) {
  console.log("No neighbouring-entry annotation borrows to repair.")
  process.exit(0)
}

const byFile = new Map()
for (const hit of hits) {
  if (!byFile.has(hit.file)) byFile.set(hit.file, [])
  byFile.get(hit.file).push(hit)
}

const changed = []
for (const [rel, fileHits] of byFile) {
  const abs = path.join(ROOT, rel)
  const original = fs.readFileSync(abs, "utf8")
  const lines = original.split("\n")
  let fileChanged = false

  for (const hit of fileHits) {
    const idx = hit.line - 1
    const current = lines[idx]
    if (!current || !current.includes(`#${hit.key}`)) {
      console.error(`Skip ${rel}:${hit.line} — line no longer cites ${hit.key}`)
      continue
    }
    const next = repairLine(current, newIndex)
    if (!next || next === current) continue
    lines[idx] = next
    fileChanged = true
    console.log(`${rel}:${hit.line}`)
    console.log(`  key: ${hit.key}`)
    console.log(`  was: ${hit.previousIncorrect}`)
    console.log(`  now: ${fallbackReferenceExplanation(newIndex.get(hit.key), null)}`)
  }

  if (fileChanged) {
    fs.writeFileSync(abs, lines.join("\n"))
    changed.push(rel)
  }
}

console.log("")
console.log(`Changed ${changed.length} source file(s):`)
for (const rel of changed) console.log(`  ${rel}`)
console.log("Repair target: source markdown annotations in docs/foods (these are the rendered References lines).")
console.log("No separate generated food-annotation artifact was rewritten.")
