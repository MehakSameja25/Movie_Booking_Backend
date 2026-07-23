const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Seat = sequelize.define("Seat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  seatNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("Available", "Booked", "Blocked"),
    allowNull: false,
    defaultValue: "Available",
  },
});

module.exports = Seat;
