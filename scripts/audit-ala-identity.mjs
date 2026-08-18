#!/usr/bin/env node
/**
 * Read-only audit for alanine published as alpha-linolenic acid.
 *
 * ALA is 18:3 n-3. Alanine is an amino acid. They share an acronym and nothing
 * else, and a roe record carries over a gram of alanine per 100 g — which, once
 * copied into `ala_mg`, publishes as an omega-3 figure larger than the food's
 * DHA. A bare "18:3" is a second failure mode: the carbon count does not say
 * which isomer, and 18:3 n-6 is gamma-linolenic acid.
 *
 * For every food page carrying `ala_mg` and an `fdc_id`, this compares the
 * stored value against that record's alanine and 18:3 fields and classifies it.
 * It writes nothing.
 *
 * Usage: node scripts/audit-ala-identity.mjs [--json]
 */
import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"
import {fileURLToPath} from "node:url"
import matter from "gray-matter"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const BASE = path.join(ROOT, "scripts/data/usda-sr-legacy/FoodData_Central_sr_legacy_food_csv_2018-04")
const FOODS = path.join(ROOT, "docs/foods")

/** Tolerance for calling a stored value "the same number" as a source field. */
const MATCH_TOLERANCE = 0.02

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

const pages = fs
  .readdirSync(FOODS)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const {data} = matter(fs.readFileSync(path.join(FOODS, f), "utf8"))
    return {
      file: f,
      title: data.title || f,
      ala: data.nutrition_per_100g?.ala_mg,
      epa: data.nutrition_per_100g?.epa_mg,
      dha: data.nutrition_per_100g?.dha_mg,
      omega3: data.nutrition_per_100g?.omega3_mg,
      fdc: data.nutrition_source?.fdc_id ? String(data.nutrition_source.fdc_id) : null,
    }
  })

const withAla = pages.filter((p) => typeof p.ala === "number")
const wanted = new Set(withAla.map((p) => p.fdc).filter(Boolean))

const nutrientNames = new Map()
await readCsv("nutrient.csv", (r) => nutrientNames.set(r.id, r.name))

/** fdc_id -> { alanine_mg, ala_n3_mg, generic_183_mg, epa_mg, dha_mg } */
const source = new Map()
await readCsv("food_nutrient.csv", (r) => {
  if (!wanted.has(r.fdc_id)) return
  const name = (nutrientNames.get(r.nutrient_id) || "").toLowerCase()
  const amount = parseFloat(r.amount)
  if (!Number.isFinite(amount)) return
  if (!source.has(r.fdc_id)) source.set(r.fdc_id, {})
  const rec = source.get(r.fdc_id)
  const mg = amount * 1000 // SR Legacy reports these fields in grams

  if (name === "alanine") rec.alanine_mg = mg
  else if (/18:3\s*\(?\s*n-?\s*3/.test(name) || name.includes("alpha-linolenic")) rec.ala_n3_mg = mg
  else if (/18:3/.test(name) && !/n-?6/.test(name)) rec.generic_183_mg = mg
  else if (/20:5\s*n-?3/.test(name)) rec.epa_mg = mg
  else if (/22:6\s*n-?3/.test(name)) rec.dha_mg = mg
})

function close(a, b) {
  if (typeof a !== "number" || typeof b !== "number") return false
  if (b === 0) return a === 0
  return Math.abs(a - b) / Math.abs(b) <= MATCH_TOLERANCE
}

const findings = []
for (const page of withAla) {
  const rec = page.fdc ? source.get(page.fdc) : null
  let verdict
  let detail

  if (!page.fdc) {
    verdict = "no_source_id"
    detail = "no fdc_id on the page, so the stored value cannot be checked against a record"
  } else if (!rec) {
    verdict = "source_not_in_sr_legacy"
    detail = `FDC ${page.fdc} is not in the local SR Legacy extract`
  } else if (close(page.ala, rec.ala_n3_mg)) {
    /*
     * The explicit n-3 field is tested first because it settles identity, and
     * because the two figures can coincide: avocado holds 111 mg of 18:3 n-3
     * and 109 mg of alanine, so testing alanine first condemns a correct value.
     */
    verdict = "ok_explicit_n3"
    detail = `matches 18:3 n-3 (${rec.ala_n3_mg.toFixed(1)} mg)`
  } else if (close(page.ala, rec.alanine_mg)) {
    verdict = "ALANINE"
    detail = `stored ${page.ala} mg matches the record's alanine (${rec.alanine_mg.toFixed(0)} mg)`
  } else if (close(page.ala, rec.generic_183_mg)) {
    verdict = "GENERIC_18_3"
    detail = `matches an unqualified 18:3 field (${rec.generic_183_mg.toFixed(1)} mg), isomer unstated`
  } else {
    verdict = "unmatched"
    const parts = []
    if (rec.ala_n3_mg != null) parts.push(`18:3 n-3 ${rec.ala_n3_mg.toFixed(1)}`)
    if (rec.generic_183_mg != null) parts.push(`18:3 ${rec.generic_183_mg.toFixed(1)}`)
    if (rec.alanine_mg != null) parts.push(`alanine ${rec.alanine_mg.toFixed(0)}`)
    detail = `stored ${page.ala} mg matches no field (record has ${parts.join(", ") || "none"})`
  }

  const omega3Sum = [page.ala, page.epa, page.dha].filter((v) => typeof v === "number")
  const rollupIncludesAla =
    typeof page.omega3 === "number" &&
    omega3Sum.length > 0 &&
    close(page.omega3, omega3Sum.reduce((a, b) => a + b, 0))

  findings.push({...page, verdict, detail, rollupIncludesAla})
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(findings, null, 2))
} else {
  const order = [
    "ALANINE",
    "GENERIC_18_3",
    "unmatched",
    "no_source_id",
    "source_not_in_sr_legacy",
    "ok_explicit_n3",
  ]
  for (const verdict of order) {
    const rows = findings.filter((f) => f.verdict === verdict)
    if (!rows.length) continue
    console.log(`\n=== ${verdict} (${rows.length}) ===`)
    for (const row of rows) {
      console.log(`  ${row.file} — ${row.detail}`)
      if (row.verdict === "ALANINE" && row.rollupIncludesAla) {
        console.log(`      omega3_mg ${row.omega3} also carries it`)
      }
    }
  }
  console.log(`\nfood pages carrying ala_mg: ${withAla.length} of ${pages.length}`)
}
