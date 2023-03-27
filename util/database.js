const Sequelize = require('sequelize');

const sequelize = new Sequelize('Bookings', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;