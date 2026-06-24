/**
 * Build canonical food-page reference lines from BRAIN-diet.bib metadata.
 * Format: `- [n] Author Year – Paper title [Author Year – Paper title](/docs/papers/BRAIN-Diet-References#key)`
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BIB_PATH = path.join(__dirname, "../../static/bibtex/BRAIN-diet.bib")

let bibIndexCache = null

function cleanBibText(value) {
  return value.replace(/\{([^}]*)\}/g, "$1").replace(/\s+/g, " ").trim()
}

function extractBracedField(chunk, field) {
  const re = new RegExp(`\\b${field}\\s*=\\s*\\{`)
  const m = re.exec(chunk)
  if (!m) return null
  let i = m.index + m[0].length
  let depth = 1
  const start = i
  while (i < chunk.length && depth > 0) {
    if (chunk[i] === "{") depth += 1
    else if (chunk[i] === "}") depth -= 1
    i += 1
  }
  return cleanBibText(chunk.slice(start, i - 1))
}

function formatAuthorLabel(authorRaw, year) {
  const yearStr = year ? String(year) : ""
  if (!authorRaw) return yearStr || "Unknown"
  const author = cleanBibText(authorRaw)
  if (/food and agriculture organization/i.test(author)) return `FAO ${yearStr}`.trim()
  if (/^national institutes of health/i.test(author)) return `NIH ${yearStr}`.trim()

  const parts = author.split(/\s+and\s+/)
  const firstSurname = parts[0].split(",")[0].trim()
  if (parts.length > 1) {
    const secondSurname = parts[1].split(",")[0].trim()
    return `${firstSurname} & ${secondSurname} ${yearStr}`.trim()
  }
  if (author.includes(",")) return `${firstSurname} et al. ${yearStr}`.trim()
  return `${author} ${yearStr}`.trim()
}

function parseBibEntry(chunk) {
  const title = extractBracedField(chunk, "title")
  if (!title) return null
  const yearM = chunk.match(/\byear\s*=\s*\{?(\d{4})\}?/)
  const authorRaw = extractBracedField(chunk, "author")
  const year = yearM ? yearM[1] : ""
  const authorLabel = formatAuthorLabel(authorRaw, year)
  const full = `${authorLabel} – ${title}`
  return { key: null, title, year, authorLabel, full, linkLabel: full }
}

export function loadBibIndex(bibPath = BIB_PATH) {
  if (bibIndexCache && bibPath === BIB_PATH) return bibIndexCache
  const bib = fs.readFileSync(path.resolve(bibPath), "utf8")
  const index = new Map()
  const entryRe = /@\w+\{([^,]+),/g
  let m
  while ((m = entryRe.exec(bib)) !== null) {
    const key = m[1]
    const chunk = bib.slice(m.index, m.index + 12000)
    const parsed = parseBibEntry(chunk)
    if (parsed) index.set(key, { ...parsed, key })
  }
  if (bibPath === BIB_PATH) bibIndexCache = index
  return index
}

export function formatCanonicalRefLine(n, key, bibIndex = loadBibIndex()) {
  const meta = bibIndex.get(key)
  if (!meta) {
    const fallback = key.replace(/_/g, " ")
    return `- [${n}] ${fallback} [${fallback}](/docs/papers/BRAIN-Diet-References#${key})`
  }
  return `- [${n}] ${meta.full} [${meta.linkLabel}](/docs/papers/BRAIN-Diet-References#${key})`
}

/** True when the link label is a stub (no paper title), e.g. `FAO 2013 [FAO 2013](...)`. */
export function isStubReferenceLine(line) {
  const m = line.match(/^- \[(\d+)\]\s+(.+?)\s+\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/i)
  if (!m) return false
  const [, , prefix, linkLabel] = m
  if (linkLabel.includes(" – ")) return false
  if (prefix.trim() === linkLabel.trim()) return true
  return !prefix.includes(" – ") && linkLabel.length < 60
}

/** True when title parsing left truncated brace artifacts in the reference line. */
export function isBrokenReferenceLine(line) {
  return /\{[A-Za-z]/.test(line) || /\(\{/.test(line)
}

export function rebuildReferencesSection(refKeys, bibIndex = loadBibIndex()) {
  const lines = refKeys.map((key, i) => formatCanonicalRefLine(i + 1, key, bibIndex))
  return `## References\n\n${lines.join("\n")}\n`
}

export function extractRefKeysFromReferencesSection(referencesBody) {
  const keys = []
  const re = /\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)/gi
  let m
  while ((m = re.exec(referencesBody)) !== null) {
    if (!keys.includes(m[1])) keys.push(m[1])
  }
  return keys
}
