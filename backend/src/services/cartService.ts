import { cartModel } from "../models/cartModel.ts";

// define interface for create  cart for user

interface CreateCartForUser {
  userId: string;
}

// define function for create cart  for user

const createCartForUser = async ({ userId }: CreateCartForUser) => {
// create cart for user
  const cart = await cartModel.create({ userId });
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