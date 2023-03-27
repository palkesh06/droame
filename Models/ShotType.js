const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ShotType = sequelize.define('shotType', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = ShotType;
