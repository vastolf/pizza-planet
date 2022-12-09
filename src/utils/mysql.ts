import mysql, { ConnectionConfig, MysqlError } from 'mysql'
import { convertZuluToEpoch } from './date'
import defaultData from '../../data.json'

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
                    if (err) resolve({})
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

const createPizzasTable = async () : Promise<void> => {
    // This query string just creates the pizzas table with all necessary fields
    await mysqlQuery("CREATE TABLE `pizzas` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `person` int(11) NOT NULL, `topping` text NOT NULL, `timestamp` VARCHAR(16) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;", [])
}

const createPeopleTable = async () : Promise<void> => {
    // This query string just creates the people table with all necessary fields
    await mysqlQuery("CREATE TABLE `people` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `name` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;", [])
}

const createClearDatabaseTables = async() : Promise<void> => {
    // Drop tables
    await mysqlQuery('DROP TABLE people;', [])
    await mysqlQuery('DROP TABLE pizzas;', [])
    
    // Create the tables
    await createPeopleTable()
    await createPizzasTable()
    
}

export const setDefaultDatabaseData = async () : Promise<Boolean> => {
    try {
        // Create and/or clear database tables
        await createClearDatabaseTables()
        
        let peopleNamesString : string = ''
        let pizzasDataString : string = ''
        
        Object.keys(defaultData).forEach((name) => {
            // Generate People Names insert string
            peopleNamesString += "('"+name+"'), "
            // Generate Pizzas Data insert string
            defaultData[name].forEach((pizza: {topping: string, date: string}) => {
                pizzasDataString += "('"+(Object.keys(defaultData).indexOf(name) + 1)+"', '"+pizza?.topping+"', "+convertZuluToEpoch(pizza?.date)+"), "
            })
        })
        
        await mysqlQuery("INSERT INTO people (name) VALUES "+peopleNamesString.slice(0, -2), [])

        await mysqlQuery("INSERT INTO pizzas (person, topping, timestamp) VALUES "+pizzasDataString.slice(0, -2), [])

        return true
    } catch (error) {
        return false
    }
}

/**
 * 
 * @returns All people currently in the 'people' table of the database
 */
export const getPeople = async () => {
    try {
        const res = await mysqlQuery('SELECT * FROM people;', []);
        return res
    } catch (error) {
        return []
    }
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

/**
 * 
 * @returns All pizzas currently in the 'pizzas' table of the database
 */
 export const getPizzas = async () => {
    try {
        const res = await mysqlQuery('SELECT * FROM pizzas;', []);
        return res;
    } catch (error) {
        return []
    }
}

/**
 * 
 * @param personID The stringified ID of the person who will be tracked as having had consumed this pizza
 * @returns An object with the person that has this ID if they exist; object will be empty if they don't. If the query
 * fails, it will return null.
 */
const getPizzaEater = async (personID: string) : Promise<Object | null> => {
    try {
        const res = await mysqlQuery(`SELECT * FROM people WHERE id = ${parseInt(personID)}`, [])
        return res;
    } catch (error) {
        return null;
    }
}

/**
 * 
 * @param personID The stringified ID of the person who will be tracked as having had consumed this pizza
 * @param topping The name of the topping that should be set on this pizza
 * @returns false if query is in error or the personID is invalid; otherwise, true
 */
export const addPizzaToDatabase = async (personID: string, topping: string, timestamp: string) : Promise<boolean> => {
    try {
        const pizzaEater = await getPizzaEater(personID);
        if (pizzaEater === null || Object.keys(pizzaEater).length < 1) {
            return false;
        }
        const res = await mysqlQuery(
            `INSERT INTO pizzas (person, topping, timestamp) VALUES (${parseInt(personID)}, ?, ${convertZuluToEpoch(timestamp)})`,
            [topping]
        )
        return true
    } catch (error) {
        return false;
    }
}