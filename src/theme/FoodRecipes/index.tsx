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
 * Props for FoodRecipes component
 */
interface FoodRecipesProps {
  tag: string
}

function DocItemImage({ doc }: { doc: Document }) {
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
 * FoodRecipes component
 *
 * Finds recipes that are tagged with the given food tag.
 * Displays recipes in a collapsible section.
 */
export default function FoodRecipes({ tag }: FoodRecipesProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!tag) {
    return <div>Error: Food tag is required</div>
  }

  // Get all documents and filter for recipes
  const allDocs = Object.values(allTags).flat()
  const allRecipes = allDocs.filter((doc: Document) => doc.permalink.includes("/recipes/"))

  // Remove duplicates
  const uniqueRecipes = Array.from(
    new Map(allRecipes.map((doc: Document) => [doc.permalink, doc])).values()
  )

  // Extract food names from their titles (normalize by removing parenthetical info)
  const getFoodName = (title: string): string => {
    return title.split("(")[0].trim()
  }

  // Normalize the tag name for matching
  const normalizedTag = getFoodName(tag)

  // Find recipes that have the food tag
  const foodRecipes = uniqueRecipes.filter((recipe: Document) => {
    const recipeTagLabels = recipe.tags.map((t: Tag) => t.label)
    // Check if recipe has the exact tag or normalized tag
    return recipeTagLabels.some((recipeTag: string) => {
      const normalizedRecipeTag = getFoodName(recipeTag)
      return recipeTag === tag || recipeTag === normalizedTag || normalizedRecipeTag === normalizedTag
    })
  })

  // Sort by order, then by title
  foodRecipes.sort((a: Document, b: Document) => {
    const orderCompare = (a.order || 0) - (b.order || 0)
    if (orderCompare !== 0) return orderCompare
    return a.title.localeCompare(b.title)
  })

  if (foodRecipes.length === 0) {
    return (
      <div className="bok-tag-list">
        <em>no recipes found</em>
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
          {foodRecipes.length} recipe{foodRecipes.length !== 1 ? "s" : ""} containing this food
        </summary>
        <div style={{ marginTop: "1rem" }}>
          {foodRecipes.map((recipe: Document) => (
            <DocItemImage key={recipe.permalink} doc={recipe} />
          ))}
        </div>
      </details>
    </div>
  )
}


