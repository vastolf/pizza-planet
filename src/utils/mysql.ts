import mysql, { ConnectionConfig, FieldInfo, MysqlError } from 'mysql'

// MYSQL creds used to open a connection to the database
const mysqlCredentials : ConnectionConfig = {
    host: process?.env?.MYSQL_DATABASE_HOST,
    database: process?.env?.MYSQL_DATABASE_NAME,
    user: process?.env?.MYSQL_DATABASE_USER,
    password: process?.env?.MYSQL_DATABASE_PASSWORD
}

/**
 * 
 * @param query The query that we want to send to the MYSQL database
 * @returns A Promise with the response data from the database.
 */
const mysqlQuery = async (query: string, params: string[]) : Promise<Object | Error> => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(mysqlCredentials);
        try {
            connection.query(
                query,
                params,
                (err: MysqlError | null, results: any) => {
                    if (err) throw err;
                    connection.end();
                    resolve(results)
                }
            );
        } catch (error) {
            connection.end();
            reject(error)
        }
    });
}

/**
 * 
 * @returns All people currently in the 'people' table of the database
 */
export const getPeople = async () => {
    const res = await mysqlQuery('SELECT * FROM people;', []);
    return res;
}

/**
 * 
 * @param name The name of the person we want to add
 * @returns true if: the name doesn't already exist in the database, it passes character validation, and is added to
 * the database successfully. Otherwise it returns false
 */
export const addPersonToDatabase = async (name: string) : Promise<boolean> => {
    try {
        const res = await mysqlQuery("INSERT INTO people (name) VALUES (?)", [name])
        return true
    } catch (error) {
        return false;
    }
}

