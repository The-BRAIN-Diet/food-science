#!/usr/bin/env node
/**
 * Read-only USDA SR Legacy description search.
 *
 * Usage: node scripts/usda-food-search.mjs "coconut milk" "vegetable broth"
 *
 * Used to pick a named composition record for a recipe ingredient that has no
 * food page, so the choice is explicit rather than a related-food substitution.
 */
import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"
import {fileURLToPath} from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const FOOD_CSV = path.join(
  ROOT,
  "scripts/data/usda-sr-legacy/FoodData_Central_sr_legacy_food_csv_2018-04/food.csv",
)

const terms = process.argv.slice(2).map((t) => t.toLowerCase())
if (!terms.length) {
  console.error('usage: node scripts/usda-food-search.mjs "<term>" [...]')
  process.exit(1)
}

const hits = new Map(terms.map((t) => [t, []]))
const rl = readline.createInterface({
  input: fs.createReadStream(FOOD_CSV),
  crlfDelay: Infinity,
})

for await (const line of rl) {
  const m = line.match(/^"?(\d+)"?,"?([^"]*)"?,"(.*)","?/)
  let fdcId
  let description
  if (m) {
    fdcId = m[1]
    description = m[3]
  } else {
    const cells = line.split(",")
    fdcId = cells[0]?.replace(/"/g, "")
    description = cells.slice(2, -2).join(",").replace(/"/g, "")
  }
  if (!fdcId || !description) continue
  const lower = description.toLowerCase()
  for (const term of terms) {
    if (lower.includes(term)) hits.get(term).push(`${fdcId}\t${description}`)
  }
}

for (const term of terms) {
  console.log(`\n=== ${term} (${hits.get(term).length}) ===`)
  console.log(hits.get(term).slice(0, 25).join("\n"))
}
