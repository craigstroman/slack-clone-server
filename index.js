import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { refreshTokens } from './auth';
import routes from './routes/index';
import models from './models/index';
import schema from './schema';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const SECRET1 = process.env.SECRET1;
const SECRET2 = process.env.SECRET2;
const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
const subscriptionEndpoint = process.env.SUBSCRIPTION_ENDPOINT;
const graphql = `http://localhost:${PORT}${graphqlEndpoint}`;
const subscriptions = `ws://localhost:${PORT}${subscriptionEndpoint}`;
const reactApp = process.env.NODE_ENV === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.use(routes);

app.locals.title = 'Slack Clone';
app.locals.content = 'A Slack clone using Express, GarphQL, and React.';
app.locals.reactApp = reactApp;
app.locals.env = process.env;

app.use(cors('*'));

const apolloServer = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV === 'development' ? {
    graphqlEndpoint,
  } : false,
  context: ({ req }) => {
    const token = req.headers['x-token'] || null;

    if (token) {
      try {
        const { user } = jwt.verify(token, SECRET1);

        return {
          models,
          user,
          SECRET1,
          SECRET2,
        };
      } catch (err) {
        console.log('error: ');
        console.log('err: ', err);
      }
    }
    return {
      models,
      SECRET1,
      SECRET2,
    };
  },
});

apolloServer.applyMiddleware({ app });
const server = createServer(app);

server.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at ${graphql}`);
  console.log(`🚀 Subscriptions ready at ${subscriptions}`);

  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: async (connectionParams, webSocket) => {
        const { token, refreshToken } = connectionParams;

        if (token && refreshToken) {
          try {
            const { user } = jwt.verify(token, SECRET1);

            return { user, models };
          } catch (err) {
            const newTokens = await refreshTokens(token, refreshToken, models, SECRET1, SECRET2);

            return { user: newTokens.user, models };
          }
        }

        return { models };
      },
      reconnect: true,
    },
    {
      server,
      reconnect: true,
      path: '/subscriptions',
    },
  );
});
