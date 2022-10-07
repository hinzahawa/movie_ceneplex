{
  const Manager = require("./query");
  class MoviesManager extends Manager {
    constructor() {
      super("movies");
    }
  }

  module.exports = new MoviesManager();
}
