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

function DocItemImage({doc}: {doc: Document}) {
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

  // Get all food documents
  const allDocs = Object.values(allTags).flat()
  const allFoods = allDocs.filter((doc: Document) => doc.permalink.includes("/foods/"))

  // Remove duplicates
  const uniqueFoods = Array.from(new Map(allFoods.map((doc: Document) => [doc.permalink, doc])).values())

  // Find foods that match the recipe's tags
  // A food matches if it has a tag that matches one of the recipe's tags
  const relatedFoods = uniqueFoods.filter((food: Document) => {
    const foodTagLabels = food.tags.map((t: Tag) => t.label)
    return foodTagLabels.some((ft: string) => recipeTagLabels.includes(ft))
  })

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
      {relatedFoods.map((food: Document) => (
        <DocItemImage key={food.permalink} doc={food} />
      ))}
    </div>
  )
}
