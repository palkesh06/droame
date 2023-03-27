const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Booking = sequelize.define('booking', {
  booking_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true
  },
  customer_name: Sequelize.STRING,
});

module.exports = Booking;
