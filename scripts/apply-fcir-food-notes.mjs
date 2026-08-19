#!/usr/bin/env node
/**
 * Apply concise FCIR food-page notes from the canonical case dataset.
 * Does not change nutrient quantities.
 */
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"
import {foodPageNote, foodSlugsByCase, loadFcirRegister} from "./lib/fcir-register.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const FOODS = path.join(ROOT, "docs/foods")

function replaceAlaInterpretedNote(raw, caseId, note) {
  const re = /(  - key: ala_interpreted\n(?:    .+\n)*?)    source_note: >-\n(?:      .+\n)+/
  if (!re.test(raw)) return raw
  return raw.replace(re, (full, head) => {
    let next = head
    if (!/exclude_from_recipe_sum:/.test(next)) {
      next += "    exclude_from_recipe_sum: true\n"
    }
    if (!/fcir_case:/.test(next)) {
      next += `    fcir_case: ${caseId}\n`
    }
    return `${next}    source_note: ${note}\n`
  })
}

function ensureFcirCases(raw, ids) {
  const block = `fcir_cases:\n${ids.map((id) => `  - ${id}`).join("\n")}\n`
  if (/^fcir_cases:/m.test(raw)) {
    return raw.replace(/^fcir_cases:\n(?:  - FCIR-\d{3}\n)+/m, block)
  }
  return raw.replace(/^(id: [^\n]+\n)/m, `$1${block}`)
}

const register = loadFcirRegister(ROOT)
const bySlug = foodSlugsByCase(register)
let changed = 0
for (const [slug, ids] of bySlug) {
  const file = path.join(FOODS, `${slug}.md`)
  if (!fs.existsSync(file)) {
    console.warn(`skip missing food page: ${slug}`)
    continue
  }
  const original = fs.readFileSync(file, "utf8")
  let next = ensureFcirCases(original, ids)
  for (const id of ids) {
    const note = foodPageNote(id, register)
    next = replaceAlaInterpretedNote(next, id, note)
  }
  if (next !== original) {
    fs.writeFileSync(file, next)
    changed += 1
    console.log(`updated ${slug} → ${ids.join(", ")}`)
  }
}
console.log(`patched ${changed} food pages`)
