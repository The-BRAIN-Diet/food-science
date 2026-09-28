import React from "react"
import { usePluginData } from "@docusaurus/useGlobalData"
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
 * Props for SubstanceFoods component
 */
interface SubstanceFoodsProps {
  tag: string
}

type SubstanceRelationship = {
  substance: string
  relationship: string
  input?: string
  process?: string
  description?: string
  citation_keys?: string[]
}

type FoodRelationship = {
  doc: Document
  edge: SubstanceRelationship
  legacy: boolean
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  contains: "Contains",
  "direct-food-occurrence": "Direct food occurrence",
  "dietary-precursor": "Dietary precursor",
  "microbial-formation": "Supports microbial formation",
  "endogenous-formation": "Supports endogenous formation",
  "bioavailability-context": "Bioavailability / food-matrix context",
  "direct-supplemental-exposure": "Direct supplemental exposure",
}

function relationshipLabel(edge: SubstanceRelationship, legacy: boolean): string {
  if (legacy) return "Legacy food association · relationship unreviewed"
  return RELATIONSHIP_LABELS[edge.relationship] || edge.relationship
}

function relationshipPath(
  foodTitle: string,
  substance: string,
  edge: SubstanceRelationship,
  legacy: boolean,
): string {
  if (legacy) return `${foodTitle} → legacy tag association → ${substance}`
  if (edge.relationship === "contains" || edge.relationship === "direct-food-occurrence") {
    return `${foodTitle} → contains → ${substance}`
  }
  const input = edge.input ? ` → provides ${edge.input}` : ""
  const process = edge.process ? ` → ${edge.process}` : ""
  return `${foodTitle}${input}${process} → ${substance}`
}

function DocItemImage({ relationship, substance }: { relationship: FoodRelationship; substance: string }) {
  const {doc, edge, legacy} = relationship
  const label = relationshipLabel(edge, legacy)
  const path = relationshipPath(doc.title, substance, edge, legacy)
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
          <p className="substance-food-relationship">
            <span
              className="substance-food-relationship__label"
              title={legacy
                ? "Legacy fallback inferred from the Food tag. This edge has not yet been migrated to an explicit relationship record."
                : edge.description || path}
            >
              {label}
            </span>
            <span className="substance-food-relationship__path">{path}</span>
          </p>
          {edge.description ? (
            <p className="substance-food-relationship__description">{edge.description}</p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

/**
 * SubstanceFoods component
 *
 * Finds direct and precursor/support relationships between foods and a substance.
 * Explicit `substance_relationships` records take precedence. Existing food tags
 * remain visible as a labelled legacy direct-occurrence fallback.
 */
export default function SubstanceFoods({ tag }: SubstanceFoodsProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!tag) {
    return <div>Error: Substance tag is required</div>
  }

  // Get all documents and filter for foods
  const allDocs = Object.values(allTags).flat()
  const allFoods = allDocs.filter((doc: Document) => doc.permalink.includes("/foods/"))

  // Remove duplicates
  const uniqueFoods = Array.from(
    new Map(allFoods.map((doc: Document) => [doc.permalink, doc])).values()
  )

  const getSubstanceName = (title: string): string => {
    return title.split("(")[0].trim()
  }

  const substanceName = getSubstanceName(tag)
  const substanceFoods: FoodRelationship[] = []
  for (const food of uniqueFoods) {
    const explicit = Array.isArray(food.frontMatter.substance_relationships)
      ? (food.frontMatter.substance_relationships as unknown[])
          .filter((item): item is SubstanceRelationship => {
            if (!item || typeof item !== "object") return false
            const candidate = item as Partial<SubstanceRelationship>
            return (
              typeof candidate.substance === "string" &&
              typeof candidate.relationship === "string" &&
              getSubstanceName(candidate.substance) === substanceName
            )
          })
      : []

    if (explicit.length) {
      for (const edge of explicit) {
        substanceFoods.push({doc: food, edge, legacy: false})
      }
      continue
    }

    const foodTagLabels = food.tags.map((t: Tag) => t.label)
    const tagMatch = foodTagLabels.some((foodTag: string) => {
      const normalizedFoodTag = getSubstanceName(foodTag)
      return foodTag === tag || foodTag === substanceName || normalizedFoodTag === substanceName
    })
    if (tagMatch) {
      substanceFoods.push({
        doc: food,
        edge: {substance: substanceName, relationship: "direct-food-occurrence"},
        legacy: true,
      })
    }
  }

  // Sort by order, then by title
  substanceFoods.sort((a: FoodRelationship, b: FoodRelationship) => {
    const orderCompare = (a.doc.order || 0) - (b.doc.order || 0)
    if (orderCompare !== 0) return orderCompare
    return a.doc.title.localeCompare(b.doc.title)
  })

  if (substanceFoods.length === 0) {
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
          {substanceFoods.length} food relationship{substanceFoods.length !== 1 ? "s" : ""}
        </summary>
        <div style={{ marginTop: "1rem" }}>
          {substanceFoods.map((relationship: FoodRelationship, index: number) => (
            <DocItemImage
              key={`${relationship.doc.permalink}-${relationship.edge.relationship}-${index}`}
              relationship={relationship}
              substance={substanceName}
            />
          ))}
        </div>
      </details>
    </div>
  )
}


