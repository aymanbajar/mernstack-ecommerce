import express from 'express';
import {getActiveCartForUser} from '../services/cartService.ts';

// create  router for cart
const router = express.Router();

// define enddpoint for get active cart for user
router.get('/',async (req ,res  ) => {
    //To DO : get the userId from the jwt, after vailditing from middleware.
    //get active cart for user
    const cart = await getActiveCartForUser({ userId: "64a7f0f2c2a3f5b6d8e4c123" });
    res.status(200).send(cart);
})





export default router;