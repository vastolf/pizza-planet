import React, { useState, useContext, createContext } from 'react'
import Person from '../components/Person/PersonType'

export const initialState = {
    data: [],
    setData: () => {}
}

export const PeopleContext = createContext(initialState)
export const usePeopleContext = () => useContext(PeopleContext)

export const PeopleContextProvider = (props: {children: JSX.Element | JSX.Element[]}) => {
  const { children } = props
  const [data, setData] = useState<Person[] | []>(initialState.data)

  return (
    <PeopleContext.Provider
      value={{
        data,
        setData
      }}
    >
      {children}
    </PeopleContext.Provider>
  )
}