import * as React from "react"
import Layout from "../components/Layout/Layout"
import type { HeadFC, PageProps } from "gatsby"
import PeopleListing from "../components/PeopleListing/PeopleListing"
import { usePeopleContext } from "../context/PeopleContext"
import { usePizzaContext } from "../context/PizzaContext"
import RefreshDatabase from "../components/RefreshDatabase/RefreshDatabase"
import PizzaStreaks from "../components/PizzaStreaks/PizzaStreaks"

const IndexPage: React.FC<PageProps> = () => {
  const { data: peopleData, setData: setPeopleData } = usePeopleContext()
  const { data: pizzaData, setData: setPizzaData } = usePizzaContext()
  return (
    <Layout>
      <PeopleListing />
      <PizzaStreaks />
      <RefreshDatabase />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
