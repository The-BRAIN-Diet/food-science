#!/usr/bin/env node
/**
 * Script C — Food page updater / transfer
 *
 * Takes the combined output of Script A and Script B (payload JSON) and
 * updates the food page front matter safely. Only nutrition-related keys
 * are written; all other front matter and the body are preserved.
 *
 * Usage:
 *   node scripts/update-food-page-frontmatter.mjs --page docs/foods/salmon.md --payload scripts/out/salmon.json
 *   node scripts/update-food-page-frontmatter.mjs --page docs/foods/salmon.md --payload scripts/out/salmon.json --dry-run
 *   node scripts/update-food-page-frontmatter.mjs --all --pages-dir docs/foods --payload-dir scripts/out
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SKIP_SLUGS = new Set(["index", "shopping-list"])

const NUTRITION_KEYS = [
  "nutrition_per_100g",
  "nutrition_source",
  "nutrition_supplementary_sources",
  "nutrition_functional_metrics",
  "protein_profile_note",
  "amino_acid_strengths",
  "limiting_amino_acids",
  "complementary_pairings",
]

function getFoodSlugs(pagesDir) {
  const abs = path.resolve(process.cwd(), pagesDir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.basename(f, ".md"))
    .filter((slug) => !SKIP_SLUGS.has(slug))
    .sort()
}

function buildPayloadFromFrontMatter(data) {
  const payload = {
    nutrition_per_100g: data.nutrition_per_100g || {},
    nutrition_source: data.nutrition_source || {},
  }
  if (data.nutrition_supplementary_sources?.length) payload.nutrition_supplementary_sources = data.nutrition_supplementary_sources
  if (data.protein_profile_note != null) payload.protein_profile_note = data.protein_profile_note
  if (data.amino_acid_strengths != null) payload.amino_acid_strengths = data.amino_acid_strengths
  if (data.limiting_amino_acids != null) payload.limiting_amino_acids = data.limiting_amino_acids
  if (data.complementary_pairings != null) payload.complementary_pairings = data.complementary_pairings
  return payload
}

function parseArgs() {
  const args = process.argv.slice(2)
  const out = { page: null, payload: null, dryRun: false, all: false, pagesDir: "docs/foods", payloadDir: "scripts/out" }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--page" && args[i + 1]) {
      out.page = args[++i]
    } else if (args[i] === "--payload" && args[i + 1]) {
      out.payload = args[++i]
    } else if (args[i] === "--dry-run") {
      out.dryRun = true
    } else if (args[i] === "--all") {
      out.all = true
    } else if (args[i] === "--pages-dir" && args[i + 1]) {
      out.pagesDir = args[++i]
    } else if (args[i] === "--payload-dir" && args[i + 1]) {
      out.payloadDir = args[++i]
    }
  }
  return out
}

/**
 * Read payload from file or stdin (--payload -).
 */
function readPayload(payloadArg) {
  if (payloadArg === "-" || !payloadArg) {
    return new Promise((resolve, reject) => {
      const chunks = []
      process.stdin.on("data", (ch) => chunks.push(ch))
      process.stdin.on("end", () => {
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")))
        } catch (e) {
          reject(new Error("Invalid JSON from stdin: " + e.message))
        }
      })
      process.stdin.on("error", reject)
    })
  }
  const abs = path.resolve(process.cwd(), payloadArg)
  if (!fs.existsSync(abs)) {
    throw new Error(`Payload file not found: ${abs}`)
  }
  return Promise.resolve(JSON.parse(fs.readFileSync(abs, "utf8")))
}

/**
 * Merge only NUTRITION_KEYS from payload into front matter.
 * Do not overwrite nutrition_per_100g with empty object when the page already has data (preserves existing when payload has no USDA match).
 */
