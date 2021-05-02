const request = require('supertest')

const app = require('../src/app')
const client = require('../src/db/pg')

const words = [
    {
        value: 'hola',
        translation: 'hello',
        verb_type: 'non-verb',
        part_of_speech: 'other'
    },
    {
        value: 'uno',
        translation: 'one',
        verb_type: 'non-verb',
        part_of_speech: 'noun'
    },
    {
        value: 'ir',
        translation: 'to go',
        verb_type: 'ir',
        part_of_speech: 'verb'
    }
]

const newWord = {
    value: 'pantalones',
    translation: 'pants',
    verb_type: 'non-verb',
    part_of_speech: 'noun'
}

beforeEach(async () => {
    try {
        await client.query('DELETE FROM words;')
        words.forEach(async (word) => {
            const text = 'INSERT INTO words (value, translation, verb_type, part_of_speech) VALUES ($1, $2, $3, $4)'
            const values = Object.values(word)
            await client.query(text, values)
        })
    } catch (e) {
        console.log(e.message)
    }
})

afterAll(async () => {
    await client.end()
})


test('Should get 3 words', async () => {
    try {
        const response = await request(app)
                            .get('/words')
                            .send()
                            .expect(200)
        expect(response.body.length).toBe(3)
    } catch (e) {
        console.log(e.message)
    }
})

test('Should find hola', async () => {
    try {
        const response = await request(app)
                                .get('/words?search=hola')
                                .send()
                                .expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toMatchObject({
            value: 'hola',
            translation: 'hello',
            verb_type: 'non-verb',
            part_of_speech: 'other'
        })
    } catch (e) {
        console.log(e.message)
    }
})

test('Should update hola', async () => {
    try {
        await request(app)
            .patch('/words/hola')
            .send({
                translation: 'hi',
                example: 'Hola Juan'
            })
            .expect(200)
    } catch (e) {
        console.log(e.message)
    }
})

test('Should add new word to database', async () => {
    try {
        await request(app)
            .post('/words')
            .send(newWord)
            .expect(201)
    } catch (e) {
        console.error(e.message)
    }
})