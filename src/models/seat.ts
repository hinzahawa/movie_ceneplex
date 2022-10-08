import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const Seat = sequelize.define("seat", {
  seat_no: { type: DataTypes.NUMBER },
  price: { type: DataTypes.NUMBER },
});

module.exports = Seat;
