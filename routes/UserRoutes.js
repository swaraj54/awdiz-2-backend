import express from "express";
import { getUserByEmail, login, register } from "../controllers/UserControllers.js";
import { addProduct, getAllProducts } from "../controllers/ProductControllers.js";

var router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/add-product', addProduct);
router.get('/get-all-products', getAllProducts);
router.post('/get-user-by-email', getUserByEmail)

export default router;