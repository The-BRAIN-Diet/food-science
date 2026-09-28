import React, {type ReactNode} from "react"

export type EvidencePresentationKind = "spotlight" | "check"

export type EvidencePresentationProps = {
  kind: EvidencePresentationKind
  title: string
  exposureContext: string
  summary: ReactNode
  children?: ReactNode
}

const PRESENTATION_LABELS: Record<EvidencePresentationKind, string> = {
  spotlight: "🔬 Research Spotlight",
  check: "🔎 Evidence Check",
}

/**
 * Reader-facing projection of an evidence relationship.
 *
 * This component deliberately stores no evidence record. Callers provide a
 * summary and references from the canonical page/PM evidence source while the
 * tested exposure remains explicit on the relationship.
 */
export default function EvidencePresentation({
  kind,
  title,
  exposureContext,
  summary,
  children,
}: EvidencePresentationProps): React.JSX.Element {
  const context = String(exposureContext || "").trim()

  return (
    <aside className={`evidence-presentation evidence-presentation--${kind}`}>
      <p className="evidence-presentation__meta">
        <strong>{PRESENTATION_LABELS[kind]}</strong>
        <span aria-hidden="true"> · </span>
        <span>{context || "Exposure context not stated"}</span>
      </p>
      <h3 className="evidence-presentation__title">{title}</h3>
      <div className="evidence-presentation__summary">{summary}</div>
      {children ? (
        <details className="evidence-presentation__details">
          <summary>Read the evidence</summary>
          <div className="evidence-presentation__body">{children}</div>
        </details>
      ) : null}
    </aside>
  )
}
