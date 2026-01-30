import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  ObjectType,
  FieldResolver,
  Root,
  Query,
} from 'type-graphql';
import { MyContext } from 'src/types';
import { DataSource } from 'typeorm';
import { User } from '../entities/USER';
import { Member } from '../entities/MEMBER';
import { Team } from '../entities/TEAM';
import { Text } from '../entities/TEXT';
import path from 'path';
import dotenv from 'dotenv';
import argon2 from 'argon2';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

@InputType()
class UsernameRegisterInput {
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernameRegisterInput,
    @Ctx() { req, em }: MyContext,
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username must be greater than 2 characters long.',
          },
        ],
      };
    }

    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password length must be greater than 2 characters long.',
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const result = await new DataSource({
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      logging: true,
      synchronize: true,
      migrations: [path.join(__dirname, './migrations/*')],
      entities: [User, Member, Team, Text],
    })
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        first_name: options.first_name,
        last_name: options.last_name,
        username: options.username,
        email: options.email,
        password: hashedPassword,
      })
      .returning('*')
      .execute();

    const user = result.raw[0];

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken',
            },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }
}
