"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productService_1 = require("../services/productService");
//create product router
const router = express_1.default.Router();
// get all products endpoint
router.get("/", async (req, res) => {
    try {
        // get all products from service
        const products = await (0, productService_1.getAllProducts)();
        // send response products
        res.status(200).send(products);
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
exports.default = router;
//# sourceMappingURL=productRoute.js.map