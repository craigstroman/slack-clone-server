import {
  Resolver,
  Mutation,
  UseMiddleware,
  Arg,
  InputType,
  Field,
  Ctx,
  ObjectType,
  Query,
} from 'type-graphql';
import { MyContext } from '../types';
import { Team } from '../entities/index';
import path from 'path';
import dotenv from 'dotenv';
import { isAuth } from '../middleware/isAuth';
import { getConnection } from 'typeorm';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// TODO: Continue working on team resolver

@InputType()
class TeamCreateInput {
  @Field()
  name: string;
  @Field()
  owner: number;
  @Field()
  user_id: number;
}

@ObjectType()
class TeamError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class TeamResponse {
  @Field(() => [TeamError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Team, { nullable: true })
  team?: Team;
}

@ObjectType()
class Teams {
  @Field(() => [Team])
  teams: Team[];
}

@Resolver(Team)
export class TeamResolver {
  @Query(() => Teams, { nullable: true })
  async getTeams(@Ctx() { req }: MyContext): Promise<Teams> {
    const replacements: any[] = [];
    if (req.session.userId) {
      replacements.push(req.session.userId);
    }

    let teamsResponse: Team[] = [];

    try {
      teamsResponse = await Team.find({ where: { id: req.session.userId }, relations: ['creator'] });
    } catch (error) {
      console.log('There was an error: ');
      console.log(error);
    }

    return {
      teams: teamsResponse,
    };
  }

  @Mutation(() => TeamResponse)
  @UseMiddleware(isAuth)
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

    console.log('req.session.userId: ', req.session.userId);

    let team;
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Team)
        .values({
          name: options.name,
          owner: options.owner,
          user_id: 1,
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
