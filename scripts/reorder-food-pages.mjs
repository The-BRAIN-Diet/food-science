#!/usr/bin/env node
/**
 * Reorder food pages to the canonical order requested:
 * 1) Overview
 * 2) Food Context (Synergies, Sourcing, Preparation)
 * 3) Recipes
 * 4) Nutrient Tables (via <NutritionTable .../>)
 * 5) Substances
 * 6) References (kept last if present)
 *
 * This script is intentionally conservative:
 * - Only touches docs/foods/*.md (not nested dirs)
 * - Only moves whole `##` sections by heading name
 * - Ensures the Food Context subsections are ordered (if they exist)
 */

import fs from "node:fs"
import path from "node:path"

const ROOT = path.join(import.meta.dirname, "..")
const FOODS_DIR = path.join(ROOT, "docs", "foods")

const FOOD_FILES = fs
  .readdirSync(FOODS_DIR)
  .filter((f) => f.endsWith(".md"))
  .filter((f) => !new Set(["index.md", "shopping-list.md"]).has(f))

function splitFrontMatter(content) {
  const m = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/)
  if (!m) return { fm: "", body: content }
  return { fm: m[0], body: content.slice(m[0].length) }
}

function headingKey(h) {
  return h.trim().toLowerCase()
}

function extractSections(body) {
  const lines = body.split(/\r?\n/)
  const sections = []
  let cur = { heading: "__preamble__", lines: [] }

  const push = () => {
    sections.push({ heading: cur.heading, content: cur.lines.join("\n").replace(/\s+$/, "") })
  }

  for (const line of lines) {
    const m = line.match(/^##\s+(.+?)\s*$/)
    if (m) {
      push()
      cur = { heading: m[1], lines: [line] }
    } else {
      cur.lines.push(line)
    }
  }
  push()
  return sections
}

function extractAndRemoveNutritionTable(body) {
  const lines = body.split(/\r?\n/)
  const kept = []
  const extracted = []
  for (const line of lines) {
    if (line.includes("<NutritionTable") && line.includes("details={frontMatter}")) {
      extracted.push(line)
      continue
    }
    kept.push(line)
  }
  return {
    body: kept.join("\n"),
    nutritionBlock: extracted.length ? extracted.join("\n").trim() : "",
  }
}

function pickSection(sections, title) {
  const key = headingKey(title)
  const idx = sections.findIndex((s) => headingKey(s.heading) === key)
  if (idx === -1) return { section: null, rest: sections }
  const section = sections[idx]
  const rest = sections.slice(0, idx).concat(sections.slice(idx + 1))
  return { section, rest }
}

function reorderFoodContextSection(sectionContent) {
  // Reorder only within Food Context: Synergies, Sourcing, Preparation (keep other subheads after)
  const lines = sectionContent.split(/\r?\n/)
  const blocks = []
  let cur = { sub: "__head__", lines: [] }

  const flush = () => blocks.push(cur)

  for (const line of lines) {
    const m = line.match(/^###\s+(.+?)\s*$/)
    if (m) {
      flush()
      cur = { sub: m[1], lines: [line] }
    } else {
      cur.lines.push(line)
    }
  }
  flush()

  const head = blocks.find((b) => b.sub === "__head__")?.lines.join("\n") ?? ""
  const byKey = new Map(
    blocks
      .filter((b) => b.sub !== "__head__")
      .map((b) => [headingKey(b.sub), b.lines.join("\n").replace(/\s+$/, "")])
  )

  const wanted = ["Synergies", "Sourcing", "Preparation"].map(headingKey)
  const out = [head.trimEnd()].filter(Boolean)

  for (const k of wanted) {
    const v = byKey.get(k)
    if (v) out.push(v)
  }

  // Append any other sub-blocks (e.g. Essential Amino Acid Profile) preserving original order
  for (const b of blocks) {
    if (b.sub === "__head__") continue
    const k = headingKey(b.sub)
    if (wanted.includes(k)) continue
    out.push(b.lines.join("\n").replace(/\s+$/, ""))
  }

  return out.filter(Boolean).join("\n\n").trimEnd()
}

function ensureNutritionTableAfterRecipes(sections) {
  // Some pages place <NutritionTable .../> outside its own section.
  // We don't create a heading; we simply keep that block in-place by treating it as part of a section.
  // So here we do nothing: ordering is handled by moving whole sections only.
  return sections
}

function normalizeSpacing(s) {
  // collapse >2 blank lines
  return s.replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "") + "\n"
}

let changed = 0

for (const file of FOOD_FILES) {
  const full = path.join(FOODS_DIR, file)
  const raw = fs.readFileSync(full, "utf8")
  const { fm, body } = splitFrontMatter(raw)
  const extracted = extractAndRemoveNutritionTable(body)
  const nutritionBlock = extracted.nutritionBlock
  const sections = ensureNutritionTableAfterRecipes(extractSections(extracted.body))

  // pull known sections
  let rest = sections
  const pre = pickSection(rest, "__preamble__"); rest = pre.rest
  const overview = pickSection(rest, "Overview"); rest = overview.rest
  const highlights = pickSection(rest, "Key Nutritional Highlights"); rest = highlights.rest
  const foodContext = pickSection(rest, "Food Context"); rest = foodContext.rest
  const recipes = pickSection(rest, "Recipes"); rest = recipes.rest
  const substances = pickSection(rest, "Substances"); rest = substances.rest
  const references = pickSection(rest, "References"); rest = references.rest

  // Anything else: keep but place before References (end)
  const others = rest
    .filter((s) => headingKey(s.heading) !== "__preamble__")
    .map((s) => s.content)
    .filter((c) => c.trim().length > 0)

  const ordered = []
  if (pre.section?.content?.trim()) ordered.push(pre.section.content.trimEnd())
  if (overview.section?.content?.trim()) ordered.push(overview.section.content.trimEnd())
  if (highlights.section?.content?.trim()) ordered.push(highlights.section.content.trimEnd())

  if (foodContext.section?.content?.trim()) {
    const fc = foodContext.section.content
    const reordered = reorderFoodContextSection(fc)
    ordered.push(reordered)
  }

  if (recipes.section?.content?.trim()) ordered.push(recipes.section.content.trimEnd())

  if (nutritionBlock) ordered.push(nutritionBlock)

  // Keep remaining sections (including any inline <NutritionTable.../> blocks) except Substances/References,
  // because we want Substances right before References.
  ordered.push(...others)

  if (substances.section?.content?.trim()) ordered.push(substances.section.content.trimEnd())
  if (references.section?.content?.trim()) ordered.push(references.section.content.trimEnd())

  const next = normalizeSpacing(fm + ordered.filter(Boolean).join("\n\n").trimEnd())
  if (next !== normalizeSpacing(raw)) {
    fs.writeFileSync(full, next, "utf8")
    changed++
  }
}

console.log(`Reordered food pages: ${changed} file(s) updated.`)

