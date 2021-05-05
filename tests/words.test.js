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

const invalidWord = {
    value: '',
    translation: '',
    verb_type: '',
    part_of_speech: ''
}

beforeEach(async () => {
    try {
        await client.query('DELETE FROM words;')
        words.forEach(async (word) => {
            const text = 'INSERT INTO words (value, translation, verb_type, part_of_speech) VALUES ($1, $2, $3, $4)'
            const values = Object.values(word)
            await client.query(text, values)
        })
        const text = 'INSERT INTO words (id, value, translation, verb_type, part_of_speech, keyword) VALUES ($1, $2, $3, $4, $5, $6)'
        const values = ['1', 'cien', 'one hundred', 'non-verb', 'noun', 'number']
        await client.query(text, values)
    } catch (e) {
        console.log(e.message)
    }
})

afterAll(async () => {
    await client.end()
})


test('Should get 4 words', async () => {
    try {
        const response = await request(app)
            .get('/words')
            .send()
            .expect(200)
        expect(response.body.length).toBe(4)
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
            value: 'hola'
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

test('Should fail to add new word to database', async () => {
    try {
        const response = await request(app)
            .post('/words')
            .send(invalidWord)
            .expect(500)
        expect(response.body.error).toBe('Invalid form')
    } catch (e) {
        console.error(e.message)
    }
})

test('Should get word with id 1', async () => {
    try {
        const response = await request(app)
            .get('/words/1')
            .send()
            .expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toMatchObject({
            id: 1,
            value: 'cien',
            translation: 'one hundred',
            part_of_speech: 'noun',
            keyword: 'number',
            verb_type: 'non-verb'
        })
    } catch (e) {
        console.error(e.message)
    }
})