import type {ReactNode} from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import Heading from "@theme/Heading"
import styles from "./styles.module.css"

type DocsAreaItem = {
  title: string
  description: string
  link: string
  icon: string
}

const DocsAreasList: DocsAreaItem[] = [
  {
    title: "Biological Targets",
    description: "Explore the key biological systems targeted by the BRAIN Diet for optimal brain health.",
    link: "/docs/biological-targets",
    icon: "/img/icons/biological-targets.svg",
  },
  {
    title: "Nutrients",
    description: "Essential vitamins, minerals, amino acids, fatty acids, and phospholipids that support brain function.",
    link: "/docs/substances/nutrients",
    icon: "/img/icons/nutrients.svg",
  },
  {
    title: "Bioactive Substances",
    description: "Non-essential functional compounds including polyphenols, flavonoids, carotenoids, terpenes, and lipid bioactives.",
    link: "/docs/substances/bioactive-substances",
    icon: "/img/icons/bioactive.svg",
  },
  {
    title: "Metabolites",
    description: "Microbiome-derived metabolites like SCFAs and urolithin A that support gut-brain axis communication.",
    link: "/docs/substances/metabolites",
    icon: "/img/icons/metabolite.svg",
  },
  {
    title: "Metabolic Response",
    description: "Understand how the body responds to nutrition and stress for metabolic health.",
    link: "/docs/biological-targets/metabolic-response",
    icon: "/img/icons/biological-targets.svg",
  },
  {
    title: "Therapeutic Areas",
    description: "Explore how the BRAIN Diet supports various therapeutic applications.",
    link: "/docs/therapeutic-areas",
    icon: "/img/icons/biological-targets.svg",
  },
  {
    title: "Recipes",
    description: "Discover brain-healthy recipes designed to support cognitive function.",
    link: "/docs/recipes",
    icon: "/img/icons/recipes.svg",
  },
  {
    title: "Papers",
    description: "Access research papers and scientific literature supporting the BRAIN Diet.",
    link: "/docs/papers",
    icon: "/img/icons/papers.svg",
  },
  {
    title: "Training",
    description: "Educational resources and training materials for implementing the BRAIN Diet.",
    link: "/docs/training",
    icon: "/img/icons/papers.svg",
  },
  {
    title: "Partners",
    description: "Connect with our partners and collaborators in brain health research.",
    link: "/docs/partners",
    icon: "/img/icons/biological-targets.svg",
  },
]

function DocsArea({title, description, link, icon}: DocsAreaItem) {
  return (
    <div className={clsx("col col--4", styles.docsArea)}>
      <Link to={link} className={styles.docsAreaLink}>
        <div className={styles.docsAreaCard}>
          <div className={styles.iconContainer}>
            <img src={icon} alt={title} className={styles.icon} />
          </div>
          <div className={styles.content}>
            <Heading as="h3" className={styles.title}>
              {title}
            </Heading>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function DocsAreasGrid(): ReactNode {
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
          {DocsAreasList.map((props, idx) => (
            <DocsArea key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
