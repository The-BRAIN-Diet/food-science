import React from "react"
import {canonicalFoodRelationships} from "@site/src/data/foodSubstanceRelationships.mjs"
import {substanceLabelsOverlap} from "@site/src/data/nutritionTableMapping"
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
  source_url?: string
}

type FoodRelationship = {
  doc: Document
  edge: SubstanceRelationship
}

function DocItemImage({ relationship }: { relationship: FoodRelationship }) {
  const {doc} = relationship
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

/**
 * SubstanceFoods component
 *
 * Lists foods with an explicit `substance_relationships` record for this substance.
 * A food tag alone is not a relationship and is not shown.
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

  const substanceFoods: FoodRelationship[] = []
  for (const food of uniqueFoods) {
    const explicit = Array.isArray(food.frontMatter.substance_relationships)
      ? (canonicalFoodRelationships(food.frontMatter) as unknown[])
          .filter((item): item is SubstanceRelationship => {
            if (!item || typeof item !== "object") return false
            const candidate = item as Partial<SubstanceRelationship>
            return (
              typeof candidate.substance === "string" &&
              typeof candidate.relationship === "string" &&
              substanceLabelsOverlap(candidate.substance, tag)
            )
          })
      : []

    for (const edge of explicit) {
      substanceFoods.push({doc: food, edge})
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
          {substanceFoods.length} food{substanceFoods.length !== 1 ? "s" : ""}
        </summary>
        <div style={{ marginTop: "1rem" }}>
          {substanceFoods.map((relationship: FoodRelationship, index: number) => (
            <DocItemImage
              key={`${relationship.doc.permalink}-${relationship.edge.relationship}-${index}`}
              relationship={relationship}
            />
          ))}
        </div>
      </details>
    </div>
  )
}


