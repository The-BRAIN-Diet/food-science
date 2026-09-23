#!/usr/bin/env node
/**
 * Audit (and optionally repair) food-page claim/citation corruption from:
 *   ee03197 (2025-11-13) — keyword-matched references
 *   e0f9d46 (2026-06-27) — title/abstract reference explanations
 *   ca8ae4e (2026-07-05) — Highlights from titles + Overview [1][2] dump
 *
 *   node scripts/audit-food-citation-corruption.mjs
 *   node scripts/audit-food-citation-corruption.mjs --repair
 */
import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"
import matter from "gray-matter"
import {
  loadBibIndex,
  parseReferenceLine,
  formatFoodReferenceLine,
  formatSalmonRoeRefLine,
} from "./lib/bib-citation-format.mjs"
import {
  extractHighlights,
  extractOverview,
  extractReferences,
  highlightBullets,
  lastOverviewParagraph,
  stripTrailingNumericCites,
  hasMechanicalOverviewDump,
  REPORTS_ON_RE,
  LATEX_CITATION_DEBRIS_RE,
  FRAMEWORK_SPLIT_CITATION_RE,
  SPLIT_MARKDOWN_CITATION_RE,
  GENERATOR_PLACEHOLDER_RE,
  isAbstractOpening,
  isTitleDerivedReportsOn,
  foodSubjectConflicts,
  scanFoodCitationIntegrity,
  collectIdenticalHighlightWarnings,
} from "./lib/food-citation-integrity.mjs"

const COMMITS = {
  ee03197: "ee03197",
  e0f9d46: "e0f9d46",
  ca8ae4e: "ca8ae4e",
}

const FOODS_DIR = "docs/foods"
const MANIFEST_JSON = "scripts/data/food-citation-corruption-manifest.json"
const MANIFEST_MD = "system/food-citation-corruption-audit.md"

const SKIP = new Set(["index.md", "shopping-list.md"])

/** Keys that cannot stand as direct food evidence on these pages. */
const UNSUPPORTED_KEYS = {
  lamb: ["nicastro_garlic_onions_2015", "rose_allium_sulfoxides_2005"],
  pistachios: ["mantle_efficacy_2024", "packer_vitamin_1997"],
  peanuts: ["pirinen_niacin_2020"],
  mushrooms: ["pirinen_niacin_2020"],
  "kidney-beans": ["greiner_phytate_1999"],
  lentils: ["greiner_phytate_1999"],
  peas: ["dhir_neurological_2019"],
  "early-harvest-olive-oil": ["gasmi_neurotransmitters_2022"],
  lemon: ["entezari_garlic_lemon_hyperlipidaemia_2016"],
}

const ANIMAL_EAA = `This food provides a complete essential amino acid profile typical of animal proteins.`

function git(args, encoding = "utf8") {
  try {
    return execFileSync("git", args, {
      encoding,
      maxBuffer: 20 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    })
  } catch (err) {
    const msg = `${err.stderr || ""} ${err.message || ""}`
    if (err.status === 128 || /does not exist in|exists on disk, but not in|bad revision/i.test(msg)) {
      return null
    }
    throw err
  }
}

function foodFilesInCommit(commit) {
  const out = git(["show", "--name-only", "--pretty=format:", commit]) || ""
  return out
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("docs/foods/") && l.endsWith(".md") && !SKIP.has(path.basename(l)))
}

function showAt(commit, file) {
  const raw = git(["show", `${commit}:${file}`])
  return raw == null ? null : raw
}

function slugOf(file) {
  return path.basename(file, ".md")
}

function normalizeClaim(text) {
  return String(text || "")
    .replace(/\[(?:\d+|[^\]]+)\]\([^)]+\)/g, "")
    .replace(/\[\d+\]/g, "")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
}

function isOverviewCopy(bullet, overviewBody) {
  const a = normalizeClaim(bullet)
  if (a.length < 25) return false
  const ov = normalizeClaim(overviewBody)
  if (!ov) return false
  if (ov.includes(a) || a.includes(ov.slice(0, 80))) return true
  const sentences = overviewBody.split(/(?<=[.!?])\s+/)
  return sentences.some((s) => {
    const b = normalizeClaim(s)
    return b.length > 25 && (a.includes(b) || b.includes(a))
  })
}

