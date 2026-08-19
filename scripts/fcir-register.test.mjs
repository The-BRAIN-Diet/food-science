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
  PINNED_GSRS_SUBSTANCES,
  PINNED_REJECTED_GSRS_SUBSTANCES,
  GSRS_UNII_URL_PREFIX,
  GSRS_SEARCH_RULE,
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
  assert.match(generated, /<table className="fcir-table fcir-table-preview">/)
  assert.equal((generated.match(/id="fcir-001"/g) || []).length, 1)
  assert.doesNotMatch(generated, /## Case records/)
  assert.doesNotMatch(generated, /### FCIR-\d{3}/)
  const mainTable = generated.match(/<table className="fcir-table">[\s\S]*?<\/table>/)
  assert.ok(mainTable, "missing main register table")
  const seen = new Set()
  for (const entry of register.cases) {
    assert.match(entry.id, /^FCIR-\d{3}$/, entry.id)
    assert.equal(entry.anchor, entry.id.toLowerCase(), entry.id)
    assert.equal(seen.has(entry.id), false, `duplicate case ID ${entry.id}`)
    seen.add(entry.id)
    const rowId = new RegExp(`<tr id="${entry.anchor}" className="fcir-row">`)
    assert.match(generated, rowId, `${entry.id} missing table-row anchor`)
    assert.equal((generated.match(rowId) || []).length, 1, `${entry.id} row anchor must appear once`)
    assert.equal(
      (mainTable[0].match(new RegExp(`<strong>${entry.id}</strong>`, "g")) || []).length,
      1,
      `${entry.id} must appear once as the row identifier`,
    )
  }
})

