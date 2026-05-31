import express from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductById, addReview } from "../services/productService.ts";
import { validateJWT } from "../middlewares/validateJWT.ts";
import { verifyAdmin } from "../middlewares/adminMiddleware.ts";
import { type ExtendRequest } from "../types/ExtendRequest.ts";

//create product router
const router = express.Router();

// get all products endpoint with filtering
router.get("/", async (req, res) => {
 try{
  const { category, minPrice, maxPrice } = req.query;
  const query: any = {};
  
  if (category && category !== "All") {
      query.category = category;
  }
  
  if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const products = await getAllProducts(query);
  res.status(200).send(products);
 }catch(err){
  res.status(500).send("something went wrong!");
 }
});

// get product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        res.status(200).send(product);
    } catch(err) {
        res.status(500).send("Error fetching product");
    }
});

// add a review
router.post("/:id/review", validateJWT, async (req: ExtendRequest, res) => {
    try {
        const { rating, comment } = req.body;
        const userId = req.user?._id;
        
        if (!rating || !comment) return res.status(400).send("Rating and comment are required");
        
        const product = await addReview(req.params.id, userId, rating, comment);
        res.status(201).send(product);
    } catch(err: any) {
        res.status(400).send(err.message || "Error adding review");
    }
});

// create product endpoint (Admin only)
router.post("/", validateJWT, verifyAdmin, async (req, res) => {
 try {
  const { title, image, price, stock, category } = req.body;
  if (!title || !image || price == null || stock == null) {
      return res.status(400).send("Missing required product fields");
  }

  const newProduct = await createProduct({ title, image, price, stock, category });
  res.status(201).send(newProduct);
 } catch(err) {
  res.status(500).send("something went wrong!");
 }
});

// update product endpoint (Admin only)
router.put("/:id", validateJWT, verifyAdmin, async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send(updatedProduct);
    } catch(err) {
        res.status(500).send("something went wrong updating product!");
    }
});

// delete product endpoint (Admin only)
router.delete("/:id", validateJWT, verifyAdmin, async (req, res) => {
    try {
        const deletedProduct = await deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send("Product deleted successfully");
    } catch(err) {
        res.status(500).send("something went wrong deleting product!");
    }
});

export default router;
