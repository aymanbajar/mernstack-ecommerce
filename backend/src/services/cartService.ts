import { cartModel } from "../models/cartModel.ts";
import { type ICartItem } from "../models/cartModel.ts";
import type { IOrderItems } from "../models/orderModel.ts";
import { productModel } from "../models/productModel.ts";
import { orderModel } from "../models/orderModel.ts";
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
    populateProduct?:boolean
}

//define function for get active cart for user
export const getActiveCartForUser = async({ userId ,populateProduct}: GetActiveCartForUser) =>{
    // find active cart for user
    let cart ;
    if(populateProduct){
      cart = await cartModel.findOne({ userId, status: "active" }).populate("items.product");
    }else{
      cart = await cartModel.findOne({ userId, status: "active" });
    }

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
    return {data: await getActiveCartForUser({userId,populateProduct:true}),statusCode:200};

}

//define interface for update item in cart
interface UpdateItemInCart{
  userId:string;
  productId:any;
  quantity:number;
}
export const updateItemInCart = async({userId,productId,quantity}:UpdateItemInCart) =>{
  //get active cart for user
  const cart = await getActiveCartForUser({userId});
  //find item in cart
  const existsInCart = cart.items.find((p) => p.product.toString() === productId);
  //check if item exists in cart
  if(!existsInCart){
    return {data:'product does not exists in cart ',statusCode:404};
  }
  //fetch product
  const product =  await productModel.findById(productId);
  if(!product){
    return {data :"Product not found",statusCode:404};
   }
  //check if stock low from quantity
  if(product.stock < quantity){
    return {data:"low stock for the product",statusCode:400};
   }
   const otherCartItems  =cart.items.filter((p) => p.product.toString() !== productId);
   let total  = calculateTotalAmount({cartItems:otherCartItems});
    // update item quantity in cart
    existsInCart.quantity = quantity;
    // update total amount
    total += existsInCart.unitPrice * quantity;
    // assign total to cart
    cart.totalAmount = total;
    // save cart to database
    await cart.save();
    // return success message
    return {data: await getActiveCartForUser({userId,populateProduct:true}),statusCode:200};
}

// define interface for remove item from cart
interface DeleteItemInCart{
  userId:string;
  productId:any;
}

// define function for remove item from cart
export const deleteItemInCart =  async({userId,productId}:DeleteItemInCart) =>{
  //get adctive cart for user
  const cart = await getActiveCartForUser({userId});
  //find item in cart
  const existsInCart =  cart.items.find((p) => p.product.toString() === productId);
  //check if item exists in cart
  if(!existsInCart){
    return {data:'product does not exists in cart ',statusCode:404};
  }
  // filter out the item to be removed
  const otherCartItems  = cart.items.filter((p) => p.product.toString() !== productId);
  // calculate new total amount
  let  total = calculateTotalAmount({cartItems:otherCartItems});
  // assign filtered items to cart
  cart.items = otherCartItems;
  // update total amount
  cart.totalAmount = total;
  // save cart to database
  await cart.save();
  // return success message
  return {data: await getActiveCartForUser({userId,populateProduct:true}),statusCode:200};
}

// calculate total amount of cart

const calculateTotalAmount = ({cartItems}:{cartItems: ICartItem[]}) => {
  const total = cartItems.reduce((sum, item) => {
    return sum + item.unitPrice * item.quantity;
  }, 0);
  return total;
}


//define interface for clear cart
interface ClearCart{
  userId:string;
}
//define function for clear cart
export const clearCart = async({userId}:ClearCart) =>{
  //get active cart for user
  const cart = await getActiveCartForUser({userId});
  //clear cart items
  cart.items = [];
  //set total amount to zero
  cart.totalAmount = 0;
  //save cart to database
   await cart.save();
  //return success message
  return {data: await getActiveCartForUser({userId,populateProduct:true}),statusCode:200};
}

//define interfacr for checkut params
interface checkOutParams {
  userId:string;
  address:string;
}

export const checkout   = async({userId,address}:checkOutParams) => {
  //check if address is provided
  if(!address){
    return {data:"Address is required for checkout",statusCode:400};
  }
  //get active cart for user
  const cart = await getActiveCartForUser({userId});
 //define order items array
 const orderItems:IOrderItems[] = [];

 //items in cart 
 for(const item of cart.items){
  //get product 
  const product =  await productModel.findById(item.product);
  if(!product){
    return {data :"Product not found",statusCode:404};
   }
   const orderItem:IOrderItems ={
    productTitle:product.title,
    productImage:product.image,
    unitPrice:item.unitPrice,
    quantity:item.quantity
   }
   //push order item to order items array
   orderItems.push(orderItem);
   }
   //assign items properties to order model
   const order = await orderModel.create({
    userId,
    address,
    orderItems,
    total:cart.totalAmount
   });
   //save order to database
    await order.save();
    //update cart status to completed
    cart.status = "completed";
    //save cart to database
    await cart.save();
    //return success message
    return {data:order,statusCode:200};

 }





