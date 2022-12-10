import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './styles.css'

const PizzaStreaks = () => {
    const [streaks, setStreaks] = useState<[]>([])

    const updatePizzaStreaksData = async () => {
        if (streaks?.length > 0) return
        const streaksReq = await axios.get('/api/pizzaStreaks')
        if (streaksReq?.status !== 200) return
        setStreaks(streaksReq?.data)
    }

    useEffect(() => {
        updatePizzaStreaksData()
    }, [])

    return (
        <div className="pizza-streaks">
            <h2>Streaks</h2>
            {streaks?.map(streak => {
                if (streak?.length === 1) return
                return (
                    <div className="pizza-streak__Item">Dates: {streak?.map(entry => { return entry?.date+", " })} Length: {streak?.length}</div>
                )
            })}
        </div>
    )
}

export default PizzaStreaks
