import React, { useState, useEffect } from 'react'
import PersonListing from './PersonListingType';
import axios from 'axios'
import { Link } from 'gatsby';
import './styles.css'

const PeopleListing = () => {
    const [people, setPeople] = useState<PersonListing>()
    
    const setPeopleData = async () => {
        if (!!people) return
        // Get people stored in database
        let peopleReq = await axios.get('/api/people')
        // If the status is not 200, return null
        if (peopleReq?.status !== 200) return null
        setPeople(peopleReq?.data)
    }

    useEffect(() => {
        setPeopleData()
    }, [])

    console.log(people)

    return (
        <>
            {!!people &&
                <ul className="people-listing">
                    {people?.map((person) => {
                        return <li>{person?.name}</li>
                    })}
                </ul>
            }
        </>
    )
}

export default PeopleListing
