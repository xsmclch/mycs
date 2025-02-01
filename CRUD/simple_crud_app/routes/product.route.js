import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js"
export const router = express.Router();

// get all product
router.get("/", getProducts);

// get a product
router.get("/:id", getProduct)

// create a product
router.post("/", createProduct);

// update a product
// app.put or app.patch
router.put("/:id", updateProduct);

// delete a product
router.delete("/:id", deleteProduct);