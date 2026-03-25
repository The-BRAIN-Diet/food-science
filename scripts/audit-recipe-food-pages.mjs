#!/usr/bin/env node
/**
 * Audit recipe pages to ensure food pages exist.
 *
 * Checks two things:
 * 1) Recipe frontmatter tags that look like foods (i.e. they match some food page tag/title)
 * 2) Ingredient-line bold tokens under "## Ingredients" as a best-effort heuristic
 *
 * Run:
 *   node scripts/audit-recipe-food-pages.mjs
 */

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const ROOT = path.join(import.meta.dirname, "..")
const DOCS = path.join(ROOT, "docs")
const FOODS_DIR = path.join(DOCS, "foods")
const RECIPES_DIR = path.join(DOCS, "recipes")

const SKIP_RECIPE_FILES = new Set(["index.md"])
const SKIP_RECIPE_DIRS = new Set([".cursor"])

function walkMdFiles(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_RECIPE_DIRS.has(entry.name)) continue
      out.push(...walkMdFiles(path.join(dir, entry.name)))
      continue
    }
    if (!entry.name.endsWith(".md")) continue
    if (SKIP_RECIPE_FILES.has(entry.name)) continue
    out.push(path.join(dir, entry.name))
  }
  return out
}

function normalizeLabel(s) {
  return String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/&/g, "and")
    .replace(/\s+/g, " ")
}

function tokenizeIngredientToken(token) {
  let t = normalizeLabel(token)
  t = t.replace(/\(.*?\)/g, " ").replace(/\s+/g, " ").trim()

  // common descriptors that appear in bold but aren't part of food page naming
  const stopPrefixes = [
    "wild ",
    "ripe ",
    "mixed ",
    "fresh ",
    "baby ",
    "extra virgin ",
    "extra-virgin ",
    "early harvest ",
    "handful of ",
  ]
  for (const p of stopPrefixes) {
    if (t.startsWith(p)) t = t.slice(p.length)
  }

  // crude singularization for common plurals
  if (t.endsWith("ies")) t = t.slice(0, -3) + "y"
  else if (t.endsWith("s") && !t.endsWith("ss")) t = t.slice(0, -1)

  return t.trim()
}

function buildFoodLabelIndex() {
  const labelToFile = new Map()
  const allFiles = fs.readdirSync(FOODS_DIR).filter((f) => f.endsWith(".md"))

  for (const file of allFiles) {
    const full = path.join(FOODS_DIR, file)
    const raw = fs.readFileSync(full, "utf8")
    const parsed = matter(raw)
    const fm = parsed.data ?? {}

    const candidates = new Set()
    if (fm.title) candidates.add(fm.title)
    if (fm.sidebar_label) candidates.add(fm.sidebar_label)
    if (fm.id) candidates.add(fm.id)
    if (Array.isArray(fm.tags)) fm.tags.forEach((t) => candidates.add(t))

    for (const c of candidates) {
      const key = normalizeLabel(c)
      if (!key) continue
      if (!labelToFile.has(key)) labelToFile.set(key, file)
    }
  }

  return labelToFile
}

function extractIngredientBoldTokens(markdownBody) {
  const lines = markdownBody.split(/\r?\n/)
  const startIdx = lines.findIndex((l) => /^##\s+Ingredients\b/i.test(l))
  if (startIdx === -1) return []

  const tokens = []
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i]
    if (/^##\s+/.test(line)) break
    // only consider list-ish lines to avoid false positives
    if (!/^\s*-\s+/.test(line) && !/^\s*\d+\.\s+/.test(line)) continue

    const re = /\*\*(.+?)\*\*/g
    let m
    while ((m = re.exec(line))) {
      tokens.push(m[1])
    }
  }
  return tokens
}

function run() {
  const foodIndex = buildFoodLabelIndex()
  const recipeFiles = walkMdFiles(RECIPES_DIR)

  const missingFoodTagsByRecipe = []
  const ingredientTokensMissingFoodByRecipe = []

  for (const file of recipeFiles) {
    const raw = fs.readFileSync(file, "utf8")
    const parsed = matter(raw)
    const fm = parsed.data ?? {}
    const body = parsed.content ?? ""

    const rel = path.relative(DOCS, file).replace(/\\/g, "/")
    const tags = Array.isArray(fm.tags) ? fm.tags.map(String) : []

    // Check 1: tags that look like foods but have no food page label match.
    // We flag "likely-food" tags by excluding the common non-food ones and requiring the tag be Title-Case-ish.
    const nonFoodTagSet = new Set(["recipe", "breakfast", "lunch", "dinner", "drinks", "side-dishes", "wip"])
    const missingFoodTags = []
    for (const t of tags) {
      const key = normalizeLabel(t)
      if (!key) continue
      if (nonFoodTagSet.has(key)) continue
      if (foodIndex.has(key)) continue
      // heuristic: ignore obvious biological target tags that are often multi-word abstractions
      if (key.includes("support") || key.includes("response") || key.includes("inflammation") || key.includes("microbiome"))
        continue
      missingFoodTags.push(t)
    }
    if (missingFoodTags.length) missingFoodTagsByRecipe.push({ recipe: rel, missingFoodTags })

    // Check 2: ingredient bold tokens
    const tokens = extractIngredientBoldTokens(body)
    const tokenMisses = []
    for (const token of tokens) {
      const normalized = tokenizeIngredientToken(token)
      if (!normalized) continue
      if (foodIndex.has(normalized)) continue
      // allow mapping cacao->raw cacao nibs/cocoa etc via index; token may be "cacao nibs"
      tokenMisses.push(token)
    }
    if (tokenMisses.length) ingredientTokensMissingFoodByRecipe.push({ recipe: rel, missingIngredientTokens: tokenMisses })
  }

  console.log("=== Recipe → Food page audit ===\n")

  console.log("1) Recipe frontmatter tags with no matching food page label:\n")
  if (!missingFoodTagsByRecipe.length) {
    console.log("  (none)\n")
  } else {
    for (const r of missingFoodTagsByRecipe) {
      console.log(`- ${r.recipe}`)
      for (const t of r.missingFoodTags) console.log(`  - ${t}`)
    }
    console.log(`\nTotal recipes with missing-food tags: ${missingFoodTagsByRecipe.length}\n`)
  }

  console.log("2) Ingredient bold tokens under ## Ingredients with no matching food label (heuristic):\n")
  if (!ingredientTokensMissingFoodByRecipe.length) {
    console.log("  (none)\n")
  } else {
    for (const r of ingredientTokensMissingFoodByRecipe) {
      console.log(`- ${r.recipe}`)
      for (const t of r.missingIngredientTokens) console.log(`  - ${t}`)
    }
    console.log(`\nTotal recipes with unmatched ingredient tokens: ${ingredientTokensMissingFoodByRecipe.length}\n`)
  }
}

run()

