import { mergeResolvers } from 'graphql-tools';
import channelResolver from './channel';
import messageResolver from './message';
import teamResolver from './team';
import userResolver from './user';

const resolvers = [channelResolver, messageResolver, teamResolver, userResolver];

export default mergeResolvers(resolvers);
