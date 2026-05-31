export interface Product {
    _id:string;
    title:string;
    image:string;
    price:number;
    stock:number;
    category?:string;
    averageRating?:number;
    reviews?: {
        userId: { _id: string, firstName: string, lastName: string };
        rating: number;
        comment: string;
        createdAt: string;
    }[];
}