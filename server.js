const express = require("express");
const cors = require("cors");
const { startCacheScheduler } = require("./functions/caching");

const app = express();

app.listen(3001, () => {
  startCacheScheduler();
});

app.get("/api/games", cors(), (request, response) => {
  response.sendFile("./cache/games.json", { root: __dirname });
});
