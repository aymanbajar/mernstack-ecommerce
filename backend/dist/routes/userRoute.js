"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService");
const validateJWT_1 = require("../middlewares/validateJWT");
const userService_2 = require("../services/userService");
// Create a router instance
const router = express_1.default.Router();
// user register route endpoint
router.post("/register", async (req, res) => {
    try {
        // get user details from request body
        const { firstName, lastName, email, password } = req.body;
        // call register service
        const { data, statusCode } = await (0, userService_1.register)({
            firstName,
            lastName,
            email,
            password,
        });
        console.log({ "First Name : ": firstName, "Last Name :": lastName, "Email : ": email, "Password :": password });
        // send response
        return res.status(statusCode).json(data);
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
//user login route endpoint
router.post("/login", async (req, res) => {
    try {
        // get user details from request body
        const { email, password } = req.body;
        // call login service
        const { data, statusCode } = await (0, userService_1.login)({ email, password });
        // send response
        return res.status(statusCode).json(data);
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
router.get("/my-orders", validateJWT_1.validateJWT, async (req, res) => {
    try {
        const userId = req.user._id;
        const { data, statusCode } = await (0, userService_2.getMyOrders)({ userId });
        res.status(statusCode).send(data);
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
exports.default = router;
//# sourceMappingURL=userRoute.js.map