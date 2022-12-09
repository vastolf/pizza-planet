import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { getPizzas } from '../utils/mysql'

const pizzas = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        if (req?.method !== `GET`) {
            res.status(400)
            return;
        }
        
        const pizzas = await getPizzas()
    
        res.status(200).json(pizzas)
    } catch (err) {
        res.status(400)
    }
};

export default pizzas;