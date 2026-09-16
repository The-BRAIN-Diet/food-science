import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export const PAGE_TYPES = [
  "Food",
  "Substance",
  "Recipe",
  "BRS",
  "FM",
  "PM",
  "KC",
  "SM",
  "Dependency",
  "Index",
  "Phenome",
  "Framework/methodology",
  "Other",
]

export const REVIEW_STATUSES = [
  "unreviewed",
  "issues_logged",
  "source_checked",
  "expert_reviewed",
  "recheck_required",
]

export const ISSUE_STATUSES = ["open", "deferred", "resolved"]
export const PRIORITIES = ["high", "medium", "low"]
export const ISSUE_VISIBILITIES = ["public", "internal"]

export const PUBLIC_REGISTER_SITE_PATH = "/docs/dietary-foundations/framework-review-and-corrections"

const BRS_HUB_FILES = {
  "docs/biological-targets/neurotransmitter-regulation.md": "BRS1",
  "docs/biological-targets/methylation-one-carbon-metabolism.md": "BRS2",
  "docs/biological-targets/inflammation-oxidative-stress.md": "BRS3",
  "docs/biological-targets/mitochondrial-function-bioenergetics.md": "BRS4",
  "docs/biological-targets/gut-brain-axis-enteric-nervous-system.md": "BRS5",
  "docs/biological-targets/metabolic-neuroendocrine-stress.md": "BRS6",
  "docs/biological-targets/cross-system-regulation.md": "BRS-X",
}

const RECIPE_MEAL_FOLDERS = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Drinks",
  "Snacks",
  "Side-dishes",
  "WIP",
]

export function walkDocPages(docsDir) {
  const out = []
  function isWalkableDir(ent, abs) {
    if (ent.isDirectory()) return true
    if (!ent.isSymbolicLink()) return false
    try {
      return fs.statSync(abs).isDirectory()
    } catch {
      return false
    }
  }
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, ent.name)
      if (isWalkableDir(ent, abs)) {
        if (ent.name === ".cursor") continue
        walk(abs)
        continue
      }
      if (!/\.(md|mdx)$/i.test(ent.name)) continue
      out.push(abs)
    }
  }
  walk(docsDir)
  return out.sort()
}

export function toPosix(p) {
  return p.split(path.sep).join("/")
}

export function sitePathFromDocsRel(relPosix) {
  const noExt = relPosix.replace(/\.(md|mdx)$/i, "")
  if (noExt.endsWith("/index")) return `/docs/${noExt.slice(0, -"/index".length)}`.replace(/\/$/, "") || "/docs"
  return `/docs/${noExt}`
}

export function letterFromTitle(title) {
  const m = String(title || "").normalize("NFKD").match(/[A-Za-z]/)
  return m ? m[0].toUpperCase() : "_"
}

function tagsOf(data) {
  const t = data.tags
  if (!Array.isArray(t)) return []
  return t.map((x) => String(x))
}

function hasTag(data, label) {
  return tagsOf(data).some((t) => t.toLowerCase() === label.toLowerCase())
}

function normalizeParentBrs(value, relPosix) {
  const raw = value ? String(value) : ""
  const x = raw.match(/^BRS-X(?:\(([^)]+)\))?/i)
  if (x) return { brs: "BRS-X", subsystem: x[1] ? x[1].toUpperCase() : null }
  const n = raw.match(/^BRS(\d+)/i)
  if (n) return { brs: `BRS${n[1]}`, subsystem: null }
  const m = relPosix.match(/docs\/biological-targets\/(brs\d+|brs-x)(?:\/([^/]+))?/i)
  if (m) {
    if (/^brs\d+$/i.test(m[1])) return { brs: m[1].toUpperCase(), subsystem: null }
    const sub = m[2] && !/^(fm\d+|kc|sm)$/i.test(m[2]) ? m[2] : null
    return { brs: "BRS-X", subsystem: sub ? sub.toUpperCase() : null }
  }
  return { brs: null, subsystem: null }
}

