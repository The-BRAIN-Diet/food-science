#!/usr/bin/env node
/**
 * Dry-run: report rendered-doc citations whose annotation still matches a
 * neighbouring BibTeX abstract. Does not write documentation.
 *
 *   node scripts/audit-bib-neighbour-borrow.mjs
 */
import path from "node:path"
import { scanNeighbourBorrowedAnnotations } from "./lib/bib-neighbour-borrow.mjs"

const ROOT = process.cwd()
const { hits, borrowedKeys, integrityFailures, report } = scanNeighbourBorrowedAnnotations({
  root: ROOT,
  writeReport: true,
})

const bySection = new Map()
for (const hit of hits) {
  if (!bySection.has(hit.section)) bySection.set(hit.section, [])
  bySection.get(hit.section).push(hit)
}

console.log(`Bib keys whose 12000-char window still borrows a neighbour abstract: ${borrowedKeys.length}`)
console.log(`Rendered citations whose annotation matches a neighbouring abstract: ${hits.length}`)
console.log(`Exact-key lookup failures / multi-entry chunks: ${integrityFailures.length}`)
console.log(`Report: ${path.relative(ROOT, report.outPath)}`)
console.log("")

for (const [section, rows] of [...bySection.entries()].sort()) {
  console.log(`## ${section} (${rows.length})`)
  for (const hit of rows) {
    console.log(`\n${hit.file}:${hit.line}`)
    console.log(`  key: ${hit.key}`)
    console.log(`  borrowed from: ${hit.neighbour}`)
    console.log(`  exact key join: ${hit.joinedByExactKey}`)
    console.log(`  single BibTeX entry: ${hit.singleBibEntry}`)
    console.log(`  previous incorrect: ${hit.previousIncorrect}`)
    console.log(`  newly resolved: ${hit.newlyResolved}`)
  }
  console.log("")
}

if (!hits.length) {
  console.log("No rendered citation annotations still match a neighbouring BibTeX abstract.")
  if (borrowedKeys.length) {
    console.log("Window-borrow keys remain in the .bib (no own abstract; later abstract in 12k window):")
    for (const b of borrowedKeys.slice(0, 30)) {
      console.log(`  ${b.key} ← ${b.neighbour}`)
    }
    if (borrowedKeys.length > 30) console.log(`  … +${borrowedKeys.length - 30} more`)
  }
}
