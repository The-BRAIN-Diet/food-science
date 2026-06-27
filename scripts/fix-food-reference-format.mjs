#!/usr/bin/env node
/**
 * Reformat food-page ## References to salmon-roe canonical explained lines:
 * `[n] {Explanation}. {Author Year}. [{Paper title}](/docs/papers/BRAIN-Diet-References#key)`
 *
 * Explanations are inferred from Overview / Highlights / Food Context sentences
 * containing the same [n] citation; otherwise abstract or title fallback from BibTeX.
 *
 * Usage:
 *   node scripts/fix-food-reference-format.mjs --all
 *   node scripts/fix-food-reference-format.mjs --all --force
 *   node scripts/fix-food-reference-format.mjs --letters A,B,C
 *   node scripts/fix-food-reference-format.mjs --slug dark-chocolate
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { slugsForLetters } from "./lib/food-page-letter-schedule.mjs"
import { FOODS_DIR_DEFAULT, getFoodSlugs } from "./lib/food-page-validation.mjs"
import {
  loadBibIndex,
  needsReferenceFormatFix,
  rebuildExplainedReferencesSection,
} from "./lib/bib-citation-format.mjs"

function parseArgs(argv) {
  const lettersArg = argv.find((a) => a.startsWith("--letters="))?.split("=")[1]
    ?? (argv.includes("--letters") ? argv[argv.indexOf("--letters") + 1] : null)
  const slugArg = argv.find((a) => a.startsWith("--slug="))?.split("=")[1]
    ?? (argv.includes("--slug") ? argv[argv.indexOf("--slug") + 1] : null)
  const foodsDir = argv.includes("--foods-dir") && argv[argv.indexOf("--foods-dir") + 1]
    ? argv[argv.indexOf("--foods-dir") + 1]
    : FOODS_DIR_DEFAULT
  const dryRun = argv.includes("--dry-run")
  const all = argv.includes("--all")
  const force = argv.includes("--force")
  return { letters: lettersArg, slug: slugArg, foodsDir, dryRun, all, force }
}

function fixPage(slug, foodsDir, bibIndex, force) {
  const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data: fm, content } = matter(raw)
  const refsMatch = content.match(/^## References\s*$/m)
  if (!refsMatch) return { changed: false, skipped: "no-references-section" }

  const refsStart = refsMatch.index
  const refsBody = content.slice(refsStart)
  if (!force && !needsReferenceFormatFix(refsBody)) {
    return { changed: false, skipped: "already-canonical" }
  }

  const hasBibLink = /\/docs\/papers\/BRAIN-Diet-References#/.test(refsBody)
  if (!hasBibLink) return { changed: false, skipped: "no-parsable-bib-refs" }

  const newRefs = rebuildExplainedReferencesSection(content, refsBody, bibIndex, force)
  if (!newRefs) return { changed: false, skipped: "no-parsable-bib-refs" }

  const newContent = content.slice(0, refsStart) + newRefs.trimEnd() + "\n"
  return { changed: newContent !== content, content: newContent, fm }
}

function main() {
  const { letters, slug, foodsDir, dryRun, all, force } = parseArgs(process.argv.slice(2))
  const bibIndex = loadBibIndex()
  let slugs = slug
    ? [slug]
    : all
      ? getFoodSlugs(foodsDir).filter((s) => s !== "index" && s !== "shopping-list")
      : letters
        ? slugsForLetters(foodsDir, letters.split(",").map((l) => l.trim().toUpperCase()))
        : []

  if (!slugs.length) {
    console.error(
      "Usage: node scripts/fix-food-reference-format.mjs --all | --letters A,B,C | --slug dark-chocolate",
    )
    process.exit(1)
  }

  let updated = 0
  let skipped = 0
  for (const s of slugs) {
    const result = fixPage(s, foodsDir, bibIndex, force)
    if (result.changed) {
      updated++
      if (!dryRun) {
        const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${s}.md`)
        fs.writeFileSync(filePath, matter.stringify(result.content, result.fm, { lineWidth: 9999 }), "utf8")
      }
      console.log(`  fixed: ${s}`)
    } else if (result.skipped) {
      skipped++
    }
  }
  console.log(`\n${dryRun ? "Would fix" : "Fixed"} ${updated} page(s); skipped ${skipped}.\n`)
}

main()
