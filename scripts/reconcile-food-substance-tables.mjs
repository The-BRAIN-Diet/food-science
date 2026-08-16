#!/usr/bin/env node
/**
 * Reconcile food pages without converting the ontology into a public table dump.
 *
 * - May fill USDA SR Legacy quantitative panels when a preferred record exists
 *   (merge into existing values; do not treat SR omission as absence)
 * - Do not drop valid tags because they lack a table row
 * - Delete only incorrectly scoped relationships (Nitric Oxide)
 * - Re-scope Vitamin K2 on non-K2 foods to Vitamin K when phylloquinone is present
 * - Do not auto-create nutritional-table rows for every tagged bioactive
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { mappedNutrientCount } from "./lib/usda-nutrient-extract.mjs"
import { loadSrLegacyIndex, lookupPreferred, srLegacyAvailable } from "./lib/usda-sr-legacy-local.mjs"
import { reconcileFoodPage } from "./lib/food-truth-reconciliation.mjs"
import {
  DROP_TAGS_ALWAYS,
  K2_FOOD_SLUGS,
} from "./data/food-substance-reconcile-policy.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FOODS_DIR = path.resolve(__dirname, "../docs/foods")
const PREFERRED_PATH = path.join(__dirname, "data/usda-sr-preferred-descriptions.json")

const dryRun = process.argv.includes("--dry-run")
const slugFilterIdx = process.argv.indexOf("--slug")
const slugFilter = slugFilterIdx !== -1 ? process.argv[slugFilterIdx + 1] : null

function loadPreferred() {
  return JSON.parse(fs.readFileSync(PREFERRED_PATH, "utf8"))
}

function shouldDropTag(slug, tag) {
  if (DROP_TAGS_ALWAYS.has(tag)) return true
  if (tag === "Vitamin K2" && !K2_FOOD_SLUGS.has(slug)) return true
  return false
}

function mergeNutrition(existing, extracted) {
  const next = { ...(existing || {}) }
  for (const [key, value] of Object.entries(extracted || {})) {
    if (typeof value !== "number" || !(value > 0)) continue
    next[key] = value
  }
  return next
}

function writePage(filePath, parsed) {
  const output = matter.stringify(parsed.content.replace(/^\n/, ""), parsed.data)
  fs.writeFileSync(filePath, output.endsWith("\n") ? output : `${output}\n`, "utf8")
}

function main() {
  if (!srLegacyAvailable()) {
    console.error("USDA SR Legacy CSV dump is required (scripts/data/usda-sr-legacy/).")
    process.exit(1)
  }
  const preferred = loadPreferred()
  const index = loadSrLegacyIndex()
  const files = fs.readdirSync(FOODS_DIR).filter((f) => f.endsWith(".md") && f !== "index.md" && f !== "shopping-list.md")
  const stats = {
    pages: 0,
    srApplied: 0,
    srMissing: [],
    tagsDropped: 0,
    remainingMissing: [],
  }

  for (const file of files) {
    const slug = file.replace(/\.md$/, "")
    if (slugFilter && slug !== slugFilter) continue
    const filePath = path.join(FOODS_DIR, file)
    const raw = fs.readFileSync(filePath, "utf8")
    const parsed = matter(raw)
    const fm = parsed.data
    stats.pages++

    const desc = preferred[slug]
    if (desc) {
      const hit = lookupPreferred(desc, index)
      if (hit && mappedNutrientCount(hit.nutrients) > 0) {
        fm.nutrition_per_100g = mergeNutrition(fm.nutrition_per_100g, hit.nutrients)
        fm.nutrition_source = {
          database: "USDA FoodData Central",
          food_name: hit.chosen.description,
          fdc_id: hit.chosen.fdcId,
          retrieval_method: "SR Legacy bulk (April 2018)",
          basis: "per 100 g edible portion",
          last_checked: "2026-08-15",
        }
        stats.srApplied++
      } else {
        stats.srMissing.push(`${slug} (preferred description not in dump)`)
      }
    }

    const origTags = Array.isArray(fm.tags) ? fm.tags : []
    const nextTags = []
    for (const tag of origTags) {
      if (shouldDropTag(slug, tag)) {
        stats.tagsDropped++
        continue
      }
      nextTags.push(tag)
    }
    if (origTags.includes("Vitamin K2") && !K2_FOOD_SLUGS.has(slug)) {
      const hasK = typeof fm.nutrition_per_100g?.vitamin_k_ug === "number" && fm.nutrition_per_100g.vitamin_k_ug > 0
      if (hasK && !nextTags.includes("Vitamin K")) nextTags.push("Vitamin K")
    }
    fm.tags = nextTags

    parsed.data = fm
    if (!dryRun) writePage(filePath, parsed)

    const result = reconcileFoodPage(fm, { substanceLookup: [] })
    if (result.tableRowsMissingSupport.length) {
      stats.remainingMissing.push({ slug, items: result.tableRowsMissingSupport })
    }
  }

  console.log("--- Food substance table reconcile ---")
  console.log("Pages processed:", stats.pages)
  console.log("SR Legacy panels applied:", stats.srApplied)
  console.log("Tags dropped (incorrect scope only):", stats.tagsDropped)
  if (stats.srMissing.length) {
    console.log("Preferred SR description missing:", stats.srMissing.length)
    stats.srMissing.forEach((s) => console.log(" ", s))
  }
  if (stats.remainingMissing.length) {
    console.log("Public table rows missing support:", stats.remainingMissing.length)
    for (const { slug, items } of stats.remainingMissing) {
      console.log(`  ${slug}: ${items.join("; ")}`)
    }
  } else {
    console.log("OK: public table rows have source support")
  }
  if (dryRun) console.log("(dry run — files not written)")
}

main()
