import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import Link from "@docusaurus/Link"
import styles from "../TagList/styles.module.css"
import InChIImage from "../InChIImage"

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

/**
 * Tag to document mapping from category-listing plugin
 */
type TagToDocMap = Record<string, Document[]>

/**
 * Props for FoodSubstances component
 */
interface FoodSubstancesProps {
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

/**
 * FoodSubstances component
 *
 * Displays a list of substances that are tagged in the current food's frontMatter.
 * Uses the same display format as TagList.
 */
export default function FoodSubstances({details}: FoodSubstancesProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!details) {
    return <div>Error: Food details (frontMatter) is required</div>
  }

  // Extract tags from frontMatter
  const foodTags = details.tags
  if (!Array.isArray(foodTags)) {
    return <div>Error: Food tags not found in frontMatter</div>
  }

  // Convert tags to string array (tags can be strings or objects with label property)
  const foodTagLabels = foodTags.map((tag: unknown) => {
    if (typeof tag === "string") {
      return tag
    }
    if (typeof tag === "object" && tag !== null && "label" in tag) {
      return (tag as {label: string}).label
    }
    return String(tag)
  })

  // Category tags and other non-substance tags that should be excluded when matching
  const categoryTags = [
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
  ]

  // Get all substance documents
  const allDocs = Object.values(allTags).flat()
  const allSubstances = allDocs.filter((doc: Document) => doc.permalink.includes("/substances/"))

  // Remove duplicates
  const uniqueSubstances = Array.from(new Map(allSubstances.map((doc: Document) => [doc.permalink, doc])).values())

  // Extract substance names from their titles (normalize by removing parenthetical info)
  const getSubstanceName = (title: string): string => {
    // Remove parenthetical info like "(Turmeric)" from "Curcumin (Turmeric)"
    return title.split("(")[0].trim()
  }

  // Create a map of substance names/aliases to substance documents
  // Map by normalized title, sidebar_label, and substance tag labels
  const substanceNameMap = new Map<string, Document>()
  uniqueSubstances.forEach((substance: Document) => {
    // Map by normalized title
    const substanceName = getSubstanceName(substance.title)
    substanceNameMap.set(substanceName, substance)
    
    // Also map by sidebar_label if it exists and is different
    const sidebarLabel = substance.frontMatter.sidebar_label as string | undefined
    if (sidebarLabel) {
      const sidebarName = getSubstanceName(sidebarLabel)
      if (sidebarName !== substanceName) {
        substanceNameMap.set(sidebarName, substance)
      }
      // Also add the full sidebar_label as a key
      substanceNameMap.set(sidebarLabel, substance)
    }
    
    // Map by all substance tag labels (e.g., "CoQ10" tag matches "Coenzyme Q10 (CoQ10)")
    substance.tags.forEach((tag: Tag) => {
      const tagLabel = tag.label
      // Only map substance-related tags, skip category tags like "Substance", "Nutrient", etc.
      // Category tags are broad classifications that multiple substances can share, so they shouldn't be used as keys
      if (!categoryTags.includes(tagLabel)) {
        substanceNameMap.set(tagLabel, substance)
      }
    })
  })

  // Filter out category tags and other non-substance tags from food tags before matching
  const substanceTagsToCheck = foodTagLabels.filter((tag: string) => !categoryTags.includes(tag))

  // Find substances where the food has a tag that exactly matches a substance name
  // Only match on exact substance names, not category tags like "Polyphenol"
  const relatedSubstances = substanceTagsToCheck
    .map((foodTag: string) => substanceNameMap.get(foodTag))
    .filter((substance: Document | undefined): substance is Document => substance !== undefined)

  // Sort by order, then by title
  relatedSubstances.sort((a: Document, b: Document) => {
    const orderCompare = (a.order || 0) - (b.order || 0)
    if (orderCompare !== 0) return orderCompare
    return a.title.localeCompare(b.title)
  })

  if (relatedSubstances.length === 0) {
    return (
      <div className="bok-tag-list">
        <em>no substances found</em>
      </div>
    )
  }

  return (
    <div className="bok-tag-list">
      <details>
        <summary
          style={{
            cursor: "pointer",
            fontWeight: "normal",
            padding: "0.5rem 0",
            userSelect: "none",
            listStyle: "none",
            color: "var(--ifm-color-primary)",
            transition: "color 0.2s, text-decoration 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--ifm-color-primary-dark)"
            e.currentTarget.style.textDecoration = "underline"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--ifm-color-primary)"
            e.currentTarget.style.textDecoration = "none"
          }}
        >
          {relatedSubstances.length} substance{relatedSubstances.length !== 1 ? "s" : ""} in this
          food
        </summary>
        <div style={{ marginTop: "1rem" }}>
          {relatedSubstances.map((substance: Document) => (
            <DocItemImage key={substance.permalink} doc={substance} />
          ))}
        </div>
      </details>
    </div>
  )
}
