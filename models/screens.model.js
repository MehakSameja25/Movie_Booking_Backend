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
});

module.exports = Screen;
