/**
 * Derive and render FM “Supporting Key Constraint Pools” from PM → KC mappings.
 *
 * Canonical relationship: PM → KC. The FM listing is the union of Key Constraints
 * relied upon by constituent PMs. Do not list every parent-BRS KC, invent KCs,
 * or treat FM front matter as an independent mapping.
 */

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { buildKcPoolIndex } from "./kc-pool-index.mjs"
import { isRetiredKc } from "./kc-registry.mjs"

function readMechanismPage(filePath) {
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { raw, data, content }
}

function resolveMechanismMdxFromHref(href, rootDir) {
  if (!href || typeof href !== "string") return null
  const rel = href
    .replace(/^\/docs\/biological-targets\//, "")
    .replace(/\.mdx?$/i, "")
  if (!rel) return null
  return path.join(rootDir, "docs/biological-targets", `${rel}.mdx`)
}

function listFmFiles(rootDir) {
  const base = path.join(rootDir, "docs/biological-targets")
  const out = []
  const isPmFile = (name) => /-fm\d+-pm\d+-/.test(name) || /brs-x-[a-z]+-pm\d+-/.test(name)
  const isFmFile = (name) =>
    (/-fm\d+-/.test(name) || /brs-x-[a-z]+-fm\d+-/.test(name)) && !isPmFile(name)
  function walk(dir) {
    if (!fs.existsSync(dir)) return
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name)
      if (ent.isDirectory()) walk(full)
      else if (isFmFile(ent.name) && (ent.name.endsWith(".mdx") || ent.name.endsWith(".md"))) {
        out.push(full)
      }
    }
  }
  walk(base)
  return out.sort()
}

export function getKcPoolIndex(rootDir) {
  const docsRoot = path.join(rootDir, "docs")
  return buildKcPoolIndex(docsRoot)
}

export const KC_POOL_HEADING = "**Supporting Key Constraint Pools**"

const KC_ID_RE = /BRS(?:\d+|-X)\([^)]*KC\d+\)/g
const FORBIDDEN_NUMBERED_KC_HEADING = /^### 4\.2 Supporting Biological Pools \(Key Constraints\)/m

function firstSentence(text) {
  const cleaned = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
  if (!cleaned) return ""
  const m = cleaned.match(/^.+?[.!?]+(?=\s|$)/)
  return (m ? m[0] : cleaned).replace(/\.$/, "") + "."
}

export function extractKcIdsFromText(text) {
  if (!text) return []
  const ids = []
  const seen = new Set()
  for (const m of String(text).matchAll(KC_ID_RE)) {
    if (seen.has(m[0])) continue
    seen.add(m[0])
    ids.push(m[0])
  }
  return ids
}

export function parsePmKeyConstraintIds(raw) {
  const ids = []
  const seen = new Set()
  for (const item of raw || []) {
    const id =
      item && typeof item === "object"
        ? String(item.id || "").trim()
        : extractKcIdsFromText(item)[0]
    if (!id || seen.has(id) || isRetiredKc({ id })) continue
    seen.add(id)
    ids.push(id)
  }
  return ids
}

function kcHrefFromIndex(index, kcId) {
  return index.byId.get(kcId)?.href || null
}

function kcNameFromIndex(index, kcId) {
  const entry = index.byId.get(kcId)
  if (!entry) return kcId
  return String(entry.label || entry.kcId).replace(new RegExp(`^${kcId.replace(/[()]/g, "\\$&")}\\s*[-—]\\s*`), "").trim() ||
    kcId
}

