// const express = require('express')   old way importing
// for new way add "type": "module", in package.json

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();

//Middleware
app.use(express.json()); // allows us to accept JSON data in the req.body

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api_v1/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server listening on port 5000!");
});
