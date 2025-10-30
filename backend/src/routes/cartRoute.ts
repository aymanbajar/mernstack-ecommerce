import express from 'express';
import {getActiveCartForUser} from '../services/cartService.ts';
import { validateJWT } from '../middlewares/validateJWT.ts';
import {type ExtendRequest} from '../types/ExtendRequest.ts';
import { addItemToCart } from '../services/cartService.ts';
import { updateItemInCart } from '../services/cartService.ts';  
import { deleteItemInCart } from '../services/cartService.ts';
import { clearCart } from '../services/cartService.ts';
import {checkout} from '../services/cartService.ts';

// create  router for cart
const router = express.Router();

// define enddpoint for get active cart for user
router.get('/',validateJWT, async (req: ExtendRequest ,res) => {
   // get the userId from the jwt, after vailditing from middleware.
   const userId = req.user?.id;
    //get active cart for user
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
})

//Add items to cart endpoint

router.post('/items',validateJWT,async (req:ExtendRequest,res)=>{
  const userId =  req.user?._id;
 const {productId ,quantity} = req.body;

 //add items to cart
 const {statusCode,data} = await addItemToCart({userId,productId,quantity});
 //send response
 res.status(statusCode).send({data});

})

// update item in cart endpoint
router.put('/items',validateJWT,async (req:ExtendRequest,res)=>{
  //get user id from jwt
  const userId =  req.user?._id;
  // get product id and quantity from body
  const {productId ,quantity} = req.body;
  const {data ,statusCode} = await updateItemInCart({userId,productId,quantity});
  res.status(statusCode).send({data});

})

//define endpoint for delete item from cart
router.delete('/items/:productId',validateJWT,async (req:ExtendRequest,res)=>{
  //get user id from jwt
  const userId =  req.user?._id;
  // get product id from params
  const {productId} = req.params;
  const {data ,statusCode} = await deleteItemInCart({userId,productId});
  res.status(statusCode).send({data});
})

//define endpoint for clear cart
router.delete('/',validateJWT,async (req:ExtendRequest,res)=>{
  //get user id from jwt
  const userId =  req.user?._id;
  const {data ,statusCode} = await clearCart({userId});
  res.status(statusCode).send({data});
})

//define endpoint for checkout cart
router.post('/checkout',validateJWT, async (req:ExtendRequest,res)=>{
    //get user id from jwt
    const userId = req.user?._id;
    //get addres from body
    const {address} = req.body;
    //call checkout
    const {data ,statusCode} = await checkout({userId,address});
    //send response
    res.status(statusCode).send({data});


});
export default router;