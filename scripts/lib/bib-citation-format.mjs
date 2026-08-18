/**
 * Bibliographic core (project-wide): `[n] Author(s) (Year). [title](#key)`
 * Food-page extension: optional food-relevant finding after the linked title.
 * Previous food-page order (explanation first) remains valid for unmigrated letters.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BIB_PATH = path.join(__dirname, "../../static/bibtex/BRAIN-diet.bib")

export const CANONICAL_REF_LINE_RE =
  /^\[(\d+)\]\s+\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)\s*$/

/** Previous food-page order: explanation · author year · linked title. */
export const CANONICAL_EXPLAINED_REF_LINE_RE =
  /^\[(\d+)\]\s+(.+?)\.\s+(.+?\d{4})\.\s+\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)\s*$/

/** Food-page extension: `[n] Author(s) (Year). [title](#key). Optional finding.` */
export const FOOD_REFERENCE_LINE_RE =
  /^\[(\d+)\]\s+(.+?)\s+\((\d{4})\)\.\s+\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)(?:\.\s+(.+))?\s*$/

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
  if (parts.length > 2) return `${firstSurname} et al. ${yearStr}`.trim()
  if (parts.length === 2) {
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
  const abstract = extractBracedField(chunk, "abstract")
  const year = yearM ? yearM[1] : ""
  const authorLabel = formatAuthorLabel(authorRaw, year)
  const label = `${authorLabel} — ${title}`
  return { key: null, title, year, authorLabel, abstract, label }
}

export function loadBibIndex(bibPath = BIB_PATH) {
  if (bibIndexCache && bibPath === BIB_PATH) return bibIndexCache
  const bib = fs.readFileSync(path.resolve(bibPath), "utf8")
  const index = new Map()
  const starts = []
  const startRe = /@\w+\{[^,]+,/g
  let m
  while ((m = startRe.exec(bib)) !== null) starts.push({ index: m.index, key: m[0].replace(/^@\w+\{/, "").replace(/,$/, "") })
  for (let i = 0; i < starts.length; i++) {
    // Slice only to the next @type{key, so a missing abstract cannot pick up a later entry's abstract=.
    const start = starts[i].index
    const end = i + 1 < starts.length ? starts[i + 1].index : bib.length
    const chunk = bib.slice(start, end)
    const parsed = parseBibEntry(chunk)
    if (parsed) index.set(starts[i].key, { ...parsed, key: starts[i].key })
  }
  if (bibPath === BIB_PATH) bibIndexCache = index
  return index
}

function mdxSafeLinkTitle(title) {
  return title
    .replace(/\\textit\{([^}]+)\}/g, "$1")
    .replace(/\\textsubscript\{([^}]+)\}/g, "$1")
    .replace(/\\textless/g, "")
    .replace(/\\textgreater/g, "")
    .replace(/\{([^{}]*)\}/g, "$1")
}

export function formatAuthorYearParen(authorLabel) {
  const trimmed = String(authorLabel || "").trim()
  const already = trimmed.match(/^(.*)\s+\((\d{4})\)$/)
  if (already) return `${keepAuthorPeriod(already[1])} (${already[2]})`
  const m = trimmed.match(/^(.*?)(?:\s+(\d{4}))$/)
  if (!m) return trimmed
  return `${keepAuthorPeriod(m[1])} (${m[2]})`
}

function keepAuthorPeriod(name) {
  const trimmed = name.trim()
  if (/\bet al\.$/i.test(trimmed)) return trimmed
  return trimmed.replace(/\.$/, "")
}

export function formatFoodReferenceLine(
  n,
  key,
  annotation = null,
  titleOverride = null,
  bibIndex = loadBibIndex(),
) {
  const meta = bibIndex.get(key)
  const authorYear = formatAuthorYearParen(meta?.authorLabel ?? String(key).replace(/_/g, " "))
  const title = mdxSafeLinkTitle(titleOverride ?? meta?.title ?? key.replace(/_/g, " "))
  const link = `[${title}](/docs/papers/BRAIN-Diet-References#${key})`
  const core = `[${n}] ${authorYear}. ${link}`
  if (!annotation) return core
  const note = String(annotation).trim().replace(/\.$/, "")
  if (!note) return core
  return `${core}. ${note}.`
}

