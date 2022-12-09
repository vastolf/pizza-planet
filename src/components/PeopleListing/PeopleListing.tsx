import React, { useEffect } from 'react'
import axios from 'axios'
import PersonForm from '../PersonForm/PersonForm';
import './styles.css'
import { usePeopleContext } from '../../context/PeopleContext';
import Person from '../../types/PersonType';
import PizzaToggle from '../PizzaToggle/PizzaToggle';
import PizzaListing from '../PizzaListing/PizzaListing';
import { usePizzaContext } from '../../context/PizzaContext';

const PeopleListing = () => {
    const { data: peopleData, setData: setPeopleData } = usePeopleContext()
    const { data: pizzaData, setData: setPizzaData } = usePizzaContext()
    
    const refreshPeopleData = async () => {
        if (peopleData.length > 0) return
        // Get people stored in database
        let peopleReq = await axios.get('/api/people')
        // If the status is not 200, return
        if (peopleReq?.status !== 200) return
        setPeopleData(peopleReq?.data)
    }

    const refreshPizzaData = async () => {
        if (pizzaData?.pizzas?.length > 0) return
        // Get Pizzas stored in the database
        let pizzaReq = await axios.get('/api/pizzas')
        // If the status is not 200, return
        if (pizzaReq?.status !== 200) return
        setPizzaData({...pizzaData, pizzas: pizzaReq?.data})
    }

    useEffect(() => {
        refreshPeopleData()
        refreshPizzaData()
    }, [])

    return (
        <>
            {(!!peopleData && peopleData.length > 0) &&
                <ul className="people-listing">
                    {peopleData?.map((person: Person) => {
                        return (
                            <li className="people-listing__item">
                                <div className="people-listing__item-details">
                                    <span>{person?.name}</span>
                                    <PizzaToggle personID={person?.id} />
                                </div>
                                {pizzaData?.selectedPerson === person?.id &&
                                    <PizzaListing personID={person?.id} />
                                }
                            </li>
                        )
                    })}
                    <li className="people-listing__item">
                        <PersonForm />
                    </li>
                </ul>
            }
        </>
    )
}

export default PeopleListing
