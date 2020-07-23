import requiresAuth, { requiresTeamAccess } from '../permissions';

export default {
  Message: {
    user: ({ user, userId }, args, { models }) => {
      if (user) {
        return user;
      }

      return models.User.findOne({ where: { id: userId } }, { raw: true });
    },
  },
  Query: {
    messages: requiresAuth.createResolver(async (parent, { channelId }, { models }) =>
      models.Message.findAll({ order: [['created_at', 'ASC']], where: { channelId } }, { raw: true }),
    ),
  },
};
