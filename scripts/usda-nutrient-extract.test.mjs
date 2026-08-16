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

test("extractNutrients does not treat alanine as ALA", () => {
  const out = extractNutrients({
    foodNutrients: [nutrient("Alanine", 0.999, "g"), nutrient("PUFA 18:3 n-3 c,c,c", 0.003, "g")],
  })
  assert.equal(out.ala_mg, 3)
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
