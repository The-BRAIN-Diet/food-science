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
 * Table row data structure - one row per target/substance combination
 */
interface TableRow {
  target: Document
  substance: Document
  therapeuticAreas: Document[]
  mechanism: string | null
}

/**
 * Target map entry structure
 */
interface TargetMapEntry {
  target: Document
  substances: Set<Document>
  therapeuticAreas: Set<Document>
}

/**
 * Props for FoodMatrix component
 */
interface FoodMatrixProps {
  tag: string
}

/**
 * Converts a tag label to a URL-friendly permalink
 * Matches the pattern used in tags.yml
 */
function tagLabelToPermalink(label: string): string {
  // Convert to lowercase and replace spaces/special chars with hyphens
  return `/docs/tags/${label
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`
}

/**
 * FoodMatrix component
 *
 * Creates a table showing the relationship chain:
 * Food -> Substances -> Biological Targets -> Therapeutic Areas
 *
 * Flow:
 * 1. Food document has tags that are substance names
 * 2. Substance documents have tags that are biological target names
 * 3. Biological target documents have tags that are therapeutic area names
 */
export default function FoodMatrix({tag}: FoodMatrixProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!tag) {
    return <div>Error: Food tag is required</div>
  }

  // Step 1: Get the food document(s) tagged with the given food tag
  const foodDocs = (allTags[tag] || []).filter((doc: Document) => doc.permalink.includes("/foods/"))

  if (foodDocs.length === 0) {
    return <div>No food found with tag: {tag}</div>
  }

  const foodDoc = foodDocs[0] // Use the first food document
  const foodTagLabels = foodDoc.tags.map((t: Tag) => t.label)

  // Get all documents organized by type
  const allDocs = Object.values(allTags).flat()
  const allSubstances = allDocs.filter((doc: Document) => doc.permalink.includes("/substances/"))
  const allBiologicalTargets = allDocs.filter((doc: Document) => doc.permalink.includes("/biological-targets/"))
  const allTherapeuticAreas = allDocs.filter((doc: Document) => doc.permalink.includes("/therapeutic-areas/"))

  // Remove duplicates
  const uniqueSubstances = Array.from(new Map(allSubstances.map((doc: Document) => [doc.permalink, doc])).values())
  const uniqueTargets = Array.from(new Map(allBiologicalTargets.map((doc: Document) => [doc.permalink, doc])).values())
  const uniqueAreas = Array.from(new Map(allTherapeuticAreas.map((doc: Document) => [doc.permalink, doc])).values())

  // Step 2: Find substances that match the food's tags
  // Food tags include substance names (e.g., "Omega 3")
  // A substance matches if it has a tag that matches one of the food's tags
  const relatedSubstances = uniqueSubstances.filter((substance: Document) => {
    const substanceTagLabels = substance.tags.map((t: Tag) => t.label)
    return substanceTagLabels.some((st: string) => foodTagLabels.includes(st))
  })

  // Step 3: For each substance, find biological targets
  // Substances are tagged with biological target names (e.g., "Methylation")
  // Build a map: biological target -> {substances: Set, therapeuticAreas: Set}
  const targetMap = new Map<string, TargetMapEntry>()

  relatedSubstances.forEach((substance: Document) => {
    const substanceTagLabels = substance.tags.map((t: Tag) => t.label)

    // Find biological targets that have a tag matching one of the substance's tags
    // A target matches if it has a tag that matches one of the substance's tags
    const relatedTargets = uniqueTargets.filter((target: Document) => {
      const targetTagLabels = target.tags.map((t: Tag) => t.label)
      // Check if any target tag matches any substance tag
      return targetTagLabels.some((tt: string) => substanceTagLabels.includes(tt))
    })

    relatedTargets.forEach((target: Document) => {
      if (!targetMap.has(target.permalink)) {
        targetMap.set(target.permalink, {
          target,
          substances: new Set<Document>(),
          therapeuticAreas: new Set<Document>(),
        })
      }
      const entry = targetMap.get(target.permalink)
      if (entry) {
        entry.substances.add(substance)
      }
    })
  })

  // Step 4: For each biological target, find therapeutic areas
  // Biological targets are tagged with therapeutic area names (e.g., "ADHD")
  targetMap.forEach((entry: TargetMapEntry) => {
    const targetTagLabels = entry.target.tags.map((t: Tag) => t.label)

    // Find therapeutic areas that have a tag matching one of the target's tags
    // An area matches if it has a tag that matches one of the target's tags
    const relatedAreas = uniqueAreas.filter((area: Document) => {
      const areaTagLabels = area.tags.map((t: Tag) => t.label)
      // Check if any area tag matches any target tag
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

    // Get the biological target's name tag (e.g., "Inflammation", "Methylation")
    const targetNameTag =
      entry.target.tags.find((t: Tag) => t.label === entry.target.title || entry.target.tags.some((tag: Tag) => tag.label === "Biological Target")) ||
      entry.target.tags.find((t: Tag) => !["Biological Target"].includes(t.label))
    const targetName = targetNameTag?.label || entry.target.title

    // Create a row for each substance
    Array.from(entry.substances).forEach((substance: Document) => {
      // Extract mechanism from substance frontMatter
      let mechanism: string | null = null
      const mechanisms = substance.frontMatter.mechanisms

      if (mechanisms && typeof mechanisms === "object" && !Array.isArray(mechanisms)) {
        const mechanismsObj = mechanisms as Record<string, string>

        // Find the common tag between substance and target (this is the biological target name)
        // The mechanism key should match this common tag
        const substanceTagLabels = substance.tags.map((t: Tag) => t.label)
        const targetTagLabels = entry.target.tags.map((t: Tag) => t.label)

        // Find a tag that appears in both substance and target tags (excluding classification tags)
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

        // Try to find mechanism using the common tag
        if (commonTag) {
          mechanism = mechanismsObj[commonTag] || null

          // If not found, try case-insensitive match
          if (!mechanism) {
            const commonTagLower = commonTag.toLowerCase()
            const matchingKey = Object.keys(mechanismsObj).find((key: string) => key.toLowerCase() === commonTagLower)
            mechanism = matchingKey ? mechanismsObj[matchingKey] : null
          }
        }

        // Fallback: try with targetName
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
        mechanism,
      })
    })
  })

  // Sort by biological target title, then by substance title
  tableData.sort((a: TableRow, b: TableRow) => {
    const targetCompare = a.target.title.localeCompare(b.target.title)
    if (targetCompare !== 0) return targetCompare
    return a.substance.title.localeCompare(b.substance.title)
  })

  if (tableData.length === 0) {
    return <div>No biological targets found for food: {tag}</div>
  }

  // List of classification tags to exclude when finding substance name tags
  const substanceClassificationTags = [
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
  ]

  return (
    <div className="food-matrix">
      <table style={{width: "100%", borderCollapse: "collapse"}}>
        <thead>
          <tr>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Biological Target</th>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Substance</th>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Therapeutic Areas</th>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>Mechanism of Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: TableRow, index: number) => {
            // Find the substance's own tag (e.g., "Omega 3") to create a link
            const substanceNameTag =
              row.substance.tags.find((t: Tag) => {
                const tagLower = t.label.toLowerCase()
                const titleLower = row.substance.title.toLowerCase()
                return tagLower === titleLower || titleLower.includes(tagLower) || tagLower.includes(titleLower.split("(")[0].trim())
              }) || row.substance.tags.find((t: Tag) => !substanceClassificationTags.includes(t.label))
            const substanceTagLabel = substanceNameTag?.label || row.substance.title

            return (
              <tr key={index}>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  <Link to={row.target.permalink}>{row.target.title}</Link>
                </td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  <Link to={tagLabelToPermalink(substanceTagLabel)}>{row.substance.title}</Link>
                </td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  {row.therapeuticAreas.length > 0 ? (
                    <div>
                      {row.therapeuticAreas.map((area: Document, i: number) => {
                        // Find the therapeutic area's own tag (e.g., "ADHD") to create a link
                        const areaNameTag =
                          area.tags.find((t: Tag) => {
                            const tagLower = t.label.toLowerCase()
                            const titleLower = area.title.toLowerCase()
                            return (
                              tagLower === titleLower ||
                              titleLower.includes(tagLower) ||
                              tagLower.includes(titleLower.split("(")[0].trim().split("&")[0].trim())
                            )
                          }) || area.tags.find((t: Tag) => !["Therapeutic Area"].includes(t.label))
                        const tagLabel = areaNameTag?.label || area.title
                        return (
                          <span key={i}>
                            <Link to={tagLabelToPermalink(tagLabel)}>{area.title}</Link>
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
