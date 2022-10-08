const express = require("express");
const router = express.Router();
const MoviesModel = require("../models/movies");
const querySerializer = require("../manager/query_serializer");

async function getData(req: any, res: any): Promise<any> {
  const query: any = querySerializer(req.query);
  try {
    const data = await MoviesModel.findAll(query);
    return res.json(data);
  } catch (error) {
    throw error;
  }
}

async function createData(req: any, res: any): Promise<any> {
  const reqCreate = req.body;
  try {
    const create = await MoviesModel.create(reqCreate);
    return res.status(201).json(create);
  } catch (error) {
    throw error;
  }
}

async function updatedData(req: any, res: any): Promise<any> {
  const { id, ...reqUpdate } = req.body;
  try {
    const filter = { where: { id } };
    const [result] = await MoviesModel.update(reqUpdate, filter);
    if (result > 0)
      return res.json({ result, message: "updated successfully." });
    else return res.status(422).json({ result, message: "updated nothing." });
  } catch (error) {
    throw error;
  }
}

async function deletedData(req: any, res: any): Promise<any> {
  const { id } = req.query;
  try {
    const filter = { where: { id } };
    const result = await MoviesModel.destroy(filter);
    if (result > 0)
      return res.json({ result, message: "deleted successfully." });
    else return res.status(422).json({ result, message: "deleted nothing." });
  } catch (error) {
    throw error;
  }
}

router.get("/", getData);
router.post("/", createData);
router.put("/", updatedData);
router.delete("/", deletedData);

module.exports = router;
