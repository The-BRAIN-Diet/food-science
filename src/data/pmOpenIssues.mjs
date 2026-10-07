export const PM_OPEN_ISSUE_STATUSES = ["open", "deferred", "resolved"]
export const PM_OPEN_ISSUE_KINDS = ["scientific-question", "implementation-defect"]
export const OPEN_ISSUES_QUERY_PARAM = "open-issues"

const PUBLIC_FIELDS = [
  "id",
  "pm_id",
  "kind",
  "status",
  "question",
  "established",
  "claim_boundary",
  "resolution_needs",
  "finding_ids",
  "citation_keys",
]

export function currentPmOpenIssues(issues, pmId) {
  return (issues || []).filter(
    (issue) =>
      issue?.pm_id === pmId && (issue.status === "open" || issue.status === "deferred"),
  )
}

export function toPublicPmOpenIssue(issue) {
  const publicIssue = {}
  for (const field of PUBLIC_FIELDS) {
    if (issue?.[field] !== undefined) publicIssue[field] = issue[field]
  }
  return publicIssue
}

export function validatePmOpenIssues(records, {corrections = []} = {}) {
  const problems = []
  const seen = new Set()
  for (const issue of records || []) {
    const label = issue?.id || "(missing id)"
    if (!issue?.id) problems.push(`${label}: requires id`)
    if (issue?.id && seen.has(issue.id)) problems.push(`${label}: duplicate id`)
    if (issue?.id) seen.add(issue.id)
    if (!issue?.pm_id) problems.push(`${label}: requires pm_id`)
    if (!PM_OPEN_ISSUE_KINDS.includes(issue?.kind)) {
      problems.push(`${label}: kind must be scientific-question or implementation-defect`)
    }
    if (!PM_OPEN_ISSUE_STATUSES.includes(issue?.status)) {
      problems.push(`${label}: status must be open, deferred, or resolved`)
    }
    for (const field of ["question", "established", "claim_boundary", "resolution_needs"]) {
      if (!String(issue?.[field] || "").trim()) problems.push(`${label}: requires ${field}`)
    }
    if (issue?.related_framework_issue_ids !== undefined && !Array.isArray(issue.related_framework_issue_ids)) {
      problems.push(`${label}: related_framework_issue_ids must be an array when present`)
    }
    if (issue?.status === "resolved") {
      if (!issue.resolution_correction_id) {
        problems.push(`${label}: resolved issues require resolution_correction_id`)
      } else {
        const correction = corrections.find((row) => row.id === issue.resolution_correction_id)
        if (!correction) {
          problems.push(`${label}: resolution_correction_id ${issue.resolution_correction_id} is not in Review & Corrections`)
        } else if (correction.register_surface !== "pm-tab") {
          problems.push(`${label}: resolution must be a PM Review & Corrections record, not a framework-register issue`)
        } else if (!(correction.scope?.page_ids || []).includes(issue.pm_id)) {
          problems.push(`${label}: resolution record is not scoped to ${issue.pm_id}`)
        }
      }
    } else if (issue?.resolution_correction_id) {
      problems.push(`${label}: resolution_correction_id belongs only on resolved issues`)
    }
  }
  return problems
}
