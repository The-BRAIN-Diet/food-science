import React, {type ReactNode} from "react"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import {
  UNREVIEWED_CORRECTIONS_COPY,
  UNREVIEWED_STATUS_COPY,
  frameworkQcPublic,
  reviewStatusLabel,
  type PublicPageRecord,
} from "@site/src/data/frameworkQcPublic"
import styles from "./styles.module.css"

function Findings({findings}: {findings: string[]}) {
  if (!findings?.length) return null
  return (
    <ol>
      {findings.map((finding, index) => (
        <li key={`${index}-${finding.slice(0, 24)}`}>{finding}</li>
      ))}
    </ol>
  )
}

export default function PageReviewPanel({
  page,
  panelId,
}: {
  page: PublicPageRecord | null
  panelId: string
}): ReactNode {
  const unreviewed = !page || page.review_status === "unreviewed"
  const {siteConfig} = useDocusaurusContext()
  const showInternalRegister = siteConfig.customFields?.includeInternalDocs === true
  const registerPath = frameworkQcPublic.register_path

  return (
    <div
      className={styles.panel}
      id={panelId}
      role="tabpanel"
      aria-labelledby="review-corrections-tab"
    >
      <h2 tabIndex={-1}>Review &amp; Corrections</h2>
      {unreviewed ? (
        <div className={styles.unreviewed}>
          <p>{UNREVIEWED_STATUS_COPY}</p>
          <p>{UNREVIEWED_CORRECTIONS_COPY}</p>
        </div>
      ) : (
        <>
          <dl>
            <dt>Current review status</dt>
            <dd>{reviewStatusLabel(page.review_status)}</dd>
            <dt>Last checked</dt>
            <dd>{page.last_checked || "Not recorded"}</dd>
            <dt>Checked by</dt>
            <dd>{page.reviewer || "Not recorded"}</dd>
            <dt>Scope of review</dt>
            <dd>{page.review_scope || "Not recorded"}</dd>
          </dl>

          <section>
            <h3>Accepted open public issues</h3>
            {page.issues.length === 0 ? (
              <p>No accepted open public issues are recorded for this page.</p>
            ) : (
              page.issues.map((issue) => (
                <article key={issue.id}>
                  <h4>
                    {issue.id} — {issue.title}
                  </h4>
                  <p>Status: {issue.status}</p>
                  <Findings findings={issue.findings} />
                </article>
              ))
            )}
          </section>

          <section>
            <h3>Accepted limitations</h3>
            {page.limitations.length === 0 ? (
              <p>None recorded.</p>
            ) : (
              <ul>
                {page.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h3>Resolved corrections</h3>
            {page.history.length === 0 ? (
              <p>No resolved public corrections are recorded yet.</p>
            ) : (
              page.history.map((issue) => (
                <article key={issue.id}>
                  <h4>
                    {issue.id} — {issue.title}
                  </h4>
                  {issue.resolved_date ? <p>Resolved: {issue.resolved_date}</p> : null}
                  {issue.resolution_summary ? <p>{issue.resolution_summary}</p> : null}
                  <Findings findings={issue.findings} />
                </article>
              ))
            )}
          </section>
        </>
      )}
      {showInternalRegister ? (
        <p>
          <Link to={registerPath}>
            Complete public Framework Review &amp; Corrections register
          </Link>
        </p>
      ) : null}
    </div>
  )
}
