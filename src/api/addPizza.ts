import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { dbEntryStringIsValid } from '../utils/validate';
import { addPizzaToDatabase } from '../utils/mysql';
import PizzaAddRequest from '../types/PizzaAddRequest';

const addPizza = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        // Only accept POST requests
        if (req?.method !== `POST`) {
            res.status(400);
            return
        }
        
        // Cast request body to a PizzaAddRequest type
        const body : PizzaAddRequest = req?.body;
    
        // Guard clause to prevent attempting to add pizzas that do not have a valid topping defined
        if (!body || !body?.topping || !dbEntryStringIsValid(body?.topping)) {
            res.status(400)
            return
        }
        
        // Date we're going to pass as the date/time the pizza was consumed
        const date = new Date()

        // Add the pizza to the database; this will return true if successful and false otherwise
        const response = await addPizzaToDatabase(body?.personID?.toString(), body?.topping?.toLowerCase(), date.toUTCString())
        
        // If response is falsey, we'll just return a 400 error. In a real application there are better
        // ways to handle this. We probably won't implement error handling on the front end as this is
        // just an exercise
        if (response === false) {
            res.status(400)
            return
        }

        res?.status(200)?.json(response)
    } catch (err) {
        res.status(400)
    }
};

export default addPizza