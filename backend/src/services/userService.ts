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
        return  { error :{ message : "User already exists"}}
    }
    // create new user
    const newUser = new userModel({firstName,lastName,email,password});
    // save user to database
    await newUser.save();
    // return new user
    return newUser
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
        return {error : {message : "Incorrect email  or password"}}
    }
    // check if password is correct

    if(findUser.password !== password){
        return {error : {message : "Incorrect email  or password"}}
    }
    // return user
    return findUser;
}
