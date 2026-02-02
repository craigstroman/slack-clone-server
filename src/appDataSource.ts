import { DataSource } from 'typeorm';
import { User } from './entities/USER';
import { Member } from './entities/MEMBER';
import { Team } from './entities/TEAM';
import { Text } from './entities/TEXT';
import path from 'path';

export const appDataSource = new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  migrations: [path.join(__dirname, './migrations/*')],
  entities: [User, Member, Team, Text],
});