function kcRoleSentence(index, kcId) {
  const entry = index.byId.get(kcId)
  if (!entry?.filePath || !fs.existsSync(entry.filePath)) {
    const name = kcNameFromIndex(index, kcId)
    return `${name}.`
  }
  const { data, content } = readMechanismPage(entry.filePath)
  const roleBlock = content.match(/### 2\. Constraint Role\s*\n+\s*([^\n]+)/)
  const source = roleBlock?.[1]?.trim() || data.summary || entry.label || kcId
  return firstSentence(source)
}

function readPmPage(rootDir, pm) {
  const filePath = resolveMechanismMdxFromHref(pm?.href, rootDir)
  if (!filePath || !fs.existsSync(filePath)) return { pm, filePath: null, data: {}, content: "", kcIds: [] }
  const { data, content } = readMechanismPage(filePath)
  return {
    pm,
    filePath,
    data,
    content,
    kcIds: parsePmKeyConstraintIds(data.key_constraints),
  }
}

function pmBodyKcIds(content) {
  const block = content.match(
    /<summary><strong>4\.1\.3 KCs \(Key Constraints\)<\/strong><\/summary>[\s\S]*?<\/details>/i,
  )
  return extractKcIdsFromText(block ? block[0] : "")
}

/**
 * Union of KC ids relied upon by an FM’s constituent PMs, in first-seen order.
 * @returns {{ kcs: object[], pmRecords: object[], missingPmPages: object[] }}
 */
export function deriveFmKcUnion(fmData, rootDir, kcIndex = getKcPoolIndex(rootDir)) {
  const pms = Array.isArray(fmData.mechanisms_covered) ? fmData.mechanisms_covered : []
  const byId = new Map()
  const pmRecords = []
  const missingPmPages = []

  for (const pm of pms) {
    const record = readPmPage(rootDir, pm)
    pmRecords.push(record)
    if (!record.filePath) missingPmPages.push(pm)
    for (const kcId of record.kcIds) {
      if (!byId.has(kcId)) {
        byId.set(kcId, {
          id: kcId,
          name: kcNameFromIndex(kcIndex, kcId),
          href: kcHrefFromIndex(kcIndex, kcId),
          role: kcRoleSentence(kcIndex, kcId),
          pms: [],
        })
      }
      const entry = byId.get(kcId)
      if (!entry.pms.some((item) => item.id === pm.id)) {
        entry.pms.push({ id: pm.id, name: pm.name, href: pm.href })
      }
    }
  }

  return { kcs: [...byId.values()], pmRecords, missingPmPages, kcIndex }
}

function formatReliedUpon(pms) {
  return pms
    .map((pm) => (pm.href ? `[${pm.id}](${pm.href})` : pm.id))
    .join(", ")
}

/** Restored markdown listing (git-era bullets + Relied upon by). Empty union → "". */
export function buildSupportingKcPoolMarkdown(kcs) {
  if (!kcs?.length) return ""
  const bullets = kcs.map((kc) => {
    const title = kc.href ? `[${kc.id} — ${kc.name}](${kc.href})` : `${kc.id} — ${kc.name}`
    const relied = formatReliedUpon(kc.pms || [])
    return `- ${title}\n  Relied upon by: ${relied}\n  ${kc.role}`
  })
  return `${KC_POOL_HEADING}\n\n${bullets.join("\n\n")}`
}

export function extractSupportingKcPoolBlock(content) {
  const m = content.match(
    /\*\*Supporting Key Constraint Pools\*\*\n\n([\s\S]*?)(?=\n### 4\.1 |\n### 4\.\d )/,
  )
  return m ? `${KC_POOL_HEADING}\n\n${m[1].trim()}` : null
}

export function parseRenderedKcPoolIds(block) {
  if (!block) return []
  const ids = []
  const seen = new Set()
  for (const m of block.matchAll(/^\s*-\s+\[(BRS(?:\d+|-X)\([^)]*KC\d+\))/gm)) {
    if (seen.has(m[1])) continue
    seen.add(m[1])
    ids.push(m[1])
  }
  return ids
}

export function stripSupportingKcPoolListing(content) {
  return content.replace(
    /\n+\*\*Supporting Key Constraint Pools\*\*\n[\s\S]*?(?=\n### 4\.1 )/,
    "\n",
  )
}

export function insertSupportingKcPoolListing(content, listingBlock) {
  let next = stripSupportingKcPoolListing(content)
  next = next.replace(
    /\n### 4\.2 Supporting Biological Pools \(Key Constraints\)\n[\s\S]*?(?=\n### 4\.\d )/,
    "\n",
  )
  const section = next.match(
    /(## 4\. Mechanistic Basis[^\n]*\n+)([\s\S]*?)(\n+### 4\.1 )/,
  )
  if (!section) return next
  const introParas = section[2].trim()
  const firstPara = introParas.split(/\n\n/)[0].trim()
  const extra = introParas.split(/\n\n/).slice(1).join("\n\n").trim()
  const listing = listingBlock ? `\n\n${listingBlock.trim()}` : ""
  const extraBlock = extra ? `\n\n${extra}` : ""
  return (
    next.slice(0, section.index) +
    section[1] +
    firstPara +
    listing +
    extraBlock +
    section[3] +
    next.slice(section.index + section[0].length)
  )
}

function fmFrontMatterKcIds(fmData) {
  return parsePmKeyConstraintIds(fmData.key_constraints)
}

function extractSection43(content) {
  const m = content.match(
    /### 4\.3 Suboptimal Function & Its Effects\n([\s\S]*?)(?=\n### 4\.4 |\n## 5\. )/,
  )
  return m ? m[1] : ""
}

function listingIsBefore41(content) {
  const mb = content.match(/## 4\. Mechanistic Basis[\s\S]*?(?=\n## 5\. )/)
  if (!mb) return false
  const block = mb[0]
  const headingAt = block.indexOf("**Supporting Key Constraint Pools**")
  const h41 = block.indexOf("### 4.1 ")
  const h43 = block.indexOf("### 4.3 ")
  if (headingAt === -1) return true
  if (h41 === -1) return false
  if (headingAt > h41) return false
  if (h43 !== -1 && headingAt > h43) return false
  return headingAt < h41
}

export function reconcileFmKcPools(filePath, { rootDir, kcIndex }) {
  const { data, content } = readMechanismPage(filePath)
  const derived = deriveFmKcUnion(data, rootDir, kcIndex)
  const listingMarkdown = buildSupportingKcPoolMarkdown(derived.kcs)
  const renderedBlock = extractSupportingKcPoolBlock(content)
  const renderedIds = parseRenderedKcPoolIds(renderedBlock)
  const derivedIds = derived.kcs.map((kc) => kc.id)
  const fmFmIds = fmFrontMatterKcIds(data)
  const section43 = extractSection43(content)
  const citedIn43 = extractKcIdsFromText(section43)
  const missingFromUnion = citedIn43.filter((id) => !derivedIds.includes(id) && !isRetiredKc({ id }))
  const unresolvedHrefs = derived.kcs.filter((kc) => !kc.href).map((kc) => kc.id)
  const pmsMissingMapping = []
  for (const record of derived.pmRecords) {
    const bodyIds = pmBodyKcIds(record.content)
    if (bodyIds.length && !record.kcIds.length) {
      pmsMissingMapping.push({
        pmId: record.pm.id,
        evidence: "§4.1.3 lists KC links but PM front matter has no key_constraints",
        bodyKcIds: bodyIds,
      })
    } else if (bodyIds.some((id) => !record.kcIds.includes(id))) {
      pmsMissingMapping.push({
        pmId: record.pm.id,
        evidence: "§4.1.3 cites KC ids absent from PM front matter key_constraints",
        bodyKcIds: bodyIds.filter((id) => !record.kcIds.includes(id)),
      })
    }
  }

  const issues = []
  const entityLabel = data.fm_id || path.basename(filePath)

  if (FORBIDDEN_NUMBERED_KC_HEADING.test(content)) {
    issues.push({
      code: "fm_forbidden_kc_subsection",
      message: `${entityLabel}: do not restore ### 4.2 Supporting Biological Pools (Key Constraints); the listing belongs after the §4 opening paragraph and before ### 4.1`,
    })
  }
  if (derivedIds.length && !renderedBlock) {
    issues.push({
      code: "fm_missing_kc_pool_listing",
      message: `${entityLabel}: §4 must render Supporting Key Constraint Pools derived from constituent PM → KC mappings`,
    })
  }
  if (!derivedIds.length && renderedBlock) {
    issues.push({
      code: "fm_empty_kc_pool_listing",
      message: `${entityLabel}: FMs with no mapped KCs must not render an empty Supporting Key Constraint Pools section`,
    })
  }
  if (derivedIds.length && renderedIds.join("\0") !== derivedIds.join("\0")) {
    issues.push({
      code: "fm_kc_pool_not_pm_derived",
      message: `${entityLabel}: displayed KC pool must be the PM-derived union (${derivedIds.join(", ") || "none"}); found ${renderedIds.join(", ") || "none"}`,
    })
  }
  if (renderedIds.length !== new Set(renderedIds).size) {
    issues.push({
      code: "fm_kc_pool_duplicate",
      message: `${entityLabel}: duplicate KCs cannot render in Supporting Key Constraint Pools`,
    })
  }
  if (derivedIds.length && !listingIsBefore41(content)) {
    issues.push({
      code: "fm_kc_pool_position",
      message: `${entityLabel}: Supporting Key Constraint Pools must sit after the §4 opening paragraph and before ### 4.1`,
    })
  }
  for (const id of unresolvedHrefs) {
    issues.push({
      code: "fm_kc_pool_unresolved_href",
      message: `${entityLabel}: KC ${id} in the PM-derived union does not resolve to a canonical KC page`,
    })
  }
  for (const id of missingFromUnion) {
    issues.push({
      code: "fm_kc_43_not_in_pm_union",
      message: `${entityLabel}: §4.3 cites ${id} but that KC is absent from the PM-derived union`,
    })
  }
  for (const gap of pmsMissingMapping) {
    issues.push({
      code: "fm_pm_kc_mapping_gap",
      message: `${entityLabel}: ${gap.pmId} appears to require a KC (${gap.bodyKcIds.join(", ")}) but has no canonical PM front-matter mapping — not inferred`,
    })
  }

  return {
    fmId: data.fm_id,
    filePath,
    derivedIds,
    renderedIds,
    fmFrontMatterIds: fmFmIds,
    citedIn43,
    missingFromUnion,
    unresolvedHrefs,
    pmsMissingMapping,
    missingPmPages: derived.missingPmPages,
    listingMarkdown,
    kcs: derived.kcs,
    issues,
  }
}

export function restoreFmSupportingKcPoolPage(filePath, { rootDir, kcIndex }) {
  const raw = fs.readFileSync(filePath, "utf8")
  const before = reconcileFmKcPools(filePath, { rootDir, kcIndex })
  const next = insertSupportingKcPoolListing(raw, before.listingMarkdown || null)
  if (next !== raw) fs.writeFileSync(filePath, next)
  const report = reconcileFmKcPools(filePath, { rootDir, kcIndex })
  return { ...report, written: next !== raw }
}

export function restoreAllFmSupportingKcPools(rootDir = process.cwd()) {
  const kcIndex = getKcPoolIndex(rootDir)
  const files = listFmFiles(rootDir)
  const reports = files.map((filePath) => restoreFmSupportingKcPoolPage(filePath, { rootDir, kcIndex }))
  return reports
}

export { listFmFiles }

export function validateFmSupportingKcPools(filePath, issues, { rootDir, kcIndex = getKcPoolIndex(rootDir) }) {
  const report = reconcileFmKcPools(filePath, { rootDir, kcIndex })
  for (const issue of report.issues) issues.push(issue)
  return report
}
