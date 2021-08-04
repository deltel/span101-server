const express = require("express");
const cors = require("cors");

const wordRouter = require("./routes/words");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/words", wordRouter);

app.use("/auth", authRouter);

module.exports = app;
