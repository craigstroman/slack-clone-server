"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexPage = void 0;

var _path = _interopRequireDefault(require("path"));

var indexPage = function indexPage(req, res) {
  res.render('index', {
    title: req.app.locals.title,
    content: req.app.locals.content,
    path: req.path
  });
};

exports.indexPage = indexPage;
//# sourceMappingURL=index.js.map