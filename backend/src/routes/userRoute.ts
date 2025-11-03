import express from "express";
import { login, register } from "../services/userService.ts";

// Create a router instance
const router = express.Router();

// user register route endpoint
router.post("/register", async (req, res) => {
 try{
    // get user details from request body
  const { firstName, lastName, email, password } = req.body;

  // call register service
  const { data, statusCode } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  console.log({"First Name : ": firstName, "Last Name :": lastName, "Email : ": email, "Password :": password});
  // send response
  return res.status(statusCode).json(data);
 }catch(err){
  res.status(500).send("something went wrong!");
 }
});

//user login route endpoint

router.post("/login", async (req, res) => {
  try{
    // get user details from request body
  const { email, password } = req.body;
  // call login service
  const { data, statusCode } = await login({ email, password });
  // send response
  return res.status(statusCode).json(data);
  }catch(err){
    res.status(500).send("something went wrong!");
  }
});

export default router;
