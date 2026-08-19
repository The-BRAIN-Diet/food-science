import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const REGISTER_JSON = path.join(ROOT, "src/data/fcir-register.json")

export const FCIR_JSON_PATH = REGISTER_JSON
export const GENERATED_START = "<!-- fcir-generated:start -->"
export const GENERATED_END = "<!-- fcir-generated:end -->"
export const NOT_ESTABLISHED = "Not established"
export const GSRS_UNII_URL_PREFIX = "https://precision.fda.gov/uniisearch/srs/unii/"
export const GSRS_SEARCH_RULE =
  "GSRS searches operate on canonical substance identity, structure, CAS number and synonyms—not FDC nutrient numbers. FDC numbers belong only in the composition-source field."
export const PINNED_REJECTED_GSRS_SUBSTANCES = [
  {display_name: "Alanine", unii: "OF5P57N2ZX", preferred_name: "ALANINE"},
  {display_name: "Beta-alanine", unii: "11P2JDE17B", preferred_name: ".BETA.-ALANINE"},
  {display_name: "Phenylalanine", unii: "47E5O17Y3R", preferred_name: "PHENYLALANINE"},
]
export const PINNED_GSRS_SUBSTANCES = [
  {display_name: "Alanine", unii: "OF5P57N2ZX", preferred_name: "ALANINE"},
  {display_name: "Alpha-linolenic acid", unii: "0RBV727H71", preferred_name: "LINOLENIC ACID"},
  {display_name: "GLA/gamolenic acid", unii: "78YC2MAX4O", preferred_name: "GAMOLENIC ACID"},
  {display_name: "EPA/icosapent", unii: "AAN7QOV9EA", preferred_name: "ICOSAPENT"},
  {display_name: "DHA/doconexent", unii: "ZAD9OKH9JC", preferred_name: "DOCONEXENT"},
  {display_name: "Cordycepin", unii: "GZ8VF4M2J8", preferred_name: "CORDYCEPIN"},
  {display_name: "Adenosine", unii: "K72T3FS567", preferred_name: "ADENOSINE"},
]
export const GSRS_ROLES = [
  "Verified identity",
  "Identity considered",
  "Rejected identity",
  "Unresolvable source field",
  "Not applicable—broad class",
  "No public GSRS match located",
]

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

export function identityGroup(identity, key) {
  const group = identity?.[key]
  return {
    active: Array.isArray(group?.active) ? group.active : [],
    supporting: Array.isArray(group?.supporting) ? group.supporting : [],
    rejected: Array.isArray(group?.rejected) ? group.rejected : [],
  }
}

function typedIds(items = []) {
  return items.map((item) => String(item.id || "").trim()).filter(Boolean)
}

function overlap(left, right) {
  const set = new Set(left)
  return right.filter((id) => set.has(id))
}

function gsrsMappings(entry) {
  return Array.isArray(entry?.identity?.gsrs_mappings) ? entry.identity.gsrs_mappings : []
}

function officialGsrsHref(unii) {
  return `${GSRS_UNII_URL_PREFIX}${unii}`
}

function requiredString(value, label, caseId, errors) {
  const text = String(value ?? "").trim()
  if (!text) errors.push(`${caseId}: ${label} is blank; use "${NOT_ESTABLISHED}" rather than omitting it`)
  return text
}

function hasSourceRecord(identity) {
  const food = identityGroup(identity, "fdc_food_id")
  const other = identityGroup(identity, "doi_or_database")
  return food.active.length > 0 || other.active.length > 0
}

function isNamedNutrientIdentifier(item) {
  const id = String(item?.id || "").trim()
  const text = `${id} ${item?.label || ""}`.toLowerCase()
  if (id === "1270" || /unqualified 18:3/.test(text)) return false
  if (/amino-acid|alanine/.test(text) && !/1404|n‑3|n-3/.test(text)) return false
  return /1404|1278|1280|1272|1405|1407|18:3 n|ala|epa|dha/.test(text)
}

function hasNutrientOrSubstanceIdentifier(identity) {
  const nutrients = identityGroup(identity, "fdc_nutrient_id")
  const namedNutrient = [...nutrients.active, ...nutrients.supporting].some(isNamedNutrientIdentifier)
  const substance = String(identity?.substance_identifier || "").trim()
  const dois = identityGroup(identity, "doi_or_database")
  const chemical = String(identity?.canonical_chemical_name || "").trim()
  const namedByLiterature =
    dois.supporting.length > 0 &&
    chemical !== NOT_ESTABLISHED &&
    /alpha-linolenic|γ-linolenic|gamma-linolenic|\bALA\b|\bEPA\b|\bDHA\b|\bGLA\b/i.test(chemical)
  const namedByGsrs = gsrsMappings({identity}).some(
    (item) => item.role === "Verified identity" && item.unii,
  )
  return namedNutrient || (substance && substance !== NOT_ESTABLISHED) || namedByLiterature || namedByGsrs
}

