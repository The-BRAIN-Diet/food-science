/**
 * Detect rendered citation annotations that still match a neighbouring
 * BibTeX entry’s abstract (the old 12000-character window join).
 *
 * Read-only unless writeReport is set. Does not repair pages.
 */
import fs from "node:fs"
import path from "node:path"
import {
  fallbackReferenceExplanation,
  loadBibIndex,
  parseReferenceLine,
} from "./bib-citation-format.mjs"

const BIB_REL = "static/bibtex/BRAIN-diet.bib"
const DOC_RELS = ["docs", "src/pages"]

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

function parseStarts(bib) {
  const starts = []
  const startRe = /@\w+\{([^,]+),/g
  let m
  while ((m = startRe.exec(bib)) !== null) {
    starts.push({ index: m.index, key: m[1] })
  }
  return starts
}

function firstSentence(abstract) {
  if (!abstract || !String(abstract).trim()) return ""
  let first = String(abstract)
    .replace(/\{\\textless\}p\{\\textgreater\}/gi, "")
    .replace(/\{\\textless\}\/?p\{\\textgreater\}/gi, "")
    .split(/(?<=[.!?])\s+/)[0]
    ?.trim()
  first = first?.replace(/^Abstract\s+/i, "") || ""
  return first.replace(/\.$/, "").trim()
}

export function normAnnotation(text) {
  return String(text || "")
    .replace(/\\textlessp\\textgreater/gi, "")
    .replace(/\s+/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\.$/, "")
    .trim()
    .toLowerCase()
}

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".git") continue
      walkFiles(full, acc)
    } else if (/\.(md|mdx)$/i.test(ent.name)) acc.push(full)
  }
  return acc
}

function sectionFor(root, filePath) {
  const rel = path.relative(root, filePath).replace(/\\/g, "/")
  if (rel.startsWith("docs/foods/")) return "Foods"
  if (rel.startsWith("docs/biological-targets/")) return "Biological targets"
  if (rel.startsWith("docs/substances/")) return "Substances"
  if (rel.startsWith("docs/phenomes/")) return "Phenomes"
  if (rel.startsWith("docs/papers/") || rel.startsWith("docs/recipes/")) {
    return rel.startsWith("docs/papers/") ? "Papers" : "Recipes"
  }
  if (rel.startsWith("src/pages/")) return "Pages"
  if (rel.startsWith("docs/")) return "Other docs"
  return "Other"
}

export function laterKeyOwningSentence(sentence, ownerByNorm, citedKey) {
  const n = normAnnotation(sentence)
  if (n.length < 40) return null
  for (const [sentNorm, keys] of ownerByNorm) {
    if (n === sentNorm || n.startsWith(sentNorm) || sentNorm.startsWith(n.slice(0, Math.min(80, n.length)))) {
      const other = keys.filter((k) => k !== citedKey)
      if (other.length) return other[0]
    }
  }
  return null
}

function buildOwnerIndex(root) {
  const bibPath = path.join(root, BIB_REL)
  const bib = fs.readFileSync(bibPath, "utf8")
  const starts = parseStarts(bib)
  const newIndex = loadBibIndex(bibPath)

  const ownByKey = new Map()
  const windowByKey = new Map()
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i].index
    const next = i + 1 < starts.length ? starts[i + 1].index : bib.length
    const ownChunk = bib.slice(start, next)
    const windowChunk = bib.slice(start, start + 12000)
    const key = starts[i].key
    const atCount = [...ownChunk.matchAll(/@\w+\{[^,]+,/g)].length
    ownByKey.set(key, {
      key,
      chunkStart: start,
      chunkEnd: next,
      atCount,
      title: extractBracedField(ownChunk, "title"),
      abstract: extractBracedField(ownChunk, "abstract"),
    })
    windowByKey.set(key, {
      abstract: extractBracedField(windowChunk, "abstract"),
      title: extractBracedField(windowChunk, "title"),
    })
  }

  const ownerByNorm = new Map()
  for (const [key, own] of ownByKey) {
    const sent = firstSentence(own.abstract)
    if (sent.length < 40) continue
    const n = normAnnotation(sent)
    if (!ownerByNorm.has(n)) ownerByNorm.set(n, [])
    ownerByNorm.get(n).push(key)
  }

  const borrowedKeys = []
  for (const [key, own] of ownByKey) {
    const winAbs = windowByKey.get(key)?.abstract
    const ownAbs = own.abstract
    const ownEmpty = !ownAbs || !ownAbs.trim()
    const winSent = firstSentence(winAbs)
    if (ownEmpty && winSent.length >= 40) {
      const neighbour = laterKeyOwningSentence(winSent, ownerByNorm, key)
      if (neighbour) {
        borrowedKeys.push({
          key,
          neighbour,
          borrowedSentence: winSent,
          newFallback: fallbackReferenceExplanation(newIndex.get(key)),
          oldFallback: fallbackReferenceExplanation({
            ...newIndex.get(key),
            abstract: winAbs,
            title: own.title,
          }),
          singleEntry: own.atCount === 1,
        })
      }
    }
  }

  return { bibPath, newIndex, ownByKey, ownerByNorm, borrowedKeys }
}

