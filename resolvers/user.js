import { tryLogin } from '../auth';
import requiresAuth from '../permissions';
import formatErrors from '../formatErrors';

const resolvers = {
  Query: {
    /**
     * Get's the logged in user information.
     *
     * @param      {Object}  parent       The parent.
     * @param      {Object}  args         The arguments.
     * @param      {Object}  user         The user.
     * @param      {Object}  models       The models.
     */
    me: requiresAuth.createResolver((parent, args, { user, models }) =>
      models.User.findOne({ where: { id: user.id } }),
    ),
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET1, SECRET2 }) => {
      const loginResult = await tryLogin(email, password, models, SECRET1, SECRET2);

      if (loginResult.ok) {
        return {
          ok: loginResult.ok,
          user: loginResult.user,
          token: loginResult.token,
          refreshToken: loginResult.refreshToken,
        };
      }

      return 0;
    },
    /**
     * Registers a user.
     *
     * @param      {Object}  parent       The parent.
     * @param      {Object}  args         The arguments.
     * @param      {Object}  models       The models.
     */
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);

        return {
          ok: true,
          user,
        };
      } catch (err) {
        console.log('err: ', err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};

export default resolvers;
