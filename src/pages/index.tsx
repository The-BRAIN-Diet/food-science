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
              The research lens we have adopted is not just to focus on substances and dietary practices that solely relate to ADHD but to address systemic problems that affect everybody,  but which are particularly correlated to the ADHD population. 

</p><p>Only with such an inclusive and extensive sweep of this highly interrelated field will the answers and possible solutions be found. While many disorders share genetic and biological pathways, the key may not always lie in their direct connections, but rather in understanding the underlying causes they have in common.              </p>
              <p>The key bio regulation targets:</p>
              <ul>
                <li>🧠 Neurotransmitter synthesis and regulation: Supports dopamine, serotonin, and focus through amino acid availability and precursors for neurotransmitter and protein synthesis.</li>
                <li>⚡ Mitochondrial energy: Boosts ATP (adenosine triphosphate), the cell's energy source, to increase mental and physical stamina—central to ADHD and bipolar disorders.</li>
                <li>🍬 Glucose and insulin regulation: Balances blood sugar for mood stability plus cognitive and emotional balance.</li>
                <li>🔥 Inflammation and oxidative stress mitigation: Regulates the balance between free radicals and antioxidants, reducing brain fog and neuroinflammation.</li>
                <li>🔬 Methylation cycles: Aids DNA repair, neurotransmitter metabolism, and detoxification.</li>
                <li>🌿 Gut–brain axis: Optimizes gut microbiota for brain signalling.</li>
                <li>🥑 Omega-3 balance: Supports flexible, resilient brain membranes.</li>
                <li>⏱️ Hormonal regulation: Helps manage stress and the HPA axis, the body's stress-control system.</li>
              </ul>
            </div>
          </div>
        </section>
        <DocsAreasGrid />
      </main>
    </Layout>
  )
}
