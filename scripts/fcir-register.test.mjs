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
  identityGroup,
  loadFcirRegister,
  renderGeneratedFcirMarkdown,
  validateFcirRegister,
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

test("the FCIR is one continuous register table, each case ID once, with row anchors", () => {
  const register = loadFcirRegister(ROOT)
  const page = fs.readFileSync(path.join(ROOT, register.public_doc), "utf8")
  const generated = extractGeneratedBlock(page)
  assert.ok(generated, "missing generated FCIR block")
  assert.equal((generated.match(/<table className="fcir-table">/g) || []).length, 1)
  assert.doesNotMatch(generated, /## Case records/)
  assert.doesNotMatch(generated, /### FCIR-\d{3}/)
  const seen = new Set()
  for (const entry of register.cases) {
    assert.match(entry.id, /^FCIR-\d{3}$/, entry.id)
    assert.equal(entry.anchor, entry.id.toLowerCase(), entry.id)
    assert.equal(seen.has(entry.id), false, `duplicate case ID ${entry.id}`)
    seen.add(entry.id)
    const rowId = new RegExp(`<tr id="${entry.anchor}" className="fcir-row">`)
    assert.match(generated, rowId, `${entry.id} missing table-row anchor`)
    assert.equal((generated.match(rowId) || []).length, 1, `${entry.id} row anchor must appear once`)
    assert.equal((generated.match(new RegExp(`<strong>${entry.id}</strong>`, "g")) || []).length, 1, `${entry.id} must appear once as the row identifier`)
  }
})

function markdownHrefs(text) {
  return [...String(text || "").matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1])
}

function plainText(text) {
  return String(text || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:]|$)/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
}

test("public register status, decision, evidence, food and recipe links are preserved", () => {
  const register = loadFcirRegister(ROOT)
  const page = fs.readFileSync(path.join(ROOT, register.public_doc), "utf8")
  const generated = extractGeneratedBlock(page)
  for (const entry of register.cases) {
    const rowMatch = generated.match(new RegExp(`<tr id="${entry.anchor}"[\\s\\S]*?</tr>`))
    assert.ok(rowMatch, `${entry.id} missing table row`)
    const rowText = rowMatch[0].replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ")
    assert.match(rowText, new RegExp(entry.status.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), entry.id)
    const decisionNeedle = plainText(entry.decision).slice(0, 60).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    assert.match(rowText, new RegExp(decisionNeedle), `${entry.id} lost its decision`)
    const actionNeedle = plainText(entry.action).slice(0, 60).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    assert.match(rowText, new RegExp(actionNeedle), `${entry.id} lost its action`)
    for (const href of [
      ...markdownHrefs(entry.source_public),
      ...markdownHrefs(entry.food_or_scope),
      ...(entry.recipes || []).map((recipe) => recipe.href),
    ]) {
      const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      assert.match(rowMatch[0], new RegExp(escaped), `${entry.id} lost ${href}`)
    }
  }
})

test("every FCIR case has typed identity identifiers and rejected IDs are not active provenance", () => {
  const register = loadFcirRegister(ROOT)
  const errors = validateFcirRegister(register)
  assert.deepEqual(errors, [])
  const page = fs.readFileSync(path.join(ROOT, register.public_doc), "utf8")
  assert.match(page, /workflow identifier/)
  assert.match(page, /Not established/)
  for (const entry of register.cases) {
    const identity = entry.identity
    assert.ok(identity, `${entry.id} missing identity`)
    for (const field of [
      "scientific_species",
      "material_form",
      "canonical_chemical_name",
      "substance_identifier",
      "identity_at_issue",
      "food_material",
    ]) {
      assert.equal(String(identity[field] || "").trim() === "", false, `${entry.id} ${field} is blank`)
    }
    for (const key of ["fdc_food_id", "fdc_nutrient_id", "doi_or_database"]) {
      const group = identityGroup(identity, key)
      const active = new Set(group.active.map((item) => String(item.id)))
      for (const item of group.rejected) {
        assert.equal(active.has(String(item.id)), false, `${entry.id} lists rejected ${item.id} as active ${key}`)
      }
    }
  }
  for (const id of ["FCIR-014", "FCIR-015", "FCIR-016"]) {
    const entry = caseById(id, register)
    const foods = identityGroup(entry.identity, "fdc_food_id")
    assert.equal(foods.active.length, 0, `${id} must not treat FDC 2003603 as active`)
    assert.equal(
      foods.rejected.some((item) => item.id === "2003603"),
      true,
      `${id} must show FDC 2003603 as a rejected source record`,
    )
    const row = page.match(new RegExp(`<tr id="${entry.anchor}"[\\s\\S]*?</tr>`))
    assert.ok(row, `${id} missing table row`)
    assert.match(row[0], /Rejected identifiers/)
    assert.match(row[0], /FDC 2003603/)
    assert.doesNotMatch(row[0], /Active: FDC food ID — <a[^>]*>FDC 2003603/)
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
