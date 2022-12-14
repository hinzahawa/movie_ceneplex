import express from "express";
const router = express.Router();
const MovieTimeModel = require("../models/movie_times");
const MovieModel = require("../models/movies");
const TheaterModel = require("../models/theaters");
const GenreModel = require("../models/genres");
const SeatModel = require("../models/seats");
// const querySerializer = require("../manager/query_serializer");
import { Op } from "sequelize";

async function movieShowing(req: any, res: any): Promise<any> {
  const {
    movie_id,
    startime,
    endtime,
  }: { movie_id: number; startime: string; endtime: string } = req.query;
  try {
    let startDate = new Date(new Date().setHours(0, 0, 0, 0));
    let endDate = new Date(new Date().setHours(23, 59, 59, 999));
    if (startime && endtime) {
      startDate = new Date(startime);
      endDate = new Date(endtime);
    }
    let query: any = {
      where: {
        start_time: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ["id", "start_time"],
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
        {
          model: SeatModel,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    };
    if (movie_id > 0)
      query.where = { movie_id: parseInt(movie_id.toString()), ...query.where };
    let data = await MovieTimeModel.findAll(query);
    return res.json(data);
  } catch (error) {
    throw error;
  }
}

async function createMoviesTime(req: any, res: any): Promise<any> {
  const {
    movie_id,
    theater_id,
    start_time,
  }: { movie_id: number; theater_id: number; start_time: string } = req.body;
  try {
    // res.json(seat_list);
    if (movie_id > 0 && theater_id > 0 && start_time) {
      const isTheaterExists = await TheaterModel.findByPk(theater_id, {
        attributes: ["id"],
      });
      const isMovieExists = await MovieModel.findByPk(movie_id, {
        attributes: ["id"],
      });
      if (isTheaterExists && isMovieExists) {
        let seat_list: any = [];
        for (let index = 1; index <= 30; index++) {
          seat_list.push({ seat_no: index, price: 200, active: false });
        }
        const { id } = await SeatModel.create({ seat_list });
        const createData = {
          movie_id,
          theater_id,
          start_time: new Date(start_time),
          seat_id: id,
        };
        await MovieTimeModel.create(createData);
        return res.status(201).json({ message: "created successfully." });
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
