import defaultData from './data.json'
import PizzaEntry from './src/types/PizzaEntry'
import { addPersonToDatabase, addPizzaToDatabase, databaseTableExists } from './src/utils/mysql'

exports.onPostBuild = async ({ reporter }) => {
    const peopleTableExists = await databaseTableExists('people')
    const pizzasTableExists = await databaseTableExists('pizzas')
    console.log(pizzasTableExists)
    /*if (!peopleTableExists || !pizzasTableExists) {
        let people : string[] = []
        defaultData.forEach((pizzaEntry : PizzaEntry) => {
            const personIndex = people.indexOf(pizzaEntry?.person);
            // Add any missing person to the people table & track that they've been added
            if (personIndex < 0) {
                addPersonToDatabase(pizzaEntry?.person)
                people.push(pizzaEntry?.person)
            }
            // Add Pizza to database with correct person tracked as consumer
            addPizzaToDatabase((personIndex + 1).toString(), pizzaEntry?.topping, pizzaEntry?.date)
        })
        reporter.info(`
            ***
            ***
            ***
            ***
            *** Database tables & default data were added successfully or already existed
            ***
            ***
            ***
            ***
        `);
    }
    */
};