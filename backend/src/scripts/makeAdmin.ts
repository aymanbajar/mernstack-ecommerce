import mongoose from "mongoose";
import dotenv from "dotenv";
import { userModel } from "../models/userModel.ts";

dotenv.config();

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL || "");
        console.log("Connected to database...");
        
        const email = "ayman@bajar.com";
        const user = await userModel.findOneAndUpdate(
            { email }, 
            { role: "admin" }, 
            { new: true }
        );
        
        if (user) {
            console.log(`Successfully updated user ${email} to admin.`);
        } else {
            console.log(`User with email ${email} not found.`);
        }
    } catch (err) {
        console.error("Error connecting to database:", err);
    } finally {
        await mongoose.disconnect();
    }
};

makeAdmin();
