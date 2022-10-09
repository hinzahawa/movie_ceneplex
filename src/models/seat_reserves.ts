import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const SeatReserved = sequelize.define("seat_reserveds", {
  seat_id: { type: DataTypes.NUMBER },
  reservation_id: { type: DataTypes.NUMBER },
});

module.exports = SeatReserved;
