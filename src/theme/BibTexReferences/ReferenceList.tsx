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
  const filteredEntries = filter ? entries.filter(filter) : entries

  // Deduplicate entries that represent the same reference (e.g. multiple keys for same DOI/title)
  const dedupedEntries: BibEntry[] = []
  const signatureMap = new Map<string, BibEntry>()

  function getSignature(entry: BibEntry): string {
    const tags = entry.entryTags || {}
    const doi = (tags.doi || "").trim().toLowerCase()
    const url = (tags.url || "").trim().toLowerCase()
    const title = (tags.title || "").trim().toLowerCase()
    const year = (tags.year || "").trim()
    const author = (tags.author || "").trim().toLowerCase()

    return (
      (doi && `doi:${doi}`) ||
      (url && `url:${url}`) ||
      (title && `${title}|${year}|${author}`) ||
      (entry.citationKey ? `key:${entry.citationKey}` : "")
    )
  }

  function getMetadataScore(entry: BibEntry): number {
    const tags = entry.entryTags || {}
    let score = 0
    if ((tags.author || "").trim()) score += 2
    if ((tags.year || "").trim()) score += 1
    if ((tags.title || "").trim()) score += 2
    if ((tags.journal || tags.booktitle || "").trim()) score += 1
    if ((tags.pages || "").trim()) score += 1
    if ((tags.doi || "").trim()) score += 1
    if ((tags.url || "").trim()) score += 1
    return score
  }

  filteredEntries.forEach((entry: BibEntry) => {
    const signature = getSignature(entry)

    // If we can't build any signature, keep the entry (very rare)
    if (!signature) {
      dedupedEntries.push(entry)
      return
    }

    const existing = signatureMap.get(signature)
    if (!existing) {
      signatureMap.set(signature, entry)
      return
    }

    // Prefer the entry with richer metadata (more complete citation)
    const existingScore = getMetadataScore(existing)
    const newScore = getMetadataScore(entry)
    if (newScore > existingScore) {
      signatureMap.set(signature, entry)
    }
  })

  // Collect deduped entries from the map, plus any no-signature fallbacks we already pushed
  dedupedEntries.push(...signatureMap.values())

  // Sort entries
  const sortedEntries = [...dedupedEntries].sort((a, b) => {
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
          {entry.citationKey && (() => {
            const tags = entry.entryTags || {}
            const rawUrl = (tags.url || "").trim()
            const rawDoi = (tags.doi || "").trim()

            // Prefer external URL, then DOI
            const externalHref = rawUrl || (rawDoi ? `https://doi.org/${rawDoi}` : "")
            if (!externalHref) {
              // No external link available – don't render a self-link
              return null
            }

            const href = externalHref

            return (
              <a
                href={href}
                className="reference-link"
                aria-label={`Link to reference ${entry.citationKey}`}
                title={href}
                target="_blank"
                rel="noopener noreferrer">
                {href}
              </a>
            )
          })()}
        </li>
      ))}
    </ol>
  )
}

export type {BibEntry} from "./ReferenceFormatters"
