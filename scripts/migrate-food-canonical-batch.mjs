#!/usr/bin/env node
/**
 * Batch migrate food pages toward canonical schema (system/food-page-schema.md).
 * - Does not invent Other Nutritional Highlights; that section is optional.
 * - Existing superseded `Key Nutritional Highlights` headings are left in place until a letter rewrite.
 * - Rebuilds ## References from bibliography-linked citations only.
 * - Adds fallback references only from the reviewed mapping in
 *   scripts/data/food-canonical-refs*.mjs — never from titles or abstracts.
 * - Does not invent Highlights or attach inline citations from reference lists.
 * - Adds Essential Amino Acid Profile blocks where required.
 * - Removes orphan/corrupt lines before ## References.
 *
 * Usage:
 *   node scripts/migrate-food-canonical-batch.mjs --letters A,B,C
 *   node scripts/migrate-food-canonical-batch.mjs --remaining-no-bib
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { slugsForLetters } from "./lib/food-page-letter-schedule.mjs"
import {
  runCanonicalValidation,
  requiresEaaSection,
  hasEaaSection,
  FOODS_DIR_DEFAULT,
} from "./lib/food-page-validation.mjs"
import { FOOD_CANONICAL_FALLBACK_REFS } from "./data/food-canonical-refs.mjs"
import { FOOD_CANONICAL_REFS_REMAINING54 } from "./data/food-canonical-refs-remaining54.mjs"
import { formatFoodReferenceLine, loadBibIndex, isExplainedReferenceLine } from "./lib/bib-citation-format.mjs"

const ALL_FALLBACK_REFS = { ...FOOD_CANONICAL_FALLBACK_REFS, ...FOOD_CANONICAL_REFS_REMAINING54 }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BIB_KEY_RE = /\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)/gi
const BIB_LINK_RE = /\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/gi
const PLACEHOLDER_REF_RE = /^these references link to the brain diet bibliography/i
const ANIMAL_SLUGS = new Set([
  "beef", "chicken", "pork", "lamb", "turkey", "cod", "crab", "clams", "cockles",
  "salmon", "tuna", "mackerel", "shrimp", "mussels", "oysters",
  "eggs", "egg-yolks", "liver", "heart", "kidney",
  "parmesan-cheese", "cheddar-cheese", "milk", "greek-yogurt", "yogurt",
  "butter", "grass-fed-butter", "ghee",
])
const COCOA_SLUGS = new Set(["cacao-nibs-raw", "cacao-powder", "cocoa", "dark-chocolate"])

function parseArgs(argv) {
  const lettersArg = argv.find((a) => a.startsWith("--letters="))?.split("=")[1]
    ?? (argv.includes("--letters") ? argv[argv.indexOf("--letters") + 1] : null)
  const slugsArg = argv.find((a) => a.startsWith("--slugs="))?.split("=")[1]
    ?? (argv.includes("--slugs") ? argv[argv.indexOf("--slugs") + 1] : null)
  const foodsDir = argv.includes("--foods-dir") && argv[argv.indexOf("--foods-dir") + 1]
    ? argv[argv.indexOf("--foods-dir") + 1]
    : FOODS_DIR_DEFAULT
  const dryRun = argv.includes("--dry-run")
  const remainingNoBib = argv.includes("--remaining-no-bib")
  return { letters: lettersArg, slugs: slugsArg, foodsDir, dryRun, remainingNoBib }
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
  return { full: slice.slice(0, end), body: slice.slice(bodyStart, end), start, end: start + end }
}

function extractBibRefs(text) {
  const seen = new Map()
  let m
  const linkRe = new RegExp(BIB_LINK_RE.source, "gi")
  while ((m = linkRe.exec(text)) !== null) {
    if (!seen.has(m[2])) seen.set(m[2], m[1].trim())
  }
  const keyRe = new RegExp(BIB_KEY_RE.source, "gi")
  while ((m = keyRe.exec(text)) !== null) {
    if (!seen.has(m[1])) seen.set(m[1], m[1].replace(/_/g, " "))
  }
  return [...seen.entries()].map(([key, label]) => ({ key, label }))
}

function formatRefLine(n, key, _label, text, bibIndex) {
  return formatFoodReferenceLine(n, key, text, null, bibIndex)
}

function buildReferencesSection(refs, bibIndex) {
  const lines = refs.map((r, i) => formatRefLine(i + 1, r.key, r.label, r.text, bibIndex))
  return `## References\n\n${lines.join("\n\n")}\n`
}

function refsWithText(bibRefs, slug) {
  return bibRefs.map((r) => {
    if (r.text) return r
    const fallback = ALL_FALLBACK_REFS[slug]?.find((f) => f.key === r.key)
    if (fallback?.text) return { ...r, text: fallback.text }
    return { ...r, text: null }
  })
}

function getEaaBlock(slug, title) {
  if (COCOA_SLUGS.has(slug)) {
    return `### Essential Amino Acid Profile

${title} is not used as a primary protein food in this framework; typical servings are too small for essential amino-acid contribution to be the main reason to include it. Relevance here is polyphenol content and mineral density rather than protein quality.`
  }
  if (ANIMAL_SLUGS.has(slug)) {
    return `### Essential Amino Acid Profile

This food provides a complete essential amino acid profile typical of animal proteins.`
  }
  const name = title || "This food"
  return `### Essential Amino Acid Profile

${name} contributes plant protein. Pair with complementary protein sources (e.g. grains and legumes) for a balanced essential amino acid profile.`
}

function findEaaInsertIndex(content) {
  const prep = content.search(/\n### Preparation\s*$/m)
  if (prep !== -1) {
    const after = content.indexOf("\n", prep + 1)
    const nextH3 = content.slice(after).search(/\n### /)
    if (nextH3 !== -1) return after + nextH3
  }
  const recipes = content.indexOf("\n\n## Recipes")
  if (recipes !== -1) return recipes
  const table = content.indexOf("\n\n<NutritionTable")
  if (table !== -1) return table
  return -1
}

function stripOrphanBeforeReferences(content) {
  const refsIdx = content.search(/^##\s+References\s*$/m)
  if (refsIdx === -1) return content
  const before = content.slice(0, refsIdx)
  const substances = before.lastIndexOf("<FoodSubstancesFromTable")
  if (substances === -1) return content
  const subEnd = before.indexOf("/>", substances)
  if (subEnd === -1) return content
  const afterSubstances = subEnd + 2
  const between = before.slice(afterSubstances, refsIdx).trim()
  if (!between || between.startsWith("##")) return content
  return content.slice(0, afterSubstances) + "\n\n" + content.slice(refsIdx)
}

function migratePage(slug, foodsDir, bibIndex) {
  const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data: fm, content: initialContent } = matter(raw)
  const initialFm = JSON.parse(JSON.stringify(fm))
  let content = stripOrphanBeforeReferences(initialContent)
  const title = fm.title || slug.replace(/-/g, " ")

  let bibRefs = extractBibRefs(content)
  if (bibRefs.length === 0 && ALL_FALLBACK_REFS[slug]) {
    bibRefs = ALL_FALLBACK_REFS[slug]
  }
  if (bibRefs.length === 0) {
    bibRefs = extractBibRefs(content)
  }
  bibRefs = refsWithText(bibRefs, slug)

  const refsBefore = extractSection(content, /^##\s+References\s*$/m, [])
  const refsAlreadyCanonical =
    refsBefore &&
    refsBefore.body
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .every((l) => isExplainedReferenceLine(l))

  if (!refsAlreadyCanonical) {
    const newRefsSection = buildReferencesSection(bibRefs, bibIndex)
    if (refsBefore) {
      content = content.slice(0, refsBefore.start) + newRefsSection + content.slice(refsBefore.end)
    } else {
      content = `${content.trimEnd()}\n\n${newRefsSection}`
    }
  }

  if (requiresEaaSection(slug, fm.nutrition_per_100g || {}) && !hasEaaSection(content)) {
    const eaaBlock = getEaaBlock(slug, title)
    const insertIdx = findEaaInsertIndex(content)
    if (insertIdx !== -1) {
      content = `${content.slice(0, insertIdx)}\n\n${eaaBlock}\n${content.slice(insertIdx)}`
    }
  }

  if (COCOA_SLUGS.has(slug) && !fm.complementary_pairings) {
    fm.complementary_pairings = "Grains and legumes for balanced essential amino acid profile."
  }
  const initialContentNormalized = initialContent.trimEnd() + "\n"

  return {
    content: content.trimEnd() + "\n",
    fm,
    changed: content.trimEnd() + "\n" !== initialContentNormalized || JSON.stringify(fm) !== JSON.stringify(initialFm),
  }
}

function slugsWithoutBibRefs(foodsDir) {
  const dir = path.resolve(process.cwd(), foodsDir)
  const slugs = []
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".md") || file === "index.md" || file === "shopping-list.md") continue
    const slug = file.replace(/\.md$/, "")
    const { content } = matter(fs.readFileSync(path.join(dir, file), "utf8"))
    const m = content.match(/^## References\s*$/m)
    if (!m) continue
    const refsBody = content.slice(m.index)
    if (!/\/docs\/papers\/BRAIN-Diet-References#/.test(refsBody)) slugs.push(slug)
  }
  return slugs.sort()
}

function main() {
  const { letters, slugs: slugsArg, foodsDir, dryRun, remainingNoBib } = parseArgs(process.argv.slice(2))
  const bibIndex = loadBibIndex()

  let slugs = []
  if (remainingNoBib) {
    slugs = slugsWithoutBibRefs(foodsDir)
  } else if (slugsArg) {
    slugs = slugsArg.split(",").map((s) => s.trim()).filter(Boolean)
  } else if (letters) {
    const letterList = letters.split(",").map((l) => l.trim().toUpperCase()).filter(Boolean)
    slugs = slugsForLetters(foodsDir, letterList)
  }

  if (!slugs.length) {
    console.error(
      "Usage: node scripts/migrate-food-canonical-batch.mjs --letters A,B,C | --remaining-no-bib | --slugs tofu,nori",
    )
    process.exit(1)
  }

  console.log(`\nMigrating ${slugs.length} food pages…\n`)

  let updated = 0
  for (const slug of slugs) {
    const { content, fm, changed } = migratePage(slug, foodsDir, bibIndex)
    if (changed) {
      updated++
      if (!dryRun) {
        const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${slug}.md`)
        fs.writeFileSync(filePath, matter.stringify(content, fm, { lineWidth: 9999 }), "utf8")
      }
      console.log(`  updated: ${slug}`)
    }
  }

  console.log(`\n${dryRun ? "Would update" : "Updated"} ${updated} page(s).\n`)

  if (!dryRun) {
    const failures = runCanonicalValidation(foodsDir).filter((f) => slugs.includes(f.slug))
    if (failures.length) {
      console.log(`FAIL: ${failures.length} page(s) still not canonical:`)
      for (const { slug, issues } of failures) {
        console.log(`\n${slug}.md`)
        for (const issue of issues) console.log(`  - ${issue}`)
      }
      process.exit(1)
    }
    console.log(`OK: All ${slugs.length} pages pass canonical validation.\n`)
  }
}

main()
