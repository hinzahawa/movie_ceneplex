import express from "express";
const router = express.Router();
const UserModel = require("../models/user");
const querySerializer = require("../manager/query_serializer");
// const authorization = require("../middleware/authorization");

async function login(req: any, res: any): Promise<any> {
  const query: any = querySerializer(req.body);
  try {
    const isExistUser = await UserModel.findOne({
      ...query,
      attributes: ["id", "username"],
    });
    return res.json(isExistUser);
  } catch (error) {
    throw error;
  }
}

router.post("/login", login);

module.exports = router;
