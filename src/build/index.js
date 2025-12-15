"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _apolloServerExpress = require("apollo-server-express");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _graphql = require("graphql");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _cors = _interopRequireDefault(require("cors"));

var _auth = require("./auth");

var _index = _interopRequireDefault(require("./routes/index"));

var _index2 = _interopRequireDefault(require("./models/index"));

var _schema = _interopRequireDefault(require("./schema"));

require('dotenv').config();

var PORT = process.env.PORT || 3000;
var SECRET1 = process.env.SECRET1;
var SECRET2 = process.env.SECRET2;
var graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
var subscriptionEndpoint = process.env.SUBSCRIPTION_ENDPOINT;
var graphql = "http://localhost:".concat(PORT).concat(graphqlEndpoint);
var subscriptions = "ws://localhost:".concat(PORT).concat(subscriptionEndpoint);
var reactApp = process.env.NODE_ENV === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';
var app = (0, _express["default"])();
app.set('views', _path["default"].join(__dirname, './views'));
app.set('view engine', 'pug');
app.use('/static', _express["default"]["static"]('public'));
app.use((0, _cors["default"])());
app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.HOST);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
app.use(_index["default"]);
app.locals.title = 'Slack Clone';
app.locals.content = 'A Slack clone using Express, GarphQL, and React.';
app.locals.reactApp = reactApp;
app.locals.env = process.env;
var apolloServer = new _apolloServerExpress.ApolloServer({
  schema: _schema["default"],
  playground: process.env.NODE_ENV === 'development' ? {
    graphqlEndpoint: graphqlEndpoint
  } : false,
  context: function context(_ref) {
    var req = _ref.req;
    var token = req.headers['x-token'] || null;

    if (token) {
      try {
        var _jwt$verify = _jsonwebtoken["default"].verify(token, SECRET1),
            user = _jwt$verify.user;

        return {
          models: _index2["default"],
          user: user,
          SECRET1: SECRET1,
          SECRET2: SECRET2
        };
      } catch (err) {
        console.log('error: ');
        console.log('err: ', err);
      }
    }

    return {
      models: _index2["default"],
      SECRET1: SECRET1,
      SECRET2: SECRET2
    };
  }
});
apolloServer.applyMiddleware({
  app: app
});
var server = (0, _http.createServer)(app);
server.listen({
  port: PORT
}, function () {
  console.log("\uD83D\uDE80 Server ready at ".concat(graphql));
  console.log("\uD83D\uDE80 Subscriptions ready at ".concat(subscriptions));
  new _subscriptionsTransportWs.SubscriptionServer({
    execute: _graphql.execute,
    subscribe: _graphql.subscribe,
    schema: _schema["default"],
    onConnect: function () {
      var _onConnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connectionParams, webSocket) {
        var token, refreshToken, _jwt$verify2, user, newTokens;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = connectionParams.token, refreshToken = connectionParams.refreshToken;

                if (!(token && refreshToken)) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 2;
                _jwt$verify2 = _jsonwebtoken["default"].verify(token, SECRET1), user = _jwt$verify2.user;
                return _context.abrupt("return", {
                  user: user,
                  models: _index2["default"]
                });

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](2);
                _context.next = 11;
                return (0, _auth.refreshTokens)(token, refreshToken, _index2["default"], SECRET1, SECRET2);

              case 11:
                newTokens = _context.sent;
                return _context.abrupt("return", {
                  user: newTokens.user,
                  models: _index2["default"]
                });

              case 13:
                return _context.abrupt("return", {
                  models: _index2["default"]
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 7]]);
      }));

      function onConnect(_x, _x2) {
        return _onConnect.apply(this, arguments);
      }

      return onConnect;
    }(),
    reconnect: true
  }, {
    server: server,
    reconnect: true,
    path: '/subscriptions'
  });
});
//# sourceMappingURL=index.js.map