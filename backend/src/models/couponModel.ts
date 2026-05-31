import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
    code: string;
    discountPercentage: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const couponSchema = new Schema<ICoupon>({
    code: { type: String, required: true, unique: true, uppercase: true },
    discountPercentage: { type: Number, required: true, min: 1, max: 100 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const couponModel = mongoose.model<ICoupon>('Coupon', couponSchema);
