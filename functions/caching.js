const schedule = require("node-schedule");
const getGames = require("./data");
const fs = require("fs");

let job = new schedule.Job("games caching", async function () {
  console.log("caching games...");
  const data = await getGames();
  const games = JSON.stringify(data);
  cacheGames(games);
  console.log("caching completed");
  nextDate = formatDate(data.games[0].date);
  job.schedule(nextDate);
  console.log("next scheduled caching " + job.nextInvocation());
});

const startCacheScheduler = () => {
  job.schedule(new Date().getTime() + 100);
};

const cacheGames = (games) => {
  if (!fs.existsSync("./cache")) {
    fs.mkdirSync("./cache", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("cache folder created");
      }
    });
  }
  fs.writeFile("./cache/games.json", games, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const getCachedGames = () => {
  let games = null;
  if (fs.existsSync("./cache/games.json")) {
    games = fs
      .readFileSync("./cache/games.json", (err) => {
        if (err) {
          console.log(err);
        }
      })
      .toString();
  }
  return games;
};

const formatDate = (date) => {
  let newDate = new Date(date);
  let mon = newDate.getMonth() + 1;
  let day = newDate.getDate() - 1;
  let year = newDate.getFullYear();
  let h = newDate.getHours();
  return new Date(year, day, mon, h);
};

module.exports = { startCacheScheduler, getCachedGames };
