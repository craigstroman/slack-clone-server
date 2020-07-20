import Sequelize from 'sequelize';

require('dotenv').config();

const db = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_USER_PASSWORD;

const sequelize = new Sequelize(db, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
  logging: false,
  // logging: function (str) {
  //   console.log(str);
  // },
});

const models = {
  User: sequelize.import('./users'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