export function formatSalmonRoeRefLine(n, key, titleOverride = null, explanation = null, bibIndex = loadBibIndex()) {
  const meta = bibIndex.get(key)
  const authorPart = meta?.authorLabel ?? key.replace(/_/g, " ")
  const title = mdxSafeLinkTitle(titleOverride ?? meta?.title ?? key.replace(/_/g, " "))
  const link = `[${title}](/docs/papers/BRAIN-Diet-References#${key})`
  if (explanation) {
    const exp = explanation.trim().replace(/\.$/, "")
    const normalized = exp ? exp.charAt(0).toUpperCase() + exp.slice(1) : exp
    return `[${n}] ${normalized}. ${authorPart}. ${link}`
  }
  const label = `${authorPart} — ${title}`
  return `[${n}] [${label}](/docs/papers/BRAIN-Diet-References#${key})`
}

/** @deprecated Use formatSalmonRoeRefLine */
export function formatCanonicalRefLine(n, key, bibIndex = loadBibIndex()) {
  return formatSalmonRoeRefLine(n, key, null, bibIndex)
}

export function isFoodReferenceLine(line) {
  const trimmed = line.trim().replace(/^-\s+/, "")
  return FOOD_REFERENCE_LINE_RE.test(trimmed)
}

export function isExplainedReferenceLine(line) {
  const trimmed = line.trim().replace(/^-\s+/, "")
  return FOOD_REFERENCE_LINE_RE.test(trimmed) || CANONICAL_EXPLAINED_REF_LINE_RE.test(trimmed)
}

export function isCanonicalReferenceLine(line) {
  return isExplainedReferenceLine(line)
}

/** Citation numbers referenced in a prose fragment, e.g. [1], [1,2], [1][2], [1–3]. */
export function citationNumbersInFragment(fragment) {
  const nums = new Set()
  const re = /\[([^\]]+)\]/g
  let m
  while ((m = re.exec(fragment)) !== null) {
    for (const part of m[1].split(/,\s*/)) {
      const range = part.trim().match(/^(\d+)\s*[–-]\s*(\d+)$/)
      if (range) {
        const start = Number.parseInt(range[1], 10)
        const end = Number.parseInt(range[2], 10)
        if (!Number.isNaN(start) && !Number.isNaN(end) && end >= start) {
          for (let n = start; n <= end; n++) nums.add(n)
        }
        continue
      }
      const n = Number.parseInt(part.trim(), 10)
      if (!Number.isNaN(n)) nums.add(n)
    }
  }
  return nums
}

function stripInlineCitations(text) {
  return text
    .replace(/\[[\d,\s–-]+\](?:\[[\d,\s–-]+\])*/g, "")
    .replace(/\s+\./g, ".")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\.$/, "")
}

