import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const Theater = sequelize.define("theaters", {
  name: { type: DataTypes.STRING },
});


module.exports = Theater;
