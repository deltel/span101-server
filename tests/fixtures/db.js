const client = require('../../src/db/pg')

const words = [
    {
        value: 'hola',
        translation: 'hello',
        category: 'non-verb',
        part_of_speech: 'other'
    },
    {
        value: 'uno',
        translation: 'one',
        category: 'non-verb',
        part_of_speech: 'noun'
    },
    {
        value: 'ir',
        translation: 'to go',
        category: 'ir',
        part_of_speech: 'verb'
    }
]

const newWord = {
    value: 'pantalones',
    translation: 'pants',
    category: 'non-verb',
    part_of_speech: 'noun'
}

const invalidWord = {
    value: '',
    translation: '',
    category: '',
    part_of_speech: ''
}

const setUpDatabase = async () => {
    try {
        await client.query('DELETE FROM words;')
        words.forEach(async (word) => {
            const text = 'INSERT INTO words (value, translation, category, part_of_speech) VALUES ($1, $2, $3, $4)'
            const values = Object.values(word)
            await client.query(text, values)
        })
        const text = 'INSERT INTO words (id, value, translation, category, part_of_speech, keyword) VALUES ($1, $2, $3, $4, $5, $6)'
        const values = ['1', 'cien', 'one hundred', 'non-verb', 'noun', 'number']
        await client.query(text, values)
    } catch (e) {
        console.log(e.message)
    }
}

const tearDown = async () => {
    await client.end()
}

module.exports = {
    setUpDatabase,
    tearDown,
    newWord,
    invalidWord
}