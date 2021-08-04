const express = require("express");

const client = require("../db/pg");
const getQueryValues = require("../utils/queryUtil");
const { validateRequest } = require("../utils/validateRequest");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const query = {};
  if (req.query.search) {
    const searchTerm = `%${req.query.search.toLowerCase()}%`;
    query.text = `
        SELECT id, value 
        FROM words 
        WHERE value LIKE $1
        ORDER BY value
        LIMIT 5;
        `;
    query.values = [searchTerm];
  } else if (req.query.category) {
    const category = `${req.query.category.toLowerCase()}`;
    query.text = `
        SELECT id, value 
        FROM words 
        WHERE keyword = $1
        ORDER BY value
        `;
    query.values = [category];
  } else {
    query.text = `
        SELECT id, value 
        FROM words
        ORDER BY value
        LIMIT 20
        OFFSET $1;
        `;
    query.values = [req.query.offset];
  }

  try {
    const response = await client.query(query);
    res.send(response.rows);
  } catch (e) {
    res.status(500).send({ error: e.stack });
  }
});

router.post("/", auth, async (req, res) => {
  const inputKeys = Object.keys(req.body);
  const inputValues = Object.values(req.body);

  // validate inputs
  const inputParams = inputValues.map((_, index) => {
    return `$${index + 1}`;
  });

  const query = {
    text: `
        INSERT INTO words (${inputKeys.join(", ")})
        VALUES (${inputParams.join(", ")})
        `,
    values: [...inputValues].map((value) => value.toLowerCase()),
  };

  try {
    validateRequest(req.body);

    await client.query(query);
    res.status(201).send({});
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/categories", async (req, res) => {
  const query = {
    text: `
          SELECT keyword FROM words
          GROUP BY keyword;
          `,
  };

  try {
    const response = await client.query(query.text);
    res.send(response.rows);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:value", async (req, res) => {
  const query = {
    text: `
        SELECT * FROM words WHERE id = $1;
        `,
    values: [req.params.value],
  };

  try {
    const response = await client.query(query);
    res.send(response.rows);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const values = getQueryValues(req.body);

  const query = {
    text: `
        UPDATE words SET ${values.querySubstring} WHERE id = \'${req.params.id}\'
        `,
    values: values.updateValues,
  };

  try {
    await client.query(query);
    res.send({});
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
