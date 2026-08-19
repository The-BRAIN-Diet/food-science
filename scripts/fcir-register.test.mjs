import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"
import test from "node:test"
import matter from "gray-matter"
import {
  caseById,
  extractGeneratedBlock,
  foodPageNote,
  foodSlugsByCase,
  loadFcirRegister,
  renderGeneratedFcirMarkdown,
} from "./lib/fcir-register.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const FOODS = path.join(ROOT, "docs/foods")
const TABLE = path.join(ROOT, "src/components/NutritionTable.tsx")

function foodPage(slug) {
  const file = path.join(FOODS, `${slug}.md`)
  assert.equal(fs.existsSync(file), true, `missing food page ${slug}`)
  const raw = fs.readFileSync(file, "utf8")
  return {raw, ...matter(raw)}
}

function citedFcirIds(text) {
  return [...String(text || "").matchAll(/\bFCIR-\d{3}\b/g)].map((match) => match[0])
}

test("the public FCIR page is generated from the canonical case dataset", () => {
  const register = loadFcirRegister(ROOT)
  const page = fs.readFileSync(path.join(ROOT, register.public_doc), "utf8")
  const generated = renderGeneratedFcirMarkdown(register)
  assert.equal(extractGeneratedBlock(page), generated)
  assert.match(page, /pending formal acceptance by Larry Callahan/)
  assert.match(page, /It is not an FDA or USDA project/)
  assert.doesNotMatch(page, /currently an FDA or USDA project/)
  assert.equal(register.editorial.scientific_provenance_lead, "pending formal acceptance by Larry Callahan")
})

test("every FCIR case has a stable #fcir-nnn anchor", () => {
  const register = loadFcirRegister(ROOT)
  const page = fs.readFileSync(path.join(ROOT, register.public_doc), "utf8")
  const seen = new Set()
  for (const entry of register.cases) {
    assert.match(entry.id, /^FCIR-\d{3}$/, entry.id)
    assert.equal(entry.anchor, entry.id.toLowerCase(), entry.id)
    assert.equal(seen.has(entry.anchor), false, `duplicate anchor ${entry.anchor}`)
    seen.add(entry.anchor)
    assert.match(page, new RegExp(`\\{#${entry.anchor}\\}`), entry.id)
    assert.ok(entry.decision && entry.action && entry.source_public && entry.status, entry.id)
  }
})

test("public register status, decision and source match the canonical dataset", () => {
  const register = loadFcirRegister(ROOT)
  const page = fs.readFileSync(path.join(ROOT, register.public_doc), "utf8")
  for (const entry of register.cases) {
    assert.match(page, new RegExp(entry.id.replaceAll("-", "\\-")))
    assert.match(page, new RegExp(entry.status.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    for (const snippet of [entry.decision.slice(0, 40), entry.source_public.slice(0, 40)]) {
      const needle = snippet.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      assert.match(page, new RegExp(needle), `${entry.id} drifted from ${snippet}`)
    }
  }
})

test("food pages link only to their relevant FCIR case and those links resolve", () => {
  const register = loadFcirRegister(ROOT)
  const bySlug = foodSlugsByCase(register)
  const table = fs.readFileSync(TABLE, "utf8")
  assert.match(table, /fcirHref/)
  assert.match(table, /foodPageNote/)
  assert.match(table, /FCIR-\\d\{3\}/)

  for (const [slug, ids] of bySlug) {
    const page = foodPage(slug)
    assert.deepEqual(page.data.fcir_cases, ids, slug)
    const cited = new Set([
      ...citedFcirIds(page.raw),
      ...(page.data.fcir_cases || []),
      ...((page.data.nutrition_supplementary_sources || []).flatMap((row) => citedFcirIds(row.source_note))),
    ])
    for (const id of ids) {
      const note = foodPageNote(id, register)
      assert.match(page.raw, new RegExp(id.replace("-", "\\-")), `${slug} missing ${id}`)
      assert.ok(cited.has(id), `${slug} does not cite ${id}`)
      const entry = caseById(id, register)
      assert.ok(entry, `${id} is not in the canonical register`)
      assert.equal(entry.anchor, id.toLowerCase())
      const alaRow = (page.data.nutrition_supplementary_sources || []).find((row) => row.key === "ala_interpreted")
      if (alaRow) {
        assert.equal(alaRow.source_note, note, `${slug} must not reproduce the calculation`)
        assert.equal(alaRow.exclude_from_recipe_sum, true, slug)
        assert.equal(alaRow.fcir_case, id, slug)
      }
    }
    for (const id of cited) {
      assert.ok(caseById(id, register), `${slug} cites unknown ${id}`)
      assert.ok(ids.includes(id), `${slug} cites off-case ${id}`)
    }
  }
})

test("no food page cites an FCIR case that is not on the register", () => {
  const register = loadFcirRegister(ROOT)
  const known = new Set((register.cases || []).map((entry) => entry.id))
  const files = fs.readdirSync(FOODS).filter((file) => file.endsWith(".md"))
  for (const file of files) {
    const raw = fs.readFileSync(path.join(FOODS, file), "utf8")
    for (const id of citedFcirIds(raw)) {
      assert.ok(known.has(id), `${file} cites ${id}, which has no register anchor`)
    }
  }
})

test("under-review cases keep unresolved 18:3 out of named ALA and identified omega-3 totals", () => {
  const register = loadFcirRegister(ROOT)
  const underReview = register.cases.filter((entry) => entry.status === "Under review")
  assert.ok(underReview.length > 0, "the register has no under-review cases to confirm")
  for (const entry of underReview) {
    assert.equal(entry.excludes_unresolved_18_3_from_named_ala, true, entry.id)
    assert.equal(entry.excludes_unresolved_18_3_from_identified_omega3, true, entry.id)
    for (const slug of entry.food_slugs) {
      const {data} = foodPage(slug)
      const nutrition = data.nutrition_per_100g || {}
      assert.equal(nutrition.ala_mg, undefined, `${slug} must not publish named ALA while ${entry.id} is under review`)
      assert.equal(
        typeof nutrition.pufa_18_3_unresolved_mg,
        "number",
        `${slug} should retain unresolved 18:3 internally`,
      )
      const components = data.omega3_components || []
      assert.equal(
        components.some((row) => row.nutrient === "pufa_18_3_unresolved_mg" || row.nutrient === "ala_mg"),
        false,
        `${slug} must not place unresolved 18:3 in identified omega-3`,
      )
      if (typeof nutrition.omega3_mg === "number") {
        assert.notEqual(
          nutrition.omega3_mg,
          nutrition.pufa_18_3_unresolved_mg,
          `${slug} identified omega-3 must not equal unresolved 18:3`,
        )
      }
    }
  }
})

test("food pages do not reproduce FCIR calculations in source notes", () => {
  const register = loadFcirRegister(ROOT)
  for (const slug of foodSlugsByCase(register).keys()) {
    const {data, raw} = foodPage(slug)
    const alaRow = (data.nutrition_supplementary_sources || []).find((row) => row.key === "ala_interpreted")
    if (!alaRow) continue
    assert.doesNotMatch(String(alaRow.source_note), /22,813|9,080|6\.789|oil-percentage|Foundation FDC/)
    assert.doesNotMatch(raw, /not 55 g per 100 g/)
  }
})
