import test from "node:test"
import assert from "node:assert/strict"
import { extractNutrients, scoreCandidate } from "./lib/usda-nutrient-extract.mjs"
import { editorialSubstanceTags, labelsOverlap, tableBackedLabels } from "./lib/food-truth-levels.mjs"
import { reconcileFoodPage } from "./lib/food-truth-reconciliation.mjs"

function nutrient(name, amount, unitName = "mg") {
  return { nutrient: { name, unitName }, amount }
}

test("extractNutrients maps SR Legacy almond panel including E, B2, P, Mn, linoleic", () => {
  const food = {
    foodNutrients: [
      nutrient("Energy", 579, "kcal"),
      nutrient("Protein", 21.15, "g"),
      nutrient("Total lipid (fat)", 49.93, "g"),
      nutrient("Magnesium, Mg", 270),
      nutrient("Phosphorus, P", 481),
      nutrient("Manganese, Mn", 2.179),
      nutrient("Copper, Cu", 1.031),
      nutrient("Riboflavin", 1.138),
      nutrient("Vitamin E (alpha-tocopherol)", 25.63),
      nutrient("PUFA 18:2 n-6 c,c", 12.32, "g"),
      nutrient("PUFA 18:2 CLAs", 0.002, "g"),
      nutrient("Vitamin B-12", 0, "µg"),
    ],
  }
  const out = extractNutrients(food)
  assert.equal(out.kcal, 579)
  assert.equal(out.magnesium_mg, 270)
  assert.equal(out.phosphorus_mg, 481)
  assert.equal(out.manganese_mg, 2.179)
  assert.equal(out.copper_mg, 1.031)
  assert.equal(out.vitamin_b2_mg, 1.138)
  assert.equal(out.vitamin_e_mg, 25.63)
  assert.equal(out.linoleic_g, 12.32)
  assert.equal(out.vitamin_b12_ug, undefined)
})

test("SR Legacy almond-style panel outranks abbreviated Foundation", () => {
  const foundation = extractNutrients({
    foodNutrients: [
      nutrient("Energy (Atwater General Factors)", 625.75, "kcal"),
      nutrient("Protein", 21.45, "g"),
      nutrient("Magnesium, Mg", 257.6),
      nutrient("Iron, Fe", 3.741),
      nutrient("Calcium, Ca", 253.6),
    ],
  })
  const sr = extractNutrients({
    foodNutrients: [
      nutrient("Energy", 579, "kcal"),
      nutrient("Protein", 21.15, "g"),
      nutrient("Total lipid (fat)", 49.93, "g"),
      nutrient("Magnesium, Mg", 270),
      nutrient("Phosphorus, P", 481),
      nutrient("Manganese, Mn", 2.179),
      nutrient("Copper, Cu", 1.031),
      nutrient("Riboflavin", 1.138),
      nutrient("Vitamin E (alpha-tocopherol)", 25.63),
      nutrient("PUFA 18:2 n-6 c,c", 12.32, "g"),
      nutrient("Iron, Fe", 3.71),
      nutrient("Calcium, Ca", 269),
    ],
  })
  assert.ok(scoreCandidate("SR Legacy", sr) > scoreCandidate("Foundation", foundation))
})

test("ALA requires an explicit n-3 identity and can never come from alanine", () => {
  const named = extractNutrients({
    foodNutrients: [nutrient("Alanine", 0.999, "g"), nutrient("PUFA 18:3 n-3 c,c,c", 0.003, "g")],
  })
  assert.equal(named.ala_mg, 3, "the n-3 form is the only thing that may fill this field")

  // A bare 18:3 states a carbon count, not an isomer: 18:3 n-6 is gamma-linolenic
  // acid. An unqualified value is left unreported rather than published as ALA.
  const generic = extractNutrients({
    foodNutrients: [nutrient("Alanine", 0.011, "g"), nutrient("PUFA 18:3", 0.009, "g")],
  })
  assert.equal(generic.ala_mg, undefined)
  assert.equal(generic.omega3_mg, undefined, "an absent ALA is not a zero to roll up")

  assert.equal(extractNutrients({foodNutrients: [nutrient("18:3 n-6 c,c,c", 0.5, "g")]}).ala_mg, undefined)

  // Alanine is an amino acid. Nothing about its name may reach this field, and
  // the same guard covers beta-alanine and phenylalanine.
  for (const name of ["Alanine", "Beta-alanine", "Phenylalanine", "ALA"]) {
    const out = extractNutrients({foodNutrients: [nutrient(name, 1.428, "g")]})
    assert.equal(out.ala_mg, undefined, `${name} must never resolve to ALA`)
  }
})

