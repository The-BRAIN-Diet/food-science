#!/usr/bin/env node
/**
 * Remove empty Food Context subsections (Sourcing/Synergies/Preparation).
 *
 * If a food page contains `## Food Context` and any of the subsections
 * `Sourcing`, `Synergies`, or `Preparation` with no content (only whitespace)
 * before the next heading, this script removes that empty subsection heading.
 *
 * Usage:
 *   node scripts/remove-empty-food-context-subsections.mjs [--dry-run] [--foods-dir docs/foods]
 */
import fs from "node:fs"
import path from "node:path"

const args = new Set(process.argv.slice(2))
const dryRun = args.has("--dry-run")
const foodsDirArgIdx = process.argv.indexOf("--foods-dir")
const foodsDir = path.resolve(
  process.cwd(),
  foodsDirArgIdx !== -1 ? process.argv[foodsDirArgIdx + 1] : "docs/foods"
)

const SKIP = new Set(["index.md", "shopping-list.md"])
const SUBSECTIONS = ["Sourcing", "Synergies", "Preparation"]

function listFoodFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => !SKIP.has(f))
    .map((f) => path.join(dir, f))
}

function removeEmptySubsections(content) {
  const start = content.indexOf("\n## Food Context\n")
  if (start === -1) return { content, changed: false }

  const after = content.slice(start + "\n## Food Context\n".length)
  const endMatch = after.match(
    /\n(### Essential Amino Acid Profile|## Substances|## Recipes|## References|## Biological Target Matrix|## Nutrition|<NutritionTable)/ // conservative
  )
  const end = endMatch ? endMatch.index : after.length

  const before = content.slice(0, start + "\n## Food Context\n".length)
  let block = after.slice(0, end)
  const rest = after.slice(end)

  const originalBlock = block

  for (const name of SUBSECTIONS) {
    // Match both "## Name" and "### Name" (some pages were inconsistent).
    // Remove if the section body is only whitespace before the next heading of same/higher level.
    const re = new RegExp(
      String.raw`(?:\n)(#{2,3}) ${name}\n([\s\S]*?)(?=\n#{2,3} |\n## |\n### |$)`,
      "g"
    )
    block = block.replace(re, (match, hashes, body) => {
      const bodyWithoutWhitespace = body.replace(/\s+/g, "")
      if (bodyWithoutWhitespace.length === 0) {
        return ""
      }
      return match
    })
  }

  // Normalize extra blank lines introduced by removals.
  block = block.replace(/\n{3,}/g, "\n\n")

  const changed = block !== originalBlock
  return { content: before + block + rest, changed }
}

let changedFiles = 0
for (const filePath of listFoodFiles(foodsDir)) {
  const original = fs.readFileSync(filePath, "utf8")
  const { content: updated, changed } = removeEmptySubsections(original)
  if (!changed) continue

  changedFiles += 1
  if (!dryRun) fs.writeFileSync(filePath, updated)
}

console.log(
  dryRun
    ? `[dry-run] Would update ${changedFiles} food files`
    : `Updated ${changedFiles} food files`
)

