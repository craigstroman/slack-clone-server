import { tryLogin } from '../auth';
import requiresAuth from '../permissions';
import formatErrors from '../formatErrors';
import shortid from 'shortid';

require('dotenv').config();

shortid.characters(process.env.SHORT_ID_CHARACTERS);

export default {
  User: {
    /**
     * Get's the teams.
     *
     * @param      {Object}  parent       The parent.
     * @param      {Object}  args         The arguments.
     * @param      {Object}  models       The models.
     * @param      {Object}  user         The user.
     */
    teams: (parent, args, { models, user }) =>
      models.sequelize.query(
        'select * from teams as team join members as member on team.id = member.team_id where member.user_id = ?',
        {
          replacements: [user.id],
          model: models.Team,
          raw: true,
        },
      ),
  },
  Query: {
    /**
     * Get's the logged in user information.
     *
     * @param      {Object}  parent       The parent.
     * @param      {Object}  args         The arguments.
     * @param      {Object}  user         The user.
     * @param      {Object}  models       The models.
     */
    me: requiresAuth.createResolver((parent, args, { user, models }) => {
      return models.User.findOne({ where: { id: user.id } });
    }),
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET1, SECRET2 }) => {
      const loginResult = await tryLogin(email, password, models, SECRET1, SECRET2);
      let result = {};

      if (loginResult.ok) {
        const userId = loginResult.userInfo.id;

        try {
          const teams = await models.sequelize.query(
            'select * from teams as team join members as member on team.id = member.team_id where member.user_id = ?',
            {
              replacements: [userId],
              model: models.Team,
              raw: true,
            },
          );

          const team = teams[0];

          if (team) {
            const channel = await models.sequelize.query(
              "select uuid from channels where channels.name = 'general' and channels.team_id = ?",
              {
                replacements: [team.id],
                model: models.Channels,
                raw: true,
              },
            );

            const channelUUID = channel[0][0].uuid;

            result = {
              ok: loginResult.ok,
              user: loginResult.userInfo,
              teamUUID: team.uuid,
              channelUUID: channelUUID,
              token: loginResult.token,
              refreshToken: loginResult.refreshToken,
            };
          } else {
            result = {
              ok: loginResult.ok,
              user: loginResult.userInfo,
              token: loginResult.token,
              refreshToken: loginResult.refreshToken,
            };
          }
        } catch (err) {
          console.log('There are no teams.');
          result = {
            ok: loginResult.ok,
            user: loginResult.userInfo,
            token: loginResult.token,
            refreshToken: loginResult.refreshToken,
          };
        }
      }

      return result;
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
        args['uuid'] = shortid.generate();

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
