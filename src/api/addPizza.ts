import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { dbEntryStringIsValid } from '../utils/validate';
import { addPizzaToDatabase } from '../utils/mysql';
import PizzaAddRequest from '../types/PizzaAddRequest';

const addPizza = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        if (req?.method !== `POST`) {
            res.status(400);
            return;
        }
        
        const body : PizzaAddRequest = req?.body;
    
        if (!body || !body?.topping || !dbEntryStringIsValid(body?.topping)) {
            res.status(400)
            return;
        }
    
        const response = await addPizzaToDatabase(body?.personID?.toString(), body?.topping?.toLowerCase())
        
        res?.status(200)?.json(response)
    } catch (err) {
        res.status(400)
    }
};

export default addPizza