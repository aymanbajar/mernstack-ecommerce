import express from "express";
import { getAllProducts } from "../services/productService.ts";

//create product router
const router = express.Router();

// get all products endpoint
router.get("/", async (req, res) => {
  // get all products from service
  const products = await getAllProducts();

  // send response products
  res.status(200).send(products);
});

export default router;
