"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

require('dotenv').config();

var db = process.env.DB_NAME;
var dbUser = process.env.DB_USER;
var dbPassword = process.env.DB_USER_PASSWORD;
var sequelize = new _sequelize["default"](db, dbUser, dbPassword, {
  dialect: 'postgres',
  define: {
    underscored: true
  },
  logging: false // logging: function (str) {
  //   console.log(str);
  // },

});
var models = {
  User: sequelize["import"]('./user'),
  Channel: sequelize["import"]('./channel'),
  Message: sequelize["import"]('./message'),
  Team: sequelize["import"]('./team'),
  Member: sequelize["import"]('./member'),
  DirectMessage: sequelize["import"]('./directMessage')
};
Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});
models.sequelize = sequelize;
models.Sequelize = _sequelize["default"];
var _default = models;
exports["default"] = _default;
//# sourceMappingURL=index.js.map