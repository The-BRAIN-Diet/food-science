import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import {
  CALIBRATION_SUBSTANCE_PATHS,
  runSubstanceValidation,
  substanceValidationHasFailures,
  validateCanonicalSubstancePage,
} from "./lib/substance-page-validation.mjs"
import {buildDietaryOriginProjection} from "../src/data/dietaryOriginProjection.mjs"

const ROOT = process.cwd()

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8")
}

function loadDoc(relativePath, permalink) {
  const {data} = matter(read(relativePath))
  return {
    title: data.title,
    permalink,
    description: data.description,
    frontMatter: data,
  }
}

test("canonical Substance schema declares the redesigned public structure", () => {
  const schema = read("system/substance-page-schema.md")
  const headings = [
    "## Overview",
    "## Dietary Context",
    "## Research Spotlights & Evidence Checks",
    "## BRS mapping",
    "## Food / Substance evidence boundary",
    "## References",
  ]
  for (const heading of headings) assert.match(schema, new RegExp(`^${heading}$`, "m"))
  assert.match(schema, /`Substance → evidence-qualified PM \/ KC relationship → BRS`/)
  assert.match(schema, /Exposure Context belongs to an evidence relationship/)
  assert.match(schema, /does not contain Urolithin A/)
  assert.match(schema, /does not contain Butyrate/)
})

test("all four calibration Substance pages satisfy the canonical validator", () => {
  const result = runSubstanceValidation()
  assert.equal(
    substanceValidationHasFailures(result),
    false,
    JSON.stringify(result, null, 2),
  )
  assert.deepEqual(
    result.pages.map((page) => page.label),
    CALIBRATION_SUBSTANCE_PATHS,
  )
})

test("Evidence presentations cannot omit exposure context", () => {
  const invalid = `---
id: example
title: Example
tags: [Substance]
mechanisms: {}
---
## Overview

Example.

## Dietary Context

Example.

## Research Spotlights & Evidence Checks

<EvidencePresentation kind="spotlight" title="Question" summary="Summary">
Evidence.
</EvidencePresentation>

## Foods

<SubstanceFoods tag="Example" />

## Recipes

<SubstanceRecipes tag="Example" />

## Biological Regulatory Systems

None.

## References

[1] Example et al. (2026). [Example title](/docs/papers/BRAIN-Diet-References#example_2026). Example relevance.
`
  const result = validateCanonicalSubstancePage(invalid)
  assert.ok(result.issues.some((issue) => /exposureContext/.test(issue)))
})

test("Pomegranates expose a precursor edge without a Urolithin A contains assertion", () => {
  const {data, content} = matter(read("docs/foods/pomegranates.md"))
  assert.equal(data.tags.includes("Urolithin A"), false)
  const edge = data.substance_relationships.find(
    (relationship) => relationship.substance === "Urolithin A",
  )
  assert.equal(edge.relationship, "dietary-precursor")
  assert.match(edge.input, /ellagitannin/i)
  assert.match(edge.process, /microbial/i)
  assert.doesNotMatch(content, /Pomegranate(?:s)?\s*→\s*contains\s*→\s*Urolithin A/i)
})

test("food tags alone are not shown as substance relationships", () => {
  const component = read("src/theme/SubstanceFoods/index.tsx")
  assert.doesNotMatch(component, /Legacy food association/)
  assert.doesNotMatch(component, /legacy tag association/)
  assert.match(component, /A food tag alone is not a relationship/)
})

test("fermentable-food support is not represented as direct Butyrate content", () => {
  const foodsDir = path.join(ROOT, "docs/foods")
  for (const name of fs.readdirSync(foodsDir).filter((file) => file.endsWith(".md"))) {
    const {data} = matter(fs.readFileSync(path.join(foodsDir, name), "utf8"))
    assert.equal(
      Array.isArray(data.tags) && data.tags.includes("Butyrate"),
      false,
      `${name} tags Butyrate as direct Food content`,
    )
    for (const relationship of data.substance_relationships || []) {
      assert.notEqual(
        relationship.substance === "Butyrate" &&
          ["contains", "direct-food-occurrence"].includes(relationship.relationship) &&
          !(relationship.citation_keys || []).length,
        true,
        `${name} has an unsupported direct Butyrate occurrence edge`,
      )
    }
  }
})

