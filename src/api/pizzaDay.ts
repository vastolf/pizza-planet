import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import Pizza from '../types/PizzaType';
import { getUTCDateFromEpoch } from '../utils/date';
import { getPizzas } from '../utils/mysql'
import { yearIsValid, monthIsValid } from '../utils/validate';

const pizzaDay = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        // Only allow POST requests
        if (req?.method !== `POST`) {
            res.status(400)
            return
        }

        const body = req?.body
        
        // Guard clause to ensure we have a year and month selected
        // Ensure year and month are valid as well
        if (!body || !body?.year || !body?.month || !yearIsValid(body?.year) || !monthIsValid(body?.month)) {
            res.status(400)
            return
        }


        const pizzas : any = await getPizzas()

        const pizzasInMonth = pizzas
        ?.filter((pizza : Pizza) => {
            let pizzaDate = new Date(0)
            pizzaDate.setMilliseconds(pizza?.timestamp)
            return (pizzaDate?.getUTCFullYear() === parseInt(body?.year) && pizzaDate?.getUTCMonth() + 1 === parseInt(body?.month))
        })
        ?.reduce((days: {[date: string] : Pizza[]}, pizza : Pizza) => {
            const { timestamp } = pizza
             // easy way of "flattening" the dates so that pizzas ordered at different times of the day are still grouped
             const utcDate : string = getUTCDateFromEpoch(timestamp)
             // set this group to its current values or an empty array if none exists
             days[utcDate] = days[utcDate] ?? []
             // add the pizza to its date group
             days[utcDate].push(pizza)
             return days
        }, {})
    
        res.status(200).json(pizzasInMonth)
    } catch (err) {
        res.status(400)
    }
};

export default pizzaDay;