test("roe FDC 175132 reports EPA and DHA but no ALA", () => {
  /*
   * The real shape of Fish, roe, mixed species, raw. Alanine is 1.428 g per
   * 100 g, which at a 15 g serving is about 214 mg — this was published as ALA,
   * an omega-3 figure larger than the food's DHA. The record's only 18:3 entry
   * is unqualified and negligible.
   */
  const roe = extractNutrients({
    foodNutrients: [
      nutrient("Alanine", 1.428, "g"),
      nutrient("Phenylalanine", 1.092, "g"),
      nutrient("PUFA 18:2", 0.029, "g"),
      nutrient("PUFA 18:3", 0.006, "g"),
      nutrient("PUFA 20:5 n-3 (EPA)", 0.983, "g"),
      nutrient("PUFA 22:6 n-3 (DHA)", 1.363, "g"),
    ],
  })

  assert.equal(roe.ala_mg, undefined, "alanine and an unqualified 18:3 leave ALA unreported")
  assert.equal(roe.epa_mg, 983)
  assert.equal(roe.dha_mg, 1363)
  assert.equal(roe.omega3_mg, 2346, "the rollup is EPA plus DHA only")
  assert.equal(roe.pufa_18_3_unresolved_mg, 6, "the unqualified 18:3 is kept, unresolved")
  assert.deepEqual(
    roe.omega3_components.map((c) => c.nutrient),
    ["epa_mg", "dha_mg"],
    "the total names its components and the unresolved 18:3 is not among them",
  )

  const serving = 15 / 100
  assert.ok(
    Math.abs(1.428 * 1000 * serving - 214) < 1,
    "the discredited figure was alanine scaled to the serving",
  )
  assert.ok(Math.abs(roe.epa_mg * serving - 147.45) < 0.01)
  assert.ok(Math.abs(roe.dha_mg * serving - 204.45) < 0.01)
})

test("omega-3 identity is decided by the source's nutrient identifier", () => {
  const byId = (id, name, amount) => ({nutrient: {id, name, unitName: "g"}, amount})

  /*
   * The identifier is authoritative, because a name can be misread and an
   * identifier cannot. 2018 (PUFA 18:3 c) and 2023 (PUFA 20:5c) name a cis form
   * without an n-position, so neither is an explicit n-3 however familiar the
   * carbon count looks.
   */
  const out = extractNutrients({
    foodNutrients: [
      byId(1404, "PUFA 18:3 n-3 c,c,c (ALA)", 0.148),
      byId(1278, "PUFA 20:5 n-3 (EPA)", 0.862),
      byId(1280, "PUFA 22:5 n-3 (DPA)", 0.393),
      byId(1272, "PUFA 22:6 n-3 (DHA)", 1.104),
      byId(2018, "PUFA 18:3 c", 0.148),
      byId(2023, "PUFA 20:5c", 0.862),
    ],
  })

  assert.equal(out.ala_mg, 148)
  assert.equal(out.dpa_mg, 393, "DPA is an n-3 the total must include")
  assert.equal(out.omega3_mg, 148 + 862 + 393 + 1104, "the total is every identified n-3")
  assert.equal(out.pufa_18_3_unresolved_mg, undefined, "a resolved 18:3 leaves nothing unresolved")

  for (const component of out.omega3_components) {
    assert.match(component.identity, /n-3/, `${component.nutrient} states its isomer`)
  }
  assert.equal(
    out.omega3_components.reduce((sum, c) => sum + c.amount_mg, 0),
    out.omega3_mg,
    "the total is exactly its named components",
  )
})

test("an unqualified 18:3 is retained but never resolved", () => {
  // Flaxseed's SR Legacy record. USDA reports 22.813 g under nutrient 1270.
  // Extraction does not decide isomers. Combined provenance on the flax page
  // is a later, documented food-level interpretation, not this function.
  const flax = extractNutrients({
    description: "Seeds, flaxseed",
    foodNutrients: [{nutrient: {id: 1270, name: "PUFA 18:3", unitName: "g"}, amount: 22.813}],
  })

  assert.equal(flax.ala_mg, undefined, "an unstated isomer is not ALA")
  assert.equal(flax.pufa_18_3_unresolved_mg, 22813, "the reported value is kept")
  assert.equal(flax.omega3_mg, undefined, "and contributes to no n-3 total")
  assert.equal(flax.omega3_components, undefined)

  // Hemp's generic 18:3 would be ALA + GLA. The extractor has no food-name
  // exception that could inherit flax's page-level interpretation.
  const hemp = extractNutrients({
    description: "Seeds, hemp seed, hulled",
    foodNutrients: [{nutrient: {id: 1270, name: "PUFA 18:3", unitName: "g"}, amount: 20.17}],
  })
  assert.equal(hemp.ala_mg, undefined, "hemp cannot inherit flax's 1270 interpretation")
  assert.equal(hemp.pufa_18_3_unresolved_mg, 20170)
})

