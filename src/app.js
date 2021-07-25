const express = require("express");
const cors = require("cors");

const wordRouter = require("./routes/words");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/words", wordRouter);

module.exports = app;
