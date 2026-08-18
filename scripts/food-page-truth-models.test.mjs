import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
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
import { isFoodReferenceLine } from "./lib/bib-citation-format.mjs"
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

test("almonds Overview is the A-food calibration example and does not recommend grains as a lysine complement", () => {
  const raw = readDoc("docs/foods/almonds.md")
  const {data: fm, content} = matter(raw)
  const overview = content.split("## Overview")[1]?.split("## ")[0] ?? ""
  assert.match(overview, /nutrient-dense source of \*\*vitamin E\*\*/)
  assert.match(overview, /substituting almonds for refined snack foods/)
  assert.match(overview, /varied protein pattern rather than be treated as a complete protein source/)
  assert.doesNotMatch(overview, /25\.63/)
  assert.doesNotMatch(overview, /56 g/)
  assert.doesNotMatch(overview, /1\.5 oz/)
  assert.doesNotMatch(overview, /43 g/)
  assert.doesNotMatch(overview, /four weeks/)
  assert.doesNotMatch(overview, /legumes or grains/)
  assert.doesNotMatch(content, /Pair with legumes or grains/)
  assert.match(fm.complementary_pairings, /Legumes for lysine complementarity/)
  assert.match(fm.complementary_pairings, /grains are themselves typically lysine-limited/)
  assert.match(content, /grains are typically lysine-limited/)
})

test("almonds Highlights are takeaways and the SR Legacy table keeps the calibrated quantities", () => {
  const raw = readDoc("docs/foods/almonds.md")
  const {data: fm, content} = matter(raw)
  const highlights = content.split("## Key Nutritional Highlights")[1]?.split("## ")[0] ?? ""
  const overview = content.split("## Overview")[1]?.split("## ")[0] ?? ""
  assert.match(highlights, /Rich in \*\*vitamin E\*\*, magnesium, fibre and unsaturated fats/)
  assert.match(highlights, /Substituting almonds for refined snacks/)
  assert.match(highlights, /practical whole-food snack that can support satiety/)
  assert.match(highlights, /relatively low in lysine/)
  assert.doesNotMatch(highlights, /56 g/)
  assert.doesNotMatch(highlights, /1\.5 oz/)
  assert.doesNotMatch(highlights, /43 g/)
  assert.doesNotMatch(highlights, /25\.63/)
  assert.doesNotMatch(highlights, /21\.2 g/)
  assert.doesNotMatch(overview, /56 g/)
  assert.equal(fm.nutrition_per_100g.protein_g, 21.15)
  assert.equal(fm.nutrition_per_100g.fibre_g, 12.5)
  assert.equal(fm.nutrition_per_100g.calcium_mg, 269)
  assert.equal(fm.nutrition_per_100g.vitamin_e_mg, 25.63)
  const refs = content.split("## References")[1] ?? ""
  assert.match(refs, /56 g almonds\/day/)
  assert.match(refs, /1\.5 oz almonds\/day/)
  assert.match(refs, /43 g almonds\/day/)
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
  assert.equal(refLines.length, 3)
  for (const line of refLines) {
    assert.equal(isFoodReferenceLine(line), true, line)
  }
  assert.match(refLines[0], /eu_2017_2470_union_list/)
  assert.match(refLines[1], /arterburn_algal_2008/)
  assert.match(refLines[2], /nih_omega3_factsheet_consumer/)
  assert.match(content, /absorbed similarly to DHA from cooked salmon/)
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
  const nasuninQueue = queue.items.find(
    (item) => item.food === "Aubergine" && /nasunin/i.test(item.compound),
  )
  assert.equal(nasuninQueue.class, "Presence resolved — remaining quantity/ontology gap")
  assert.match(nasuninQueue.not, /Overview → table gap/)
  const cgaQueue = queue.items.find(
    (item) => item.food === "Aubergine" && /chlorogenic/i.test(item.compound),
  )
  assert.equal(cgaQueue.class, "Presence resolved — remaining quantity/ontology gap")
  assert.match(cgaQueue.not, /Overview → table gap/)
})

