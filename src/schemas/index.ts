import { mergeTypeDefs } from '@graphql-tools/merge';
import { userSchema } from './user';
import { teamSchema } from './team';

export const typeDefs = mergeTypeDefs([userSchema, teamSchema]);
