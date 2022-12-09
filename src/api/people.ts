import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { getPeople } from '../utils/mysql'

const people = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        if (req?.method !== `GET`) {
            res.status(400)
            return;
        }
        
        const people = await getPeople()
    
        res.status(200).json(people)
    } catch (err) {
        res.status(400)
    }
};

export default people;