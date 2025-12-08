import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import Link from "@docusaurus/Link"

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
 * Table row data structure - one row per biological target
 */
interface TableRow {
  target: Document
  therapeuticAreas: Document[]
  mechanism: string | null
}

/**
 * Props for SubstanceMatrix component
 */
interface SubstanceMatrixProps {
  tag: string
}

/**
 * SubstanceMatrix component
 *
 * Creates a table showing the relationship chain:
 * Substance -> Biological Targets -> Therapeutic Areas
 *
 * Flow:
 * 1. Substance document has tags that are biological target names
 * 2. Biological target documents have tags that are therapeutic area names
 */
export default function SubstanceMatrix({tag}: SubstanceMatrixProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!tag) {
    return <div>Error: Substance tag is required</div>
  }

  // Step 1: Get the substance document(s) tagged with the given substance tag
  // First try to find by tag, but also search all substances if needed
  const allDocs = Object.values(allTags).flat()
  const allSubstances = allDocs.filter((doc: Document) => doc.permalink.includes("/substances/"))
  
  // Remove duplicates
  const uniqueSubstances = Array.from(
    new Map(allSubstances.map((doc: Document) => [doc.permalink, doc])).values()
  )

  // Find substance by tag - check both direct tag matches and normalized matches
  const getSubstanceName = (title: string): string => {
    return title.split("(")[0].trim()
  }
  
  const substanceName = getSubstanceName(tag)
  let substanceDoc: Document | undefined = undefined
  
  // First try to find in allTags[tag]
  const taggedSubstances = (allTags[tag] || []).filter((doc: Document) => doc.permalink.includes("/substances/"))
  if (taggedSubstances.length > 0) {
    substanceDoc = taggedSubstances[0]
  } else {
    // If not found, search all substances by checking their tags
    substanceDoc = uniqueSubstances.find((substance: Document) => {
      const substanceTagLabels = substance.tags.map((t: Tag) => t.label)
      return substanceTagLabels.some((substanceTag: string) => {
        const normalizedSubstanceTag = getSubstanceName(substanceTag)
        return substanceTag === tag || substanceTag === substanceName || normalizedSubstanceTag === substanceName
      })
    })
  }

  if (!substanceDoc) {
    return <div>No substance found with tag: {tag}</div>
  }

  const substanceTagLabels = substanceDoc.tags.map((t: Tag) => t.label)

  // Get all documents organized by type
  const allBiologicalTargets = allDocs.filter((doc: Document) => doc.permalink.includes("/biological-targets/"))
  const allTherapeuticAreas = allDocs.filter((doc: Document) => doc.permalink.includes("/therapeutic-areas/"))

  // Classification tags to exclude when finding biological target names
  const biologicalTargetClassificationTags = ["Biological Target"]

  // Step 2: Find all biological targets tagged on this substance
  const biologicalTargets: Document[] = []
  for (const substanceTagLabel of substanceTagLabels) {
    const targetDocs = (allTags[substanceTagLabel] || []).filter((doc: Document) => doc.permalink.includes("/biological-targets/"))
    biologicalTargets.push(...targetDocs)
  }

  // Remove duplicates
  const uniqueTargets = Array.from(new Map(biologicalTargets.map((doc) => [doc.permalink, doc])).values())

  if (uniqueTargets.length === 0) {
    return <div>No biological targets found for substance: {tag}</div>
  }

  // Step 3: For each biological target, find therapeutic areas and extract mechanism
  const tableData: TableRow[] = []

  for (const target of uniqueTargets) {
    const targetTagLabels = target.tags.map((t: Tag) => t.label)

    // Find therapeutic areas tagged on this biological target
    const therapeuticAreas: Document[] = []
    for (const targetTagLabel of targetTagLabels) {
      const areaDocs = (allTags[targetTagLabel] || []).filter((doc: Document) => doc.permalink.includes("/therapeutic-areas/"))
      therapeuticAreas.push(...areaDocs)
    }

    // Remove duplicates
    const uniqueTherapeuticAreas = Array.from(new Map(therapeuticAreas.map((doc) => [doc.permalink, doc])).values())

    // Extract mechanism from substance frontMatter
    let mechanism: string | null = null
    const mechanisms = substanceDoc.frontMatter.mechanisms

    if (mechanisms && typeof mechanisms === "object" && !Array.isArray(mechanisms)) {
      const mechanismsObj = mechanisms as Record<string, string>

      // Find the biological target name tag (excluding classification tags)
      const targetNameTag = target.tags.find((t: Tag) => !biologicalTargetClassificationTags.includes(t.label))
      const targetName = targetNameTag?.label || target.title

      // Try to find mechanism using the target name
      mechanism = mechanismsObj[targetName] || null

      // If not found, try case-insensitive match
      if (!mechanism) {
        const targetNameLower = targetName.toLowerCase()
        const matchingKey = Object.keys(mechanismsObj).find((key: string) => key.toLowerCase() === targetNameLower)
        mechanism = matchingKey ? mechanismsObj[matchingKey] : null
      }
    }

    tableData.push({
      target,
      therapeuticAreas: uniqueTherapeuticAreas,
      mechanism,
    })
  }

  // Sort by biological target title
  tableData.sort((a: TableRow, b: TableRow) => {
    return a.target.title.localeCompare(b.target.title)
  })

  return (
    <div className="substance-matrix">
      <table style={{width: "100%", borderCollapse: "collapse"}}>
        <thead>
          <tr>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Biological Target</th>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Therapeutic Areas</th>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Mechanism of Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: TableRow, index: number) => {
            return (
              <tr key={index}>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  <Link to={row.target.permalink}>{row.target.title}</Link>
                </td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  {row.therapeuticAreas.length > 0 ? (
                    <div>
                      {row.therapeuticAreas.map((area: Document, i: number) => {
                        return (
                          <span key={i}>
                            <Link to={area.permalink}>{area.title}</Link>
                            {i < row.therapeuticAreas.length - 1 && ", "}
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
}
