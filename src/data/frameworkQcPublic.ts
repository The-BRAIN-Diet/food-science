import publicDataset from "./framework-qc-public.fallback.json"

export type PublicIssue = {
  id: string
  title: string
  findings: string[]
  status: string
  resolution_summary: string | null
  resolved_date: string | null
  affected_pages?: PublicAffectedPage[]
}

export type PublicAffectedPage = {
  page_id: string
  title: string
  site_path: string
  page_type?: string
  letter?: string
  review_status?: string
}

export type PublicPageRecord = {
  page_id: string
  site_path: string
  title: string
  page_type: string
  letter: string
  review_status: string
  last_checked: string | null
  reviewer: string | null
  review_scope: string | null
  issues: PublicIssue[]
  limitations: string[]
  history: PublicIssue[]
}

export type PublicQcDataset = {
  version: number
  generated: string
  register_path: string
  pages: PublicPageRecord[]
  issues: PublicIssue[]
}

export const frameworkQcPublic = publicDataset as PublicQcDataset

export const REVIEW_QUERY_PARAM = "review"
export const ADVANCED_QUERY_PARAM = "advanced"

export const UNREVIEWED_STATUS_COPY = "Evidence review status: Unreviewed."
export const UNREVIEWED_CORRECTIONS_COPY =
  "No accepted corrections are currently recorded for this page. This does not mean that the page has completed source or expert review."

export function normalizePublicPath(pathname: string | undefined | null): string {
  if (!pathname) return ""
  const noQuery = String(pathname).split("?")[0].split("#")[0]
  if (!noQuery) return ""
  return noQuery.replace(/\/$/, "") || "/"
}

export function findPublicPageRecord(opts: {
  permalink?: string | null
  pageId?: string | null
  extraIds?: Array<string | null | undefined>
}): PublicPageRecord | null {
  const pages = frameworkQcPublic.pages || []
  const path = normalizePublicPath(opts.permalink)
  const ids = [opts.pageId, ...(opts.extraIds || [])]
    .filter((id): id is string => typeof id === "string" && id.length > 0)
    .flatMap((id) => [id, id.replace("(", "-").replace(")", "")])
  return (
    pages.find((p) => p.site_path === path) ||
    pages.find((p) => ids.includes(p.page_id)) ||
    null
  )
}

export function openPublicIssueCount(page: PublicPageRecord | null | undefined): number {
  if (!page) return 0
  return (page.issues || []).filter((issue) => issue.status === "open").length
}

/** Same index-file rule as Framework QC `classifyPage`. */
export function isIndexDocSource(source: string | null | undefined): boolean {
  const file = String(source || "").replace(/\\/g, "/").split("/").pop() || ""
  return /^index\.(md|mdx)$/i.test(file)
}

/** Content tabs use the existing Framework QC page_type. Do not infer a second classification. */
export function showsNutritionContentTabs(pageType: string | null | undefined): boolean {
  return pageType === "Food" || pageType === "Substance" || pageType === "Recipe"
}

/** When no QC record is loaded, keep food/substance/recipe tabs available from the doc path. */
export function isNutritionContentPermalink(permalink: string | null | undefined): boolean {
  const path = normalizePublicPath(permalink)
  return (
    path.startsWith("/docs/foods/") ||
    path.startsWith("/docs/substances/") ||
    path.startsWith("/docs/recipes/")
  )
}

/** Tab bar belongs on individual content pages, not collection indexes or the QA register. */
export function showsPageUtilityBar(opts: {
  pageType?: string | null
  source?: string | null
  permalink?: string | null
}): boolean {
  if (isIndexDocSource(opts.source)) return false
  if (opts.pageType === "Index") return false
  if (
    normalizePublicPath(opts.permalink) ===
    normalizePublicPath(frameworkQcPublic.register_path)
  ) {
    return false
  }
  return true
}

export function reviewStatusLabel(status: string | null | undefined): string {
  if (!status || status === "unreviewed") return "Unreviewed"
  if (status === "issues_logged") return "Issues logged"
  if (status === "source_checked") return "Source checked"
  if (status === "expert_reviewed") return "Expert reviewed"
  if (status === "recheck_required") return "Recheck required"
  return status
}
