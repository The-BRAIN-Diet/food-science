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
 * Props for SubstanceRecipes component
 */
interface SubstanceRecipesProps {
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
 * SubstanceRecipes component
 *
 * Finds recipes that contain foods which contain the given substance.
 * Follows the causality chain: Substance -> Foods -> Recipes
 *
 * Flow:
 * 1. Find all foods tagged with the substance tag
 * 2. Find all recipes tagged with those food names
 * 3. Display the recipes in a collapsible section
 */
export default function SubstanceRecipes({ tag }: SubstanceRecipesProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!tag) {
    return <div>Error: Substance tag is required</div>
  }

  // Step 1: Find all foods tagged with the substance
  // Get all documents and filter for foods
  const allDocs = Object.values(allTags).flat()
  const allFoods = allDocs.filter((doc: Document) => doc.permalink.includes("/foods/"))
  
  // Remove duplicates
  const uniqueFoods = Array.from(
    new Map(allFoods.map((doc: Document) => [doc.permalink, doc])).values()
  )

  // Find foods that have the substance tag
  // Check both direct tag matches and normalized tag matches
  const getSubstanceName = (title: string): string => {
    return title.split("(")[0].trim()
  }
  
  const substanceName = getSubstanceName(tag)
  const substanceFoods = uniqueFoods.filter((food: Document) => {
    const foodTagLabels = food.tags.map((t: Tag) => t.label)
    // Check if food has the exact tag or normalized tag
    return foodTagLabels.some((foodTag: string) => {
      const normalizedFoodTag = getSubstanceName(foodTag)
      return foodTag === tag || foodTag === substanceName || normalizedFoodTag === substanceName
    })
  })

  if (substanceFoods.length === 0) {
    return (
      <div className="bok-tag-list">
        <em>no recipes found (no foods contain this substance)</em>
      </div>
    )
  }

  // Extract food names from their titles (normalize by removing parenthetical info)
  const getFoodName = (title: string): string => {
    return title.split("(")[0].trim()
  }

  // Create a map of food names to food documents
  // Map both normalized name (without parentheses) and full name (with parentheses)
  const foodNameMap = new Map<string, Document>()
  substanceFoods.forEach((food: Document) => {
    const foodName = getFoodName(food.title)
    foodNameMap.set(foodName, food)
    // Also map the full title (with parentheses) if different
    if (food.title !== foodName) {
      foodNameMap.set(food.title, food)
    }
  })

  // Step 2: Find all recipes and check if they're tagged with any of the food names
  const allRecipes = allDocs.filter((doc: Document) => doc.permalink.includes("/recipes/"))

  // Get recipe tags and find matches
  const relatedRecipes: Document[] = []
  allRecipes.forEach((recipe: Document) => {
    const recipeTagLabels = recipe.tags.map((tag: Tag) => tag.label)
    // Check if any recipe tag matches a food name
    const hasMatchingFood = recipeTagLabels.some((recipeTag: string) =>
      foodNameMap.has(recipeTag)
    )
    if (hasMatchingFood) {
      relatedRecipes.push(recipe)
    }
  })

  // Remove duplicates
  const uniqueRecipes = Array.from(
    new Map(relatedRecipes.map((doc: Document) => [doc.permalink, doc])).values()
  )

  // Sort by order, then by title
  uniqueRecipes.sort((a: Document, b: Document) => {
    const orderCompare = (a.order || 0) - (b.order || 0)
    if (orderCompare !== 0) return orderCompare
    return a.title.localeCompare(b.title)
  })

  if (uniqueRecipes.length === 0) {
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
          {uniqueRecipes.length} recipe{uniqueRecipes.length !== 1 ? "s" : ""} containing this
          substance
        </summary>
        <div style={{ marginTop: "1rem" }}>
          {uniqueRecipes.map((recipe: Document) => (
            <DocItemImage key={recipe.permalink} doc={recipe} />
          ))}
        </div>
      </details>
    </div>
  )
}

