const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const client = require("../db/pg");

const router = express.Router();

router.post("/login", async (req, res) => {
  const query = {
    text: "SELECT * FROM users WHERE username=$1",
    values: [req.body.username],
  };

  try {
    const response = await client.query(query.text, query.values);
    const user = response.rows[0];
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatches) {
      res.status(401).send({ error: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { sub: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.send({ token });
  } catch (e) {
    res.status(500).send({ error: e.stack });
  }
});

module.exports = router;
