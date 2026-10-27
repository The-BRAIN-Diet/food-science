const siteRelativePermalink = require("../../utils/siteRelativePermalink")

/**
 * Read-only ontology projection data.
 *
 * Unlike category-listing, this includes documents that have no tags so
 * relationship components can resolve canonical PM/KC front matter directly.
 */
module.exports = async function ontologyProjectionPlugin(context) {
  return {
    name: "ontology-projection",
    async allContentLoaded({actions, allContent}) {
      const {setGlobalData} = actions
      const versions =
        allContent["docusaurus-plugin-content-docs"]?.default?.loadedVersions || []
      const docs = versions.flatMap((version) =>
        version.docs.map((doc) => ({
          title: doc.title,
          permalink: siteRelativePermalink(doc.permalink),
          description: doc.description,
          tags: doc.tags,
          frontMatter: doc.frontMatter,
        })),
      )

      const {createDietaryPathwayIndex} = await import('../../../scripts/lib/dietary-pathway-index.mjs');
      const dietaryPathways = createDietaryPathwayIndex(context.siteDir);
      if (dietaryPathways.errors.length) throw new Error(JSON.stringify(dietaryPathways.errors));
      setGlobalData({
        dietaryPathways,
        docs: Array.from(new Map(docs.map((doc) => [doc.permalink, doc])).values()),
      })
    },
  }
}
