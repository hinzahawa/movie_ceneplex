import { json } from "body-parser";
import { Model, DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const Seat = sequelize.define("seats", {
  // seat_no: { type: DataTypes.NUMBER },
  // price: { type: DataTypes.NUMBER },
  seat_list: {
    type: DataTypes.JSON,
    get(this: Model): [] {
      const seat_list: string = this.getDataValue("seat_list");
      return JSON.parse(seat_list);
    },
    // set(this: Model): any {
    //   this.setDataValue("seat_list", val.join(";"));
    // },
  },
});

module.exports = Seat;
