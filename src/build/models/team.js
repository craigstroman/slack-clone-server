"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Team = sequelize.define('team', {
    uuid: DataTypes.STRING,
    name: {
      type: DataTypes.STRING
    },
    owner: DataTypes.INTEGER
  });

  Team.associate = function (models) {
    Team.belongsToMany(models.User, {
      through: 'member',
      foreignKey: {
        name: 'teamId',
        field: 'team_id'
      }
    });
  };

  return Team;
};

exports["default"] = _default;
//# sourceMappingURL=team.js.map