export function validateFcirRegister(register = loadFcirRegister()) {
  const errors = []
  const seen = new Set()
  for (const entry of register.cases || []) {
    const id = entry.id || "(missing id)"
    if (!/^FCIR-\d{3}$/.test(entry.id || "")) errors.push(`${id}: Case ID must be FCIR-NNN`)
    if (seen.has(entry.id)) errors.push(`${id}: Case ID appears more than once`)
    seen.add(entry.id)
    if (entry.anchor !== fcirAnchor(entry.id)) errors.push(`${id}: anchor must be ${fcirAnchor(entry.id)}`)
    if (!entry.decision || !entry.action || !entry.source_public || !entry.status) {
      errors.push(`${id}: decision, action, source and status are required`)
    }
    const identity = entry.identity
    if (!identity || typeof identity !== "object") {
      errors.push(`${id}: identity identifiers field is missing`)
      continue
    }
    requiredString(identity.scientific_species, "scientific species", id, errors)
    requiredString(identity.material_form, "food material or product form", id, errors)
    requiredString(identity.canonical_chemical_name, "canonical chemical name", id, errors)
    requiredString(identity.identity_at_issue, "identity at issue", id, errors)
    requiredString(identity.food_material, "food/material identity", id, errors)
    const mappings = gsrsMappings(entry)
    if (!mappings.length) errors.push(`${id}: GSRS/UNII mappings are missing`)
    if (String(identity.substance_identifier || "").trim() === NOT_ESTABLISHED) {
      errors.push(`${id}: GSRS/UNII must not use "${NOT_ESTABLISHED}"`)
    }
    for (const mapping of mappings) {
      if (!GSRS_ROLES.includes(mapping.role)) {
        errors.push(`${id}: unknown GSRS role ${mapping.role}`)
      }
      const display = String(mapping.display_name || "").trim()
      if (/^(USDA|FDC) nutrient(?: ID)?\s*\d+/i.test(display)) {
        errors.push(`${id}: GSRS identity must be the canonical substance name, not an FDC nutrient number`)
      }
      if (mapping.unii) {
        if (mapping.href !== officialGsrsHref(mapping.unii)) {
          errors.push(`${id}: ${mapping.unii} must use the official GSRS UNII URL`)
        }
        if (!mapping.preferred_name) errors.push(`${id}: ${mapping.unii} is missing the GSRS preferred name`)
      }
    }

    for (const key of ["fdc_food_id", "fdc_nutrient_id", "doi_or_database"]) {
      const group = identityGroup(identity, key)
      const clash = overlap(typedIds(group.active), typedIds(group.rejected))
      if (clash.length) {
        errors.push(`${id}: rejected ${key} identifier ${clash.join(", ")} must not appear as active provenance`)
      }
    }

    if (entry.publishes_resolved_quantity) {
      const foodMaterial = String(identity.food_material || "").trim()
      const materialForm = String(identity.material_form || "").trim()
      if (!foodMaterial || foodMaterial === NOT_ESTABLISHED) {
        errors.push(`${id}: resolved quantitative cases must name the exact food/material identity`)
      }
      if (!materialForm || materialForm === NOT_ESTABLISHED) {
        errors.push(`${id}: resolved quantitative cases must name the food material or product form`)
      }
      if (!hasSourceRecord(identity)) {
        errors.push(`${id}: resolved quantitative cases must name a source record identifier (FDC food ID or other database/regulatory record)`)
      }
      if (entry.chemically_ambiguous_nutrient) {
        const state = String(entry.nutrient_identity_state || "").trim()
        if (state === "unresolved") {
          const nutrients = identityGroup(identity, "fdc_nutrient_id")
          const unresolvedNamed =
            nutrients.supporting.some((item) => /unresolved/i.test(`${item.label || ""} ${item.note || ""}`)) ||
            String(identity.canonical_chemical_name || "").toLowerCase().includes("unresolved")
          if (!unresolvedNamed) {
            errors.push(`${id}: chemically ambiguous nutrient must name a nutrient/substance identifier or explicitly state that it remains unresolved`)
          }
        } else if (state !== "identified" || !hasNutrientOrSubstanceIdentifier(identity)) {
          errors.push(`${id}: chemically ambiguous nutrient must name the nutrient/substance identifier or explicitly state that it remains unresolved`)
        }
      }
    }
  }

  const catalog = register.gsrs_catalog || {}
  const searchRule = String(register.editorial?.gsrs_search_rule || "").trim()
  if (searchRule !== GSRS_SEARCH_RULE) {
    errors.push("editorial.gsrs_search_rule must state that GSRS searches use chemical identity, not FDC numbers")
  }
  const precisionNote = String(register.editorial?.precision_nutrition_note || "").trim()
  if (!/precision nutrition/i.test(precisionNote) || !/clinical trials/i.test(precisionNote)) {
    errors.push("editorial.precision_nutrition_note must explain identity tracking for eventual clinical trials")
  }
  for (const pinned of PINNED_GSRS_SUBSTANCES) {
    const record = Object.values(catalog).find((item) => item.unii === pinned.unii)
    if (!record) {
      errors.push(`GSRS catalog is missing pinned UNII ${pinned.unii} (${pinned.preferred_name})`)
      continue
    }
    if (record.preferred_name !== pinned.preferred_name) {
      errors.push(`${pinned.unii} preferred name drifted from ${pinned.preferred_name}`)
    }
  }
  return errors
}

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/'/g, "&#39;")
}

