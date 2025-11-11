import React from "react"
import {formatReference, ReferenceStyle} from "./ReferenceFormatters"

/**
 * Interface representing a BibTeX entry as returned by bibtexParse.toJSON().
 *
 * @interface BibEntry
 * @property {string} entryType - The type of reference (e.g., 'article', 'book', 'inproceedings')
 * @property {Object} entryTags - Key-value pairs containing the BibTeX fields
 * @property {string} [citationKey] - The citation key used in BibTeX (e.g., 'Smith2019')
 */
export interface BibEntry {
  entryType: string
  entryTags: {
    title?: string // Publication title
    author?: string // Authors (format: "Lastname, Firstname and Lastname, Firstname")
    journal?: string // Journal name for articles
    year?: string // Publication year
    volume?: string // Journal/book volume
    number?: string // Issue number for articles
    pages?: string // Page range (e.g., "123--145")
    publisher?: string // Publisher name for books
    booktitle?: string // Title of book containing this entry (for incollection/inproceedings)
    editor?: string // Editor names
    address?: string // Publisher's address
    url?: string // URL to the publication
    doi?: string // Digital Object Identifier
    [key: string]: string | undefined // Allow for any other BibTeX fields
  }
  citationKey?: string
}

/**
 * Props for the ReferenceList component.
 *
 * @interface ReferenceListProps
 * @property {BibEntry[]} entries - Array of BibTeX entries to display
 * @property {ReferenceStyle} [style] - Citation style to use for formatting
 * @property {string} [className] - Additional CSS class for styling
 * @property {boolean} [showCitationKeys] - Whether to display citation keys
 * @property {function} [filter] - Function to filter entries
 * @property {string} [sortBy] - Field to sort entries by
 * @property {string} [sortDirection] - Direction to sort (ascending or descending)
 */
interface ReferenceListProps {
  entries: BibEntry[]
  style?: ReferenceStyle
  className?: string
  showCitationKeys?: boolean
  filter?: (entry: BibEntry) => boolean
  sortBy?: "year" | "author" | "title" | "citationKey"
  sortDirection?: "asc" | "desc"
}

/**
 * Component that displays a formatted list of BibTeX references.
 * Supports filtering, sorting, and different citation styles.
 *
 * @component
 * @param {ReferenceListProps} props - Component properties
 * @returns {JSX.Element} - The rendered reference list
 */
const ReferenceList: React.FC<ReferenceListProps> = ({
  entries,
  style = "apa",
  className = "",
  showCitationKeys = false,
  filter,
  sortBy = "year",
  sortDirection = "desc",
}) => {
  // Apply filter if provided
  // This allows the consumer to filter entries by any criteria
  let filteredEntries = filter ? entries.filter(filter) : entries

  // Create a sorted copy of the entries array
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    // Extract the values to compare based on the sortBy property
    let valueA: string | undefined
    let valueB: string | undefined

    // Determine which field to sort by
    if (sortBy === "year") {
      valueA = a.entryTags.year
      valueB = b.entryTags.year
    } else if (sortBy === "author") {
      valueA = a.entryTags.author
      valueB = b.entryTags.author
    } else if (sortBy === "title") {
      valueA = a.entryTags.title
      valueB = b.entryTags.title
    } else if (sortBy === "citationKey") {
      valueA = a.citationKey
      valueB = b.citationKey
    }

    // Handle cases where values are undefined
    if (!valueA) return sortDirection === "asc" ? -1 : 1
    if (!valueB) return sortDirection === "asc" ? 1 : -1

    // Special case for year: convert to numbers for correct numerical sorting
    if (sortBy === "year") {
      const yearA = parseInt(valueA, 10) || 0
      const yearB = parseInt(valueB, 10) || 0
      return sortDirection === "asc" ? yearA - yearB : yearB - yearA
    }

    // For string values, use localeCompare for proper string comparison
    return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
  })

  return (
    <div className={`reference-list ${className}`}>
      <ol className="references">
        {sortedEntries.map((entry, index) => (
          <li
            // Use citation key for unique ID if available, otherwise use index
            key={entry.citationKey || `ref-${index}`}
            // Add ID attribute to allow direct linking to references
            id={entry.citationKey || `ref-${index}`}
            // Add class names for styling: general reference-item class and type-specific class
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
            {/* Format and render the reference text with the specified citation style */}
            {/* Note: dangerouslySetInnerHTML is required for formatting (italics, links, etc.) */}
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
      {/* Show a message when no references match the filter criteria */}
      {sortedEntries.length === 0 && <div className="reference-list-empty">No references found</div>}
    </div>
  )
}

export default ReferenceList
