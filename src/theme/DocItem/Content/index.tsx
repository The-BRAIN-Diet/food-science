import React, {useLayoutEffect, useRef, type ReactNode} from "react"
import clsx from "clsx"
import {ThemeClassNames} from "@docusaurus/theme-common"
import {useDoc} from "@docusaurus/plugin-content-docs/client"
import Heading from "@theme/Heading"
import MDXContent from "@theme/MDXContent"
import InChIImage from "@theme/InChIImage"
import type {Props} from "@theme/DocItem/Content"
import DocUtilityBar from "@site/src/components/ReviewCorrections/DocUtilityBar"
import {AdvancedNutritionProvider} from "@site/src/components/AdvancedNutrition"
import SubstanceMatrix from "../../SubstanceMatrix"
import PmDietaryLeverEnhancer from "@site/src/components/PmDietaryLeverEnhancer"
import PmSystemOptimisationEnhancer from "@site/src/components/PmSystemOptimisationEnhancer"
import {TherapeuticAreaPmLinks} from "@site/src/theme/TherapeuticAreaDetail"

const BRS_IDS = ["1", "2", "3", "4", "5", "6"] as const
const BRS_X_ACCENTS = [
  ["/docs/biological-targets/brs-x/circadian", "circadian"],
  ["/docs/biological-targets/brs-x/hormones", "hormones"],
  ["/docs/biological-targets/brs-x/ecs", "ecs"],
] as const
type BrsAccent = (typeof BRS_IDS)[number] | (typeof BRS_X_ACCENTS)[number][1]

const BRS_HUB_ACCENT: Record<string, BrsAccent> = {
  "/docs/biological-targets/neurotransmitter-regulation": "1",
  "/docs/biological-targets/methylation-one-carbon-metabolism": "2",
  "/docs/biological-targets/inflammation-oxidative-stress": "3",
  "/docs/biological-targets/mitochondrial-function-bioenergetics": "4",
  "/docs/biological-targets/gut-brain-axis-enteric-nervous-system": "5",
  "/docs/biological-targets/metabolic-neuroendocrine-stress": "6",
}

function brsAccentFromPermalink(permalink: string): BrsAccent | null {
  const path = permalink.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/"
  const hub = BRS_HUB_ACCENT[path]
  if (hub) return hub
  for (const id of BRS_IDS) {
    const root = `/docs/biological-targets/brs${id}`
    if (path === root || path.startsWith(`${root}/`)) return id
  }
  for (const [root, accent] of BRS_X_ACCENTS) {
    if (path === root || path.startsWith(`${root}/`)) return accent
  }
  return null
}

function docsWrapperFrom(start: HTMLElement | null): HTMLElement | null {
  let node = start?.parentElement ?? null
  while (node) {
    if ([...node.classList].some((name) => name.startsWith("docsWrapper"))) return node
    node = node.parentElement
  }
  return null
}

function useSyntheticTitle(): string | null {
  const {metadata, frontMatter, contentTitle} = useDoc()
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === "undefined"
  if (!shouldRender) return null
  return metadata.title
}