export function inlineMdToHtml(text) {
  const tokens = []
  const stash = (html) => {
    const key = `\u0000${tokens.length}\u0000`
    tokens.push(html)
    return key
  }
  let working = String(text ?? "")
  working = working.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) =>
    stash(`<a href="${escapeAttr(href)}">${inlineMdToHtml(label)}</a>`),
  )
  working = working.replace(/`([^`]+)`/g, (_, code) => stash(`<code>${escapeHtml(code)}</code>`))
  working = working.replace(/\*\*([^*]+)\*\*/g, (_, bold) => stash(`<strong>${inlineMdToHtml(bold)}</strong>`))
  working = working.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:]|$)/g, (_, prefix, em) => `${prefix}${stash(`<em>${inlineMdToHtml(em)}</em>`)}`)
  working = escapeHtml(working).replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)])
  return working
}

function formatTypedId(item) {
  const type = item.type || "Identifier"
  const id = item.id ? String(item.id) : NOT_ESTABLISHED
  const label = item.label ? ` (${inlineMdToHtml(item.label)})` : ""
  const note = item.note ? ` — ${inlineMdToHtml(item.note)}` : ""
  if (item.type === "FDC food ID" && item.href && id !== NOT_ESTABLISHED) {
    return `${escapeHtml(type)} — <a href="${escapeAttr(item.href)}">FDC ${escapeHtml(id)}</a>${label}${note}`
  }
  if (item.type === "DOI" && id !== NOT_ESTABLISHED) {
    const doiHtml = item.href
      ? `<a href="${escapeAttr(item.href)}">${escapeHtml(id)}</a>`
      : escapeHtml(id)
    const paper = item.paper_href
      ? ` (<a href="${escapeAttr(item.paper_href)}">${inlineMdToHtml(item.label || "literature")}</a>)`
      : label
    return `${escapeHtml(type)} — ${doiHtml}${paper}${note}`
  }
  if (item.href && id !== NOT_ESTABLISHED) {
    return `${escapeHtml(type)} — <a href="${escapeAttr(item.href)}">${escapeHtml(id)}</a>${label}${note}`
  }
  if (item.paper_href) {
    const link = `<a href="${escapeAttr(item.paper_href)}">${inlineMdToHtml(item.label || id)}</a>`
    const extra = item.label && item.id && item.id !== item.label ? ` (${escapeHtml(item.id)})` : ""
    return `${escapeHtml(type)} — ${link}${extra}${note}`
  }
  return `${escapeHtml(type)} — ${escapeHtml(id)}${label}${note}`
}

function activeAndSupportingLines(group, typeLabel) {
  const lines = []
  if (group.active.length) {
    for (const item of group.active) lines.push(`Active: ${formatTypedId(item)}`)
  } else {
    lines.push(`Active: ${escapeHtml(typeLabel)} — ${escapeHtml(NOT_ESTABLISHED)}`)
  }
  for (const item of group.supporting) lines.push(`Supporting: ${formatTypedId(item)}`)
  return lines
}

function rejectedLines(group) {
  return group.rejected.map((item) => formatTypedId(item))
}

function idBlock(title, lines) {
  return `<div className="fcir-id-block"><strong>${escapeHtml(title)}</strong>${lines
    .map((line) => `<span className="fcir-id-line">${line}</span>`)
    .join("")}</div>`
}

export function renderIdentityCell(entry) {
  const identity = entry.identity || {}
  const foodLines = [
    `Scientific species name — ${inlineMdToHtml(identity.scientific_species || NOT_ESTABLISHED)}`,
    `Material/form — ${inlineMdToHtml(identity.material_form || NOT_ESTABLISHED)}`,
  ]
  const substanceLines = [
    `Canonical chemical name — ${inlineMdToHtml(identity.canonical_chemical_name || NOT_ESTABLISHED)}`,
  ]
  const food = identityGroup(identity, "fdc_food_id")
  const nutrient = identityGroup(identity, "fdc_nutrient_id")
  const other = identityGroup(identity, "doi_or_database")
  const sourceLines = [
    ...activeAndSupportingLines(food, "FDC food ID"),
    ...activeAndSupportingLines(nutrient, "FDC nutrient ID"),
    ...activeAndSupportingLines(other, "DOI or database record"),
  ]
  const rejected = [
    ...rejectedLines(food),
    ...rejectedLines(nutrient),
    ...rejectedLines(other),
  ]
  if (!rejected.length) rejected.push(`${escapeHtml(NOT_ESTABLISHED)}`)
  return [
    idBlock("Food identity", foodLines),
    idBlock("Substance identity", substanceLines),
    idBlock("Source identifiers", sourceLines),
    idBlock("Rejected identifiers", rejected),
  ].join("")
}

function renderDecisionCell(entry) {
  const parts = [
    `<span className="fcir-label">Decision</span>${inlineMdToHtml(entry.decision)}`,
    `<span className="fcir-label">Action</span>${inlineMdToHtml(entry.action)}`,
  ]
  if (entry.public_row) {
    parts.push(`<span className="fcir-label">Public row</span><code>${escapeHtml(entry.public_row)}</code>`)
  }
  if (Array.isArray(entry.recipes) && entry.recipes.length) {
    const links = entry.recipes
      .map((recipe) => `<a href="${escapeAttr(recipe.href)}">${escapeHtml(recipe.title)}</a>`)
      .join("; ")
    parts.push(`<span className="fcir-label">Recipes</span>${links}`)
  }
  return parts.join("")
}

function renderSubstanceUniiCell(entry) {
  const mappings = gsrsMappings(entry)
  if (!mappings.length) return escapeHtml("No public GSRS match located")
  return mappings
    .map((item) => {
      const role = `<span className="fcir-gsrs-role">${escapeHtml(item.role)}</span>`
      let body
      if (item.unii) {
        const href = item.href || officialGsrsHref(item.unii)
        body = `${escapeHtml(item.display_name)}/<a href="${escapeAttr(href)}">${escapeHtml(item.unii)}</a>`
        if (item.preferred_name && item.preferred_name !== item.display_name) {
          body += ` <span className="fcir-gsrs-preferred">(${escapeHtml(item.preferred_name)})</span>`
        }
      } else if (item.role === "Unresolvable source field") {
        body = escapeHtml(item.note || "Generic 18:3 — unresolvable from the source field; neither UNII is assignable.")
      } else if (item.role === "Not applicable—broad class") {
        body = `${escapeHtml(item.display_name)} — ${escapeHtml("Not applicable—broad class")}`
      } else {
        body = `${escapeHtml(item.display_name || "")} — ${escapeHtml("No public GSRS match located")}`
      }
      const note =
        item.unii && item.note ? `<span className="fcir-id-line">${inlineMdToHtml(item.note)}</span>` : ""
      const extra =
        !item.unii && item.note && item.role !== "Unresolvable source field"
          ? `<span className="fcir-id-line">${inlineMdToHtml(item.note)}</span>`
          : ""
      return `<div className="fcir-id-block">${role}<span className="fcir-id-line">${body}</span>${note}${extra}</div>`
    })
    .join("")
}

const FCIR_TABLE_HEADERS = [
  "Case ID",
  "Food/material",
  "Identity at issue",
  "Substance/UNII",
  "Identity/source IDs",
  "Problem",
  "Decision and public treatment",
  "Evidence",
  "Status",
]

function renderTableHeader() {
  const cells = FCIR_TABLE_HEADERS.map((header) => `<th>${header}</th>`).join("\n")
  return `<thead>
