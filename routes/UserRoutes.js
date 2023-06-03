import express from "express";
import { getUserByEmail, login, register, updateUser } from "../controllers/UserControllers.js";
import { addProduct, getAllProducts } from "../controllers/ProductControllers.js";
import { checkEmail } from "../middlewares/authMiddleware.js";
import { otpCheckForRegister, otpRegisteration } from "../controllers/OtpControllers.js";

var router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/add-product', checkEmail, addProduct);
router.get('/get-all-products', getAllProducts);
router.post('/get-user-by-email', checkEmail, getUserByEmail);
router.post('/update-user', checkEmail, updateUser);
router.post('/otp-register', otpRegisteration)
router.post('/otp-check-register', otpCheckForRegister)

export default router;