function refKeys(sectionBody) {
  const keys = []
  const re = /BRAIN-Diet-References#([a-z0-9_-]+)/gi
  let m
  while ((m = re.exec(sectionBody || "")) !== null) {
    if (!keys.includes(m[1])) keys.push(m[1])
  }
  return keys
}

function parseRefLines(body) {
  return (body || "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !/^##\s/.test(l))
}

function extractPreExplanationForKey(preRefsBody, key) {
  const lines = parseRefLines(preRefsBody)
  for (const line of lines) {
    if (!line.includes(`#${key}`)) continue
    const parsed = parseReferenceLine(line)
    if (parsed?.explanation && !REPORTS_ON_RE.test(parsed.explanation)) {
      return parsed.explanation.replace(/\.$/, "")
    }
    const stripped = line
      .replace(/\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#[^)]+\)/g, "")
      .replace(/^[-*]\s*/, "")
      .replace(/\[\d+\]\s*/, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\.$/, "")
    if (stripped.length >= 40 && !REPORTS_ON_RE.test(stripped) && !/these references link/i.test(stripped)) {
      return stripped
    }
  }
  return null
}

function classifyPage(file, current, versions, bibIndex) {
  const slug = slugOf(file)
  const commits = []
  if (versions.eePost != null || versions.eePre != null) commits.push("ee03197")
  if (versions.e0Post != null || versions.e0Pre != null) commits.push("e0f9d46")
  if (versions.caPost != null || versions.caPre != null) commits.push("ca8ae4e")

  const findings = []
  const scan = current ? scanFoodCitationIntegrity(current, { slug, bibIndex }) : { hard: [], warnings: [] }

  const curContent = current ? matter(current).content : ""
  const curHl = extractHighlights(curContent)
  const curOv = extractOverview(curContent)
  const curRefs = extractReferences(curContent)

  const caPreHl = versions.caPre ? extractHighlights(matter(versions.caPre).content) : null
  const caPostHl = versions.caPost ? extractHighlights(matter(versions.caPost).content) : null
  const caPreOv = versions.caPre ? extractOverview(matter(versions.caPre).content) : null
  const caPostOv = versions.caPost ? extractOverview(matter(versions.caPost).content) : null

  if (curHl) {
    for (const b of highlightBullets(curHl.body)) {
      if (REPORTS_ON_RE.test(b)) {
        findings.push({
          section: "Key Nutritional Highlights",
          text: b,
          failure: "title-or-abstract-boilerplate",
          citations: (b.match(/\[(\d+)\]/g) || []).join(""),
        })
      } else if (isOverviewCopy(b, curOv?.body || "")) {
        findings.push({
          section: "Key Nutritional Highlights",
          text: b,
          failure: "overview-copied-into-highlights",
          citations: (b.match(/\[(\d+)\]/g) || []).join(""),
        })
      }
    }
  } else if (caPostHl && /Reports on /.test(caPostHl.body) && !curHl) {
    findings.push({
      section: "Key Nutritional Highlights",
      text: "(removed after ca8ae4e)",
      failure: "legitimate-and-retained",
      citations: "",
    })
  }

  if (curOv && hasMechanicalOverviewDump(curOv.body)) {
    findings.push({
      section: "Overview",
      text: lastOverviewParagraph(curOv.body),
      failure: "indiscriminate-citation-final-overview-sentence",
      citations: (lastOverviewParagraph(curOv.body).match(/\[\d+\]/g) || []).join(""),
    })
  }

  if (curContent && (SPLIT_MARKDOWN_CITATION_RE.test(curContent) || FRAMEWORK_SPLIT_CITATION_RE.test(curContent))) {
    findings.push({
      section: "Overview",
      text: "Split Markdown bibliography link",
      failure: "malformed-markdown-or-split-citation",
      citations: "",
    })
  }
  if (curContent && LATEX_CITATION_DEBRIS_RE.test(curContent)) {
    findings.push({
      section: "References",
      text: "LaTeX \\textrm debris in citation/title",
      failure: "malformed-markdown-or-split-citation",
      citations: "",
    })
  }

  const e0PreRefs = versions.e0Pre ? extractReferences(matter(versions.e0Pre).content) : null
  const e0PostRefs = versions.e0Post ? extractReferences(matter(versions.e0Post).content) : null
  const eePreKeys = versions.eePre ? refKeys(matter(versions.eePre).content) : []
  const eePostKeys = versions.eePost ? refKeys(matter(versions.eePost).content) : []
  const addedKeys = eePostKeys.filter((k) => !eePreKeys.includes(k))

  if (curRefs) {
    for (const line of parseRefLines(curRefs.body)) {
      const parsed = parseReferenceLine(line)
      const meta = parsed?.key ? bibIndex.get(parsed.key) : null
      const title = parsed?.titleOverride || meta?.title || ""
      if (REPORTS_ON_RE.test(line) || (parsed?.explanation && meta?.title && isTitleDerivedReportsOn(parsed.explanation, meta.title))) {
        findings.push({
          section: "References",
          text: line,
          failure: "title-or-abstract-boilerplate",
          citations: parsed?.key || "",
        })
      } else if (parsed?.explanation && meta?.abstract && isAbstractOpening(parsed.explanation, meta.abstract)) {
        findings.push({
          section: "References",
          text: line,
          failure: "title-or-abstract-boilerplate",
          citations: parsed?.key || "",
        })
      }
      for (const id of foodSubjectConflicts(slug, title)) {
        findings.push({
          section: "References",
          text: line,
          failure: "unrelated-food-or-intervention",
          citations: parsed?.key || id,
        })
      }
      if (parsed?.key && addedKeys.includes(parsed.key)) {
        findings.push({
          section: "References",
          text: `ee03197 added ${parsed.key}`,
          failure: "uncertain-and-requiring-editorial-review",
          citations: parsed.key,
        })
      }
    }
  }

  const missing = !current
  const laterHighlights =
    caPostHl &&
    curHl &&
    normalizeClaim(curHl.body) !== normalizeClaim(caPostHl.body) &&
    !REPORTS_ON_RE.test(curHl.body)

  let status = "pending-repair"
  if (missing) status = "renamed-or-removed"
  else if (slug === "eggs" || slug === "egg-yolks") status = "repaired-example"
  else if (!findings.length && !scan.hard.length) status = "needs-claim-citation-review"
  else if (laterHighlights && !scan.hard.length && !hasMechanicalOverviewDump(curOv?.body || "")) {
    status = "later-editorial-supersede"
  }

  return {
    file,
    slug,
    commits,
    exists: Boolean(current),
    added_keys_ee03197: addedKeys,
    pre_ca8_had_highlights: Boolean(caPreHl),
    ca8_created_highlights: Boolean(caPostHl) && !caPreHl,
    overview_dump_at_ca8:
      caPreOv && caPostOv
        ? hasMechanicalOverviewDump(caPostOv.body) &&
          stripTrailingNumericCites(lastOverviewParagraph(caPreOv.body)) ===
            stripTrailingNumericCites(lastOverviewParagraph(caPostOv.body))
        : false,
    findings,
    scan_hard: scan.hard,
    scan_warnings: scan.warnings,
    e0_rewrote_refs: Boolean(e0PreRefs && e0PostRefs),
    status,
  }
}

function replaceSection(content, section, nextFull) {
  if (!section) {
    if (!nextFull) return content
    const foodCtx = content.search(/^##\s+Food Context\s*$/m)
    if (foodCtx !== -1) {
      return `${content.slice(0, foodCtx).trimEnd()}\n\n${nextFull.trim()}\n\n${content.slice(foodCtx)}`
    }
    return `${content.trimEnd()}\n\n${nextFull.trim()}\n`
  }
  if (!nextFull) {
    return `${content.slice(0, section.start).trimEnd()}\n\n${content.slice(section.end).replace(/^\s+/, "")}`
  }
  return `${content.slice(0, section.start)}${nextFull.trim()}\n${content.slice(section.end).replace(/^\n*/, "\n")}`
}

function fixSplitCitations(content) {
  let next = content.replace(
    /\[([^\n\]]+?)\s*\n+\s*Within the BRAIN Diet framework,\s*(\d{4})\]\((\/docs\/papers\/BRAIN-Diet-References#[a-z0-9_-]+)\)(?:\s*(?:\[\d+\])+)?\.?/g,
    "[$1 $2]($3)",
  )
  next = next.replace(
    /\[([^\n\]]+?)\s*\n+\s*(\d{4})\]\((\/docs\/papers\/BRAIN-Diet-References#[a-z0-9_-]+)\)(?:\s*(?:\[\d+\])+)?\.?/g,
    "[$1 $2]($3)",
  )
  next = next.replace(
    /(\]\(\/docs\/papers\/BRAIN-Diet-References#[a-z0-9_-]+\))\s*(?:\[\d+\])+\.?/g,
    "$1",
  )
  return next
}

function stripInjectedOverviewCites(content, caPre, caPost) {
  const overview = extractOverview(content)
  if (!overview) return content
  let body = overview.body
  body = fixSplitCitations(body)

  const preOv = caPre ? extractOverview(matter(caPre).content) : null
  const postOv = caPost ? extractOverview(matter(caPost).content) : null
  const curLast = lastOverviewParagraph(body)
  const preLast = preOv ? lastOverviewParagraph(preOv.body) : ""
  const postLast = postOv ? lastOverviewParagraph(postOv.body) : ""

  if (preLast && postLast) {
    const preNorm = stripTrailingNumericCites(fixSplitCitations(preLast))
    const postNorm = stripTrailingNumericCites(postLast)
    const curNorm = stripTrailingNumericCites(curLast)
    const injected =
      /(?:\[\d+\])+/.test(postLast) &&
      !/(?:\[\d+\]){2,}/.test(preLast) &&
      (preNorm === postNorm || normalizeClaim(preNorm) === normalizeClaim(postNorm))
    if (injected && (curNorm === postNorm || normalizeClaim(curNorm) === normalizeClaim(postNorm) || normalizeClaim(curNorm) === normalizeClaim(preNorm))) {
      body = body.replace(curLast, preLast.trim().replace(/\s*(?:\[\d+\])+\.?\s*$/, "").trim() + (/[.!?]$/.test(preLast.trim()) ? "" : "."))
    } else if (hasMechanicalOverviewDump(body)) {
      const cleaned = stripTrailingNumericCites(curLast)
      if (cleaned && cleaned !== curLast) {
        const withStop = /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`
        body = body.replace(curLast, withStop)
      }
    }
  } else if (hasMechanicalOverviewDump(body)) {
    const cleaned = stripTrailingNumericCites(curLast)
    if (cleaned && cleaned !== curLast) {
      const withStop = /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`
      body = body.replace(curLast, withStop)
    }
  }

  body = body.replace(/\n+$/, "\n")
  if (!body.endsWith("\n")) body += "\n"
  return `${content.slice(0, overview.start)}## Overview\n\n${body.trim()}\n${content.slice(overview.end)}`
}

function repairHighlights(content, caPre) {
  const highlights = extractHighlights(content)
  const overview = extractOverview(content)
  if (!highlights) return content
  const restOfPage = `${overview?.body || ""}\n${content.slice(highlights.end)}`

  const kept = []
  for (const bullet of highlightBullets(highlights.body)) {
    if (REPORTS_ON_RE.test(bullet)) continue
    if (GENERATOR_PLACEHOLDER_RE.test(bullet)) continue
    if (LATEX_CITATION_DEBRIS_RE.test(bullet)) continue
    if (/Use this page when a …/.test(bullet)) continue
    if (isOverviewCopy(bullet, restOfPage)) continue
    if (SPLIT_MARKDOWN_CITATION_RE.test(bullet)) continue
    kept.push(`- ${bullet}`)
  }

  if (!kept.length) {
    const preHl = caPre ? extractHighlights(matter(caPre).content) : null
    if (preHl) {
      const restored = []
      for (const bullet of highlightBullets(preHl.body)) {
        if (REPORTS_ON_RE.test(bullet)) continue
        if (isOverviewCopy(bullet, overview?.body || "")) continue
        restored.push(`- ${bullet}`)
      }
      if (restored.length) {
        return replaceSection(content, highlights, `${preHl.heading}\n\n${restored.join("\n")}\n`)
      }
    }
    return replaceSection(content, highlights, null)
  }

  return replaceSection(content, highlights, `${highlights.heading}\n\n${kept.join("\n")}\n`)
}

function isBoilerplateExplanation(explanation, meta) {
  if (!explanation) return false
  if (REPORTS_ON_RE.test(explanation)) return true
  if (meta?.title && isTitleDerivedReportsOn(`Reports on ${explanation}`, meta.title)) return true
  if (meta?.title && normalizeClaim(explanation) === normalizeClaim(meta.title)) return true
  if (meta?.abstract && isAbstractOpening(explanation, meta.abstract)) return true
  if (/^Background:|^Objective:|^Methods:|^Introduction:/i.test(explanation)) return true
  return false
}

function repairReferences(content, slug, e0Pre, bibIndex) {
  const refs = extractReferences(content)
  if (!refs) return content
  const preBody = e0Pre ? extractReferences(matter(e0Pre).content)?.body : ""
  const lines = parseRefLines(refs.body)
  const rebuilt = []
  const dropKeys = new Set(UNSUPPORTED_KEYS[slug] || [])
  let changed = false

  for (const line of lines) {
    const parsed = parseReferenceLine(line)
    if (!parsed?.key) {
      if (REPORTS_ON_RE.test(line) || LATEX_CITATION_DEBRIS_RE.test(line)) {
        changed = true
        continue
      }
      rebuilt.push(line)
      continue
    }
    if (dropKeys.has(parsed.key)) {
      changed = true
      continue
    }
    const meta = bibIndex.get(parsed.key)
    const latex = LATEX_CITATION_DEBRIS_RE.test(line)
    const boilerplate = isBoilerplateExplanation(parsed.explanation, meta) || REPORTS_ON_RE.test(line)
    const hallbergNeedsLabel =
      parsed.key === "hallberg_iron_1989" &&
      parsed.explanation &&
      !/mixed-meal|not a .+ trial/i.test(parsed.explanation)
    if (!boilerplate && !latex && !hallbergNeedsLabel) {
      rebuilt.push(line)
      continue
    }

    changed = true
    let explanation = parsed.explanation || null
    if (boilerplate) {
      explanation = extractPreExplanationForKey(preBody, parsed.key)
      if (explanation && isBoilerplateExplanation(explanation, meta)) explanation = null
    }
    if (hallbergNeedsLabel) {
      explanation =
        "Human mixed-meal iron-absorption series: phytate inhibits non-haem iron absorption; ascorbic acid can counteract that inhibition. Mixed-meal evidence, not a trial of this food"
    }
    const cleanedTitle = (parsed.titleOverride || meta?.title || "")
      .replace(/\$\^\\textrm\{[^}]*\}/g, "")
      .replace(/\\textrm\{[^}]*\}/g, "")
      .replace(/\$+/g, "")
      .replace(/\s{2,}/g, " ")
      .trim()
    rebuilt.push(formatFoodReferenceLine(parsed.n, parsed.key, explanation, cleanedTitle || null, bibIndex))
  }

  if (!changed) return content
  if (!rebuilt.length) {
    return replaceSection(content, refs, "## References\n")
  }
  return `${content.slice(0, refs.start)}## References\n\n${rebuilt.join("\n\n")}\n`
}

function dropUnsupportedInlineCites(content, slug) {
  const dropKeys = UNSUPPORTED_KEYS[slug]
  if (!dropKeys?.length) return content
  const refs = extractReferences(content)
  if (!refs) return content
  const nForKey = new Map()
  for (const line of parseRefLines(refs.body)) {
    const parsed = parseReferenceLine(line)
    if (parsed?.key && parsed.n != null) nForKey.set(parsed.key, parsed.n)
  }
  const dropNs = new Set(dropKeys.map((k) => nForKey.get(k)).filter((n) => n != null))
  if (!dropNs.size) return content
  const body = content.slice(0, refs.start)
  const nextBody = body.replace(/\[(\d+(?:\s*,\s*\d+)*)\]/g, (full, inner) => {
    const kept = inner
      .split(/,/g)
      .map((s) => s.trim())
      .filter((s) => !dropNs.has(Number(s)))
    if (!kept.length) return ""
    if (kept.join(",") === inner.replace(/\s/g, "")) return full
    return `[${kept.join(",")}]`
  })
  return nextBody.replace(/[ \t]+\n/g, "\n") + content.slice(refs.start)
}

function fixAnimalEaaIfPlantText(content, slug) {
  const dairyLike = new Set(["parmesan-cheese", "cheddar-cheese", "greek-yogurt", "milk", "ghee", "butter", "grass-fed-butter"])
  if (!dairyLike.has(slug)) return content
  return content.replace(
    /### Essential Amino Acid Profile\n\n[^\n]*contribute plant protein[^\n]*/,
    `### Essential Amino Acid Profile\n\n${ANIMAL_EAA}`,
  )
}

function specialCaseRepairs(content, slug) {
  if (slug === "lentils") {
    content = content.replace(
      /short‑chain fatty acid production, which indirectly influences metabolic and brain health \[2\]\./,
      "short‑chain fatty acid production, which indirectly influences metabolic and brain health.",
    )
    content = content.replace(
      /and neurometabolic processes \[1\]\./,
      "and neurometabolic processes.",
    )
    content = content.replace(
      /when prepared and combined appropriately \[1\]\./,
      "when prepared and combined appropriately.",
    )
    content = content.replace(
      /Soaking, sprouting, and pairing with vitamin C–rich foods improves mineral bioavailability from lentil-based meals \[1,2\]\./,
      "Soaking and sprouting reduce phytates in legumes. Pairing with vitamin C–rich foods improves non-haem iron absorption in mixed meals; that is mixed-meal evidence, not a lentil-feeding trial [2].",
    )
  }
  if (slug === "spinach") {
    content = content.replace(
      /\n## Key Nutritional Highlights\n\n- Boiling reduced soluble oxalate by 30–87% and was more effective than steaming \(5–53%\) \[2\]\n/,
      "\n",
    )
  }
  if (slug === "parmesan-cheese") {
    content = content.replace(
      /Parmesan cheese provides CLA[\s\S]*?soerensen_effect_2014\)[^\n]*/,
      "Parmesan cheese provides CLA (conjugated linoleic acid), vitamin K2, C15:0 pentadecanoic acid, glutamate, high protein, and calcium. Evidence suggests hard cheeses with high calcium do not raise serum LDL levels, supporting their use in moderation within nutrient-dense dietary patterns [Soerensen et al. 2014](/docs/papers/BRAIN-Diet-References#soerensen_effect_2014).",
    )
  }
  if (slug === "spinach") {
    content = content.replace(
      /Oxalate negatively affects mitochondrial function and changes redox status in monocytes \[Chaiyarit and Thongboonkerd 2020\]\(\/docs\/papers\/BRAIN-Diet-References#chaiyarit_mitochondrial_2020\)\. Experimental studies have shown that oxalate can influence mitochondrial and redox biology at the cellular level, although the relevance of these findings to typical dietary intakes remains uncertain\./,
      "Oxalate can influence mitochondrial and redox biology in experimental cell models; this is mechanistic context rather than spinach-feeding evidence, and relevance to typical dietary intakes remains uncertain [Chaiyarit and Thongboonkerd 2020](/docs/papers/BRAIN-Diet-References#chaiyarit_mitochondrial_2020).",
    )
    content = content.replace(
      /Pair with vitamin C sources \(citrus, bell peppers\) to enhance iron absorption, with studies showing up to a fourfold increase when consumed together \[Hallberg et al\. 1989\]\(\/docs\/papers\/BRAIN-Diet-References#hallberg_iron_1989\)/,
      "Pair with vitamin C sources (citrus, bell peppers) to enhance non-haem iron absorption; Hallberg 1989 is mixed-meal iron-absorption evidence, not a spinach trial [Hallberg et al. 1989](/docs/papers/BRAIN-Diet-References#hallberg_iron_1989)",
    )
  }
  if (slug === "kale" || slug === "tomatoes" || slug === "black-beans") {
    content = content.replace(
      /Pair with vitamin C sources[^\n]*\[Hallberg et al\. 1989\]\(\/docs\/papers\/BRAIN-Diet-References#hallberg_iron_1989\)/,
      (m) =>
        m.includes("mixed-meal")
          ? m
          : m.replace(
              /\[Hallberg et al\. 1989\]/,
              "— mixed-meal iron-absorption evidence, not a trial of this food [Hallberg et al. 1989]",
            ),
    )
  }
  return content
}

function restoreCitedOriginalRefs(content, originalContent, slug) {
  const origRefs = extractReferences(originalContent)
  const curRefs = extractReferences(content)
  if (!origRefs || !curRefs) return content
  const body = content.slice(0, curRefs.start)
  const curKeys = new Set(refKeys(curRefs.body))
  const dropKeys = new Set(UNSUPPORTED_KEYS[slug] || [])
  const extras = []
  for (const line of parseRefLines(origRefs.body)) {
    const parsed = parseReferenceLine(line)
    if (!parsed?.key || curKeys.has(parsed.key) || dropKeys.has(parsed.key)) continue
    if (body.includes(`#${parsed.key}`)) {
      extras.push(line)
      curKeys.add(parsed.key)
    }
  }
  if (!extras.length) return content
  const existing = parseRefLines(curRefs.body)
  return `${content.slice(0, curRefs.start)}## References\n\n${[...existing, ...extras].join("\n\n")}\n`
}

function repairPage(file, current, versions, bibIndex) {
  const slug = slugOf(file)
  if (slug === "eggs" || slug === "egg-yolks") {
    return { content: current, changed: false, note: "already-repaired-example" }
  }
  if (!current) return { content: null, changed: false, note: "missing" }

  const { data: fm, content: initial } = matter(current)
  let content = initial
  content = fixSplitCitations(content)
  content = stripInjectedOverviewCites(content, versions.caPre, versions.caPost)
  content = repairHighlights(content, versions.caPre)
  content = specialCaseRepairs(content, slug)
  content = dropUnsupportedInlineCites(content, slug)
  content = repairReferences(content, slug, versions.e0Pre, bibIndex)
  content = dropUnsupportedInlineCites(content, slug)
  content = repairReferences(content, slug, versions.e0Pre, bibIndex)
  content = restoreCitedOriginalRefs(content, initial, slug)
  content = fixAnimalEaaIfPlantText(content, slug)
  content = content.replace(
    /([^\n])\n(## (?:Key Nutritional Highlights|Other Nutritional Highlights|Nutritional Highlights|Food Context))/g,
    "$1\n\n$2",
  )
  content = content.replace(/\n{3,}/g, "\n\n")
  if (!content.endsWith("\n")) content += "\n"
  if (content === initial) return { content: current, changed: false, note: "unchanged" }

  const fmBlock = current.match(/^---\n[\s\S]*?\n---\n/)
  const next = fmBlock ? `${fmBlock[0]}${content.replace(/^\n/, "")}` : matter.stringify(content, fm, { lineWidth: 9999 })
  return { content: next, changed: next !== current, note: "repaired" }
}

function loadVersions(file) {
  return {
    eePre: showAt(`${COMMITS.ee03197}^`, file),
    eePost: showAt(COMMITS.ee03197, file),
    e0Pre: showAt(`${COMMITS.e0f9d46}^`, file),
    e0Post: showAt(COMMITS.e0f9d46, file),
    caPre: showAt(`${COMMITS.ca8ae4e}^`, file),
    caPost: showAt(COMMITS.ca8ae4e, file),
  }
}

function writeManifest(records, extra) {
  const byFailure = {}
  for (const rec of records) {
    const types = rec.findings.length ? rec.findings.map((f) => f.failure) : [rec.status]
    for (const t of types) {
      byFailure[t] = (byFailure[t] || 0) + 1
    }
  }
  const payload = {
    generated_at: new Date().toISOString(),
    commits: COMMITS,
    population: records.length,
    failure_counts: byFailure,
    identical_highlights: extra.identical || [],
    pages: records,
  }
  fs.mkdirSync(path.dirname(MANIFEST_JSON), { recursive: true })
  fs.writeFileSync(MANIFEST_JSON, `${JSON.stringify(payload, null, 2)}\n`)

  const lines = [
    "# Food-page citation corruption audit",
    "",
    "Internal audit only. Not a reader-facing page.",
    "",
    `Generated ${payload.generated_at}.`,
    "",
    "Source transformations:",
    "",
    "- `ee03197` (13 Nov 2025): references added through loose keyword matching.",
    "- `e0f9d46` (27 Jun 2026): references rewritten from bibliography titles or opening abstract sentences.",
    "- `ca8ae4e` (5 Jul 2026): Highlights migrated from titles; indiscriminate `[1][2]` on final Overview sentences.",
    "",
    `**Audit population:** ${records.length} unique food-page paths.`,
    "",
    "## Failure-type counts (finding rows, not unique pages)",
    "",
    ...Object.entries(byFailure)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `- ${k}: ${n}`),
    "",
    "## Status by page",
    "",
    "| Page | Commits | Status | Findings |",
    "| --- | --- | --- | --- |",
    ...records.map((r) => {
      const kinds = [...new Set(r.findings.map((f) => f.failure))].join("; ") || "—"
      return `| \`${r.file}\` | ${r.commits.join(", ")} | ${r.status} | ${kinds} |`
    }),
    "",
    "Eggs and egg yolks are included as repaired examples. Renamed paths (`yogurt.md`, `cooled-potatoes.md`) remain in the population as historical members.",
    "",
  ]
  fs.writeFileSync(MANIFEST_MD, lines.join("\n"))
  return payload
}

function main() {
  const repair = process.argv.includes("--repair")
  const bibIndex = loadBibIndex()
  const union = new Set([
    ...foodFilesInCommit(COMMITS.ee03197),
    ...foodFilesInCommit(COMMITS.e0f9d46),
    ...foodFilesInCommit(COMMITS.ca8ae4e),
  ])
  const files = [...union].sort()
  const records = []
  const pagesForIdent = []
  let repaired = 0

  for (const file of files) {
    const versions = loadVersions(file)
    const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null
    let working = current
    let note = null
    if (repair && current) {
      const result = repairPage(file, current, versions, bibIndex)
      if (result.changed) {
        fs.writeFileSync(file, result.content)
        working = result.content
        repaired += 1
        note = result.note
      }
    }
    const rec = classifyPage(file, working, versions, bibIndex)
    if (note) rec.repair_note = note
    if (repair && current && rec.scan_hard.length === 0 && rec.findings.every((f) => f.failure === "uncertain-and-requiring-editorial-review" || f.failure === "legitimate-and-retained")) {
      rec.status = rec.added_keys_ee03197.length ? "repaired-pending-evidence-review" : "repaired"
    }
    if (repair && (rec.slug === "eggs" || rec.slug === "egg-yolks")) rec.status = "repaired-example"
    records.push(rec)
    if (working) pagesForIdent.push({ slug: rec.slug, markdown: working })
  }

  const identical = collectIdenticalHighlightWarnings(pagesForIdent)
  writeManifest(records, { identical })
  console.log(`Population: ${records.length}`)
  console.log(`Repaired this run: ${repaired}`)
  console.log(`Manifest: ${MANIFEST_JSON}`)
  console.log(`Summary: ${MANIFEST_MD}`)
  const remainingHard = records.flatMap((r) => r.scan_hard)
  console.log(`Remaining hard signatures: ${remainingHard.length}`)
  if (identical.length) {
    console.log(`Identical Highlights warnings: ${identical.length}`)
  }
}

main()
