import React from "react"
import { PeopleContextProvider } from "./src/context/PeopleContext"
import { PizzaContextProvider } from "./src/context/PizzaContext"

export const wrapRootElement = ({ element }) => (
    <PeopleContextProvider>
        <PizzaContextProvider>
            {element}
        </PizzaContextProvider>
    </PeopleContextProvider>
)