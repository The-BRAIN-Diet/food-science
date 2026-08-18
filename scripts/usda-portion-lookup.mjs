#!/usr/bin/env node
/**
 * Read-only USDA SR Legacy household-measure lookup.
 *
 * Usage: node scripts/usda-portion-lookup.mjs <fdc_id> [<fdc_id> ...]
 *
 * Prints every recorded food_portion row so recipe conversions cite a real
 * household measure instead of assuming a millilitre-to-gram equivalence.
 */
import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"
import {fileURLToPath} from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const BASE = path.join(ROOT, "scripts/data/usda-sr-legacy/FoodData_Central_sr_legacy_food_csv_2018-04")

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

const wanted = new Set(process.argv.slice(2))
if (!wanted.size) {
  console.error("usage: node scripts/usda-portion-lookup.mjs <fdc_id> [...]")
  process.exit(1)
}

const units = new Map()
await readCsv("measure_unit.csv", (r) => units.set(r.id, r.name))

const descriptions = new Map()
await readCsv("food.csv", (r) => {
  if (wanted.has(r.fdc_id)) descriptions.set(r.fdc_id, r.description)
})

const portions = []
await readCsv("food_portion.csv", (r) => {
  if (!wanted.has(r.fdc_id)) return
  portions.push({
    fdc_id: r.fdc_id,
    amount: r.amount,
    unit: units.get(r.measure_unit_id) || "",
    modifier: r.modifier,
    gram_weight: r.gram_weight,
  })
})

for (const id of wanted) {
  console.log(`\n=== ${id} — ${descriptions.get(id) || "(not in SR Legacy)"} ===`)
  const rows = portions.filter((p) => p.fdc_id === id)
  if (!rows.length) {
    console.log("  no food_portion rows")
    continue
  }
  for (const p of rows) {
    const unit = p.unit === "undetermined" ? "" : p.unit
    console.log(`  ${p.amount} ${unit} ${p.modifier || ""} = ${p.gram_weight} g`.replace(/\s+/g, " "))
  }
}
