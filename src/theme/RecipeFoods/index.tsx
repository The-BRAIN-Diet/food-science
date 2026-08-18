import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import Link from "@docusaurus/Link"
import styles from "../TagList/styles.module.css"
import {NUTRIENT_LABELS} from "@site/src/data/nutritionTableMapping"
import {
  ADULT_REFERENCE_INTAKE,
  PENDING_NUTRITION_MESSAGE,
  calculateRecipeNutrition,
  materialContributors,
  percentReferenceIntake,
  selectPublicRows,
} from "@site/src/utils/recipeNutritionCalculate.mjs"

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

const NUTRIENT_UNIT: Record<string, string> = {
  kcal: "kcal",
  protein_g: "g",
  fat_g: "g",
  sat_fat_g: "g",
  carbs_g: "g",
  sugar_g: "g",
  fibre_g: "g",
  sodium_mg: "mg",
}

const TABLE: React.CSSProperties = {width: "100%", borderCollapse: "collapse"}
const TH_LEFT: React.CSSProperties = {textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}
const TH_RIGHT: React.CSSProperties = {textAlign: "right", padding: "8px", borderBottom: "2px solid #ccc"}
const TD_LEFT: React.CSSProperties = {padding: "8px", borderBottom: "1px solid #eee"}
const TD_RIGHT: React.CSSProperties = {padding: "8px", borderBottom: "1px solid #eee", textAlign: "right"}
const DETAILS: React.CSSProperties = {marginTop: "0.75rem"}
const SUMMARY: React.CSSProperties = {cursor: "pointer", color: "var(--ifm-color-primary)"}
const NOTE: React.CSSProperties = {fontSize: "0.85em", color: "var(--ifm-color-content-secondary)"}

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

  const nutrition = calculateRecipeNutrition(details, uniqueFoods)
  const publicRows = nutrition.status === "calculated" ? selectPublicRows(nutrition) : []
  const summaryRows = publicRows.filter((row) => row.group === "core")
  const micronutrientRows = publicRows.filter((row) => row.group === "micronutrient")
  const bioactiveRows = publicRows.filter((row) => row.group === "brain")
  const unresolvedNotes = summaryRows
    .filter((row) => row.amount == null && row.unresolvedReason)
    .map((row) => ({key: row.key, reason: row.unresolvedReason as string}))
  const exclusions = nutrition.exclusions || []
  const assumptions = nutrition.assumptions || []
  const provenanceRows = summaryRows
    .filter((row) => row.amount != null)
    .map((row) => ({
      key: row.key,
      contributors: materialContributors(row.key, nutrition.byFood, row.amount as number),
    }))
    .filter((row) => row.contributors.length > 0)

  const formatAmount = (key: string, amount: number) => {
    const unit = NUTRIENT_LABELS[key]?.unit || NUTRIENT_UNIT[key] || (key.endsWith("_mg") ? "mg" : "")
    const decimals = key === "kcal" ? 0 : amount >= 10 ? 1 : 2
    return `${amount.toFixed(decimals)} ${unit}`.trim()
  }

  const formatPct = (key: string, amount: number) => {
    if (!(key in ADULT_REFERENCE_INTAKE)) return "—"
    const pct = percentReferenceIntake(key, amount)
    if (pct == null) return "—"
    return `${pct.toFixed(0)}%`
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

      <div style={{marginTop: "1rem"}}>
        <h3 style={{marginBottom: "0.5rem"}}>Recipe nutrition</h3>
        {nutrition.status !== "calculated" ? (
          <>
            <p style={{marginBottom: nutrition.pendingReason ? "0.25rem" : undefined}}>
              {PENDING_NUTRITION_MESSAGE}
            </p>
            {nutrition.pendingReason ? <p style={NOTE}>{nutrition.pendingReason}</p> : null}
          </>
        ) : (
          <>
            <p style={{fontSize: "0.9em", color: "var(--ifm-color-content-secondary)", marginTop: 0}}>
              Per serving{nutrition.servings > 1 ? `, recipe serves ${nutrition.servings}` : ""}. Each
              included ingredient is scaled from a named per-100 g composition record by edible grams.
              Optional ingredients are excluded. Missing analytical values are not treated as zero.
            </p>

            <table style={TABLE}>
              <thead>
                <tr>
                  <th style={TH_LEFT}>Nutrient</th>
                  <th style={TH_RIGHT}>Per serving</th>
                  <th style={TH_RIGHT}>Reference intake</th>
                </tr>
              </thead>
              <tbody>
                {summaryRows.map((row) => (
                  <tr key={row.key}>
                    <td style={TD_LEFT}>{row.label || NUTRIENT_LABELS[row.key]?.label || row.key}</td>
                    <td style={TD_RIGHT}>
                      {row.amount == null ? "Not established" : formatAmount(row.key, row.amount)}
                    </td>
                    <td style={TD_RIGHT}>{row.amount == null ? "—" : formatPct(row.key, row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {unresolvedNotes.length > 0 && (
              <p style={{fontSize: "0.8em", color: "var(--ifm-color-content-secondary)", marginTop: "0.4rem"}}>
                {unresolvedNotes.map((note) => (
                  <span key={note.key} style={{display: "block"}}>
                    {NUTRIENT_LABELS[note.key]?.label || note.key}: {note.reason}
                  </span>
                ))}
              </p>
            )}

            <details style={DETAILS}>
              <summary style={SUMMARY}>Key vitamins and minerals</summary>
              {micronutrientRows.length === 0 ? (
                <p style={NOTE}>
                  No micronutrient reaches 5% of the adult reference intake in one serving from the
                  records used here.
                </p>
              ) : (
                <table style={{...TABLE, marginTop: "0.5rem"}}>
                  <thead>
                    <tr>
                      <th style={TH_LEFT}>Nutrient</th>
                      <th style={TH_RIGHT}>Per serving</th>
                      <th style={TH_RIGHT}>Reference intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    {micronutrientRows.map((row) => (
                      <tr key={row.key}>
                        <td style={TD_LEFT}>{NUTRIENT_LABELS[row.key]?.label || row.key}</td>
                        <td style={TD_RIGHT}>{formatAmount(row.key, row.amount)}</td>
                        <td style={TD_RIGHT}>{formatPct(row.key, row.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </details>

            <details style={DETAILS}>
              <summary style={SUMMARY}>Bioactive compounds</summary>
              {bioactiveRows.length === 0 ? (
                <p style={NOTE}>
                  No bioactive compound has a defensible quantitative value for this serving. Values
                  reported only as presence, traces or ranges are not summed into a number.
                </p>
              ) : (
                <table style={{...TABLE, marginTop: "0.5rem"}}>
                  <thead>
                    <tr>
                      <th style={TH_LEFT}>Compound</th>
                      <th style={TH_RIGHT}>Per serving</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bioactiveRows.map((row) => (
                      <tr key={row.key}>
                        <td style={TD_LEFT}>{row.label || NUTRIENT_LABELS[row.key]?.label || row.key}</td>
                        <td style={TD_RIGHT}>{formatAmount(row.key, row.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </details>

            <details style={DETAILS}>
              <summary style={SUMMARY}>Calculation details</summary>
              <table style={{...TABLE, marginTop: "0.5rem", fontSize: "0.85em"}}>
                <thead>
                  <tr>
                    <th style={TH_LEFT}>Ingredient</th>
                    <th style={TH_RIGHT}>Calculation weight</th>
                    <th style={TH_LEFT}>Composition source</th>
                  </tr>
                </thead>
                <tbody>
                  {nutrition.audit.map((row) => (
                    <tr key={`${row.food}-${row.weight_g}`}>
                      <td style={TD_LEFT}>{row.display || row.food}</td>
                      <td style={TD_RIGHT}>{row.weight_g.toFixed(1)} g</td>
                      <td style={TD_LEFT}>
                        {row.composition_basis}
                        {row.conversion_source ? (
                          <span style={{display: "block", color: "var(--ifm-color-content-secondary)"}}>
                            {row.conversion_source}
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {provenanceRows.length > 0 && (
                <>
                  <p style={{...NOTE, marginTop: "0.75rem", marginBottom: "0.25rem"}}>
                    Where each summary value comes from (foods supplying at least 10% of that row):
                  </p>
                  <ul style={{fontSize: "0.85em", marginBottom: 0}}>
                    {provenanceRows.map((row) => (
                      <li key={row.key}>
                        <strong>{NUTRIENT_LABELS[row.key]?.label || row.key}</strong>: {row.contributors.join(", ")}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {(exclusions.length > 0 || assumptions.length > 0) && (
                <>
                  <p style={{...NOTE, marginTop: "0.75rem", marginBottom: "0.25rem"}}>
                    Exclusions and assumptions:
                  </p>
                  <ul style={{fontSize: "0.85em", marginBottom: 0}}>
                    {exclusions.map((item) => (
                      <li key={item.display}>
                        {item.display} — {item.reason}
                      </li>
                    ))}
                    {assumptions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </details>
          </>
        )}
      </div>
    </div>
  )
}
