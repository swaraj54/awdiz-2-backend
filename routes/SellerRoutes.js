import express from 'express';
import { addProduct, sellerProducts } from '../controllers/SellerController.js';

const router = express.Router();


router.post("/add-product", addProduct)
router.post("/seller-products", sellerProducts)



export default router;