function resolveExactKeyAnnotation(entry, newIndex) {
  return fallbackReferenceExplanation(newIndex.get(entry.key), null)
}

/**
 * Scan docs/ and src/pages for citation annotations that match a neighbouring
 * BibTeX abstract rather than the cited key’s own bounded entry.
 */
export function scanNeighbourBorrowedAnnotations({
  root = process.cwd(),
  writeReport = false,
} = {}) {
  const { newIndex, ownByKey, ownerByNorm, borrowedKeys } = buildOwnerIndex(root)
  const borrowedKeySet = new Set(borrowedKeys.map((b) => b.key))
  const hits = []
  const integrityFailures = []

  for (const relRoot of DOC_RELS) {
    const absRoot = path.join(root, relRoot)
    for (const filePath of walkFiles(absRoot)) {
      const rel = path.relative(root, filePath).replace(/\\/g, "/")
      const content = fs.readFileSync(filePath, "utf8")
      if (!/BRAIN-Diet-References#/.test(content)) continue

      const lines = content.split("\n")
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (!/BRAIN-Diet-References#/.test(line)) continue
        const entry = parseReferenceLine(line)
        const key =
          entry?.key ||
          line.match(/\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)/i)?.[1]
        if (!key) continue

        const own = ownByKey.get(key)
        if (own && own.atCount !== 1) {
          integrityFailures.push({ file: rel, key, atCount: own.atCount })
        }

        const currentRaw = entry?.explanation?.trim() || ""
        if (currentRaw.length < 40) continue

        const owner = laterKeyOwningSentence(currentRaw, ownerByNorm, key)
        if (!owner) continue

        const newAnnotation = resolveExactKeyAnnotation(entry || { key }, newIndex)
        if (normAnnotation(currentRaw) === normAnnotation(newAnnotation)) continue

        hits.push({
          section: sectionFor(root, filePath),
          file: rel,
          line: i + 1,
          key,
          neighbour: owner,
          previousIncorrect: currentRaw,
          newlyResolved: newAnnotation,
          exactKeyFallback: fallbackReferenceExplanation(newIndex.get(key), null),
          joinedByExactKey: Boolean(newIndex.get(key)) && (entry?.key || key) === key,
          singleBibEntry: own ? own.atCount === 1 : false,
          ownAbstractPresent: Boolean(own?.abstract && own.abstract.trim()),
          currentlyOnPage: true,
          wouldBorrowFromWindow: borrowedKeySet.has(key),
        })
      }
    }
  }

  const uniqueHits = []
  const seen = new Set()
  for (const hit of hits) {
    const id = `${hit.file}::${hit.key}::${normAnnotation(hit.previousIncorrect).slice(0, 80)}`
    if (seen.has(id)) continue
    seen.add(id)
    uniqueHits.push(hit)
  }

  const report = {
    generated_at: new Date().toISOString(),
    dry_run: true,
    writes_documentation: false,
    parser: {
      old: "12000-character window from @type{key,; first abstract= in window",
      new: "exact Map.get(citationKey); chunk sliced to next @type{key,",
    },
    bib_keys_whose_window_still_borrows: borrowedKeys.length,
    citations_with_neighbour_annotation: uniqueHits.length,
    integrity_failures: integrityFailures,
    borrowed_keys: borrowedKeys,
    hits: uniqueHits,
  }

  if (writeReport) {
    const outPath = path.join(root, "scripts/out/bib-neighbour-borrow-audit.json")
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2))
    report.outPath = outPath
  }

  return {
    hits: uniqueHits,
    borrowedKeys,
    integrityFailures,
    report,
    newIndex,
  }
}
