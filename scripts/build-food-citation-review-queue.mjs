#!/usr/bin/env node
/**
 * Read-only: classify the audit working-tree diff and emit a human-review queue.
 * Does not rewrite food pages.
 */
import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"
import matter from "gray-matter"
import { loadBibIndex, parseReferenceLine } from "./lib/bib-citation-format.mjs"
import {
  extractHighlights,
  extractOverview,
  extractReferences,
  highlightBullets,
  foodSubjectConflicts,
} from "./lib/food-citation-integrity.mjs"

const FOODS = "docs/foods"
const MANIFEST = "scripts/data/food-citation-corruption-manifest.json"
const OUT_QUEUE = "scripts/data/food-citation-review-queue.json"
const OUT_SAFETY = "scripts/data/food-citation-safety-report.json"

const VERIFIED_SLUGS = new Set(["eggs", "egg-yolks"])

const LABEL_RE =
  /mixed-meal|constituent-level|constituent evidence|dietary-pattern|food-group|mechanistic context|meal-pattern|pairing\/matrix|pairing\/matrix evidence|not a (?:[^.]+ )?(?:feeding |spinach |chicken |turkey |tuna |carrot |beef |flax[- ]seed |pickle |olive[- ]oil |mushroom )?trial|not a trial of this/i

const CLINICAL_RE =
  /\b(cancer|carcinogen|ADHD|hyperlipidaemia|hyperlipidemia|insulin sensitivity|diabetes|mitochondrial myopathy|NAD\+ deficiency|cognitive function|mortality|coronary|LDL|blood lipids|depression|anxiety)\b/i

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 40 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  })
}