test("A-food calibration rules are documented in canonical rule files", () => {
  const pageModel = readDoc("system/food-page-model.md")
  const schema = readDoc("system/food-page-schema.md")
  const nutrition = readDoc("system/food-nutrition-schema.md")
  const workflow = readDoc("system/nutrition-workflow.md")
  const shapes = readDoc("system/food-page-frontmatter-shapes.md")
  const all = `${pageModel}\n${schema}\n${nutrition}\n${workflow}\n${shapes}`

  assert.match(pageModel, /Every rendered Substances card must resolve to a corresponding rendered quantitative or explicit qualitative table row/)
  assert.match(pageModel, /hidden\/internal composition record does not satisfy/)
  assert.match(pageModel, /Ordinary background nutrients should generally remain table-only/)
  assert.match(pageModel, /Compositional presence alone is insufficient/)
  assert.match(pageModel, /must \*\*not\*\* automatically create Substance pages/)
  assert.match(pageModel, /merits ontology admission \*\*before\*\* treating a missing canonical page as a blocker/)
  assert.match(pageModel, /Not every chemical noun/)
  assert.match(pageModel, /must match the \*\*rendered\*\* nutrition table and its displayed rounding/)
  assert.match(pageModel, /Lack of a per-100 g quantity does not automatically prevent later ontology admission/)
  assert.match(pageModel, /Parent compounds, aglycones, glycosides, and derivatives must not be treated as interchangeable/)
  assert.match(pageModel, /must not be inserted into the generic Substance page description/)
  assert.match(pageModel, /aubergine may link to Delphinidin only as the parent aglycone/)
  assert.match(pageModel, /Do not assign values from a substitute or superficially similar USDA food/)
  assert.match(pageModel, /EPA must not be represented as universal to algal oil/)
  assert.match(pageModel, /Presence unresolved/)
  assert.match(pageModel, /Presence resolved, quantity unresolved/)
  assert.match(pageModel, /Quantity resolved, ontology admission unresolved/)
  assert.match(pageModel, /Parent\/derivative mapping unresolved/)
  assert.match(pageModel, /Canonical Substance page absent/)
  assert.match(pageModel, /Scope or formulation ambiguity/)
  assert.match(pageModel, /must \*\*not\*\* continue to be reported as an Overview → table gap/)
  assert.match(pageModel, /Food BRS Matrix \(deferred\)/)
  assert.match(pageModel, /must not be deleted from food pages before a Food BRS Matrix destination is defined/)
  assert.match(pageModel, /## Food-index descriptions/)
  assert.doesNotMatch(pageModel, /Every compound in the table appears in the substances list/)

  assert.match(schema, /Key Nutritional Highlights is a summary attached to Overview, not a fourth source of truth/)
  assert.match(schema, /Does not create Substance pages/)
  assert.match(schema, /only by the exact citation key/)
  assert.match(schema, /never\*\* borrow another entry/)
  assert.match(nutrition, /must not\*\* be labelled the .Three Sources of Truth/)
  assert.match(nutrition, /composition store is not a second/)
  assert.match(nutrition, /canola for algal oil/)
  assert.match(nutrition, /at least one valid rendered compositional representation/)
  assert.match(nutrition, /populated USDA-shaped `nutrition_per_100g` block is \*\*not\*\* universally required/)
  assert.match(nutrition, /implementation compatibility field/)
  assert.match(nutrition, /must \*\*not\*\* be described as the compositional source or as the canonical requirement/)
  assert.match(nutrition, /whichever valid representation the page uses/)
  assert.match(schema, /at least one valid compositional representation/)
  assert.match(schema, /empty `nutrition_per_100g: \{\}` may exist for component compatibility/)
  assert.doesNotMatch(shapes, /Required for nutrition-layer pages/)
  assert.match(shapes, /Empty `\{\}` is compatibility only, not the compositional source/)
  assert.match(workflow, /must not\*\* automatically create Substance pages/)
  assert.match(workflow, /supported qualitative row is \*\*not\*\* an Overview → table gap/)
  assert.match(workflow, /rendered compositional representation/)
  assert.match(all, /Intrinsic \/ Mechanism \/ Strategy/)
  assert.doesNotMatch(pageModel, /## Food BRS Matrix$/)
  assert.doesNotMatch(schema, /## Food BRS Matrix/)
})

test("compositional representation is a one-of rule, not a universal nutrition_per_100g requirement", () => {
  const nutrition = readDoc("system/food-nutrition-schema.md")
  const schema = readDoc("system/food-page-schema.md")
  const shapes = readDoc("system/food-page-frontmatter-shapes.md")
  const pageModel = readDoc("system/food-page-model.md")
  const workflow = readDoc("system/nutrition-workflow.md")
  const docs = `${nutrition}\n${schema}\n${shapes}\n${pageModel}\n${workflow}`

  assert.doesNotMatch(nutrition, /All food pages MUST define a nutrition block/)
  assert.match(nutrition, /## Compositional representation \(one-of\)/)
  assert.match(nutrition, /Standard database composition/)
  assert.match(nutrition, /Authorised \/ specification-based composition/)
  assert.match(nutrition, /Supported qualitative composition/)
  assert.match(
    nutrition,
    /Every rendered Substance card must still resolve to a \*\*rendered row\*\* in whichever valid representation/,
  )
  assert.match(pageModel, /populated USDA-shaped `nutrition_per_100g` block is not universally required/)
  assert.match(pageModel, /empty `nutrition_per_100g: \{\}` is compatibility only and is not the compositional source/)
  assert.match(pageModel, /Every rendered Substance card must resolve to a rendered row in the representation actually used/)
  assert.match(shapes, /at least one\*\* valid compositional representation/)
  assert.match(workflow, /not necessarily a populated USDA-shaped `nutrition_per_100g` block/)
  assert.match(workflow, /implementation compatibility field/)
  assert.doesNotMatch(docs, /nutrition_per_100g is the canonical requirement/)
})

test("Script B and letter-audit enums remain separate", () => {
  const workflow = readDoc("system/nutrition-workflow.md")
  const pageModel = readDoc("system/food-page-model.md")

  assert.match(workflow, /Two workflow enums remain separate/)
  assert.match(workflow, /Evidence-verification decision/)
  assert.match(workflow, /`verified`, `unsupported`, `ambiguous`, `requires-review`/)
  assert.match(workflow, /Letter audit/)
  assert.match(workflow, /Reconciliation state/)
  assert.match(workflow, /They should eventually have an explicit mapping/)
  assert.match(workflow, /do not need to become one enum/)
  assert.match(pageModel, /different enum\*\* from Script B/)
  assert.match(pageModel, /remain separate for now/)
  assert.match(pageModel, /do not need to become one enum/)
  assert.match(pageModel, /third\*\* schema/)
  assert.match(workflow, /editorial records/)
  assert.doesNotMatch(workflow, /single shared enum/)
  assert.doesNotMatch(pageModel, /must be merged into one enum/)
})

test("amaranth is lysine-rich relative to cereals and cites USDA for minerals", () => {
  const raw = readDoc("docs/foods/amaranth.md")
  const {data: fm, content} = matter(raw)
  assert.doesNotMatch(raw, /lysine-limited like other grains/i)
  assert.doesNotMatch(raw, /balanced but lysine-limited/)
  assert.doesNotMatch(raw, /Lysine \(typical of grains\)/)
  assert.match(content, /comparatively lysine-rich/)
  assert.match(fm.amino_acid_strengths, /lysine-rich relative to conventional cereals/i)
  assert.match(fm.limiting_amino_acids, /No universal limiting amino acid/)
  assert.match(fm.nutrition_source.database, /USDA FoodData Central/)
  assert.match(fm.nutrition_source.food_name, /Amaranth grain, uncooked/)
  assert.doesNotMatch(raw, /mariotti_dietary_2019/)
  assert.match(raw, /amare_amaranth_2015/)
  assert.match(raw, /jan_amaranth_quinoa_2023/)
  assert.match(raw, /hejazi_amaranth_malting_2016/)
  assert.match(content, /popping reduced total lysine by about 36%/i)
  assert.match(content, /Nitrate data from amaranth leaves should not be applied/)
  const phytate = (fm.nutrition_supplementary_sources || []).find((item) => item.label === "Phytate")
  const oxalate = (fm.nutrition_supplementary_sources || []).find((item) => item.label === "Oxalate")
  assert.ok(phytate)
  assert.ok(oxalate)
  assert.match(phytate.amount_display, /Present — quantity not established/)
  assert.equal(phytate.public_display, "table")
  assert.equal(oxalate.public_display, "table")
  assert.equal(
    editorialSubstanceTags(fm).some((tag) => /phytate|oxalate/i.test(tag)),
    false,
  )
  const refLines = content
    .split("## References")[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\[\d+\]/.test(line))
  for (const line of refLines) {
    assert.equal(isFoodReferenceLine(line), true, line)
  }
})

test("almonds use almond-specific evidence and do not claim soaking improves mineral bioavailability", () => {
  const raw = readDoc("docs/foods/almonds.md")
  const {content} = matter(raw)
  assert.doesNotMatch(content, /Soak or sprout to reduce phytates/)
  assert.match(content, /not support soaking as a mineral-bioavailability strategy/)
  assert.match(raw, /jung_almonds_vitamin_e_2018/)
  assert.match(raw, /berryman_almonds_2015/)
  assert.match(raw, /tan_almonds_2013/)
  assert.match(raw, /kumari_activating_nuts_2020/)
  assert.match(raw, /taylor_activating_almonds_2018/)
  assert.doesNotMatch(raw, /packer_vitamin_1997/)
  assert.doesNotMatch(raw, /sun_association_2019/)
  const refLines = content
    .split("## References")[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\[\d+\]/.test(line))
  for (const line of refLines) {
    assert.equal(isFoodReferenceLine(line), true, line)
  }
})

test("asparagus treats edible-spear inulin-type fructans as present, not USDA FOS", () => {
  const raw = readDoc("docs/foods/asparagus.md")
  const {data: fm, content} = matter(raw)
  assert.doesNotMatch(raw, /allium-family/)
  assert.doesNotMatch(content, /other prebiotic-rich vegetables/)
  assert.doesNotMatch(content, /remains unresolved/)
  assert.doesNotMatch(raw, /schmidt_prebiotic_2015/)
  assert.doesNotMatch(raw, /kennedy_b_2016/)
  assert.doesNotMatch(raw, /yeo_influence_2023/)
  assert.doesNotMatch(content, /Human prebiotic trials report measurable effects/)
  assert.match(raw, /goni_asparagus_spear_2024/)
  assert.match(raw, /redondo_cuenca_asparagus_2023/)
  const overview = content.split("## Overview")[1]?.split("## ")[0] ?? ""
  assert.match(overview, /modest amounts of \*\*inulin-type fructans\*\*/)
  assert.match(overview, /not be treated as the composition of the vegetable as eaten/)
  assert.doesNotMatch(overview, /Goñi et al/)
  assert.doesNotMatch(overview, /Redondo-Cuenca/)
  assert.doesNotMatch(overview, /DP3\/DP4/)
  assert.doesNotMatch(overview, /dry weight/)
  const row = (fm.nutrition_supplementary_sources || []).find(
    (item) => item.label === "Inulin-type fructans",
  )
  assert.ok(row)
  assert.match(
    row.amount_display,
    /Present in edible spear; fresh-weight quantity not established for this page/,
  )
  assert.equal(row.public_display, "table")
  assert.match(row.source_note, /root only/)
  assert.match(row.source_note, /DP3\/DP4/)
  assert.match(row.notes, /Do not use root concentrations as spear values/)
  assert.equal(
    editorialSubstanceTags(fm).some((tag) => /fructan|fos|inulin/i.test(tag)),
    false,
  )
  const highlights = content.split("## Key Nutritional Highlights")[1]?.split("## ")[0] ?? ""
  assert.doesNotMatch(highlights, /FOS\*\* prebiotic fibre occurs/)
  const queue = JSON.parse(readDoc("scripts/out/food-layer-a-research-queue.json"))
  const fructanQueue = queue.items.find((item) => item.food === "Asparagus")
  assert.equal(fructanQueue.class, "Presence resolved — remaining quantity/ontology gap")
  assert.match(fructanQueue.not, /Overview → table gap/)
})

test("apples pectin presence is evidenced without a USDA-style quantity", () => {
  const raw = readDoc("docs/foods/apples.md")
  const {data: fm, content} = matter(raw)
  assert.doesNotMatch(content, /remains unresolved/)
  assert.doesNotMatch(content, /3\.2 g/)
  assert.doesNotMatch(raw, /holland_plant_2020/)
  assert.match(raw, /liu_apple_pectin_2023/)
  const row = (fm.nutrition_supplementary_sources || []).find((item) => item.label === "Pectin")
  assert.ok(row)
  assert.match(row.amount_display, /Present — quantity not established/)
  assert.equal(row.public_display, "table")
  assert.equal(
    editorialSubstanceTags(fm).some((tag) => /pectin/i.test(tag)),
    false,
  )
  const result = reconcileFoodPage(fm, {substanceLookup: [], markdownBody: content})
  assert.ok(!result.overviewCompoundsMissingFromTables.some((item) => /pectin/i.test(item)))
  const queue = JSON.parse(readDoc("scripts/out/food-layer-a-research-queue.json"))
  const pectinQueue = queue.items.find((item) => item.food === "Apples" && /pectin/i.test(item.compound))
  assert.equal(pectinQueue.class, "Presence resolved — remaining quantity/ontology gap")
  assert.match(pectinQueue.not, /Overview → table gap/)
  const refLines = content
    .split("## References")[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\[\d+\]/.test(line))
  assert.equal(refLines.length, 3)
  for (const line of refLines) {
    assert.equal(isFoodReferenceLine(line), true, line)
  }
  assert.doesNotMatch(raw, /gruber_impact_2023/)
  assert.doesNotMatch(raw, /boots_health_2008/)
  assert.doesNotMatch(raw, /yeo_influence_2023/)
  assert.doesNotMatch(raw, /phytate paper/)
  assert.doesNotMatch(content, /Pair with dietary fat/)
  assert.doesNotMatch(content, /\[1,5\]/)
  assert.match(content, /USDA reports total fibre and does not quantify pectin/)
  assert.match(refLines[0], /^\[1\] Haber/)
  assert.match(refLines[1], /^\[3\] Neveu/)
  assert.match(refLines[2], /^\[5\] Liu/)
  assert.match(refLines[2], /nor the 2\.4 g total fibre/)
})

test("aubergine nasunin citation is Noda 2000 not lutein/zeaxanthin", () => {
  const raw = readDoc("docs/foods/aubergine.md")
  const {data: fm, content} = matter(raw)
  assert.doesNotMatch(raw, /johnson_role_2014/)
  assert.match(raw, /noda_nasunin_2000/)
  const row = (fm.nutrition_supplementary_sources || []).find((item) => item.label === "Delphinidin")
  assert.match(row.source_note, /Noda et al\. 2000/)
  assert.match(row.source_note, /not a fat-soluble carotenoid/)
  assert.doesNotMatch(content, /fat-soluble compound extraction/)
  assert.doesNotMatch(content, /Pairs with dietary fat in mixed meals to support absorption of co-ingested fat-soluble/)
  const cga = (fm.nutrition_supplementary_sources || []).find(
    (item) => item.label === "Chlorogenic Acid",
  )
  assert.ok(cga)
  assert.match(cga.amount_display, /Present — quantity not established/)
  assert.equal(cga.public_display, "table")
  assert.match(raw, /plazas_eggplant_cga_2013/)
  assert.match(raw, /zaro_eggplant_cga_cooking_2015/)
  assert.doesNotMatch(raw, /yeo_influence_2023/)
  assert.equal(
    editorialSubstanceTags(fm).some((tag) => /chlorogenic/i.test(tag)),
    false,
  )
  const result = reconcileFoodPage(fm, {substanceLookup: [], markdownBody: content})
  assert.ok(!result.overviewCompoundsMissingFromTables.some((item) => /chlorogenic/i.test(item)))
  const refLines = content
    .split("## References")[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\[\d+\]/.test(line))
  for (const line of refLines) {
    assert.equal(isFoodReferenceLine(line), true, line)
  }
})

test("avocado and avocado oil admit oleic acid after a deliberate ontology page", () => {
  const avocado = matter(readDoc("docs/foods/avocado.md"))
  const oil = matter(readDoc("docs/foods/avocado-oil.md"))
  const oleicPage = readDoc("docs/substances/nutrients/macronutrients/fatty-acids/mufas/oleic-acid.md")
  assert.equal(avocado.data.nutrition_per_100g.oleic_g, 9.066)
  assert.equal(avocado.data.public_display.oleic_g, "table")
  assert.equal(oil.data.nutrition_per_100g.oleic_g, 67.889)
  assert.equal(oil.data.public_display.oleic_g, "table")
  assert.equal(
    editorialSubstanceTags(avocado.data).some((tag) => tag === "Oleic Acid"),
    true,
  )
  assert.equal(
    editorialSubstanceTags(oil.data).some((tag) => tag === "Oleic Acid"),
    true,
  )
  assert.match(oleicPage, /not\*\* interchangeable with the broader labels \*\*MUFA\*\* or \*\*omega-9/)
  assert.match(oleicPage, /MUFA\*\* is a class/)
  assert.match(oleicPage, /Omega-9\*\* names the n-9 family/)
  assert.equal((oil.content.match(/Avocado oil is a monounsaturated-fat culinary oil/g) || []).length, 1)
  assert.doesNotMatch(oil.content, /\*\*\\\*\*/)
  assert.match(avocado.content, /unlu_carotenoid_2005/)
  assert.doesNotMatch(avocado.content, /tangpricha_fortification_2003/)
  assert.doesNotMatch(avocado.content, /Vitamin D \(fat-soluble\) bioavailability/)
  assert.doesNotMatch(oil.content, /Suitable for cooking \(higher smoke point than olive oil\)/)
  assert.match(oil.content, /should not be assumed to have a higher smoke point/)
  assert.match(oil.content, /fernandes_avocado_oil_2018/)
  const avocadoOleic = reconcileFoodPage(avocado.data, {
    substanceLookup: [],
    markdownBody: avocado.content,
  })
  assert.equal(
    avocadoOleic.overviewCompoundsMissingFromTables.some((item) => /oleic/i.test(item)),
    false,
  )
})

test("A-food reference annotations no longer carry mismatched bibliography summaries", () => {
  const apples = readDoc("docs/foods/apples.md")
  const asparagus = readDoc("docs/foods/asparagus.md")
  const aubergine = readDoc("docs/foods/aubergine.md")
  const avocado = readDoc("docs/foods/avocado.md")
  assert.doesNotMatch(apples, /Phytates are a type of organophosphorus/)
  assert.doesNotMatch(asparagus, /Attention-deficit\/hyperactivity disorder \(ADHD\) is a neurodevelopmental/)
  assert.doesNotMatch(aubergine, /johnson_role_2014/)
  assert.doesNotMatch(avocado, /Neurological, neurodegenerative, and psychiatric disorders represent a serious burden/)
})

test("salmon-roe keeps raw USDA sodium distinct from commercial cured ikura", () => {
  const raw = readDoc("docs/foods/salmon-roe.md")
  const { data: fm, content } = matter(raw)
  const overview = content.split("## Overview")[1]?.split("## ")[0] ?? ""
  const commercial = (fm.nutrition_supplementary_sources || []).find((row) =>
    /commercial cured ikura/i.test(String(row.label)),
  )

  assert.equal(fm.nutrition_per_100g.sodium_mg, 91)
  assert.equal(String(fm.nutrition_source.fdc_id), "175132")
  assert.match(String(fm.nutrition_source.food_name), /Fish, roe, mixed species, raw/)
  assert.match(String(fm.nutrition_source.food_name), /not\s+commercial cured ikura/)
  assert.equal(fm.public_display?.sodium_mg, "table")
  assert.equal(fm.tags.includes("Sodium"), false)
  assert.ok(commercial)
  assert.match(String(commercial.amount_display), /Varies by cure and product; check label/)
  assert.doesNotMatch(String(commercial.amount_display), /1,?167|140 mg/)
  assert.match(String(commercial.source_note), /Intershell/)
  assert.match(String(commercial.source_note), /140 mg sodium per 12 g/)
  assert.match(String(commercial.source_note), /2\.5% brine/)
  assert.doesNotMatch(String(commercial.source_note), /310 mg/)
  assert.doesNotMatch(overview, /91 mg|1,?167|140 mg|310 mg|FDC 175132/)
  assert.match(overview, /small portions useful in preparations such as the Neuroshot/)
  assert.match(content.split("## Key Nutritional Highlights")[1]?.split("## ")[0] ?? "", /phospholipid-bound/)
  assert.match(content, /liu_higher_2014/)
  assert.match(content, /patrick_role_2019/)
  assert.match(content.split("## Key Nutritional Highlights")[1]?.split("## ")[0] ?? "", /\[1,2\]/)
  assert.doesNotMatch(content.split("## Key Nutritional Highlights")[1]?.split("## ")[0] ?? "", /1\.9-fold|piglets|13C/)
})

const A_FOOD_INDEX_DESCRIPTIONS = {
  "algal-oil": "Vegetarian source of preformed DHA from cultivated microalgae",
  almonds: "Nutrient-dense nut providing vitamin E, magnesium, fibre and unsaturated fats",
  amaranth: "Comparatively lysine-rich pseudograin providing protein, magnesium and iron",
  apples: "Whole fruit providing fibre, pectin, vitamin C and quercetin",
  asparagus: "Folate-rich vegetable providing fibre and modest inulin-type fructans",
  aubergine: "Fibre-containing vegetable with chlorogenic acid and nasunin in its purple skin",
  avocado: "Fibre-rich fruit with mostly monounsaturated fat, vitamin E and carotenoids",
  "avocado-oil": "Monounsaturated culinary oil dominated by oleic acid",
}

test("A-food index descriptions are navigational identity, not evidence summaries", () => {
  const forbidden = [
    /cardiometabolic evidence/i,
    /processing-sensitive/i,
    /food[- ]matrix effects/i,
    /not root FOS/i,
    /USDA/i,
    /trial/i,
    /randomized/i,
    /meta-analysis/i,
  ]

  for (const [slug, expected] of Object.entries(A_FOOD_INDEX_DESCRIPTIONS)) {
    const raw = readDoc(`docs/foods/${slug}.md`)
    const { data: fm } = matter(raw)
    assert.equal(fm.description, expected, `${slug} index description`)
    assert.equal(fm.index_description, undefined, `${slug} must not add a competing index field`)
    for (const pattern of forbidden) {
      assert.doesNotMatch(String(fm.description), pattern, `${slug} description`)
    }
    assert.doesNotMatch(raw, /https?:\/\/localhost/i)
  }
})

test("Foods Index stores site-relative permalinks and documents the index-description rule once", () => {
  const pageModel = readDoc("system/food-page-model.md")
  const schema = readDoc("system/food-page-schema.md")
  const foodsRule = readDoc("docs/foods/.cursor/rules/Foods-Pages.mdc")
  const plugin = readDoc("src/plugin/category-listing/index.js")
  const tagList = readDoc("src/theme/TagList/index.js")
  const requireFromTest = createRequire(import.meta.url)
  const siteRelativePermalink = requireFromTest("../src/utils/siteRelativePermalink.js")

  assert.match(pageModel, /Food-index descriptions provide stable, plain-language food identity/)
  assert.match(
    pageModel,
    /They do not summarise studies, mechanisms, evidence disputes or reconciliation decisions/,
  )
  assert.match(schema, /Food-index descriptions/)
  assert.match(foodsRule, /Food-index descriptions/)
  assert.doesNotMatch(schema, /They do not summarise studies, mechanisms, evidence disputes/)
  assert.doesNotMatch(foodsRule, /They do not summarise studies, mechanisms, evidence disputes/)
  assert.match(plugin, /siteRelativePermalink\(doc\.permalink\)/)
  assert.match(tagList, /to=\{siteRelativePermalink\(doc\.permalink\)\}/)
  assert.equal(
    siteRelativePermalink("http://localhost:3000/docs/foods/almonds"),
    "/docs/foods/almonds",
  )
  assert.equal(siteRelativePermalink("/docs/foods/almonds"), "/docs/foods/almonds")
})

test("food-page editorial guidance and letter-audit schema are documented without changing reference display", () => {
  const schema = readDoc("system/food-page-schema.md")
  const pageModel = readDoc("system/food-page-model.md")
  const letter = readDoc("system/food-page-letter-audit-schema.md")
  const foodsRule = readDoc("docs/foods/.cursor/rules/Foods-Pages.mdc")
  const schedule = readDoc("system/food-page-audit-schedule.md")
  const records = JSON.parse(readDoc("scripts/data/food-editorial-audit-records.json"))

  assert.match(schema, /Recipe usefulness is sufficient/)
  assert.match(schema, /Do not manufacture biological importance/)
  assert.match(pageModel, /Food Overviews communicate food identity, distinctive characteristics and practical interpretation/)
  assert.match(pageModel, /They synthesise evidence rather than reproducing nutrient tables, trial reports or reconciliation notes/)
  assert.match(pageModel, /Quantitative composition belongs in tables/)
  assert.match(pageModel, /Calibration example \(Almonds\)/)
  assert.match(pageModel, /not an evidence table and not a fourth Source of Truth/)
  assert.match(pageModel, /must not inherit trial-log detail removed from Overviews/)
  assert.match(schema, /Overview editorial standard/)
  assert.match(schema, /system\/food-page-model\.md/)
  assert.match(foodsRule, /Overview editorial standard/)
  assert.doesNotMatch(schema, /Food Overviews state the user-relevant conclusion from research/)
  assert.doesNotMatch(foodsRule, /References should support the narrative, not become the narrative/)
  assert.match(schema, /Minimum \*\*two relevant\*\* references/)
  assert.match(schema, /Citation correctness and citation relevance are separate/)
  assert.match(schema, /never\*\* borrow another entry/)
  assert.match(schema, /References retain the project-wide Author \(Year\) and linked-title core/)
  assert.match(schema, /Food pages may append a concise food-specific finding/)
  assert.match(pageModel, /Author\(s\) \(Year\)\. \[linked title\]/)
  assert.match(foodsRule, /Bibliographic core/)
  assert.match(schema, /recommended page depth/)
  assert.match(pageModel, /Culinary-support foods may be described neutrally/)
  assert.match(letter, /culinary-support/)
  assert.match(letter, /recommended_depth/)
  assert.match(letter, /distinctive_story_or_inclusion_reason/)
  assert.match(letter, /destined_for_substance_or_brs_matrix/)
  assert.match(letter, /Do \*\*not\*\* begin the next letter batch/)
  assert.match(foodsRule, /Bibliographic core/)
  assert.match(schedule, /do not\*\* fill records or begin the next letter batch/)
  assert.equal(records.do_not_begin_letter_batch, true)
  assert.deepEqual(records.records, [])
})

