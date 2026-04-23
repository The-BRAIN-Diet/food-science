import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const ROOT = process.cwd()
const DOCS_DIR = path.join(ROOT, "docs")
const SUBSTANCES_DIR = path.join(DOCS_DIR, "substances")
const BIO_TARGETS_DIR = path.join(DOCS_DIR, "biological-targets")

function listMarkdownFilesRecursive(dir) {
  const out = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === ".cursor") continue
      out.push(...listMarkdownFilesRecursive(full))
    } else if (e.isFile() && e.name.endsWith(".md")) {
      out.push(full)
    }
  }
  return out
}

function readFrontMatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8")
  const parsed = matter(raw)
  return parsed.data || {}
}

function asStringArray(v) {
  if (!v) return []
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  return []
}

function asMechanismKeys(v) {
  if (!v || typeof v !== "object" || Array.isArray(v)) return []
  return Object.keys(v).map((k) => String(k).trim()).filter(Boolean)
}

function buildValidBrsTargets() {
  const files = fs
    .readdirSync(BIO_TARGETS_DIR)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .map((f) => path.join(BIO_TARGETS_DIR, f))

  const CLASSIFICATION_TAGS = new Set(["Biological Target", "Metabolic Response Target"])

  const targets = []

  for (const fp of files) {
    const fm = readFrontMatter(fp)
    const tags = asStringArray(fm.tags)
    // Convention in this repo: first non-classification tag is the target label.
    // Some historical target pages may miss "Biological Target" but still act as targets,
    // so we treat every doc under docs/biological-targets (except index.md) as a target page.
    const primary = tags.find((t) => !CLASSIFICATION_TAGS.has(t))
    if (!primary) continue

    targets.push({
      file: fp,
      label: primary,
    })
  }

  const byLabel = new Map()
  for (const t of targets) {
    // First wins; keep deterministic behavior
    if (!byLabel.has(t.label)) byLabel.set(t.label, t)
  }

  return {
    labels: new Set([...byLabel.keys()]),
    byLabel,
  }
}

function main() {
  if (!fs.existsSync(SUBSTANCES_DIR)) {
    console.error(`Substances dir not found: ${SUBSTANCES_DIR}`)
    process.exit(2)
  }
  if (!fs.existsSync(BIO_TARGETS_DIR)) {
    console.error(`Biological targets dir not found: ${BIO_TARGETS_DIR}`)
    process.exit(2)
  }

  const { labels: validTargetLabels, byLabel } = buildValidBrsTargets()

  const substanceFiles = listMarkdownFilesRecursive(SUBSTANCES_DIR).filter(
    (fp) => path.basename(fp) !== "index.md"
  )

  const issues = []

  for (const fp of substanceFiles) {
    const fm = readFrontMatter(fp)
    const tags = new Set(asStringArray(fm.tags))
    const mechanismKeys = new Set(asMechanismKeys(fm.mechanisms))

    const brsTags = [...tags].filter((t) => validTargetLabels.has(t))
    const brsMechanisms = [...mechanismKeys].filter((k) =>
      validTargetLabels.has(k)
    )

    const missingMechanisms = brsTags.filter((t) => !mechanismKeys.has(t))
    const missingTags = brsMechanisms.filter((k) => !tags.has(k))
    const extraMechanisms = brsMechanisms.filter((k) => !brsTags.includes(k))

    // Also catch legacy/incorrect mechanism keys that look like BRS labels
    const legacyMechanismKeys = [...mechanismKeys].filter((k) =>
      /&/.test(k) || /oxidative stress/i.test(k) && k !== "Oxidative Stress"
    )

    const any = []
    if (missingMechanisms.length) {
      any.push({
        kind: "missing_mechanisms",
        detail: missingMechanisms,
      })
    }
    if (missingTags.length) {
      any.push({
        kind: "missing_tags",
        detail: missingTags,
      })
    }
    if (extraMechanisms.length) {
      any.push({
        kind: "mechanisms_without_tags",
        detail: extraMechanisms,
      })
    }
    if (legacyMechanismKeys.length) {
      any.push({
        kind: "legacy_mechanism_keys",
        detail: legacyMechanismKeys,
      })
    }

    // If substance uses a target label that doesn't resolve to a Biological Target doc
    // (e.g. tagging "Oxidative Stress" while that page is not tagged as Biological Target)
    const targetLikeTags = [...tags].filter((t) =>
      /stress|inflammation|methylation|microbiome|mitochond|insulin|neurochemical/i.test(
        t
      )
    )
    const unresolvedTargetLike = targetLikeTags.filter(
      (t) => !validTargetLabels.has(t)
    )
    if (unresolvedTargetLike.length) {
      any.push({
        kind: "unresolved_target_like_tags",
        detail: unresolvedTargetLike,
      })
    }

    if (any.length) {
      issues.push({ file: fp, any })
    }
  }

  if (issues.length === 0) {
    console.log(
      `BRS audit OK: ${substanceFiles.length} substance pages checked; ${validTargetLabels.size} valid target labels.`
    )
    process.exit(0)
  }

  console.log(
    `BRS audit found issues in ${issues.length} substance page(s).\n`
  )

  for (const item of issues) {
    const rel = path.relative(ROOT, item.file)
    console.log(`- ${rel}`)
    for (const issue of item.any) {
      if (issue.kind === "unresolved_target_like_tags") {
        console.log(`  - unresolved target-like tags: ${issue.detail.join(", ")}`)
        continue
      }
      if (issue.kind === "legacy_mechanism_keys") {
        console.log(`  - legacy mechanism keys: ${issue.detail.join(", ")}`)
        continue
      }
      if (issue.kind === "missing_mechanisms") {
        console.log(`  - missing mechanisms for tags: ${issue.detail.join(", ")}`)
        continue
      }
      if (issue.kind === "missing_tags") {
        console.log(`  - missing tags for mechanisms: ${issue.detail.join(", ")}`)
        continue
      }
      if (issue.kind === "mechanisms_without_tags") {
        console.log(`  - mechanisms without tags: ${issue.detail.join(", ")}`)
        continue
      }
      console.log(`  - ${issue.kind}: ${issue.detail.join(", ")}`)
    }
  }

  console.log("\nValid BRS target labels (from biological-targets docs tagged 'Biological Target'):")
  console.log(
    [...validTargetLabels]
      .sort((a, b) => a.localeCompare(b))
      .map((l) => {
        const t = byLabel.get(l)
        const rel = t ? path.relative(ROOT, t.file) : ""
        return `- ${l} (${rel})`
      })
      .join("\n")
  )

  process.exit(1)
}

main()

