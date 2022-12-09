import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { getPizzas } from '../utils/mysql'

const pizzas = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        if (req?.method !== `GET`) {
            res.status(400)
            return;
        }
        
        const pizzas : any = await getPizzas()
        const sortedPizzas = pizzas.sort((a : Object, b: Object) => {return a?.timestamp - b?.timestamp})
        const pizzaDays = {}
        
        Object.keys(sortedPizzas).forEach((pizza) => {
            const thisPizza = sortedPizzas[pizza]
            const date = new Date(0)
            date.setUTCMilliseconds(thisPizza.timestamp)
            console.log(thisPizza?.person, thisPizza?.topping, date.toUTCString())
            console.log(thisPizza?.timestamp)
        })
    
        res.status(200).json(pizzas)
    } catch (err) {
        res.status(400)
    }
};

export default pizzas;