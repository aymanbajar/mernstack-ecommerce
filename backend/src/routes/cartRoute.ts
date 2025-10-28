import express from 'express';
import {getActiveCartForUser} from '../services/cartService.ts';
import { validateJWT } from '../middlewares/validateJWT.ts';
import {type ExtendRequest} from '../types/ExtendRequest.ts';

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





export default router;