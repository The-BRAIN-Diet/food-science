import React, {type MouseEvent, type ReactNode} from "react"
import {useHistory, useLocation} from "@docusaurus/router"
import records from "../../../system/framework-qc/pm-open-issues.json"
import {
  currentPmOpenIssues,
  OPEN_ISSUES_QUERY_PARAM,
  toPublicPmOpenIssue,
} from "@site/src/data/pmOpenIssues.mjs"
import styles from "./styles.module.css"

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
}: {
  issue: PublicIssue
  findings: Finding[]
  references: string[]
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
  return (
    <article className={styles.issueCard}>
      <p>
        {kindLabel(issue.kind)}
        {issue.status === "deferred" ? " · Deferred" : ""}
      </p>
      <h3>{issue.question}</h3>
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
    </article>
  )
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
        requirements, and a resolved question is recorded under Review &amp; Corrections.
      </p>
      {issues.length === 0 ? (
        <p>No open questions are recorded for this mechanism.</p>
      ) : (
        issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            findings={findings}
            references={references}
          />
        ))
      )}
    </div>
  )
}
