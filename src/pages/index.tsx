import type {ReactNode} from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageHero from "@site/src/components/HomepageHero"
import DocsAreasGrid from "@site/src/components/DocsAreasGrid"

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext()
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHero />
      <main>
        <DocsAreasGrid />
      </main>
    </Layout>
  )
}
