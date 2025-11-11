import React from "react"
import {formatReference, ReferenceStyle, BibEntry} from "./ReferenceFormatters"

interface ReferenceListProps {
  entries: BibEntry[]
  style?: ReferenceStyle
  showCitationKeys?: boolean
  filter?: (entry: BibEntry) => boolean
  sortBy?: "year" | "author" | "title" | "citationKey"
  sortDirection?: "asc" | "desc"
}

export default function ReferenceList({
  entries,
  style = "apa",
  showCitationKeys = false,
  filter,
  sortBy = "year",
  sortDirection = "desc",
}: ReferenceListProps): React.JSX.Element {
  // Apply filter if provided
  let filteredEntries = filter ? entries.filter(filter) : entries

  // Sort entries
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    let valueA: string | number = ""
    let valueB: string | number = ""

    if (sortBy === "year") {
      valueA = parseInt(a.entryTags.year || "0", 10)
      valueB = parseInt(b.entryTags.year || "0", 10)
    } else if (sortBy === "author") {
      valueA = a.entryTags.author || ""
      valueB = b.entryTags.author || ""
    } else if (sortBy === "title") {
      valueA = a.entryTags.title || ""
      valueB = b.entryTags.title || ""
    } else if (sortBy === "citationKey") {
      valueA = a.citationKey || ""
      valueB = b.citationKey || ""
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA
    }

    const comparison = String(valueA).localeCompare(String(valueB))
    return sortDirection === "asc" ? comparison : -comparison
  })

  if (sortedEntries.length === 0) {
    return <div className="reference-list-empty">No references found</div>
  }

  return (
    <ol className="references">
      {sortedEntries.map((entry, index) => (
        <li
          key={entry.citationKey || `ref-${index}`}
          id={entry.citationKey || `ref-${index}`}
          className={`reference-item reference-type-${entry.entryType.toLowerCase()}`}>
          {/* Anchor link for direct linking to this reference */}
          {entry.citationKey && (
            <a
              href={`#${entry.citationKey}`}
              className="reference-anchor"
              aria-label={`Link to reference ${entry.citationKey}`}
              title={`Link to reference ${entry.citationKey}`}>
              #
            </a>
          )}
          {/* Optionally display citation keys in brackets */}
          {showCitationKeys && entry.citationKey && <span className="citation-key">[{entry.citationKey}] </span>}
          {/* Format and render the reference text */}
          <span
            className="reference-text"
            dangerouslySetInnerHTML={{
              __html: formatReference(entry, style),
            }}
          />
          {/* Clickable link at the end of the reference */}
          {entry.citationKey && (
            <a
              href={`#${entry.citationKey}`}
              className="reference-link"
              aria-label={`Link to reference ${entry.citationKey}`}
              title={`Link to reference ${entry.citationKey}`}>
              {entry.citationKey}
            </a>
          )}
        </li>
      ))}
    </ol>
  )
}

export type {BibEntry} from "./ReferenceFormatters"
