import mongoose ,{Schema,Document} from "mongoose";


// record schema and model
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// create schema
const  userSchema = new Schema<IUser>({
    firstName :{type:String, required:true},
    lastName :{type:String, required:true},
    email :{type:String, required:true, unique:true},
    password :{type:String, required:true},
});
// create model
export const userModel = mongoose.model<IUser>("User",userSchema);

