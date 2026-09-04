/**
 * Public-editorial lint for food pages.
 *
 * Flags composition-administration language in reader-facing sections only.
 * Does not scan front matter, nutrition_source, source_note, bibliography
 * titles, or internal research/audit files.
 *
 * Canonical rule: system/food-page-schema.md
 *   “Public editorial prose versus composition administration”
 */
import matter from "gray-matter"

/** @type {readonly {id: string, re: RegExp}[]} */
export const PUBLIC_PROSE_ADMIN_PATTERNS = [
  { id: "usda", re: /\bUSDA\b/ },
  { id: "fooddata-central", re: /FoodData Central/i },
  { id: "fdc", re: /\bFDC\b/ },
  { id: "sr-legacy", re: /SR Legacy/i },
  { id: "database", re: /\bdatabases?\b/i },
  { id: "database-record", re: /database record/i },
  { id: "source-record", re: /source record/i },
  { id: "panel", re: /\bpanels?\b/i },
  { id: "does-not-quantify", re: /does not quantify/i },
  { id: "not-quantified-by-usda", re: /not quantified by USDA/i },
  { id: "quantity-not-established", re: /quantit(?:y|ies) (?:is|are) not established/i },
  { id: "comparable-quantity", re: /comparable quantity is not established/i },
  { id: "not-reported", re: /not reported/i },
  { id: "unavailable-in-the-record", re: /unavailable in the record/i },
  { id: "absent-from-the-database", re: /absent from the database/i },
  { id: "composition-database-does-not-capture", re: /composition database does not capture/i },
  { id: "retained-qualitatively", re: /retained qualitatively/i },
  { id: "public-row", re: /public row/i },
  { id: "internal-only", re: /internal[- ]only/i },
  { id: "supplementary-row", re: /supplementary row/i },
  { id: "research-queue", re: /research queue/i },
  { id: "ontology-admission", re: /ontology admission/i },
  { id: "reconciliation", re: /\breconciliation\b/i },
  { id: "provenance-limitation", re: /provenance limitation/i },
]

/**
 * Reader-facing editorial body: Overview through Food Context (including
 * Highlights and EAA). Stops before Recipes, Substances, or References so
 * NutritionTable source labels and bibliography titles are not scanned.
 *
 * @param {string} markdown
 * @returns {string}
 */
export function extractPublicEditorialProse(markdown) {
  const { content } = matter(markdown)
  const start = content.search(/^##\s+Overview\s*$/m)
  if (start === -1) return ""
  const fromOverview = content.slice(start)
  const end = fromOverview.search(/^##\s+(Recipes|Substances|References)\s*$/m)
  return (end === -1 ? fromOverview : fromOverview.slice(0, end)).trim()
}

/**
 * @param {string} markdown
 * @returns {{ id: string, match: string }[]}
 */
export function findPublicProseAdminLanguage(markdown) {
  const prose = extractPublicEditorialProse(markdown)
  if (!prose) return []
  /** @type {{ id: string, match: string }[]} */
  const hits = []
  for (const { id, re } of PUBLIC_PROSE_ADMIN_PATTERNS) {
    const flags = re.flags.includes("g") ? re.flags : `${re.flags}g`
    const global = new RegExp(re.source, flags)
    let m
    while ((m = global.exec(prose)) !== null) {
      hits.push({ id, match: m[0] })
    }
  }
  return hits
}
