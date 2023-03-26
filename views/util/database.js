const Sequelize = require('sequelize');

const sequelize = new Sequelize('sys', 'root', 'myself&me', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
