const http = require("http");
const { startCacheScheduler, getCachedGames } = require("./functions/caching");

const apiUrl = "localhost";
const apiPort = 3001;

const server = http.createServer(async (request, response) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Content-Type": "application/json",
  };

  if (request.url == "/api/games") {
    let games = getCachedGames();
    response.writeHead(200, headers);
    response.end(games);
  } else {
    response.writeHead(404, headers);
    response.end();
  }
});

server.listen(apiPort, apiUrl, () => {
  console.log(`Server started at ${apiUrl}:${apiPort}`);
  startCacheScheduler();
});
