"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tryLogin = exports.refreshTokens = exports.createTokens = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _lodash = _interopRequireDefault(require("lodash"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

/**
 * Creates the auth tokens.
 *
 * @param      {String}  user     The user.
 * @param      {String}  secret1  The secret.
 * @param      {String}  secret2  The secret 2.
 */
var createTokens = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user, secret1, secret2) {
    var createToken, createRefreshToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createToken = _jsonwebtoken["default"].sign({
              user: _lodash["default"].pick(user, ['id', 'username'])
            }, secret1, {
              expiresIn: '1h'
            });
            createRefreshToken = _jsonwebtoken["default"].sign({
              user: _lodash["default"].pick(user, ['id', 'username'])
            }, secret2, {
              expiresIn: '7d'
            });
            return _context.abrupt("return", [createToken, createRefreshToken]);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createTokens(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Refreshes a users auth tokens.
 *
 * @param      {String}  token         The token.
 * @param      {String}  refreshToken  The refresh token.
 * @param      {Object}  models        The models.
 * @param      {String}  SECRET1        The secret.
 */


exports.createTokens = createTokens;

var refreshTokens = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token, refreshToken, models, SECRET1) {
    var userId, _jwt$decode, id, user, _yield$createTokens, _yield$createTokens2, newToken, newRefreshToken;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = -1;
            _context2.prev = 1;
            _jwt$decode = _jsonwebtoken["default"].decode(refreshToken), id = _jwt$decode.user.id;
            userId = id;
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", {});

          case 9:
            if (userId) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", {});

          case 11:
            _context2.next = 13;
            return models.User.findOne({
              where: {
                id: userId
              },
              raw: true
            });

          case 13:
            user = _context2.sent;

            if (user) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", {});

          case 16:
            _context2.prev = 16;

            _jsonwebtoken["default"].verify(refreshToken, user.refreshSecret);

            _context2.next = 23;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t1 = _context2["catch"](16);
            return _context2.abrupt("return", {});

          case 23:
            _context2.next = 25;
            return createTokens(user, SECRET1, user.refreshSecret);

          case 25:
            _yield$createTokens = _context2.sent;
            _yield$createTokens2 = (0, _slicedToArray2["default"])(_yield$createTokens, 2);
            newToken = _yield$createTokens2[0];
            newRefreshToken = _yield$createTokens2[1];
            return _context2.abrupt("return", {
              token: newToken,
              refreshToken: newRefreshToken,
              user: user
            });

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6], [16, 20]]);
  }));

  return function refreshTokens(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Logs a user in.
 *
 * @param      {String}  email     The email.
 * @param      {String}  password  The password.
 * @param      {Object}  models    The models.
 * @param      {String}  SECRET1   The secret.
 * @param      {String}  SECRET2   The secret 2.
 */


exports.refreshTokens = refreshTokens;

var tryLogin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email, password, models, SECRET1, SECRET2) {
    var user, valid, refreshTokenSecret, _yield$createTokens3, _yield$createTokens4, token, refreshToken;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return models.User.findOne({
              where: {
                email: email
              },
              raw: true
            });

          case 2:
            user = _context3.sent;

            if (user) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", {
              ok: false,
              errors: [{
                path: '',
                message: 'Invalid email or password.'
              }]
            });

          case 5:
            _context3.next = 7;
            return _bcrypt["default"].compare(password, user.password);

          case 7:
            valid = _context3.sent;

            if (valid) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", {
              ok: false,
              errors: [{
                path: '',
                message: 'Invalid email or password.'
              }]
            });

          case 10:
            refreshTokenSecret = user.password + SECRET2;
            _context3.next = 13;
            return createTokens(user, SECRET1, refreshTokenSecret);

          case 13:
            _yield$createTokens3 = _context3.sent;
            _yield$createTokens4 = (0, _slicedToArray2["default"])(_yield$createTokens3, 2);
            token = _yield$createTokens4[0];
            refreshToken = _yield$createTokens4[1];
            return _context3.abrupt("return", {
              userInfo: user,
              ok: true,
              token: token,
              refreshToken: refreshToken
            });

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function tryLogin(_x8, _x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

exports.tryLogin = tryLogin;
//# sourceMappingURL=auth.js.map