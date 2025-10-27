import mongoose, { Schema, Document, type ObjectId } from "mongoose";
import { type IProduct } from "./productModel.ts";

const CartStatusEnum = ["active" , "completed"]

//define interface for cart item
export interface ICartItem extends Document {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}
//define interface for cart
export interface ICart extends Document{
    userId:string | ObjectId;
    items: ICartItem[];
    totalAmount: number;
    status: "active" | "completed";
}

//define cart item schema
const CartItemSchema =  new Schema<ICartItem>({
    product: {type: Schema.Types.ObjectId ,ref:"Product", required:true},
    unitPrice: {type:Number, required:true},
    quantity: {type:Number, required:true, default:1},
});

//define cart schema
const cartSchema =  new Schema<ICart>({
    userId:{type:Schema.Types.ObjectId, ref:"User", required:true},
    items: [CartItemSchema],
    totalAmount: {type:Number, required:true, default:0},
    status: {type:String, enum:CartStatusEnum, default:"active"},
});

//export cart model
export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
