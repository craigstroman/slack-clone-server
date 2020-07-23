import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import userTypes from './schema/user';
import teamTypes from './schema/team';
import channelTypes from './schema/channel';
import messageTypes from './schema/message';
import error from './schema/error';
import userResolver from './resolvers/user';
import teamResolver from './resolvers/team';
import messageResolver from './resolvers/message';
import channelResolver from './resolvers/channel';

const schema = makeExecutableSchema({
  typeDefs: [userTypes, teamTypes, channelTypes, messageTypes, error],
  resolvers: merge(userResolver, teamResolver, messageResolver, channelResolver),
});

export default schema;
