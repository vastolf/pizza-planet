import React, { useState } from 'react'
import axios from 'axios';
import './styles.css'
const PeopleListing = () => {
    const [name, setName] = useState<string>();

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        const response = await axios.post('/api/addPerson', {name: name})
        console.log(response?.data)
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

export default PeopleListing
