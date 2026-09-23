import React, {type KeyboardEvent, type ReactNode, useEffect, useLayoutEffect, useMemo} from "react"
import clsx from "clsx"
import {useHistory, useLocation} from "@docusaurus/router"
import {useDoc} from "@docusaurus/plugin-content-docs/client"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import {
  ADVANCED_QUERY_PARAM,
  REVIEW_QUERY_PARAM,
  THERAPEUTIC_QUERY_PARAM,
  findPublicPageRecord,
  openPublicIssueCount,
  showsNutritionContentTabs,
  showsPageUtilityBar,
  isNutritionContentPermalink,
} from "@site/src/data/frameworkQcPublic"
import {usePageContentTabs} from "@site/src/components/AdvancedNutrition"
import PageReviewPanel from "./PageReviewPanel"
import styles from "./styles.module.css"

function extraPageIds(frontMatter: Record<string, unknown>): string[] {
  return ["id", "pm_id", "fm_id", "kc_id", "sm_id"]
    .map((key) => frontMatter[key])
    .filter((value): value is string => typeof value === "string" && value.length > 0)
}

type ContentTab = "highlights" | "advanced" | "therapeutic" | "review"

const THERAPEUTIC_HASH_IDS = new Set([
  "walsh-biochemical-biotypes",
  "copper-therapeutic-areas",
  "bh4-therapeutic-areas",
  "glutathione-therapeutic-areas",
  "therapeutic-area-research",
  "therapeutic-area-research-references",
])

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
  const contentSlots = usePageContentTabs()
  const setUseTabPanel = contentSlots?.setUseTabPanel
  const hasAdvanced = Boolean(contentSlots?.panels.advanced)
  const hasTherapeutic = Boolean(contentSlots?.panels.therapeutic)
  const hashId = location.hash.replace(/^#/, "")
  const reviewOpen = showReviewTab && params.get(REVIEW_QUERY_PARAM) === "1"
  const therapeuticHash = Boolean(hashId) && THERAPEUTIC_HASH_IDS.has(hashId)
  const therapeuticOpen =
    showContentTabs &&
    hasTherapeutic &&
    !reviewOpen &&
    (params.get(THERAPEUTIC_QUERY_PARAM) === "1" || therapeuticHash)
  const advancedOpen =
    showContentTabs &&
    hasAdvanced &&
    !reviewOpen &&
    !therapeuticOpen &&
    params.get(ADVANCED_QUERY_PARAM) === "1"
  const highlightsOpen = !reviewOpen && !advancedOpen && !therapeuticOpen
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
    nextParams.delete(THERAPEUTIC_QUERY_PARAM)
    if (tab === "review") nextParams.set(REVIEW_QUERY_PARAM, "1")
    if (tab === "advanced") nextParams.set(ADVANCED_QUERY_PARAM, "1")
    if (tab === "therapeutic") nextParams.set(THERAPEUTIC_QUERY_PARAM, "1")
    const search = nextParams.toString()
    const keepHash = tab === "advanced" || tab === "therapeutic"
    history.push({
      pathname: location.pathname,
      search: search ? `?${search}` : "",
      hash: keepHash ? location.hash : "",
    })
  }

  useEffect(() => {
    if (reviewOpen) return
    const id = location.hash.replace(/^#/, "")
    if (!id) return
    if (THERAPEUTIC_HASH_IDS.has(id)) {
      if (!hasTherapeutic || therapeuticOpen) return
      const nextParams = new URLSearchParams(location.search)
      nextParams.delete(REVIEW_QUERY_PARAM)
      nextParams.delete(ADVANCED_QUERY_PARAM)
      nextParams.set(THERAPEUTIC_QUERY_PARAM, "1")
      history.replace({
        pathname: location.pathname,
        search: `?${nextParams.toString()}`,
        hash: location.hash,
      })
      return
    }
    if (!hasAdvanced || advancedOpen || therapeuticOpen) return
    if (!document.getElementById(id)) {
      const nextParams = new URLSearchParams(location.search)
      nextParams.delete(REVIEW_QUERY_PARAM)
      nextParams.delete(THERAPEUTIC_QUERY_PARAM)
      nextParams.set(ADVANCED_QUERY_PARAM, "1")
      history.replace({
        pathname: location.pathname,
        search: `?${nextParams.toString()}`,
        hash: location.hash,
      })
    }
  }, [
    hasAdvanced,
    hasTherapeutic,
    advancedOpen,
    therapeuticOpen,
    reviewOpen,
    location.hash,
    location.pathname,
    location.search,
    history,
  ])

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
    const panelId = therapeuticOpen
      ? "therapeutic-area-research-panel"
      : advancedOpen
        ? "advanced-nutrition-panel"
        : null
    if (!panelId) return
    const id = location.hash.replace(/^#/, "")
    const target = id ? document.getElementById(id) : null
    if (target) {
      target.scrollIntoView({block: "start"})
    } else {
      const heading = document.querySelector<HTMLElement>(
        `#${panelId} h2, #${panelId} h3`,
      )
      heading?.focus()
    }
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setContentTab("highlights")
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [reviewOpen, advancedOpen, therapeuticOpen, location.hash])

  const tabIds = [
    ...(showContentTabs
      ? [
          "nutritional-highlights-tab",
          ...(hasAdvanced ? ["advanced-nutrition-tab"] : []),
          ...(hasTherapeutic ? ["therapeutic-area-research-tab"] : []),
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
            <button
              type="button"
              id="therapeutic-area-research-tab"
              className={clsx(
                styles.tab,
                therapeuticOpen && styles.tabSelected,
                !hasTherapeutic && styles.tabDisabled,
              )}
              role="tab"
              aria-selected={therapeuticOpen}
              aria-disabled={!hasTherapeutic}
              aria-controls={hasTherapeutic ? "therapeutic-area-research-panel" : undefined}
              aria-describedby={
                hasTherapeutic ? undefined : "therapeutic-area-research-tab-status"
              }
              tabIndex={hasTherapeutic ? (therapeuticOpen ? 0 : -1) : -1}
              onClick={(event) => {
                if (!hasTherapeutic) {
                  event.preventDefault()
                  return
                }
                setContentTab("therapeutic")
              }}
            >
              Therapeutic Area Research
            </button>
            {hasTherapeutic ? null : (
              <span id="therapeutic-area-research-tab-status" className={styles.srOnly}>
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
      <div className={clsx((reviewOpen || advancedOpen || therapeuticOpen) && styles.hiddenMain)}>
        {children}
      </div>
      {reviewOpen ? (
        <PageReviewPanel page={page} panelId="review-corrections-panel" />
      ) : null}
      {advancedOpen && contentSlots?.panels.advanced ? (
        <div
          id="advanced-nutrition-panel"
          className={styles.advancedPanel}
          role="tabpanel"
          aria-labelledby="advanced-nutrition-tab"
        >
          {contentSlots.panels.advanced}
        </div>
      ) : null}
      {therapeuticOpen && contentSlots?.panels.therapeutic ? (
        <div
          id="therapeutic-area-research-panel"
          className={styles.advancedPanel}
          role="tabpanel"
          aria-labelledby="therapeutic-area-research-tab"
        >
          {contentSlots.panels.therapeutic}
        </div>
      ) : null}
    </>
  )
}
