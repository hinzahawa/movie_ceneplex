const authorization = require("../middleware/authorization");
const movies = require("./movies");
const user = require("./users");
const movie_time = require("./movie_times");
const booking_ticket = require("./booking_ticket");

function routeAll(app: any) {
  app.use("/api/user", user);
  app.use("/api/movies", authorization, movies);
  app.use("/api/movietime", authorization, movie_time);
  app.use("/api/bookingticket", authorization, booking_ticket);
}
module.exports = routeAll;
