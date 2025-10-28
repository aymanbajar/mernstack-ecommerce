import { cartModel } from "../models/cartModel.ts";
import { type ICartItem } from "../models/cartModel.ts";
import { productModel } from "../models/productModel.ts";
// define interface for create  cart for user

interface CreateCartForUser {
  userId: string;
}

// define function for create cart  for user

const createCartForUser = async ({ userId }: CreateCartForUser) => {
// create cart for user
  const cart = await cartModel.create({ userId ,totalAmount:0});
  // save cart to database
  await cart.save();
  return cart;
};

//define interface for get active cart for user
interface GetActiveCartForUser {
    userId: string;
}

//define function for get active cart for user
export const getActiveCartForUser = async({ userId }: GetActiveCartForUser) =>{
    // find active cart for user
    let cart = await cartModel.findOne({ userId, status: "active" });

    //check if cart exists
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
}

//define interface for add item to cart
interface AddItemToCart{
  userId:string;
  productId:any;
  quantity:number;
}

export const addItemToCart =  async({userId,productId,quantity}:AddItemToCart) =>{
  //get active cart for user
  const cart  = await getActiveCartForUser({userId});

  //check  product already exists in cart
  const  existsInCart  = cart.items.find((p) => p.product.toString() === productId);
   // check  product in cart
   if(existsInCart){
    return {data :"Product already in cart",statusCode:400};
   }
   //fetch product 
   const product = await productModel.findById(productId); 
   if(!product){
    return {data :"Product not found",statusCode:404};
   }
   //check if stock low from quantity
   if(product.stock < quantity){
    return {data:"low stock for the product",statusCode:400};
   }
    // add item to cart
    cart.items.push({product:productId,quantity,unitPrice:product.price});
    // update total amount
    cart.totalAmount += product.price * quantity;
    // save cart to database
    await cart.save();
    // return success message
    return {data:"Item added to cart",statusCode:200};

}