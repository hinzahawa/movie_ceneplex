import express from "express";
const router = express.Router();
const MovieTimeModel = require("../models/movie_times");
const ResevationModel = require("../models/reservations");
const SeatModel = require("../models/seats");

async function bookingTicket(req: any, res: any): Promise<any> {
  const user_id = req.user.id;
  const {
    movies_time_id,
    seat_no,
    cancel,
  }: { movies_time_id: number; seat_no: number; cancel: boolean } = req.body;
  try {
    if (movies_time_id > 0 && seat_no > 0) {
      const isMoviesTimeExists = await MovieTimeModel.findByPk(movies_time_id, {
        attributes: ["id", "seat_id"],
        include: [
          {
            model: SeatModel,
            required: true,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      if (isMoviesTimeExists == null)
        return res.status(400).json({ message: "request error" });
      let {
        seat: { seat_list },
        seat_id,
      } = isMoviesTimeExists.toJSON();
      seat_list = seat_list.map((e: any) => {
        if (e.seat_no === parseInt(seat_no.toString())) {
          e.active = cancel ? false : true;
          if (cancel) delete e.user_id;
          else e.user_id = user_id;
        }
        return e;
      });
      const booking = { user_id, movies_time_id };
      const updateSeatfilter = { where: { id: seat_id } };
      const updateSeatData = { seat_list };
      await SeatModel.update(updateSeatData, updateSeatfilter);
      await ResevationModel.create(booking);
      let message = cancel
        ? "cancel booking ticket successfully."
        : "booking ticket successfully.";
      return res.status(201).json({ message });
    } else return res.status(400).json({ message: "request error" });
  } catch (error) {
    throw error;
  }
}

router.post("/", bookingTicket);

module.exports = router;
