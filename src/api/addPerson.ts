import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { newPersonNameIsValid } from '../utils/validate';
import { addPersonToDatabase } from '../utils/mysql';

const addPerson = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    if (req?.method !== `POST`) {
        res.status(400);
        return;
    }
    
    const body = req?.body;

    if (!body || !body?.name || !newPersonNameIsValid(body?.name)) {
        res.status(400)
        return;
    }

    const response = await addPersonToDatabase(body?.name)
    
    res?.status(200)?.json(response)
};

export default addPerson