function mergePayloadIntoFrontMatter(frontMatter, payload) {
  const next = { ...frontMatter }
  for (const key of NUTRITION_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(payload, key)) continue
    const value = payload[key]
    if (value === undefined) continue
    if (
      key === "nutrition_per_100g" &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0 &&
      frontMatter.nutrition_per_100g &&
      typeof frontMatter.nutrition_per_100g === "object" &&
      Object.keys(frontMatter.nutrition_per_100g).length > 0
    ) {
      continue
    }
    next[key] = value
  }
  return next
}

function runOne(pagePath, payload, dryRun, quiet = false) {
  const pageAbs = path.resolve(process.cwd(), pagePath)
  if (!fs.existsSync(pageAbs)) {
    console.error(`Page not found: ${pageAbs}`)
    process.exit(1)
  }

  const raw = fs.readFileSync(pageAbs, "utf8")
  const lineEnding = raw.includes("\r\n") ? "\r\n" : "\n"
  const parsed = matter(raw)
  const merged = mergePayloadIntoFrontMatter(parsed.data, payload)
  const output = matter.stringify(parsed.content, merged)
  const normalized = lineEnding === "\r\n" ? output.replace(/\n/g, "\r\n") : output.replace(/\r\n/g, "\n")

  if (dryRun) {
    if (!quiet) console.log(normalized)
    return
  }
  fs.writeFileSync(pageAbs, normalized, "utf8")
  if (!quiet) console.log(`Updated: ${pagePath}`)
}

function runAll(pagesDir, payloadDir, dryRun) {
  const pagesAbs = path.resolve(process.cwd(), pagesDir)
  fs.mkdirSync(path.resolve(process.cwd(), payloadDir), { recursive: true })
  if (!fs.existsSync(pagesAbs)) {
    console.error("--pages-dir not found.")
    process.exit(1)
  }
  const slugs = getFoodSlugs(pagesDir)
  const stats = { pagesUpdated: 0, payloadsCreated: 0, skipped: [] }
  for (const slug of slugs) {
    const pagePath = path.join(pagesDir, `${slug}.md`)
    const pageAbs = path.resolve(process.cwd(), pagePath)
    const payloadPath = path.join(payloadDir, `${slug}.json`)
    const payloadAbs = path.resolve(process.cwd(), payloadPath)
    let payload
    if (fs.existsSync(payloadAbs)) {
      try {
        payload = JSON.parse(fs.readFileSync(payloadAbs, "utf8"))
      } catch (e) {
        stats.skipped.push(`${slug} (invalid JSON)`)
        continue
      }
    } else {
      if (!fs.existsSync(pageAbs)) {
        stats.skipped.push(slug)
        continue
      }
      const raw = fs.readFileSync(pageAbs, "utf8")
      const parsed = matter(raw)
      payload = buildPayloadFromFrontMatter(parsed.data)
      stats.payloadsCreated++
    }
    runOne(pagePath, payload, dryRun, true)
    if (!dryRun) stats.pagesUpdated++
  }
  console.log("\n--- Nutrition pipeline summary (Script C) ---")
  console.log("Foods detected:", slugs.length)
  console.log("Pages updated:", stats.pagesUpdated)
  console.log("Payloads created (from front matter):", stats.payloadsCreated)
  console.log("Skipped:", stats.skipped.length)
  if (stats.skipped.length) stats.skipped.forEach((s) => console.log("  ", s))
}

async function main() {
  const args = parseArgs()
  if (args.all) {
    if (!args.pagesDir || !args.payloadDir) {
      console.error("With --all, provide --pages-dir and --payload-dir.")
      process.exit(1)
    }
    runAll(args.pagesDir, args.payloadDir, args.dryRun)
    return
  }
  if (!args.page) {
    console.error("Usage: node update-food-page-frontmatter.mjs --page <path> --payload <path|-> [--dry-run]")
    console.error("   or: node update-food-page-frontmatter.mjs --all --pages-dir <dir> --payload-dir <dir> [--dry-run]")
    process.exit(1)
  }
  const payload = await readPayload(args.payload || "-")
  runOne(args.page, payload, args.dryRun)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
