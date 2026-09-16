import React, {useEffect, useId, useRef, type ReactNode} from "react"
import Mermaid from "@theme/Mermaid"

function escapeMermaidText(value: string): string {
  return value.replace(/["#]/g, " ").replace(/\s+/g, " ").trim()
}

export default function AccessibleMermaid({
  value,
  title,
  description,
}: {
  value: string
  title: string
  description: string
}): ReactNode {
  const wrapRef = useRef<HTMLDivElement>(null)
  const titleId = useId().replace(/:/g, "")
  const descId = useId().replace(/:/g, "")
  const safeTitle = escapeMermaidText(title)
  const safeDescription = escapeMermaidText(description)
  const chart = value.replace(
    /^(flowchart\s+TD)\s*/i,
    `$1\n    accTitle: ${safeTitle}\n    accDescr {\n        ${safeDescription}\n    }\n`,
  )

  useEffect(() => {
    const root = wrapRef.current
    if (!root) return
    const apply = () => {
      const svg = root.querySelector("svg")
      if (!svg) return false
      svg.setAttribute("role", "img")
      svg.setAttribute("aria-labelledby", `${titleId} ${descId}`)
      let titleEl = svg.querySelector("title")
      if (!titleEl) {
        titleEl = document.createElementNS("http://www.w3.org/2000/svg", "title")
        svg.prepend(titleEl)
      }
      titleEl.id = titleId
      titleEl.textContent = title
      let descEl = svg.querySelector("desc")
      if (!descEl) {
        descEl = document.createElementNS("http://www.w3.org/2000/svg", "desc")
        titleEl.insertAdjacentElement("afterend", descEl)
      }
      descEl.id = descId
      descEl.textContent = description
      return true
    }
    if (apply()) return
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect()
    })
    observer.observe(root, {childList: true, subtree: true})
    return () => observer.disconnect()
  }, [title, description, titleId, descId, chart])

  return (
    <div className="accessible-mermaid" ref={wrapRef}>
      <Mermaid value={chart} />
    </div>
  )
}
