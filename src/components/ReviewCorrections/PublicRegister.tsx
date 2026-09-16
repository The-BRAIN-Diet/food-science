import React, {useMemo} from "react"
import Link from "@docusaurus/Link"
import {useHistory, useLocation} from "@docusaurus/router"
import {
  frameworkQcPublic,
  reviewStatusLabel,
  type PublicIssue,
} from "@site/src/data/frameworkQcPublic"
import styles from "./styles.module.css"

const PAGE_TYPES = [
  "",
  "Food",
  "Substance",
  "Recipe",
  "BRS",
  "FM",
  "PM",
  "KC",
  "SM",
  "Dependency",
  "Index",
  "Phenome",
  "Framework/methodology",
  "Other",
]

const LETTERS = ["", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")]
const ISSUE_STATUSES = ["", "open", "deferred", "resolved"]
const REVIEW_STATUSES = [
  "",
  "unreviewed",
  "issues_logged",
  "source_checked",
  "expert_reviewed",
  "recheck_required",
]

function readParams(search: string) {
  const params = new URLSearchParams(search)
  return {
    q: params.get("q") || "",
    pageType: params.get("type") || "",
    letter: params.get("letter") || "",
    issueStatus: params.get("issue") || "",
    reviewStatus: params.get("reviewStatus") || "",
    openOnly: params.get("open") === "1",
  }
}

function writeParams(
  current: string,
  patch: Partial<ReturnType<typeof readParams>>,
): string {
  const next = {...readParams(current), ...patch}
  const params = new URLSearchParams()
  if (next.q) params.set("q", next.q)
  if (next.pageType) params.set("type", next.pageType)
  if (next.letter) params.set("letter", next.letter)
  if (next.issueStatus) params.set("issue", next.issueStatus)
  if (next.reviewStatus) params.set("reviewStatus", next.reviewStatus)
  if (next.openOnly) params.set("open", "1")
  const qs = params.toString()
  return qs ? `?${qs}` : ""
}

function issueMatches(
  issue: PublicIssue,
  filters: ReturnType<typeof readParams>,
): boolean {
  if (filters.openOnly && issue.status !== "open") return false
  if (filters.issueStatus && issue.status !== filters.issueStatus) return false
  const pages = issue.affected_pages || []
  if (filters.pageType && !pages.some((p) => p.page_type === filters.pageType)) return false
  if (filters.letter && !pages.some((p) => p.letter === filters.letter)) return false
  if (filters.reviewStatus && !pages.some((p) => p.review_status === filters.reviewStatus)) {
    return false
  }
  const q = filters.q.trim().toLowerCase()
  if (!q) return true
  const hay = [
    issue.id,
    issue.title,
    ...(issue.findings || []),
    ...pages.flatMap((p) => [p.page_id, p.title, p.site_path]),
  ]
    .join(" ")
    .toLowerCase()
  return hay.includes(q)
}

export default function FrameworkReviewRegister(): React.ReactNode {
  const location = useLocation()
  const history = useHistory()
  const filters = readParams(location.search)
  const issues = useMemo(
    () => (frameworkQcPublic.issues || []).filter((issue) => issueMatches(issue, filters)),
    [filters.q, filters.pageType, filters.letter, filters.issueStatus, filters.reviewStatus, filters.openOnly],
  )

  function update(patch: Partial<ReturnType<typeof readParams>>) {
    history.replace({
      pathname: location.pathname,
      search: writeParams(location.search, patch),
    })
  }

  return (
    <div className={styles.register}>
      <div className={styles.controls}>
        <input
          type="search"
          value={filters.q}
          onChange={(event) => update({q: event.target.value})}
          placeholder="Search issue ID, title, or affected page"
          aria-label="Search issue ID, title, or affected page"
        />
        <select
          value={filters.pageType}
          onChange={(event) => update({pageType: event.target.value})}
          aria-label="Filter by page type"
        >
          {PAGE_TYPES.map((type) => (
            <option key={type || "all-types"} value={type}>
              {type || "All page types"}
            </option>
          ))}
        </select>
        <select
          value={filters.letter}
          onChange={(event) => update({letter: event.target.value})}
          aria-label="Filter by alphabetical letter"
        >
          {LETTERS.map((letter) => (
            <option key={letter || "all-letters"} value={letter}>
              {letter || "All letters"}
            </option>
          ))}
        </select>
        <select
          value={filters.issueStatus}
          onChange={(event) => update({issueStatus: event.target.value})}
          aria-label="Filter by issue status"
        >
          {ISSUE_STATUSES.map((status) => (
            <option key={status || "all-issue"} value={status}>
              {status || "All issue statuses"}
            </option>
          ))}
        </select>
        <select
          value={filters.reviewStatus}
          onChange={(event) => update({reviewStatus: event.target.value})}
          aria-label="Filter by review status"
        >
          {REVIEW_STATUSES.map((status) => (
            <option key={status || "all-review"} value={status}>
              {status ? reviewStatusLabel(status) : "All review statuses"}
            </option>
          ))}
        </select>
        <div className={styles.toggleRow}>
          <label>
            <input
              type="checkbox"
              checked={filters.openOnly}
              onChange={(event) => update({openOnly: event.target.checked})}
            />{" "}
            Open issues only
          </label>
        </div>
      </div>

      <p className={styles.meta}>
        {issues.length} public {issues.length === 1 ? "issue" : "issues"}
      </p>

      {issues.length === 0 ? <p>No public issues match these filters.</p> : null}

      {issues.map((issue) => (
        <article className={styles.issueCard} key={issue.id} id={issue.id}>
          <h2>
            {issue.id} — {issue.title}
          </h2>
          <p className={styles.meta}>Status: {issue.status}</p>
          <ol>
            {(issue.findings || []).map((finding, index) => (
              <li key={`${issue.id}-${index}`}>{finding}</li>
            ))}
          </ol>
          {issue.resolution_summary ? (
            <p>
              Resolution{issue.resolved_date ? ` (${issue.resolved_date})` : ""}:{" "}
              {issue.resolution_summary}
            </p>
          ) : null}
          <h3>Affected pages</h3>
          <div className={styles.pages}>
            {(issue.affected_pages || []).map((page) => (
              <Link key={`${issue.id}-${page.page_id}`} to={`${page.site_path}?review=1`}>
                {page.title}
              </Link>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
