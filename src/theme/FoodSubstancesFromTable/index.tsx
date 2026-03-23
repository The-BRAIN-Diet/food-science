import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import Link from "@docusaurus/Link"
import styles from "../TagList/styles.module.css"
import InChIImage from "../InChIImage"
import {
  NUTRIENT_ORDER,
  NUTRIENT_LABELS,
} from "@site/src/data/nutritionTableMapping"

/**
 * Tag structure from Docusaurus
 */
interface Tag {
  label: string
  permalink?: string
}

/**
 * Document structure from category-listing plugin
 */
interface Document {
  title: string
  permalink: string
  description?: string
  order: number
  tags: Tag[]
  frontMatter: Record<string, unknown>
}

type TagToDocMap = Record<string, Document[]>

interface SupplementarySource {
  key: string
  label: string
  value?: number
  unit?: string
  amount_display?: string
  source_note: string
}

interface FoodSubstancesFromTableProps {
  details: Record<string, unknown>
}

function DocItemImage({doc}: {doc: Document}) {
  const isSubstance = doc.permalink.includes("/substances/")
  const inchikey = doc.frontMatter.inchikey as string | undefined
  const inchiImage = doc.frontMatter.inchi_image as string | undefined
  const listImage = doc.frontMatter.list_image as string | undefined

  return (
    <article key={doc.title} className="margin-vert--lg">
      <div className={styles.columns}>
        <div className={styles.left}>
          {isSubstance && inchiImage ? (
            <img src={inchiImage} alt="Chemical structure" className={styles.articleImage} />
          ) : isSubstance && inchikey ? (
            <InChIImage inchikey={inchikey} fallback={listImage} className={styles.articleImage} />
          ) : (
            <img src={listImage || "/img/icons/ingredients.svg"} className={styles.articleImage} />
          )}
        </div>
        <div className={styles.right}>
          <Link to={doc.permalink}>
            <h3>{doc.title}</h3>
          </Link>
          {doc.description && <p>{doc.description}</p>}
        </div>
      </div>
    </article>
  )
}

const CATEGORY_TAGS = new Set([
  "Substance",
  "Nutrient",
  "Bioactive",
  "Metabolite",
  "Vitamin",
  "Mineral",
  "Fatty Acid",
  "Amino Acid",
  "Polyphenol",
  "Carotenoid",
  "Flavonoid",
  "Terpene",
  "Omega-3 Fatty Acids",
  "Omega-6 Fatty Acids",
  "SCFAs",
  "Antioxidant",
  "Lipid",
  "Food",
  "Vegan",
  "Vegetarian",
  "Recipe",
  "Area",
])

// Conceptual "category" substance docs that should not appear as
// individual entries on food pages (we only want concrete molecules
// like DHA, EPA, etc., not the umbrella category).
const EXCLUDED_SUBSTANCE_TITLES = new Set([
  "Omega-3 Fatty Acids",
  "Omega-3 Fatty Acids (EPA, DHA)",
  "Omega-6 Fatty Acids",
])

// Keys that should NOT appear as individual substances in the list
// (energy and macronutrient rows that are structural rather than
// distinct micronutrients or bioactives).
const EXCLUDED_SUBSTANCE_KEYS = new Set([
  "kcal",
  "protein_g",
  "fat_g",
  "sat_fat_g",
  "carbs_g",
  "sugar_g",
  "fibre_g",
  "omega3_mg", // aggregate; only show component rows (EPA, DHA, etc.) as substances
])

/**
 * FoodSubstancesFromTable
 *
 * Displays the union of two substance sources:
 * 1. Editorial: substances identified in the Overview (frontMatter tags), from
 *    established scientific literature about the food.
 * 2. Analytical: substances derived from the nutrition table (USDA or equivalent).
 *
 * Neither source alone is sufficient. Editorial ensures biologically defining
 * compounds are present; analytical ensures accurate compositional coverage.
 */
