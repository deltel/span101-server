const express = require('express')
const wordRouter = require('./routes/words')

const app = express()

app.use(express.json())

app.use('/words', wordRouter)

app.get('/', (req, res) => {
    res.send('The beginnning')
})

module.exports = app