import React, { useEffect, useRef } from "react"
import { initBrsFmHubDropdowns } from "../client/brsFmHubDropdown"

/**
 * Canonical Scientific Finding renderer — audience-layered presentation.
 *
 * Outer disclosure matches PM §4 Mechanistic Basis hub blocks (green chevron,
 * brs-fm-hub-summary title). Inner "Explore the evidence" and study rows use
 * the same hub disclosure pattern.
 */

export type EvidenceSource = "repository-inherited" | "bounded-external-search"

export type IndividualStudyAssessment = {
  study: string
  population: string
  result: string
  effect_magnitude: string
  evidence_summary: string
  limitations: string
}

export type EvidenceConsideredItem = {
  label: string
  href?: string
  citation_key?: string
  data_level?: string
  directional_finding: string
  evidence_source: EvidenceSource
  assessment?: IndividualStudyAssessment
}

export type ConnectedSupportiveItem = {
  label: string
  href?: string
  data_level?: string
  why_relevant: string
  why_excluded: string
}

export type ScientificFindingData = {
  id: string
  finding_label?: string
  finding_statement: string
  finding_summary?: string
  finding_interpretation?: string
  finding_discriminator?: string
  synthesised_evidence_confidence: string
  synthesis: string
  synthesis_limitations: string
  evidence_considered: EvidenceConsideredItem[]
  connected_supportive_evidence?: ConnectedSupportiveItem[]
  evidence_dependency?: string[]
  informs?: Array<{phenome: string; href?: string}>
}

const EVIDENCE_SOURCE_LABELS: Record<string, string> = {
  "repository-inherited": "Inherited repository evidence",
  "bounded-external-search": "Bounded external search",
}

function formatSec(value: string): string {
  return String(value || "").trim() === "not-yet-scored" ? "Not yet scored" : String(value)
}

function readerTitle(finding: ScientificFindingData): string {
  return String(finding.finding_label || "").trim() || finding.id
}

function Citation({
  label,
  href,
  dataLevel,
}: {
  label: string
  href?: string
  dataLevel?: string
}): React.JSX.Element {
  return (
    <>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <span>{label}</span>
      )}
      {dataLevel ? <span className="brain-sf-data-level"> — {dataLevel}</span> : null}
    </>
  )
}

function Assessment({
  assessment,
  source,
  reference,
}: {
  assessment: IndividualStudyAssessment
  source: EvidenceSource
  reference: React.JSX.Element
}): React.JSX.Element {
  const rows: Array<[string, React.ReactNode]> = [
    ["Study", assessment.study],
    ["Population", assessment.population],
    ["Result", assessment.result],
    ["Effect / Magnitude", assessment.effect_magnitude],
    ["Evidence Summary", assessment.evidence_summary],
    ["Limitations", assessment.limitations],
    ["Evidence Source", EVIDENCE_SOURCE_LABELS[source] || source],
    ["Reference", reference],
  ]
  return (
    <dl className="brain-sf-isa">
      {rows.map(([term, value]) => (
        <React.Fragment key={term}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </React.Fragment>
      ))}
    </dl>
  )
}