test("the FCIR page uses a page-specific full-width layout, not a global container change", () => {
  const register = loadFcirRegister(ROOT)
  const page = matter(fs.readFileSync(path.join(ROOT, register.public_doc), "utf8"))
  const css = fs.readFileSync(path.join(ROOT, "src/css/custom.css"), "utf8")
  const layout = fs.readFileSync(path.join(ROOT, "src/theme/DocRoot/Layout/index.tsx"), "utf8")
  const rootBlock = css.match(/:root \{[\s\S]*?\n\}/)?.[0] || ""
  assert.equal(page.data.hide_table_of_contents, true)
  assert.match(layout, /fcir-dashboard-page/)
  assert.match(layout, /food-composition-interpretation-register/)
  assert.match(css, /html\[class\*="docs-doc-id-"\]\[class\*="food-composition-interpretation-register"\]/)
  assert.match(css, /\.fcir-dashboard-page \.theme-doc-sidebar-container/)
  assert.match(css, /html\[class\*="docs-doc-id-"\]\[class\*="food-composition-interpretation-register"\] main/)
  assert.match(css, /html\[class\*="docs-doc-id-"\]\[class\*="food-composition-interpretation-register"\] main \.container/)
  assert.doesNotMatch(rootBlock, /--ifm-container-width/)
  assert.doesNotMatch(css, /\.navbar\s*\{[^}]*display:\s*none/)
  assert.doesNotMatch(css, /(?:^|\n)\.theme-doc-sidebar-container \{/)
})

test("FCIR table columns use the public pixel widths", () => {
  const css = fs.readFileSync(path.join(ROOT, "src/css/custom.css"), "utf8")
  assert.doesNotMatch(css, /min-width:\s*124rem/)
  assert.match(css, /table-layout:\s*fixed/)
  assert.match(css, /\.fcir-col-id \{\s*width: 90px;/)
  assert.match(css, /\.fcir-col-food \{\s*width: 180px;/)
  assert.match(css, /\.fcir-col-issue \{\s*width: 220px;/)
  assert.match(css, /\.fcir-col-unii \{\s*width: 260px;/)
  assert.match(css, /\.fcir-col-ids \{\s*width: 350px;/)
  assert.match(css, /\.fcir-col-problem \{\s*width: 240px;/)
  assert.match(css, /\.fcir-col-decision \{\s*width: 340px;/)
  assert.match(css, /\.fcir-col-evidence \{\s*width: 320px;/)
  assert.match(css, /\.fcir-col-status \{\s*width: 100px;/)
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
  assert.match(page, /## Why identity matters/)
  assert.match(page, /## How to read a case/)
  assert.match(page, /## Provenance/)
  assert.match(page, /In eventual clinical trials, the BRAIN Diet needs to exercise precision nutrition/)
  assert.match(page, /fcir-table-preview/)
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

test("verified GSRS/UNII mappings stay pinned and are not Not established", () => {
  const register = loadFcirRegister(ROOT)
  const page = fs.readFileSync(path.join(ROOT, register.public_doc), "utf8")
  const generated = extractGeneratedBlock(page)
  assert.match(generated, /<th className="fcir-col-unii">Substance\/UNII<\/th>/)
  assert.equal(PINNED_GSRS_SUBSTANCES.length, 7)
  const placements = [
    ["FCIR-001", "OF5P57N2ZX", "Alanine"],
    ["FCIR-001", "0RBV727H71", "Alpha-linolenic acid"],
    ["FCIR-002", "0RBV727H71", "Alpha-linolenic acid"],
    ["FCIR-002", "78YC2MAX4O", "GLA/gamolenic acid"],
    ["FCIR-003", "0RBV727H71", "Alpha-linolenic acid"],
    ["FCIR-004", "0RBV727H71", "Alpha-linolenic acid"],
    ["FCIR-005", "0RBV727H71", "Alpha-linolenic acid"],
    ["FCIR-005", "78YC2MAX4O", "GLA/gamolenic acid"],
    ["FCIR-007", "0RBV727H71", "Alpha-linolenic acid"],
    ["FCIR-009", "AAN7QOV9EA", "EPA/icosapent"],
    ["FCIR-009", "ZAD9OKH9JC", "DHA/doconexent"],
    ["FCIR-010", "AAN7QOV9EA", "EPA/icosapent"],
    ["FCIR-010", "ZAD9OKH9JC", "DHA/doconexent"],
    ["FCIR-010", "NS3OZT14QT", "DPA/clupanodonic acid"],
    ["FCIR-010", "2K2DJ01BB7", "PUFA 20:4 n‑3 / bishomostearidonic acid"],
    ["FCIR-016", "GZ8VF4M2J8", "Cordycepin"],
    ["FCIR-016", "K72T3FS567", "Adenosine"],
    ["FCIR-018", "0RBV727H71", "Alpha-linolenic acid"],
    ["FCIR-020", "0RBV727H71", "Alpha-linolenic acid"],
  ]
  for (const [caseId, unii, display] of placements) {
    const entry = caseById(caseId, register)
    const mappings = entry.identity.gsrs_mappings || []
    const hit = mappings.find((item) => item.unii === unii)
    assert.ok(hit, `${caseId} lost verified UNII ${unii}`)
    assert.notEqual(hit.unii, undefined)
    assert.notEqual(String(entry.identity.substance_identifier), "Not established", caseId)
    assert.equal(hit.href, `${GSRS_UNII_URL_PREFIX}${unii}`, caseId)
    const row = generated.match(new RegExp(`<tr id="${entry.anchor}"[\\s\\S]*?</tr>`))
    assert.ok(row, `${caseId} missing row`)
    assert.match(row[0], new RegExp(display.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    assert.match(row[0], new RegExp(unii))
    assert.match(row[0], new RegExp(GSRS_UNII_URL_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + unii))
  }
  const fcir001 = generated.match(/<tr id="fcir-001"[\s\S]*?<\/tr>/)[0]
  assert.match(fcir001, /Alanine\/<a href="https:\/\/precision\.fda\.gov\/uniisearch\/srs\/unii\/OF5P57N2ZX">OF5P57N2ZX<\/a>/)
  assert.match(fcir001, /Alpha-linolenic acid\/<a href="https:\/\/precision\.fda\.gov\/uniisearch\/srs\/unii\/0RBV727H71">0RBV727H71<\/a>/)
  assert.match(fcir001, /Beta-alanine\/<a href="https:\/\/precision\.fda\.gov\/uniisearch\/srs\/unii\/11P2JDE17B">11P2JDE17B<\/a>/)
  assert.match(fcir001, /Phenylalanine\/<a href="https:\/\/precision\.fda\.gov\/uniisearch\/srs\/unii\/47E5O17Y3R">47E5O17Y3R<\/a>/)
  const fcir001Entry = caseById("FCIR-001", register)
  for (const rejected of PINNED_REJECTED_GSRS_SUBSTANCES) {
    const hit = (fcir001Entry.identity.gsrs_mappings || []).find((item) => item.unii === rejected.unii)
    assert.ok(hit, `FCIR-001 lost rejected UNII ${rejected.unii}`)
    assert.equal(hit.role, "Rejected identity", rejected.display_name)
    assert.equal(hit.preferred_name, rejected.preferred_name)
    assert.match(fcir001, new RegExp(rejected.unii))
  }
  const fcir002 = generated.match(/<tr id="fcir-002"[\s\S]*?<\/tr>/)[0]
  assert.match(fcir002, /unresolvable from the source field; neither UNII is assignable/)
  const fcir016 = generated.match(/<tr id="fcir-016"[\s\S]*?<\/tr>/)[0]
  assert.match(fcir016, /does not establish presence in an undeclared Cordyceps product/)
  for (const pinned of PINNED_GSRS_SUBSTANCES) {
    const catalogHit = Object.values(register.gsrs_catalog).find((item) => item.unii === pinned.unii)
    assert.ok(catalogHit, `catalog missing ${pinned.unii}`)
    assert.equal(catalogHit.preferred_name, pinned.preferred_name)
  }
})

test("GSRS mappings use chemical identity rather than FDC nutrient numbers", () => {
  const register = loadFcirRegister(ROOT)
  const page = fs.readFileSync(path.join(ROOT, register.public_doc), "utf8")
  assert.equal(register.editorial.gsrs_search_rule, GSRS_SEARCH_RULE)
  assert.match(page, /GSRS searches operate on canonical substance identity, structure, CAS number and synonyms/)
  assert.match(page, /FDC numbers belong only in the composition-source field/)
  const fcir010 = caseById("FCIR-010", register)
  const mappings = fcir010.identity.gsrs_mappings || []
  const n3_20_3 = mappings.find((item) => /20:3 n/.test(item.display_name || ""))
  const n3_20_4 = mappings.find((item) => /20:4 n/.test(item.display_name || ""))
  const dpa = mappings.find((item) => item.unii === "NS3OZT14QT")
  assert.ok(n3_20_3, "FCIR-010 must name PUFA 20:3 n-3 by its USDA chemical identity")
  assert.doesNotMatch(n3_20_3.display_name, /USDA nutrient 1405|FDC nutrient/)
  assert.equal(n3_20_3.unii, undefined, "1405 is 20:3 n-3 and must not inherit the 22:5 n-3 UNII")
  assert.equal(n3_20_3.role, "No public GSRS match located")
  assert.match(n3_20_3.note, /17046-59-2/)
  assert.doesNotMatch(n3_20_3.note || "", /No public GSRS match located merely because/)
  assert.ok(n3_20_4, "FCIR-010 must name PUFA 20:4 n-3 by its USDA chemical identity")
  assert.equal(n3_20_4.unii, "2K2DJ01BB7")
  assert.equal(n3_20_4.preferred_name, "BISHOMOSTEARIDONIC ACID")
  assert.notEqual(n3_20_4.unii, "NS3OZT14QT")
  assert.notEqual(n3_20_4.unii, "7S686LQT6T")
  assert.match(n3_20_4.note, /Osbond acid, 7S686LQT6T/)
  assert.ok(dpa, "FCIR-010 must keep 22:5 n-3 on clupanodonic acid")
  assert.equal(dpa.preferred_name, "CLUPANODONIC ACID")
  const nutrients = identityGroup(fcir010.identity, "fdc_nutrient_id")
  assert.equal(nutrients.active.find((item) => item.id === "1405")?.label, "PUFA 20:3 n‑3")
  assert.equal(nutrients.active.find((item) => item.id === "1407")?.label, "PUFA 20:4 n‑3")
  assert.equal(nutrients.active.find((item) => item.id === "1280")?.label, "PUFA 22:5 n‑3 (DPA)")
  const row = page.match(/<tr id="fcir-010"[\s\S]*?<\/tr>/)[0]
  assert.match(row, /2K2DJ01BB7/)
  assert.doesNotMatch(row, /USDA nutrient 1405/)
  assert.doesNotMatch(row, /USDA nutrient 1407/)
  const eta = Object.values(register.gsrs_catalog).find((item) => item.unii === "2K2DJ01BB7")
  assert.equal(eta.preferred_name, "BISHOMOSTEARIDONIC ACID")
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
