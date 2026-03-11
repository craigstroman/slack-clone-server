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
  @Field()
  creatorId: number;
}

@ObjectType()
class TeamError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class TeamCreateResponse {
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

  @Mutation(() => TeamCreateResponse)
  @UseMiddleware(isAuth)
  async create_team(
    @Arg('options') options: TeamCreateInput,
    @Ctx() { req }: MyContext,
  ): Promise<TeamCreateResponse> {
    const createdTeam = await Team.create({
      ...options,
      creator_id: req.session.userId,
    }).save();

    const team = await Team.findOne({
      where: { id: createdTeam.id },
      relations: ['creator'],
    });

    return {
      team: team ?? undefined,
    };
  }
}
