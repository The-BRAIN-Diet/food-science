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

function readDoc(filePath) {
  const raw = fs.readFileSync(filePath, "utf8")
  const parsed = matter(raw)
  return { raw, data: parsed.data || {}, content: parsed.content || "" }
}

function writeDoc(filePath, data, content) {
  const out = matter.stringify(content, data, { lineWidth: 9999 })
  fs.writeFileSync(filePath, out)
}

function asStringArray(v) {
  if (!v) return []
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  return []
}

function setify(arr) {
  return new Set(arr.map((x) => String(x).trim()).filter(Boolean))
}

function isPlainObject(v) {
  return Boolean(v) && typeof v === "object" && !Array.isArray(v)
}

function buildValidTargetLabels() {
  if (!fs.existsSync(BIO_TARGETS_DIR)) return new Set()
  const CLASSIFICATION_TAGS = new Set(["Biological Target", "Metabolic Response Target"])
  const labels = new Set()
  const files = fs
    .readdirSync(BIO_TARGETS_DIR)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .map((f) => path.join(BIO_TARGETS_DIR, f))
  for (const fp of files) {
    const { data } = readDoc(fp)
    const tags = asStringArray(data.tags)
    const primary = tags.find((t) => !CLASSIFICATION_TAGS.has(t))
    if (primary) labels.add(primary)
  }
  return labels
}

// Map legacy BRS names / common variants -> current target label
const LEGACY_KEY_MAP = new Map([
  ["Oxidative stress", "Oxidative Stress"],
  ["Neurotransmitter Regulation", "Neurochemical Balance"],
  ["Methylation & One-Carbon Metabolism", "Methylation"],
  ["Mitochondrial Function & Bioenergetics", "Mitochondrial Support"],
  ["Mitochondrial Function and Bioenergetics", "Mitochondrial Support"],
  ["Gut–Brain Axis & Enteric Nervous System (ENS)", "Gut Microbiome"],
  ["Gut-Brain Axis & Enteric Nervous System (ENS)", "Gut Microbiome"],
  ["Metabolic & Neuroendocrine Stress (HPA Axis & ANS)", "Stress Response"],
  // Consolidated target used elsewhere; map to the combined BRS label
  ["Inflammation & Oxidative Stress", "Inflammation"],
  ["Inflammation and Oxidative Stress", "Inflammation"],
])

const DEFAULT_MECHANISMS = {
  Inflammation:
    "Evidence varies by model; mechanisms commonly discussed include modulation of inflammatory signalling and resolution pathways.",
  "Oxidative Stress":
    "Evidence varies by model; mechanisms commonly discussed include antioxidant defence support and reductions in oxidative damage markers.",
  "Neurochemical Balance":
    "Evidence varies by model; mechanisms commonly discussed include effects on neurotransmission, membrane signalling, and synaptic function.",
  "Mitochondrial Support":
    "Evidence varies by model; mechanisms commonly discussed include mitochondrial membrane and redox support affecting bioenergetic resilience.",
  "Gut Microbiome":
    "Evidence varies by model; mechanisms commonly discussed include gut-mediated metabolism of the compound and downstream gut–brain signalling.",
  "Stress Response":
    "Evidence varies by model; mechanisms commonly discussed include modulation of HPA/ANS-related stress physiology and resilience markers.",
  "Insulin Response":
    "Evidence varies by model; mechanisms commonly discussed include effects on glycaemic regulation and insulin sensitivity endpoints.",
  "Hormonal Response":
    "Evidence varies by model; mechanisms commonly discussed include endocrine signalling modulation relevant to brain function.",
}

function normalizeMechanisms(mechanisms, validTargetLabels) {
  if (!isPlainObject(mechanisms)) return { mechanisms: mechanisms || null, changed: false }

  const out = {}
  let changed = false

  for (const [rawKey, rawVal] of Object.entries(mechanisms)) {
    const key = String(rawKey || "").trim()
    const val = String(rawVal || "").trim()
    if (!key || !val) continue

    const mapped = LEGACY_KEY_MAP.get(key) || key
    const normalizedKey = validTargetLabels.has(mapped) ? mapped : mapped

    if (normalizedKey !== key) changed = true
    // If collisions happen after normalization, keep the longer entry
    if (!out[normalizedKey] || val.length > String(out[normalizedKey]).length) {
      out[normalizedKey] = val
    }
  }

  return { mechanisms: out, changed }
}

function main() {
  if (!fs.existsSync(SUBSTANCES_DIR)) {
    console.error(`Substances dir not found: ${SUBSTANCES_DIR}`)
    process.exit(2)
  }

  const validTargetLabels = buildValidTargetLabels()
  if (validTargetLabels.size === 0) {
    console.error("No biological target labels found; cannot repair.")
    process.exit(2)
  }

  const files = listMarkdownFilesRecursive(SUBSTANCES_DIR).filter(
    (fp) => path.basename(fp) !== "index.md"
  )

  let updated = 0
  let normalized = 0
  let synced = 0
  let filled = 0

  for (const fp of files) {
    const { data, content } = readDoc(fp)

    const tags = asStringArray(data.tags)
    const tagSet = setify(tags)

    const beforeMechanisms = data.mechanisms
    const { mechanisms: normMechanisms, changed: normChanged } = normalizeMechanisms(
      beforeMechanisms,
      validTargetLabels
    )
    if (normChanged) {
      data.mechanisms = normMechanisms
      normalized++
    } else if (isPlainObject(beforeMechanisms)) {
      data.mechanisms = beforeMechanisms
    }

    const mechObj = isPlainObject(data.mechanisms) ? data.mechanisms : {}
    const mechKeys = new Set(Object.keys(mechObj).map((k) => String(k).trim()).filter(Boolean))

    const brsTags = [...tagSet].filter((t) => validTargetLabels.has(t))
    const brsMechKeys = [...mechKeys].filter((k) => validTargetLabels.has(k))

    let changed = normChanged

    // 1) If a mechanism exists for a valid target, ensure the tag exists
    for (const k of brsMechKeys) {
      if (!tagSet.has(k)) {
        tags.push(k)
        tagSet.add(k)
        changed = true
        synced++
      }
    }

    // 2) If a tag exists for a valid target but mechanism is missing, fill a generic mechanism
    for (const t of brsTags) {
      if (!mechKeys.has(t)) {
        const defaultLine = DEFAULT_MECHANISMS[t]
        if (defaultLine) {
          mechObj[t] = defaultLine
          mechKeys.add(t)
          changed = true
          filled++
        }
      }
    }

    if (changed) {
      // Keep tags stable/deduped and in original-ish order
      data.tags = Array.from(new Set(tags.map((t) => String(t).trim()).filter(Boolean)))
      if (Object.keys(mechObj).length > 0) data.mechanisms = mechObj
      writeDoc(fp, data, content)
      updated++
    }
  }

  console.log(
    `BRS repair complete.\n` +
      `- substance pages scanned: ${files.length}\n` +
      `- files updated: ${updated}\n` +
      `- legacy mechanisms normalized: ${normalized}\n` +
      `- tags synced from mechanisms: ${synced}\n` +
      `- missing mechanisms filled: ${filled}\n`
  )
}

main()