test("Butyrate Dietary Origin separates direct content from substrate pathways", () => {
  const foodDocsDir = path.join(ROOT, "docs/foods")
  const foodDocs = fs
    .readdirSync(foodDocsDir)
    .filter((name) => /\.mdx?$/.test(name))
    .map((name) =>
      loadDoc(
        `docs/foods/${name}`,
        `/docs/foods/${name.replace(/\.mdx?$/, "")}`,
      ),
    )
  const docs = [
    loadDoc(
      "docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx",
      "/docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling",
    ),
    ...foodDocs,
  ]

  const projection = buildDietaryOriginProjection(docs, {
    target: "Butyrate",
    pmId: "BRS5-FM2-PM5",
  })
  assert.ok(projection)
  assert.deepEqual(projection.directFoodContent, [])
  assert.equal(projection.product.dietaryInput, false)
  assert.equal(projection.product.admittedDietaryRequirement, false)
  assert.equal(projection.pathways.length, 3)

  const byInput = Object.fromEntries(projection.pathways.map((pathway) => [pathway.atom.input, pathway]))
  const starch = byInput["Resistant starch"]
  const pectin = byInput.Pectin
  const oligosaccharides = byInput[
    "Fructo-oligosaccharides / galacto-oligosaccharides (studied preparation)"
  ]
  assert.ok(starch && pectin && oligosaccharides)

  assert.deepEqual(
    starch.foods.map((food) => food.title),
    ["Bananas", "Black Beans", "Chickpeas", "Potatoes"],
  )
  assert.equal(
    starch.foods.find((food) => food.title === "Bananas").edge.substrateAmount,
    "2.7–25.3 g per 100 g fresh weight",
  )
  assert.equal(
    starch.foods.find((food) => food.title === "Potatoes").edge.substrateAmount,
    "2.2–5.4 g per 100 g, moisture-corrected",
  )
  assert.equal(starch.foods.find((food) => food.title === "Black Beans").edge.substrateAmount, "3–5 g per 100 g dry weight")
  assert.equal(starch.foods.find((food) => food.title === "Chickpeas").edge.substrateAmount, "3–5 g per 100 g dry weight")
  for (const food of starch.foods) assert.equal(food.edge.butyrateQuantity, null)
  assert.equal(starch.substrateHref, "/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/resistant-starch")
  assert.equal(starch.conversion.butyrateSpecificity, "preparation-specific-butyrate")
  assert.equal(starch.relationshipMetadata.productRelationship, "derived")
  assert.equal(starch.relationshipMetadata.requirementClassification, "direct")
  assert.equal(starch.relationshipMetadata.typeLabel, "Type A — Capacity")
  for (const food of starch.foods) {
    assert.equal(food.verification, "canonical")
    assert.equal(food.edge.relationship, "contains")
    assert.equal(food.edge.classification, "direct-composition")
    assert.equal(food.edge.butyrateQuantity, null)
    assert.match(food.edge.preparation, /\S/)
    assert.match(food.edge.sourceNote, /\S/)
  }

  assert.deepEqual(pectin.foods, [])
  assert.equal(pectin.substrateHref, "/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/pectin")
  assert.equal(pectin.conversion.butyrateSpecificity, "scfa-not-butyrate-specific")
  assert.deepEqual(
    pectin.provisionalNotes.map((note) => note.title),
    ["Apples"],
  )

  assert.deepEqual(oligosaccharides.foods, [])
  assert.deepEqual(oligosaccharides.provisionalNotes, [])
  assert.equal(
    oligosaccharides.substrateHref,
    "/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/fructo-galacto-oligosaccharides",
  )
  assert.equal(oligosaccharides.identityStatus, "resolved")
  assert.equal(oligosaccharides.conversion.butyrateSpecificity, "butyrate-yield-not-established")

  const renderedFoods = projection.pathways.flatMap((pathway) => [
    ...pathway.foods.map((food) => food.title),
    ...pathway.provisionalNotes.map((note) => note.title),
  ])
  for (const title of ["Lentils", "Mankai (Duckweed)", "Grass-Fed Butter", "Ghee", "Parmesan Cheese", "Asparagus"]) {
    assert.equal(renderedFoods.includes(title), false, title)
  }
})

test("Butyrate page uses the ontology projection without defensive implementation prose", () => {
  const page = read("docs/substances/microbial-metabolites/scfas/butyrate.md")
  const component = read("src/theme/DietaryOriginProjection/index.tsx")
  assert.match(page, /<DietaryOriginProjection[\s\S]*target="Butyrate"[\s\S]*pmId="BRS5-FM2-PM5"[\s\S]*\/>/)
  assert.match(component, /No verified direct food-content records currently available\./)
  assert.match(page, /SCFA production and signalling/)
  assert.match(page, /Production, absorption and signalling are not one claim/)
  assert.doesNotMatch(page, /No fermentable-fibre food is emitted/)
  assert.doesNotMatch(page, /The Foods component does not convert/)
  assert.doesNotMatch(page, /Food\s*→\s*contains\s*→\s*Butyrate/)
})
