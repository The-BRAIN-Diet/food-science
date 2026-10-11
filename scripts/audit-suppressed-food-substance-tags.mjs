/**
 * Audit of the SubstanceFoods tag fallback removal.
 * Replays the previous matcher: a food tag is shown only when the food has
 * no explicit substance_relationships record for that substance name.
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const root = path.resolve(import.meta.dirname, "..")
const foodsDir = path.join(root, "docs/foods")
const substancesDir = path.join(root, "docs/substances")

function substanceName(title) {
  return String(title).split("(")[0].trim()
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) acc.push(full)
  }
  return acc
}

const substanceTags = []
for (const file of walk(substancesDir)) {
  const text = fs.readFileSync(file, "utf8")
  const match = text.match(/<SubstanceFoods tag="([^"]+)"/)
  if (!match) continue
  substanceTags.push({
    tag: match[1],
    name: substanceName(match[1]),
    page: path.relative(root, file),
  })
}

const foods = []
for (const file of walk(foodsDir)) {
  const parsed = matter(fs.readFileSync(file, "utf8"))
  const tags = Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : []
  const relationships = Array.isArray(parsed.data.substance_relationships)
    ? parsed.data.substance_relationships
    : []
  foods.push({
    slug: path.basename(file).replace(/\.mdx?$/, ""),
    title: parsed.data.title || path.basename(file),
    file: path.relative(root, file),
    tags,
    relationships,
    nutrition: parsed.data.nutrition_per_100g || {},
    nutritionSource: parsed.data.nutrition_source || null,
  })
}

const byName = new Map()
for (const substance of substanceTags) {
  if (!byName.has(substance.name)) byName.set(substance.name, [])
  byName.get(substance.name).push(substance)
}

const suppressed = []
const explicit = []
for (const substance of substanceTags) {
  for (const food of foods) {
    const matching = food.relationships.filter(
      (edge) => edge && typeof edge.substance === "string" && substanceName(edge.substance) === substance.name,
    )
    if (matching.length) {
      for (const edge of matching) {
        explicit.push({
          food: food.slug,
          substance: substance.name,
          relationship: edge.relationship,
          page: substance.page,
        })
      }
      continue
    }
    const tagMatch = food.tags.some((foodTag) => {
      const normalized = substanceName(foodTag)
      return foodTag === substance.tag || foodTag === substance.name || normalized === substance.name
    })
    if (tagMatch) {
      suppressed.push({
        food: food.slug,
        title: food.title,
        substance: substance.name,
        tag: substance.tag,
        page: substance.page,
        matchedTags: food.tags.filter((foodTag) => {
          const normalized = substanceName(foodTag)
          return foodTag === substance.tag || foodTag === substance.name || normalized === substance.name
        }),
      })
    }
  }
}

const summary = {}
for (const row of suppressed) {
  summary[row.substance] = (summary[row.substance] || 0) + 1
}

const out = {
  substancePagesWithFoodsBlock: substanceTags.length,
  foodsScanned: foods.length,
  explicitRecordsPreserved: explicit.length,
  suppressedTagAssociations: suppressed.length,
  suppressedBySubstance: summary,
  suppressed,
  explicit,
}
const dest = path.join(root, "scripts/out/suppressed-food-substance-tags.current.json")
fs.mkdirSync(path.dirname(dest), {recursive: true})
fs.writeFileSync(dest, JSON.stringify(out, null, 2))
console.log(JSON.stringify({
  substancePagesWithFoodsBlock: out.substancePagesWithFoodsBlock,
  foodsScanned: out.foodsScanned,
  explicitRecordsPreserved: out.explicitRecordsPreserved,
  suppressedTagAssociations: out.suppressedTagAssociations,
  substances: Object.keys(summary).length,
  suppressedBySubstance: summary,
}, null, 2))
