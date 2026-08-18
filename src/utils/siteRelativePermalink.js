/**
 * Store and render documentation links as site-relative paths.
 * Localhost or other absolute origins are preview-only; they must not be kept as source links.
 */
function siteRelativePermalink(permalink) {
  if (!permalink || typeof permalink !== "string") return permalink
  const trimmed = permalink.trim()
  if (!/^https?:\/\//i.test(trimmed)) return trimmed
  try {
    const url = new URL(trimmed)
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return trimmed
  }
}

module.exports = siteRelativePermalink
module.exports.siteRelativePermalink = siteRelativePermalink
