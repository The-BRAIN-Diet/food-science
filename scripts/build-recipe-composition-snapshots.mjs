#!/usr/bin/env node
/**
 * Build `src/data/recipeCompositionSnapshots.mjs` from local USDA SR Legacy CSVs.
 *
 * These snapshots cover recipe ingredients that have no food page (coconut milk,
 * honey, stock, wine) or whose preparation state differs materially from the
 * food page (cooked pasta vs dry, canned drained corn vs raw). Each entry keeps
 * its FDC id and description so the choice is auditable and is never a silent
 * substitution with a related food.
 *
 * Regenerate: node scripts/build-recipe-composition-snapshots.mjs
 */
import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"
import {fileURLToPath} from "node:url"
import {extractNutrients} from "./lib/usda-nutrient-extract.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const BASE = path.join(ROOT, "scripts/data/usda-sr-legacy/FoodData_Central_sr_legacy_food_csv_2018-04")

/** key -> { fdc_id, note } — the editorial choice of record for each ingredient. */
const SNAPSHOTS = {
  honey: {fdc_id: "169640", note: "No Honey food page on this site."},
  "coconut-milk-canned": {
    fdc_id: "170173",
    note: "Canned full-fat coconut milk (liquid expressed from grated meat and water). Not coconut oil, not a coconut drink.",
  },
  "lemon-juice-raw": {fdc_id: "167747", note: "Lemon juice, not whole lemon flesh."},
  "vegetable-broth": {fdc_id: "171583", note: "Ready-to-serve vegetable broth; sodium varies by brand."},
  "tomato-puree-no-salt": {fdc_id: "170460", note: "Canned tomato puree without added salt."},
  "white-wine-table": {fdc_id: "174837", note: "Table white wine; most alcohol volatilises during simmering."},
  "pasta-wholewheat-cooked": {fdc_id: "168910", note: "Cooked weight; use dry record when the recipe states dry weight."},
  "pasta-wholewheat-dry": {fdc_id: "169738", note: "Dry weight as purchased."},
  "quinoa-cooked": {fdc_id: "168917", note: "Cooked, not dry grain."},
  "buckwheat-cooked": {fdc_id: "170686", note: "Roasted groats, cooked."},
  "lentils-cooked": {fdc_id: "172421", note: "Boiled without salt."},
  "black-beans-canned-low-sodium": {
    fdc_id: "175238",
    note: "Canned low-sodium black beans. Drained-and-rinsed sodium is lower than regular canned; brand varies.",
  },
  "celery-raw": {fdc_id: "169988", note: "No Celery food page."},
  "zucchini-raw": {fdc_id: "169291", note: "Courgette; no food page."},
  "cumin-seed": {fdc_id: "170923", note: "Ground cumin approximated by cumin seed record."},
  paprika: {fdc_id: "171329", note: "Smoked paprika approximated by the paprika record."},
  "coriander-seed": {fdc_id: "170922", note: "Ground coriander approximated by coriander seed record."},
  "curry-powder": {fdc_id: "170924", note: "Generic curry powder; blends vary."},
  "raisins-dark-seedless": {fdc_id: "168165", note: "No Raisins food page."},
  "arugula-raw": {fdc_id: "169387", note: "Rocket/arugula; no food page."},
  "salmon-wild-cooked": {fdc_id: "171998", note: "Atlantic wild, cooked dry heat."},
  "salmon-farmed-cooked": {fdc_id: "175168", note: "Atlantic farmed, cooked dry heat."},
  "sweetcorn-canned-drained": {
    fdc_id: "169214",
    note: "Canned whole-kernel sweetcorn, drained solids. Regular pack; sodium varies with brand and rinsing.",
  },
  "duck-meat-roasted": {fdc_id: "172411", note: "Duck meat only, roasted. Skin excluded."},
  "turkey-wing-roasted": {
    fdc_id: "171527",
    note: "Turkey wing meat only, roasted, with added solution — sodium reflects an enhanced product.",
  },
  "beets-cooked": {fdc_id: "169146", note: "Boiled and drained."},
  "thyme-fresh": {fdc_id: "173470", note: "Fresh thyme leaves."},
  "balsamic-vinegar": {fdc_id: "172241", note: "No Balsamic Vinegar food page."},
  "ginger-ground": {fdc_id: "170926", note: "Dried ground ginger, not fresh root."},
  "salt-table": {fdc_id: "173468", note: "Only for recipes that state an exact salt weight."},
  "tabasco-pepper-sauce": {
    fdc_id: "174528",
    note: "Tabasco-style fermented pepper sauce. The Fermented Hot Sauce food page currently carries a fermented-tofu record and must not be used for composition.",
  },
}

