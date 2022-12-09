import React, { useEffect } from 'react'
import axios from 'axios'
import PersonForm from '../PersonForm/PersonForm';
import './styles.css'
import { usePeopleContext } from '../../context/PeopleContext';
import Person from '../Person/PersonType';

const PeopleListing = () => {
    const { data: peopleData, setData: setPeopleData } = usePeopleContext()
    
    const refreshPeopleData = async () => {
        if (peopleData.length > 0) return
        // Get people stored in database
        let peopleReq = await axios.get('/api/people')
        // If the status is not 200, return null
        if (peopleReq?.status !== 200) return null
        setPeopleData(peopleReq?.data)
    }

    useEffect(() => {
        refreshPeopleData()
    }, [])

    return (
        <>
            {(!!peopleData && peopleData.length > 0) &&
                <ul className="people-listing">
                    {peopleData?.map((person: Person) => {
                        return <li className="people-listing__item">{person?.name}</li>
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
