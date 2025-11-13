import React, {useMemo} from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import ReferenceList, {BibEntry} from "./ReferenceList"
import {ReferenceStyle} from "./ReferenceFormatters"

/**
 * Props for the BibTexReferences component.
 */
interface BibTexReferencesProps {
  fileId: string
  title?: string
  style?: ReferenceStyle
  showCitationKeys?: boolean
  filter?: (entry: BibEntry) => boolean
  sortBy?: "year" | "author" | "title" | "citationKey"
  sortDirection?: "asc" | "desc"
  className?: string
}

/**
 * Theme component for displaying BibTeX references.
 * Loads data from the bibtex-loader plugin and displays it.
 */
export default function BibTexReferences({
  fileId,
  title,
  style = "apa",
  showCitationKeys = false,
  filter,
  sortBy = "year",
  sortDirection = "desc",
  className = "",
}: BibTexReferencesProps): React.JSX.Element {
  const globalData = usePluginData("bibtex-loader")
  const bibtexData = globalData?.[fileId] as {entries?: BibEntry[]; path?: string} | undefined

  // Extract entries from the plugin data
  const entries = useMemo(() => {
    if (bibtexData && bibtexData.entries && Array.isArray(bibtexData.entries)) {
      return bibtexData.entries
    }
    return []
  }, [bibtexData])

  // Show error if file not found
  if (!bibtexData || !entries.length) {
    return (
      <div className="bibtex-error">
        <p>BibTeX file with id "{fileId}" not found or has no entries.</p>
      </div>
    )
  }

  return (
    <div className={`bibtex-references ${className}`}>
      {title && <h2 className="bibtex-references-title">{title}</h2>}
      <ReferenceList entries={entries} style={style} showCitationKeys={showCitationKeys} filter={filter} sortBy={sortBy} sortDirection={sortDirection} />
    </div>
  )
}
