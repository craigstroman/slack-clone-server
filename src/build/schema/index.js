"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _team = _interopRequireDefault(require("./team"));

var _channel = _interopRequireDefault(require("./channel"));

var _message = _interopRequireDefault(require("./message"));

var _error = _interopRequireDefault(require("./error"));

var schemas = [_user["default"], _team["default"], _channel["default"], _message["default"], _error["default"]];
var _default = schemas;
exports["default"] = _default;
//# sourceMappingURL=index.js.map