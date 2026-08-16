/**
 * Load USDA SR Legacy CSVs from scripts/data/usda-sr-legacy/ and return
 * API-shaped foods so extractNutrients() can be reused without USDA_API_KEY.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { extractNutrients, scoreCandidate } from "./usda-nutrient-extract.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SR_DIR = path.resolve(
  __dirname,
  "../data/usda-sr-legacy/FoodData_Central_sr_legacy_food_csv_2018-04",
)

let cache = null

function parseCsv(raw) {
  const rows = []
  let i = 0
  const len = raw.length
  function nextRow() {
    const cells = []
    let cell = ""
    let inQuotes = false
    while (i < len) {
      const ch = raw[i]
      if (inQuotes) {
        if (ch === '"') {
          if (raw[i + 1] === '"') {
            cell += '"'
            i += 2
            continue
          }
          inQuotes = false
          i++
          continue
        }
        cell += ch
        i++
        continue
      }
      if (ch === '"') {
        inQuotes = true
        i++
        continue
      }
      if (ch === ",") {
        cells.push(cell)
        cell = ""
        i++
        continue
      }
      if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && raw[i + 1] === "\n") i++
        i++
        cells.push(cell)
        return cells
      }
      cell += ch
      i++
    }
    if (cell.length || cells.length) {
      cells.push(cell)
      return cells
    }
    return null
  }
  const header = nextRow()
  if (!header) return []
  while (i < len) {
    const cells = nextRow()
    if (!cells) break
    if (cells.length === 1 && cells[0] === "") continue
    const obj = {}
    for (let c = 0; c < header.length; c++) obj[header[c]] = cells[c] ?? ""
    rows.push(obj)
  }
  return rows
}

function readCsv(name) {
  const raw = fs.readFileSync(path.join(SR_DIR, name), "utf8")
  return parseCsv(raw)
}

export function srLegacyAvailable() {
  return fs.existsSync(path.join(SR_DIR, "food.csv")) && fs.existsSync(path.join(SR_DIR, "food_nutrient.csv"))
}

export function loadSrLegacyIndex() {
  if (cache) return cache
  if (!srLegacyAvailable()) {
    throw new Error(`SR Legacy CSV not found in ${SR_DIR}. Download FoodData_Central_sr_legacy_food_csv_2018-04.zip`)
  }
  const foods = readCsv("food.csv")
  const nutrients = readCsv("nutrient.csv")
  const foodNutrients = readCsv("food_nutrient.csv")
  const nutrientById = new Map()
  for (const n of nutrients) nutrientById.set(String(n.id), n)
  const rowsByFdc = new Map()
  for (const row of foodNutrients) {
    const id = String(row.fdc_id)
    if (!rowsByFdc.has(id)) rowsByFdc.set(id, [])
    rowsByFdc.get(id).push(row)
  }
  const byDescription = new Map()
  for (const food of foods) {
    byDescription.set(food.description, food)
  }
  cache = { foods, nutrientById, rowsByFdc, byDescription }
  return cache
}

export function toApiFood(food, index = loadSrLegacyIndex()) {
  const rows = index.rowsByFdc.get(String(food.fdc_id)) || []
  return {
    fdcId: Number(food.fdc_id),
    description: food.description,
    dataType: "SR Legacy",
    foodNutrients: rows.map((row) => {
      const n = index.nutrientById.get(String(row.nutrient_id)) || {}
      return {
        amount: Number(row.amount),
        nutrient: { name: n.name || "", unitName: n.unit_name || "" },
      }
    }),
  }
}

export function lookupPreferred(description, index = loadSrLegacyIndex()) {
  const food = index.byDescription.get(description)
  if (!food) return null
  const api = toApiFood(food, index)
  const nutrients = extractNutrients(api)
  return {
    chosen: { fdcId: api.fdcId, description: api.description, dataType: "SR Legacy" },
    nutrients,
    score: scoreCandidate("SR Legacy", nutrients),
  }
}
