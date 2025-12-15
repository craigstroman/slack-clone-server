"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphqlSubscriptions = require("graphql-subscriptions");

var _permissions = _interopRequireWildcard(require("../permissions"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var pubsub = new _graphqlSubscriptions.PubSub();
var NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';
var _default = {
  Subscription: {
    newChannelMessage: {
      subscribe: _permissions.requiresTeamAccess.createResolver((0, _graphqlSubscriptions.withFilter)(function () {
        return pubsub.asyncIterator(NEW_CHANNEL_MESSAGE);
      }, function (payload, args) {
        return payload.channelId === args.channelId;
      }))
    }
  },
  Message: {
    user: function user(_ref, args, _ref2) {
      var _user = _ref.user,
          userId = _ref.userId;
      var models = _ref2.models;

      if (_user) {
        return _user;
      }

      return models.User.findOne({
        where: {
          id: userId
        }
      }, {
        raw: true
      });
    }
  },
  Query: {
    messages: _permissions["default"].createResolver( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref4, _ref5) {
        var channelId, models;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                channelId = _ref4.channelId;
                models = _ref5.models;
                return _context.abrupt("return", models.Message.findAll({
                  order: [['created_at', 'ASC']],
                  where: {
                    channelId: channelId
                  }
                }, {
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
        return _ref3.apply(this, arguments);
      };
    }())
  },
  Mutation: {
    createMessage: _permissions["default"].createResolver( /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, args, _ref7) {
        var models, user, message, asyncFunc;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                models = _ref7.models, user = _ref7.user;
                _context3.prev = 1;
                _context3.next = 4;
                return models.Message.create(_objectSpread(_objectSpread({}, args), {}, {
                  userId: user.id
                }));

              case 4:
                message = _context3.sent;

                asyncFunc = /*#__PURE__*/function () {
                  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
                    var currentUser;
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return models.User.findOne({
                              where: {
                                id: user.id
                              }
                            });

                          case 2:
                            currentUser = _context2.sent;
                            pubsub.publish(NEW_CHANNEL_MESSAGE, {
                              channelId: args.channelId,
                              newChannelMessage: _objectSpread(_objectSpread({}, message.dataValues), {}, {
                                user: currentUser.dataValues
                              })
                            });

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function asyncFunc() {
                    return _ref8.apply(this, arguments);
                  };
                }();

                asyncFunc();
                return _context3.abrupt("return", true);

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                console.log(_context3.t0);
                return _context3.abrupt("return", false);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      return function (_x4, _x5, _x6) {
        return _ref6.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;
//# sourceMappingURL=message.js.map