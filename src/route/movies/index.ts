import express from "express";
// const express = require("express");
const router = express.Router();
const MoviesManager = require("../../manager/movies");

async function get(req: any, res: any): Promise<any> {
  const data = await MoviesManager.findAll();
  return res.json({ data });
}

router.get("/", get);

module.exports = router;
