#!/usr/bin/env node
/**
 * Repair ALA identity and omega-3 totals across food pages.
 *
 * ALA is alpha-linolenic acid, 18:3 n-3, and nothing else. Alanine is an amino
 * acid that shares three letters with it; a bare "18:3" states a carbon count
 * but not an isomer, and 18:3 n-6 is gamma-linolenic acid. Ninety pages had
 * stored their record's alanine as `ala_mg` and rolled it into `omega3_mg`.
 *
 * Matching is by USDA nutrient id, not by name. A name can be misread; an
 * identifier cannot. Only these ids state an n-3 isomer:
 *
 *   1404  PUFA 18:3 n-3 c,c,c (ALA)
 *   1278  PUFA 20:5 n-3 (EPA)
 *   1280  PUFA 22:5 n-3 (DPA)
 *   1272  PUFA 22:6 n-3 (DHA)
 *   1405  PUFA 20:3 n-3
 *   1407  PUFA 20:4 n-3
 *
 * Id 1270 is an unqualified "PUFA 18:3". It is retained as a chemically
 * unresolved value under its own key and never becomes ALA or part of an n-3
 * total. Ids 2023/2024/2025 (20:5c, 22:5 c, 22:6 c) name a cis form without an
 * n-position and are likewise not treated as explicit n-3.
 *
 * Where no explicit n-3 component exists, `omega3_mg` is removed rather than
 * written as zero: an unmeasured nutrient is unknown, not absent.
 *
 * Usage:
 *   node scripts/repair-ala-omega3.mjs          # dry run, prints the audit
 *   node scripts/repair-ala-omega3.mjs --write  # applies the repair
 *   node scripts/repair-ala-omega3.mjs --json
 */
import {execFileSync} from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"
import {fileURLToPath} from "node:url"
import matter from "gray-matter"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const BASE = path.join(ROOT, "scripts/data/usda-sr-legacy/FoodData_Central_sr_legacy_food_csv_2018-04")
const FOODS = path.join(ROOT, "docs/foods")
const WRITE = process.argv.includes("--write")

/** Nutrient ids whose names state the n-3 isomer explicitly. */
export const EXPLICIT_N3 = {
  1404: {key: "ala_mg", label: "18:3 n-3 (ALA)"},
  1278: {key: "epa_mg", label: "20:5 n-3 (EPA)"},
  1280: {key: "dpa_mg", label: "22:5 n-3 (DPA)"},
  1272: {key: "dha_mg", label: "22:6 n-3 (DHA)"},
  1405: {key: "n3_20_3_mg", label: "20:3 n-3"},
  1407: {key: "n3_20_4_mg", label: "20:4 n-3"},
}

/** Unqualified 18:3: a carbon count with no isomer. Never ALA, never an n-3 total. */
const UNRESOLVED_18_3 = 1270

/**
 * Amino acids whose stored amounts have been mistaken for ALA. Alanine is the
 * common case; phenylalanine caught the mushroom pages, where "703 mg ALA" was
 * the record's phenylalanine. Tracked so the audit can name what each stored
 * value actually was.
 */
const AMINO_ACIDS = new Set(["alanine", "beta-alanine", "phenylalanine"])
const TOLERANCE = 0.02

/**
 * Pages whose cited record describes a different food. Retrieval succeeded for
 * these, but applying the record would publish canola oil's ALA on the MCT oil
 * page and a beech mushroom's composition on three medicinal mushroom pages.
 * A neighbouring food is not a source, so nothing is carried across.
 */
