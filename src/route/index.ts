const authorization = require("../middleware/authorization");
const movies = require("./movies");
const user = require("./user");

function routeAll(app: any) {
  app.use("/api/movies", authorization, movies);
  app.use("/api/user", user);
}
module.exports = routeAll;
