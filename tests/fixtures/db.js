const jwt = require("jsonwebtoken");

const client = require("../../src/db/pg");

const words = [
  {
    value: "hola",
    translation: "hello",
    category: "non-verb",
    part_of_speech: "other",
    keyword: "greeting",
  },
  {
    value: "uno",
    translation: "one",
    category: "non-verb",
    part_of_speech: "noun",
    keyword: "number",
  },
  {
    value: "ir",
    translation: "to go",
    category: "ir",
    part_of_speech: "verb",
    keyword: "verb",
  },
];

const newWord = {
  value: "Pantalones",
  translation: "Pants",
  category: "non-verb",
  part_of_speech: "noun",
  keyword: "clothes",
};

const invalidWord = {
  value: "",
  translation: "",
  category: "",
  part_of_speech: "",
};

const user = {
  id: 1,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};

const generateValidToken = () =>
  jwt.sign({ sub: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: 60,
  });

const generateInvalidToken = () =>
  jwt.sign({ sub: 2, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: 60,
  });

const setUpDatabase = async () => {
  try {
    await client.query("DELETE FROM words;");
    words.forEach(async (word, index) => {
      const text =
        "INSERT INTO words (id, value, translation, category, part_of_speech, keyword) VALUES ($1, $2, $3, $4, $5, $6)";
      const values = Object.values(word);
      values.unshift(index + 1);
      await client.query(text, values);
    });
    const text =
      "INSERT INTO words (id, value, translation, category, part_of_speech, keyword) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = ["100", "cien", "one hundred", "non-verb", "noun", "number"];
    await client.query(text, values);
  } catch (e) {
    console.log(e.message);
  }
};

const tearDown = async () => {
  await client.end();
};

module.exports = {
  client,
  setUpDatabase,
  tearDown,
  newWord,
  invalidWord,
  generateValidToken,
  generateInvalidToken,
  user,
};
