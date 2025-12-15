"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directMessageSubscription = exports.requiresTeamAccess = exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var createResolver = function createResolver(resolver) {
  var baseResolver = resolver;

  baseResolver.createResolver = function (childResolver) {
    var newResolver = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, context, info) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return resolver(parent, args, context, info);

              case 2:
                return _context.abrupt("return", childResolver(parent, args, context, info));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function newResolver(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }();

    return createResolver(newResolver);
  };

  return baseResolver;
}; // TODO: Continue trying to figure out why this returns false for logged in user when meQuery is run on ViewTeam page.
// requiresAuth


var _default = createResolver(function (parent, args, _ref2) {
  var user = _ref2.user;

  if (!user || !user.id) {
    throw new Error('Not authenticated');
  }
}); // requiresTeamAccess


exports["default"] = _default;
var requiresTeamAccess = createResolver( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref4, _ref5) {
    var channelId, user, models, channel, member;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            channelId = _ref4.channelId;
            user = _ref5.user, models = _ref5.models;

            if (!(!user || !user.id)) {
              _context2.next = 4;
              break;
            }

            throw new Error('Not authenticated, team access.');

          case 4:
            _context2.next = 6;
            return models.Channel.findOne({
              where: {
                id: channelId
              }
            });

          case 6:
            channel = _context2.sent;
            _context2.next = 9;
            return models.Member.findOne({
              where: {
                teamId: channel.teamId,
                user_id: user.id
              }
            });

          case 9:
            member = _context2.sent;

            if (member) {
              _context2.next = 12;
              break;
            }

            throw new Error("You have to be a member of the team to subscribe to it's messages.");

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}()); // export const requiresTeamAccess = createResolver((parent, args, { user }) => {
//   console.log('requiresTeamAccess');
// });
// directMessage subscription

exports.requiresTeamAccess = requiresTeamAccess;
var directMessageSubscription = createResolver( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref7, _ref8) {
    var teamId, userId, user, models, Op, members;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            teamId = _ref7.teamId, userId = _ref7.userId;
            user = _ref8.user, models = _ref8.models;

            if (!(!user || !user.id)) {
              _context3.next = 4;
              break;
            }

            throw new Error('Not authenticated, directmessages.');

          case 4:
            Op = _sequelize["default"].Op;
            _context3.next = 7;
            return models.Member.findAll({
              where: (0, _defineProperty2["default"])({
                teamId: teamId
              }, Op.or, [{
                userId: userId
              }, {
                userId: user.id
              }])
            });

          case 7:
            members = _context3.sent;

            if (!(members.length < 1)) {
              _context3.next = 10;
              break;
            }

            throw new Error('Something went wrong');

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}());
exports.directMessageSubscription = directMessageSubscription;
//# sourceMappingURL=permissions.js.map