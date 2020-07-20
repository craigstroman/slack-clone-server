import path from 'path';
import express from 'express';
import { execute, subscribe } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import jwt from 'express-jwt';
import { indexPage } from './controllers';
import models from './models/index';
import schema from './schema';

/**
  Running the register mutation in GraphQL to test run:

mutation {
  register(username:"craig1", email:"craig1@test.com", password:"test12")
  {
    ok
    user {
      id
      username
    }
  }
}

mutation {
  register(username:"craig3", email:"craig3@test.com", password:"test1234")
  {
    ok
    user {
      id
      username
    }
  }
}
**/

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const SECRET1 = process.env.SECRET1;
const SECRET2 = process.env.SECRET2;
const endpoint = '/graphql';

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

const auth = jwt({
  secret: SECRET1,
  credentialsRequired: false,
  algorithms: ['HS256'],
});

app.use(auth);

app.use('/', indexPage);

const server = new ApolloServer({
  schema,
  playground: {
    endpoint,
  },
  context: { models, SECRET1, SECRET2 },
});

server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('The server started on port ' + PORT);

    console.log(`GraphQL endpoint: http://localhost:${PORT}${endpoint}`);

    // new SubscriptionServer(
    //   {
    //     execute,
    //     subscribe,
    //     schema,
    //     onConnect: async ({ token, refreshToken }, webSocket) => {
    //       if (token && refreshToken) {
    //         try {
    //           const { user } = jwt.verify(token, SECRET);
    //           return { models, user };
    //         } catch (err) {
    //           const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
    //           return { models, user: newTokens.user };
    //         }
    //       }

    //       return { models };
    //     },
    //   },
    //   {
    //     server,
    //     path: '/subscriptions',
    //   },
    // );
  });
});
