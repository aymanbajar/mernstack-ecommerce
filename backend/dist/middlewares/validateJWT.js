"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const validateJWT = (req, res, next) => {
    //get  authorization form req
    const authorization = req.get('authorization');
    //check if authorization is present
    if (!authorization) {
        res.status(403).send('Authorization header was not provided');
        return;
    }
    //get token from authorization
    const token = authorization.split(' ')[1];
    if (!token) {
        res.status(403).send('Token was not provided');
        return;
    }
    //verify token
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
        if (err) {
            res.status(403).send('Invalid token');
            return;
        }
        if (!payload) {
            res.status(403).send('Invalid token payload');
            return;
        }
        const userPayload = payload;
        //fetch user from database based on payload
        const user = await userModel_1.userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();
    });
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJWT.js.map