function HubDisclosure({
  label,
  children,
  className = "",
}: {
  label: React.ReactNode
  children: React.ReactNode
  className?: string
}): React.JSX.Element {
  return (
    <div className={`brs-fm-hub-item brain-sf-disclosure ${className}`.trim()} data-brs-fm-hub>
      <div className="brs-fm-hub-shell">
        <button type="button" className="brs-fm-hub-summary" aria-expanded="false">
          <span className="brs-fm-hub-chevron" aria-hidden="true" />
          <strong>{label}</strong>
        </button>
        <div className="brs-fm-hub-panel" hidden>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ScientificFinding({
  finding,
}: {
  finding: ScientificFindingData
}): React.JSX.Element {
  const rootRef = useRef<HTMLElement>(null)
  const connected = finding.connected_supportive_evidence || []
  const dependency = finding.evidence_dependency || []
  const informs = finding.informs || []
  const title = readerTitle(finding)
  const anchor = finding.id.toLowerCase()
  const summary = String(finding.finding_summary || "").trim()
  const interpretation = String(finding.finding_interpretation || "").trim()

  useEffect(() => {
    if (rootRef.current) {
      initBrsFmHubDropdowns(rootRef.current)
    }
  }, [finding.id])

  return (
    <section
      ref={rootRef}
      className="brain-sf"
      id={anchor}
      aria-label={title}
    >
      <div className="brs-fm-hub-item brain-sf-finding" data-brs-fm-hub>
        <div className="brs-fm-hub-shell">
          <button type="button" className="brs-fm-hub-summary" aria-expanded="false">
            <span className="brs-fm-hub-chevron" aria-hidden="true" />
            <strong>{title}</strong>
          </button>
          <div className="brs-fm-hub-panel" hidden>
            {summary ? <p className="brain-sf-lead">{summary}</p> : null}

            {interpretation ? (
              <div className="brain-sf-interpretation">
                <p className="brain-sf-interpretation-label">
                  <strong>What this means</strong>
                </p>
                <p className="brain-sf-interpretation-body">{interpretation}</p>
              </div>
            ) : null}

            <p className="brain-sf-confidence-compact">
              <strong>Evidence confidence:</strong>{" "}
              <span className="brain-sf-sec">{formatSec(finding.synthesised_evidence_confidence)}</span>
            </p>

            <HubDisclosure label="Explore the evidence">
              <p className="brain-sf-audit-id">
                <strong>Finding ID:</strong> <code>{finding.id}</code>
              </p>

              <p className="brain-sf-field">
                <strong>Finding Statement:</strong> {finding.finding_statement}
              </p>

              {finding.finding_discriminator ? (
                <p className="brain-sf-field">
                  <strong>Finding Discriminator:</strong> {finding.finding_discriminator}
                </p>
              ) : null}

              <p className="brain-sf-field">
                <strong>Synthesised Evidence Confidence:</strong>{" "}
                <span className="brain-sf-sec">{formatSec(finding.synthesised_evidence_confidence)}</span>
              </p>

              <p className="brain-sf-field">
                <strong>Synthesis:</strong> {finding.synthesis}
              </p>

              <p className="brain-sf-field">
                <strong>Synthesis Limitations:</strong> {finding.synthesis_limitations}
              </p>

              <p className="brain-sf-field brain-sf-field--label">
                <strong>Evidence Considered:</strong>
              </p>
              <ul className="brain-sf-evidence">
                {finding.evidence_considered.map((item) => {
                  const reference = (
                    <Citation label={item.label} href={item.href} dataLevel={item.data_level} />
                  )
                  return (
                    <li key={`${finding.id}:${item.citation_key || item.label}`}>
                      {item.assessment ? (
                        <HubDisclosure
                          className="brain-sf-isa-disclosure"
                          label={
                            <>
                              <span className="brain-sf-evidence-label">{item.label}</span>
                              <span className="brain-sf-evidence-finding"> — {item.directional_finding}</span>
                            </>
                          }
                        >
                          <Assessment
                            assessment={item.assessment}
                            source={item.evidence_source}
                            reference={reference}
                          />
                        </HubDisclosure>
                      ) : (
                        <>
                          <span className="brain-sf-evidence-label">{item.label}</span>
                          <span className="brain-sf-evidence-finding"> — {item.directional_finding}</span>
                          <div className="brain-sf-evidence-ref">{reference}</div>
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>

              {connected.length > 0 ? (
                <>
                  <p className="brain-sf-field brain-sf-field--label">
                    <strong>Connected / Supportive Evidence:</strong>
                  </p>
                  <ul className="brain-sf-connected">
                    {connected.map((item) => (
                      <li key={`${finding.id}:cse:${item.label}`}>
                        <Citation label={item.label} href={item.href} dataLevel={item.data_level} />
                        <div className="brain-sf-connected-why">
                          <em>Why relevant:</em> {item.why_relevant}
                        </div>
                        <div className="brain-sf-connected-why">
                          <em>Why excluded from the primary synthesis:</em> {item.why_excluded}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {dependency.length > 0 ? (
                <>
                  <p className="brain-sf-field brain-sf-field--label">
                    <strong>Evidence Dependency:</strong>
                  </p>
                  <ul className="brain-sf-dependency">
                    {dependency.map((note) => (
                      <li key={`${finding.id}:dep:${note.slice(0, 40)}`}>{note}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {informs.length > 0 ? (
                <p className="brain-sf-informs">
                  <strong>Informs:</strong>{" "}
                  {informs.map((entry, index) => (
                    <React.Fragment key={`${finding.id}:informs:${entry.phenome}`}>
                      {index > 0 ? "; " : ""}
                      {entry.href ? <a href={entry.href}>{entry.phenome}</a> : entry.phenome}
                    </React.Fragment>
                  ))}
                </p>
              ) : null}
            </HubDisclosure>
          </div>
        </div>
      </div>
    </section>
  )
}