/** Map citation number → best explanation sentence from Overview / Highlights / Food Context. */
export function extractCitationExplanationsFromBody(bodyBeforeRefs) {
  /** @type {Map<number, string>} */
  const byNum = new Map()
  const prose = bodyBeforeRefs
    .replace(/^---[\s\S]*?---\n/m, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#+\s+/gm, "")

  const chunks = prose.split(/\n+/).map((l) => l.trim()).filter(Boolean)
  for (const chunk of chunks) {
    const isBullet = /^[-*]\s/.test(chunk)
    const line = chunk.replace(/^[-*]\s+/, "")
    const units = isBullet
      ? [line]
      : line.split(/(?<=[.!?])\s+(?=[A-Z*"(\[])/)
    for (const sentence of units) {
      const nums = citationNumbersInFragment(sentence)
      if (!nums.size) continue

      if (nums.size === 1) {
        const n = [...nums][0]
        const explanation = stripInlineCitations(sentence)
        if (explanation.length < 20) continue
        const prev = byNum.get(n)
        if (!prev || explanation.length < prev.length) {
          byNum.set(n, explanation)
        }
        continue
      }

      // Multi-cite bullet/sentence: prefer clause immediately before each [n].
      if (isBullet) continue

      const clauseRe = /([^.!?;,\[]+?)\s*\[(\d+)\]/g
      let m
      while ((m = clauseRe.exec(sentence)) !== null) {
        const explanation = stripInlineCitations(m[1]).trim()
        if (explanation.length < 15) continue
        const n = Number.parseInt(m[2], 10)
        if (Number.isNaN(n)) continue
        const prev = byNum.get(n)
        if (!prev || explanation.length < prev.length) {
          byNum.set(n, explanation)
        }
      }
    }
  }
  return byNum
}

export function fallbackReferenceExplanation(meta, titleOverride = null) {
  const abstract = typeof meta?.abstract === "string" ? meta.abstract.trim() : ""
  if (abstract) {
    let first = abstract
      .replace(/\{\\textless\}p\{\\textgreater\}/gi, "")
      .replace(/\{\\textless\}\/?p\{\\textgreater\}/gi, "")
      .split(/(?<=[.!?])\s+/)[0]
      ?.trim()
    first = first?.replace(/^Abstract\s+/i, "")
    if (first && first.length >= 40 && first.length <= 320) {
      return first.replace(/\.$/, "")
    }
  }
  const title = titleOverride ?? meta?.title
  if (!title) return "Evidence cited on this page for this food."
  const cleaned = title.replace(/\.$/, "").trim()
  if (/^(A|An|The)\s/i.test(cleaned)) {
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
  }
  const firstWord = cleaned.split(/\s+/)[0] || ""
  if (/^[A-Z]{2,}/.test(firstWord)) {
    return cleaned
  }
  return `Reports on ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`
}

export function isStubReferenceLine(line) {
  const trimmed = line.trim().replace(/^-\s+/, "")
  const m = trimmed.match(
    /^(?:\[(\d+)\]\s+)?(.+?)\s+\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/i,
  )
  if (!m) return false
  const [, , prefix, linkLabel] = m
  if (linkLabel.includes(" — ") || linkLabel.includes(" – ")) return false
  if (prefix.trim() === linkLabel.trim()) return true
  return !prefix.includes(" — ") && !prefix.includes(" – ") && linkLabel.length < 60
}

/** True when title parsing left truncated brace artifacts in the reference line. */
export function isBrokenReferenceLine(line) {
  return /\{[A-Za-z]/.test(line) || /\(\{/.test(line)
}

export function parseReferenceLine(line) {
  const trimmed = line.trim().replace(/^-\s+/, "")

  let m = trimmed.match(FOOD_REFERENCE_LINE_RE)
  if (m) {
    return {
      n: Number(m[1]),
      key: m[5],
      titleOverride: m[4],
      explanation: m[6] ? m[6].replace(/\.$/, "").trim() : undefined,
      authorLabel: `${m[2].trim()} (${m[3]})`,
      canonical: true,
      foodExtension: true,
    }
  }

  m = trimmed.match(CANONICAL_EXPLAINED_REF_LINE_RE)
  if (m) {
    return {
      n: Number(m[1]),
      key: m[5],
      titleOverride: m[4],
      explanation: m[2],
      authorLabel: m[3],
      canonical: true,
    }
  }

  m = trimmed.match(CANONICAL_REF_LINE_RE)
  if (m) {
    const linkLabel = m[2]
    const dashIdx = linkLabel.search(/ — | – /)
    const titleOverride = dashIdx >= 0 ? linkLabel.slice(dashIdx + 3).trim() : null
    return {
      n: Number(m[1]),
      key: m[3],
      titleOverride,
      canonical: true,
    }
  }

  m = trimmed.match(
    /^(\d+)\.\s+\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/,
  )
  if (m) {
    const linkLabel = m[2].trim()
    const dashIdx = linkLabel.search(/ — | – /)
    const titleOverride = dashIdx >= 0 ? linkLabel.slice(dashIdx + 3).trim() : linkLabel
    return {
      n: Number(m[1]),
      key: m[3],
      titleOverride,
      canonical: false,
    }
  }

  m = trimmed.match(
    /^[-*]?\s*(.+?)\s+\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)\s*\.?\s*$/,
  )
  if (m) {
    const prefix = m[1].trim()
    const linkLabel = m[2].trim()
    if (/^\[\d+\]/.test(prefix)) return null
    const dashIdx = linkLabel.search(/ — | – /)
    const titleOverride = dashIdx >= 0 ? linkLabel.slice(dashIdx + 3).trim() : null
    return {
      n: null,
      key: m[3],
      titleOverride,
      explanation: prefix,
      canonical: false,
    }
  }

  const embedded = trimmed.match(
    /^(?:[-*]\s*)?(.*?)\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)(.*)$/,
  )
  if (embedded && !/^\[\d+\]/.test(trimmed)) {
    const before = embedded[1].trim()
    const after = embedded[4].replace(/^\.\s*/, "").trim()
    const linkLabel = embedded[2].trim()
    const dashIdx = linkLabel.search(/ — | – /)
    const titleOverride = dashIdx >= 0 ? linkLabel.slice(dashIdx + 3).trim() : null
    const explanation = stripInlineCitations(
      after ? `${before.replace(/\.$/, "")}. ${after}` : before,
    )
    if (explanation.length >= 15) {
      return {
        n: null,
        key: embedded[3],
        titleOverride,
        explanation,
        canonical: false,
      }
    }
  }

  m = trimmed.match(
    /^\[(\d+)\]\s+(.+?)\s+\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/,
  )
  if (!m) return null

  const prefix = m[2].trim()
  const linkLabel = m[3].trim()
  const key = m[4]
  const prefixNorm = prefix.replace(/\s+/g, " ")
  const linkNorm = linkLabel.replace(/\s+/g, " ")

  if (prefixNorm === linkNorm) {
    return { n: Number(m[1]), key, titleOverride: null, canonical: false }
  }

  if (!linkLabel.includes(" — ") && !linkLabel.includes(" – ")) {
    return { n: Number(m[1]), key, titleOverride: prefix, canonical: false }
  }

  return { n: Number(m[1]), key, titleOverride: null, canonical: false }
}

export function needsReferenceFormatFix(referencesBody) {
  const lines = referencesBody
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^##\s/.test(l))

  if (!lines.length) return false

  const hasBibLink = lines.some((l) => /\/docs\/papers\/BRAIN-Diet-References#/.test(l))
  if (!hasBibLink) return false

  return lines.some(
    (line) =>
      /^\d+\.\s+\[/.test(line) ||
      line.startsWith("-") ||
      !isExplainedReferenceLine(line) ||
      isStubReferenceLine(line) ||
      isBrokenReferenceLine(line),
  )
}

export function rebuildReferencesSection(refKeys, bibIndex = loadBibIndex()) {
  const lines = refKeys.map((key, i) =>
    formatSalmonRoeRefLine(i + 1, key, null, fallbackReferenceExplanation(bibIndex.get(key)), bibIndex),
  )
  return `## References\n\n${lines.join("\n\n")}\n`
}

export function rebuildExplainedReferencesSection(content, referencesBody, bibIndex = loadBibIndex(), force = false) {
  const refsMatch = content.match(/^## References\s*$/m)
  const bodyBefore = refsMatch ? content.slice(0, refsMatch.index) : content
  const explanations = extractCitationExplanationsFromBody(bodyBefore)

  const lines = referencesBody
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^##\s/.test(l))

  const refLines = []
  let seq = 1
  for (const line of lines) {
    const entry = parseReferenceLine(line)
    if (!entry) continue
    const n = entry.n ?? seq++
    if (!force && entry.explanation && isExplainedReferenceLine(line)) {
      refLines.push(line.replace(/^-\s+/, ""))
      continue
    }
    const explanation =
      entry.explanation ??
      explanations.get(n) ??
      fallbackReferenceExplanation(bibIndex.get(entry.key), entry.titleOverride)
    refLines.push(
      formatSalmonRoeRefLine(
        n,
        entry.key,
        entry.titleOverride,
        explanation,
        bibIndex,
      ),
    )
  }

  if (!refLines.length) return null

  return `## References\n\n${refLines.join("\n\n")}\n`
}

export function rebuildReferencesSectionFromBody(referencesBody, bibIndex = loadBibIndex(), content = "") {
  if (content) {
    return rebuildExplainedReferencesSection(content, referencesBody, bibIndex)
  }

  const lines = referencesBody
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^##\s/.test(l))

  const parsedLines = lines.map((line) => ({ line, entry: parseReferenceLine(line) }))
  const refLines = []
  let seq = 1
  for (const { line, entry } of parsedLines) {
    if (!entry) continue
    const n = entry.n ?? seq++
    if (entry.explanation && isExplainedReferenceLine(line)) {
      refLines.push(line.replace(/^-\s+/, ""))
      continue
    }
    const explanation = fallbackReferenceExplanation(bibIndex.get(entry.key), entry.titleOverride)
    refLines.push(
      formatSalmonRoeRefLine(
        n,
        entry.key,
        entry.titleOverride,
        explanation,
        bibIndex,
      ),
    )
  }

  if (!refLines.length) return null

  return `## References\n\n${refLines.join("\n\n")}\n`
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
