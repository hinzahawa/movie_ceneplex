const authorization = require("../middleware/authorization");
const movies = require("./movies");

function routeAll(app: any) {
  app.use("/api/movies", authorization, movies);
}
module.exports = routeAll;
