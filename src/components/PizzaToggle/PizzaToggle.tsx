import React from 'react'
import { usePizzaContext } from '../../context/PizzaContext'

const PizzaToggle = (props: {personID: number}) => {
    const { personID } = props
    const { data: pizzaData, setData: setPizzaData } = usePizzaContext()
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        setPizzaData({...pizzaData, selectedPerson: personID})
    }

    return (
        <form className="pizza-toggle" onSubmit={handleSubmit}>
            <button type="submit" className="pizza-toggle__button">View Pizzas</button>
        </form>
    )
}

export default PizzaToggle
