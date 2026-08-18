/**
 * Read-only food-citation relevance queue for the letter-by-letter editorial audit.
 * Citation-key correctness is separate: these keys already resolve to their own
 * BibTeX entries. Do not replace citations from this queue in a mechanical pass.
 */
import fs from "node:fs"
import path from "node:path"

export const FOOD_CITATION_RELEVANCE_QUEUE_REL =
  "scripts/data/food-citation-relevance-queue.json"

export function loadFoodCitationRelevanceQueue(root = process.cwd()) {
  const abs = path.join(root, FOOD_CITATION_RELEVANCE_QUEUE_REL)
  if (!fs.existsSync(abs)) {
    return { items: [], missing: true, path: abs }
  }
  const data = JSON.parse(fs.readFileSync(abs, "utf8"))
  return { ...data, items: Array.isArray(data.items) ? data.items : [], missing: false, path: abs }
}

export function relevanceQueueForSlugs(slugs, queue) {
  const set = new Set(slugs)
  return (queue.items || []).filter((item) => set.has(item.slug))
}

export function formatRelevanceQueueForAudit(items) {
  if (!items.length) return ""
  const lines = [
    "Citation relevance queue (read-only; do not replace in this pass):",
    "Classes: 1 direct-food; 2 characteristic-substance; 3 preparation; 4 generic-context; 5 recipe-context; 6 mismatched.",
    "These are relevance labels for correctly joined keys. They are not bibliography-join errors.",
    "",
  ]
  for (const item of items) {
    lines.push(
      `  ${item.slug}.md [${item.n}] ${item.key} — class ${item.class} (${item.class_label})`,
    )
    if (item.flag) lines.push(`    flag: ${item.flag}`)
    if (item.rationale) lines.push(`    ${item.rationale}`)
  }
  lines.push("")
  return lines.join("\n")
}
