// const express = require('express')   old way importing
// for new way add "type": "module", in package.json

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./modelsDB/productModel.js";

dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.post("/products", async (req, res) => {
  const product = req.body; //user will send this data to the server

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server listening on port 5000!");
});
