import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import Link from "@docusaurus/Link"

interface Tag {
  label: string
  permalink?: string
}

interface Document {
  title: string
  permalink: string
  description?: string
  order: number
  tags: Tag[]
  frontMatter: Record<string, unknown>
}

type TagToDocMap = Record<string, Document[]>

interface TherapeuticAreaFoodSpreadsheetProps {
  tag: string
}

const GENERIC_SUBSTANCE_TAGS = [
  "Substance",
  "Nutrient",
  "Mineral",
  "Vitamin",
  "Fatty Acid",
  "Amino Acid",
  "Bioactive",
  "Metabolite",
  "Essential Amino Acid",
  "Nonessential Amino Acid",
  "Phospholipid",
  "Polyphenol",
  "Flavonoid",
  "Carotenoid",
  "Terpene",
  "Lipid",
]

const CATEGORY_ORDER = [
  "Vegan Specialities",
  "Condiments",
  "Vegetables",
  "Fruits & Berries",
  "Whole Grains & Pseudograins",
  "Legumes & Pulses",
  "Nuts & Seeds",
  "Seafood",
  "Meat & Organ Meats",
  "Dairy & Eggs",
  "Fats & Oils",
  "Fermented Foods",
  "Herbs & Spices",
  "Beverages",
  "Other / Misc",
]

function normalizeTitle(title: string): string {
  return (title || "").toLowerCase()
}

function inferCategoryFromTitle(doc: Pick<Document, "title">): string | null {
  const t = normalizeTitle(doc.title)

  if (
    t.includes("algal oil") ||
    t.includes("duckweed") ||
    t.includes("mankai") ||
    t.includes("nutritional yeast") ||
    t.includes("fortified plant milks")
  ) {
    return "Vegan Specialities"
  }

  if (["vinegar", "hot sauce", "fermented hot sauce", "wasabi", "sauce"].some(name => t.includes(name))) {
    return "Condiments"
  }

  if (t.includes("mushroom")) {
    return "Vegetables"
  }

  if (
    [
      "salmon",
      "mackerel",
      "sardines",
      "herring",
      "tuna",
      "cod",
      "scallops",
      "shrimp",
      "mussels",
      "oysters",
      "clams",
    ].some(name => t.includes(name)) ||
    t.includes("fish roe") ||
    t.includes("salmon roe") ||
    t.includes("lumpfish roe") ||
    t.includes("seaweed")
  ) {
    return "Seafood"
  }

  // Meat & organ meats (kidney = organ only; "kidney beans" → Legumes)
  if (
    ["beef", "lamb", "pork", "turkey", "chicken"].some(name => t.includes(name)) ||
    t.includes("organ meats") ||
    t.includes("liver") ||
    (t.includes("kidney") && !t.includes("kidney beans")) ||
    t.includes("heart") ||
    t.includes("dark-meat poultry")
  ) {
    return "Meat & Organ Meats"
  }

  if (["milk", "yogurt", "cheese", "kefir", "eggs", "egg yolks"].some(name => t.includes(name)) || t.includes("dairy")) {
    return "Dairy & Eggs"
  }

  if (
    [
      "olive oil",
      "extra virgin olive oil",
      "early harvest olive oil",
      "avocado oil",
      "coconut oil",
      "duck fat",
      "mct oil",
    ].some(name => t.includes(name)) ||
    t.includes("butter") ||
    t.includes("ghee")
  ) {
    return "Fats & Oils"
  }

  if (["kimchi", "sauerkraut", "kombucha", "miso", "tempeh", "natto", "fermented vegetables"].some(name => t.includes(name))) {
    return "Fermented Foods"
  }

  if (
    [
      "herbs",
      "parsley",
      "cilantro",
      "rosemary",
      "sage",
      "oregano",
      "peppermint",
      "lemon balm",
      "cinnamon",
      "ginger",
      "saffron",
      "turmeric",
      "black pepper",
      "capers",
    ].some(name => t.includes(name))
  ) {
    return "Herbs & Spices"
  }

  if (["coffee", "green tea", "black tea", "chamomile", "masala/ chai", "masala/chai", "chai"].some(name => t.includes(name))) {
    return "Beverages"
  }

  if (["oats", "barley", "quinoa", "amaranth", "buckwheat", "spelt", "whole grains", "wheat", "rice"].some(name => t.includes(name))) {
    return "Whole Grains & Pseudograins"
  }

  if (["lentils", "chickpeas", "black beans", "kidney beans", "kidney", "peas", "lupins", "soy", "edamame"].some(name => t.includes(name))) {
    return "Legumes & Pulses"
  }

  if (
    [
      "almonds",
      "cashews",
      "walnuts",
      "pistachios",
      "pumpkin seeds",
      "sesame seeds",
      "sunflower seeds",
      "chia seeds",
      "flax seeds",
      "tahini",
    ].some(name => t.includes(name))
  ) {
    return "Nuts & Seeds"
  }

  if (
    [
      "apples",
      "bananas",
      "green bananas",
      "berries",
      "blueberries",
      "strawberries",
      "raspberries",
      "cranberries",
      "grapes",
      "oranges",
      "citrus",
      "pomegranates",
      "cherries",
      "tart cherry",
      "lemon",
    ].some(name => t.includes(name))
  ) {
    return "Fruits & Berries"
  }

  if (
    [
      "broccoli",
      "cauliflower",
      "jerusalem artichokes",
      "carrots",
      "beetroot",
      "bell peppers",
      "kale",
      "spinach",
      "onions",
      "leeks",
      "dandelion greens",
      "brussels sprouts",
      "cabbage",
      "mushrooms",
      "asparagus",
      "cucumber",
      "potatoes",
      "purple potatoes",
      "pumpkin",
      "swiss chard",
    ].some(name => t.includes(name))
  ) {
    return "Vegetables"
  }

  return null
}

