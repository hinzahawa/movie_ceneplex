import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const Movies = sequelize.define("movies", {
  //   id: { type: DataTypes.UUID, allowNull: false, unique: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  duration_min: { type: DataTypes.NUMBER },
  director: { type: DataTypes.STRING },
  img_uri: { type: DataTypes.STRING },
});

// console.log(Movies === sequelize.models.movies); // true

module.exports = Movies;
