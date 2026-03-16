#!/usr/bin/env node
/**
 * One-time migration: move Preparation Notes up and rename to Food Context;
 * reorder so canonical order is Overview → Food Context → EAA → Nutrition → Substances → Recipes → Matrix → References.
 *
 * 1. Rename "## Preparation Notes" to "## Food Context" and add subheadings ### Sourcing, ### Synergies, ### Serving
 *    (existing content goes under ### Serving).
 * 2. Move that section to immediately after ## Overview.
 * 3. Swap ## Recipes and ## Substances so Substances comes before Recipes.
 *
 * Run from repo root: node scripts/migrate-food-context-order.mjs [--dry-run] [--foods-dir docs/foods]
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FOODS_DIR_DEFAULT = "docs/foods"
const SKIP = new Set(["index", "shopping-list"])

function getSlugs(foodsDir) {
  const abs = path.resolve(process.cwd(), foodsDir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.basename(f, ".md"))
    .filter((slug) => !SKIP.has(slug))
    .sort()
}

function migrateContent(content, swapOnly = false) {
  let out = content

  if (swapOnly) {
    // Only swap Recipes and Substances
    const swapRegex =
      /\n## Recipes\s*\n+(<FoodRecipes[^/]*\/>)\s*\n+\s*## Substances\s*\n+(<FoodSubstances[^/]*\/>)(?=\s*\n+\s*## |\Z)/s
    const next = out.replace(swapRegex, "\n## Substances\n\n$2\n\n## Recipes\n\n$1")
    return next !== out ? next : null
  }

  // Already migrated
  if (out.includes("## Food Context")) return null

  // Must have Preparation Notes
  const prepMatch = out.match(/\n## Preparation Notes\n\n([\s\S]*?)(?=\n## |\Z)/)
  if (!prepMatch) return null

  const prepBody = prepMatch[1].trim()
  const foodContextBlock =
    "## Food Context\n\n### Sourcing\n\n\n### Synergies\n\n\n### Serving\n\n\n" + prepBody

  // Remove old section
  out = out.replace(/\n## Preparation Notes\n\n[\s\S]*?(?=\n## |\Z)/, "\n")

  // Insert after Overview: find "\n## Overview\n" then next "\n\n## " or "\n\n### "
  const overviewMatch = out.match(/\n## Overview\n\n([\s\S]*?)(\n\n(?:## |### ))/)
  if (!overviewMatch) return null
  const afterOverview = overviewMatch[1]
  const nextSectionStart = overviewMatch[2]
  const insertPoint = out.indexOf(nextSectionStart, out.indexOf("## Overview"))
  const before = out.slice(0, insertPoint)
  const after = out.slice(insertPoint)
  out = before + "\n\n" + foodContextBlock + "\n\n" + after

  // Swap Recipes and Substances so Substances come before Recipes (allow flexible whitespace)
  const swapRegex =
    /\n## Recipes\s*\n+(<FoodRecipes[^/]*\/>)\s*\n+\s*## Substances\s*\n+(<FoodSubstances[^/]*\/>)(?=\s*\n+\s*## |\Z)/s
  out = out.replace(swapRegex, "\n## Substances\n\n$2\n\n## Recipes\n\n$1")

  return out
}

function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes("--dry-run")
  const swapOnly = args.includes("--swap-only")
  const foodsDir =
    args.includes("--foods-dir") && args[args.indexOf("--foods-dir") + 1]
      ? args[args.indexOf("--foods-dir") + 1]
      : FOODS_DIR_DEFAULT
  const dirAbs = path.resolve(process.cwd(), foodsDir)
  const slugs = getSlugs(foodsDir)
  let migrated = 0

  for (const slug of slugs) {
    const filePath = path.join(dirAbs, `${slug}.md`)
    if (!fs.existsSync(filePath)) continue
    const raw = fs.readFileSync(filePath, "utf8")
    const newContent = migrateContent(raw, swapOnly)
    if (newContent === null) continue
    migrated++
    if (dryRun) {
      console.log(`[dry-run] would migrate: ${slug}.md`)
    } else {
      fs.writeFileSync(filePath, newContent, "utf8")
      console.log(`Migrated: ${slug}.md`)
    }
  }

  console.log(`\nDone. ${migrated} page(s) migrated.`)
  if (dryRun && migrated > 0) console.log("Run without --dry-run to apply.")
}

main()
