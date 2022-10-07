const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
dotenv.config();

const connnect_db = require("./src/connnect_db");
const authorization = require("./src/middleware/authorization");
const movies = require("./src/route/movies");

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/movies", authorization, movies);

const port = process.env.PORT || 3000;

app.get("/", (req: any, res: any) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
