const express = require('express')

const client = require('../db/pg')
const getQueryValues = require('../utils/queryUtil')
const validateRequest = require('../utils/validateRequest')

const router = express.Router()

router.get('/', async (req, res) => {
    const query = {}
    if (req.query.search) {
        query.text = `
        SELECT * 
        FROM words 
        WHERE value = $1;
        `,
            query.values = [req.query.search]
    } else {
        query.text = `
        SELECT id, value 
        FROM words
        ORDER BY value
        LIMIT 10
        OFFSET $1;
        `,
            query.values = [req.query.offset]
    }

    try {
        const response = await client.query(query)
        res.send(response.rows)

    } catch (e) {
        res.status(500).send({ error: e.stack })

    }
})

router.post('/', async (req, res) => {
    const inputKeys = Object.keys(req.body)
    const inputValues = Object.values(req.body)

    // validate inputs
    const inputParams = inputValues.map((_, index) => {
        return `$${index + 1}`
    })

    const query = {
        text: `
        INSERT INTO words (${inputKeys.join(', ')})
        VALUES (${inputParams.join(', ')})
        `,
        values: [...inputValues]
    }

    try {
        validateRequest(req.body)

        await client.query(query)
        res.status(201).send()
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.get('/:value', async (req, res) => {
    const query = {
        text: `
        SELECT * FROM words WHERE id = $1;
        `,
        values: [req.params.value]
    }

    try {
        const response = await client.query(query)
        res.send(response.rows)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.patch('/:value', async (req, res) => {
    const values = getQueryValues(req.body)

    const query = {
        text: `
        UPDATE words SET ${values.querySubstring} WHERE value = \'${req.params.value}\'
        `,
        values: values.updateValues
    }

    try {
        await client.query(query)
        res.send()
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.all((req, res) => {
    res.status(404).send()
})

module.exports = router