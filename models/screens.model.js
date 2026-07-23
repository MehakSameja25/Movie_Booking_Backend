const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Screen = sequelize.define("Screen", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
    defaultValue: "Active",
  },
});

module.exports = Screen;
