import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import { User } from './entities/USER';
import { Member } from './entities/MEMBER';
import { Team } from './entities/TEAM';
import { Text } from './entities/TEXT';
import { createUserLoader } from './utils/createUserLoader';
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/user';
import Redis from 'ioredis';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import routes from './routes/index';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
const redis = new Redis();
const RedisStore = require('connect-redis')(session);

const javascript = nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';

const main = async () => {
  const nodeEnv = process.env.NODE_ENV;
  const locals = {
    javascript: nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js',
  };

  const secret: string = process.env.SECRET || '';

  const app = express();

  app.set('trust proxy', 1);

  app.use(
    session({
      name: 'uid',
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: false,
        sameSite: 'lax',
        secure: false,
      },
      saveUninitialized: true,
      secret: secret,
      resave: false,
    }),
  );

  app.use(
    cors({
      origin: nodeEnv === 'production' ? ['https://slack-clone.craigstroman.com'] : ['http://localhost:9000'],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, HelloResolver],
      validate: false,
    }),
    context: async ({ req, res }) => ({
      req: req,
      res: res,
      userLoader: createUserLoader(),
    }),
  });

  app.set('trust proxy', 1);

  app.use(routes);

  app.use('/static', express.static('public'));

  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'pug');

  app.locals = locals;

  app.locals.javascript = javascript;

  app.locals.title = 'Slack Clone';
  app.locals.description = 'A Slack clone.';

  await apolloServer.start();

  const conn = await new DataSource({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, Member, Team, Text],
  });

  await conn.initialize();

  // TODO: Figure out how to correctly initialize typeorm, I think that is why it never get's to app.listen.

  await conn.runMigrations();

  app.listen(port, () => {
    console.log(`Server started on localhost:${port}`);
  });

  // apolloServer.applyMiddleware({
  //   app,
  //   cors: false,
  // });
};

main().catch((error) => {
  console.error(error);
});
