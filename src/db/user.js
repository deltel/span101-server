const bcrypt = require("bcryptjs");

const client = require("../db/pg");

const insertUser = async () => {
  if (await userExists()) {
    return;
  } else {
    const query = {};

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    query.text =
      "INSERT INTO users (id, username, password) values ($1, $2, $3)";
    query.values = [1, process.env.ADMIN_USERNAME, hashedPassword];

    await client.query(query.text, query.values);
  }
};

const userExists = async () => {
  const response = await client.query("SELECT * FROM users");
  return response.rows.length > 0;
};

module.exports = insertUser;
