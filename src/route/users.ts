import express from "express";
const router = express.Router();
const UserModel = require("../models/users");
const querySerializer = require("../manager/query_serializer");
const { SECRET_KEY } = require("../../config");
const jwt = require("jsonwebtoken");

// const authorization = require("../middleware/authorization");

async function login(req: any, res: any): Promise<any> {
  const query: any = querySerializer(req.body);
  try {
    const isExistUser = await UserModel.findOne({
      ...query,
      attributes: ["id", "username"],
    });
    if (isExistUser) {
      const userData = isExistUser.toJSON();
      const token = await jwt.sign(userData, SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "24h",
      });
      return res.json({ message: "login successfully.", token });
    } else
      return res.status(400).json({ message: "username or password invalid!" });
  } catch (error) {
    throw error;
  }
}

router.post("/login", login);

module.exports = router;
