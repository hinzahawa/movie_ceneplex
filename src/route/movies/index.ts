import express from "express";
// const express = require("express");
const router = express.Router();

async function get(req: any, res: any): Promise<any> {
  return res.json({ message: "test" });
}

router.get("/", get);

module.exports = router;
