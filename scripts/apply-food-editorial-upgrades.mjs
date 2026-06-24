#!/usr/bin/env node
/**
 * Apply curated Overview + Key Nutritional Highlights upgrades with [n] body citations.
 * Usage: node scripts/apply-food-editorial-upgrades.mjs --letters A,B,C
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { slugsForLetters } from "./lib/food-page-letter-schedule.mjs"
import { FOODS_DIR_DEFAULT } from "./lib/food-page-validation.mjs"
import { FOOD_EDITORIAL_UPGRADES } from "./data/food-editorial-upgrades.mjs"
import { rebuildReferencesSection } from "./lib/bib-citation-format.mjs"

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

function extractSection(content, headingRe, endRes = [/^##\s+/m]) {
  const m = content.match(headingRe)
  if (!m) return null
  const start = m.index
  const slice = content.slice(start)
  const firstLineEnd = slice.indexOf("\n")
  const bodyStart = firstLineEnd === -1 ? slice.length : firstLineEnd + 1
  const rest = slice.slice(bodyStart)
  let end = slice.length
  for (const endRe of endRes) {
    const hit = rest.match(endRe)
    if (hit) end = Math.min(end, bodyStart + hit.index)
  }
  return { start, end: start + end }
}

function replaceSection(content, headingRe, newSection, endRes) {
  const section = extractSection(content, headingRe, endRes)
  if (!section) return null
  return content.slice(0, section.start) + newSection + content.slice(section.end)
}

function applyUpgrade(slug, foodsDir) {
  const upgrade = FOOD_EDITORIAL_UPGRADES[slug]
  if (!upgrade) return { changed: false }

  const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data: fm, content: initial } = matter(raw)
  let content = initial

  const overviewSection = `## Overview\n\n${upgrade.overview.trim()}\n`
  const knhSection = `## Key Nutritional Highlights\n\n${upgrade.knh.map((b) => `- ${b}`).join("\n")}\n`

  const afterOverview = replaceSection(content, /^##\s+Overview\s*$/m, overviewSection, [/^##\s+Key Nutritional Highlights\s*$/m, /^##\s+Food Context\s*$/m])
  if (!afterOverview) return { changed: false }
  content = afterOverview

  const afterKnH = replaceSection(content, /^##\s+Key Nutritional Highlights\s*$/m, knhSection, [/^##\s+Food Context\s*$/m, /^##\s+Recipes\s*$/m])
  if (!afterKnH) return { changed: false }
  content = afterKnH

  if (upgrade.refKeys?.length) {
    const refsSection = rebuildReferencesSection(upgrade.refKeys)
    const refs = extractSection(content, /^##\s+References\s*$/m, [])
    if (refs) {
      content = content.slice(0, refs.start) + refsSection + content.slice(refs.end)
    }
  }

  return {
    changed: content.trimEnd() + "\n" !== initial.trimEnd() + "\n",
    content: content.trimEnd() + "\n",
    fm,
  }
}

function main() {
  const { letters, slug, foodsDir, dryRun } = parseArgs(process.argv.slice(2))
  let slugs = slug ? [slug] : letters
    ? slugsForLetters(foodsDir, letters.split(",").map((l) => l.trim().toUpperCase()))
    : Object.keys(FOOD_EDITORIAL_UPGRADES)

  let updated = 0
  let skipped = 0
  for (const s of slugs) {
    if (!FOOD_EDITORIAL_UPGRADES[s]) {
      skipped++
      continue
    }
    const result = applyUpgrade(s, foodsDir)
    if (result.changed) {
      updated++
      if (!dryRun) {
        const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${s}.md`)
        fs.writeFileSync(filePath, matter.stringify(result.content, result.fm, { lineWidth: 9999 }), "utf8")
      }
      console.log(`  upgraded: ${s}`)
    }
  }
  console.log(`\n${dryRun ? "Would upgrade" : "Upgraded"} ${updated} page(s); ${skipped} without editorial map.\n`)
}

main()
