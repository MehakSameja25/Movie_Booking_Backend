const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BookingSeat = sequelize.define(
  "BookingSeat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    showId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = BookingSeat;
