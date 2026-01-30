import { Response } from 'express';
import { createUserLoader } from './utils/createUserLoader';

interface Request {
  session?: Session & Partial<SessionData>;
  url: string;
  hostname: string;
  params: object;
  headers: object;
  cookies: object;
  body: object;
  is: string;
  ip: string;
  method: string;
  query: object;
  protocol: string;
  originalUrl: string;
  accepts: string | boolean;
}

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
};
