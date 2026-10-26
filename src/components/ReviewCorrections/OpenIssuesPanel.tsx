import React, {type MouseEvent, type ReactNode} from "react"
import {useHistory, useLocation} from "@docusaurus/router"
import records from "../../../system/framework-qc/pm-open-issues.json"
import {
  currentPmOpenIssues,
  OPEN_ISSUES_QUERY_PARAM,
  toPublicPmOpenIssue,
} from "@site/src/data/pmOpenIssues.mjs"
import styles from "./styles.module.css"
import EvidenceDisclosure from "../EvidenceGaps/Disclosure"

type Finding = {id?: string; finding_label?: string}
type PublicIssue = {
  id: string
  kind: string
  status: string
  question: string
  established: string
  claim_boundary: string
  resolution_needs: string
  finding_ids?: string[]
  citation_keys?: string[]
  title?: string
  why_it_matters?: string
}

function kindLabel(kind: string): string {
  if (kind === "implementation-defect") return "Implementation defect"
  return "Scientific question"
}

function findingLinks(ids: string[] | undefined, findings: Finding[]) {
  return (ids || [])
    .map((id) => {
      const finding = findings.find((row) => row.id === id)
      if (!finding?.finding_label) return null
      return {id, label: finding.finding_label, href: `#${id.toLowerCase()}`}
    })
    .filter((row): row is {id: string; label: string; href: string} => Boolean(row))
}

function sourceLinks(keys: string[] | undefined, references: string[]) {
  return (keys || [])
    .map((key) => {
      const reference = references.find((line) => line.includes(`#${key}`))
      if (!reference) return null
      const match = reference.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (!match) return null
      const label = match[1].split(/\s+[—–-]\s+/)[0].trim()
      return {key, label, href: match[2]}
    })
    .filter((row): row is {key: string; label: string; href: string} => Boolean(row))
}

function IssueCard({
  issue,
  findings,
  references,
  number,
  canonical,
}: {
  issue: PublicIssue
  findings: Finding[]
  references: string[]
  number: number
  canonical: boolean
}) {
  const history = useHistory()
  const location = useLocation()
  const relatedFindings = findingLinks(issue.finding_ids, findings)
  const sources = sourceLinks(issue.citation_keys, references)
  function openFinding(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    const nextParams = new URLSearchParams(location.search)
    nextParams.delete(OPEN_ISSUES_QUERY_PARAM)
    const search = nextParams.toString()
    history.push({
      pathname: location.pathname,
      search: search ? `?${search}` : "",
      hash: href,
    })
    const id = href.replace(/^#/, "")
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({block: "start"})
    }, 0)
  }
  const content = (
    <>
      {canonical && <p><strong>Record ID:</strong> {issue.id}</p>}
      {!canonical && <p>
        {kindLabel(issue.kind)}
        {issue.status === "deferred" ? " · Deferred" : ""}
        {issue.status === "under-investigation" ? " · Under investigation" : ""}
      </p>}
      <h3>{issue.question}</h3>
      {issue.why_it_matters && <p><strong>Why it matters: </strong>{issue.why_it_matters}</p>}
      <p>
        <strong>Established: </strong>
        {issue.established}
      </p>
      <p>
        <strong>This uncertainty prevents claiming: </strong>
        {issue.claim_boundary}
      </p>
      <p>
        <strong>Needed to resolve it: </strong>
        {issue.resolution_needs}
      </p>
      {relatedFindings.length || sources.length ? (
        <ul>
          {relatedFindings.map((finding) => (
            <li key={finding.id}>
              <a href={finding.href} onClick={(event) => openFinding(event, finding.href)}>
                {finding.label}
              </a>
            </li>
          ))}
          {sources.map((source) => (
            <li key={source.key}>
              <a href={source.href}>{source.label}</a>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
  const status = issue.status === 'under-investigation' ? 'Under Investigation' : issue.status === 'deferred' ? 'Deferred' : issue.status === 'resolved' ? 'Resolved' : 'Open'
  return canonical ? <EvidenceDisclosure id={issue.id} label={`Open Issue ${number}`} title={issue.title || issue.question} status={status}>{content}</EvidenceDisclosure> : <article className={styles.issueCard} id={issue.id.toLowerCase()}>{content}</article>
}

export default function OpenIssuesPanel({
  pmId,
  frontMatter,
  panelId,
}: {
  pmId: string
  frontMatter: Record<string, unknown>
  panelId: string
}): ReactNode {
  const findings = (frontMatter.scientific_findings || []) as Finding[]
  const references = (frontMatter.references || []) as string[]
  const issues = currentPmOpenIssues(records.issues, pmId).map(toPublicPmOpenIssue) as PublicIssue[]

  return (
    <div
      className={styles.panel}
      id={panelId}
      role="tabpanel"
      aria-labelledby="open-issues-tab"
    >
      <h2 tabIndex={-1}>Open Issues</h2>
      <p>
        These are unresolved questions for this mechanism. They do not add dietary
        requirements. Completed decisions and historical scope dispositions remain in Evidence &amp; Audit.
      </p>
      {issues.length === 0 ? (
        <p>No open questions are recorded for this mechanism.</p>
      ) : (
        issues.map((issue,index) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            number={index+1}
            canonical={frontMatter.evidence_tabs_version === 1}
            findings={findings}
            references={references}
          />
        ))
      )}
    </div>
  )
}
