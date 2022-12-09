import React, { useState, useContext, createContext } from 'react'
import { PizzaContextData } from '../types/PizzaContextType'

export const initialState = {
    data: {
        selectedPerson: null,
        pizzas: []
    },
    setData: () => {}
}

export const PizzaContext = createContext(initialState)
export const usePizzaContext = () => useContext(PizzaContext)

export const PizzaContextProvider = (props: {children: JSX.Element | JSX.Element[]}) => {
  const { children } = props
  const [data, setData] = useState<PizzaContextData[] | []>(initialState.data)

  return (
    <PizzaContext.Provider
      value={{
        data,
        setData
      }}
    >
      {children}
    </PizzaContext.Provider>
  )
}