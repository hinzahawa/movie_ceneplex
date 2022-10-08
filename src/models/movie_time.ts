import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const MoviesTime = sequelize.define("movie_time", {
  movie_id: { type: DataTypes.NUMBER },
  theater_id: { type: DataTypes.NUMBER },
  start_time: { type: DataTypes.DATE },
});

module.exports = MoviesTime;
