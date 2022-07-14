const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const categories = require("./data/categories.json");
const volumesMap = require("./data/volumes.map");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/api/categories.json", (request, response) => {
  response.status(200).send(categories);
});

app.get("/api/volumes/:file", (request, response) => {
  let id = Number(request.params.file.replace(".json", ""));
  response.status(200).send(volumesMap.get(id));
});

module.exports = app;
