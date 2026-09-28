#!/usr/bin/env node
import {
  runSubstanceValidation,
  substanceValidationHasFailures,
} from "./lib/substance-page-validation.mjs"

const result = runSubstanceValidation()

console.log("\n--- Canonical Substance-page validation ---\n")
for (const page of result.pages) {
  if (!page.issues.length) {
    console.log(`OK: ${page.label}`)
    continue
  }
  console.log(`FAIL: ${page.label}`)
  for (const issue of page.issues) console.log(`  - ${issue}`)
}

if (result.foodRelationships.length) {
  console.log("\nFAIL: Food ↔ Substance relationship validation")
  for (const issue of result.foodRelationships) console.log(`  - ${issue}`)
} else {
  console.log("\nOK: Food ↔ Substance inverse relationship safeguards")
}

const failed = substanceValidationHasFailures(result)
console.log(failed ? "\nSubstance validation failed.\n" : "\nSubstance validation passed.\n")
process.exit(failed ? 1 : 0)
