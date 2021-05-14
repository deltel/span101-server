const { Client } = require('pg')

const connectionString = process.env.DATABASE_URL || process.env.CONNECTION_STRING
let client;

if (process.env.DATABASE_URL) {
    // ssl for prod
    client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    })
} else {
    // no ssl for dev
    client = new Client({
        connectionString,
    })
}

client.connect()

module.exports = client