export default function DocItemContent({children}: Props): ReactNode {
  const syntheticTitle = useSyntheticTitle()
  const {metadata, frontMatter} = useDoc()
  const brsAccent = brsAccentFromPermalink(metadata.permalink)
  const markdownRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const wrapper = docsWrapperFrom(markdownRef.current)
    if (!wrapper) return undefined
    if (brsAccent) wrapper.setAttribute("data-brs", brsAccent)
    else wrapper.removeAttribute("data-brs")
    return () => wrapper.removeAttribute("data-brs")
  }, [brsAccent])
  const pmId =
    typeof (frontMatter as {pm_id?: unknown})?.pm_id === "string"
      ? String((frontMatter as {pm_id: string}).pm_id)
      : null

  const isFoodDoc =
    metadata.permalink.includes("/docs/foods/") && Boolean(frontMatter?.id)
  const isSubstanceDoc =
    metadata.permalink.includes("/docs/substances/") && Boolean(frontMatter?.id)
  const isMineralSubstanceDoc =
    metadata.permalink.includes(
      "/docs/substances/nutrients/micronutrients/minerals/"
    ) && Boolean(frontMatter?.id)
  const allowMineralInchi =
    typeof (frontMatter as {show_inchi?: unknown})?.show_inchi === "boolean"
      ? Boolean((frontMatter as {show_inchi?: boolean}).show_inchi)
      : false

  const mainImage =
    typeof frontMatter?.main_image === "string" ? frontMatter.main_image : null

  const legacyMainImage =
    typeof (frontMatter as {legacy_main_image?: unknown})?.legacy_main_image ===
    "string"
      ? String(
          (frontMatter as {legacy_main_image?: string}).legacy_main_image
        )
      : null

  const legacyListImage =
    typeof (frontMatter as {legacy_list_image?: unknown})?.legacy_list_image ===
    "string"
      ? String(
          (frontMatter as {legacy_list_image?: string}).legacy_list_image
        )
      : null

  const preferredMainImage =
    typeof mainImage === "string"
      ? mainImage.replace(/_large\.webp$/i, "_medium.webp")
      : null

  const preferredLegacyMainImage =
    typeof legacyMainImage === "string"
      ? legacyMainImage.replace(/_large\.webp$/i, "_medium.webp")
      : null

  const heroCandidates = [
    preferredMainImage,
    preferredLegacyMainImage,
    legacyListImage,
  ].filter((v, i, arr): v is string => typeof v === "string" && arr.indexOf(v) === i)
  const resolvedMainImage = heroCandidates[0] ?? null

  const inchiImage =
    typeof (frontMatter as {inchi_image?: unknown})?.inchi_image === "string"
      ? String((frontMatter as {inchi_image?: string}).inchi_image)
      : null

  const inchikey =
    typeof (frontMatter as {inchikey?: unknown})?.inchikey === "string"
      ? String((frontMatter as {inchikey?: string}).inchikey)
      : null

  const fallbackInchiImage = inchikey
    ? `/img/inchi/${inchikey}.png`
    : null

  const ionNotation =
    typeof (frontMatter as {ion_notation?: unknown})?.ion_notation === "string"
      ? String((frontMatter as {ion_notation?: string}).ion_notation).trim()
      : null

  const ionMatch = ionNotation?.match(/^([A-Za-z]+)(\d*[+-])$/)
  const ionBase = ionMatch?.[1] ?? ionNotation
  const ionCharge = ionMatch?.[2] ?? null

  const mainImageSourceRaw = (frontMatter as {main_image_source?: unknown})
    ?.main_image_source
  const mainImageSource =
    typeof mainImageSourceRaw === "string"
      ? {url: mainImageSourceRaw.trim(), label: null as string | null}
      : mainImageSourceRaw &&
          typeof mainImageSourceRaw === "object" &&
          typeof (mainImageSourceRaw as {url?: unknown}).url === "string"
        ? {
            url: String((mainImageSourceRaw as {url: string}).url).trim(),
            label:
              typeof (mainImageSourceRaw as {label?: unknown}).label ===
              "string"
                ? String((mainImageSourceRaw as {label: string}).label).trim()
                : null,
          }
        : null

  return (
    <div ref={markdownRef} className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      <AdvancedNutritionProvider>
      <DocUtilityBar>
        {syntheticTitle && (
          <header>
            <Heading as="h1">{syntheticTitle}</Heading>
          </header>
        )}

      {(isFoodDoc || (isSubstanceDoc && !ionNotation)) && resolvedMainImage && (
        <div className="food-page-hero-wrap">
          <img
            src={resolvedMainImage}
            alt={metadata.title}
            className={clsx("food-page-hero", isSubstanceDoc && "substance-page-hero")}
            onError={(e) => {
              const img = e.currentTarget
              const nextIndex = Number(img.dataset.fallbackIndex || "0") + 1
              img.dataset.fallbackIndex = String(nextIndex)
              const next = heroCandidates[nextIndex]
              if (next) {
                img.src = next
                return
              }
              // Hide hero if no fallback works
              img.style.display = "none"
            }}
          />
          {isMineralSubstanceDoc &&
            resolvedMainImage.includes("wikimedia") && (
            <p className="mineral-photo-caption">
              Photo source: Wikipedia / Wikimedia Commons (Creative Commons).
            </p>
          )}
          {isFoodDoc && mainImageSource?.url && (
            <p className="mineral-photo-caption">
              Photo source:{" "}
              <a href={mainImageSource.url} rel="noopener noreferrer">
                {mainImageSource.label || mainImageSource.url}
              </a>
              .
            </p>
          )}
        </div>
      )}

      {isSubstanceDoc && ionNotation && (
        <p className="ion-notation-wrap" aria-label={`${metadata.title} ionic form`}>
          <span className="ion-notation-badge">
            {ionBase}
            {ionCharge && <sup>{ionCharge}</sup>}
          </span>
        </p>
      )}

      {isSubstanceDoc &&
        !ionNotation &&
        (!isMineralSubstanceDoc || allowMineralInchi) &&
        (inchiImage || inchikey) && (
        <div className="food-page-hero-wrap">
          {inchiImage ? (
            <img
              src={inchiImage}
              alt={`${metadata.title} structure`}
              className="food-page-hero substance-page-hero substance-structure-hero"
            />
          ) : (
            <InChIImage
              inchikey={inchikey ?? undefined}
              fallback={fallbackInchiImage ?? undefined}
              className="food-page-hero substance-page-hero substance-structure-hero"
              imageSize="720x720"
              style={{width: "auto", height: "auto"}}
            />
          )}
        </div>
      )}

        <MDXContent>{children}</MDXContent>
        {isSubstanceDoc && <SubstanceMatrix tag={String(frontMatter.id)} substanceId={String(frontMatter.id)} canonicalOnly />}
        {pmId && <TherapeuticAreaPmLinks pmId={pmId} />}
      </DocUtilityBar>
        <PmDietaryLeverEnhancer frontMatter={frontMatter as Record<string, unknown>} />
        <PmSystemOptimisationEnhancer frontMatter={frontMatter as Record<string, unknown>} />
      </AdvancedNutritionProvider>
    </div>
  )
}
