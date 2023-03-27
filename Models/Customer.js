const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Customer = sequelize.define('customer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phoneNumber : Sequelize.STRING
});

module.exports = Customer;
