const app = require("./app");

const insertUser = require("./db/user");

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  await insertUser();
  console.log("server listening on port", port);
});
