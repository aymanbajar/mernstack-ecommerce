import express from "express";
import mongoose from "mongoose";

const app = express(); // initialize express app
const PORT = 3000; // define port number

//connect to mongodb
mongoose
  .connect("mongodb+srv://aymanbajar:asd12341234@cluster0.maovooo.mongodb.net/")
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.log("failed to connect to MongoDB", error));

// app listen to port
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  