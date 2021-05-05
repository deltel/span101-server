const { Client } = require('pg')

const connectionString = process.env.DATABASE_URL || process.env.CONNECTION_STRING

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

module.exports = client