const SUBSTITUTED_RECORDS = {
  "mct-oil.md": "cites FDC 748278, Oil, canola — a different food",
  "sunflower-lecithin.md": "cites FDC 1750349, Oil, sunflower — a different food",
  "cordyceps-mushroom.md": "cites FDC 2003603, Mushroom, beech — a different species",
  "reishi-mushroom.md": "cites FDC 2003603, Mushroom, beech — a different species",
  "turkey-tail-mushroom.md": "cites FDC 2003603, Mushroom, beech — a different species",
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

/*
 * The "before" side of the audit comes from the last commit rather than from
 * disk, so the report can be regenerated after the repair has been applied.
 */
const BASELINE = process.argv.includes("--baseline")
const baselineAt = (file) => {
  try {
    return execFileSync("git", ["show", `HEAD:docs/foods/${file}`], {cwd: ROOT, encoding: "utf8"})
  } catch {
    return null
  }
}

const files = fs.readdirSync(FOODS).filter((f) => f.endsWith(".md"))
const pages = files.map((file) => {
  const onDisk = fs.readFileSync(path.join(FOODS, file), "utf8")
  const raw = BASELINE ? (baselineAt(file) ?? onDisk) : onDisk
  const parsed = matter(raw)
  return {
    file,
    raw,
    parsed,
    data: parsed.data,
    panel: parsed.data.nutrition_per_100g || {},
    fdc: parsed.data.nutrition_source?.fdc_id ? String(parsed.data.nutrition_source.fdc_id) : null,
  }
})

const relevant = pages.filter(
  (p) => typeof p.panel.ala_mg === "number" || typeof p.panel.omega3_mg === "number",
)
const wanted = new Set(relevant.map((p) => p.fdc).filter(Boolean))

const nutrientNames = new Map()
await readCsv("nutrient.csv", (r) => nutrientNames.set(r.id, r.name))

/** fdc_id -> { components: {id: mg}, amino: {name: mg}, unresolved_183_mg } */
const records = new Map()
await readCsv("food_nutrient.csv", (r) => {
  if (!wanted.has(r.fdc_id)) return
  const amount = parseFloat(r.amount)
  if (!Number.isFinite(amount)) return
  if (!records.has(r.fdc_id)) records.set(r.fdc_id, {components: {}, amino: {}})
  const rec = records.get(r.fdc_id)
  const mg = amount * 1000 // these fields are reported in grams
  const name = (nutrientNames.get(r.nutrient_id) || "").toLowerCase()

  if (EXPLICIT_N3[r.nutrient_id]) rec.components[r.nutrient_id] = mg
  else if (r.nutrient_id === String(UNRESOLVED_18_3)) rec.unresolved_183_mg = mg
  else if (AMINO_ACIDS.has(name)) rec.amino[name] = mg
})

/*
 * Records outside the 2018 SR Legacy extract, retrieved from the FoodData
 * Central API and cached so this repair reproduces without a network call.
 */
const cached = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/data/fdc-api-records.json"), "utf8"))
for (const [id, rec] of Object.entries(cached)) {
  if (!wanted.has(id) || records.has(id)) continue
  const components = {}
  for (const [nid, mg] of Object.entries(rec.nutrients)) {
    if (EXPLICIT_N3[nid] && typeof mg === "number") components[nid] = mg
  }
  records.set(id, {
    components,
    amino: rec.amino || {},
    unresolved_183_mg: rec.nutrients[UNRESOLVED_18_3],
    description: rec.description,
    retrieved: true,
  })
}

function close(a, b) {
  if (typeof a !== "number" || typeof b !== "number") return false
  if (b === 0) return a === 0
  return Math.abs(a - b) / Math.abs(b) <= TOLERANCE
}

function round(value) {
  return Math.round(value * 100) / 100
}

const rows = []

for (const page of relevant) {
  const oldAla = typeof page.panel.ala_mg === "number" ? page.panel.ala_mg : null
  const oldOmega = typeof page.panel.omega3_mg === "number" ? page.panel.omega3_mg : null
  const rec = page.fdc ? records.get(page.fdc) : null

  const row = {
    file: page.file,
    fdc: page.fdc,
    old_ala_mg: oldAla,
    old_omega3_mg: oldOmega,
    resolved_from: null,
    new_ala_mg: null,
    omega3_components: [],
    new_omega3_mg: null,
    disposition: null,
    queue: false,
  }

  const aminoMatch = (value) => {
    if (value == null || !rec) return null
    for (const [name, mg] of Object.entries(rec.amino || {})) {
      if (close(value, mg)) return `${name}, ${round(mg)} mg — an amino acid, not a fatty acid`
    }
    return null
  }

  if (!page.fdc) {
    row.resolved_from = "no source identifier on the page"
    row.disposition = "suppressed — no fdc_id, provenance unestablished"
    row.queue = true
  } else if (!rec) {
    row.resolved_from = "record could not be retrieved"
    row.disposition = "suppressed — record unavailable, value unverifiable"
    row.queue = true
  } else if (SUBSTITUTED_RECORDS[page.file]) {
    row.resolved_from = aminoMatch(oldAla) || `${rec.description}, a substituted record`
    row.disposition = `suppressed — ${SUBSTITUTED_RECORDS[page.file]}`
    row.queue = true
  } else {
    /*
     * What the stored number actually was, traced back to a named field in the
     * record. This is the column that makes the repair auditable: it is not
     * enough to say a value changed, the reader has to see that "ALA 696 mg" on
     * the walnut page was the record's alanine all along.
     */
    if (oldAla != null) {
      const amino = aminoMatch(oldAla)
      /*
       * The explicit field is tested first. Records routinely report the same
       * 18:3 under both the generic and the n-3 identifier, and chia's correct
       * 17830 mg appears in each — checking the generic first would attribute a
       * verified value to an unresolved field.
       */
      if (close(oldAla, rec.components[1404])) {
        row.resolved_from = "PUFA 18:3 n-3 c,c,c (ALA) — correct"
      } else if (amino) {
        row.resolved_from = amino
      } else if (close(oldAla, rec.unresolved_183_mg)) {
        row.resolved_from = `unqualified PUFA 18:3, ${round(rec.unresolved_183_mg)} mg — isomer unstated`
      } else {
        row.resolved_from = "no field in the record matches the stored value"
      }
    }

    const explicitAla = rec.components[1404]
    if (typeof explicitAla === "number" && explicitAla > 0) {
      row.new_ala_mg = round(explicitAla)
      row.disposition = close(oldAla, explicitAla)
        ? "confirmed against nutrient 1404"
        : "restored from nutrient 1404, the explicit 18:3 n-3 field"
    } else {
      row.new_ala_mg = null
      if (oldAla == null) {
        row.disposition = "no ALA stored; unchanged"
      } else if (typeof rec.unresolved_183_mg === "number" && rec.unresolved_183_mg > 0) {
        row.disposition = "ALA suppressed; 18:3 retained as chemically unresolved"
      } else if (aminoMatch(oldAla)) {
        row.disposition = "ALA removed; the stored value was an amino acid"
      } else if (oldAla === 0) {
        // A stored zero is not a corrupted value, only an absence written as a
        // measurement. It is removed, but there is nothing here to review.
        row.disposition = "stored zero removed; an unmeasured nutrient is unknown, not absent"
      } else {
        row.disposition = "ALA suppressed; the record states no 18:3 n-3"
        row.queue = true
      }
    }

    /*
     * Only components the record actually reports as present are summed. A
     * field analysed at zero contributes nothing, and a total assembled purely
     * from zeros would publish "0 mg omega-3" as though it were a finding. Where
     * nothing positive is identified the total is omitted entirely.
     */
    for (const [id, meta] of Object.entries(EXPLICIT_N3)) {
      const value = rec.components[id]
      if (typeof value === "number" && value > 0) {
        row.omega3_components.push({key: meta.key, label: meta.label, amount_mg: round(value)})
      }
    }
    row.new_omega3_mg = row.omega3_components.length
      ? round(row.omega3_components.reduce((sum, c) => sum + c.amount_mg, 0))
      : null

    // A page may publish EPA or DHA from a cited source rather than this record.
    for (const [id, meta] of [[1278, "epa_mg"], [1272, "dha_mg"]]) {
      const stored = page.panel[meta]
      const fromRecord = rec.components[id]
      if (typeof stored === "number" && typeof fromRecord === "number" && !close(stored, fromRecord)) {
        row.conflict = `stored ${meta} ${stored} vs record ${round(fromRecord)}`
      }
    }
  }

  rows.push({...row, page, rec})
}

/* ---------------------------------------------------------------- writing */

/**
 * Edit the nutrition block in place rather than re-serialising the front
 * matter. These pages carry hand-written prose, folded scalars and deliberate
 * key ordering that a round-trip through a YAML emitter would quietly reflow.
 */
function applyRepair(row) {
  const {page} = row
  const lines = page.raw.split("\n")

  const start = lines.findIndex((l) => /^nutrition_per_100g:\s*$/.test(l))
  if (start === -1) throw new Error(`${page.file}: no nutrition_per_100g block`)
  let end = start + 1
  while (end < lines.length && (/^\s+\S/.test(lines[end]) || lines[end].trim() === "")) end++
  const indent = (lines[start + 1] || "  ").match(/^\s*/)[0] || "  "

  const block = lines.slice(start + 1, end)
  const findKey = (key) => block.findIndex((l) => new RegExp(`^\\s*${key}:`).test(l))

  const drop = (key) => {
    const i = findKey(key)
    if (i !== -1) block.splice(i, 1)
  }
  const set = (key, value) => {
    const i = findKey(key)
    if (i !== -1) block[i] = `${indent}${key}: ${value}`
    else block.push(`${indent}${key}: ${value}`)
  }

  if (row.new_ala_mg == null) drop("ala_mg")
  else set("ala_mg", row.new_ala_mg)

  if (row.new_omega3_mg == null) drop("omega3_mg")
  else set("omega3_mg", row.new_omega3_mg)

  /*
   * An unqualified 18:3 is kept under a key that says exactly what is unknown
   * about it. The key appears in no render list and in no calculation, so the
   * value cannot reach a reader as ALA or be summed into an n-3 total.
   */
  const unresolved = row.rec?.unresolved_183_mg
  drop("pufa_18_3_unresolved_mg")
  if (typeof unresolved === "number" && row.new_ala_mg == null && unresolved > 0) {
    set("pufa_18_3_unresolved_mg", round(unresolved))
  }

  while (block.length && block[block.length - 1].trim() === "") block.pop()

  let out = [...lines.slice(0, start + 1), ...block, ...lines.slice(end)]

  /* Provenance for the total: which components were summed, and at what value. */
  const anchor = out.findIndex((l) => /^nutrition_per_100g:\s*$/.test(l))
  let after = anchor + 1
  while (after < out.length && (/^\s+\S/.test(out[after]) || out[after].trim() === "")) after++

  const existing = out.findIndex((l) => /^omega3_components:\s*$/.test(l))
  if (existing !== -1) {
    let stop = existing + 1
    while (stop < out.length && /^\s+\S/.test(out[stop])) stop++
    out.splice(existing, stop - existing)
    if (existing < after) after -= stop - existing
  }

  if (row.omega3_components.length) {
    const yaml = ["omega3_components:"]
    for (const c of row.omega3_components) {
      yaml.push(`  - nutrient: ${c.key}`, `    identity: ${c.label}`, `    amount_mg: ${c.amount_mg}`)
    }
    out = [...out.slice(0, after), ...yaml, ...out.slice(after)]
  }

  fs.writeFileSync(path.join(FOODS, page.file), out.join("\n"))
}

if (WRITE) {
  for (const row of rows) {
    const changed =
      row.old_ala_mg !== row.new_ala_mg ||
      row.old_omega3_mg !== row.new_omega3_mg ||
      typeof row.rec?.unresolved_183_mg === "number"
    if (changed) applyRepair(row)
  }
}

/* ---------------------------------------------------------------- report */

const output = rows.map(({page, rec, ...rest}) => rest)

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(output, null, 2))
} else if (process.argv.includes("--markdown")) {
  const cell = (v) => (v == null ? "—" : String(v))

  console.log("| Page | FDC | Old ALA | Resolved source nutrient | New ALA | Old n-3 | New n-3 | Components summed | Disposition |")
  console.log("| --- | --- | --- | --- | --- | --- | --- | --- | --- |")
  for (const r of [...output].sort((a, b) => a.file.localeCompare(b.file))) {
    console.log(
      `| \`${r.file.replace(".md", "")}\` | ${cell(r.fdc)} | ${cell(r.old_ala_mg)} | ${cell(r.resolved_from)} ` +
        `| ${cell(r.new_ala_mg)} | ${cell(r.old_omega3_mg)} | ${cell(r.new_omega3_mg)} ` +
        `| ${r.omega3_components.map((c) => c.label).join(" + ") || "—"} | ${r.disposition} |`,
    )
  }
} else {
  const changed = output.filter((r) => r.old_ala_mg !== r.new_ala_mg || r.old_omega3_mg !== r.new_omega3_mg)
  console.log(`${WRITE ? "APPLIED" : "DRY RUN"} — ${changed.length} of ${output.length} pages change\n`)
  console.log(
    ["page", "fdc", "old ALA", "new ALA", "old n-3", "new n-3", "components", "disposition"]
      .map((h, i) => h.padEnd([24, 9, 9, 9, 9, 9, 26, 0][i]))
      .join(""),
  )
  for (const r of output) {
    console.log(
      [
        r.file.replace(".md", "").slice(0, 23).padEnd(24),
        String(r.fdc ?? "—").padEnd(9),
        String(r.old_ala_mg ?? "—").padEnd(9),
        String(r.new_ala_mg ?? "—").padEnd(9),
        String(r.old_omega3_mg ?? "—").padEnd(9),
        String(r.new_omega3_mg ?? "—").padEnd(9),
        (r.omega3_components.map((c) => c.key.replace("_mg", "")).join("+") || "—").padEnd(26),
        r.disposition,
      ].join(""),
    )
    if (r.conflict) console.log(`${"".padEnd(24)}CONFLICT: ${r.conflict}`)
  }
  const queued = output.filter((r) => r.queue)
  if (queued.length) {
    console.log(`\nQUEUED FOR IDENTITY/PROVENANCE REVIEW (${queued.length}):`)
    for (const r of queued) console.log(`  ${r.file} — ${r.disposition}`)
  }
}
