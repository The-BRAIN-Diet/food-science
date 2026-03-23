#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const FOODS_DIR = path.resolve(process.cwd(), "docs/foods")
const SKIP = new Set(["index.md", "shopping-list.md"])

function getRecipeBlockInfo(content) {
  const headingRegex = /^## Recipes\s*$/m
  const headingMatch = headingRegex.exec(content)
  if (!headingMatch) return null

  const start = headingMatch.index
  const afterHeading = start + headingMatch[0].length

  const nextHeadingRegex = /^##\s+/gm
  nextHeadingRegex.lastIndex = afterHeading
  const next = nextHeadingRegex.exec(content)
  const end = next ? next.index : content.length

  return {
    start,
    end,
    block: content.slice(start, end).trim(),
  }
}

function getOverviewInsertIndex(content) {
  const overviewHeadingRegex = /^## Overview\s*$/m
  const match = overviewHeadingRegex.exec(content)
  if (!match) return -1

  const afterOverviewHeading = match.index + match[0].length
  const nextHeadingRegex = /^##\s+/gm
  nextHeadingRegex.lastIndex = afterOverviewHeading
  const next = nextHeadingRegex.exec(content)
  if (!next) return content.length
  return next.index
}

function normalizeSpacing(text) {
  return (
    text
      // Trim trailing whitespace on lines
      .replace(/[ \t]+$/gm, "")
      // Avoid 3+ consecutive blank lines
      .replace(/\n{3,}/g, "\n\n")
      .trimEnd() + "\n"
  )
}

let touched = 0

for (const name of fs.readdirSync(FOODS_DIR)) {
  if (!name.endsWith(".md")) continue
  if (SKIP.has(name)) continue

  const filePath = path.join(FOODS_DIR, name)
  const raw = fs.readFileSync(filePath, "utf8")

  const recipeInfo = getRecipeBlockInfo(raw)
  if (!recipeInfo) continue

  const overviewInsert = getOverviewInsertIndex(raw)
  if (overviewInsert === -1) continue

  if (recipeInfo.start < overviewInsert) {
    continue
  }

  const withoutRecipes =
    raw.slice(0, recipeInfo.start).replace(/\s*$/, "\n\n") + raw.slice(recipeInfo.end).replace(/^\s*/, "")
  const insertAt = getOverviewInsertIndex(withoutRecipes)
  if (insertAt === -1) continue

  const nextContent =
    withoutRecipes.slice(0, insertAt).replace(/\s*$/, "\n\n") +
    recipeInfo.block +
    "\n\n" +
    withoutRecipes.slice(insertAt).replace(/^\s*/, "")

  fs.writeFileSync(filePath, normalizeSpacing(nextContent), "utf8")
  touched++
}

console.log(`Moved Recipes under Overview in ${touched} food pages.`)
