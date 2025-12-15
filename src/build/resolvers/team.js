"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _formatErrors = _interopRequireDefault(require("../formatErrors"));

var _permissions = _interopRequireDefault(require("../permissions"));

var _shortid = _interopRequireDefault(require("shortid"));

var _team = _interopRequireDefault(require("../models/team"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  Query: {
    /**
     * Get's the team members.
     *
     * @param      {Object}  parent       The parent.
     * @param      {number}  teamId       The teamId.
     * @param      {Object}  models       The models.
     */
    getTeamMembers: _permissions["default"].createResolver( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref2, _ref3) {
        var teamId, models;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teamId = _ref2.teamId;
                models = _ref3.models;
                return _context.abrupt("return", models.sequelize.query('select * from users as u join members as m on m.user_id = u.id where m.team_id = ?', {
                  replacements: [teamId],
                  model: models.User,
                  raw: true
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }())
  },
  Mutation: {
    /**
     * Allows a user to invite a user to a team.
     *
     * @param      {Object}  parent       The parent.
     * @param      {String}  email        The email.
     * @param      {number}  teamId       The teamId.
     * @param      {Object}  models       The models.
     * @param      {Object}  user         The user.
     */
    addTeamMember: _permissions["default"].createResolver( /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref5, _ref6) {
        var email, teamId, models, user, memberPromise, userToAddPromise, _yield$Promise$all, _yield$Promise$all2, member, userToAdd;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                email = _ref5.email, teamId = _ref5.teamId;
                models = _ref6.models, user = _ref6.user;
                _context2.prev = 2;
                memberPromise = models.Member.findOne({
                  where: {
                    teamId: teamId,
                    userId: user.id
                  }
                }, {
                  raw: true
                });
                userToAddPromise = models.User.findOne({
                  where: {
                    email: email
                  }
                }, {
                  raw: true
                });
                _context2.next = 7;
                return Promise.all([memberPromise, userToAddPromise]);

              case 7:
                _yield$Promise$all = _context2.sent;
                _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
                member = _yield$Promise$all2[0];
                userToAdd = _yield$Promise$all2[1];

                if (member.admin) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", {
                  ok: false,
                  errors: [{
                    path: 'email',
                    message: 'You cannot add members to the team'
                  }]
                });

              case 13:
                if (userToAdd) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", {
                  ok: false,
                  errors: [{
                    path: 'email',
                    message: 'Could not find user with this email'
                  }]
                });

              case 15:
                _context2.next = 17;
                return models.Member.create({
                  userId: userToAdd.id,
                  teamId: teamId
                });

              case 17:
                return _context2.abrupt("return", {
                  ok: true
                });

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](2);
                console.log(_context2.t0);
                return _context2.abrupt("return", {
                  ok: false,
                  errors: (0, _formatErrors["default"])(_context2.t0, models)
                });

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 20]]);
      }));

      return function (_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      };
    }()),

    /**
     * Creates a team.
     *
     * @param      {Object}  parent       The parent.
     * @param      {Object}  args         The args.
     * @param      {Object}  models       The models.
     * @param      {Object}  user         The user.
     */
    createTeam: _permissions["default"].createResolver( /*#__PURE__*/function () {
      var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, args, _ref8) {
        var models, user, teamName, teamExists, response;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                models = _ref8.models, user = _ref8.user;
                _context4.prev = 1;
                teamName = args['name'];
                _context4.next = 5;
                return models.sequelize.query('select * from teams where name = :name and owner = :owner', {
                  replacements: {
                    name: teamName,
                    owner: user.id
                  },
                  model: models.Team,
                  raw: true
                });

              case 5:
                teamExists = _context4.sent;

                if (!Array.isArray(teamExists)) {
                  _context4.next = 12;
                  break;
                }

                if (teamExists.length) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 10;
                return models.sequelize.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                  var team, channel;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          args['uuid'] = _shortid["default"].generate();
                          args['channelUUID'] = '';
                          _context3.next = 4;
                          return models.Team.create(_objectSpread(_objectSpread({}, args), {}, {
                            owner: user.id
                          }));

                        case 4:
                          team = _context3.sent;
                          _context3.next = 7;
                          return models.Channel.create({
                            uuid: _shortid["default"].generate(),
                            name: 'general',
                            "public": true,
                            teamId: team.id
                          });

                        case 7:
                          channel = _context3.sent;
                          team.channelUUID = channel.uuid;
                          _context3.next = 11;
                          return models.Member.create({
                            teamId: team.id,
                            userId: user.id,
                            admin: true
                          });

                        case 11:
                          return _context3.abrupt("return", team);

                        case 12:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })));

              case 10:
                response = _context4.sent;
                return _context4.abrupt("return", {
                  ok: true,
                  team: response,
                  channelUUID: response.channelUUID
                });

              case 12:
                throw 'Team name already exists.';

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](1);
                console.log(_context4.t0);
                return _context4.abrupt("return", {
                  ok: false,
                  errors: (0, _formatErrors["default"])(_context4.t0, models)
                });

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 15]]);
      }));

      return function (_x7, _x8, _x9) {
        return _ref7.apply(this, arguments);
      };
    }())
  },
  Team: {
    channels: function channels(_ref10, args, _ref11) {
      var id = _ref10.id;
      var models = _ref11.models;
      return models.Channel.findAll({
        where: {
          teamId: id
        }
      });
    },
    directMessageMembers: function directMessageMembers(_ref12, args, _ref13) {
      var id = _ref12.id;
      var models = _ref13.models,
          user = _ref13.user;
      return models.sequelize.query('select distinct on (u.id) u.id, u.uuid, u.username from users as u join direct_messages as dm on (u.id = dm.sender_id) or (u.id = dm.receiver_id) where (:currentUserId = dm.sender_id or :currentUserId = dm.receiver_id) and dm.team_id = :teamId', {
        replacements: {
          currentUserId: user.id,
          teamId: id
        },
        model: models.User,
        raw: true
      });
    },
    teamMembers: function teamMembers(_ref14, args, _ref15) {
      var id = _ref14.id;
      var models = _ref15.models,
          user = _ref15.user;
      return models.sequelize.query('select u.id, u.uuid, u.username from users as u join members as m on m.user_id = u.id where m.team_id = ?', {
        replacements: [id],
        model: models.User,
        raw: true
      });
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=team.js.map