import { Resolver, Mutation, Arg, InputType, Field, Ctx, ObjectType } from 'type-graphql';
import { MyContext } from 'src/types';
import { Team } from '../entities/TEAM';
import { appDataSource } from '../appDataSource';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

@InputType()
class TeamCreateInput {
  @Field()
  name: string;
  @Field()
  owner: string;
  @Field()
  user_id: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class TeamResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Team, { nullable: true })
  team?: Team;
}

@Resolver(Team)
export class TeamResolver {
  @Mutation(() => TeamResponse)
  async create_team(
    @Arg('options') options: TeamCreateInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    if (options.name.length <= 2) {
      return {
        errors: [
          {
            field: 'name',
            message: 'Team name must be greater than 2 characters long.',
          },
        ],
      };
    }

    let team;
    try {
      // User.create({}).save()
      const result = await appDataSource
        .createQueryBuilder()
        .insert()
        .into(Team)
        .values({
          name: options.name,
          owner: options.owner,
        })
        .returning('*')
        .execute();
      team = result.raw[0];
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'name',
              message: 'Team name already taken',
            },
          ],
        };
      }
    }

    return { team };
  }
}
