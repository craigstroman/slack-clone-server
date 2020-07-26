import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { refreshTokens } from './auth';
import { indexPage } from './controllers';
import models from './models/index';
import schema from './schema';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const WSPORT = process.env.WSPORT;
const SECRET1 = process.env.SECRET1;
const SECRET2 = process.env.SECRET2;
const endpoint = '/graphql';

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use(cors('*'));

const server = new ApolloServer({
  schema,
  playground: {
    endpoint,
  },
  context: ({ req }) => {
    const token = req.headers['x-token'] || '';

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
      }
    }
    return {
      models,
      SECRET1,
      SECRET2,
    };
  },
});

server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('The server started on port ' + PORT);

    console.log(`GraphQL endpoint: http://localhost:${PORT}${endpoint}`);
  });
});
