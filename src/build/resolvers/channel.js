"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _formatErrors = _interopRequireDefault(require("../formatErrors"));

var _permissions = _interopRequireDefault(require("../permissions"));

var _shortid = _interopRequireDefault(require("shortid"));

var _default = {
  Mutation: {
    createChannel: _permissions["default"].createResolver( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, _ref2) {
        var models, user, member, channel;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref2.models, user = _ref2.user;
                _context.prev = 1;
                _context.next = 4;
                return models.Member.findOne({
                  where: {
                    teamId: args.teamId,
                    userId: user.id
                  }
                }, {
                  raw: true
                });

              case 4:
                member = _context.sent;

                if (member.admin) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  errors: [{
                    path: 'name',
                    message: 'You have to be the owner of the team to create channels'
                  }]
                });

              case 7:
                args['uuid'] = _shortid["default"].generate();
                _context.next = 10;
                return models.Channel.create(args);

              case 10:
                channel = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  channel: channel
                });

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                return _context.abrupt("return", {
                  ok: false,
                  errors: (0, _formatErrors["default"])(_context.t0, models)
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 14]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;
//# sourceMappingURL=channel.js.map