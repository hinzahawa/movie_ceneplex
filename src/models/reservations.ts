import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");
const MovieTimeModel = require("../models/movie_times");

const Reservation = sequelize.define("reservations", {
  user_id: { type: DataTypes.NUMBER },
  movie_time_id: { type: DataTypes.NUMBER },
});


module.exports = Reservation;
