"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _default = function _default(e, models) {
  if (e instanceof models.sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map(function (x) {
      return _lodash["default"].pick(x, ['path', 'message']);
    });
  }

  return [{
    path: 'name',
    message: 'something went wrong'
  }];
};

exports["default"] = _default;
//# sourceMappingURL=formatErrors.js.map