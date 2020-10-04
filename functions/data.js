const puppeteer = require("puppeteer");

const getGames = async () => {
  let url = "https://www.epicgames.com/store/en-US/";
  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    let games = [];
    let freeElements = document.querySelectorAll('div[class="css-1r3zsoc-StatusBar__root"] > span');
    for (let i = 0; i < freeElements.length; i++) {
      if (freeElements[i].innerHTML == "Free Now") {
        const middle = freeElements[i].parentNode.parentNode.parentNode.parentNode.parentNode;
        const spans = middle.querySelectorAll('div[class="css-1jl4olg-OfferCard__meta"] > span');
        let name = spans[0].innerHTML;
        let rawDate = spans[1].firstElementChild.firstElementChild.dateTime;
        const options = { dateStyle: "short", timeStyle: "short" };
        let date = new Date(rawDate).toLocaleString(undefined, options);
        let link = middle.parentNode.parentNode.href;
        let dataImg =
          middle.firstElementChild.firstElementChild.firstElementChild.firstElementChild.dataset.image;
        let img = dataImg.replace(/[?](.*)/, "");
        games.push({ name, date, link, img });
      }
    }
    return { games };
  });

  await browser.close();
  return data;
};

module.exports = getGames;
