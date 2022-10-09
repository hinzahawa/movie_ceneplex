import express from "express";
const router = express.Router();
const MovieTimeModel = require("../models/movie_times");
const MovieModel = require("../models/movies");
const TheaterModel = require("../models/theaters");
const querySerializer = require("../manager/query_serializer");
const GenreModel = require("../models/genres");
import { Op } from "sequelize";

async function movieShowing(req: any, res: any): Promise<any> {
  const { startime, endtime }: any = req.query;
  try {
    let startDate = new Date(new Date().setHours(0, 0, 0, 0));
    let endDate = new Date(new Date().setHours(23, 59, 59, 999));
    if (startime && endtime) {
      startDate = new Date(startime);
      endDate = new Date(endtime);
    }
    let data = await MovieTimeModel.findAll({
      where: {
        start_time: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: MovieModel,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: { model: GenreModel, required: true, attributes: ["name"] },
        },
        {
          model: TheaterModel,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    return res.json(data);
  } catch (error) {
    throw error;
  }
}

async function createMoviesTime(req: any, res: any): Promise<any> {
  const { movie_id, theater_id, start_time }: any = req.body;
  try {
    if (movie_id > 0 && theater_id > 0 && start_time) {
      const isTheaterExists = await TheaterModel.findByPk(theater_id, {
        attributes: ["id"],
      });
      const isMovieExists = await MovieModel.findByPk(movie_id, {
        attributes: ["id"],
      });
      if (isTheaterExists && isMovieExists) {
        const createData = {
          movie_id,
          theater_id,
          start_time: new Date(start_time),
        };
        await MovieTimeModel.create(createData);
        return res.status(201).json({ message: "created successfully." });
        // } else return res.status(422).json({ message: "created failed." });
      }
      return res.status(400).json({ message: "created failed." });
    } else return res.status(400).json({ message: "request error" });
  } catch (error) {
    throw error;
  }
}

router.get("/", movieShowing);
router.post("/", createMoviesTime);

module.exports = router;
