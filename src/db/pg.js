const { Client } = require('pg')

const connectionString = process.env.CONNECTION_STRING

const client = new Client({
    connectionString
})

client.connect()

module.exports = client

