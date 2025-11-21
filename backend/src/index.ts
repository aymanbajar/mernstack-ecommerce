import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitailProducts } from "./services/productService";
import cors from "cors";
dotenv.config(); // load environment variables from .env file
const app = express(); // initialize express app
app.use(cors()); // enable CORS
const PORT = 3000; // define port number
app.use(express.json()); // middleware to parse json request body

//connect to mongodb
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.log("failed to connect to MongoDB", error));

//seed initail products 
seedInitailProducts();

  app.use("/user", userRoute); // user route
  app.use('/product',productRoute); // product route
  app.use('/cart',cartRoute); // cart route

// app listen to port
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  