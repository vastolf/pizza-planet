import React from 'react'
import axios from 'axios'
import { usePizzaContext } from '../../context/PizzaContext'
import { usePeopleContext } from '../../context/PeopleContext'
import './styles.css'

const RefreshDatabase = () => {
    const { data: pizzaData, setData: setPizzaData } = usePizzaContext()
    const { data: peopleData, setData: setPeopleData } = usePeopleContext()
    
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        const databaseReset : Object = await axios.get('/api/resetDatabase')
        let peopleReq = await axios.get('/api/people')
        setPeopleData(peopleReq?.data)
        let pizzaReq = await axios.get('/api/pizzas')
        setPizzaData({selectedPerson: null, pizzas: pizzaReq?.data})
    }

    return (
        <form className="refresh-database" onSubmit={handleSubmit}>
            <button type="submit" className="refresh-database__button">Reset Database to Default Values</button>
        </form>
    )
}

export default RefreshDatabase
