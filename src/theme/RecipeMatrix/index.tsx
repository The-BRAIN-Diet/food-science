import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import {useLocation} from "@docusaurus/router"
import Link from "@docusaurus/Link"
import {BRS_MODULATOR_TAGS} from "../biologicalTargetsConfig"

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
 * Table row data structure - one row per target/substance combination
 */
interface TableRow {
  target: Document
  substance: Document | null
  therapeuticAreas: Document[]
  foods: Document[]
  mechanism: string | null
}

/**
 * Target map entry structure
 */
interface TargetMapEntry {
  target: Document
  substances: Map<Document, Set<Document>> // substance -> foods that contain it
  therapeuticAreas: Set<Document>
}

/**
 * Props for RecipeMatrix component
 */
interface RecipeMatrixProps {
  details: Record<string, unknown>
}

/**
 * RecipeMatrix component
 *
 * Creates a table showing the relationship chain:
 * Recipe -> Foods -> Substances -> Biological Targets -> Therapeutic Areas
 *
 * Flow:
 * 1. Recipe document has tags that are food names
 * 2. Food documents have tags that are substance names
 * 3. Substance documents have tags that are biological target names
 * 4. Biological target documents have tags that are therapeutic area names
 */
export default function RecipeMatrix({details}: RecipeMatrixProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap
  const location = useLocation()

  // Get current document from plugin data if details not provided
  let currentDetails = details
  if (!currentDetails) {
    // Find the current document by matching permalink
    const allDocs = Object.values(allTags).flat()
    const currentDoc = allDocs.find((doc: Document) => doc.permalink === location.pathname)
    if (currentDoc) {
      currentDetails = currentDoc.frontMatter
    }
  }

  if (!currentDetails) {
    return <div>Error: Recipe details (frontMatter) is required</div>
  }

  // Extract tags from frontMatter
  const recipeTags = currentDetails.tags
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

  // Get all documents organized by type
  const allDocs = Object.values(allTags).flat()
  const allFoods = allDocs.filter((doc: Document) => doc.permalink.includes("/foods/"))
  const allSubstances = allDocs.filter((doc: Document) => doc.permalink.includes("/substances/"))
  const allBiologicalTargets = allDocs.filter((doc: Document) => doc.permalink.includes("/biological-targets/"))
  const allTherapeuticAreas = allDocs.filter((doc: Document) => doc.permalink.includes("/therapeutic-areas/"))

  // Remove duplicates
  const uniqueFoods = Array.from(new Map(allFoods.map((doc: Document) => [doc.permalink, doc])).values())
  const uniqueSubstances = Array.from(new Map(allSubstances.map((doc: Document) => [doc.permalink, doc])).values())
  let uniqueTargets = Array.from(new Map(allBiologicalTargets.map((doc: Document) => [doc.permalink, doc])).values())
  uniqueTargets = uniqueTargets.filter((doc: Document) => doc.tags.some((t: Tag) => t.label === "Biological Target"))
  const uniqueAreas = Array.from(new Map(allTherapeuticAreas.map((doc: Document) => [doc.permalink, doc])).values())

  // Step 2: Find foods that match the recipe's tags
  // Only match foods where the recipe has a tag that exactly matches a food's name
  // Extract food names from their titles (normalize by removing parenthetical info)
  const getFoodName = (title: string): string => {
    // Remove parenthetical info like "(Wolffia globosa)" from "Duckweed (Wolffia globosa)"
    return title.split("(")[0].trim()
  }

  // Create a map of food names to food documents
  const foodNameMap = new Map<string, Document>()
  uniqueFoods.forEach((food: Document) => {
    const foodName = getFoodName(food.title)
    foodNameMap.set(foodName, food)
  })

  // Find foods where the recipe has a tag that exactly matches a food name
  // Only match on exact food names, not category tags like "Food", "Vegan", etc.
  const relatedFoods = recipeTagLabels
    .map((recipeTag: string) => foodNameMap.get(recipeTag))
    .filter((food: Document | undefined): food is Document => food !== undefined)

  if (relatedFoods.length === 0) {
    const recipeTitle = typeof details.title === "string" ? details.title : "recipe"
    return <div>No foods found for recipe: {recipeTitle}</div>
  }

  // Step 3: For each food, find substances it contains
  // Foods are tagged with substance names (e.g., "Omega-3 Fatty Acids", "Magnesium")
  // Build a map: substance -> foods that contain it
  const substanceToFoodsMap = new Map<Document, Set<Document>>()

  // Extract substance names from their titles (normalize by removing parenthetical info)
  const getSubstanceName = (title: string): string => {
    // Remove parenthetical info like "(Turmeric)" from "Curcumin (Turmeric)"
    return title.split("(")[0].trim()
  }

  // Create a map of substance names/aliases to substance documents
  // Map by title, sidebar_label, and substance tag labels
  const substanceNameMap = new Map<string, Document>()
  uniqueSubstances.forEach((substance: Document) => {
    const substanceName = getSubstanceName(substance.title)
    substanceNameMap.set(substanceName, substance)
    
    // Also map by sidebar_label if it exists and is different
    const sidebarLabel = substance.frontMatter.sidebar_label as string | undefined
    if (sidebarLabel) {
      const sidebarName = getSubstanceName(sidebarLabel)
      if (sidebarName !== substanceName) {
        substanceNameMap.set(sidebarName, substance)
      }
      // Also add the full sidebar_label as a key (e.g., "SCFAs (Butyrate, Propionate, Acetate)")
      substanceNameMap.set(sidebarLabel, substance)
    }
    
    // Also map by substance's own tag labels (e.g., "SCFAs" tag on SCFAs substance)
    const substanceTagLabels = substance.tags.map((t: Tag) => t.label)
    substanceTagLabels.forEach((tagLabel: string) => {
      // Only add if it's not a generic category tag
      if (!["Substance", "Nutrient", "Mineral", "Vitamin", "Fatty Acid", "Amino Acid", 
            "Bioactive", "Metabolite", "Essential Amino Acid", "Nonessential Amino Acid",
            "Phospholipid", "Polyphenol", "Flavonoid", "Carotenoid", "Terpene", "Lipid"].includes(tagLabel)) {
        if (!substanceNameMap.has(tagLabel)) {
          substanceNameMap.set(tagLabel, substance)
        }
      }
    })
  })

  relatedFoods.forEach((food: Document) => {
    const foodTagLabels = food.tags.map((t: Tag) => t.label)

    // Find substances where the food has a tag that matches a substance name/alias
    // Only match on exact substance names, not category tags like "Polyphenol"
    const foodSubstances = foodTagLabels
      .map((foodTag: string) => substanceNameMap.get(foodTag))
      .filter((substance: Document | undefined): substance is Document => substance !== undefined)

    foodSubstances.forEach((substance: Document) => {
      if (!substanceToFoodsMap.has(substance)) {
        substanceToFoodsMap.set(substance, new Set<Document>())
      }
      substanceToFoodsMap.get(substance)?.add(food)
    })
  })

  // Step 4: For each substance, find biological targets
  // Substances are tagged with biological target names (e.g., "Methylation")
  // Build a map: biological target -> {substances: Map(substance -> foods), therapeuticAreas: Set}
  // Start with all 6 BRS so modulator substances can be attached to every target
  const targetMap = new Map<string, TargetMapEntry>()
  uniqueTargets.forEach((target: Document) => {
    targetMap.set(target.permalink, {
      target,
      substances: new Map<Document, Set<Document>>(),
      therapeuticAreas: new Set<Document>(),
    })
  })

  // For each substance, find BRS targets (substance tag + recipe tag match) and add substance-food relationships
  substanceToFoodsMap.forEach((foods: Set<Document>, substance: Document) => {
    const substanceTagLabels = substance.tags.map((t: Tag) => t.label)

    // Find biological targets that have a tag matching one of the substance's tags
    // AND also have a tag matching one of the recipe's frontMatter tags
    const relatedTargets = uniqueTargets.filter((target: Document) => {
      const targetTagLabels = target.tags.map((t: Tag) => t.label)
      // Target must match both: substance tag AND recipe frontMatter tag
      const matchesSubstance = targetTagLabels.some((tt: string) => substanceTagLabels.includes(tt))
      const matchesRecipe = targetTagLabels.some((tt: string) => recipeTagLabels.includes(tt))
      return matchesSubstance && matchesRecipe
    })

    relatedTargets.forEach((target: Document) => {
      if (!targetMap.has(target.permalink)) {
        targetMap.set(target.permalink, {
          target,
          substances: new Map<Document, Set<Document>>(),
          therapeuticAreas: new Set<Document>(),
        })
      }
      const entry = targetMap.get(target.permalink)
      if (entry) {
        entry.substances.set(substance, foods)
      }
    })
  })

  // Step 4b: Add modulator-tagged substances to every BRS target (ECS, Circadian)
  targetMap.forEach((entry: TargetMapEntry) => {
    substanceToFoodsMap.forEach((foods: Set<Document>, substance: Document) => {
      const hasModulatorTag = substance.tags.some((t: Tag) =>
        BRS_MODULATOR_TAGS.includes(t.label as (typeof BRS_MODULATOR_TAGS)[number])
      )
      if (hasModulatorTag) {
        if (!entry.substances.has(substance)) {
          entry.substances.set(substance, foods)
        } else {
          const existing = entry.substances.get(substance)!
          foods.forEach((f: Document) => existing.add(f))
        }
      }
    })
  })

  // Step 5: For each biological target, find therapeutic areas
  targetMap.forEach((entry: TargetMapEntry) => {
    const targetTagLabels = entry.target.tags.map((t: Tag) => t.label)

    const relatedAreas = uniqueAreas.filter((area: Document) => {
      const areaTagLabels = area.tags.map((t: Tag) => t.label)
      return areaTagLabels.some((at: string) => targetTagLabels.includes(at))
    })

    relatedAreas.forEach((area: Document) => {
      entry.therapeuticAreas.add(area)
    })
  })

  // Convert to array with one row per target/substance combination
  // Extract mechanisms from substance frontMatter
  const tableData: TableRow[] = []

  targetMap.forEach((entry: TargetMapEntry) => {
    const therapeuticAreas = Array.from(entry.therapeuticAreas)

    // Get the biological target's name tag
    const targetNameTag =
      entry.target.tags.find((t: Tag) => t.label === entry.target.title || entry.target.tags.some((tag: Tag) => tag.label === "Biological Target")) ||
      entry.target.tags.find((t: Tag) => !["Biological Target"].includes(t.label))
    const targetName = targetNameTag?.label || entry.target.title

    // If no substances, create a single row with empty substance/food to show the target
    if (entry.substances.size === 0) {
      tableData.push({
        target: entry.target,
        substance: null,
        therapeuticAreas,
        foods: [],
        mechanism: null,
      })
    } else {
      // Create a row for each substance
      entry.substances.forEach((foods: Set<Document>, substance: Document) => {
      // Extract mechanism from substance frontMatter
      let mechanism: string | null = null
      const mechanisms = substance.frontMatter.mechanisms

      if (mechanisms && typeof mechanisms === "object" && !Array.isArray(mechanisms)) {
        const mechanismsObj = mechanisms as Record<string, string>

        // Find the common tag between substance and target
        const substanceTagLabels = substance.tags.map((t: Tag) => t.label)
        const targetTagLabels = entry.target.tags.map((t: Tag) => t.label)

        const commonTag = substanceTagLabels.find(
          (st: string) =>
            targetTagLabels.includes(st) &&
            ![
              "Biological Target",
              "Nutrient",
              "Mineral",
              "Vitamin",
              "Fatty Acid",
              "Amino Acid",
              "Bioactive",
              "Metabolite",
              "Substance",
              "Essential Amino Acid",
              "Nonessential Amino Acid",
              "Phospholipid",
              "Polyphenol",
              "Flavonoid",
              "Carotenoid",
              "Terpene",
              "Lipid",
            ].includes(st)
        )

        if (commonTag) {
          mechanism = mechanismsObj[commonTag] || null

          if (!mechanism) {
            const commonTagLower = commonTag.toLowerCase()
            const matchingKey = Object.keys(mechanismsObj).find((key: string) => key.toLowerCase() === commonTagLower)
            mechanism = matchingKey ? mechanismsObj[matchingKey] : null
          }
        }

        if (!mechanism) {
          mechanism = mechanismsObj[targetName] || null
          if (!mechanism) {
            const targetNameLower = targetName.toLowerCase()
            const matchingKey = Object.keys(mechanismsObj).find((key: string) => key.toLowerCase() === targetNameLower)
            mechanism = matchingKey ? mechanismsObj[matchingKey] : null
          }
        }
      }

      tableData.push({
        target: entry.target,
        substance,
        therapeuticAreas,
        foods: Array.from(foods),
        mechanism,
      })
    })
    }
  })

  // Sort by biological target title, then by substance title
  tableData.sort((a: TableRow, b: TableRow) => {
    const targetCompare = a.target.title.localeCompare(b.target.title)
    if (targetCompare !== 0) return targetCompare
    // Handle null substances (targets with no matching substances)
    if (!a.substance && !b.substance) return 0
    if (!a.substance) return 1
    if (!b.substance) return -1
    return a.substance.title.localeCompare(b.substance.title)
  })

  if (tableData.length === 0) {
    const recipeTitle = typeof details.title === "string" ? details.title : "recipe"
    return <div>No biological targets found for recipe: {recipeTitle}</div>
  }

  // Group table data by biological target
  const groupedByTarget = new Map<string, TableRow[]>()
  tableData.forEach((row: TableRow) => {
    const targetKey = row.target.permalink
    if (!groupedByTarget.has(targetKey)) {
      groupedByTarget.set(targetKey, [])
    }
    groupedByTarget.get(targetKey)?.push(row)
  })

  // Sort groups by target title
  const sortedGroups = Array.from(groupedByTarget.entries()).sort((a, b) => {
    return a[1][0].target.title.localeCompare(b[1][0].target.title)
  })

  return (
    <div className="recipe-matrix">
      {sortedGroups.map(([targetKey, rows]) => {
        const target = rows[0].target
        // Get unique therapeutic areas for this target (all rows have the same therapeutic areas for a given target)
        const therapeuticAreas = rows[0].therapeuticAreas

        return (
          <div key={targetKey} style={{marginBottom: "2rem"}}>
            <h3>
              <Link to={target.permalink}>{target.title}</Link>
            </h3>

            <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
              <thead>
                <tr>
                  <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Substance</th>
                  <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Foods</th>
                  <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Mechanism of Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row: TableRow, index: number) => {
                  // Handle targets with no substances
                  if (!row.substance) {
                    return (
                      <tr key={index}>
                        <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top", color: "#999"}}>
                          —
                        </td>
                        <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top", color: "#999"}}>
                          —
                        </td>
                        <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top", color: "#999"}}>
                          Supported through recipe ingredients
                        </td>
                      </tr>
                    )
                  }
                  return (
                    <tr key={index}>
                      <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                        <Link to={row.substance.permalink}>{row.substance.title}</Link>
                      </td>
                      <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                        {row.foods.length > 0 ? (
                          <div>
                            {row.foods.map((food: Document, i: number) => {
                              return (
                                <span key={i}>
                                  <Link to={food.permalink}>{food.title}</Link>
                                  {i < row.foods.length - 1 && ", "}
                                </span>
                              )
                            })}
                          </div>
                        ) : (
                          <span style={{color: "#999"}}>—</span>
                        )}
                      </td>
                      <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                        {row.mechanism ? <span>{row.mechanism}</span> : <span style={{color: "#999"}}>—</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}
