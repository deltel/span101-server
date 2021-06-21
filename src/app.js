const path = require("path");
const express = require("express");
const hbs = require("hbs");

const wordRouter = require("./routes/words");
const { speechType, wordType } = require("./utils/enums");

const app = express();

const partialsPath = path.join(__dirname, "../templates/partials");
const viewsPath = path.join(__dirname, "../templates/views");
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use("/static", express.static(publicPath));
app.use(express.json());

app.use("/words", wordRouter);

app.get("/", (req, res) => {
  res.render("index", { message: "The beginning" });
});

app.get("/new-word", (req, res) => {
  res.render("new-word", { categories: wordType, partsOfSpeech: speechType });
});

app.get("/categories", (req, res) => {
  res.render("categories");
});

app.get("/edit/:id", (req, res) => {
  res.render("edit-word", { categories: wordType, partsOfSpeech: speechType });
});

app.get("/:id", (req, res) => {
  res.render("details");
});

module.exports = app;