export function brsHierarchyFromPath(relPosix, data) {
  const hub = BRS_HUB_FILES[relPosix]
  if (hub) return { brs: hub, fm: null, leaf: hub, kind: "hub", subsystem: null }

  const { brs, subsystem } = normalizeParentBrs(data.parent_brs, relPosix)

  const pmId = data.pm_id ? String(data.pm_id) : null
  const fmId = data.fm_id ? String(data.fm_id) : null
  const kcId = data.kc_id ? String(data.kc_id) : null

  let fm = null
  if (data.parent_fm) {
    const pf = String(data.parent_fm)
    const fmMatch = pf.match(/FM\d+/i)
    fm = fmMatch ? fmMatch[0].toUpperCase() : pf
  } else if (fmId) {
    const fmMatch = String(fmId).match(/FM\d+/i)
    fm = fmMatch ? fmMatch[0].toUpperCase() : null
  } else {
    const fmPath = relPosix.match(/\/(fm\d+)\//i)
    if (fmPath) fm = fmPath[1].toUpperCase()
  }

  const leaf = pmId || kcId || fmId || brs
  return { brs, subsystem, fm, leaf, kind: pmId ? "pm" : kcId ? "kc" : fmId ? "fm" : "other" }
}

export function classifyPage(relPosix, data) {
  const notes = []
  const base = path.posix.basename(relPosix)
  const isIndex = /^index\.(md|mdx)$/i.test(base)

  if (relPosix.startsWith("docs/foods/")) {
    if (isIndex) return { page_type: "Index", notes: ["Foods index listing"] }
    return { page_type: "Food", notes }
  }
  if (relPosix.startsWith("docs/recipes/")) {
    if (isIndex) return { page_type: "Index", notes: ["Recipe category or root index"] }
    return { page_type: "Recipe", notes }
  }
  if (relPosix.startsWith("docs/phenomes/")) {
    return { page_type: "Phenome", notes }
  }
  if (relPosix.startsWith("docs/dietary-foundations/") || relPosix.startsWith("docs/system/") || relPosix.startsWith("docs/training/")) {
    return { page_type: "Framework/methodology", notes }
  }

  if (relPosix.startsWith("docs/biological-targets/")) {
    if (relPosix.includes("/sm/")) {
      return { page_type: "SM", notes }
    }
    if (relPosix.includes("/dependencies/")) {
      return { page_type: "Dependency", notes }
    }
    if (isIndex) return { page_type: "Index", notes: ["BRS index listing"] }
    if (data.pm_id || /(?:^|\/)[^/]*-pm\d+/i.test(relPosix) || /(?:^|\/)[^/]*-pm\d+/i.test(base)) {
      return { page_type: "PM", notes }
    }
    if (data.kc_id || /\/kc\//.test(relPosix)) {
      return { page_type: "KC", notes }
    }
    if (data.fm_id || /\/fm\d+\//.test(relPosix)) {
      return { page_type: "FM", notes }
    }
    if (BRS_HUB_FILES[relPosix] || /^docs\/biological-targets\/brs-x\/[^/]+\/[^/]+\.mdx?$/.test(relPosix)) {
      return { page_type: "BRS", notes }
    }
    if (/^docs\/biological-targets\/[^/]+\.mdx?$/.test(relPosix)) {
      return { page_type: "BRS", notes }
    }
    notes.push("biological-targets path did not match PM/FM/KC/hub patterns")
    return { page_type: "Other", notes }
  }

  if (relPosix.startsWith("docs/substances/")) {
    if (isIndex) return { page_type: "Index", notes: ["Substance folder index"] }
    if (hasTag(data, "Substance") || data.inchikey || data.id) {
      return { page_type: "Substance", notes }
    }
    notes.push("substance path without Substance tag or inchikey; classified Substance by folder")
    return { page_type: "Substance", notes }
  }

  if (hasTag(data, "Food")) return { page_type: "Food", notes: ["classified by Food tag outside docs/foods"] }
  if (hasTag(data, "Recipe")) return { page_type: "Recipe", notes: ["classified by Recipe tag outside docs/recipes"] }
  if (hasTag(data, "Substance")) return { page_type: "Substance", notes }

  if (isIndex) return { page_type: "Index", notes: ["collection or folder index"] }
  return { page_type: "Other", notes }
}

function compactEntityId(value) {
  return String(value).replace("(", "-").replace(")", "")
}

export function pageIdFrom(relPosix, data, pageType) {
  if (data.pm_id) return String(data.pm_id)
  if (data.fm_id) return compactEntityId(data.fm_id)
  if (data.kc_id) return compactEntityId(data.kc_id)
  if (data.sm_id) return compactEntityId(data.sm_id)
  if (data.id) return String(data.id)
  const stem = path.posix.basename(relPosix).replace(/\.(md|mdx)$/i, "")
  if (stem.toLowerCase() === "index") {
    return relPosix.replace(/\.(md|mdx)$/i, "").replace(/\//g, "--")
  }
  return stem
}

export function mealCategoryFromPath(relPosix) {
  const m = relPosix.match(/^docs\/recipes\/([^/]+)\//)
  if (!m) return null
  const folder = m[1]
  if (folder === "index.md") return null
  return RECIPE_MEAL_FOLDERS.includes(folder) ? folder : folder
}

export function scanPages(root) {
  const docsDir = path.join(root, "docs")
  const files = walkDocPages(docsDir)
  const classification_notes = []
  const pages = []

  for (const abs of files) {
    const relPosix = toPosix(path.relative(root, abs))
    const raw = fs.readFileSync(abs, "utf8")
    let data = {}
    try {
      data = matter(raw).data || {}
    } catch (err) {
      classification_notes.push({ path: relPosix, note: `front-matter parse failed: ${err.message}` })
    }
    const { page_type, notes } = classifyPage(relPosix, data)
    for (const note of notes) classification_notes.push({ path: relPosix, note })
    const title = data.title ? String(data.title) : path.posix.basename(relPosix).replace(/\.(md|mdx)$/i, "")
    const hierarchy = brsHierarchyFromPath(relPosix, data)
    pages.push({
      page_id: pageIdFrom(relPosix, data, page_type),
      path: relPosix,
      title,
      page_type,
      letter: letterFromTitle(title),
      site_path: sitePathFromDocsRel(relPosix.replace(/^docs\//, "")),
      meal_category: page_type === "Recipe" ? mealCategoryFromPath(relPosix) : null,
      brs_hierarchy: ["BRS", "FM", "PM", "KC", "SM"].includes(page_type) ? hierarchy : null,
    })
  }

  return { pages, classification_notes }
}

export function loadJson(abs, fallback) {
  if (!fs.existsSync(abs)) return fallback
  return JSON.parse(fs.readFileSync(abs, "utf8"))
}

export function mergeReviewState(scanned, stateDoc, issuesDoc) {
  const stateMap = stateDoc.pages || {}
  const specificById = new Map()
  const specificByPath = new Map()
  for (const issue of issuesDoc.issues || []) {
    if (issue.scope?.kind !== "page") continue
    for (const id of issue.scope.page_ids || []) {
      const arr = specificById.get(id) || []
      arr.push(issue.id)
      specificById.set(id, arr)
    }
    for (const p of issue.scope.page_paths || []) {
      const arr = specificByPath.get(p) || []
      arr.push(issue.id)
      specificByPath.set(p, arr)
    }
  }

  return scanned.map((row) => {
    const st = stateMap[row.page_id] || {}
    const linked = new Set([
      ...(st.linked_framework_issue_ids || []),
      ...(specificById.get(row.page_id) || []),
      ...(specificByPath.get(row.path) || []),
    ])
    let review_status = st.review_status || "unreviewed"
    if (linked.size && review_status === "unreviewed") review_status = "issues_logged"
    return {
      page_id: row.page_id,
      path: row.path,
      title: row.title,
      page_type: row.page_type,
      letter: row.letter,
      review_status,
      last_checked: st.last_checked ?? null,
      checked_by: st.checked_by ?? null,
      review_scope: st.review_scope ?? null,
      public_reviewer: typeof st.public_reviewer === "string" ? st.public_reviewer : null,
      accepted_limitations: Array.isArray(st.accepted_limitations) ? st.accepted_limitations : [],
      linked_framework_issue_ids: [...linked].sort(),
      site_path: row.site_path || sitePathFromDocsRel(row.path.replace(/^docs\//, "")),
    }
  })
}

export function issueIsOpen(issue) {
  return issue.status === "open"
}

export function applicableFrameworkIssues(page, extras, issues) {
  const out = []
  for (const issue of issues) {
    const kind = issue.scope?.kind
    if (kind === "framework-wide") continue
    if (kind === "page") continue
    if (kind === "page_type" && (issue.scope.page_types || []).includes(page.page_type)) out.push(issue)
    if (kind === "letter" && (issue.scope.letters || []).includes(page.letter)) out.push(issue)
    if (kind === "brs_hierarchy" && extras.brs_hierarchy?.brs) {
      const keys = issue.scope.brs_hierarchy || []
      const h = extras.brs_hierarchy
      const tokens = [h.brs, h.fm && `${h.brs}-${h.fm}`, h.leaf].filter(Boolean)
      if (keys.some((k) => tokens.includes(k))) out.push(issue)
    }
  }
  return out
}

export function buildReport({ register, scanned, issues, classification_notes }) {
  const byType = {}
  for (const t of PAGE_TYPES) byType[t] = 0
  const byStatus = {}
  for (const s of REVIEW_STATUSES) byStatus[s] = 0
  const letterBuckets = { Food: {}, Substance: {}, Recipe: {} }
  const brsBuckets = {}

  const scanByPath = new Map(scanned.map((p) => [p.path, p]))

  for (const row of register) {
    byType[row.page_type] = (byType[row.page_type] || 0) + 1
    byStatus[row.review_status] = (byStatus[row.review_status] || 0) + 1
    if (letterBuckets[row.page_type]) {
      letterBuckets[row.page_type][row.letter] = (letterBuckets[row.page_type][row.letter] || 0) + 1
    }
    const extra = scanByPath.get(row.path)
    if (extra?.brs_hierarchy?.brs) {
      const h = extra.brs_hierarchy
      const key = h.subsystem ? `${h.brs} (${h.subsystem})` : h.brs
      brsBuckets[key] ||= { BRS: 0, FM: 0, PM: 0, KC: 0 }
      if (brsBuckets[key][row.page_type] != null) brsBuckets[key][row.page_type] += 1
    }
  }

  const issuePages = {}
  for (const issue of issues) {
    issuePages[issue.id] = register
      .filter((r) => r.linked_framework_issue_ids.includes(issue.id))
      .map((r) => ({ page_id: r.page_id, path: r.path, title: r.title }))
  }

  return {
    generated: new Date().toISOString().slice(0, 10),
    total: register.length,
    by_page_type: byType,
    by_review_status: byStatus,
    by_letter: letterBuckets,
    by_brs_hierarchy: brsBuckets,
    pages_connected_to_issues: issuePages,
    classification_notes,
  }
}

export function formatReportMarkdown(report, issues) {
  const lines = []
  lines.push("# Framework QC page-review report")
  lines.push("")
  lines.push(`Generated: ${report.generated}`)
  lines.push("")
  lines.push(`**Total pages:** ${report.total}`)
  lines.push("")
  lines.push("## Count by page type")
  lines.push("")
  for (const [k, v] of Object.entries(report.by_page_type)) lines.push(`- ${k}: ${v}`)
  lines.push("")
  lines.push("## Count by review status")
  lines.push("")
  for (const [k, v] of Object.entries(report.by_review_status)) lines.push(`- ${k}: ${v}`)
  lines.push("")
  lines.push("## Alphabetical letter (Foods, Substances, Recipes)")
  lines.push("")
  for (const kind of ["Food", "Substance", "Recipe"]) {
    lines.push(`### ${kind}`)
    const bucket = report.by_letter[kind] || {}
    const letters = Object.keys(bucket).sort()
    if (!letters.length) lines.push("- (none)")
    for (const L of letters) lines.push(`- ${L}: ${bucket[L]}`)
    lines.push("")
  }
  lines.push("## BRS hierarchy")
  lines.push("")
  const brsKeys = Object.keys(report.by_brs_hierarchy).sort()
  if (!brsKeys.length) lines.push("- (none)")
  for (const brs of brsKeys) {
    const b = report.by_brs_hierarchy[brs]
    lines.push(`- ${brs}: BRS ${b.BRS}, FM ${b.FM}, PM ${b.PM}, KC ${b.KC}`)
  }
  lines.push("")
  lines.push("## Pages connected to each framework issue")
  lines.push("")
  for (const issue of issues) {
    lines.push(`### ${issue.id} — ${issue.title} (\`${issue.scope.kind}\`, ${issue.status})`)
    if (issue.scope.kind === "framework-wide") {
      lines.push("")
      lines.push("Framework-wide: not copied onto individual register rows.")
      lines.push("")
      continue
    }
    const rows = report.pages_connected_to_issues[issue.id] || []
    if (!rows.length) lines.push("- (no specific page rows)")
    for (const r of rows) lines.push(`- ${r.page_id} — ${r.title} (\`${r.path}\`)`)
    lines.push("")
  }
  lines.push("## Classifications that could not be determined reliably")
  lines.push("")
  if (!report.classification_notes.length) lines.push("- None")
  else {
    for (const n of report.classification_notes) lines.push(`- \`${n.path}\`: ${n.note}`)
  }
  lines.push("")
  return lines.join("\n")
}

export function buildQueuePages(register, scanned, issues) {
  const scanByPath = new Map(scanned.map((p) => [p.path, p]))
  const issueById = Object.fromEntries(issues.map((i) => [i.id, i]))
  return register.map((row) => {
    const extra = scanByPath.get(row.path) || {}
    const pageIssues = row.linked_framework_issue_ids.map((id) => issueById[id]).filter(Boolean)
    const openCount = pageIssues.filter(issueIsOpen).length
    const maxPriority = pageIssues.reduce((acc, iss) => {
      const rank = { high: 3, medium: 2, low: 1 }
      return Math.max(acc, rank[iss.priority] || 0)
    }, 0)
    return {
      ...row,
      site_path: extra.site_path,
      meal_category: extra.meal_category,
      brs_hierarchy: extra.brs_hierarchy,
      page_issues: pageIssues.map((i) => ({
        id: i.id,
        title: i.title,
        status: i.status,
        priority: i.priority,
        findings: i.findings,
        required_action: i.required_action,
        subsection: i.scope?.subsection || null,
      })),
      applicable_scoped: applicableFrameworkIssues(row, extra, issues).map((i) => i.id),
      open_issue_count: openCount,
      priority_rank: maxPriority,
    }
  })
}

export function isPublicIssue(issue) {
  return issue?.visibility === "public"
}

export function normalizePublicPath(pathname) {
  if (!pathname) return ""
  const noQuery = String(pathname).split("?")[0].split("#")[0]
  if (!noQuery) return ""
  return noQuery.replace(/\/$/, "") || "/"
}

export function publicReviewerOf(row) {
  if (typeof row?.public_reviewer === "string" && row.public_reviewer.trim()) {
    return row.public_reviewer.trim()
  }
  return null
}

function affectedPublicPagesForIssue(issue, register) {
  const seen = new Set()
  const out = []
  for (const row of register) {
    if (!row.linked_framework_issue_ids?.includes(issue.id)) continue
    const site_path = row.site_path || sitePathFromDocsRel(String(row.path || "").replace(/^docs\//, ""))
    const key = `${row.page_id}::${site_path}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({
      page_id: row.page_id,
      title: row.title,
      site_path,
      page_type: row.page_type,
      letter: row.letter,
      review_status: row.review_status,
    })
  }
  return out
}

export function sanitizePublicIssue(issue, register) {
  if (!isPublicIssue(issue)) return null
  const findings = Array.isArray(issue.public_findings)
    ? issue.public_findings
    : Array.isArray(issue.findings)
      ? issue.findings
      : []
  return {
    id: issue.public_id || issue.id,
    title: issue.public_title || issue.title,
    findings: findings.map((f) => String(f)),
    status: issue.status,
    resolution_summary: issue.resolution_summary || null,
    resolved_date: issue.resolved_date || null,
    affected_pages: affectedPublicPagesForIssue(issue, register),
  }
}

export function openPublicIssueCount(pageRecord) {
  if (!pageRecord) return 0
  return (pageRecord.issues || []).filter((i) => i.status === "open").length
}

export function findPublicPageRecord(dataset, { permalink, pageId, extraIds = [] } = {}) {
  const pages = dataset?.pages || []
  const path = normalizePublicPath(permalink)
  const ids = [pageId, ...extraIds].filter(Boolean).flatMap((id) => [id, String(id).replace("(", "-").replace(")", "")])
  return (
    pages.find((p) => p.site_path === path) ||
    pages.find((p) => ids.includes(p.page_id)) ||
    null
  )
}

export function buildPublicDataset({ register, issues, generated }) {
  const publicIssues = (issues || []).map((issue) => sanitizePublicIssue(issue, register)).filter(Boolean)
  const publicById = Object.fromEntries(publicIssues.map((i) => [i.id, i]))

  const pages = register.map((row) => {
    const pageIssues = (row.linked_framework_issue_ids || [])
      .map((id) => publicById[id])
      .filter(Boolean)
    const openIssues = pageIssues.filter((i) => i.status === "open")
    const deferredIssues = pageIssues.filter((i) => i.status === "deferred")
    const resolvedIssues = pageIssues.filter((i) => i.status === "resolved")
    return {
      page_id: row.page_id,
      site_path: row.site_path || sitePathFromDocsRel(String(row.path || "").replace(/^docs\//, "")),
      title: row.title,
      page_type: row.page_type,
      letter: row.letter,
      review_status: row.review_status,
      last_checked: row.last_checked ?? null,
      reviewer: publicReviewerOf(row),
      review_scope: row.review_scope || null,
      issues: openIssues.map((i) => ({
        id: i.id,
        title: i.title,
        findings: i.findings,
        status: i.status,
        resolution_summary: i.resolution_summary,
        resolved_date: i.resolved_date,
      })),
      limitations: [
        ...(Array.isArray(row.accepted_limitations) ? row.accepted_limitations.map((t) => String(t)) : []),
        ...deferredIssues.map((i) => `${i.id}: ${i.title}`),
      ],
      history: resolvedIssues.map((i) => ({
        id: i.id,
        title: i.title,
        findings: i.findings,
        status: i.status,
        resolution_summary: i.resolution_summary,
        resolved_date: i.resolved_date,
      })),
    }
  })

  return {
    version: 1,
    generated: generated || new Date().toISOString().slice(0, 10),
    register_path: PUBLIC_REGISTER_SITE_PATH,
    pages,
    issues: publicIssues,
  }
}

export function assertPublicDatasetSafe(dataset) {
  const raw = JSON.stringify(dataset)
  if (raw.includes("required_action") || raw.includes("checked_by") || raw.includes("page_paths")) {
    throw new Error("public QC dataset leaked internal issue or reviewer fields")
  }
  if (/"path"\s*:/.test(raw)) {
    throw new Error("public QC dataset must not expose filesystem paths")
  }
  if (raw.includes("framework-qc-seed")) {
    throw new Error("public QC dataset leaked an internal reviewer identity")
  }
}
