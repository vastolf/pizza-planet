import React, { useState } from 'react'
import axios from 'axios';
import { usePeopleContext } from '../../context/PeopleContext';

const PersonForm = () => {
    const { data: peopleData, setData: setPeopleData } = usePeopleContext()
    const [name, setName] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        // Don't allow submissions if loading / submitting
        if (loading) return
        // Set loading to true to avoid double submissions
        setLoading(true)
        // Attempt to add person; will return true if successful
        const response = await axios.post('/api/addPerson', {name: name})
        // if successfull
        if (response) {
            // Get updated list of people (this is a bit brutish, pulling the entire list is not necessary; usually would
            // offset the selection to only get the entires we don't already have, but trying to keep this simple)
            let peopleUpdates = await axios.get('/api/people')
            // If good response
            if (peopleUpdates?.status === 200) {
                // Update people data and reset name
                setPeopleData(peopleUpdates?.data)
                setName('')
            }
        }
        // always set loading to false when done
        setLoading(false)
    }

    const handleName = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        setName(event?.target?.value)
    }

    return (
        <form className="person-form" onSubmit={handleSubmit}>
            <input type="text" className="person-form__input" value={name} onChange={handleName} />
            <button type="submit">Add Person</button>
        </form>
    )
}

export default PersonForm
