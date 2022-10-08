import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");
const GenreModel = require("../models/genre");

const Movies = sequelize.define("movies", {
  //   id: { type: DataTypes.UUID, allowNull: false, unique: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  duration_min: { type: DataTypes.NUMBER },
  director: { type: DataTypes.STRING },
  img_uri: { type: DataTypes.STRING },
  genre_id: { type: DataTypes.NUMBER },
});

GenreModel.hasMany(Movies, { foreignKey: "genre_id" });
Movies.belongsTo(GenreModel, { foreignKey: "genre_id" });

// console.log(Movies === sequelize.models.movies); // true

module.exports = Movies;
