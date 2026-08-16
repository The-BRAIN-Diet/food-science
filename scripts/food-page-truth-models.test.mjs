import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import {
  COMPOSITION_AND_PROVENANCE_CLASSES,
  CONTENT_BOUNDARY_MODEL,
  THREE_SOURCES_OF_TRUTH,
  assertsProvenanceClassesAreNotThreeSourcesOfTruth,
  summarizeFoodPageModels,
} from "./lib/food-page-truth-models.mjs"
import {
  authorisedSpecificationRows,
  editorialSubstanceTags,
  labelsOverlap,
  rowEvidencesCompound,
  tableBackedLabels,
} from "./lib/food-truth-levels.mjs"
import { reconcileFoodPage } from "./lib/food-truth-reconciliation.mjs"
import { isExplainedReferenceLine } from "./lib/bib-citation-format.mjs"
import { auditFoodPage } from "./audit-food-page-layers.mjs"

const ROOT = path.resolve(process.cwd())

function readDoc(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8")
}

test("documentation names all three models distinctly", () => {
  const pageModel = readDoc("system/food-page-model.md")
  const nutrition = readDoc("system/food-nutrition-schema.md")

  assert.match(pageModel, /^# BRAIN Diet Food Page Model: Three Sources of Truth/m)
  assert.match(pageModel, /## Core Model: Three Sources of Truth/)
  for (const layer of THREE_SOURCES_OF_TRUTH.layers) {
    assert.match(pageModel, new RegExp(layer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  }

  assert.match(pageModel, /## Content-boundary model: Intrinsic \/ Mechanism \/ Strategy/)
  for (const layer of CONTENT_BOUNDARY_MODEL.layers) {
    assert.match(pageModel, new RegExp(layer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  }

  assert.match(nutrition, /## Composition and provenance classes/)
  assert.doesNotMatch(nutrition, /^## Three nutritional truth levels/m)
  for (const cls of COMPOSITION_AND_PROVENANCE_CLASSES.classes) {
    assert.match(nutrition, new RegExp(cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  }

  assert.match(
    nutrition,
    /must not\*\* be labelled the .Three Sources of Truth/,
  )
})

test("page model does not rename Three Sources of Truth as provenance classes", () => {
  const pageModel = readDoc("system/food-page-model.md")
  assert.doesNotMatch(
    pageModel,
    /Database table.*standard compositional and extended analytical truth/,
  )
  assert.doesNotMatch(pageModel, /Substances list.*biological\/ontology truth/)
  assert.match(pageModel, /only.*Three Sources of Truth/)
})

test("generated summaries cannot label provenance classes as Three Sources of Truth", () => {
  const summary = summarizeFoodPageModels()
  assert.equal(summary.threeSourcesOfTruth.name, "Three Sources of Truth")
  assert.deepEqual(summary.threeSourcesOfTruth.layers, [
    "Overview",
    "Database nutrition table",
    "Substances list",
  ])
  assert.equal(summary.compositionAndProvenanceClasses.name, "Composition and provenance classes")
  assert.notEqual(summary.compositionAndProvenanceClasses.name, summary.threeSourcesOfTruth.name)
  assert.equal(summary.contentBoundary.name, "Intrinsic / Mechanism / Strategy")
  assert.equal(assertsProvenanceClassesAreNotThreeSourcesOfTruth(summary), true)

  assert.throws(() => {
    assertsProvenanceClassesAreNotThreeSourcesOfTruth({
      ...summary,
      compositionAndProvenanceClasses: {
        name: "Three Sources of Truth",
        classes: summary.compositionAndProvenanceClasses.classes,
      },
    })
  }, /must not share the Three Sources of Truth name/)

  assert.throws(() => {
    assertsProvenanceClassesAreNotThreeSourcesOfTruth({
      ...summary,
      compositionAndProvenanceClasses: {
        name: "Three Sources of Truth (provenance)",
        classes: summary.compositionAndProvenanceClasses.classes,
      },
    })
  }, /must not be labelled the Three Sources of Truth/)
})

test("extended-table caption does not admit unquantified traces to Substances without a table row", () => {
  const table = readDoc("src/components/NutritionTable.tsx")
  const substances = readDoc("src/theme/FoodSubstancesFromTable/index.tsx")
  const renderedExplanatory = `${table}\n${substances}`

  assert.doesNotMatch(
    renderedExplanatory,
    /Unquantified or trace constituents stay in the\s+Substances section/s,
  )
  assert.doesNotMatch(
    renderedExplanatory,
    /stay in the Substances section unless/i,
  )
  assert.doesNotMatch(
    renderedExplanatory,
    /Unquantified or trace constituents stay in the Substances section without a corresponding/i,
  )
  assert.match(
    table,
    /Unquantified or trace constituents are not automatically admitted to the Substances list/,
  )
  assert.match(
    table,
    /Individual fatty acids and other BRAIN-relevant constituents with a defensible quantity or explicit qualitative status/,
  )
  assert.match(table, /Asterisks \(\*\) identify supplementary sources below/)
})

test("almonds Overview highlights match the SR Legacy table values", () => {
  const almonds = readDoc("docs/foods/almonds.md")
  const highlights = almonds.split("## Key Nutritional Highlights")[1]?.split("## ")[0] ?? ""
  assert.match(highlights, /Plant protein 21\.2 g per 100 g/)
  assert.match(highlights, /Fibre \(~12\.5 g\)/)
  assert.match(highlights, /calcium \(~269 mg\)/)
  assert.doesNotMatch(highlights, /~23 g/)
  assert.doesNotMatch(highlights, /~10 g/)
  assert.doesNotMatch(highlights, /~333 mg/)
})

test("nutrition-workflow documents existing commands and does not claim pipeline fetches", () => {
  const workflow = readDoc("system/nutrition-workflow.md")
  assert.match(workflow, /npm run nutrition:fetch/)
  assert.match(workflow, /npm run nutrition:enrich/)
  assert.match(workflow, /npm run nutrition:apply/)
  assert.match(workflow, /npm run nutrition:repair/)
  assert.match(workflow, /nutrition:apply -- --all && npm run nutrition:repair/)
  assert.match(workflow, /does \*\*not\*\* run Script A/)
  assert.match(workflow, /curated lookup/)
  assert.match(workflow, /salmon–astaxanthin/)
  assert.match(workflow, /overview-enrichment-review\.json/)
  assert.match(workflow, /nutrition:reconcile-layers/)
})

test("algal oil uses EU authorised specifications rather than a USDA substitute", () => {
  const raw = readDoc("docs/foods/algal-oil.md")
  const {data: fm, content} = matter(raw)
  const nutrition = fm.nutrition_per_100g || {}
  const source = fm.nutrition_source || {}
  const spec = fm.nutrition_authorised_specifications || {}
  const rows = Array.isArray(spec.rows) ? spec.rows : []

  assert.equal(Object.keys(nutrition).length, 0)
  assert.equal(source.fdc_id, undefined)
  assert.equal(source.food_name, undefined)
  assert.doesNotMatch(JSON.stringify(nutrition), /canola/i)
  assert.doesNotMatch(raw, /Oil, canola/)
  assert.doesNotMatch(raw, /fdc_id:\s*748278/)
  assert.doesNotMatch(raw, /100[–-]300 mg DHA/)
  assert.equal(nutrition.dha_mg, undefined)
  assert.equal(nutrition.epa_mg, undefined)
  assert.doesNotMatch(JSON.stringify(nutrition), /30000|10000/)

  assert.match(spec.title, /Representative authorised algal-oil specifications/)
  assert.match(
    spec.caption,
    /regulatory minimum specifications, not averages, measured ranges or guaranteed values/,
  )
  assert.equal(
    spec.source_url,
    "https://eur-lex.europa.eu/eli/reg_impl/2017/2470/2024-09-25/eng",
  )
  assert.equal(spec.accessed, "2026-08-16")
  assert.match(spec.source_name, /2017\/2470/)
  assert.equal(rows.length, 3)
  assert.equal(rows[0].formulation, "DHA-rich Schizochytrium oil")
  assert.equal(rows[0].dha, "≥32 g/100 g oil")
  assert.equal(rows[0].epa, "Not specified")
  assert.deepEqual(rows[0].supports, ["DHA"])
  assert.equal(rows[1].dha, "≥35 g/100 g oil")
  assert.equal(rows[1].epa, "Not specified")
  assert.deepEqual(rows[1].supports, ["DHA"])
  assert.equal(rows[2].formulation, "DHA/EPA-rich Schizochytrium oil")
  assert.equal(rows[2].dha, "≥15 g/100 g oil")
  assert.equal(rows[2].epa, "≥10 g/100 g oil")
  assert.deepEqual(rows[2].supports, ["DHA", "EPA"])

  const overview = content.split("## Overview")[1]?.split("## ")[0] ?? ""
  assert.match(overview, /vegetarian source of the long-chain omega-3 DHA/)
  assert.match(overview, /EPA content is often absent or comparatively low/)
  assert.match(overview, /product label is needed/)
  assert.doesNotMatch(overview, /phosphatidylcholine|membrane|signalling|transport/i)

  assert.match(content, /DHA is the principal/)
  assert.match(content, /formulation-specific/)
  assert.match(content, /not assumed to be present in meaningful amounts in DHA-focused oils/)

  const tags = editorialSubstanceTags(fm)
  assert.ok(tags.includes("DHA"))
  assert.ok(tags.includes("EPA"))
  const labels = tableBackedLabels(fm)
  assert.ok(labels.filter((label) => labelsOverlap(label, "DHA")).length >= 2)
  assert.equal(labels.filter((label) => labelsOverlap(label, "EPA")).length, 1)
  const specRows = authorisedSpecificationRows(fm)
  assert.equal(specRows.filter((row) => labelsOverlap(row.label, "DHA")).length, 3)
  assert.equal(specRows.filter((row) => labelsOverlap(row.label, "EPA")).length, 1)

  const result = reconcileFoodPage(fm, {substanceLookup: [], markdownBody: content})
  assert.deepEqual(result.substancesMissingFromTables, [])
  assert.deepEqual(result.tableRowsMissingSupport, [])
  assert.deepEqual(result.overviewCompoundsMissingFromTables, [])

  const refLines = content
    .split("## References")[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\[\d+\]/.test(line))
  assert.equal(refLines.length, 2)
  for (const line of refLines) {
    assert.equal(isExplainedReferenceLine(line), true, line)
  }
  assert.match(refLines[0], /eu_2017_2470_union_list/)
  assert.match(refLines[1], /nih_omega3_factsheet_consumer/)
})

test("authorised specification tables are confined to algal oil", () => {
  const foodsDir = path.join(ROOT, "docs/foods")
  const files = fs.readdirSync(foodsDir).filter((name) => name.endsWith(".md"))
  const withSpecs = []
  for (const file of files) {
    const raw = fs.readFileSync(path.join(foodsDir, file), "utf8")
    if (/nutrition_authorised_specifications:/.test(raw)) withSpecs.push(file)
  }
  assert.deepEqual(withSpecs, ["algal-oil.md"])
})

test("USDA fetch, enrich, and apply skip algal oil so canola cannot be substituted", () => {
  const fetchSrc = readDoc("scripts/fetch-usda-nutrition.mjs")
  const enrichSrc = readDoc("scripts/enrich-nutrition-from-overview.mjs")
  const applySrc = readDoc("scripts/update-food-page-frontmatter.mjs")
  for (const src of [fetchSrc, enrichSrc, applySrc]) {
    assert.match(src, /new Set\(\["index", "shopping-list", "algal-oil"\]\)/)
  }
  const table = readDoc("src/components/NutritionTable.tsx")
  assert.match(table, /Representative authorised algal-oil specifications|"Representative authorised specifications"/)
  assert.match(table, /regulatory product specifications, not USDA/)
})

test("aubergine Delphinidin card is qualified as parent aglycone glycosides", () => {
  const raw = readDoc("docs/foods/aubergine.md")
  const {data: fm} = matter(raw)
  assert.equal(
    fm.substance_card_captions.Delphinidin,
    "Parent aglycone; present principally as glycosides including nasunin.",
  )
  const row = (fm.nutrition_supplementary_sources || []).find((item) => item.label === "Delphinidin")
  assert.ok(row)
  assert.match(row.amount_display, /Present as glycosides \(nasunin\)/)
  assert.equal(row.notes, "Parent aglycone; present principally as glycosides including nasunin.")
  assert.ok(rowEvidencesCompound(row, "nasunin"))
  const substances = readDoc("src/theme/FoodSubstancesFromTable/index.tsx")
  assert.match(substances, /substance_card_captions/)
  assert.match(substances, /caption \|\|/)
})

test("aubergine nasunin is not an Overview → table gap once the glycoside row exists", () => {
  const raw = readDoc("docs/foods/aubergine.md")
  const {data: fm, content} = matter(raw)
  const result = reconcileFoodPage(fm, {substanceLookup: [], markdownBody: content})
  assert.ok(!result.overviewCompoundsMissingFromTables.some((item) => /nasunin/i.test(item)))
  const audit = auditFoodPage(fm, content, {substanceLookup: []})
  const nasunin = audit.findings.filter((item) => /nasunin/i.test(item.entity))
  assert.equal(nasunin.length, 1)
  assert.equal(nasunin[0].class, "Presence resolved — remaining quantity/ontology gap")
  assert.match(nasunin[0].evidence, /not an Overview → table gap/i)
  assert.match(nasunin[0].evidence, /no defensible quantity or range/i)
  assert.match(nasunin[0].evidence, /no canonical substance page/i)
  assert.equal(
    audit.findings.some((item) => item.entity === "nasunin" && item.class === "Overview → table gap"),
    false,
  )
  const queue = JSON.parse(readDoc("scripts/out/food-layer-a-research-queue.json"))
  const nasuninQueue = queue.items.find((item) => item.food === "Aubergine")
  assert.equal(nasuninQueue.class, "Presence resolved — remaining quantity/ontology gap")
  assert.match(nasuninQueue.not, /Overview → table gap/)
})
