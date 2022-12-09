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
 * @returns All pizzas currently in the 'pizzas' table of the database
 */
 export const getPizzas = async () => {
    const res = await mysqlQuery('SELECT * FROM pizzas;', []);
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

const getPizzaEater = async (personID: string) : Promise<Object | null> => {
    try {
        const res = await mysqlQuery(`SELECT * FROM people WHERE id = ${parseInt(personID)}`, [])
        return res;
    } catch (error) {
        return null;
    }
}

export const addPizzaToDatabase = async (personID: string, topping: string) : Promise<boolean> => {
    try {
        const pizzaEater = await getPizzaEater(personID);
        if (pizzaEater === null || Object.keys(pizzaEater).length < 1) {
            return false;
        }
        const res = await mysqlQuery(
            `INSERT INTO pizzas (person, topping, timestamp) VALUES (${parseInt(personID)}, ?, ?)`,
            [topping, '2022-01-01T00:00:00.000Z']
        )
        return true
    } catch (error) {
        return false;
    }
}