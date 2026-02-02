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
import { DataSource } from 'typeorm';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import { MyContext } from 'src/types';
import { User } from '../entities/USER';
import { validateRegister } from '../utils/validateRegister';
import { appDataSource } from '../appDataSource';
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
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    console.log('options: ', options);
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      // User.create({}).save()
      const result = await appDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          first_name: options.first_name,
          last_name: options.last_name,
          phone_number: options.phone_number,
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      if (err.code === '23505') {
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

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } },
    );

    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username or password is invalid.',
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: "Username or password doesn't match.",
          },
        ],
      };
    }

    // Store user id session
    req.session.userId = user?.id;

    return {
      user,
    };
  }
}
