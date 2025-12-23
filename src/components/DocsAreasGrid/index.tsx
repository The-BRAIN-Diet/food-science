import type {ReactNode} from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import Heading from "@theme/Heading"
import {usePluginData} from "@docusaurus/useGlobalData"
import styles from "./styles.module.css"

type DocItem = {
  title: string
  description: string
  permalink: string
  order: number
  frontMatter: {
    list_image?: string
  }
}

function DocsArea({doc}: {doc: DocItem}) {
  const icon = doc.frontMatter.list_image || "/img/icons/biological-targets.svg"

  return (
    <div className={clsx("col col--2", styles.docsArea)}>
      <Link to={doc.permalink} className={styles.docsAreaLink}>
        <div className={styles.docsAreaCard}>
          <div className={styles.iconContainer}>
            <img src={icon} alt={doc.title} className={styles.icon} />
          </div>
          <div className={styles.content}>
            <Heading as="h3" className={styles.title}>
              {doc.title}
            </Heading>
            <p className={styles.description}>{doc.description || ""}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function DocsAreasGrid(): ReactNode {
  const allTags = usePluginData("category-listing")
  const areaDocs: DocItem[] = allTags?.["Area"] || []

  // Define the visible areas in the desired order - filter by permalink path
  const visibleDocs = areaDocs.filter(doc => {
    const permalink = doc.permalink?.toLowerCase() || ""
    return (
      permalink.includes("/recipes") ||
      permalink.includes("/foods") ||
      permalink.includes("/biological-targets") ||
      permalink.includes("/substances") ||
      permalink.includes("/therapeutic-areas")
    ) && !(
      permalink.includes("/training") ||
      permalink.includes("/symptoms") ||
      permalink.includes("/partners") ||
      permalink.includes("/interventions")
    )
  })

  // Sort by sidebar_position (order): Recipes (1), Foods (2), Biological Targets (3), Substances (4), Therapeutic Areas (5)
  const sortedDocs = visibleDocs.sort((a, b) => a.order - b.order)

  return (
    <section className={styles.docsAreas}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <Heading as="h2" className={styles.sectionTitle}>
              Explore Our Resources
            </Heading>
            <p className={styles.sectionDescription}>Discover comprehensive information about the BRAIN Diet and its components</p>
          </div>
        </div>
        <div className="row">
          {sortedDocs.map((doc, idx) => (
            <DocsArea key={doc.permalink || idx} doc={doc} />
          ))}
        </div>
      </div>
    </section>
  )
}
