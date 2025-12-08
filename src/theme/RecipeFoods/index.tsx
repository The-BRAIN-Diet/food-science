import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import Link from "@docusaurus/Link"
import styles from "../TagList/styles.module.css"

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
 * Props for RecipeFoods component
 */
interface RecipeFoodsProps {
  details: Record<string, unknown>
}

function DocItemImage({
  doc,
  substanceNameMap,
}: {
  doc: Document
  substanceNameMap: Map<string, Document>
}) {
  // Extract substance tags from the food document
  // Ensure tags exist and are in the correct format
  if (!doc.tags || !Array.isArray(doc.tags)) {
    return (
      <article key={doc.title} className="margin-vert--lg">
        <div className={styles.columns}>
          <div className={styles.left}>
            <img src={doc.frontMatter.list_image as string} className={styles.articleImage} />
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

  const foodTagLabels = doc.tags
    .map((tag: Tag) => tag.label)
    .filter((label: string) => substanceNameMap.has(label))

  // Get substance documents for this food (deduplicate by permalink)
  const substanceMap = new Map<string, Document>()
  foodTagLabels.forEach((label: string) => {
    const substance = substanceNameMap.get(label)
    if (substance) {
      substanceMap.set(substance.permalink, substance)
    }
  })

  const foodSubstances = Array.from(substanceMap.values())

  // Sort substances by title
  foodSubstances.sort((a: Document, b: Document) => a.title.localeCompare(b.title))

  return (
    <article key={doc.title} className="margin-vert--lg">
      <div className={styles.columns}>
        <div className={styles.left}>
          <img src={doc.frontMatter.list_image as string} className={styles.articleImage} />
        </div>
        <div className={styles.right}>
          <Link to={doc.permalink}>
            <h3>{doc.title}</h3>
          </Link>
          {doc.description && <p>{doc.description}</p>}
          {foodSubstances.length > 0 && (
            <p style={{marginTop: "0.5rem", fontSize: "0.9em", color: "var(--ifm-color-content-secondary)"}}>
              <strong>Substances:</strong>{" "}
              {foodSubstances.map((substance: Document, index: number) => (
                <span key={substance.permalink}>
                  <Link to={substance.permalink}>{substance.title}</Link>
                  {index < foodSubstances.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

/**
 * RecipeFoods component
 *
 * Displays a list of foods that are tagged in the current recipe's frontMatter.
 * Uses the same display format as TagList.
 */
export default function RecipeFoods({details}: RecipeFoodsProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!details) {
    return <div>Error: Recipe details (frontMatter) is required</div>
  }

  // Extract tags from frontMatter
  const recipeTags = details.tags
  if (!Array.isArray(recipeTags)) {
    return <div>Error: Recipe tags not found in frontMatter</div>
  }

  // Convert tags to string array (tags can be strings or objects with label property)
  const recipeTagLabels = recipeTags.map((tag: unknown) => {
    if (typeof tag === "string") {
      return tag
    }
    if (typeof tag === "object" && tag !== null && "label" in tag) {
      return (tag as {label: string}).label
    }
    return String(tag)
  })

  // Get all food and substance documents
  const allDocs = Object.values(allTags).flat()
  const allFoods = allDocs.filter((doc: Document) => doc.permalink.includes("/foods/"))
  const allSubstances = allDocs.filter((doc: Document) => doc.permalink.includes("/substances/"))

  // Remove duplicates
  const uniqueFoods = Array.from(new Map(allFoods.map((doc: Document) => [doc.permalink, doc])).values())
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
    
    // Map by all substance tag labels (e.g., "Vitamin C" tag matches "Vitamin C (Ascorbate)")
    substance.tags.forEach((tag: Tag) => {
      const tagLabel = tag.label
      // Only map substance-related tags, skip category tags like "Substance", "Nutrient", etc.
      // Category tags are broad classifications that multiple substances can share, so they shouldn't be used as keys
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
      ]
      if (!categoryTags.includes(tagLabel)) {
        substanceNameMap.set(tagLabel, substance)
      }
    })
  })

  // Extract food names from their titles (normalize by removing parenthetical info)
  const getFoodName = (title: string): string => {
    // Remove parenthetical info like "(Wolffia globosa)" from "Duckweed (Wolffia globosa)"
    return title.split("(")[0].trim()
  }

  // Create a map of food names to food documents
  // Map both normalized names (without parentheses) and full names (with parentheses)
  // This handles cases like "Olive Oil (Early Harvest)" where recipes are tagged with the full name
  const foodNameMap = new Map<string, Document>()
  uniqueFoods.forEach((food: Document) => {
    const normalizedName = getFoodName(food.title)
    const fullName = food.title
    
    // Map by normalized name (e.g., "Olive Oil")
    foodNameMap.set(normalizedName, food)
    
    // Also map by full name if it contains parentheses (e.g., "Olive Oil (Early Harvest)")
    if (fullName !== normalizedName) {
      foodNameMap.set(fullName, food)
    }
  })

  // Find foods where the recipe has a tag that exactly matches a food name
  // Only match on exact food names, not category tags like "Food", "Vegan", etc.
  const relatedFoods = recipeTagLabels
    .map((recipeTag: string) => foodNameMap.get(recipeTag))
    .filter((food: Document | undefined): food is Document => food !== undefined)

  // Sort by order, then by title
  relatedFoods.sort((a: Document, b: Document) => {
    const orderCompare = (a.order || 0) - (b.order || 0)
    if (orderCompare !== 0) return orderCompare
    return a.title.localeCompare(b.title)
  })

  if (relatedFoods.length === 0) {
    return (
      <div className="bok-tag-list">
        <em>no foods found</em>
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
          {relatedFoods.length} food{relatedFoods.length !== 1 ? "s" : ""} in this recipe
        </summary>
        <div style={{ marginTop: "1rem" }}>
          {relatedFoods.map((food: Document) => (
            <DocItemImage key={food.permalink} doc={food} substanceNameMap={substanceNameMap} />
          ))}
        </div>
      </details>
    </div>
  )
}
