/**
 * Read-only detectors for food-page claim/citation corruption.
 * Flags only — never rewrites pages.
 *
 * Known generator signatures (ee03197 / e0f9d46 / ca8ae4e):
 * - Highlights or reference annotations built from bibliography titles ("Reports on …")
 * - Abstract openings used as editorial summaries
 * - LaTeX / split Markdown citations
 * - Indiscriminate [1][2] appended to the final Overview sentence
 */
import matter from "gray-matter"
import { parseReferenceLine } from "./bib-citation-format.mjs"

export const HIGHLIGHTS_HEADING_RE =
  /^##\s+(?:Other Nutritional Highlights|Key Nutritional Highlights|Nutritional Highlights)\s*$/m

export const REPORTS_ON_RE = /\bReports on\b/i
export const ABSTRACT_BOILERPLATE_RE =
  /^\s*(?:[-*]\s*)?(?:Background|Objective|Objectives|Aim|Aims|Methods|Methodology|Introduction|Results|Conclusions?)\s*:/im
export const LATEX_CITATION_DEBRIS_RE =
  /\$\^\\textrm|\^\\textrm\{|\$\^\\text|\{\\textrm|\\textless|\\textgreater/
export const SPLIT_MARKDOWN_CITATION_RE =
  /\[[^\]]*(?:\n|\r)+[^\]]*\]\(\/docs\/papers\/BRAIN-Diet-References#[a-z0-9_-]+\)/i
export const FRAMEWORK_SPLIT_CITATION_RE =
  /\[[^\]]+\s*\n+\s*Within the BRAIN Diet framework,\s*\d{4}\]\(\/docs\/papers\/BRAIN-Diet-References#[a-z0-9_-]+\)/i
export const TRAILING_DUMP_CITES_RE = /(?:\[\d+\]){2,}\.?\s*$/
export const GENERATOR_PLACEHOLDER_RE = /^See overview for context\.?$/i

/** High-confidence title tokens that name a different food than the page. */
export const FOOD_SUBJECT_CONFLICTS = [
  {
    id: "garlic-onions-on-non-allium",
    titleRe: /\bgarlic and onions\b|\bgenus Allium\b|\ballicin\b/i,
    allowedSlugs: new Set(["garlic", "onions", "leeks", "chives"]),
  },
  {
    id: "oat-phytase-on-non-oat",
    titleRe: /germinated oat|\bAvena sativa\b/i,
    allowedSlugs: new Set(["oats", "oatmeal", "oat-bran"]),
  },
  {
    id: "neonatal-coq10-on-food",
    titleRe: /Coenzyme Q10 Supplementation in Neonates/i,
    allowedSlugs: new Set(),
  },
  {
    id: "mitochondrial-myopathy-niacin-trial",
    titleRe: /Niacin Cures Systemic NAD\+ Deficiency/i,
    allowedSlugs: new Set(),
  },
  {
    id: "adhd-dysbiosis-on-non-clinical-food",
    titleRe: /attention-deficit\/hyperactivity disorder: Dysbiosis/i,
    allowedSlugs: new Set(),
  },
]

export function extractSection(content, headingRe, endRes = [/^##\s+/m]) {
  const m = content.match(headingRe)
  if (!m || m.index == null) return null
  const start = m.index
  const slice = content.slice(start)
  const firstLineEnd = slice.indexOf("\n")
  const bodyStart = firstLineEnd === -1 ? slice.length : firstLineEnd + 1
  const rest = slice.slice(bodyStart)
  let end = slice.length
  for (const endRe of endRes) {
    const hit = rest.match(endRe)
    if (hit && hit.index != null) end = Math.min(end, bodyStart + hit.index)
  }
  return {
    heading: slice.slice(0, bodyStart).trimEnd(),
    full: slice.slice(0, end),
    body: slice.slice(bodyStart, end),
    start,
    end: start + end,
  }
}

export function extractHighlights(content) {
  return extractSection(content, HIGHLIGHTS_HEADING_RE)
}

export function extractOverview(content) {
  return extractSection(content, /^##\s+Overview\s*$/m)
}

export function extractReferences(content) {
  return extractSection(content, /^##\s+References\s*$/m, [])
}

export function highlightBullets(highlightsBody) {
  if (!highlightsBody) return []
  return highlightsBody
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[-*]\s+/.test(l))
    .map((l) => l.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean)
}

export function lastOverviewParagraph(overviewBody) {
  if (!overviewBody) return ""
  const paras = overviewBody
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith("import "))
  return paras[paras.length - 1] || ""
}

export function stripTrailingNumericCites(text) {
  return String(text || "")
    .replace(/\s*(?:\[\d+\])+\.?\s*$/, "")
    .trim()
}

export function hasMechanicalOverviewDump(overviewBody) {
  const last = lastOverviewParagraph(overviewBody)
  if (!last) return false
  if (FRAMEWORK_SPLIT_CITATION_RE.test(last) || SPLIT_MARKDOWN_CITATION_RE.test(last)) return true
  if (!TRAILING_DUMP_CITES_RE.test(last)) return false
  const without = stripTrailingNumericCites(last)
  if (!without) return false
  if (/\/docs\/papers\/BRAIN-Diet-References#/.test(without) && /(?:\[\d+\]){2,}\s*$/.test(last)) {
    return true
  }
  return !/\[\d+\]/.test(without)
}

function publicEditorialBody(markdown) {
  const { content } = matter(markdown)
  const start = content.search(/^##\s+Overview\s*$/m)
  if (start === -1) return ""
  const fromOverview = content.slice(start)
  const end = fromOverview.search(/^##\s+(Recipes|Substances|References)\s*$/m)
  return (end === -1 ? fromOverview : fromOverview.slice(0, end)).trim()
}

export function isTitleDerivedReportsOn(text, bibTitle) {
  if (!REPORTS_ON_RE.test(text)) return false
  if (!bibTitle) return true
  const claimed = String(text)
    .replace(REPORTS_ON_RE, "")
    .replace(/\[\d+\]/g, "")
    .replace(/\$\^\\textrm\{[^}]+\}/g, "")
    .replace(/[^\w\s]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
  const title = String(bibTitle)
    .replace(/\$\^\\textrm\{[^}]+\}/g, "")
    .replace(/[^\w\s]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
  if (!claimed || !title) return true
  return title.includes(claimed.slice(0, Math.min(40, claimed.length))) || claimed.includes(title.slice(0, 40))
}

export function isAbstractOpening(text, abstract) {
  if (!text || !abstract) return false
  const first = String(abstract)
    .replace(/\{\\textless\}p\{\\textgreater\}/gi, "")
    .split(/(?<=[.!?])\s+/)[0]
    ?.replace(/^Abstract\s+/i, "")
    .replace(/\.$/, "")
    .trim()
  if (!first || first.length < 40) return false
  const a = String(text).replace(/\.$/, "").trim().toLowerCase()
  const b = first.toLowerCase()
  return a.startsWith(b.slice(0, 60)) || b.startsWith(a.slice(0, 60))
}

export function foodSubjectConflicts(slug, titleOrText) {
  const hits = []
  for (const rule of FOOD_SUBJECT_CONFLICTS) {
    if (rule.allowedSlugs.has(slug)) continue
    if (rule.titleRe.test(titleOrText)) hits.push(rule.id)
  }
  return hits
}

/**
 * @param {string} markdown
 * @param {{ slug?: string, bibIndex?: Map<string, any> }} [opts]
 * @returns {{ hard: Array<{id: string, where: string, excerpt: string}>, warnings: Array<{id: string, where: string, excerpt: string}> }}
 */
export function scanFoodCitationIntegrity(markdown, opts = {}) {
  const { slug = "", bibIndex = null } = opts
  const { content } = matter(markdown)
  const hard = []
  const warnings = []
  const push = (list, id, where, excerpt) => {
    const text = String(excerpt || "").replace(/\s+/g, " ").trim()
    list.push({ id, where, excerpt: text.slice(0, 220) })
  }

  const overview = extractOverview(content)
  const highlights = extractHighlights(content)
  const refs = extractReferences(content)
  const publicBody = publicEditorialBody(markdown)

  if (highlights) {
    for (const bullet of highlightBullets(highlights.body)) {
      if (REPORTS_ON_RE.test(bullet) || GENERATOR_PLACEHOLDER_RE.test(bullet)) {
        push(hard, "reports-on-highlights", "Highlights", bullet)
      }
      if (LATEX_CITATION_DEBRIS_RE.test(bullet)) {
        push(hard, "latex-citation-debris", "Highlights", bullet)
      }
    }
  }

  if (ABSTRACT_BOILERPLATE_RE.test(publicBody)) {
    const m = publicBody.match(ABSTRACT_BOILERPLATE_RE)
    push(hard, "abstract-boilerplate-prose", "public-prose", m?.[0] || "")
  }

  if (LATEX_CITATION_DEBRIS_RE.test(content)) {
    push(hard, "latex-citation-debris", "page", "LaTeX citation debris")
  }

  if (SPLIT_MARKDOWN_CITATION_RE.test(content) || FRAMEWORK_SPLIT_CITATION_RE.test(content)) {
    push(hard, "split-markdown-citation", "page", "Split Markdown bibliography link")
  }

  if (overview && hasMechanicalOverviewDump(overview.body)) {
    push(warnings, "mechanical-overview-cites", "Overview", lastOverviewParagraph(overview.body))
  }

  if (refs) {
    for (const line of refs.body.split("\n").map((l) => l.trim()).filter(Boolean)) {
      if (/^##\s/.test(line)) continue
      if (REPORTS_ON_RE.test(line)) {
        push(hard, "reports-on-reference", "References", line)
      }
      const parsed = parseReferenceLine(line)
      const meta = parsed?.key && bibIndex ? bibIndex.get(parsed.key) : null
      if (parsed?.explanation && meta?.abstract && isAbstractOpening(parsed.explanation, meta.abstract)) {
        push(warnings, "abstract-opening-reference", "References", parsed.explanation)
      }
      if (parsed?.explanation && meta?.title && isTitleDerivedReportsOn(parsed.explanation, meta.title)) {
        push(hard, "reports-on-reference", "References", parsed.explanation)
      }
      const title = parsed?.titleOverride || meta?.title || line
      for (const id of foodSubjectConflicts(slug, title)) {
        push(warnings, "food-subject-conflict", "References", `${id}: ${title}`)
      }
      if (parsed?.explanation && !parsed.explanation.includes("mixed-meal") && !parsed.explanation.includes("not a ") && foodSubjectConflicts(slug, title).length) {
        push(warnings, "unlabelled-mismatched-evidence", "References", line)
      }
    }
  }

  if (highlights && /deriveKnH|See overview for context/i.test(highlights.body)) {
    push(warnings, "generator-highlights", "Highlights", "Generator placeholder")
  }

  return { hard, warnings }
}

export function collectIdenticalHighlightWarnings(pages) {
  const byBullet = new Map()
  for (const { slug, markdown } of pages) {
    const { content } = matter(markdown)
    const highlights = extractHighlights(content)
    if (!highlights) continue
    for (const bullet of highlightBullets(highlights.body)) {
      const key = bullet
        .replace(/\[\d+\]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
      if (key.length < 40) continue
      if (!byBullet.has(key)) byBullet.set(key, [])
      byBullet.get(key).push(slug)
    }
  }
  const warnings = []
  for (const [bullet, slugs] of byBullet) {
    const unique = [...new Set(slugs)]
    if (unique.length >= 3) {
      warnings.push({
        id: "identical-generic-highlights",
        where: "Highlights",
        excerpt: `${unique.join(", ")}: ${bullet.slice(0, 160)}`,
        slugs: unique,
      })
    }
  }
  return warnings
}