<tr>
${cells}
</tr>
</thead>`
}

function renderRegisterRow(entry, options = {}) {
  const identity = entry.identity || {}
  const anchor = options.anchor || entry.anchor
  const idAttr = options.omitAnchor ? "" : ` id="${escapeAttr(anchor)}"`
  return `<tr${idAttr} className="fcir-row">
<td className="fcir-col-id"><strong>${escapeHtml(entry.id)}</strong></td>
<td>${inlineMdToHtml(entry.food_or_scope)}</td>
<td>${inlineMdToHtml(identity.identity_at_issue || "")}</td>
<td className="fcir-col-unii">${renderSubstanceUniiCell(entry)}</td>
<td className="fcir-col-ids">${renderIdentityCell(entry)}</td>
<td>${inlineMdToHtml(entry.problem)}</td>
<td>${renderDecisionCell(entry)}</td>
<td><span className="fcir-label">Source</span>${inlineMdToHtml(entry.source_public)}</td>
<td><strong>${escapeHtml(entry.status)}</strong></td>
</tr>`
}

function renderPreviewTable(register) {
  const entry = (register.cases || []).find((item) => item.id === "FCIR-001")
  if (!entry) return ""
  return `<div className="fcir-register fcir-register-preview">
<p className="fcir-preview-label">Example row — <a href="#fcir-001">FCIR-001</a></p>
<table className="fcir-table fcir-table-preview">
${renderTableHeader()}
<tbody>
${renderRegisterRow(entry, {omitAnchor: true})}
</tbody>
</table>
</div>`
}

function renderReadingGuide(register) {
  const note = String(register.editorial?.precision_nutrition_note || "").trim()
  const searchRule = String(register.editorial?.gsrs_search_rule || GSRS_SEARCH_RULE).trim()
  return `${renderPreviewTable(register)}

