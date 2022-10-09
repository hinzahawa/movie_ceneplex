import { DataTypes } from "sequelize";
const sequelize = require("../manager/sequelize");

const User = sequelize.define("users", {
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

module.exports = User;
