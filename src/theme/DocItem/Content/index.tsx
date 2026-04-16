import React, {type ReactNode} from "react"
import clsx from "clsx"
import {ThemeClassNames} from "@docusaurus/theme-common"
import {useDoc} from "@docusaurus/plugin-content-docs/client"
import Heading from "@theme/Heading"
import MDXContent from "@theme/MDXContent"
import InChIImage from "@theme/InChIImage"
import type {Props} from "@theme/DocItem/Content"

function useSyntheticTitle(): string | null {
  const {metadata, frontMatter, contentTitle} = useDoc()
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === "undefined"
  if (!shouldRender) return null
  return metadata.title
}

export default function DocItemContent({children}: Props): ReactNode {
  const syntheticTitle = useSyntheticTitle()
  const {metadata, frontMatter} = useDoc()

  const isFoodDoc =
    metadata.permalink.includes("/docs/foods/") && Boolean(frontMatter?.id)
  const isSubstanceDoc =
    metadata.permalink.includes("/docs/substances/") && Boolean(frontMatter?.id)

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

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}

      {isFoodDoc && resolvedMainImage && (
        <p className="food-page-hero-wrap">
          <img
            src={resolvedMainImage}
            alt={metadata.title}
            className="food-page-hero"
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
        </p>
      )}

      {isSubstanceDoc && (inchiImage || inchikey) && (
        <p className="substance-structure-wrap">
          {inchiImage ? (
            <img
              src={inchiImage}
              alt={`${metadata.title} structure`}
              className="substance-structure-inline"
            />
          ) : (
            <InChIImage
              inchikey={inchikey ?? undefined}
              fallback={fallbackInchiImage ?? undefined}
              className="substance-structure-inline"
            />
          )}
        </p>
      )}

      <MDXContent>{children}</MDXContent>
    </div>
  )
}