function splitCsvLine(line) {
  const out = []
  let cur = ""
  let quoted = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        cur += '"'
        i++
      } else quoted = !quoted
    } else if (ch === "," && !quoted) {
      out.push(cur)
      cur = ""
    } else cur += ch
  }
  out.push(cur)
  return out
}

async function readCsv(file, onRow) {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(BASE, file)),
    crlfDelay: Infinity,
  })
  let headers = null
  for await (const line of rl) {
    if (!line.trim()) continue
    const cells = splitCsvLine(line)
    if (!headers) {
      headers = cells.map((h) => h.replace(/"/g, "").trim())
      continue
    }
    const row = {}
    headers.forEach((h, i) => {
      row[h] = (cells[i] || "").replace(/^"|"$/g, "")
    })
    onRow(row)
  }
}

const wanted = new Set(Object.values(SNAPSHOTS).map((s) => s.fdc_id))

const nutrients = new Map()
await readCsv("nutrient.csv", (r) => {
  nutrients.set(r.id, {name: r.name, unitName: r.unit_name})
})

const descriptions = new Map()
await readCsv("food.csv", (r) => {
  if (wanted.has(r.fdc_id)) descriptions.set(r.fdc_id, r.description)
})

const byFood = new Map()
await readCsv("food_nutrient.csv", (r) => {
  if (!wanted.has(r.fdc_id)) return
  const n = nutrients.get(r.nutrient_id)
  if (!n) return
  const amount = Number(r.amount)
  if (!Number.isFinite(amount)) return
  if (!byFood.has(r.fdc_id)) byFood.set(r.fdc_id, [])
  byFood.get(r.fdc_id).push({nutrient: n, amount})
})

const out = {}
for (const [key, meta] of Object.entries(SNAPSHOTS)) {
  const rows = byFood.get(meta.fdc_id)
  if (!rows) {
    console.warn(`WARNING: no nutrients found for ${key} (${meta.fdc_id})`)
    continue
  }
  const panel = extractNutrients({foodNutrients: rows})
  out[key] = {
    fdc_id: meta.fdc_id,
    description: descriptions.get(meta.fdc_id) || "",
    database: "USDA FoodData Central SR Legacy (April 2018)",
    basis: "per 100 g edible portion",
    note: meta.note,
    nutrition_per_100g: panel,
  }
}

const header = `/**
 * Named USDA composition records for recipe ingredients that have no food page,
 * or whose preparation state differs materially from the food page.
 *
 * GENERATED by scripts/build-recipe-composition-snapshots.mjs from local
 * SR Legacy CSVs. Do not hand-edit values; change the record choice in the
 * script and regenerate.
 *
 * A snapshot is an explicit, named record. It is never a stand-in for a
 * related food: coconut milk is not coconut oil, lemon juice is not lemon flesh.
 */

export const RECIPE_COMPOSITION_SNAPSHOTS = `

const body = JSON.stringify(out, null, 2)
fs.writeFileSync(
  path.join(ROOT, "src/data/recipeCompositionSnapshots.mjs"),
  `${header}${body}\n\nexport function resolveCompositionSnapshot(key) {\n  if (!key) return null\n  return RECIPE_COMPOSITION_SNAPSHOTS[key] || null\n}\n`,
)

console.log(`wrote ${Object.keys(out).length} snapshots`)
for (const [key, v] of Object.entries(out)) {
  console.log(
    `  ${key}: ${v.description} | kcal ${v.nutrition_per_100g.kcal ?? "—"} | keys ${Object.keys(v.nutrition_per_100g).length}`,
  )
}
