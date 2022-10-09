const authorization = require("../middleware/authorization");
const movies = require("./movies");
const user = require("./users");
const movie_time = require("./movie_times");

function routeAll(app: any) {
  app.use("/api/user", user);
  app.use("/api/movies", authorization, movies);
  app.use("/api/movietime", authorization, movie_time);
}
module.exports = routeAll;
