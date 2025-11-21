import {  type Response , type NextFunction } from "express";
import jwt from "jsonwebtoken";
import {type  ExtendRequest } from "../types/ExtendRequest";
import { userModel } from "../models/userModel";



export const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    //get  authorization form req
    const authorization =  req.get('authorization');
    //check if authorization is present
    if(!authorization){
        res.status(403).send('Authorization header was not provided');
        return;
    }
    //get token from authorization
    const token  =  authorization.split(' ')[1];
    if(!token){
        res.status(403).send('Token was not provided');
        return;
    }
    //verify token
    jwt.verify(token,process.env.JWT_SECRET || "", async(err :any ,payload :any) =>{
        if(err){
            res.status(403).send('Invalid token');
            return;
        }
        if(!payload){
            res.status(403).send('Invalid token payload');
            return;
        }

        const  userPayload =  payload  as { email:string ; firstName:string; lastName:string };
        //fetch user from database based on payload
        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();

    })

}
