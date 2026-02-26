import { mergeTypeDefs } from '@graphql-tools/merge';
import { UserType } from './user';
import { TeamType } from './team';

export const mergedTypes = mergeTypeDefs([UserType, TeamType]);
