#!/usr/bin/env node
/**
 * Reformat food-page ## References to canonical title-bearing bullets (beef / dark-chocolate style).
 * Fixes migration stubs like `- [1] FAO 2013 [FAO 2013](...)`.
 *
 * Usage: node scripts/fix-food-reference-format.mjs --letters A,B,C
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { slugsForLetters } from "./lib/food-page-letter-schedule.mjs"
import { FOODS_DIR_DEFAULT } from "./lib/food-page-validation.mjs"
import {
  loadBibIndex,
  isStubReferenceLine,
  isBrokenReferenceLine,
  rebuildReferencesSection,
  extractRefKeysFromReferencesSection,
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
  return { letters: lettersArg, slug: slugArg, foodsDir, dryRun }
}

function fixPage(slug, foodsDir, bibIndex) {
  const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data: fm, content } = matter(raw)
  const refsMatch = content.match(/^## References\s*$/m)
  if (!refsMatch) return { changed: false }

  const refsStart = refsMatch.index
  const refsBody = content.slice(refsStart)
  const lines = refsBody.split("\n").slice(1).filter((l) => l.trim())
  const stubLines = lines.filter((l) => isStubReferenceLine(l.trim()) || isBrokenReferenceLine(l.trim()))
  if (!stubLines.length) return { changed: false }

  const keys = extractRefKeysFromReferencesSection(refsBody)
  if (!keys.length) return { changed: false }

  const newRefs = rebuildReferencesSection(keys, bibIndex)
  const newContent = content.slice(0, refsStart) + newRefs.trimEnd() + "\n"
  return { changed: newContent !== content, content: newContent, fm }
}

function main() {
  const { letters, slug, foodsDir, dryRun } = parseArgs(process.argv.slice(2))
  const bibIndex = loadBibIndex()
  let slugs = slug ? [slug] : letters ? slugsForLetters(foodsDir, letters.split(",").map((l) => l.trim().toUpperCase())) : []
  if (!slugs.length) {
    console.error("Usage: node scripts/fix-food-reference-format.mjs --letters A,B,C | --slug barley")
    process.exit(1)
  }

  let updated = 0
  for (const s of slugs) {
    const result = fixPage(s, foodsDir, bibIndex)
    if (result.changed) {
      updated++
      if (!dryRun) {
        const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${s}.md`)
        fs.writeFileSync(filePath, matter.stringify(result.content, result.fm, { lineWidth: 9999 }), "utf8")
      }
      console.log(`  fixed: ${s}`)
    }
  }
  console.log(`\n${dryRun ? "Would fix" : "Fixed"} ${updated} page(s).\n`)
}

main()
