#!/usr/bin/env node
/**
 * Validates food pages against system/food-page-model.md (baseline)
 * and optionally system/food-page-schema.md (--canonical).
 */
import { runValidation, runCanonicalValidation, FOODS_DIR_DEFAULT } from "./lib/food-page-validation.mjs"

function parseArgs(argv) {
  const canonical = argv.includes("--canonical")
  const foodsDirIdx = argv.indexOf("--foods-dir")
  const foodsDir =
    foodsDirIdx !== -1 && argv[foodsDirIdx + 1] ? argv[foodsDirIdx + 1] : FOODS_DIR_DEFAULT
  const slugIdx = argv.indexOf("--slug")
  const slug = slugIdx !== -1 && argv[slugIdx + 1] ? argv[slugIdx + 1] : null
  return { canonical, foodsDir, slug }
}

function main() {
  const { canonical, foodsDir, slug } = parseArgs(process.argv.slice(2))
  const { missingEaa, downstreamInTags } = runValidation(foodsDir)

  let exitCode = 0
  console.log("\n--- Food page validation (system/food-page-model.md) ---\n")

  if (missingEaa.length) {
    exitCode = 1
    console.log("FAIL: Missing required Essential Amino Acid Profile section:")
    missingEaa.forEach(({ slug: s, protein_g }) => console.log(`  - ${s}.md (protein_g: ${protein_g ?? "n/a"})`))
    console.log("")
  } else {
    console.log("OK: All pages meeting protein threshold have EAA section.\n")
  }

  if (downstreamInTags.length) {
    exitCode = 1
    console.log("FAIL: Downstream metabolites must not be tagged as food substances:")
    downstreamInTags.forEach(({ slug: s, tags }) => console.log(`  - ${s}.md: ${tags.join(", ")}`))
    console.log("")
  } else {
    console.log("OK: No downstream metabolite tags found.\n")
  }

  if (canonical) {
    console.log("--- Canonical food page validation (system/food-page-schema.md) ---\n")
    const canonicalFailures = runCanonicalValidation(foodsDir, slug)
    if (canonicalFailures.length) {
      exitCode = 1
      console.log(`FAIL: ${canonicalFailures.length} page(s) not canonical${slug ? ` (${slug})` : ""}:`)
      for (const { slug: s, issues } of canonicalFailures) {
        console.log(`  ${s}.md:`)
        for (const issue of issues) {
          console.log(`    - ${issue}`)
        }
      }
      console.log("")
    } else {
      console.log(`OK: All checked pages match canonical structure${slug ? ` (${slug})` : ""}.\n`)
    }
  }

  if (exitCode === 0) {
    console.log("Validation passed.\n")
  } else {
    console.log("Fix the issues above and re-run npm run nutrition:validate\n")
  }
  process.exit(exitCode)
}

main()
