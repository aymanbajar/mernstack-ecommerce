import express from "express";
import { login, register } from "../services/userService.ts";

// Create a router instance
const router = express.Router();

// user register route endpoint
router.post("/register", async (req, res) => {
  // get user details from request body
  const { firstName, lastName, email, password } = req.body;

  // call register service
  const { data, statusCode } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  // send response
  return res.status(statusCode).send(data);
});

//user login route endpoint

router.post("/login", async (req, res) => {
  // get user details from request body
  const { email, password } = req.body;
  // call login service
  const { data, statusCode } = await login({ email, password });
  // send response
  return res.status(statusCode).send(data);
});

export default router;
