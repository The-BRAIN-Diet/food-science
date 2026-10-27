import {createDietaryPathwayIndex} from './lib/dietary-pathway-index.mjs';
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

test("Butyrate Dietary Origin requires PM admission and conversion evidence, not KC labels alone", () => {
  const index=createDietaryPathwayIndex(ROOT);
  const pm1=loadDoc("docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx","/docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity");
  assert.equal(buildDietaryOriginProjection([pm1],{target:"Butyrate",pmId:"BRS5-FM1-PM1",pathwayIndex:index}).pathways.length,0);
  const pm5=loadDoc("docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx","/docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling");
  const projection=buildDietaryOriginProjection([pm5],{target:"Butyrate",pmId:"BRS5-FM2-PM5",pathwayIndex:index});
  assert.equal(projection.pathways.length,1);
  assert.equal(projection.pathways[0].atom.substance_id,'resistant-starch');
  assert.ok(projection.pathways[0].foods.some(f=>f.title==='Bananas'&&f.preparation));
  assert.ok(!projection.pathways.some(p=>/pectin|galacto/i.test(p.atom.input)));
  assert.equal(buildDietaryOriginProjection([pm5],{target:"Butyrate",pmId:"BRS5-FM2-PM5"}).pathways.length,0);
});

test("Butyrate page uses the ontology projection without defensive implementation prose", () => {
  const page = read("docs/substances/microbial-metabolites/scfas/butyrate.md")
  assert.match(page, /<DietaryPathways targetId="butyrate" \/>/)
  assert.doesNotMatch(page, /No fermentable-fibre food is emitted/)
  assert.doesNotMatch(page, /The Foods component does not convert/)
  assert.doesNotMatch(page, /Food\s*→\s*contains\s*→\s*Butyrate/)
})