function getNormalizedName(title: string): string {
  return title.split("(")[0].trim()
}

function buildSubstanceNameMap(substances: Document[]): Map<string, Document> {
  const map = new Map<string, Document>()

  substances.forEach((substance: Document) => {
    const primaryName = getNormalizedName(substance.title)
    map.set(primaryName, substance)

    const sidebarLabel = substance.frontMatter.sidebar_label as string | undefined
    if (sidebarLabel) {
      const sidebarName = getNormalizedName(sidebarLabel)
      if (sidebarName !== primaryName) {
        map.set(sidebarName, substance)
      }
      map.set(sidebarLabel, substance)
    }

    substance.tags.forEach((tag: Tag) => {
      if (!GENERIC_SUBSTANCE_TAGS.includes(tag.label) && !map.has(tag.label)) {
        map.set(tag.label, substance)
      }
    })
  })

  return map
}

function buildSubstanceToFoodsMap(foods: Document[], substances: Document[], substanceNameMap: Map<string, Document>): Map<Document, Set<Document>> {
  const map = new Map<Document, Set<Document>>()

  foods.forEach((food: Document) => {
    const foodSubstances = food.tags
      .map((tag: Tag) => substanceNameMap.get(tag.label))
      .filter((substance: Document | undefined): substance is Document => substance !== undefined)

    foodSubstances.forEach((substance: Document) => {
      if (!map.has(substance)) {
        map.set(substance, new Set<Document>())
      }
      map.get(substance)?.add(food)
    })
  })

  substances.forEach((substance: Document) => {
    if (!map.has(substance)) {
      map.set(substance, new Set<Document>())
    }
  })

  return map
}

function getDocCategory(doc: Pick<Document, "title" | "tags">): string {
  const labels = (doc.tags ?? []).map((t: Tag) => t.label)
  const match = CATEGORY_ORDER.find(cat => labels.includes(cat))
  if (match) return match
  return inferCategoryFromTitle(doc) ?? "Other / Misc"
}

export default function TherapeuticAreaFoodSpreadsheet({tag}: TherapeuticAreaFoodSpreadsheetProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!tag) {
    return <div>Error: Therapeutic area tag is required</div>
  }

  const allDocs = Object.values(allTags).flat()
  const allFoods = allDocs.filter((doc: Document) => doc.permalink.includes("/foods/"))
  const allSubstances = allDocs.filter((doc: Document) => doc.permalink.includes("/substances/"))
  const allTargets = allDocs.filter((doc: Document) => doc.permalink.includes("/biological-targets/"))

  const uniqueFoods = Array.from(new Map(allFoods.map((doc: Document) => [doc.permalink, doc])).values())
  const uniqueSubstances = Array.from(new Map(allSubstances.map((doc: Document) => [doc.permalink, doc])).values())
  const uniqueTargets = Array.from(new Map(allTargets.map((doc: Document) => [doc.permalink, doc])).values())

  const therapeuticTargets = uniqueTargets.filter((target: Document) => target.tags.some((t: Tag) => t.label === tag))
  if (therapeuticTargets.length === 0) {
    return <em>no foods found</em>
  }

  const substanceNameMap = buildSubstanceNameMap(uniqueSubstances)
  const substanceToFoodsMap = buildSubstanceToFoodsMap(uniqueFoods, uniqueSubstances, substanceNameMap)

  const foodsInMatrix = new Map<string, Document>()

  therapeuticTargets.forEach((target: Document) => {
    const targetTagLabels = target.tags.map((t: Tag) => t.label)

    const supportingSubstances = uniqueSubstances.filter((substance: Document) =>
      substance.tags.some((st: Tag) => st.label === target.title || targetTagLabels.includes(st.label))
    )

    supportingSubstances.forEach((substance: Document) => {
      const foods = Array.from(substanceToFoodsMap.get(substance) ?? [])
      foods.forEach((food: Document) => foodsInMatrix.set(food.permalink, food))
    })
  })

  const foods = Array.from(foodsInMatrix.values())
  if (!foods.length) {
    return <em>no foods found</em>
  }

  const groups: Record<string, Document[]> = {}
  foods.forEach((doc: Document) => {
    const cat = getDocCategory(doc)
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(doc)
  })

  const categories = CATEGORY_ORDER.filter(cat => groups[cat]?.length)

  return (
    <div style={{overflowX: "auto"}}>
      {categories.map(category => {
        const docs = groups[category].slice().sort((a, b) => a.title.localeCompare(b.title))

        const rows: Document[][] = []
        for (let i = 0; i < docs.length; i += 3) {
          rows.push(docs.slice(i, i + 3))
        }

        return (
          <section key={category} style={{marginBottom: "2rem"}}>
            <h3>{category}</h3>
            <table className="table">
              <thead>
                <tr>
                  <th style={{width: "33%"}}>Food</th>
                  <th style={{width: "33%"}}>Food</th>
                  <th style={{width: "34%"}}>Food</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map(doc => (
                      <td key={doc.permalink}>
                        <Link to={doc.permalink}>{doc.title}</Link>
                      </td>
                    ))}
                    {Array.from({length: 3 - row.length})
                      .fill(null)
                      .map((_, idx) => (
                        <td key={`empty-${rowIndex}-${idx}`} />
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )
      })}
    </div>
  )
}

