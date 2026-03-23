#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const RECIPES_DIR = path.join(ROOT, "docs", "recipes")

const SKIP = new Set(["index.md"])

function listRecipeFiles(dir) {
  const out = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...listRecipeFiles(p))
    } else if (entry.isFile() && entry.name.endsWith(".md") && !SKIP.has(entry.name)) {
      out.push(p)
    }
  }
  return out
}

function toNumber(raw) {
  const n = Number(raw)
  return Number.isFinite(n) ? n : null
}

function formatOne(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, "")
}

function estimateDensityGPerMl(ingredientText) {
  const t = String(ingredientText || "").toLowerCase()
  if (/olive oil|oil|mct|vinegar|soy sauce/.test(t)) return 0.92
  if (/water|stock|broth|tea|coffee|juice/.test(t)) return 1.0
  if (/tomato pur|passata/.test(t)) return 1.05
  if (/yogurt|yoghurt|milk|kefir/.test(t)) return 1.03
  if (/honey|syrup/.test(t)) return 1.4
  if (/salt/.test(t)) return 1.2
  if (/sugar/.test(t)) return 0.85
  return 1.0
}

function mlToApproxG(ml, ingredientText) {
  const density = estimateDensityGPerMl(ingredientText)
  return `${formatOne(ml * density)} g (approx)`
}

function convertMlToKitchen(ml) {
  if (ml >= 240) return `${formatOne(ml / 240)} cup`
  if (ml >= 15) return `${formatOne(ml / 15)} tbsp`
  return `${formatOne(ml / 5)} tsp`
}

function convertGToKitchen(g) {
  if (g >= 28.35) return `${formatOne(g / 28.35)} oz`
  return `${formatOne(g / 5)} tsp (approx)`
}

function convertKitchenToMetric(qty, unit) {
  if (unit === "tbsp") return `${formatOne(qty * 15)} ml`
  if (unit === "tsp") return `${formatOne(qty * 5)} ml`
  if (unit === "cup") return `${formatOne(qty * 240)} ml`
  if (unit === "oz") return `${formatOne(qty * 28.35)} g`
  return null
}

function normalizeLine(line) {
  if (!line.trimStart().startsWith("- ")) return line

  // If line already has spoon->ml conversion, append approximate grams when missing.
  let existing = line.match(/^(\s*-\s*\d+(?:\.\d+)?\s*(tbsp|tsp|cup|cups)\s*)\(([^)]*)\)(.*)$/i)
  if (existing) {
    const unitRaw = existing[2].toLowerCase()
    const inside = existing[3]
    const rest = existing[4]
    if (!/\bg\b/i.test(inside)) {
      const qtyMatch = existing[1].match(/(\d+(?:\.\d+)?)/)
      const qty = qtyMatch ? toNumber(qtyMatch[1]) : null
      if (qty != null) {
        const unit = unitRaw === "cups" ? "cup" : unitRaw
        const ml = unit === "tbsp" ? qty * 15 : unit === "tsp" ? qty * 5 : qty * 240
        return `${existing[1]}(${inside}; ~${mlToApproxG(ml, rest)})${rest}`
      }
    }
    return line
  }

  // Skip other existing parenthetical conversions
  if (line.includes("(") && line.includes(")")) return line

  // e.g. "- 100 g mushrooms"
  let m = line.match(/^(\s*-\s*)(\d+(?:\.\d+)?)\s*(g|mg|µg|mcg|ml|l)\b(.*)$/i)
  if (m) {
    const prefix = m[1]
    const qty = toNumber(m[2])
    const unitRaw = m[3].toLowerCase()
    const rest = m[4]
    if (qty == null) return line

    if (unitRaw === "mg" || unitRaw === "µg" || unitRaw === "mcg") {
      // already metric-small; leave unchanged
      return line
    }

    if (unitRaw === "l") {
      const ml = qty * 1000
      return `${prefix}${formatOne(qty)} l (${convertMlToKitchen(ml)})${rest}`
    }

    if (unitRaw === "ml") {
      return `${prefix}${formatOne(qty)} ml (${convertMlToKitchen(qty)})${rest}`
    }

    if (unitRaw === "g") {
      return `${prefix}${formatOne(qty)} g (${convertGToKitchen(qty)})${rest}`
    }
  }

  // e.g. "- 2 tbsp olive oil"
  m = line.match(/^(\s*-\s*)(\d+(?:\.\d+)?)\s*(tbsp|tsp|cup|cups|oz)\b(.*)$/i)
  if (m) {
    const prefix = m[1]
    const qty = toNumber(m[2])
    const unitRaw = m[3].toLowerCase()
    const rest = m[4]
    if (qty == null) return line
    const unit = unitRaw === "cups" ? "cup" : unitRaw
    const metric = convertKitchenToMetric(qty, unit)
    if (!metric) return line
    if (unit === "tbsp" || unit === "tsp" || unit === "cup") {
      const ml = unit === "tbsp" ? qty * 15 : unit === "tsp" ? qty * 5 : qty * 240
      return `${prefix}${formatOne(qty)} ${unitRaw} (${metric}; ~${mlToApproxG(ml, rest)})${rest}`
    }
    return `${prefix}${formatOne(qty)} ${unitRaw} (${metric})${rest}`
  }

  return line
}

function transformIngredientsSection(content) {
  const lines = content.split("\n")
  let inIngredients = false
  let changed = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^## Ingredients\b/i.test(line.trim())) {
      inIngredients = true
      continue
    }
    if (inIngredients && /^##\s+/.test(line.trim())) {
      inIngredients = false
    }
    if (!inIngredients) continue

    const next = normalizeLine(line)
    if (next !== line) {
      lines[i] = next
      changed++
    }
  }

  return { content: lines.join("\n"), changed }
}

function main() {
  const files = listRecipeFiles(RECIPES_DIR)
  let filesChanged = 0
  let linesChanged = 0

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8")
    const { content, changed } = transformIngredientsSection(raw)
    if (changed > 0) {
      fs.writeFileSync(file, content, "utf8")
      filesChanged++
      linesChanged += changed
    }
  }

  console.log(`Recipe unit standardization complete: files=${filesChanged}, lines=${linesChanged}`)
}

main()
