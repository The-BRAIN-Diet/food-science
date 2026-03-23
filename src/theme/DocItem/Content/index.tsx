import React, {type ReactNode} from "react"
import clsx from "clsx"
import {ThemeClassNames} from "@docusaurus/theme-common"
import {useDoc} from "@docusaurus/plugin-content-docs/client"
import Heading from "@theme/Heading"
import MDXContent from "@theme/MDXContent"
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
  const isFoodDoc = metadata.permalink.includes("/docs/foods/") && Boolean(frontMatter?.id)
  const fallbackImage = "/img/icons/ingredients.svg"
  const mainImage = typeof frontMatter?.main_image === "string" ? frontMatter.main_image : null
  const legacyMainImage =
    typeof (frontMatter as {legacy_main_image?: unknown})?.legacy_main_image === "string"
      ? String((frontMatter as {legacy_main_image?: string}).legacy_main_image)
      : null
  const legacyListImage =
    typeof (frontMatter as {legacy_list_image?: unknown})?.legacy_list_image === "string"
      ? String((frontMatter as {legacy_list_image?: string}).legacy_list_image)
      : null
  const preferredMainImage =
    typeof mainImage === "string" ? mainImage.replace(/_large\.webp$/i, "_medium.webp") : null
  const preferredLegacyMainImage =
    typeof legacyMainImage === "string"
      ? legacyMainImage.replace(/_large\.webp$/i, "_medium.webp")
      : null
  const resolvedMainImage = preferredMainImage || preferredLegacyMainImage || legacyListImage

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      {isFoodDoc && resolvedMainImage && (
        <p>
          <img
            src={resolvedMainImage}
            alt={metadata.title}
            style={{width: "100%", maxWidth: "760px", height: "auto", borderRadius: 4}}
            onError={(e) => {
              e.currentTarget.onerror = null
              if (preferredLegacyMainImage) {
                e.currentTarget.src = preferredLegacyMainImage
                return
              }
              if (legacyListImage) {
                e.currentTarget.src = legacyListImage
                return
              }
              e.currentTarget.src = fallbackImage
            }}
          />
        </p>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  )
}

