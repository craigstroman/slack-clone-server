"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTools = require("graphql-tools");

var _channel = _interopRequireDefault(require("./channel"));

var _message = _interopRequireDefault(require("./message"));

var _team = _interopRequireDefault(require("./team"));

var _user = _interopRequireDefault(require("./user"));

var resolvers = [_channel["default"], _message["default"], _team["default"], _user["default"]];

var _default = (0, _graphqlTools.mergeResolvers)(resolvers);

exports["default"] = _default;
//# sourceMappingURL=index.js.map