import { userModel } from "../models/userModel.js";

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
    // create new user
    const newUser = new userModel({firstName,lastName,email,password});
    // save user to database
    await newUser.save();
    // return new user
    return { data : newUser,statusCode : 200};
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
    // check if password is correct

    if(findUser.password !== password){
        return {data : "Incorrect email  or password",statusCode : 400}
    }
    // return user
    return {data : findUser,statusCode : 200};
}
