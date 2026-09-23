import React from "react"

/**
 * Canonical Scientific Finding renderer.
 *
 * Structure is fixed by the BRAIN evidence model:
 *   Finding Statement → Finding Discriminator [conditional] → Synthesised Evidence
 *   Confidence → Synthesis → Synthesis Limitations → Evidence Considered
 *   (→ Individual Study Assessment) → Connected / Supportive Evidence →
 *   Evidence Dependency.
 *
 * A Finding is authored once in PM front matter and may be referenced by 0..n
 * phenome relationships. `informs` is derived at sync time from those
 * references so reuse is visible without the Finding or its evidence being
 * duplicated.
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
  /** Collapsed one-line contribution — must preserve direction. */
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
  finding_statement: string
  finding_discriminator?: string
  /** Only "not-yet-scored" is currently authorised. Never inferred here. */
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

/**
 * Renders the already-determined confidence state. This must never derive or
 * infer a confidence level from the evidence beneath it.
 */
function formatSec(value: string): string {
  return String(value || "").trim() === "not-yet-scored" ? "Not yet scored" : String(value)
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

export default function ScientificFinding({
  finding,
}: {
  finding: ScientificFindingData
}): React.JSX.Element {
  const connected = finding.connected_supportive_evidence || []
  const dependency = finding.evidence_dependency || []
  const informs = finding.informs || []

  return (
    // The anchor id is owned by the generated markdown heading above this
    // component, so it is registered for link checking and not duplicated here.
    <section className="brain-sf" aria-label={`Scientific Finding ${finding.id}`}>
      <details className="brain-sf-shell">
        <summary className="brain-sf-summary">
          <span className="brain-sf-statement">{finding.finding_statement}</span>
        </summary>

        <div className="brain-sf-body">
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
                    <details className="brain-sf-isa-shell">
                      <summary>
                        <span className="brain-sf-evidence-label">{item.label}</span>
                        <span className="brain-sf-evidence-finding"> — {item.directional_finding}</span>
                      </summary>
                      <Assessment
                        assessment={item.assessment}
                        source={item.evidence_source}
                        reference={reference}
                      />
                    </details>
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
        </div>
      </details>
    </section>
  )
}