test("phenylalanine cannot become ALA", () => {
  /*
   * FDC 2003603, Mushroom, beech: its phenylalanine of 0.671 g was published as
   * "ALA 671 mg" on three medicinal mushroom pages. The record reports no fatty
   * acid at all.
   */
  const mushroom = extractNutrients({
    foodNutrients: [nutrient("Phenylalanine", 0.671, "g"), nutrient("Protein", 2.18, "g")],
  })

  assert.equal(mushroom.ala_mg, undefined)
  assert.notEqual(mushroom.omega3_mg, 671)
  assert.equal(mushroom.omega3_mg, undefined, "a record with no n-3 publishes no total")
})

test("beta-alanine cannot become ALA", () => {
  /*
   * The guard is on the substring, so every amino acid ending in "alanine" is
   * disqualified before any name test runs. Beta-alanine is the third of them
   * and the one most likely to appear in a supplement-style panel.
   */
  const panel = extractNutrients({
    foodNutrients: [
      nutrient("Beta-alanine", 1.2, "g"),
      nutrient("Alanine", 0.9, "g"),
      nutrient("Phenylalanine", 0.7, "g"),
    ],
  })

  assert.equal(panel.ala_mg, undefined, "no amino acid resolves to ALA")
  assert.equal(panel.omega3_mg, undefined)
  assert.equal(panel.pufa_18_3_unresolved_mg, undefined, "nor to an unresolved fatty acid")
})

test("a reported zero is not a measurement of absence", () => {
  /*
   * Nutritional yeast stored `ala_mg: 0` from an unqualified 18:3 of zero. A
   * nutrient the analysis never established is unknown, not absent, and a total
   * assembled from nothing is omitted rather than published as 0.
   */
  const zeroed = extractNutrients({
    foodNutrients: [
      {nutrient: {id: 1270, name: "PUFA 18:3", unitName: "g"}, amount: 0},
      {nutrient: {id: 1404, name: "PUFA 18:3 n-3 c,c,c (ALA)", unitName: "g"}, amount: 0},
      nutrient("Protein", 45.5, "g"),
    ],
  })

  assert.equal(zeroed.omega3_mg, undefined, "a zero total is not published")
  assert.equal(zeroed.omega3_components, undefined)
  assert.equal(zeroed.protein_g, 45.5, "the rest of the panel is unaffected")
})

test("a nutrient the record never reported is absent, not zero", () => {
  const sparse = extractNutrients({foodNutrients: [nutrient("Protein", 2.18, "g")]})

  for (const key of ["ala_mg", "epa_mg", "dha_mg", "omega3_mg", "pufa_18_3_unresolved_mg"]) {
    assert.equal(sparse[key], undefined, `${key} must be absent rather than zero`)
    assert.ok(!Object.prototype.hasOwnProperty.call(sparse, key), `${key} must not be written at all`)
  }
})

test("almond editorial substances resolve to table rows", () => {
  const fm = {
    title: "Almonds",
    id: "almonds",
    tags: [
      "Food",
      "Almonds",
      "Vegan",
      "Copper",
      "Linoleic Acid",
      "Magnesium",
      "Phosphorus",
      "Manganese",
      "Vitamin B2",
      "Vitamin E",
      "Iron",
      "Calcium",
    ],
    nutrition_per_100g: {
      copper_mg: 1.031,
      linoleic_g: 12.32,
      magnesium_mg: 270,
      phosphorus_mg: 481,
      manganese_mg: 2.179,
      vitamin_b2_mg: 1.138,
      vitamin_e_mg: 25.63,
      iron_mg: 3.71,
      calcium_mg: 269,
    },
    nutrition_source: {
      database: "USDA FoodData Central",
      basis: "per 100 g edible portion",
    },
  }
  const expected = [
    "Copper",
    "Linoleic Acid",
    "Magnesium",
    "Phosphorus",
    "Manganese",
    "Vitamin B2",
    "Vitamin E",
    "Iron",
    "Calcium",
  ]
  assert.deepEqual(editorialSubstanceTags(fm).sort(), [...expected].sort())
  const labels = tableBackedLabels(fm)
  for (const tag of expected) {
    assert.ok(
      labels.some((label) => labelsOverlap(tag, label)),
      `missing table row for ${tag} in ${labels.join(",")}`,
    )
  }
  const result = reconcileFoodPage(fm, { substanceLookup: [] })
  assert.deepEqual(result.substancesMissingFromTables, [])
  assert.deepEqual(result.unsupportedQuantitative, [])
})
