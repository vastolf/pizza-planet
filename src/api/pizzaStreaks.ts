import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { getUTCDateFromEpoch } from '../utils/date';
import { getPizzas } from '../utils/mysql'
import Pizza from '../types/PizzaType'

const pizzaStreaks = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        // Only accept GET requests
        if (req?.method !== `GET`) {
            res.status(400)
            return;
        }
        // get pizzas
        const pizzas : any = await getPizzas()
        // sort pizzas by date (ascending) so it's easier to perform streak calcs, then group them (via .reduce) 
        // by their UTC date string so we can calculate streaks; group = accumulator, pizza = current. 
        // We also pass an empty object as the second arg of .reduce so that the first
        // item is not excluded from grouping
        const groupedPizzas : {[key: string] : Pizza[]} = pizzas
            .sort((a : Pizza, b: Pizza) => {return a?.timestamp - b?.timestamp})
            .reduce((groups: {[date: string] : Pizza[]}, pizza: Pizza) => {
                const { timestamp } = pizza
                // easy way of "flattening" the dates so that pizzas ordered at different times of the day are still grouped
                const utcDate : string = getUTCDateFromEpoch(timestamp)
                // set this group to its current values or an empty array if none exists
                groups[utcDate] = groups[utcDate] ?? []
                // add the pizza to its date group
                groups[utcDate].push(pizza)
                return groups
            }, {})
        
        // Use Object.entries to loop over the object we created above, again using .reduce
        // this does not have full Type coverage as this is a test application & Object.entries complicates this;
        // we can be sure of the data structure, but in a real application we'd want to ensure full Type coverage
        const pizzaStreaks = Object.entries(groupedPizzas).reduce((streaks, group) => {
            // For each group, the first array is the "date" string
            const date = group[0]
            // The second array is the listing of pizzas under this date
            const pizzas = group[1]
            // Create a new object that doesn't include data we don't need about the pizzas such as the topping,
            // just the date and the amount of pizzas consumed on that date
            const groupInfo = {date: date, pizzaCount: pizzas?.length}
            
            // Add current group's info to streaks
            streaks.push([groupInfo])

            // If we're on the first group, just return accumulator
            if (streaks?.length === 1) return streaks

            // Otherwise, get the previous streak as we can be sure there are at least 2 entries now
            const previous = streaks[streaks.length - 2]
            
            // If the current group's pizza count is greater than the last entry in the previous streak 
            if (pizzas?.length > previous[previous.length - 1]?.pizzaCount) {
                // Add the current group to the existing streak it should be a member of
                streaks[streaks.length - 2].push(groupInfo)
                // Remove the now duplicate entry of the current group
                streaks.splice(streaks.length - 1, 1)
            }
            return streaks
        }, [])
    
        res.status(200).json(pizzaStreaks)
    } catch (err) {
        res.status(400)
    }
};

export default pizzaStreaks;