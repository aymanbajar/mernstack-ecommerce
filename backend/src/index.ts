import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.ts";
import productRoute from "./routes/productRoute.ts";
import { seedInitailProducts } from "./services/productService.ts";

const app = express(); // initialize express app
const PORT = 3000; // define port number
app.use(express.json()); // middleware to parse json request body

//connect to mongodb
mongoose
  .connect("mongodb+srv://aymanbajar:asd12341234@cluster0.maovooo.mongodb.net/")
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.log("failed to connect to MongoDB", error));

//seed initail products 
seedInitailProducts();

  app.use("/user", userRoute); // user route
  app.use('/product',productRoute); // product route

// app listen to port
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  