function stripCites(text) {
  return String(text || "")
    .replace(/\[(?:[^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#[^)]+\)/g, "")
    .replace(/\[\d+(?:,\d+)*\]/g, "")
    .replace(/\[\d+[–-]\d+\]/g, "")
    .replace(/\\textless\w*\\textgreater/g, "")
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function editorialBody(markdown) {
  const { content } = matter(markdown)
  const start = content.search(/^##\s+Overview\s*$/m)
  if (start === -1) return ""
  const from = content.slice(start)
  const end = from.search(/^##\s+(Recipes|Substances|References)\s*$/m)
  return (end === -1 ? from : from.slice(0, end)).trim()
}

/** Overview + Food Context only. Highlights are reported separately. */
function overviewAndContext(markdown) {
  const { content } = matter(markdown)
  const ov = extractOverview(content)
  const ctx = content.match(/^##\s+Food Context\s*$/m)
  let ctxBody = ""
  if (ctx && ctx.index != null) {
    const slice = content.slice(ctx.index)
    const end = slice.search(/^##\s+(Essential Amino Acid Profile|Recipes|Nutrition|Substances|References)/m)
    ctxBody = (end === -1 ? slice : slice.slice(0, end)).trim()
  }
  return `${ov?.body || ""}\n${ctxBody}`.trim()
}

const FOOD_FAMILIES = [
  new Set(["cocoa", "cacao-powder", "cacao-nibs-raw", "dark-chocolate"]),
  new Set(["olive-oil", "extra-virgin-olive-oil", "early-harvest-olive-oil", "olives"]),
  new Set(["sesame-seeds", "tahini"]),
  new Set(["algal-oil", "nori", "seaweed", "spirulina", "chlorella"]),
  new Set(["garlic", "onions", "leeks"]),
  new Set(["milk", "butter", "grass-fed-butter", "cheddar-cheese", "parmesan-cheese", "ghee", "greek-yogurt", "kefir"]),
  new Set(["mushrooms", "oyster-mushroom", "shiitake-mushroom", "maitake-mushroom", "lions-mane-mushroom", "reishi-mushroom", "turkey-tail-mushroom", "cordyceps-mushroom"]),
]

function sameFamily(a, b) {
  return FOOD_FAMILIES.some((s) => s.has(a) && s.has(b))
}

function sentencesCiting(body, n, key) {
  const parts = String(body || "").split(/(?<=[.!?])\s+/)
  const out = []
  const numRe = new RegExp(`\\[${n}\\]|\\[${n},|\\[\\d+,${n}\\]|\\[${n}[–-]\\d+|\\[\\d+[–-]${n}\\]`)
  const keyRe = key
    ? new RegExp(`BRAIN-Diet-References#${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`)
    : null
  for (const s of parts) {
    if (numRe.test(s) || (keyRe && keyRe.test(s))) out.push(s.replace(/\s+/g, " ").trim())
  }
  return out
}

function classifyLabel(text) {
  const t = String(text || "")
  if (/mixed-meal|meal-pattern/i.test(t)) return "food-group-or-dietary-pattern"
  if (/dietary-pattern|food-group/i.test(t)) return "food-group-or-dietary-pattern"
  if (/constituent-level|constituent evidence/i.test(t)) return "constituent"
  if (/mechanistic context|mechanism of/i.test(t)) return "mechanistic"
  if (/pairing\/matrix|pairing\/matrix evidence|tomato–olive-oil|tomato–oil/i.test(t)) {
    return "food-group-or-dietary-pattern"
  }
  if (/not a .{0,40}trial/i.test(t)) return "explicitly-not-direct-food"
  return "unlabelled"
}

function highlightCount(md) {
  const { content } = matter(md)
  const h = extractHighlights(content)
  if (!h) return 0
  return highlightBullets(h.body).length
}

function refEntries(md) {
  const { content } = matter(md)
  const refs = extractReferences(content)
  if (!refs) return []
  const out = []
  for (const line of refs.body.split("\n").map((l) => l.trim()).filter(Boolean)) {
    if (/^##\s/.test(line)) continue
    const parsed = parseReferenceLine(line)
    if (parsed?.key) out.push({ ...parsed, line })
  }
  return out
}

function foodTokens(slug) {
  const tokens = new Set([slug.replace(/-/g, " ")])
  for (const fam of FOOD_FAMILIES) {
    if (fam.has(slug)) for (const s of fam) tokens.add(s.replace(/-/g, " "))
  }
  const aliases = {
    "parmesan-cheese": ["cheese", "dairy calcium"],
    "cheddar-cheese": ["cheese"],
    "vinegar-pickles": ["vinegar", "acetic"],
    "extra-virgin-olive-oil": ["olive oil", "olive"],
    "early-harvest-olive-oil": ["olive oil", "olive"],
    "olive-oil": ["olive oil", "olive"],
    "grass-fed-butter": ["butter", "dairy"],
    "algal-oil": ["algal", "dha"],
    "dark-chocolate": ["cocoa", "chocolate", "cacao"],
    "cacao-powder": ["cocoa", "cacao"],
    "cacao-nibs-raw": ["cocoa", "cacao"],
    "egg-yolks": ["egg"],
    "eggs": ["egg"],
  }
  for (const a of aliases[slug] || []) tokens.add(a)
  return [...tokens]
}

function titleMentionsFood(slug, title) {
  const t = String(title || "").toLowerCase()
  return foodTokens(slug).some((tok) => tok.length >= 3 && t.includes(tok))
}

function titleLooksLikeOtherFood(slug, title, foodNames) {
  const t = String(title || "").toLowerCase()
  const self = slug.replace(/-/g, " ")
  for (const { slug: other, name } of foodNames) {
    if (other === slug || sameFamily(slug, other)) continue
    if (name.length < 6) continue
    if (["heart", "kidney", "liver"].includes(other)) continue
    const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
    if (re.test(t) && !t.includes(self)) return other
  }
  return null
}

const foodNames = fs
  .readdirSync(FOODS)
  .filter((f) => f.endsWith(".md") && !["index.md", "shopping-list.md"].includes(f))
  .map((f) => {
    const slug = f.replace(/\.md$/, "")
    const raw = fs.readFileSync(path.join(FOODS, f), "utf8")
    const { data } = matter(raw)
    return { slug, name: String(data.title || slug).toLowerCase() }
  })

const bib = loadBibIndex()
const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
const changed = new Set(
  git(["diff", "--name-only", "--", "docs/foods"])
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean),
)

const safety = {
  generated_at: new Date().toISOString(),
  framing:
    "Mechanical remediation and recurrence prevention completed; scientific evidence validation ongoing.",
  substantive_prose_rewrites: [],
  highlights_emptied_or_shortened: [],
  labelled_or_core_retentions: [],
  evidence_level_moves: [],
  unchanged_but_unverified: [],
  identical_highlight_groups: manifest.identical_highlights || [],
}

const queue = []
const pageStatus = []

for (const page of manifest.pages) {
  const { file, slug, exists } = page
  if (!exists) {
    pageStatus.push({
      file,
      slug,
      status: "renamed-or-removed",
      mechanically_repaired: false,
      scientifically_verified: false,
    })
    continue
  }
  const current = fs.readFileSync(file, "utf8")
  const head = git(["show", `HEAD:${file}`])
  const dirty = changed.has(file)

  const headEd = stripCites(overviewAndContext(head))
  const curEd = stripCites(overviewAndContext(current))
  const proseChanged = dirty && headEd !== curEd && headEd.length > 40

  const headH = highlightCount(head)
  const curH = highlightCount(current)
  const highlightsGone = dirty && headH > 0 && curH === 0
  const highlightsShorter = dirty && curH > 0 && curH < headH && (headH - curH >= 2 || curH / headH <= 0.5)

  if (proseChanged) {
    const headSent = headEd.split(/(?<=[.])\s+/).filter((s) => s.length > 40)
    const removed = headSent.filter((s) => !curEd.includes(s.slice(0, 60))).slice(0, 4)
    safety.substantive_prose_rewrites.push({
      slug,
      file,
      head_highlights: headH,
      current_highlights: curH,
      removed_sentence_starts: removed.map((s) => s.slice(0, 180)),
      current_excerpt: curEd.slice(0, 220),
    })
  }

  if (highlightsGone || highlightsShorter) {
    const { content: headC } = matter(head)
    const { content: curC } = matter(current)
    const hb = extractHighlights(headC)
    const cb = extractHighlights(curC)
    const dropped = highlightBullets(hb?.body || "").filter((b) => {
      const norm = stripCites(b).toLowerCase()
      return !highlightBullets(cb?.body || "").some((x) => stripCites(x).toLowerCase() === norm)
    })
    safety.highlights_emptied_or_shortened.push({
      slug,
      file,
      before: headH,
      after: curH,
      emptied: highlightsGone,
      dropped_were_generator_debris: dropped.length > 0 && dropped.every((b) => /reports on\b|see overview for context/i.test(b)),
      dropped_bullets: dropped,
    })
  }

  const curRefs = refEntries(current)
  const headRefs = refEntries(head)
  const { content: curContent } = matter(current)
  const { content: headContent } = matter(head)
  const body = editorialBody(current)
  const headBody = editorialBody(head)

  for (const ref of curRefs) {
    const meta = bib.get(ref.key)
    const title = meta?.title || ref.titleOverride || ref.key
    const annotation = ref.explanation || ""
    const claims = sentencesCiting(body, ref.n, ref.key)
    const adjacent = claims[0] || (annotation ? `References-only annotation: ${annotation}` : "Listed in References with no adjacent inline claim")
    const bundle = `${adjacent} ${annotation}`
    const route = classifyLabel(bundle)
    const labelledNow = LABEL_RE.test(bundle)
    const labelledBefore = headRefs.some(
      (h) => h.key === ref.key && LABEL_RE.test(`${h.explanation || ""} ${sentencesCiting(headBody, h.n, h.key).join(" ")}`),
    )
    if (labelledNow) {
      safety.labelled_or_core_retentions.push({
        slug,
        key: ref.key,
        n: ref.n,
        title,
        adjacent_claim: adjacent.slice(0, 320),
        annotation: annotation.slice(0, 280),
        evidence_route: route === "unlabelled" ? "labelled-scope-other" : route,
        bibliographic_core_only: !annotation,
      })
      if (!labelledBefore) {
        safety.evidence_level_moves.push({
          slug,
          key: ref.key,
          title,
          from: "presented as adjacent food support (unlabelled)",
          to: route,
          adjacent_claim: adjacent.slice(0, 280),
        })
      }
    } else if (!annotation) {
      safety.labelled_or_core_retentions.push({
        slug,
        key: ref.key,
        n: ref.n,
        title,
        adjacent_claim: adjacent.slice(0, 320),
        annotation: "",
        evidence_route: "bibliographic-core-only",
        bibliographic_core_only: true,
      })
    }

    if (VERIFIED_SLUGS.has(slug)) continue

    const otherFood = titleLooksLikeOtherFood(slug, title, foodNames)
    const subjectHits = foodSubjectConflicts(slug, title)
    const clinical = CLINICAL_RE.test(title) || CLINICAL_RE.test(adjacent)
    const titleHasFood = titleMentionsFood(slug, title)
    const labelledAway = route !== "unlabelled" && route !== "bibliographic-core-only" && route !== "unverified"

    let tier = 3
    let concern = "Citation may be relevant but the adjacent wording may exceed what the paper supports."
    let action = "inspect full text"
    let confidence = "low"

    if (subjectHits.length) {
      tier = 1
      concern = `High-confidence subject mismatch (${subjectHits.join(", ")}).`
      action = "remove"
      confidence = "high"
    } else if (otherFood && !titleHasFood) {
      tier = 1
      concern = `Paper title names another food (${otherFood}) rather than ${slug}.`
      action = "inspect full text"
      confidence = "medium"
    } else if (clinical && !titleHasFood && !labelledAway) {
      tier = 1
      concern = "Clinically meaningful health claim or disease-endpoint paper without a direct food match in the title, and without an evidence-level label."
      action = "inspect full text"
      confidence = "medium"
    } else if (labelledAway || (!titleHasFood && !annotation && !claims.length)) {
      if (labelledAway) {
        tier = 2
        concern = `Food-page claim is currently supported only at ${route.replace(/-/g, " ")} level.`
        action = "relabel"
        confidence = "medium"
      } else {
        tier = 4
        concern = "Bibliographic core in References with no adjacent inline claim."
        action = "inspect full text"
        confidence = "low"
      }
    } else if (!titleHasFood) {
      tier = 2
      concern = "Paper title does not name this food; likely constituent, food-group, pattern, or mechanism evidence."
      action = "relabel"
      confidence = "medium"
    } else {
      tier = 3
      concern = "Title overlaps this food, but the adjacent sentence may still overclaim."
      action = "narrow"
      confidence = "low"
    }

    queue.push({
      tier,
      food_page: file,
      slug,
      claim: adjacent.slice(0, 400),
      citation_key: ref.key,
      paper_title: title,
      evidence_route: route === "unlabelled" && !annotation ? "unverified" : route,
      reason_for_concern: concern,
      recommended_action: action,
      confidence,
    })
  }

  let status
  if (VERIFIED_SLUGS.has(slug)) status = "scientifically-verified"
  else if (!dirty) status = "unchanged-but-unverified"
  else if (curRefs.length === 0 && !proseChanged) status = "mechanically-repaired"
  else status = "requires-editorial-review"

  if (!dirty) {
    safety.unchanged_but_unverified.push({
      slug,
      file,
      commits: page.commits,
      remaining_refs: curRefs.map((r) => r.key),
      note: "In the three-commit union and identical to current HEAD. Claim–source relationships were not checked in this pass.",
    })
  }

  pageStatus.push({
    file,
    slug,
    status,
    mechanically_repaired: dirty,
    scientifically_verified: VERIFIED_SLUGS.has(slug),
    remaining_citation_count: curRefs.length,
    commits: page.commits,
  })
}

queue.sort((a, b) => a.tier - b.tier || a.slug.localeCompare(b.slug) || String(a.citation_key).localeCompare(b.citation_key))

const statusCounts = {}
for (const p of pageStatus) statusCounts[p.status] = (statusCounts[p.status] || 0) + 1
const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0 }
for (const q of queue) tierCounts[q.tier] += 1

for (const p of manifest.pages) {
  const st = pageStatus.find((x) => x.file === p.file)
  if (!st) continue
  p.status = st.status
  p.mechanically_repaired = st.mechanically_repaired
  p.scientifically_verified = st.scientifically_verified
}

manifest.generated_at = new Date().toISOString()
manifest.framing =
  "Mechanical remediation and recurrence prevention completed; scientific evidence validation ongoing."
manifest.status_counts = statusCounts
manifest.failure_counts = statusCounts
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2))

const safetyOut = {
  ...safety,
  status_counts: statusCounts,
  queue_tier_counts: tierCounts,
  queue_items: queue.length,
  substantive_prose_rewrites: safety.substantive_prose_rewrites,
  highlights_emptied_or_shortened: safety.highlights_emptied_or_shortened,
  labelled_or_core_retentions: safety.labelled_or_core_retentions,
  evidence_level_moves: safety.evidence_level_moves,
  unchanged_but_unverified: safety.unchanged_but_unverified,
}
fs.writeFileSync(OUT_SAFETY, JSON.stringify(safetyOut, null, 2))
fs.writeFileSync(
  OUT_QUEUE,
  JSON.stringify(
    {
      generated_at: safety.generated_at,
      framing: safety.framing,
      note: "Heuristic priority only. Recommended actions are not scientific decisions.",
      tier_counts: tierCounts,
      items: queue,
    },
    null,
    2,
  ),
)

console.log("status_counts", statusCounts)
console.log("queue_tiers", tierCounts)
console.log("substantive_prose", safety.substantive_prose_rewrites.length)
console.log("highlights_shortened", safety.highlights_emptied_or_shortened.length)
console.log("labelled_or_core", safety.labelled_or_core_retentions.length)
console.log("evidence_moves", safety.evidence_level_moves.length)
console.log("unchanged", safety.unchanged_but_unverified.length)
console.log("queue", queue.length)
