export default (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'Team',
    {
      uuid: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      underscored: true,
    },
  );
  Team.associate = function (models) {
    // associations can be defined here
  };
  return Team;
};
