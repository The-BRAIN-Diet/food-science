import React, {type KeyboardEvent, type ReactNode, useEffect, useLayoutEffect, useMemo} from "react"
import clsx from "clsx"
import {useHistory, useLocation} from "@docusaurus/router"
import {useDoc} from "@docusaurus/plugin-content-docs/client"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import {
  ADVANCED_QUERY_PARAM,
  REVIEW_QUERY_PARAM,
  findPublicPageRecord,
  openPublicIssueCount,
  showsNutritionContentTabs,
  showsPageUtilityBar,
  isNutritionContentPermalink,
} from "@site/src/data/frameworkQcPublic"
import {useAdvancedNutritionSlot} from "@site/src/components/AdvancedNutrition"
import PageReviewPanel from "./PageReviewPanel"
import styles from "./styles.module.css"

function extraPageIds(frontMatter: Record<string, unknown>): string[] {
  return ["id", "pm_id", "fm_id", "kc_id", "sm_id"]
    .map((key) => frontMatter[key])
    .filter((value): value is string => typeof value === "string" && value.length > 0)
}

type ContentTab = "highlights" | "advanced" | "review"

export default function DocUtilityBar({
  children,
}: {
  children: ReactNode
}): ReactNode {
  const {metadata, frontMatter} = useDoc()
  const location = useLocation()
  const history = useHistory()
  const fm = (frontMatter || {}) as Record<string, unknown>
  const page = useMemo(
    () =>
      findPublicPageRecord({
        permalink: metadata.permalink,
        pageId: typeof fm.id === "string" ? fm.id : metadata.id,
        extraIds: extraPageIds(fm),
      }),
    [metadata.permalink, metadata.id, fm.id, fm.pm_id, fm.fm_id, fm.kc_id, fm.sm_id],
  )
  const {siteConfig} = useDocusaurusContext()
  const includeInternalDocs = siteConfig.customFields?.includeInternalDocs === true
  const onContentPage = showsPageUtilityBar({
    pageType: page?.page_type,
    source: metadata.source,
    permalink: metadata.permalink,
  })
  const showContentTabs =
    onContentPage &&
    (showsNutritionContentTabs(page?.page_type) ||
      (!page && isNutritionContentPermalink(metadata.permalink)))
  const showReviewTab = includeInternalDocs && onContentPage
  const showBar = showContentTabs || showReviewTab
  const openCount = openPublicIssueCount(page)
  const params = new URLSearchParams(location.search)
  const advancedSlot = useAdvancedNutritionSlot()
  const setUseTabPanel = advancedSlot?.setUseTabPanel
  const hasAdvanced = Boolean(advancedSlot?.content)
  const reviewOpen = showReviewTab && params.get(REVIEW_QUERY_PARAM) === "1"
  const advancedOpen =
    showContentTabs &&
    hasAdvanced &&
    !reviewOpen &&
    params.get(ADVANCED_QUERY_PARAM) === "1"
  const highlightsOpen = !reviewOpen && !advancedOpen
  const qcLabel =
    openCount > 0 ? `Review & Corrections (${openCount})` : "Review & Corrections"

  useLayoutEffect(() => {
    setUseTabPanel?.(showContentTabs)
    return () => setUseTabPanel?.(false)
  }, [showContentTabs, setUseTabPanel])

  function setContentTab(tab: ContentTab) {
    const nextParams = new URLSearchParams(location.search)
    nextParams.delete(REVIEW_QUERY_PARAM)
    nextParams.delete(ADVANCED_QUERY_PARAM)
    if (tab === "review") nextParams.set(REVIEW_QUERY_PARAM, "1")
    if (tab === "advanced") nextParams.set(ADVANCED_QUERY_PARAM, "1")
    const search = nextParams.toString()
    history.push({
      pathname: location.pathname,
      search: search ? `?${search}` : "",
      hash: tab === "advanced" ? location.hash : "",
    })
  }

  useEffect(() => {
    if (!hasAdvanced || advancedOpen || reviewOpen) return
    const id = location.hash.replace(/^#/, "")
    if (!id) return
    if (!document.getElementById(id)) {
      const nextParams = new URLSearchParams(location.search)
      nextParams.delete(REVIEW_QUERY_PARAM)
      nextParams.set(ADVANCED_QUERY_PARAM, "1")
      history.replace({
        pathname: location.pathname,
        search: `?${nextParams.toString()}`,
        hash: location.hash,
      })
    }
  }, [hasAdvanced, advancedOpen, reviewOpen, location.hash, location.pathname, location.search, history])

  useEffect(() => {
    if (reviewOpen) {
      const heading = document.querySelector<HTMLElement>("#review-corrections-panel h2")
      heading?.focus()
      const onKey = (event: globalThis.KeyboardEvent) => {
        if (event.key === "Escape") setContentTab("highlights")
      }
      window.addEventListener("keydown", onKey)
      return () => window.removeEventListener("keydown", onKey)
    }
    if (!advancedOpen) return
    const id = location.hash.replace(/^#/, "")
    const target = id ? document.getElementById(id) : null
    if (target) {
      target.scrollIntoView({block: "start"})
    } else {
      const heading = document.querySelector<HTMLElement>(
        "#advanced-nutrition-panel h2, #advanced-nutrition-panel h3",
      )
      heading?.focus()
    }
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setContentTab("highlights")
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [reviewOpen, advancedOpen, location.hash])

  const tabIds = [
    ...(showContentTabs
      ? [
          "nutritional-highlights-tab",
          ...(hasAdvanced ? ["advanced-nutrition-tab"] : []),
        ]
      : []),
    ...(showReviewTab ? ["review-corrections-tab"] : []),
  ]

  function onTabListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
    event.preventDefault()
    const current = document.activeElement as HTMLElement | null
    const index = tabIds.indexOf(current?.id || "")
    if (index < 0) return
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % tabIds.length
    if (event.key === "ArrowLeft") next = (index - 1 + tabIds.length) % tabIds.length
    if (event.key === "Home") next = 0
    if (event.key === "End") next = tabIds.length - 1
    document.getElementById(tabIds[next])?.focus()
  }

  if (!showBar) return children

  return (
    <>
      <div
        className={styles.bar}
        role="tablist"
        aria-label="Page utilities"
        onKeyDown={onTabListKeyDown}
      >
        {showContentTabs ? (
          <div className={styles.contentTabs}>
            <button
              type="button"
              id="nutritional-highlights-tab"
              className={clsx(styles.tab, highlightsOpen && styles.tabSelected)}
              role="tab"
              aria-selected={highlightsOpen}
              tabIndex={highlightsOpen ? 0 : -1}
              onClick={() => setContentTab("highlights")}
            >
              Nutritional Highlights
            </button>
            <button
              type="button"
              id="advanced-nutrition-tab"
              className={clsx(
                styles.tab,
                advancedOpen && styles.tabSelected,
                !hasAdvanced && styles.tabDisabled,
              )}
              role="tab"
              aria-selected={advancedOpen}
              aria-disabled={!hasAdvanced}
              aria-controls={hasAdvanced ? "advanced-nutrition-panel" : undefined}
              aria-describedby={hasAdvanced ? undefined : "advanced-nutrition-tab-status"}
              tabIndex={hasAdvanced ? (advancedOpen ? 0 : -1) : -1}
              onClick={(event) => {
                if (!hasAdvanced) {
                  event.preventDefault()
                  return
                }
                setContentTab("advanced")
              }}
            >
              Advanced Nutrition
            </button>
            {hasAdvanced ? null : (
              <span id="advanced-nutrition-tab-status" className={styles.srOnly}>
                Not yet activated
              </span>
            )}
          </div>
        ) : (
          <div />
        )}
        {showReviewTab ? (
          <div className={clsx(styles.qcWrap, showContentTabs && styles.qcWrapSeparated)}>
            <button
              type="button"
              id="review-corrections-tab"
              className={clsx(styles.tab, reviewOpen && styles.tabSelected)}
              role="tab"
              aria-selected={reviewOpen}
              aria-controls="review-corrections-panel"
              tabIndex={reviewOpen || !showContentTabs ? 0 : -1}
              onClick={() => setContentTab(reviewOpen ? "highlights" : "review")}
            >
              {qcLabel}
            </button>
          </div>
        ) : null}
      </div>
      <div className={clsx((reviewOpen || advancedOpen) && styles.hiddenMain)}>
        {children}
      </div>
      {reviewOpen ? (
        <PageReviewPanel page={page} panelId="review-corrections-panel" />
      ) : null}
      {advancedOpen && advancedSlot?.content ? (
        <div
          id="advanced-nutrition-panel"
          className={styles.advancedPanel}
          role="tabpanel"
          aria-labelledby="advanced-nutrition-tab"
        >
          {advancedSlot.content}
        </div>
      ) : null}
    </>
  )
}
