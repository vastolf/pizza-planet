import React, { useState } from 'react'
import axios from 'axios';
import { usePizzaContext } from '../../context/PizzaContext';

const PizzaForm = (props: {personID: number}) => {
    const { personID } = props
    const { data: pizzaData, setData: setPizzaData } = usePizzaContext()
    const [topping, setTopping] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        // Don't allow submissions if loading / submitting
        if (loading) return
        // Set loading to true to avoid double submissions
        setLoading(true)
        // Attempt to add pizza; will return true if successful
        const response = await axios.post('/api/addPizza', {personID: personID, topping: topping})
        // if successfull
        if (response) {
            // Get updated list of pizzas (this is a bit brutish, pulling the entire list is not necessary; usually would
            // offset the selection to only get the entires we don't already have, but trying to keep this simple)
            let pizzaUpdates = await axios.get('/api/pizzas')
            // If good response
            if (pizzaUpdates?.status === 200) {
                // Update pizza data and reset name
                setPizzaData({...pizzaData, pizzas: pizzaUpdates?.data})
                setTopping('')
            }
        }
        // always set loading to false when done
        setLoading(false)
    }

    const handleTopping = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        setTopping(event?.target?.value)
    }

    return (
        <form className="pizza-form" onSubmit={handleSubmit}>
            <label htmlFor="topping">
                <span>Enter Topping: </span>
                <input
                    id="topping"
                    name="topping"
                    placeholder="Topping"
                    type="text"
                    className="pizza-form__input"
                    value={topping}
                    onChange={handleTopping}
                    />
            </label>
            <button type="submit">Add Pizza</button>
        </form>
    )
}

export default PizzaForm
