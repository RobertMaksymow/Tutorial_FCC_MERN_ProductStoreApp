// const express = require('express')   old way importing
// for new way add "type": "module", in package.json

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(5000, () => {
  connectDB();
  console.log("Server listening on port 5000!");
});
