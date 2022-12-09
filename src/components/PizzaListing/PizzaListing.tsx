import React, { useEffect, useState } from 'react'
import { usePizzaContext } from '../../context/PizzaContext'
import Pizza from '../../types/PizzaType'
import PizzaForm from '../PizzaForm/PizzaForm'
import './styles.css'

const PizzaListing = (props: {personID: number}) => {
    const { personID } = props
    const { data: pizzaData, setData: setPizzaData } = usePizzaContext()
    const [personPizzas, setPersonPizzas] = useState<Pizza[]>([])

    useEffect(() => {
        setPersonPizzas(pizzaData?.pizzas?.filter((pizza: Pizza) => personID === pizza?.person))
    }, [pizzaData])

    return (
        <>
        {personPizzas?.length > 0 &&
            <table className="pizza-listing">
                <thead>
                    <tr>
                        <td>Topping</td>
                        <td>Order Datetime</td>
                    </tr>
                </thead>
                <tbody>
                    {personPizzas?.map((pizza: Pizza) => {
                        return (
                            <tr className="pizza-listing__row">
                                <td>{pizza?.topping}</td>
                                <td>{pizza?.timestamp}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        }
        {personPizzas?.length < 1 &&
            <div className="pizza-listing">No pizzas found for this person</div>
        }
        <PizzaForm personID={personID} />
        </>
    )
}

export default PizzaListing
