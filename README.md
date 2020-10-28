## Slack Clone Server

Based on the tutorial from https://awesomereact.com/playlists/slack-clone-using-graphql/0MKJ7JbVnFc.

Online demo at http://slack-clone.craigstroman.com/.

## Running locally

- Requires PostgreSQL. If on a Mac use Homebrew to install. If not follow these instructions https://www.2ndquadrant.com/en/blog/pginstaller-install-postgresql/.
- Clone the repo at https://github.com/craigstroman/slack-clone-server.git.
- CD into slack-clone-server.
- Run `npm install` to install all required Node moduels.
- Run `npm run start:dev` to start server development environment.

## Running in production

- CD into slack-clone-server.
- Run `npm run prod:server`.
- It will create a prod build within the build directory which can be used in production.
- You then need to upload the public directory from the root of the client to the root of the project directory on the server.
- Then deploy that directory and you can start it by running `npm start`.

Note: This is a work in progress. I'm continuing to update this and add features.
