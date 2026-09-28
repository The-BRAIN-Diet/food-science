import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export const SUBSTANCES_DIR_DEFAULT = "docs/substances"
export const FOODS_DIR_DEFAULT = "docs/foods"

export const CALIBRATION_SUBSTANCE_PATHS = [
  "bioactive-compounds/carotenoids/astaxanthin.md",
  "nutrients/micronutrients/vitamins/vitamin-b12.md",
  "microbial-metabolites/secondary-plant-conversions/urolithin-a.md",
  "microbial-metabolites/scfas/butyrate.md",
]

export const CANONICAL_BRS_HUBS = new Set([
  "Neurotransmitter Regulation",
  "Inflammation & Oxidative Stress",
  "Gut-Brain Axis & Enteric Nervous System",
  "Metabolic & Neuroendocrine Regulation",
  "Methylation & One-Carbon Metabolism",
  "Mitochondrial Function & Bioenergetics",
])

const REQUIRED_HEADINGS = [
  "Overview",
  "Dietary Origin",
  "Recipes",
  "Foods",
  "Biological Regulatory Systems",
  "References",
]

const DOWNSTREAM_FORMATION_SUBSTANCES = new Set(["Urolithin A", "Butyrate"])

const SUBSTANCE_REFERENCE_RE =
  /^\[\d+\]\s+.+\s+\(\d{4}\)\.\s+\[[^\]]+\]\(\/docs\/papers\/BRAIN-Diet-References#[a-z0-9_-]+\)\.\s+.+$/

function headingOffset(body, heading) {
  return body.search(new RegExp(`^## ${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m"))
}

function referenceLines(body) {
  const start = headingOffset(body, "References")
  if (start === -1) return []
  return body
    .slice(start)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\[\d+\]/.test(line))
}

export function validateCanonicalSubstancePage(raw, label = "substance page") {
  const {data, content} = matter(raw)
  const issues = []

  const offsets = REQUIRED_HEADINGS.map((heading) => [heading, headingOffset(content, heading)])
  for (const [heading, offset] of offsets) {
    if (offset === -1) issues.push(`missing required section: ## ${heading}`)
  }
  const presentOffsets = offsets.filter(([, offset]) => offset !== -1)
  for (let i = 1; i < presentOffsets.length; i += 1) {
    if (presentOffsets[i][1] < presentOffsets[i - 1][1]) {
      issues.push(`section order is invalid near ## ${presentOffsets[i][0]}`)
      break
    }
  }

  const spotlight = headingOffset(content, "Research Spotlights & Evidence Checks")
  const recipes = headingOffset(content, "Recipes")
  const dietaryOrigin = headingOffset(content, "Dietary Origin")
  if (spotlight !== -1 && !(spotlight > dietaryOrigin && spotlight < recipes)) {
    issues.push("Research Spotlights & Evidence Checks must sit between Dietary Origin and Recipes")
  }
  if (/^## Key Compound Highlights$/m.test(content)) {
    issues.push("Key Compound Highlights is no longer canonical")
  }
  if (!/<SubstanceRecipes\s+tag=/.test(content)) {
    issues.push("Recipes section must render SubstanceRecipes")
  }
  if (!/<SubstanceFoods\s+tag=/.test(content)) {
    issues.push("Foods section must render SubstanceFoods")
  }
  if (/<SubstanceMatrix\b/.test(content)) {
    issues.push("calibration pages must use evidence-qualified BRS rows, not SubstanceMatrix fallback")
  }

  const presentations = [...content.matchAll(/<EvidencePresentation\b([\s\S]*?)>/g)]
  for (const presentation of presentations) {
    if (!/\bkind="(?:spotlight|check)"/.test(presentation[1])) {
      issues.push("EvidencePresentation must declare kind spotlight or check")
    }
    if (!/\bexposureContext="[^"]+"/.test(presentation[1])) {
      issues.push("EvidencePresentation must retain a non-empty exposureContext")
    }
  }

  const mechanisms =
    data.mechanisms && typeof data.mechanisms === "object" && !Array.isArray(data.mechanisms)
      ? Object.keys(data.mechanisms)
      : []
  for (const key of mechanisms) {
    if (!CANONICAL_BRS_HUBS.has(key)) {
      issues.push(`mechanisms key is not a canonical BRS hub: ${key}`)
    }
  }

  const refs = referenceLines(content)
  if (!refs.length) issues.push("References must contain numbered canonical entries")
  for (const line of refs) {
    if (!SUBSTANCE_REFERENCE_RE.test(line)) {
      issues.push(`invalid Substance reference format: ${line}`)
    }
  }

  return {label, issues}
}

function listFoodFiles(foodsDir) {
  return fs
    .readdirSync(foodsDir)
    .filter((name) => name.endsWith(".md") && name !== "index.md")
    .map((name) => path.join(foodsDir, name))
}

export function validateFoodSubstanceRelationships(foodsDir = FOODS_DIR_DEFAULT) {
  const issues = []
  for (const file of listFoodFiles(foodsDir)) {
    const {data} = matter(fs.readFileSync(file, "utf8"))
    const label = path.basename(file)
    const tags = Array.isArray(data.tags) ? data.tags.map(String) : []
    for (const downstream of DOWNSTREAM_FORMATION_SUBSTANCES) {
      if (tags.includes(downstream)) {
        issues.push(`${label}: ${downstream} must not be represented as a contains tag`)
      }
    }

    const relationships = data.substance_relationships
    if (relationships === undefined) continue
    if (!Array.isArray(relationships)) {
      issues.push(`${label}: substance_relationships must be an array`)
      continue
    }
    for (const [index, relationship] of relationships.entries()) {
      if (!relationship || typeof relationship !== "object") {
        issues.push(`${label}: substance_relationships[${index}] must be an object`)
        continue
      }
      if (typeof relationship.substance !== "string" || !relationship.substance.trim()) {
        issues.push(`${label}: substance_relationships[${index}] needs substance`)
      }
      if (typeof relationship.relationship !== "string" || !relationship.relationship.trim()) {
        issues.push(`${label}: substance_relationships[${index}] needs relationship`)
      }
      if (
        DOWNSTREAM_FORMATION_SUBSTANCES.has(relationship.substance) &&
        ["contains", "direct-food-occurrence"].includes(relationship.relationship) &&
        (!Array.isArray(relationship.citation_keys) || relationship.citation_keys.length === 0)
      ) {
        issues.push(
          `${label}: direct occurrence of ${relationship.substance} requires explicit citation_keys`,
        )
      }
    }
  }

  const pomegranatePath = path.join(foodsDir, "pomegranates.md")
  const pomegranate = matter(fs.readFileSync(pomegranatePath, "utf8")).data
  const pomegranateTags = Array.isArray(pomegranate.tags) ? pomegranate.tags.map(String) : []
  if (pomegranateTags.includes("Urolithin A")) {
    issues.push("pomegranates.md: must not tag Urolithin A as direct food content")
  }
  const urolithinEdges = (pomegranate.substance_relationships || []).filter(
    (edge) => edge?.substance === "Urolithin A",
  )
  if (
    urolithinEdges.length !== 1 ||
    urolithinEdges[0].relationship !== "dietary-precursor" ||
    !/microbial/i.test(String(urolithinEdges[0].process || ""))
  ) {
    issues.push(
      "pomegranates.md: Urolithin A must be one dietary-precursor edge with microbial conversion",
    )
  }

  return issues
}

export function runSubstanceValidation({
  substancesDir = SUBSTANCES_DIR_DEFAULT,
  foodsDir = FOODS_DIR_DEFAULT,
} = {}) {
  const pages = CALIBRATION_SUBSTANCE_PATHS.map((relativePath) => {
    const file = path.join(substancesDir, relativePath)
    return validateCanonicalSubstancePage(fs.readFileSync(file, "utf8"), relativePath)
  })
  return {
    pages,
    foodRelationships: validateFoodSubstanceRelationships(foodsDir),
  }
}

export function substanceValidationHasFailures(result) {
  return result.pages.some((page) => page.issues.length > 0) || result.foodRelationships.length > 0
}
