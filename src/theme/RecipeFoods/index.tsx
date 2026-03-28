import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import Link from "@docusaurus/Link"
import styles from "../TagList/styles.module.css"
import {
  BIOACTIVE_LIPID_KEYS,
  CORE_NUTRIENT_KEYS,
  MICRONUTRIENT_KEYS,
  NUTRIENT_LABELS,
} from "@site/src/data/nutritionTableMapping"
import {
  computeWeightedNutrients,
  foodsContributingToNutrient,
  isTraceTotal,
  nutrientContribution,
  type RecipeNutritionBlock,
} from "@site/src/utils/recipeNutritionWeighted"

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

type NutritionValues = Record<string, number | null | undefined>

interface SupplementarySource {
  key?: string
  label?: string
  value?: number
  unit?: string
  amount_display?: string
}

interface FunctionalMetric {
  key?: string
  label?: string
  value?: number
  unit?: string
  amount_display?: string
}

// Reference intakes aligned with NutritionTable.
const RDA_VALUES: Record<string, number> = {
  iron_mg: 18,
  zinc_mg: 11,
  magnesium_mg: 420,
  selenium_ug: 55,
  calcium_mg: 1000,
  potassium_mg: 3400,
  choline_mg: 550,
  folate_ug: 400,
  vitamin_b12_ug: 2.4,
  vitamin_b6_mg: 1.7,
  vitamin_e_mg: 15,
  vitamin_k_ug: 120,
  copper_mg: 0.9,
}
// Protein reference model:
// - Single coefficient (median/central target): 1.2 g/kg/day
// - Body-weight range only: 50-100 kg
const PROTEIN_REF_G_PER_KG = 1.2
const PROTEIN_REFERENCE_BODY_WEIGHT_KG_MIN = 50
const PROTEIN_REFERENCE_BODY_WEIGHT_KG_MAX = 100

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

  const POLYPHENOL_RE = /polyphenol|flavan|catechin|anthocyan|curcumin|oleuropein|oleocanthal|oleacein|hydroxytyrosol|tyrosol/i

  const recipeNutrition = details.recipe_nutrition as RecipeNutritionBlock | undefined
  const recipeServings =
    typeof recipeNutrition?.servings === "number" && recipeNutrition.servings > 0
      ? recipeNutrition.servings
      : 1
  let weighted = recipeNutrition
    ? computeWeightedNutrients(recipeNutrition, uniqueFoods)
    : null
  if (weighted && weighted.totals.size === 0) {
    weighted = null
  }

  let polyphenolTotalMg = 0
  const polyphenolFoods: Document[] = []
  let hasQualitativePolyphenol = false

  const nutrientTotals = new Map<string, number>()
  const nutrientFoods = new Map<string, Document[]>()

  const resolveFoodDocByLabel = (label: string): Document | undefined => {
    const t = label.trim().toLowerCase()
    return uniqueFoods.find(
      (f) =>
        f.title.toLowerCase() === t ||
        f.title.toLowerCase().startsWith(t + " ") ||
        f.tags.some((tag) => tag.label.toLowerCase() === t)
    )
  }

  if (weighted && recipeNutrition) {
    weighted.totals.forEach((v, k) => nutrientTotals.set(k, v))
    nutrientTotals.forEach((_, key) => {
      const titles = foodsContributingToNutrient(key, weighted.byFood, nutrientTotals.get(key))
      const docs = titles
        .map((title) => uniqueFoods.find((d) => d.title === title))
        .filter((d): d is Document => Boolean(d))
      nutrientFoods.set(key, docs)
    })

    for (const ing of recipeNutrition.ingredients) {
      const food = resolveFoodDocByLabel(ing.food)
      if (!food) continue
      const fm = food.frontMatter || {}
      const nutrition = (fm.nutrition_per_100g || {}) as NutritionValues
      const grams = ing.grams
      const supplementary = Array.isArray(fm.nutrition_supplementary_sources)
        ? (fm.nutrition_supplementary_sources as SupplementarySource[])
        : []
      supplementary.forEach((s) => {
        const text = `${s.key || ""} ${s.label || ""}`
        if (!POLYPHENOL_RE.test(text)) return
        if (typeof s.value === "number") {
          const unit = (s.unit || "").toLowerCase()
          const base = unit === "mg" ? s.value : unit === "g" ? s.value * 1000 : 0
          polyphenolTotalMg += nutrientContribution(base, grams)
        } else if (typeof s.amount_display === "string" && s.amount_display.trim().length > 0) {
          hasQualitativePolyphenol = true
        }
        polyphenolFoods.push(food)
      })

      const metrics = Array.isArray(fm.nutrition_functional_metrics)
        ? (fm.nutrition_functional_metrics as FunctionalMetric[])
        : []
      metrics.forEach((m) => {
        const text = `${m.key || ""} ${m.label || ""}`
        if (!POLYPHENOL_RE.test(text)) return
        if (typeof m.value === "number") {
          const unit = (m.unit || "").toLowerCase()
          const base = unit === "mg" ? m.value : unit === "g" ? m.value * 1000 : 0
          polyphenolTotalMg += nutrientContribution(base, grams)
        } else if (typeof m.amount_display === "string" && m.amount_display.trim().length > 0) {
          hasQualitativePolyphenol = true
        }
        polyphenolFoods.push(food)
      })
    }
  } else {
    relatedFoods.forEach((food: Document) => {
      const fm = food.frontMatter || {}
      const nutrition = (fm.nutrition_per_100g || {}) as NutritionValues
      for (const key of [...CORE_NUTRIENT_KEYS, ...MICRONUTRIENT_KEYS, ...BIOACTIVE_LIPID_KEYS, "omega3_mg"]) {
        const value = nutrition[key]
        if (typeof value !== "number") continue
        nutrientTotals.set(key, (nutrientTotals.get(key) || 0) + value)
        nutrientFoods.set(key, [...(nutrientFoods.get(key) || []), food])
      }

      const supplementary = Array.isArray(fm.nutrition_supplementary_sources)
        ? (fm.nutrition_supplementary_sources as SupplementarySource[])
        : []
      supplementary.forEach((s) => {
        const text = `${s.key || ""} ${s.label || ""}`
        if (!POLYPHENOL_RE.test(text)) return
        if (typeof s.value === "number") {
          const unit = (s.unit || "").toLowerCase()
          if (unit === "mg") polyphenolTotalMg += s.value
          if (unit === "g") polyphenolTotalMg += s.value * 1000
        } else if (typeof s.amount_display === "string" && s.amount_display.trim().length > 0) {
          hasQualitativePolyphenol = true
        }
        polyphenolFoods.push(food)
      })

      const metrics = Array.isArray(fm.nutrition_functional_metrics)
        ? (fm.nutrition_functional_metrics as FunctionalMetric[])
        : []
      metrics.forEach((m) => {
        const text = `${m.key || ""} ${m.label || ""}`
        if (!POLYPHENOL_RE.test(text)) return
        if (typeof m.value === "number") {
          const unit = (m.unit || "").toLowerCase()
          if (unit === "mg") polyphenolTotalMg += m.value
          if (unit === "g") polyphenolTotalMg += m.value * 1000
        } else if (typeof m.amount_display === "string" && m.amount_display.trim().length > 0) {
          hasQualitativePolyphenol = true
        }
        polyphenolFoods.push(food)
      })
    })
  }

  const uniqueByPermalink = (docs: Document[]) =>
    Array.from(new Map(docs.map((d) => [d.permalink, d])).values())
  const polyphenolFoodDocs = uniqueByPermalink(polyphenolFoods)

  const renderFoodList = (docs: Document[]) => {
    const unique = uniqueByPermalink(docs)
    if (unique.length === 0) return "—"
    return unique.map((d, i) => (
      <span key={d.permalink}>
        <Link to={d.permalink}>{d.title}</Link>
        {i < unique.length - 1 ? ", " : ""}
      </span>
    ))
  }

  const displayNutrientAmount = (raw: number) => (weighted ? raw / recipeServings : raw)

  const formatTotal = (key: string, value: number) => {
    const v = displayNutrientAmount(value)
    if (weighted && isTraceTotal(key, v)) return "trace"
    const unit = NUTRIENT_LABELS[key]?.unit || ""
    const decimals = key === "kcal" ? 0 : 1
    return `${v.toFixed(decimals)} ${unit}`.trim()
  }

  const formatRda = (key: string, value: number) => {
    const v = displayNutrientAmount(value)
    if (weighted && isTraceTotal(key, v)) return "—"
    if (key === "protein_g") {
      const minTarget = PROTEIN_REF_G_PER_KG * PROTEIN_REFERENCE_BODY_WEIGHT_KG_MIN
      const maxTarget = PROTEIN_REF_G_PER_KG * PROTEIN_REFERENCE_BODY_WEIGHT_KG_MAX
      const highPct = (v / minTarget) * 100
      const lowPct = (v / maxTarget) * 100
      return `${lowPct.toFixed(1)}-${highPct.toFixed(1)}%*`
    }
    const rda = RDA_VALUES[key]
    if (!rda || rda <= 0) return "—"
    return `${((v / rda) * 100).toFixed(1)}%`
  }

  const nutrientRows = (keys: readonly string[]) =>
    keys
      .filter((key) => nutrientTotals.has(key))
      .map((key) => (
        <tr key={key}>
          <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>{NUTRIENT_LABELS[key]?.label || key}</td>
          <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
            {renderFoodList(nutrientFoods.get(key) || [])}
          </td>
          <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
            {formatTotal(key, nutrientTotals.get(key) || 0)}
          </td>
        </tr>
      ))

  const coreRows = nutrientRows(CORE_NUTRIENT_KEYS)
  const microRows = nutrientRows(MICRONUTRIENT_KEYS)
  const bioactiveKeys = [...BIOACTIVE_LIPID_KEYS, "omega3_mg"] as const
  const bioactiveRows = nutrientRows(bioactiveKeys)

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

      {(coreRows.length > 0 || microRows.length > 0 || bioactiveRows.length > 0 || polyphenolFoodDocs.length > 0) && (
        <div style={{marginTop: "1rem"}}>
          <h3 style={{marginBottom: "0.5rem"}}>Recipe nutrition</h3>
          <p style={{fontSize: "0.9em", color: "var(--ifm-color-content-secondary)", marginTop: 0}}>
            {weighted ? (
              <>
                Totals are <strong>calculated</strong> from each food’s USDA-linked nutrient panel (per 100 g)
                on our site, multiplied by the <strong>grams of that food in this recipe</strong>—even small
                amounts (e.g. a few grams of herbs). Values marked <strong>trace</strong> round to negligible at
                this scale.
                {recipeServings > 1 ? (
                  <> Figures are <strong>per serving</strong> (this recipe serves {recipeServings}).</>
                ) : null}
              </>
            ) : (
              <>
                Figures are still <strong>calculated from USDA-based nutrient data</strong> on each food page (per
                100 g). For this recipe we have not yet added ingredient weights, so the table{" "}
                <strong>adds one full “100 g” slice of each linked food</strong>, not the grams actually used
                (which would misrepresent small amounts like herbs, spices, or oil). When portion sizes are
                added for the recipe, the same panels are multiplied by the real amounts—so the maths can be
                precise for every ingredient.
              </>
            )}
          </p>
          <table style={{width: "100%", borderCollapse: "collapse"}}>
            <thead>
              <tr>
                <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Nutrient / class</th>
                <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Foods in recipe</th>
                <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>
                  {weighted ? "Total (scaled to recipe)" : "Total (100 g per linked food)"}
                </th>
                <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>% RDA aggregate</th>
              </tr>
            </thead>
            <tbody>
              {coreRows.length > 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{padding: "8px", borderBottom: "1px solid #ddd", fontWeight: 600, background: "rgba(0,0,0,0.02)"}}
                  >
                    Core nutrition
                  </td>
                </tr>
              )}
              {CORE_NUTRIENT_KEYS.filter((key) => nutrientTotals.has(key)).map((key) => (
                <tr key={key}>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {key === "protein_g" ? "Protein*" : NUTRIENT_LABELS[key]?.label || key}
                  </td>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {renderFoodList(nutrientFoods.get(key) || [])}
                  </td>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {formatTotal(key, nutrientTotals.get(key) || 0)}
                  </td>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {formatRda(key, nutrientTotals.get(key) || 0)}
                  </td>
                </tr>
              ))}
              {microRows.length > 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{padding: "8px", borderBottom: "1px solid #ddd", fontWeight: 600, background: "rgba(0,0,0,0.02)"}}
                  >
                    Key micronutrients
                  </td>
                </tr>
              )}
              {MICRONUTRIENT_KEYS.filter((key) => nutrientTotals.has(key)).map((key) => (
                <tr key={key}>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>{NUTRIENT_LABELS[key]?.label || key}</td>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {renderFoodList(nutrientFoods.get(key) || [])}
                  </td>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {formatTotal(key, nutrientTotals.get(key) || 0)}
                  </td>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {formatRda(key, nutrientTotals.get(key) || 0)}
                  </td>
                </tr>
              ))}
              {bioactiveRows.length > 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{padding: "8px", borderBottom: "1px solid #ddd", fontWeight: 600, background: "rgba(0,0,0,0.02)"}}
                  >
                    Bioactive compounds
                  </td>
                </tr>
              )}
              {bioactiveKeys.filter((key) => nutrientTotals.has(key)).map((key) => (
                <tr key={key}>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>{NUTRIENT_LABELS[key]?.label || key}</td>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {renderFoodList(nutrientFoods.get(key) || [])}
                  </td>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {formatTotal(key, nutrientTotals.get(key) || 0)}
                  </td>
                  <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                    {formatRda(key, nutrientTotals.get(key) || 0)}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>Polyphenols (proxy)</td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>{renderFoodList(polyphenolFoodDocs)}</td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>
                  {(() => {
                    const pm = displayNutrientAmount(polyphenolTotalMg)
                    if (pm > 0) {
                      if (weighted && pm < 0.05) return "trace"
                      return `${pm.toFixed(1)} mg${hasQualitativePolyphenol ? " + varies" : ""}`
                    }
                    return hasQualitativePolyphenol ? "Varies by product / preparation" : "—"
                  })()}
                </td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee"}}>—</td>
              </tr>
            </tbody>
          </table>
          <p style={{fontSize: "0.85em", color: "var(--ifm-color-content-secondary)", marginTop: "0.5rem"}}>
            Aggregate %RDA uses adult reference intakes and the summed food-level values shown above.
          </p>
          <p style={{fontSize: "0.85em", color: "var(--ifm-color-content-secondary)", marginTop: "0.35rem"}}>
            * Protein is shown as a range, benchmarked to {PROTEIN_REF_G_PER_KG} g/kg/day using a{" "}
            {PROTEIN_REFERENCE_BODY_WEIGHT_KG_MIN}-{PROTEIN_REFERENCE_BODY_WEIGHT_KG_MAX} kg reference adult range.
          </p>
        </div>
      )}
    </div>
  )
}