### What we track

${note}

## How to read a case

### Case ID

The **Case ID** (FCIR‑NNN) is a workflow identifier. It is not a scientific identity.

### Decision, action and source

**Decision** is what we concluded. **Action** is what the public pages and calculations now do. **Source** is the records and papers used, not a later paraphrase. The table is the canonical record.

### Missing and rejected identifiers

Unavailable food and source identifiers are **Not established** — never blank, never inferred. A rejected identifier is never treated as active provenance. GSRS/UNII is never **Not established**: use **No public GSRS match located** or **Not applicable—broad class**. ${searchRule}

### Food and recipe links

Links go to the published composition or recipe row. Food pages carry only a short pointer here.

## Provenance

This work is being developed with input from our team, including **Larry Callahan, an experienced former FDA chemist who led work on ISO 11238, the international substance-identification standard that helped underpin the Global Substance Registration System**. His scientific provenance lead on this register is **pending formal acceptance**.
`
}

function renderTechnicalNotes(register) {
  const notes = (register.cases || []).filter((entry) => entry.technical_notes)
  if (!notes.length) return ""
  const blocks = notes
    .map(
      (entry) => `<details className="fcir-tech-note">
<summary>Technical notes: ${escapeHtml(entry.id)} — ${escapeHtml(entry.title)}</summary>
<p>${inlineMdToHtml(entry.technical_notes)}</p>
</details>`,
    )
    .join("\n")
  return `
### Technical notes

These notes add calculation detail for selected cases.

${blocks}
`
}

function renderIdentifierLegend(register) {
  const types = register.identifier_types || []
  if (!types.length) return ""
  const items = types
    .map((item) => `- **${item.key}** — ${item.meaning}`)
    .join("\n")
  return `
### Identifier keys

${items}
`
}

export function renderGeneratedFcirMarkdown(register = loadFcirRegister()) {
  const errors = validateFcirRegister(register)
  if (errors.length) {
    throw new Error(`FCIR identity validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`)
  }
  const rows = (register.cases || []).map(renderRegisterRow).join("\n")
  const meanings = Object.entries(register.status_meanings || {})
    .map(([status, meaning]) => `- **${status}:** ${meaning}`)
    .join("\n")
  const editorial = register.editorial || {}
  return `${GENERATED_START}

${renderReadingGuide(register)}
## Register
${renderIdentifierLegend(register)}
<div className="fcir-register">
<table className="fcir-table">
${renderTableHeader()}
<tbody>
${rows}
</tbody>
</table>
</div>
${renderTechnicalNotes(register)}
### Status meanings

${meanings}

### Editorial ownership

**Scientific provenance lead:** ${editorial.scientific_provenance_lead}
**Review cycle:** ${editorial.review_cycle}
**Last substantive review:** ${editorial.last_substantive_review}

${editorial.project_scope}
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
