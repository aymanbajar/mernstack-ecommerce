import mongoose ,{Schema ,Document} from "mongoose";

//define product interface
export interface IProduct extends Document {
    title:string;
    image:string;
    price:number;
    stock:number;
    category:string;
    averageRating:number;
    reviews: {
        userId: mongoose.Types.ObjectId;
        rating: number;
        comment: string;
        createdAt: Date;
    }[];
}
//define product schema

const  productSchema = new Schema<IProduct>({
    title:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    stock:{type:Number, required:true ,default:0},
    category:{type:String, default: "Uncategorized"},
    averageRating: {type:Number, default: 0},
    reviews: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true })
//export product model
export const productModel = mongoose.model<IProduct>("Product", productSchema);