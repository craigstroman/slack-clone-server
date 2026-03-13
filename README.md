## Slack Clone Server

Based on the tutorial from https://awesomereact.com/playlists/slack-clone-using-graphql/0MKJ7JbVnFc.

Online demo at http://slack-clone.craigstroman.com/.

## Running locally

- Clone the repo at https://github.com/craigstroman/slack-clone-server.git.
- CD into slack-clone-server.
- Run `npm install` or `yarn install` to install all required Node moduels.
- Run `npm run live:server` or `yarn run live:server` to start the client development environment.
- You can visit http://localhost:3000 in the browser to view it. But to do anything you need the
  [Slack Clone Server](https://github.com/craigstroman/slack-clone-server) running in another terminal window locally.

Note: This is running on WebPack devServer and will automatically refresh when you make changes to the project.

## Running in production

- CD into slack-clone-server.
- Run `npm run prod` or `yarn run prod`.
- This will create a production build file of the JavaScript within /public/js/main.min.js.
- Upload the main.min.js to the /public directory within your production build of the server. For that I'm using [Pug](https://pugjs.org/api/getting-started.html) with [Express](https://expressjs.com/).

## Version History

###### Version 3.0.0

- Started using TypeScript
- Upgraded version of GraphQL
- Started using TypeORM
- Started using Redis
