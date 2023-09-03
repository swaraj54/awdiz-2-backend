import express from 'express';
import { addCart, getCartProducts } from '../controllers/UserControllers.js';

const router = express.Router();


router.post("/add-cart", addCart)
router.post('/get-cart-products', getCartProducts)



export default router;