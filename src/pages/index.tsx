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
              The BRAIN Diet is a systems-based nutrition framework designed to improve brain health by targeting key biological processes like neurotransmitter balance, mitochondrial function, inflammation, and the gut–brain axis. While tailored for ADHD and neurodivergent needs, it supports cognitive and emotional performance in everyone.
              </p>
            </div>
          </div>
        </section>
        <DocsAreasGrid />
      </main>
    </Layout>
  )
}
