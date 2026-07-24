const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  poster: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  posterFileId: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  language: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },

  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
    defaultValue: "Active",
  },
});

module.exports = Movie;
