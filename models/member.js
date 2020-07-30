export default (sequelize, DataTypes) => {
  const member = sequelize.define('member', {
    admin: DataTypes.BOOLEAN
  }, {
    underscored: true,
  });
  member.associate = function(models) {
    // associations can be defined here
  };
  return member;
};
