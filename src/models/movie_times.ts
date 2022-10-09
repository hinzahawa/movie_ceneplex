import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");
const TheaterModel = require("../models/theaters");
const MovieModel = require("../models/movies");
const SeatModel = require("../models/seats");

const MoviesTime = sequelize.define("movie_times", {
  movie_id: { type: DataTypes.NUMBER },
  theater_id: { type: DataTypes.NUMBER },
  seat_id: { type: DataTypes.NUMBER },
  start_time: { type: DataTypes.DATE },
});

TheaterModel.hasMany(MoviesTime, { foreignKey: "theater_id" });
MoviesTime.belongsTo(TheaterModel, { foreignKey: "theater_id" });
MovieModel.hasMany(MoviesTime, { foreignKey: "movie_id" });
MoviesTime.belongsTo(MovieModel, { foreignKey: "movie_id" });
MoviesTime.belongsTo(SeatModel, { foreignKey: "seat_id" });

module.exports = MoviesTime;
