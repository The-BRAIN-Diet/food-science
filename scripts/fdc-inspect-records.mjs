#!/usr/bin/env node
/**
 * Print the identity and label data of specific FoodData Central records, so a
 * candidate can be judged on what it actually contains before it is adopted.
 *
 * The API key is read from the environment or the gitignored `.env.local` and
 * never passed as an argument, so it stays out of shell history and the process
 * list.
 *
 * Usage: node scripts/fdc-inspect-records.mjs 2543941 2417875
 */
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

function apiKey() {
  if (process.env.USDA_API_KEY) return process.env.USDA_API_KEY
  try {
    const env = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8")
    const match = env.match(/^USDA_API_KEY=(.+)$/m)
    if (match) return match[1].trim()
  } catch {
    /* fall through */
  }
  return "DEMO_KEY"
}

const KEY = apiKey()
const ids = process.argv.slice(2).filter((a) => /^\d+$/.test(a))
if (!ids.length) {
  console.error("give one or more FDC ids")
  process.exit(1)
}

const cacheDir = path.join(ROOT, "scripts/data/fdc-candidates")
fs.mkdirSync(cacheDir, {recursive: true})

for (const id of ids) {
  const res = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${KEY}`)
  if (!res.ok) {
    console.log(`=== ${id}  HTTP ${res.status}`)
    continue
  }
  const food = await res.json()
  fs.writeFileSync(path.join(cacheDir, `${id}.json`), JSON.stringify(food, null, 2) + "\n")

  const nutrients = (food.foodNutrients || []).filter((n) => typeof n.amount === "number")
  console.log(`=== ${food.fdcId}  ${food.description}  [${food.brandOwner || food.dataType}]`)
  console.log(`   data type:   ${food.dataType}`)
  console.log(`   ingredients: ${String(food.ingredients || "(none listed)").slice(0, 120)}`)
  console.log(
    `   serving:     ${food.servingSize ?? "—"} ${food.servingSizeUnit || ""}` +
      `   category: ${food.brandedFoodCategory || "—"}`,
  )
  console.log(`   nutrients:   ${nutrients.length}`)
  for (const n of nutrients) {
    console.log(`     ${n.nutrient.name} = ${n.amount} ${n.nutrient.unitName}`)
  }
}
