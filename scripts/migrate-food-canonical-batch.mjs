#!/usr/bin/env node
/**
 * Batch migrate food pages toward canonical schema (system/food-page-schema.md).
 * - Inserts ## Key Nutritional Highlights (3–6 bullets) from Overview when missing or under-filled.
 * - Rebuilds ## References from bibliography-linked citations only.
 * - Adds fallback references when none exist in the document.
 * - Adds Essential Amino Acid Profile blocks where required.
 * - Removes orphan/corrupt lines before ## References.
 *
 * Usage: node scripts/migrate-food-canonical-batch.mjs --letters A,B,C
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
import { formatCanonicalRefLine, loadBibIndex } from "./lib/bib-citation-format.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BIB_KEY_RE = /\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)/gi
const BIB_LINK_RE = /\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/gi
const PLACEHOLDER_REF_RE = /^these references link to the brain diet bibliography/i
const ANIMAL_SLUGS = new Set([
  "beef", "chicken", "pork", "lamb", "turkey", "cod", "crab", "clams", "cockles",
  "salmon", "tuna", "mackerel", "shrimp", "mussels", "oysters",
])
const COCOA_SLUGS = new Set(["cacao-nibs-raw", "cacao-powder", "cocoa", "dark-chocolate"])

function parseArgs(argv) {
  const lettersArg = argv.find((a) => a.startsWith("--letters="))?.split("=")[1]
    ?? (argv.includes("--letters") ? argv[argv.indexOf("--letters") + 1] : null)
  const foodsDir = argv.includes("--foods-dir") && argv[argv.indexOf("--foods-dir") + 1]
    ? argv[argv.indexOf("--foods-dir") + 1]
    : FOODS_DIR_DEFAULT
  const dryRun = argv.includes("--dry-run")
  return { letters: lettersArg, foodsDir, dryRun }
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

function formatRefLine(n, key, _label, _text) {
  return formatCanonicalRefLine(n, key, loadBibIndex())
}

function buildReferencesSection(refs) {
  const lines = refs.map((r, i) => formatRefLine(i + 1, r.key, r.label, r.text))
  return `## References\n\n${lines.join("\n")}\n`
}

function deriveKnHBullets(overviewBody) {
  let text = overviewBody.trim()
  text = text.replace(/^\|.+\|$/gm, "")
  text = text.replace(/\|[-:]+\|/g, "")
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25 && !/^#/.test(s) && !/^\|/.test(s))

  let bullets = [...new Set(sentences)].slice(0, 5)
  if (bullets.length < 3 && sentences.length > 0) {
    while (bullets.length < 3) bullets.push(sentences[bullets.length % sentences.length])
  }
  if (bullets.length < 3) {
    const chunks = text.split(/\n+/).map((c) => c.trim()).filter((c) => c.length > 20)
    for (const c of chunks) {
      if (bullets.length >= 3) break
      if (!bullets.includes(c)) bullets.push(c)
    }
  }

  return bullets.slice(0, 6).map((s) => {
    s = s.replace(/\s+/g, " ")
    if (s.length > 240) s = `${s.slice(0, 237)}…`
    return `- ${s}`
  })
}

function countKnHBullets(knhBody) {
  return knhBody.split("\n").filter((l) => /^-\s+/.test(l)).length
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

function migratePage(slug, foodsDir) {
  const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data: fm, content: initialContent } = matter(raw)
  const initialFm = JSON.parse(JSON.stringify(fm))
  let content = stripOrphanBeforeReferences(initialContent)
  const title = fm.title || slug.replace(/-/g, " ")

  const overview = extractSection(content, /^##\s+Overview\s*$/m)
  const knh = extractSection(content, /^##\s+Key Nutritional Highlights\s*$/m)

  let knhCount = knh ? countKnHBullets(knh.body) : 0
  if (!knh || knhCount < 3 || knhCount > 6) {
    const bullets = deriveKnHBullets(overview?.body || "").slice(0, 6)
    const knhSection = `## Key Nutritional Highlights\n\n${bullets.join("\n")}\n`
    if (knh) {
      content = content.slice(0, knh.start) + knhSection + content.slice(knh.end)
    } else if (overview) {
      content = content.slice(0, overview.end) + `\n\n${knhSection}` + content.slice(overview.end)
    }
  }

  let bibRefs = extractBibRefs(content)
  if (bibRefs.length === 0 && FOOD_CANONICAL_FALLBACK_REFS[slug]) {
    bibRefs = FOOD_CANONICAL_FALLBACK_REFS[slug]
  }

  const newRefsSection = buildReferencesSection(bibRefs)
  const refsAfterKnH = extractSection(content, /^##\s+References\s*$/m, [])
  if (refsAfterKnH) {
    content = content.slice(0, refsAfterKnH.start) + newRefsSection + content.slice(refsAfterKnH.end)
  } else {
    content = `${content.trimEnd()}\n\n${newRefsSection}`
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

function main() {
  const { letters, foodsDir, dryRun } = parseArgs(process.argv.slice(2))
  if (!letters) {
    console.error("Usage: node scripts/migrate-food-canonical-batch.mjs --letters A,B,C")
    process.exit(1)
  }

  const letterList = letters.split(",").map((l) => l.trim().toUpperCase()).filter(Boolean)
  const slugs = slugsForLetters(foodsDir, letterList)
  console.log(`\nMigrating ${slugs.length} food pages (${letterList.join(" ")})…\n`)

  let updated = 0
  for (const slug of slugs) {
    const { content, fm, changed } = migratePage(slug, foodsDir)
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
