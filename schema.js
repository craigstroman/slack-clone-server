import { makeExecutableSchema } from 'graphql-tools';
import userTypes from './schema/user';
import teamTypes from './schema/team';
import channelTypes from './schema/channel';
import messageTypes from './schema/message';
import error from './schema/error';
import resolvers from './resolvers/user';

// Use merge(resolvers, userResolvers) from Lodash for multiple resolvers.
// https://stackoverflow.com/questions/53466486/split-the-graphql-resolvers-file-into-seperatefiles

const schema = makeExecutableSchema({
  typeDefs: [userTypes, teamTypes, channelTypes, messageTypes, error],
  resolvers,
});

export default schema;
