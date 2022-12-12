import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usePizzaContext } from '../../context/PizzaContext'
import './styles.css'

const PizzaDay = () => {
    const [days, setDays] = useState<{}>({})
    const [month, setMonth] = useState<number>(1)
    const [year, setYear] = useState<number>(2015)
    const [biggestDay, setBiggestDay] = useState<[]>([])
    const { data: pizzaData, setData: setPizzaData } = usePizzaContext()
    const months : number[] = [...Array(12).keys()]
    const currentDate = new Date()
    let years : number[] = []
    for (var i = 2015; i <= currentDate?.getUTCFullYear(); i++) {
        years.push(i);
    }
    
    const updatePizzaDaysData = async () => {
        const daysReq = await axios.post('/api/pizzaDay', {month: month, year: year})
        if (daysReq?.status !== 200) return
        
        const bigDay = Object.entries(daysReq?.data)
        ?.filter((group) => {
            return group[0].indexOf(year.toString()+'-'+month.toString()) > -1
        })
        ?.reduce((biggest, group) => biggest.length > group[1]?.length ? biggest : group, [])
        setBiggestDay(bigDay)
    }

    const handleMonth = (event : React.ChangeEvent<HTMLSelectElement>) : void => {
        setMonth(parseInt(event?.target?.value))
    }

    const handleYear = (event : React.ChangeEvent<HTMLSelectElement>) : void => {
        setYear(parseInt(event?.target?.value))
    }

    useEffect(() => {
        updatePizzaDaysData()
    }, [pizzaData, month, year])

    return (
        <div className="pizza-days">
            <h2>Pizza Days</h2>
            <form className="pizza-days__form">
                <div className="pizza-days__desc">Select a Year & Month to see the Day of the month that the most pizzas were eaten on</div>
                <label htmlFor="year" className="pizza-days__label">
                    <span>Year: </span>
                    <select id="year" name="year" className="pizza-days__select" onChange={handleYear}>
                        {years?.map(year => {
                            return (<option key={year} value={year}>{year}</option>)
                        })}
                    </select>
                </label>
                <label htmlFor="month" className="pizza-days__label">
                    <span>Month: </span>
                    <select id="month" name="month" className="pizza-days__select" onChange={handleMonth}>
                        {months?.map(month => {
                            return (<option key={month} value={month + 1}>{month + 1}</option>)
                        })}
                    </select>
                </label>
            </form>
            <div className="pizza-days__date">
                {(!!biggestDay && biggestDay.length > 0) &&
                    <div>The most pizzas were eaten on this day of the selected month: <strong>{biggestDay[0]}</strong></div>
                }
                {(!biggestDay || biggestDay?.length === 0) &&
                    <div>No Pizzas were eaten on the selected month in the selected year.</div>
                }
            </div>
        </div>
    )
}

export default PizzaDay
