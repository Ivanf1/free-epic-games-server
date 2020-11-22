# Get info for the free games on the Epic Store

This is a Node.js server that exposes an API that can be used to get informations about the latest free games form Epic Store.

## How it works

This server uses puppeteer to scrape the home page of the Epic Store and get informations about the latest free games. Those informations are then cached on the server in a json file. I choose this approach rather than using a database because the informations to store are very simple and the server can quickly respond to the client because it doesn't need to call any other services.
Since the date the offers for the free games changes is known to us, I implemented a cron-job to the get the new offers as soon as they are available.

## Different implementations

There is also an [express implementation][1]
The express implementation has also been adapted and deployed on heroku. I have not yet published this branch.

[1]: https://github.com/Ivanf1/free-epic-games-server/tree/express
