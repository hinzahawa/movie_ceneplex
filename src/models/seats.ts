import { json } from "body-parser";
import { Model, DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const Seat = sequelize.define("seats", {
  // seat_no: { type: DataTypes.NUMBER },
  // price: { type: DataTypes.NUMBER },
  seat_list: {
    type: DataTypes.JSON,
    get(this: Model): any {
      const seat_list: string = this.getDataValue("seat_list");
      try {
        return JSON.parse(seat_list);
      } catch (error) {
        return seat_list;
      }
    },
    set(this: Model, value: Model): any {
      this.setDataValue("seat_list", value);
    },
  },
});

module.exports = Seat;
