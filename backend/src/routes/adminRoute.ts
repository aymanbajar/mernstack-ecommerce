import express from "express";
import { getAllUsers } from "../services/userService.ts";
import { validateJWT } from "../middlewares/validateJWT.ts";
import { verifyAdmin } from "../middlewares/adminMiddleware.ts";
import { orderModel } from "../models/orderModel.ts";
import { productModel } from "../models/productModel.ts";
import { userModel } from "../models/userModel.ts";

const router = express.Router();

// get all users endpoint (Admin only)
router.get("/users", validateJWT, verifyAdmin, async (req, res) => {
 try {
  const { data, statusCode } = await getAllUsers();
  res.status(statusCode).send(data);
 } catch(err) {
  res.status(500).send("something went wrong!");
 }
});

// update user role
router.put("/users/:id/role", validateJWT, verifyAdmin, async (req, res) => {
    try {
        const { role } = req.body;
        if (role !== "admin" && role !== "user") {
            return res.status(400).send("Invalid role");
        }
        const user = await userModel.findByIdAndUpdate(req.params.id, { role }, { new: true });
        res.status(200).send(user);
    } catch(err) {
        res.status(500).send("Error updating user role");
    }
});

// get all orders
router.get("/orders", validateJWT, verifyAdmin, async (req, res) => {
    try {
        const orders = await orderModel.find().populate('userId', 'firstName lastName email').sort({ createdAt: -1 });
        res.status(200).send(orders);
    } catch(err) {
        res.status(500).send("Error fetching orders");
    }
});

// update order status
router.put("/orders/:id/status", validateJWT, verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.status(200).send(order);
    } catch(err) {
        res.status(500).send("Error updating order status");
    }
});

// get analytics
router.get("/analytics", validateJWT, verifyAdmin, async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const totalProducts = await productModel.countDocuments();
        const totalOrders = await orderModel.countDocuments();
        
        const orders = await orderModel.find();
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        res.status(200).send({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue
        });
    } catch(err) {
        res.status(500).send("Error fetching analytics");
    }
});

export default router;
