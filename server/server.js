// const express = require('express')   old way importing
// for new way add "type": "module", in package.json

import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
// console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;

const app = express();

const __dirname = path.resolve();

//Middleware
app.use(express.json()); // allows us to accept JSON data in the req.body

// app.get("/", (req, res) => {
//   res.send("Welcome!");
// });

app.use("/api_v1/products", productRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server listening on port: " + PORT);
});
