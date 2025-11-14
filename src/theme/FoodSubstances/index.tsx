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
 * Props for FoodSubstances component
 */
interface FoodSubstancesProps {
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

  // Get all substance documents
  const allDocs = Object.values(allTags).flat()
  const allSubstances = allDocs.filter((doc: Document) => doc.permalink.includes("/substances/"))

  // Remove duplicates
  const uniqueSubstances = Array.from(new Map(allSubstances.map((doc: Document) => [doc.permalink, doc])).values())

  // Find substances that match the food's tags
  // A substance matches if it has a tag that matches one of the food's tags
  const relatedSubstances = uniqueSubstances.filter((substance: Document) => {
    const substanceTagLabels = substance.tags.map((t: Tag) => t.label)
    return substanceTagLabels.some((st: string) => foodTagLabels.includes(st))
  })

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
      {relatedSubstances.map((substance: Document) => (
        <DocItemImage key={substance.permalink} doc={substance} />
      ))}
    </div>
  )
}

