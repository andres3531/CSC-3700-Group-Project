require('dotenv').config() //this reads our .env file and loads its variables into process.env

const mysql = require('mysql2/promise')
//We're importing the MySQL library then,
// The /promise part lets us use async and await when querying the database.

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
}) //creates connection pool then module.exports = pool lets other JS files have access to it

module.exports = pool
