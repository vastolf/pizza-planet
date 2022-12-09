import * as React from "react"
import Layout from "../components/Layout/Layout"
import type { HeadFC, PageProps } from "gatsby"
import PeopleListing from "../components/PeopleListing/PeopleListing"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <PeopleListing />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
