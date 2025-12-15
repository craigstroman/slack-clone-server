"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var router = new _express.Router();

if (process.env.NODE_ENV === 'development') {
  router.route(/^\/(?!graphql).*/).get(_controllers.indexPage);
} else {
  router.route('*').get(_controllers.indexPage);
}

var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map