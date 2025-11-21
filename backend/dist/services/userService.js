"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyOrders = exports.login = exports.register = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orderModel_1 = require("../models/orderModel");
//register function
const register = async ({ firstName, lastName, email, password }) => {
    //check  if user have an account
    const findUser = await userModel_1.userModel.findOne({ email });
    if (findUser) {
        return { data: "User already exists", statusCode: 400 };
    }
    //bcrypt  password
    const bcryptedPassword = await bcrypt_1.default.hash(password, 10);
    // create new user
    const newUser = new userModel_1.userModel({ firstName, lastName, email, password: bcryptedPassword });
    // save user to database
    await newUser.save();
    // return new user
    return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};
exports.register = register;
// login function
const login = async ({ email, password }) => {
    // find user by email
    const findUser = await userModel_1.userModel.findOne({ email });
    // check if user exists
    if (!findUser) {
        return { data: "Incorrect email  or password", statusCode: 400 };
    }
    // compare  password
    const isPasswordCorrect = await bcrypt_1.default.compare(password, findUser.password);
    // check if password is correct
    if (!isPasswordCorrect) {
        return { data: "Incorrect email  or password", statusCode: 400 };
    }
    // return user
    return { data: generateJWT({ firstName: findUser.firstName, lastName: findUser.lastName, email }), statusCode: 200 };
};
exports.login = login;
//get my orders function
const getMyOrders = async ({ userId }) => {
    try {
        return { data: await orderModel_1.orderModel.find({ userId }), statusCode: 200 };
    }
    catch (err) {
        throw new Error("Unable to get orders");
    }
};
exports.getMyOrders = getMyOrders;
// generate jwt token 
const generateJWT = (data) => {
    // sign jwt token for bcrypt data 
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET || "");
};
//# sourceMappingURL=userService.js.map