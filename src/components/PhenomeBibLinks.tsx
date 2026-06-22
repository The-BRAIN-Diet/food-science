import React from "react"

type PhenomeBibItem = {
  href: string
  label: string
  dataLevel?: string
}

function resolveDocHref(href: string): string {
  if (/^https?:\/\//i.test(href)) return href
  return new URL(href, window.location.origin).href
}

function openBibliographyTab(href: string) {
  const url = resolveDocHref(href)
  window.open(url, "_blank", "noopener,noreferrer")
  window.focus()
}

type Props = {
  items: PhenomeBibItem[]
}

/** Phenome §3 bibliography list — opens each citation in a new tab. */
export default function PhenomeBibLinks({items}: Props): React.JSX.Element {
  return (
    <ul className="phenome-bib-links">
      {items.map((item) => (
        <li key={`${item.href}:${item.label}`}>
          <a
            href={item.href}
            className="phenome-bib-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return
              }
              event.preventDefault()
              event.stopPropagation()
              openBibliographyTab(item.href)
            }}
          >
            {item.label}
            {item.dataLevel ? (
              <span className="phenome-bib-data-level"> — {item.dataLevel}</span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  )
}
