import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/user';
import { TeamResolver } from './resolvers/team';
import { User, Member, Team, Text } from './entities/index';
import routes from './routes/index';
import { createUserLoader } from './utils/createUserLoader';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

const javascript = nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';

const main = async () => {
  const nodeEnv = process.env.NODE_ENV;
  const locals = {
    javascript: nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js',
  };

  const redis = new Redis();
  const RedisStore = connectRedis(session);
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

  const conn = await createConnection({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, Team, Member, Text],
  });

  //if (nodeEnv === 'development') {
  await conn.runMigrations();
  //}

  app.use(
    cors({
      origin: nodeEnv === 'production' ? ['https://slack-clone.craigstroman.com'] : ['http://localhost:8080'],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, TeamResolver],
      validate: false,
    }),
    context: async ({ req, res }) => ({
      req: req,
      res: res,
      redis: redis,
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

  app.locals.title = 'LiReddit';
  app.locals.description = 'A Reddit clone.';

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(port, () => {
    console.log(`Server started on localhost:${port}`);
  });
};

main().catch((error) => {
  console.error(error);
});
