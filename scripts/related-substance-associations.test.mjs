import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import matter from "gray-matter"
import {
  RELATED_SUBSTANCE_RELATIONSHIPS,
  relatedSubstancesForFood,
  buildRelatedSubstanceIndex,
  relatedFoodsForInput,
  renderRelatedFoodSources,
  relatedViaLabel,
} from "../src/data/relatedSubstanceRelationships.mjs"
import {selectQuantified} from "../src/data/inputSubstanceFoodSelection.mjs"

const readFood = (id) => {
  const parsed = matter(fs.readFileSync(`docs/foods/${id}.md`, "utf8"))
  return {id, title: parsed.data.title, frontMatter: parsed.data}
}

const foods = ["potatoes", "bananas", "black-beans", "chickpeas", "apples"].map(readFood)
const mapping = JSON.parse(fs.readFileSync("src/data/brs5InputMapping.generated.json", "utf8"))
const pm1 = (input) => mapping.relationships.filter((row) => row.pm === "BRS5-FM1-PM1" && row.input === input)

test("a verified resistant-starch food becomes a related butyrate source", () => {
  const index = buildRelatedSubstanceIndex(foods)
  const butyrate = index.filter((row) => row.related_id === "butyrate")
  assert.deepEqual(
    butyrate.map((row) => row.food_id).sort(),
    ["bananas", "black-beans", "chickpeas", "potatoes"],
  )
  for (const row of butyrate) {
    assert.equal(row.intermediate_id, "resistant-starch")
    assert.equal(row.relationship, "microbial-production")
    assert.equal(row.quantity, null)
    assert.equal(row.rank_eligible, false)
    assert.equal(row.direct_containment, false)
    assert.ok(row.preparation)
    assert.ok(row.evidence.citation_keys.includes("baxter_fermentable_fibers_2019"))
    assert.equal(
      `${row.related_label} — via ${relatedViaLabel(row.intermediate_label)} · ${row.relationship_label}`,
      "Butyrate — via resistant starch · Microbial production",
    )
  }
  assert.match(butyrate.find((row) => row.food_id === "potatoes").preparation, /chilled to 4/)
  assert.equal(index.some((row) => row.food_id === "apples" && row.related_id === "butyrate"), false)
})

test("removing the intermediate relationship removes the derived association", () => {
  const catalog = RELATED_SUBSTANCE_RELATIONSHIPS.filter((row) => row.id !== "resistant-starch-butyrate")
  const potato = foods.find((food) => food.id === "potatoes")
  const rows = relatedSubstancesForFood(potato.frontMatter, catalog)
  assert.equal(rows.some((row) => row.related_id === "butyrate"), false)
  assert.equal(buildRelatedSubstanceIndex([potato], catalog).some((row) => row.related_id === "butyrate"), false)
})

test("direct composition remains unchanged and generic fibre does not infer butyrate", () => {
  const potato = foods.find((food) => food.id === "potatoes")
  const substances = potato.frontMatter.substance_relationships.map((edge) => edge.substance)
  assert.ok(substances.includes("Resistant starch"))
  assert.equal(substances.includes("Butyrate"), false)
  assert.equal(relatedSubstancesForFood(potato.frontMatter).some((row) => row.direct_containment), false)
  assert.deepEqual(
    relatedSubstancesForFood({title: "Fibre only", nutrition_per_100g: {fibre_g: 4}, substance_relationships: []}),
    [],
  )
})

test("related sources stay out of quantitative ranking and manuscript butyrate rows", () => {
  const related = relatedFoodsForInput(pm1("Butyrate"), mapping.food_sources)
  assert.ok(related.some((row) => row.food_id === "potatoes" && /chilled/.test(row.preparation)))
  assert.deepEqual(
    related.map((row) => row.food_id).sort(),
    ["bananas", "black-beans", "chickpeas", "potatoes"],
  )
  assert.equal(related.some((row) => row.preparation === "raw"), false)
  assert.equal(related.every((row) => row.quantity === null && row.rank_eligible === false && row.direct_containment === false), true)
  assert.deepEqual(relatedFoodsForInput(pm1("Fermentable dietary fibre"), mapping.food_sources), [])
  const retinoic = relatedFoodsForInput(pm1("Retinoic acid"), mapping.food_sources)
  assert.ok(retinoic.length > 0)
  assert.equal(retinoic.every((row) => row.intermediate_id === "vitamin-a" && row.quantity === null && row.rank_eligible === false), true)
  assert.match(renderRelatedFoodSources(retinoic), /via vitamin A/)
  const ranked = selectQuantified(related.map((row) => ({...row, observations: []})))
  assert.equal(ranked.ranked, false)
  assert.deepEqual(ranked.sources, [])
  const html = renderRelatedFoodSources(related)
  assert.match(html, /data-food-source-kind="related"/)
  assert.match(html, /Potatoes<\/a> — via resistant starch/)
  assert.match(html, /Baked or boiled, then chilled/)
  assert.doesNotMatch(html, /per 100 g|contains dietary input|Relative Source Power/)
  assert.equal(pm1("Butyrate").every((row) => !(row.food_targets || []).length), true)
  assert.equal(
    mapping.manuscript_rows.some((row) => row.canonical_substance_id === "butyrate" || row.substance_id === "butyrate"),
    false,
  )
})

test("PM1 dietary admissions and six-atom records remain unchanged", () => {
  const parsed = matter(
    fs.readFileSync("docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx", "utf8"),
  )
  const atoms = parsed.data.dietary_input_traceability
  assert.deepEqual(
    atoms.map((atom) => [atom.atom_id, atom.input, atom.dietary_input]),
    [
      ["PM1-DIT-1", "Butyrate", null],
      ["PM1-DIT-2", "Fermentable dietary fibre", true],
      ["PM1-DIT-3", "Retinoic acid", null],
      ["PM1-DIT-4", "Vitamin A", true],
      ["PM1-DIT-5", "Zinc", true],
      ["PM1-DIT-6", "Glutamine", true],
      ["PM1-KC1-UPSTREAM-1", "FOS/GOS", true],
      ["PM1-KC1-UPSTREAM-2", "Pectin", true],
      ["PM1-KC1-UPSTREAM-3", "Resistant starch", true],
    ],
  )
  for (const atom of atoms.filter((row) => row.atom_id.startsWith("PM1-DIT-"))) {
    for (const key of ["input", "input_type", "biological_role", "evidence_source", "evidence_limitation", "dietary_input"]) {
      assert.notEqual(atom[key], undefined, `${atom.atom_id} ${key}`)
    }
  }
})
