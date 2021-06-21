const request = require("supertest");

const app = require("../src/app");
const {
  setUpDatabase,
  tearDown,
  invalidWord,
  newWord,
  client,
} = require("./fixtures/db");

beforeEach(setUpDatabase);

afterAll(tearDown);

test("Should get 4 words", async () => {
  const response = await request(app).get("/words").send().expect(200);
  expect(response.body.length).toBe(4);
});

test("Should find hola", async () => {
  const response = await request(app)
    .get("/words?search=hola")
    .send()
    .expect(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0]).toMatchObject({
    value: "hola",
  });
});

test("Should find hola with 'ol' as the search term", async () => {
  const response = await request(app)
    .get("/words?search=ol")
    .send()
    .expect(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0]).toMatchObject({
    value: "hola",
  });
});

test('Should find "uno" and "cien"', async () => {
  const response = await request(app)
    .get("/words?category=number")
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);
});

test("Should update hola", async () => {
  await request(app)
    .patch("/words/1")
    .send({
      translation: "hi",
      example: "Hola Juan",
    })
    .expect(200);
});

test("Should add new word to database in lowercase", async () => {
  await request(app).post("/words").send(newWord).expect(201);
  const response = await client.query(
    "SELECT * FROM words WHERE value = 'pantalones'"
  );
  expect(response.rows[0]).toMatchObject({
    value: "pantalones",
    translation: "pants",
    category: "non-verb",
    part_of_speech: "noun",
  });
});

test("Should fail to add new word to database", async () => {
  const response = await request(app)
    .post("/words")
    .send(invalidWord)
    .expect(500);
  expect(response.body.error).toBe("Invalid form");
});

test("Should get word with id 1", async () => {
  const response = await request(app).get("/words/100").send().expect(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0]).toMatchObject({
    id: 100,
    value: "cien",
    translation: "one hundred",
    part_of_speech: "noun",
    keyword: "number",
    category: "non-verb",
  });
});

test("Should get unique keywords", async () => {
  const response = await request(app)
    .get("/words/categories")
    .send()
    .expect(200);
  expect(response.body.length).toEqual(3);
});
