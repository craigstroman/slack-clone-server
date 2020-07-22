export default (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'Channel',
    {
      uuid: DataTypes.STRING,
      name: DataTypes.STRING,
      public: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      underscored: true,
    },
  );
  Channel.associate = function (models) {
    // 1:M
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });
    // N:M
    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      },
    });
  };
  return Channel;
};
