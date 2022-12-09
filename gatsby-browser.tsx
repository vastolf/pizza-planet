import React from "react"
import { PeopleContextProvider } from "./src/context/PeopleContext"

export const wrapRootElement = ({ element }) => (
    <PeopleContextProvider>{element}</PeopleContextProvider>
)