export default function FoodSubstancesFromTable({
  details,
}: FoodSubstancesFromTableProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!details) {
    return <div>Error: Food details (frontMatter) is required</div>
  }

  const nutrition = (details.nutrition_per_100g || {}) as Record<string, number | null | undefined>
  const rawSupplementary = (details.nutrition_supplementary_sources ||
    []) as SupplementarySource[]
  const supplementary = Array.isArray(rawSupplementary)
    ? rawSupplementary.filter((s) => {
        if (
          !s ||
          typeof s.key !== "string" ||
          typeof s.label !== "string" ||
          typeof s.source_note !== "string"
        ) {
          return false
        }
        const hasNumeric =
          typeof s.value === "number" && typeof s.unit === "string" && !Number.isNaN(s.value)
        const hasDisplay =
          typeof s.amount_display === "string" && s.amount_display.trim().length > 0
        return hasNumeric || hasDisplay
      })
    : []

  // Build substance name → document map (shared by editorial and analytical)
  const allDocs = Object.values(allTags).flat()
  const allSubstances = allDocs.filter((doc: Document) =>
    doc.permalink.includes("/substances/")
  )
  const uniqueSubstances = Array.from(
    new Map(allSubstances.map((doc: Document) => [doc.permalink, doc])).values()
  )

  const getSubstanceName = (title: string) => title.split("(")[0].trim()
  const substanceNameMap = new Map<string, Document>()

  uniqueSubstances.forEach((substance: Document) => {
    const substanceName = getSubstanceName(substance.title)
    if (EXCLUDED_SUBSTANCE_TITLES.has(substanceName)) {
      return
    }
    substanceNameMap.set(substanceName, substance)
    const sidebarLabel = substance.frontMatter.sidebar_label as string | undefined
    if (sidebarLabel) {
      const sidebarName = getSubstanceName(sidebarLabel)
      if (sidebarName !== substanceName) substanceNameMap.set(sidebarName, substance)
      substanceNameMap.set(sidebarLabel, substance)
    }
    substance.tags.forEach((tag: Tag) => {
      if (!CATEGORY_TAGS.has(tag.label)) {
        substanceNameMap.set(tag.label, substance)
      }
    })
  })

  const contributionLevels = (details.contribution_levels as Record<string, string> | undefined) || {}

  // 1) Editorial: substances from frontMatter tags (Overview / literature)
  const foodTags = details.tags
  const foodTagLabels = Array.isArray(foodTags)
    ? (foodTags as unknown[]).map((tag: unknown) => {
        if (typeof tag === "string") return tag
        if (typeof tag === "object" && tag !== null && "label" in tag) {
          return (tag as {label: string}).label
        }
        return String(tag)
      })
    : []
  const editorialTagLabels = foodTagLabels.filter((tag: string) => !CATEGORY_TAGS.has(tag))
  const editorialDocs = Array.from(
    new Map(
      editorialTagLabels
        .map((tag: string) => substanceNameMap.get(tag))
        .filter((doc: Document | undefined): doc is Document => doc !== undefined)
        .map((doc: Document) => [doc.permalink, doc] as [string, Document])
    ).values()
  ).filter((doc: Document) => {
    const substanceName = getSubstanceName(doc.title)
    const level =
      contributionLevels[substanceName] ?? contributionLevels[doc.title] ?? "Contextual / minor contributor"
    return level !== "Presence only (trace)"
  })
  editorialDocs.sort((a: Document, b: Document) => {
    const orderCompare = (a.order ?? 0) - (b.order ?? 0)
    if (orderCompare !== 0) return orderCompare
    return a.title.localeCompare(b.title)
  })

  // 2) Analytical: compounds from nutrition table (USDA / compositional data)
  const labelsInOrder: string[] = []
  for (const key of NUTRIENT_ORDER) {
    if (EXCLUDED_SUBSTANCE_KEYS.has(key)) continue
    const value = nutrition[key]
    if (value != null && typeof value === "number" && value > 0) {
      const label = NUTRIENT_LABELS[key]?.label ?? key
      labelsInOrder.push(label)
    }
  }
  for (const sup of supplementary) {
    labelsInOrder.push(sup.label)
  }
  const analyticalResolved = labelsInOrder.map((label) => ({
    label,
    doc: substanceNameMap.get(label) ?? null,
  }))

  // 3) Union: editorial first, then analytical (skip if already present by doc or label)
  const seenPermalinks = new Set<string>()
  const seenLabels = new Set<string>()
  type Entry = { label: string; doc: Document | null }
  const merged: Entry[] = []
  for (const doc of editorialDocs) {
    const baseTitle = getSubstanceName(doc.title)
    if (EXCLUDED_SUBSTANCE_TITLES.has(baseTitle)) continue
    seenPermalinks.add(doc.permalink)
    seenLabels.add(baseTitle)
    merged.push({ label: baseTitle || doc.title, doc })
  }
  for (const { label, doc } of analyticalResolved) {
    if (doc) {
      const baseTitle = getSubstanceName(doc.title)
      if (EXCLUDED_SUBSTANCE_TITLES.has(baseTitle)) continue
      if (seenPermalinks.has(doc.permalink)) continue
      seenPermalinks.add(doc.permalink)
    } else {
      if (seenLabels.has(label)) continue
      seenLabels.add(label)
    }
    merged.push({ label, doc })
  }

  if (merged.length === 0) {
    return (
      <div className="bok-tag-list">
        <p style={{fontStyle: "italic"}}>
          No nutrition data yet and no editorial substances. Add tags (from the Overview) and/or
          populate the nutrition table so substances appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="bok-tag-list">
      <p style={{fontSize: "0.9em", color: "var(--ifm-color-content-secondary)"}}>
        Substances in this food: editorial (Overview / literature) plus analytical (nutrition table).
      </p>
      <details open>
        <summary
          style={{
            cursor: "pointer",
            fontWeight: "normal",
            padding: "0.5rem 0",
            userSelect: "none",
            listStyle: "none",
            color: "var(--ifm-color-primary)",
          }}
        >
          {merged.length} substance{merged.length !== 1 ? "s" : ""} in this food
        </summary>
        <div style={{marginTop: "1rem"}}>
          {merged.map(({label, doc}) =>
            doc ? (
              <DocItemImage key={doc.permalink} doc={doc} />
            ) : (
              <div key={label} style={{marginBottom: "0.75rem"}}>
                <strong>{label}</strong>
              </div>
            )
          )}
        </div>
      </details>
    </div>
  )
}
