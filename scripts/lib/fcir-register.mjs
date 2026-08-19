import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const REGISTER_JSON = path.join(ROOT, "src/data/fcir-register.json")

export const FCIR_JSON_PATH = REGISTER_JSON
export const GENERATED_START = "<!-- fcir-generated:start -->"
export const GENERATED_END = "<!-- fcir-generated:end -->"

export function loadFcirRegister(root = ROOT) {
  const file = path.join(root, "src/data/fcir-register.json")
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

export function fcirAnchor(caseId) {
  return String(caseId || "").trim().toLowerCase()
}

export function fcirHref(caseId, register = loadFcirRegister()) {
  return `${register.public_path}#${fcirAnchor(caseId)}`
}

export function foodPageNote(caseId, register = loadFcirRegister()) {
  return register.food_page_note_template.replace("{id}", caseId)
}

export function caseById(caseId, register = loadFcirRegister()) {
  return (register.cases || []).find((entry) => entry.id === caseId)
}

export function foodSlugsByCase(register = loadFcirRegister()) {
  const map = new Map()
  for (const entry of register.cases || []) {
    for (const slug of entry.food_slugs || []) {
      if (!map.has(slug)) map.set(slug, [])
      map.get(slug).push(entry.id)
    }
  }
  return map
}

function cell(text) {
  return String(text || "").replace(/\|/g, "\\|").replace(/\n+/g, " ")
}

function renderSummaryRow(entry) {
  return `| **[${entry.id}](#${entry.anchor})** | ${cell(entry.food_or_scope)} | ${cell(entry.problem)} | ${cell(entry.interpretation_public)} | **Source:** ${cell(entry.source_public)} | **${cell(entry.status)}** |`
}

function renderCaseRecord(entry) {
  const publicRow = entry.public_row
    ? `\nPublic row: \`${entry.public_row}\` on the food page.\n`
    : "\n"
  const recipes =
    Array.isArray(entry.recipes) && entry.recipes.length
      ? `\nRecipes using this interpretation: ${entry.recipes
          .map((recipe) => `[${recipe.title}](${recipe.href})`)
          .join("; ")}\n`
      : ""
  return `### ${entry.id} — ${entry.title} {#${entry.anchor}}
${publicRow}${recipes}
| Decision | Action | Source |
| --- | --- | --- |
| ${cell(entry.decision)} | ${cell(entry.action)} | ${cell(entry.source_public)} |
`
}

export function renderGeneratedFcirMarkdown(register = loadFcirRegister()) {
  const rows = (register.cases || []).map(renderSummaryRow).join("\n")
  const meanings = Object.entries(register.status_meanings || {})
    .map(([status, meaning]) => `- **${status}:** ${meaning}`)
    .join("\n")
  const records = (register.cases || []).map(renderCaseRecord).join("\n")
  const editorial = register.editorial || {}
  return `${GENERATED_START}

## Register

<div className="fcir-register">

| Case | Food or scope | What created the problem | Current interpretation and public treatment | Evidence required or used | Status |
| --- | --- | --- | --- | --- | --- |
${rows}

</div>

### Status meanings

${meanings}

### Editorial ownership

**Scientific provenance lead:** ${editorial.scientific_provenance_lead}
**Review cycle:** ${editorial.review_cycle}
**Last substantive review:** ${editorial.last_substantive_review}

${editorial.project_scope}

## Case records

Each case repeats the same three labels so Decision, Action and Source can be read in parallel.

${records}
${GENERATED_END}`
}

export function extractGeneratedBlock(markdown) {
  const start = markdown.indexOf(GENERATED_START)
  const end = markdown.indexOf(GENERATED_END)
  if (start === -1 || end === -1 || end < start) return null
  return markdown.slice(start, end + GENERATED_END.length)
}

export function patchPublicFcirPage(markdown, register = loadFcirRegister()) {
  const generated = renderGeneratedFcirMarkdown(register)
  const existing = extractGeneratedBlock(markdown)
  if (existing) return markdown.replace(existing, generated)
  if (!markdown.includes("## Related pages")) {
    return `${markdown.trim()}\n\n${generated}\n`
  }
  return markdown.replace("## Related pages", `${generated}\n\n## Related pages`)
}
