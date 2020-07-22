import path from 'path';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'express-jwt';
import { indexPage } from './controllers';
import models from './models/index';
import schema from './schema';

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

//app.use('/', indexPage);

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
  });
});
