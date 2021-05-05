const { Client } = require('pg')

const connectionString = process.env.DATABASE_URL || process.env.CONNECTION_STRING

const client = new Client({
    connectionString,
    ssl: process.env.DATABASE_URL ? true : false
})

client.connect()

module.exports = client

