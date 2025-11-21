import { userModel } from "../models/userModel.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel.ts";
// register parameters interface
interface RegisterParams{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

//register function
export const register  =async ({firstName,lastName,email,password}: RegisterParams) => {
    //check  if user have an account
    const  findUser =  await userModel.findOne({email});
    if(findUser){
        return  { data : "User already exists",statusCode : 400 }
    }
    //bcrypt  password
    const bcryptedPassword =  await bcrypt.hash(password,10);
    // create new user
    const newUser = new userModel({firstName,lastName,email,password:bcryptedPassword});
    // save user to database
    await newUser.save();
    // return new user
    return { data : generateJWT({firstName,lastName,email   }),statusCode : 200};
}   

//interface login params
interface LoginParams {
    email:string;
    password:string;
}
// login function
export const  login = async ({email,password}:LoginParams) => {
    // find user by email
    const findUser = await userModel.findOne({email});
    // check if user exists
    if(!findUser){
        return {data : "Incorrect email  or password",statusCode : 400}
    }


    // compare  password
    const isPasswordCorrect  = await bcrypt.compare(password,findUser.password);
    // check if password is correct

    if(!isPasswordCorrect){
        return {data : "Incorrect email  or password",statusCode : 400}
    }
    // return user
    return {data : generateJWT({firstName:findUser.firstName, lastName:findUser.lastName, email}),statusCode : 200};
}

//interface for get orders parameters
interface GetOrdersParams {
    userId:string;
}   


//get my orders function
export const getMyOrders = async({userId}: GetOrdersParams) => {
    try{
       return {data : await orderModel.find({userId}), statusCode : 200};

    }catch(err){
        throw new Error("Unable to get orders");
    }

}


// generate jwt token 
const generateJWT = (data :any) => {
    // sign jwt token for bcrypt data 
    return jwt.sign(data , process.env.JWT_SECRET || "")
}