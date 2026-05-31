import express from "express";
import { login, register } from "../services/userService.ts";
import { validateJWT } from "../middlewares/validateJWT.ts";
import type { ExtendRequest } from "../types/ExtendRequest.ts";
import { getMyOrders } from "../services/userService.ts";

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

router.get("/my-orders",validateJWT,async(req:ExtendRequest,res) => {
  try{
    const userId = req.user._id;
    const {data, statusCode} = await getMyOrders({userId});
    res.status(statusCode).send(data);
  }catch(err){
    res.status(500).send("something went wrong!");
  }
})

// get wishlist
router.get("/wishlist", validateJWT, async(req:ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { userModel } = await import("../models/userModel.ts");
    const user = await userModel.findById(userId).populate('wishlist');
    res.status(200).send(user?.wishlist || []);
  } catch(err) {
    res.status(500).send("Error fetching wishlist");
  }
});

// toggle wishlist item
router.post("/wishlist/toggle", validateJWT, async(req:ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    const { userModel } = await import("../models/userModel.ts");
    
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const index = user.wishlist.findIndex(id => id.toString() === productId);
    if (index === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(index, 1);
    }
    await user.save();
    
    res.status(200).send({ message: "Wishlist updated", wishlist: user.wishlist });
  } catch(err) {
    res.status(500).send("Error updating wishlist");
  }
});

export default router;
