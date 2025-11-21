"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartService_1 = require("../services/cartService");
const validateJWT_1 = require("../middlewares/validateJWT");
const cartService_2 = require("../services/cartService");
const cartService_3 = require("../services/cartService");
const cartService_4 = require("../services/cartService");
const cartService_5 = require("../services/cartService");
const cartService_6 = require("../services/cartService");
// create  router for cart
const router = express_1.default.Router();
// define enddpoint for get active cart for user
router.get('/', validateJWT_1.validateJWT, async (req, res) => {
    try {
        // get the userId from the jwt, after vailditing from middleware.
        const userId = req.user?.id;
        //get active cart for user
        const cart = await (0, cartService_1.getActiveCartForUser)({ userId, populateProduct: true });
        res.status(200).send(cart);
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
//Add items to cart endpoint
router.post('/items', validateJWT_1.validateJWT, async (req, res) => {
    try {
        const userId = req.user?._id;
        const { productId, quantity } = req.body;
        //add items to cart
        const { statusCode, data } = await (0, cartService_2.addItemToCart)({ userId, productId, quantity });
        //send response
        res.status(statusCode).send(data);
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
// update item in cart endpoint
router.put('/items', validateJWT_1.validateJWT, async (req, res) => {
    try {
        //get user id from jwt
        const userId = req.user?._id;
        // get product id and quantity from body
        const { productId, quantity } = req.body;
        const { data, statusCode } = await (0, cartService_3.updateItemInCart)({ userId, productId, quantity });
        res.status(statusCode).send({ data });
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
//define endpoint for delete item from cart
router.delete('/items/:productId', validateJWT_1.validateJWT, async (req, res) => {
    try {
        //get user id from jwt
        const userId = req.user?._id;
        // get product id from params
        const { productId } = req.params;
        const { data, statusCode } = await (0, cartService_4.deleteItemInCart)({ userId, productId });
        res.status(statusCode).send({ data });
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
//define endpoint for clear cart
router.delete('/', validateJWT_1.validateJWT, async (req, res) => {
    try {
        //get user id from jwt
        const userId = req.user?._id;
        const { data, statusCode } = await (0, cartService_5.clearCart)({ userId });
        res.status(statusCode).send({ data });
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
//define endpoint for checkout cart
router.post('/checkout', validateJWT_1.validateJWT, async (req, res) => {
    try {
        //get user id from jwt
        const userId = req.user?._id;
        //get addres from body
        const { address } = req.body;
        //call checkout
        const { data, statusCode } = await (0, cartService_6.checkout)({ userId, address });
        //send response
        res.status(statusCode).send({ data });
    }
    catch (err) {
        res.status(500).send("something went wrong!");
    }
});
exports.default = router;
//# sourceMappingURL=cartRoute.js.map