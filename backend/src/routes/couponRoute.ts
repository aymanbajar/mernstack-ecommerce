import express from "express";
import { validateJWT } from "../middlewares/validateJWT.ts";
import { verifyAdmin } from "../middlewares/adminMiddleware.ts";
import { couponModel } from "../models/couponModel.ts";

const router = express.Router();

// Admin: Get all coupons
router.get("/", validateJWT, verifyAdmin, async (req, res) => {
    try {
        const coupons = await couponModel.find().sort({ createdAt: -1 });
        res.status(200).send(coupons);
    } catch (err) {
        res.status(500).send("Error fetching coupons");
    }
});

// Admin: Create a new coupon
router.post("/", validateJWT, verifyAdmin, async (req, res) => {
    try {
        const { code, discountPercentage } = req.body;
        if (!code || !discountPercentage) {
            return res.status(400).send("Code and discountPercentage are required");
        }
        
        const existing = await couponModel.findOne({ code: code.toUpperCase() });
        if (existing) {
            return res.status(400).send("Coupon code already exists");
        }

        const coupon = new couponModel({ code: code.toUpperCase(), discountPercentage });
        await coupon.save();
        res.status(201).send(coupon);
    } catch (err) {
        res.status(500).send("Error creating coupon");
    }
});

// Admin: Delete a coupon
router.delete("/:id", validateJWT, verifyAdmin, async (req, res) => {
    try {
        await couponModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Coupon deleted");
    } catch (err) {
        res.status(500).send("Error deleting coupon");
    }
});

// User: Validate/Apply a coupon
router.post("/apply", validateJWT, async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await couponModel.findOne({ code: code.toUpperCase() });
        
        if (!coupon) {
            return res.status(404).send("Invalid coupon code");
        }
        
        if (!coupon.isActive) {
            return res.status(400).send("This coupon is no longer active");
        }

        res.status(200).send({ discountPercentage: coupon.discountPercentage });
    } catch (err) {
        res.status(500).send("Error applying coupon");
    }
});

export default router;
