"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _auth = require("../auth");

var _formatErrors = _interopRequireDefault(require("../formatErrors"));

var _permissions = _interopRequireDefault(require("../permissions"));

var _shortid = _interopRequireDefault(require("shortid"));

var _default = {
  User: {
    /**
     * Get's the teams.
     *
     * @param      {Object}  parent       The parent.
     * @param      {Object}  args         The arguments.
     * @param      {Object}  models       The models.
     * @param      {Object}  user         The user.
     */
    teams: function teams(parent, args, _ref) {
      var models = _ref.models,
          user = _ref.user;
      return models.sequelize.query('select * from teams as team join members as member on team.id = member.team_id where member.user_id = ?', {
        replacements: [user.id],
        model: models.Team,
        raw: true
      });
    }
  },
  Query: {
    /**
     * Get's all users.
     *
     * @param      {Object}  parent       The parent.
     * @param      {Object}  args         The arguments.
     * @param      {Object}  models       The models.
     */
    allUsers: function allUsers(parent, args, _ref2) {
      var models = _ref2.models;
      return models.User.findAll();
    },

    /**
     * Get's the logged in user information.
     *
     * @param      {Object}  parent       The parent.
     * @param      {Object}  args         The arguments.
     * @param      {Object}  user         The user.
     * @param      {Object}  models       The models.
     */
    me: _permissions["default"].createResolver(function (parent, args, _ref3) {
      var user = _ref3.user,
          models = _ref3.models;
      return models.User.findOne({
        where: {
          id: user.id
        }
      });
    }),
    verifyEmail: function () {
      var _verifyEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, _ref4) {
        var models, email, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref4.models;
                _context.prev = 1;
                email = args.email;
                _context.next = 5;
                return models.User.findOne({
                  where: {
                    email: email
                  }
                }, {
                  raw: true
                });

              case 5:
                result = _context.sent;

                if (!(result !== null)) {
                  _context.next = 9;
                  break;
                }

                if (!(email === result.email)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", true);

              case 9:
                return _context.abrupt("return", false);

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                console.log("There was an error: ".concat(_context.t0));
                return _context.abrupt("return", false);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 12]]);
      }));

      function verifyEmail(_x, _x2, _x3) {
        return _verifyEmail.apply(this, arguments);
      }

      return verifyEmail;
    }(),

    /**
     * Verify's if a user exists or not.
     *
     * @param      {Object}   parent       The parent
     * @param      {Object}   args         The arguments
     * @param      {Object}   models       The models
     * @return     {boolean}  { description_of_the_return_value }
     */
    verifyUser: function () {
      var _verifyUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, args, _ref5) {
        var models, username, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref5.models;
                _context2.prev = 1;
                username = args.username;
                _context2.next = 5;
                return models.User.findOne({
                  where: {
                    username: username
                  }
                }, {
                  raw: true
                });

              case 5:
                result = _context2.sent;

                if (!(result !== null)) {
                  _context2.next = 9;
                  break;
                }

                if (!(username === result.username)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", true);

              case 9:
                return _context2.abrupt("return", false);

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);
                console.log("There was an error: ".concat(_context2.t0));
                return _context2.abrupt("return", false);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 12]]);
      }));

      function verifyUser(_x4, _x5, _x6) {
        return _verifyUser.apply(this, arguments);
      }

      return verifyUser;
    }()
  },
  Mutation: {
    /**
     * Logs a user in.
     *
     * @param      {Object}  parent         The parent
     * @param      {String}  email          The email.
     * @param      {String}  password       The password.
     * @param      {Object}  models         The models.
     * @param      {String}  SECRET         The secret.
     * @param      {String}  SECRET2        The secret 2.
     */
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref6, _ref7) {
        var email, password, models, SECRET1, SECRET2, loginResult, result, teams, team, channelUUID, channel;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = _ref6.email, password = _ref6.password;
                models = _ref7.models, SECRET1 = _ref7.SECRET1, SECRET2 = _ref7.SECRET2;
                _context3.next = 4;
                return (0, _auth.tryLogin)(email, password, models, SECRET1, SECRET2);

              case 4:
                loginResult = _context3.sent;
                result = null;
                teams = null;
                team = null;
                channelUUID = null;

                if (!loginResult.ok) {
                  _context3.next = 37;
                  break;
                }

                _context3.prev = 10;
                _context3.next = 13;
                return models.sequelize.query('select * from teams as team join members as member on team.id = member.team_id where member.user_id = ?', {
                  replacements: [loginResult.userInfo.id],
                  model: models.Team,
                  raw: true
                });

              case 13:
                teams = _context3.sent;
                team = teams[0];

                if (!(team !== undefined)) {
                  _context3.next = 22;
                  break;
                }

                _context3.next = 18;
                return models.sequelize.query("select uuid from channels where channels.name = 'general' and channels.team_id = ?", {
                  replacements: [team.id],
                  model: models.Channels,
                  raw: true
                });

              case 18:
                channel = _context3.sent;
                channelUUID = channel[0][0].uuid;
                _context3.next = 26;
                break;

              case 22:
                console.log('No teams.');
                teams = [];
                team = '';
                channelUUID = '';

              case 26:
                _context3.next = 34;
                break;

              case 28:
                _context3.prev = 28;
                _context3.t0 = _context3["catch"](10);
                console.log("There was an error: ".concat(_context3.t0));
                teams = [];
                team = '';
                channelUUID = '';

              case 34:
                if (Array.isArray(teams)) {
                  if (teams.length >= 1) {
                    result = {
                      ok: loginResult.ok,
                      user: loginResult.user,
                      teamUUID: team.uuid,
                      channelUUID: channelUUID,
                      token: loginResult.token,
                      refreshToken: loginResult.refreshToken
                    };
                  } else {
                    result = {
                      ok: loginResult.ok,
                      user: loginResult.user,
                      teamUUID: undefined,
                      token: loginResult.token,
                      refreshToken: loginResult.refreshToken
                    };
                  }
                } else {
                  result = {
                    ok: loginResult.ok,
                    user: loginResult.user,
                    teamUUID: undefined,
                    token: loginResult.token,
                    refreshToken: loginResult.refreshToken
                  };
                }

                _context3.next = 38;
                break;

              case 37:
                result = {
                  ok: loginResult.ok,
                  user: loginResult.user,
                  teamUUID: undefined,
                  token: loginResult.token,
                  refreshToken: loginResult.refreshToken
                };

              case 38:
                return _context3.abrupt("return", result);

              case 39:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[10, 28]]);
      }));

      function login(_x7, _x8, _x9) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),

    /**
     * Registers a user.
     *
     * @param      {Object}  parent       The parent.
     * @param      {Object}  args         The arguments.
     * @param      {Object}  models       The models.
     */
    register: function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, args, _ref8) {
        var models, user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                models = _ref8.models;
                _context4.prev = 1;
                args['uuid'] = _shortid["default"].generate();
                _context4.next = 5;
                return models.User.create(args);

              case 5:
                user = _context4.sent;
                return _context4.abrupt("return", {
                  ok: true,
                  user: user
                });

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", {
                  ok: false,
                  errors: (0, _formatErrors["default"])(_context4.t0, models)
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 9]]);
      }));

      function register(_x10, _x11, _x12) {
        return _register.apply(this, arguments);
      }

      return register;
    }(),
    updateProfile: function () {
      var _updateProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, args, _ref9) {
        var models, id, username, firstName, lastName, phoneNumber;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                models = _ref9.models;
                id = args.id, username = args.username, firstName = args.firstName, lastName = args.lastName, phoneNumber = args.phoneNumber;
                _context5.prev = 2;
                _context5.next = 5;
                return models.sequelize.query('update users set username = ?, first_name = ?, last_name = ?, phone_number = ? where id = ?', {
                  replacements: [username, firstName, lastName, phoneNumber, id],
                  model: models.User,
                  raw: true
                });

              case 5:
                return _context5.abrupt("return", {
                  ok: true
                });

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", {
                  ok: false,
                  errors: (0, _formatErrors["default"])(_context5.t0, models)
                });

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 8]]);
      }));

      function updateProfile(_x13, _x14, _x15) {
        return _updateProfile.apply(this, arguments);
      }

      return updateProfile;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=user.js.map