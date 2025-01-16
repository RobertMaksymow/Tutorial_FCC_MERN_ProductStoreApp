import express from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updatedProduct,
} from "../controllers/productController.js";

//Create express router
const router = express.Router();

// Product Routes
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updatedProduct);
router.delete("/:id", deleteProduct);

export default router;
