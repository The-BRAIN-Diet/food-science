#!/usr/bin/env node
/**
 * Global check: foods with no substances listed, or no BRS matrix applied.
 *
 * Run from repo root: node scripts/check-foods-global.js
 *
 * - "No substances": food front matter has no tags that match any substance doc
 *   (substance = doc under docs/substances/; match = food tag equals substance title, sidebar_label, or a tag on that substance).
 * - "No BRS matrix": food doc body does not contain <FoodMatrix.
 */

const fs = require("fs")
const path = require("path")

const DOCS = path.join(__dirname, "..", "docs")
const FOODS_DIR = path.join(DOCS, "foods")
const SUBSTANCES_DIR = path.join(DOCS, "substances")

const SKIP_FOOD_FILES = new Set(["index.md", "shopping-list.md"])

function extractFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  const yaml = match[1]
  const data = {}
  let inTags = false
  const tagLabels = []
  for (const line of yaml.split("\n")) {
    if (inTags) {
      if (line.match(/^\s+-\s+/)) {
        tagLabels.push(line.replace(/^\s+-\s+/, "").trim())
      } else {
        inTags = false
      }
    }
    if (line.startsWith("title:")) {
      data.title = line.replace(/^title:\s*/, "").trim().replace(/^["']|["']$/g, "")
    }
    if (line.startsWith("sidebar_label:")) {
      data.sidebar_label = line.replace(/^sidebar_label:\s*/, "").trim().replace(/^["']|["']$/g, "")
    }
    if (line.startsWith("tags:")) {
      inTags = true
      // inline array not supported here; only - list form
    }
  }
  if (tagLabels.length) data.tags = tagLabels
  return data
}

function getAllMdFiles(dir, base = dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === ".cursor") continue
      out.push(...getAllMdFiles(full, base))
    } else if (e.name.endsWith(".md")) {
      out.push(path.relative(base, full))
    }
  }
  return out
}

function buildSubstanceTagSet() {
  const substanceTagSet = new Set()
  const substancePaths = getAllMdFiles(SUBSTANCES_DIR)
  for (const rel of substancePaths) {
    const full = path.join(DOCS, "substances", rel)
    const content = fs.readFileSync(full, "utf8")
    const fm = extractFrontMatter(content)
    if (!fm) continue
    if (fm.title) substanceTagSet.add(fm.title.trim())
    if (fm.sidebar_label) substanceTagSet.add(fm.sidebar_label.trim())
    if (Array.isArray(fm.tags)) fm.tags.forEach((t) => substanceTagSet.add(String(t).trim()))
  }
  return substanceTagSet
}

function run() {
  const substanceTagSet = buildSubstanceTagSet()

  const foodPaths = getAllMdFiles(FOODS_DIR).filter((p) => {
    const name = path.basename(p)
    return !SKIP_FOOD_FILES.has(name)
  })

  const noSubstances = []
  const noMatrix = []

  for (const rel of foodPaths) {
    const full = path.join(FOODS_DIR, rel)
    const content = fs.readFileSync(full, "utf8")
    const fm = extractFrontMatter(content)
    const tags = Array.isArray(fm?.tags) ? fm.tags.map((t) => String(t).trim()) : []

    const hasSubstanceTag = tags.some((t) => substanceTagSet.has(t))
    if (!hasSubstanceTag) {
      noSubstances.push({ path: rel, title: fm?.title || rel })
    }

    if (!content.includes("<FoodMatrix")) {
      noMatrix.push({ path: rel, title: fm?.title || rel })
    }
  }

  console.log("=== Global check: foods ===\n")

  console.log("Foods with no substances listed (no tag matches any substance doc):")
  if (noSubstances.length === 0) {
    console.log("  (none)\n")
  } else {
    noSubstances.forEach(({ path: p, title }) => console.log(`  - ${p}  (${title})`))
    console.log(`  Total: ${noSubstances.length}\n`)
  }

  console.log("Foods without BRS matrix (<FoodMatrix not present):")
  if (noMatrix.length === 0) {
    console.log("  (none)\n")
  } else {
    noMatrix.forEach(({ path: p, title }) => console.log(`  - ${p}  (${title})`))
    console.log(`  Total: ${noMatrix.length}\n`)
  }

  const both = noSubstances.filter((s) => noMatrix.some((m) => m.path === s.path))
  if (both.length) {
    console.log("Foods missing both substances and BRS matrix:")
    both.forEach(({ path: p, title }) => console.log(`  - ${p}  (${title})`))
  }
}

run()
