import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { setDefaultDatabaseData } from '../utils/mysql'

const pizzas = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        if (req?.method !== `GET`) {
            res.status(400)
            return;
        }
        
        const databaseRefreshed = await setDefaultDatabaseData()

        if (databaseRefreshed === true) {
            res.status(200).json(true)
            return;
        }

        res.status(400)
    } catch (err) {
        res.status(400)
    }
};

export default pizzas;