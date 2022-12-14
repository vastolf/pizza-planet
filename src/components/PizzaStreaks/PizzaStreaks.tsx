import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usePizzaContext } from '../../context/PizzaContext'
import './styles.css'

const PizzaStreaks = () => {
    const [streaks, setStreaks] = useState<[]>([])
    const { data: pizzaData, setData: setPizzaData } = usePizzaContext()

    const updatePizzaStreaksData = async () => {
        const streaksReq = await axios.get('/api/pizzaStreaks')
        if (streaksReq?.status !== 200) return
        setStreaks(streaksReq?.data)
    }

    useEffect(() => {
        updatePizzaStreaksData()
    }, [pizzaData])

    return (
        <div className="pizza-streaks">
            <h2>Streaks</h2>
            {streaks?.map(streak => {
                if (streak?.length === 1) return
                return (
                    <div className="pizza-streak__item">
                        <span>Dates: {streak?.map(entry => { return entry?.date+", " })}</span> 
                        <span>Length of Streak: {streak?.length}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default PizzaStreaks
