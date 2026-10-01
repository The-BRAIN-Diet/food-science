import React, {type ReactNode} from "react"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import {
  UNREVIEWED_CORRECTIONS_COPY,
  UNREVIEWED_STATUS_COPY,
  frameworkQcPublic,
  reviewMethodLabel,
  reviewStatusLabel,
  type PublicCorrection,
  type PublicPageRecord,
} from "@site/src/data/frameworkQcPublic"
import styles from "./styles.module.css"

function CorrectionCard({item}: {item: PublicCorrection}) {
  return (
    <article>
      <h4>{item.title}</h4>
      {item.section ? <p>Section: {item.section}</p> : null}
      {item.date ? <p>Reviewed: {item.date}</p> : null}
      {item.description ? <p>{item.description}</p> : null}
      {item.decision ? <p>{item.decision}</p> : null}
      {item.evidence?.length ? <p>Evidence: {item.evidence.join("; ")}</p> : null}
      <p>
        Correction status: {item.correction_status || "pending"}
        {item.review_method ? ` · ${reviewMethodLabel(item.review_method)}` : ""}
        {item.reviewer ? ` · ${item.reviewer}` : ""}
      </p>
    </article>
  )
}

export default function PageReviewPanel({
  page,
  panelId,
}: {
  page: PublicPageRecord | null
  panelId: string
}): ReactNode {
  const corrections = page?.corrections || []
  const hasCorrections = corrections.length > 0
  const {siteConfig} = useDocusaurusContext()
  const showFrameworkRegisterLink =
    siteConfig.customFields?.includeInternalDocs === true && page?.page_type !== "PM"
  const registerPath = frameworkQcPublic.register_path
  const unresolved = corrections.filter(
    (item) => item.correction_status === "pending" || item.correction_status === "accepted",
  )
  const applied = corrections.filter(
    (item) => item.correction_status === "applied" || item.correction_status === "superseded",
  )

  return (
    <div
      className={styles.panel}
      id={panelId}
      role="tabpanel"
      aria-labelledby="review-corrections-tab"
    >
      <h2 tabIndex={-1}>Review &amp; Corrections</h2>
      <dl>
        <dt>Evidence review status</dt>
        <dd>{reviewStatusLabel(page?.review_status)}</dd>
        <dt>Last checked</dt>
        <dd>{page?.last_checked || "Not recorded"}</dd>
        <dt>Review method</dt>
        <dd>{reviewMethodLabel(page?.review_method) || page?.reviewer || "Not recorded"}</dd>
        <dt>Scope of review</dt>
        <dd>{page?.review_scope || "Not recorded"}</dd>
      </dl>
      <p>
        Evidence review status is separate from correction status. An accepted or
        applied correction does not mean source verification or expert review is
        complete.
      </p>
      {hasCorrections ? (
        <>
          <section>
            <h3>Unresolved decisions</h3>
            {unresolved.length === 0 ? (
              <p>No pending or accepted decisions remain for this page.</p>
            ) : (
              unresolved.map((item) => (
                <CorrectionCard key={`${item.title}-${item.section || ""}`} item={item} />
              ))
            )}
          </section>
          <section>
            <h3>Applied corrections</h3>
            {applied.length === 0 ? (
              <p>No applied corrections are recorded yet.</p>
            ) : (
              applied.map((item) => (
                <CorrectionCard key={`${item.title}-applied`} item={item} />
              ))
            )}
          </section>
        </>
      ) : (
        <div className={styles.unreviewed}>
          <p>{UNREVIEWED_STATUS_COPY}</p>
          <p>{UNREVIEWED_CORRECTIONS_COPY}</p>
        </div>
      )}
      {showFrameworkRegisterLink ? (
        <p>
          <Link to={registerPath}>
            Complete public Framework Review &amp; Corrections register
          </Link>
        </p>
      ) : null}
    </div>
  )
}
