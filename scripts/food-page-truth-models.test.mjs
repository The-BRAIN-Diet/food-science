import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {
  COMPOSITION_AND_PROVENANCE_CLASSES,
  CONTENT_BOUNDARY_MODEL,
  THREE_SOURCES_OF_TRUTH,
  assertsProvenanceClassesAreNotThreeSourcesOfTruth,
  summarizeFoodPageModels,
} from "./lib/food-page-truth-models.mjs"

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
