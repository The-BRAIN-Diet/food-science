import type {ReactNode} from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageHero from "@site/src/components/HomepageHero"
import DocsAreasGrid from "@site/src/components/DocsAreasGrid"
import styles from "./index.module.css"

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext()
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHero />
      <main>
        <section className={styles.prefaceSection}>
          <div className="container">
            <div className={styles.prefaceContent}>
              <h2>A BRAIN Health Framework and Diet</h2>
              <p>
              The BRAIN Diet is a systems-based nutrition framework designed to support brain health by addressing key biological processes such as neurotransmitter balance, mitochondrial function, inflammation, and the gut–brain axis. Developed in the context of research on ADHD, neurodevelopmental disorders, neurodegeneracy, and neurodivergence, it focuses on supporting core cognitive and emotional functions relevant to everybody.
              </p>
              <p>
              Individual responses to dietary and lifestyle interventions vary, and no specific outcomes can be guaranteed. The BRAIN Diet does not claim to deliver predetermined clinical effects; rather, its development is informed by an evolving body of research, and its impact will be evaluated empirically through observation and appropriately designed clinical studies.
              </p>
            </div>
          </div>
        </section>
        <DocsAreasGrid />
      </main>
    </Layout>
  )
}

