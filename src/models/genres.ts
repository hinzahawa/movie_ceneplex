import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const Genre = sequelize.define("genres", {
  name: { type: DataTypes.STRING },
});

// console.log(Movies === sequelize.models.movies); // true

module.exports = Genre;
