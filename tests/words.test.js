const request = require('supertest')

const app = require('../src/app')
const {
    setUpDatabase,
    tearDown,
    invalidWord,
    newWord
} = require('./fixtures/db')

beforeEach(setUpDatabase)

afterAll(tearDown)


test('Should get 4 words', async () => {
    const response = await request(app)
        .get('/words')
        .send()
        .expect(200)
    expect(response.body.length).toBe(4)
})

test('Should find hola', async () => {
    const response = await request(app)
        .get('/words?search=hola')
        .send()
        .expect(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toMatchObject({
        value: 'hola'
    })
})

test('Should update hola', async () => {
    await request(app)
        .patch('/words/hola')
        .send({
            translation: 'hi',
            example: 'Hola Juan'
        })
        .expect(200)
})

test('Should add new word to database', async () => {
    await request(app)
        .post('/words')
        .send(newWord)
        .expect(201)
})

test('Should fail to add new word to database', async () => {
    const response = await request(app)
        .post('/words')
        .send(invalidWord)
        .expect(500)
    expect(response.body.error).toBe('Invalid form')
})

test('Should get word with id 1', async () => {
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
        category: 'non-verb'
    })
})