import mysql, { ConnectionConfig, MysqlError } from 'mysql'

const mysqlCredentials : ConnectionConfig = {
    host: process?.env?.MYSQL_DATABASE_HOST,
    database: process?.env?.MYSQL_DATABASE_NAME,
    user: process?.env?.MYSQL_DATABASE_USER,
    password: process?.env?.MYSQL_DATABASE_PASSWORD
}

const mysqlQuery = async (query: string) => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(mysqlCredentials);
        try {
            connection.query(query, function (error: MysqlError, results: any) {
                if (error) throw error;
                connection.end();
                resolve(results)
            });
        } catch (error) {
            connection.end();
            reject(error)
        }
    });
}

export const getPeople = async () => {
    const res = await mysqlQuery('SELECT * FROM people;');
    return res;
}

