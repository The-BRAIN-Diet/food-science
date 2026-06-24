#!/usr/bin/env node
/**
 * Run canonical food-page validation for today's 3-letter batch (or --letters override).
 *
 * Usage:
 *   node scripts/food-page-letter-audit.mjs
 *   node scripts/food-page-letter-audit.mjs --schedule
 *   node scripts/food-page-letter-audit.mjs --letters A,B,C
 *   node scripts/food-page-letter-audit.mjs --date 2026-06-17
 */
import {
  SCHEDULE_EPOCH,
  buildRotationTable,
  dayIndexFromDate,
  formatScheduleSummary,
  lettersForDate,
  slugsForLetters,
  titleForSlug,
} from "./lib/food-page-letter-schedule.mjs"
import { runCanonicalValidation, runValidation } from "./lib/food-page-validation.mjs"

function parseArgs(argv) {
  const out = { schedule: false, letters: null, date: null, foodsDir: "docs/foods" }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--schedule") out.schedule = true
    else if (a === "--letters" && argv[i + 1]) out.letters = argv[++i].split(",").map((s) => s.trim().toUpperCase())
    else if (a === "--date" && argv[i + 1]) out.date = argv[++i]
    else if (a === "--foods-dir" && argv[i + 1]) out.foodsDir = argv[++i]
  }
  return out
}

function auditSlugs(foodsDir, slugs) {
  const canonicalFailures = []
  const baselineMissingEaa = []

  for (const slug of slugs) {
    const canon = runCanonicalValidation(foodsDir, slug)
    if (canon.length) canonicalFailures.push(...canon)

    const baseline = runValidation(foodsDir)
    const eaa = baseline.missingEaa.find((x) => x.slug === slug)
    if (eaa) baselineMissingEaa.push(eaa)
  }

  return { canonicalFailures, baselineMissingEaa }
}

function main() {
  const { schedule, letters, date, foodsDir } = parseArgs(process.argv.slice(2))

  if (schedule) {
    console.log(formatScheduleSummary(SCHEDULE_EPOCH))
    console.log("")
    for (const row of buildRotationTable()) {
      console.log(`Day ${row.day} (${row.letters}): ${row.slugs.join(", ") || "(none)"}`)
    }
    return
  }

  const when = date ? new Date(`${date}T12:00:00`) : new Date()
  const dayIndex = dayIndexFromDate(when, SCHEDULE_EPOCH)
  const batchLetters = letters || lettersForDate(when, SCHEDULE_EPOCH)
  const slugs = slugsForLetters(foodsDir, batchLetters)

  const dateLabel = when.toISOString().slice(0, 10)
  console.log(`\n--- Food page letter audit (${dateLabel}) ---\n`)
  console.log(`Epoch: ${SCHEDULE_EPOCH} | Cycle day ${dayIndex + 1}/9 | Letters: ${batchLetters.join(", ")}`)
  console.log(`Pages in batch: ${slugs.length}\n`)

  if (slugs.length === 0) {
    console.log("No food pages match these letters.")
    return
  }

  for (const slug of slugs) {
    console.log(`- ${titleForSlug(foodsDir, slug)} (${slug})`)
  }
  console.log("")

  const { canonicalFailures, baselineMissingEaa } = auditSlugs(foodsDir, slugs)

  if (baselineMissingEaa.length) {
    console.log("Baseline (EAA) issues:")
    for (const { slug, protein_g } of baselineMissingEaa) {
      console.log(`  - ${slug}.md (protein_g: ${protein_g})`)
    }
    console.log("")
  }

  if (canonicalFailures.length) {
    console.log(`FAIL: ${canonicalFailures.length} page(s) not canonical:`)
    for (const { slug, issues } of canonicalFailures) {
      console.log(`\n${slug}.md`)
      for (const issue of issues) {
        console.log(`  - ${issue}`)
      }
    }
    console.log("\nRe-run: npm run food:audit:today")
    console.log("       bash scripts/run-food-audit-today.sh")
    console.log("       node scripts/food-page-letter-audit.mjs")
    process.exit(1)
  }

  console.log(`OK: All ${slugs.length} pages in today's batch pass canonical validation.\n`)
}

main()
