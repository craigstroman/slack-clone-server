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
import { User } from '../entities/USER';

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernameRegisterInput,
    @Ctx() { req, em }: MyContext,
  ): Promise<UserResponse> {}
}
