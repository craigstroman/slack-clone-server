export default(sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    text: DataTypes.STRING
  }, {
    underscored: true,
  });
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};
