import express from "express";
import { getAllProducts } from "../services/productService";

//create product router
const router = express.Router();

// get all products endpoint
router.get("/", async (req, res) => {
 try{
    // get all products from service
  const products = await getAllProducts();

  // send response products
  res.status(200).send(products);
 }catch(err){
  res.status(500).send("something went wrong!");
 }
});

export default router;
