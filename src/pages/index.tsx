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
              <h2>The BRAIN Framework and The BRAIN Diet</h2>
              <p>
                The BRAIN Framework (Bio Regulation Algorithm & Integrated Neuronutrition) is a systems-based framework for brain health that maps how interconnected biological regulatory systems influence cognitive, emotional and behavioural function. It integrates evidence across nutrition and lifestyle, including neurotransmitter regulation, mitochondrial bioenergetics, inflammation and oxidative stress, the gut-brain axis, and metabolic and neuroendocrine regulation.
              </p>
              <p>
                Developed initially with a focus on ADHD, the BRAIN Framework investigates how these interacting biological systems may contribute to the heterogeneity, resilience and functional outcomes associated with ADHD and neurodivergence.
              </p>
              <p>
                The BRAIN Diet is the nutritional application of the BRAIN Framework, translating this biological architecture into evidence-informed dietary strategies, foods, nutrients, meal composition, timing and preparation. ADHD provides the framework's first defined research and application context, while many of the biological processes it maps are relevant across wider brain health.
              </p>
              <p>
                Individual responses to nutrition and lifestyle interventions vary, and no specific outcomes can be guaranteed. The BRAIN Framework and BRAIN Diet do not claim predetermined clinical effects. Their development is informed by an evolving body of research, with hypotheses and interventions intended to be evaluated empirically through observation and appropriately designed clinical studies.
              </p>
            </div>
          </div>
        </section>
        <DocsAreasGrid />
      </main>
    </Layout>
  )
}

