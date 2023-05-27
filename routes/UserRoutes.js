import express from "express";
import { login, register } from "../controllers/UserControllers.js";
import { addProduct } from "../controllers/ProductControllers.js";

var router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/add-product', addProduct)

export default router;