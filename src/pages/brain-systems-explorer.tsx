import type {ReactNode} from "react"
import Head from "@docusaurus/Head"
import Layout from "@theme/Layout"
import BrainSystemsExplorer from "@site/src/components/BrainSystemsExplorer"

export default function BrainSystemsExplorerTestPage(): ReactNode {
  return (
    <Layout
      title="Brain systems explorer (test)"
      description="Development preview of the BrainSystemsExplorer component. Not linked from the homepage."
    >
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="container margin-vert--lg">
        <BrainSystemsExplorer />
      </main>
    </Layout>
  )
}
