#!/usr/bin/env node
/**
 * Batch repair of food pages failing validation (system/food-page-model.md).
 * - Adds missing Essential Amino Acid Profile sections (template by food category).
 * - Removes downstream metabolite tags (SCFAs, butyrate, propionate, acetate).
 * - Ensures FoodSubstancesFromTable when nutrition_per_100g is populated.
 * Re-runs validation after repair and reports before/after/remaining.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import {
  runValidation,
  getFoodSlugs,
  requiresEaaSection,
  hasEaaSection,
  DOWNSTREAM_METABOLITE_TAGS,
  FOODS_DIR_DEFAULT,
} from "./lib/food-page-validation.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ANIMAL_SLUGS = new Set([
  "beef", "chicken", "pork", "lamb", "turkey", "duck-fat", "dark-meat-poultry",
  "eggs", "egg-yolks", "salmon", "tuna", "cod", "mackerel", "herring", "sardines",
  "shrimp", "crab", "scallops", "clams", "mussels", "oysters", "cockles",
  "salmon-roe", "trout-roe", "lumpfish-roe", "liver", "kidney", "heart", "organ-meats",
  "dairy", "milk", "cheese", "yogurt", "butter", "grass-fed-butter", "ghee",
])
const GRAIN_SLUGS = new Set([
  "barley", "oats", "rice", "wheat", "quinoa", "amaranth", "buckwheat", "spelt", "whole-grains",
])
const LEGUME_SLUGS = new Set([
  "lentils", "chickpeas", "black-beans", "kidney-beans", "peas", "lupins", "mucuna-beans", "peanuts",
])
const NUT_SEED_SLUGS = new Set([
  "almonds", "walnuts", "cashews", "pistachios", "chia-seeds", "flax-seeds",
  "sunflower-seeds", "pumpkin-seeds", "sesame-seeds",
])
const SOY_SLUGS = new Set(["soy", "tofu", "tempeh", "edamame", "natto", "miso", "soy-lecithin"])

function getEaaCategory(slug) {
  if (ANIMAL_SLUGS.has(slug)) return "animal"
  if (GRAIN_SLUGS.has(slug)) return "grain"
  if (LEGUME_SLUGS.has(slug)) return "legume"
  if (NUT_SEED_SLUGS.has(slug)) return "nut_seed"
  if (SOY_SLUGS.has(slug)) return "soy"
  return "other_plant"
}

function pluralVerb(title) {
  return /s$/.test(String(title).trim()) ? ["provide", "are"] : ["provides", "is"]
}

function getEaaBlock(category, title) {
  const name = title || "This food"
  const [provide, be] = pluralVerb(name)
  switch (category) {
    case "animal":
      return `### Essential Amino Acid Profile

This food provides a complete essential amino acid profile typical of animal proteins.`
    case "grain":
      return `### Essential Amino Acid Profile

${name} ${provide} a useful plant protein source but ${be} not a complete protein.

Notable amino acids:

- Methionine (relatively higher than in legumes)

Limiting amino acids:

- Lysine (typical of grains)

Protein pairing strategy:

Grains such as ${name.toLowerCase()} are relatively higher in methionine but lysine-limited. Combining with legumes (e.g. lentils, chickpeas) creates a more balanced essential amino acid profile.`
    case "legume":
      return `### Essential Amino Acid Profile

${name} ${provide} a strong plant protein source but ${be} not a complete protein.

Notable amino acids:

- Lysine

Limiting amino acids:

- Methionine and cysteine (DIAAS ~65–70)

Protein pairing strategy:

${name} are rich in lysine but relatively low in sulfur-containing amino acids. Combining with grains such as rice, oats, or barley helps create a more balanced essential amino acid profile.`
    case "nut_seed":
      return `### Essential Amino Acid Profile

${name} ${provide} plant protein but ${be} not a complete protein; lysine is typically limiting for nuts and seeds.

Protein pairing strategy:

Pair with legumes or grains to complete essential amino acid coverage.`
    case "soy":
      return `### Essential Amino Acid Profile

${name} ${provide} a relatively complete plant protein (higher in lysine than most grains). Pairing with grains or other legumes still supports dietary variety and amino acid balance.`
    default:
      return `### Essential Amino Acid Profile

${name} contribute plant protein. Pair with complementary protein sources (e.g. grains and legumes) for a balanced essential amino acid profile.`
  }
}

function getEaaFrontMatterUpdates(category) {
  switch (category) {
    case "animal":
      return { protein_profile_note: "Complete essential amino acid profile." }
    case "grain":
      return {
        amino_acid_strengths: "Relatively higher in methionine than legumes; lysine-limited like other grains.",
        limiting_amino_acids: "Lysine (typical of grains).",
        complementary_pairings: "Lentils, chickpeas, or other legumes for complete essential amino acid profile.",
      }
    case "legume":
      return {
        amino_acid_strengths: "Lysine-rich relative to grains.",
        limiting_amino_acids: "Lower in methionine and cysteine (DIAAS ~65–70).",
        complementary_pairings: "Rice, oats, barley, or other grains to complete essential amino acid profile.",
      }
    case "nut_seed":
      return {
        limiting_amino_acids: "Lysine (typical of nuts and seeds).",
        complementary_pairings: "Legumes or grains for complete essential amino acid profile.",
      }
    case "soy":
      return {
        amino_acid_strengths: "Relatively complete plant protein; good lysine and leucine.",
        complementary_pairings: "Grains or other legumes for variety and balance.",
      }
    default:
      return {
        complementary_pairings: "Grains and legumes for balanced essential amino acid profile.",
      }
  }
}

function findEaaInsertIndex(content) {
  const table = content.indexOf("\n\n<NutritionTable")
  if (table !== -1) return table
  const recipes = content.indexOf("\n\n## Recipes")
  if (recipes !== -1) return recipes
  const substances = content.indexOf("\n\n## Substances")
  if (substances !== -1) return substances
  return -1
}

function main() {
  const args = process.argv.slice(2)
  const foodsDir = args.includes("--foods-dir") && args[args.indexOf("--foods-dir") + 1]
    ? args[args.indexOf("--foods-dir") + 1]
    : FOODS_DIR_DEFAULT
  const dirAbs = path.resolve(process.cwd(), foodsDir)

  const before = runValidation(foodsDir)
  const totalMissingEaa = before.missingEaa.length
  const totalDownstream = before.downstreamInTags.length
  const missingEaaSet = new Set(before.missingEaa.map(({ slug }) => slug))
  const downstreamTagsBySlug = new Map(before.downstreamInTags.map(({ slug, tags }) => [slug, tags]))

  let repairedEaa = 0
  let repairedTags = 0
  let repairedSubstances = 0

  const slugs = getFoodSlugs(foodsDir)
  for (const slug of slugs) {
    const filePath = path.join(dirAbs, `${slug}.md`)
    if (!fs.existsSync(filePath)) continue
    let raw = fs.readFileSync(filePath, "utf8")
    const { data: fm, content } = matter(raw)
    const nutrition = fm.nutrition_per_100g || {}
    let newFm = { ...fm }
    let newContent = content
    let didEaa = false
    let didTags = false
    let didSubstances = false

    // Repair: remove downstream metabolite tags
    if (downstreamTagsBySlug.has(slug)) {
      const tags = Array.isArray(fm.tags) ? [...fm.tags] : []
      const filtered = tags.filter((t) => !DOWNSTREAM_METABOLITE_TAGS.has(String(t).trim()))
      if (filtered.length !== tags.length) {
        newFm.tags = filtered
        didTags = true
      }
    }

    // Repair: add EAA section if required and missing
    if (missingEaaSet.has(slug) && !hasEaaSection(content)) {
      const category = getEaaCategory(slug)
      const title = fm.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      const eaaBlock = getEaaBlock(category, title)
      const insertIdx = findEaaInsertIndex(content)
      if (insertIdx !== -1) {
        Object.assign(newFm, getEaaFrontMatterUpdates(category))
        newContent =
          content.slice(0, insertIdx) + "\n\n" + eaaBlock + "\n\n" + content.slice(insertIdx).replace(/^\n\n/, "\n")
        didEaa = true
      }
    }

    // Repair: FoodSubstances -> FoodSubstancesFromTable when nutrition exists
    const hasNutrition = nutrition && typeof nutrition === "object" && Object.keys(nutrition).length > 0
    if (hasNutrition && newContent.includes("<FoodSubstances details={frontMatter} />") && !newContent.includes("FoodSubstancesFromTable")) {
      newContent = newContent.replace("<FoodSubstances details={frontMatter} />", "<FoodSubstancesFromTable details={frontMatter} />")
      didSubstances = true
    }

    if (didEaa) repairedEaa++
    if (didTags) repairedTags++
    if (didSubstances) repairedSubstances++

    if (didEaa || didTags || didSubstances) {
      fs.writeFileSync(filePath, matter.stringify(newContent, newFm, { lineWidth: 9999 }), "utf8")
    }
  }

  const after = runValidation(foodsDir)

  console.log("\n--- Food page batch repair (system/food-page-model.md) ---\n")
  console.log("Before repair:")
  console.log(`  Missing EAA section: ${totalMissingEaa}`)
  console.log(`  Downstream metabolite tags: ${totalDownstream} pages\n`)
  console.log("Repairs applied:")
  console.log(`  EAA sections added: ${repairedEaa}`)
  console.log(`  Downstream tags removed: ${repairedTags} pages`)
  console.log(`  FoodSubstances → FoodSubstancesFromTable: ${repairedSubstances} pages\n`)
  console.log("After repair:")
  console.log(`  Missing EAA section: ${after.missingEaa.length}`)
  console.log(`  Downstream metabolite tags: ${after.downstreamInTags.length} pages\n`)

  if (after.missingEaa.length > 0) {
    console.log("Remaining failures — Missing EAA:")
    after.missingEaa.forEach(({ slug }) => console.log(`  - ${slug}.md`))
    console.log("")
  }
  if (after.downstreamInTags.length > 0) {
    console.log("Remaining failures — Downstream tags:")
    after.downstreamInTags.forEach(({ slug, tags }) => console.log(`  - ${slug}.md: ${tags.join(", ")}`))
    console.log("")
  }

  const exitCode = after.missingEaa.length > 0 || after.downstreamInTags.length > 0 ? 1 : 0
  if (exitCode === 0) {
    console.log("All food pages pass validation.\n")
  } else {
    console.log("Re-run npm run nutrition:repair to fix remaining issues, or fix manually.\n")
  }
  process.exit(exitCode)
}

main()
