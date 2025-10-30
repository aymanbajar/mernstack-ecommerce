import mongoose, {Schema ,Document, type ObjectId} from 'mongoose';

//define interface for order items
 export interface IOrderItems {
    productTitle:string;
    productImage:string;
    unitPrice:number;
    quantity:number;
}

//define interface for order
export  interface IOrder extends Document {
    orderItems: IOrderItems[];
    total: number;
    address: string;
    userId: ObjectId | string;
}

//create schema for order items
const orderItemsSchema =  new Schema<IOrderItems>({
    productTitle: {type: String, required: true},
    productImage: {type: String, required: true},
    unitPrice: {type: Number, required: true},
    quantity: {type: Number, required: true},
});

//create schema for order
const orderSchema  =  new Schema<IOrder>({
    orderItems : [orderItemsSchema],
    total: {type: Number, required: true},
    address: {type: String, required: true},
    userId:{type: Schema.Types.ObjectId, ref: 'User', required: true}
})    ;

//create order model
export const orderModel = mongoose.model<IOrder>('Order', orderSchema);