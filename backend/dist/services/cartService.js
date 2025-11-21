"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = exports.clearCart = exports.deleteItemInCart = exports.updateItemInCart = exports.addItemToCart = exports.getActiveCartForUser = void 0;
const cartModel_1 = require("../models/cartModel");
const productModel_1 = require("../models/productModel");
const orderModel_1 = require("../models/orderModel");
// define function for create cart  for user
const createCartForUser = async ({ userId }) => {
    // create cart for user
    const cart = await cartModel_1.cartModel.create({ userId, totalAmount: 0 });
    // save cart to database
    await cart.save();
    return cart;
};
//define function for get active cart for user
const getActiveCartForUser = async ({ userId, populateProduct }) => {
    // find active cart for user
    let cart;
    if (populateProduct) {
        cart = await cartModel_1.cartModel.findOne({ userId, status: "active" }).populate("items.product");
    }
    else {
        cart = await cartModel_1.cartModel.findOne({ userId, status: "active" });
    }
    //check if cart exists
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
};
exports.getActiveCartForUser = getActiveCartForUser;
const addItemToCart = async ({ userId, productId, quantity }) => {
    //get active cart for user
    const cart = await (0, exports.getActiveCartForUser)({ userId });
    //check  product already exists in cart
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);
    // check  product in cart
    if (existsInCart) {
        return { data: "Product already in cart", statusCode: 400 };
    }
    //fetch product 
    const product = await productModel_1.productModel.findById(productId);
    if (!product) {
        return { data: "Product not found", statusCode: 404 };
    }
    //check if stock low from quantity
    if (product.stock < quantity) {
        return { data: "low stock for the product", statusCode: 400 };
    }
    // add item to cart
    cart.items.push({ product: productId, quantity, unitPrice: product.price });
    // update total amount
    cart.totalAmount += product.price * quantity;
    // save cart to database
    await cart.save();
    // return success message
    return { data: await (0, exports.getActiveCartForUser)({ userId, populateProduct: true }), statusCode: 200 };
};
exports.addItemToCart = addItemToCart;
const updateItemInCart = async ({ userId, productId, quantity }) => {
    //get active cart for user
    const cart = await (0, exports.getActiveCartForUser)({ userId });
    //find item in cart
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);
    //check if item exists in cart
    if (!existsInCart) {
        return { data: 'product does not exists in cart ', statusCode: 404 };
    }
    //fetch product
    const product = await productModel_1.productModel.findById(productId);
    if (!product) {
        return { data: "Product not found", statusCode: 404 };
    }
    //check if stock low from quantity
    if (product.stock < quantity) {
        return { data: "low stock for the product", statusCode: 400 };
    }
    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = calculateTotalAmount({ cartItems: otherCartItems });
    // update item quantity in cart
    existsInCart.quantity = quantity;
    // update total amount
    total += existsInCart.unitPrice * quantity;
    // assign total to cart
    cart.totalAmount = total;
    // save cart to database
    await cart.save();
    // return success message
    return { data: await (0, exports.getActiveCartForUser)({ userId, populateProduct: true }), statusCode: 200 };
};
exports.updateItemInCart = updateItemInCart;
// define function for remove item from cart
const deleteItemInCart = async ({ userId, productId }) => {
    //get adctive cart for user
    const cart = await (0, exports.getActiveCartForUser)({ userId });
    //find item in cart
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);
    //check if item exists in cart
    if (!existsInCart) {
        return { data: 'product does not exists in cart ', statusCode: 404 };
    }
    // filter out the item to be removed
    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);
    // calculate new total amount
    let total = calculateTotalAmount({ cartItems: otherCartItems });
    // assign filtered items to cart
    cart.items = otherCartItems;
    // update total amount
    cart.totalAmount = total;
    // save cart to database
    await cart.save();
    // return success message
    return { data: await (0, exports.getActiveCartForUser)({ userId, populateProduct: true }), statusCode: 200 };
};
exports.deleteItemInCart = deleteItemInCart;
// calculate total amount of cart
const calculateTotalAmount = ({ cartItems }) => {
    const total = cartItems.reduce((sum, item) => {
        return sum + item.unitPrice * item.quantity;
    }, 0);
    return total;
};
//define function for clear cart
const clearCart = async ({ userId }) => {
    //get active cart for user
    const cart = await (0, exports.getActiveCartForUser)({ userId });
    //clear cart items
    cart.items = [];
    //set total amount to zero
    cart.totalAmount = 0;
    //save cart to database
    await cart.save();
    //return success message
    return { data: await (0, exports.getActiveCartForUser)({ userId, populateProduct: true }), statusCode: 200 };
};
exports.clearCart = clearCart;
const checkout = async ({ userId, address }) => {
    //check if address is provided
    if (!address) {
        return { data: "Address is required for checkout", statusCode: 400 };
    }
    //get active cart for user
    const cart = await (0, exports.getActiveCartForUser)({ userId });
    //define order items array
    const orderItems = [];
    //items in cart 
    for (const item of cart.items) {
        //get product 
        const product = await productModel_1.productModel.findById(item.product);
        if (!product) {
            return { data: "Product not found", statusCode: 404 };
        }
        const orderItem = {
            productTitle: product.title,
            productImage: product.image,
            unitPrice: item.unitPrice,
            quantity: item.quantity
        };
        //push order item to order items array
        orderItems.push(orderItem);
    }
    //assign items properties to order model
    const order = await orderModel_1.orderModel.create({
        userId,
        address,
        orderItems,
        total: cart.totalAmount
    });
    //save order to database
    await order.save();
    //update cart status to completed
    cart.status = "completed";
    //save cart to database
    await cart.save();
    //return success message
    return { data: order, statusCode: 200 };
};
exports.checkout = checkout;
//# sourceMappingURL=cartService.js.map