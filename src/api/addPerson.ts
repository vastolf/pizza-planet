import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { dbEntryStringIsValid } from '../utils/validate';
import { addPersonToDatabase } from '../utils/mysql';
import PersonAddRequest from '../types/PersonAddRequest';

const addPerson = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    if (req?.method !== `POST`) {
        res.status(400);
        return;
    }
    
    const body : PersonAddRequest = req?.body;

    if (!body || !body?.name || !dbEntryStringIsValid(body?.name)) {
        res.status(400)
        return;
    }

    const response = await addPersonToDatabase(body?.name?.toLowerCase())
    
    res?.status(200)?.json(response)
};

export default addPerson