import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const Reservation = sequelize.define("reservation", {
  user_id: { type: DataTypes.NUMBER },
  movie_time_id: { type: DataTypes.NUMBER },
});

module.exports = Reservation;
