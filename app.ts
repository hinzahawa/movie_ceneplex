const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const authorization = require("./src/middleware/authorization");
const movies = require("./src/route/movies");
dotenv.config();

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/movies", authorization, movies);

const port = process.env.PORT || 3000;

app.get("/", (req: any, res: any) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
