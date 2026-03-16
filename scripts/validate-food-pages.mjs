#!/usr/bin/env node
/**
 * Validates food pages against system/food-page-model.md rules.
 * Exit code 1 if any violations; 0 otherwise.
 */
import { runValidation, FOODS_DIR_DEFAULT } from "./lib/food-page-validation.mjs"

function main() {
  const args = process.argv.slice(2)
  const foodsDir = args.includes("--foods-dir") && args[args.indexOf("--foods-dir") + 1]
    ? args[args.indexOf("--foods-dir") + 1]
    : FOODS_DIR_DEFAULT
  const { missingEaa, downstreamInTags } = runValidation(foodsDir)

  let exitCode = 0
  console.log("\n--- Food page validation (system/food-page-model.md) ---\n")

  if (missingEaa.length) {
    exitCode = 1
    console.log("FAIL: Missing required Essential Amino Acid Profile section:")
    missingEaa.forEach(({ slug, protein_g }) => console.log(`  - ${slug}.md (protein_g: ${protein_g ?? "n/a"})`))
    console.log("")
  } else {
    console.log("OK: All pages meeting protein threshold have EAA section.\n")
  }

  if (downstreamInTags.length) {
    exitCode = 1
    console.log("FAIL: Downstream metabolites must not be tagged as food substances:")
    downstreamInTags.forEach(({ slug, tags }) => console.log(`  - ${slug}.md: ${tags.join(", ")}`))
    console.log("")
  } else {
    console.log("OK: No downstream metabolite tags found.\n")
  }

  if (exitCode === 0) {
    console.log("Validation passed.\n")
  } else {
    console.log("Fix the issues above and re-run npm run nutrition:validate\n")
  }
  process.exit(exitCode)
}

main()
