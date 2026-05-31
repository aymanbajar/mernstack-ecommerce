import { userModel } from "../models/userModel.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel.ts";
import { sendWelcomeEmail } from "./emailService.ts";

//register function
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: any) => {
  try {
    const userExist = await userModel.findOne({ email });

    if (userExist) return { data: "user is already exist !", statusCode: 400 };

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    
    // Send welcome email asynchronously
    sendWelcomeEmail(email, firstName);

    return { data : generateJWT({firstName,lastName,email, role: newUser.role }),statusCode : 200};
  } catch (err) {
    return { data: "something went wrong", statusCode: 500 };
  }
};

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
    return {data : generateJWT({firstName:findUser.firstName, lastName:findUser.lastName, email, role: findUser.role}),statusCode : 200};
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

// get all users function (Admin only)
export const getAllUsers = async () => {
    try {
        const users = await userModel.find({}, '-password'); // Exclude password
        return { data: users, statusCode: 200 };
    } catch(err) {
        throw new Error("Unable to get users");
    }
}

// generate jwt token 
const generateJWT = (data :any) => {
    // sign jwt token for bcrypt data 
    return jwt.sign(data , process.env.JWT_SECRET || "")
}