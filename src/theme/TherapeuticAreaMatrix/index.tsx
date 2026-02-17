import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import Link from "@docusaurus/Link"
import Collapse from "../Collapse"

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

interface TableRow {
  target: Document
  substance: Document | null
  foods: Document[]
  mechanism: string | null
}

interface TherapeuticAreaMatrixProps {
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

function buildSubstanceToFoodsMap(
  foods: Document[],
  substances: Document[],
  substanceNameMap: Map<string, Document>
): Map<Document, Set<Document>> {
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

  // Ensure every substance exists in the map even if no foods matched yet
  substances.forEach((substance: Document) => {
    if (!map.has(substance)) {
      map.set(substance, new Set<Document>())
    }
  })

  return map
}

function extractMechanism(substance: Document, targetName: string, targetTagLabels: string[]): string | null {
  const mechanisms = substance.frontMatter.mechanisms
  if (!mechanisms || typeof mechanisms !== "object" || Array.isArray(mechanisms)) {
    return null
  }

  const mechanismsObj = mechanisms as Record<string, string>
  const substanceTagLabels = substance.tags.map((t: Tag) => t.label)

  const commonTag = substanceTagLabels.find((label: string) => targetTagLabels.includes(label))
  if (commonTag) {
    const mechanism = mechanismsObj[commonTag] || mechanismsObj[commonTag.toLowerCase()]
    if (mechanism) {
      return mechanism
    }
  }

  if (mechanismsObj[targetName]) {
    return mechanismsObj[targetName]
  }

  const lowerMatch = Object.keys(mechanismsObj).find((key: string) => key.toLowerCase() === targetName.toLowerCase())
  return lowerMatch ? mechanismsObj[lowerMatch] : null
}

export default function TherapeuticAreaMatrix({tag}: TherapeuticAreaMatrixProps): React.ReactElement {
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
    return <div>No biological targets found for therapeutic area: {tag}</div>
  }

  const substanceNameMap = buildSubstanceNameMap(uniqueSubstances)
  const substanceToFoodsMap = buildSubstanceToFoodsMap(uniqueFoods, uniqueSubstances, substanceNameMap)

  const tableData: TableRow[] = []

  therapeuticTargets.forEach((target: Document) => {
    const targetTagLabels = target.tags.map((t: Tag) => t.label)

    const supportingSubstances = uniqueSubstances.filter((substance: Document) =>
      substance.tags.some((st: Tag) => st.label === target.title || targetTagLabels.includes(st.label))
    )

    if (supportingSubstances.length === 0) {
      tableData.push({
        target,
        substance: null,
        foods: [],
        mechanism: null,
      })
      return
    }

    supportingSubstances.forEach((substance: Document) => {
      const foods = Array.from(substanceToFoodsMap.get(substance) ?? [])
      const mechanism = extractMechanism(substance, target.title, targetTagLabels)

      tableData.push({
        target,
        substance,
        foods,
        mechanism,
      })
    })
  })

  if (tableData.length === 0) {
    return <div>No biological targets found for therapeutic area: {tag}</div>
  }

  const groupedByTarget = new Map<string, TableRow[]>()
  tableData.forEach((row: TableRow) => {
    const key = row.target.permalink
    if (!groupedByTarget.has(key)) {
      groupedByTarget.set(key, [])
    }
    groupedByTarget.get(key)?.push(row)
  })

  const sortedGroups = Array.from(groupedByTarget.entries()).sort((a, b) =>
    a[1][0].target.title.localeCompare(b[1][0].target.title)
  )

  return (
    <div className="therapeutic-area-matrix">
      {sortedGroups.map(([targetKey, rows]) => {
        const target = rows[0].target

        return (
          <div key={targetKey} style={{marginBottom: "1.5rem"}}>
            <Collapse title={target.title}>
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
                    if (!row.substance) {
                      return (
                        <tr key={index}>
                          <td style={{padding: "8px", borderBottom: "1px solid #eee", color: "#999"}}>—</td>
                          <td style={{padding: "8px", borderBottom: "1px solid #eee", color: "#999"}}>—</td>
                          <td style={{padding: "8px", borderBottom: "1px solid #eee", color: "#999"}}>
                            Supported through therapeutic area targets
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
                              {row.foods.map((food: Document, i: number) => (
                                <span key={food.permalink}>
                                  <Link to={food.permalink}>{food.title}</Link>
                                  {i < row.foods.length - 1 && ", "}
                                </span>
                              ))}
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
            </Collapse>
          </div>
        )
      })}
    </div>
  )
}

