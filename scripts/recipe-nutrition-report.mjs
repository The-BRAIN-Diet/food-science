#!/usr/bin/env node
/**
 * Read-only per-serving nutrition report for every recipe page.
 *
 * Usage:
 *   node scripts/recipe-nutrition-report.mjs            # summary table
 *   node scripts/recipe-nutrition-report.mjs <id|slug>  # full detail for one recipe
 */
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"
import matter from "gray-matter"
import {
  PUBLIC_CORE_KEYS,
  calculateRecipeNutrition,
  selectPublicRows,
} from "../src/utils/recipeNutritionCalculate.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === ".cursor" ? [] : walk(full)
    return /\.mdx?$/.test(entry.name) ? [full] : []
  })
}

const foodDocs = fs
  .readdirSync(path.join(ROOT, "docs/foods"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const {data} = matter(fs.readFileSync(path.join(ROOT, "docs/foods", f), "utf8"))
    return {
      title: data.title,
      permalink: `/docs/foods/${path.basename(f, ".md")}`,
      frontMatter: data,
    }
  })

const recipes = walk(path.join(ROOT, "docs/recipes"))
  .map((file) => {
    const raw = fs.readFileSync(file, "utf8")
    const {data} = matter(raw)
    return {file, data, hasComponent: raw.includes("<RecipeFoods")}
  })
  .filter((r) => r.data?.id && !String(r.data.id).endsWith("-recipes") && r.data.id !== "recipes")

const target = process.argv[2]

function fmt(v, digits = 1) {
  return typeof v === "number" && Number.isFinite(v) ? v.toFixed(digits) : "—"
}

if (target) {
  const recipe = recipes.find((r) => r.data.id === target || r.file.includes(target))
  if (!recipe) {
    console.error(`no recipe matching ${target}`)
    process.exit(1)
  }
  const result = calculateRecipeNutrition(recipe.data, foodDocs)
  console.log(`${recipe.data.title}  [${recipe.data.id}]`)
  console.log(`status: ${result.status}   servings: ${result.servings}`)
  if (result.blockers?.length) console.log(`blockers: ${result.blockers.join(", ")}`)
  if (result.status === "calculated") {
    const mass = result.audit.reduce((s, a) => s + a.weight_g, 0)
    console.log(`prepared ingredient mass (default items): ${mass.toFixed(0)} g`)
    console.log("\nwhole recipe / per serving:")
    for (const key of PUBLIC_CORE_KEYS) {
      console.log(
        `  ${key.padEnd(12)} ${fmt(result.recipeTotals[key]).padStart(9)}  ${fmt(result.perServing[key]).padStart(9)}`,
      )
    }
    console.log("\npublic rows:")
    for (const row of selectPublicRows(result)) {
      console.log(`  [${row.group}] ${row.key}: ${row.amount == null ? "not established" : fmt(row.amount, 2)}`)
    }
    console.log("\ningredients:")
    for (const a of result.audit) {
      console.log(`  ${String(a.display || a.food).slice(0, 60).padEnd(62)} ${fmt(a.weight_g).padStart(7)} g  ${fmt(a.contributions.kcal, 0).padStart(5)} kcal`)
    }
    if (result.exclusions?.length) {
      console.log("\nexclusions:")
      for (const e of result.exclusions) console.log(`  ${e.display} — ${e.reason}`)
    }
  }
  process.exit(0)
}

const header = ["recipe", "status", "srv", "kcal", "prot", "fibre", "sodium", "note"]
console.log(header.join("\t"))
for (const recipe of recipes.sort((a, b) => a.data.id.localeCompare(b.data.id))) {
  const result = calculateRecipeNutrition(recipe.data, foodDocs)
  const note = !recipe.hasComponent
    ? "no nutrition component"
    : result.status === "calculated"
      ? Object.keys(result.unresolved || {}).join(",") || ""
      : (result.blockers || []).slice(0, 2).join(",")
  const unresolvedNa = result.unresolved?.sodium_mg
  console.log(
    [
      recipe.data.id,
      result.status,
      result.servings,
      fmt(result.perServing.kcal, 0),
      fmt(result.perServing.protein_g),
      fmt(result.perServing.fibre_g),
      unresolvedNa ? "not established" : fmt(result.perServing.sodium_mg, 0),
      note,
    ].join("\t"),
  )
}
