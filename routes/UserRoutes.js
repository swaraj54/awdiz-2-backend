import express from "express";
import { getCurrentUser, getUserByEmail, login, register, updateUser } from "../controllers/UserControllers.js";
import { addProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/ProductControllers.js";
import { checkEmail } from "../middlewares/authMiddleware.js";
import { otpCheckForRegister, otpCheckLogin, otpLogin, otpRegisteration } from "../controllers/OtpControllers.js";
import buyerRoutes from './BuyerRoutes.js';
import sellerRouter from './SellerRoutes.js';


var router = express.Router();

router.use((req, res, next) => {
    console.log("INside router level middleware")
    if (true) {
        next();
    } else {
        return res.send("Returing from router middleware")
    }
})



router.use('/seller', sellerRouter)
router.use('/buyer', buyerRoutes)

router.get('/ping', (req, res) => {
    return res.send("Pong")
})
router.post('/update-product', updateProduct)
router.post('/login', login);
router.post('/register', register);
router.post('/add-product', addProduct);
router.get('/get-all-products', getAllProducts);
router.post('/get-single-product', getSingleProduct);
router.post('/get-user-by-email', checkEmail, getUserByEmail);
router.post('/update-user', checkEmail, updateUser);
router.post('/otp-register', otpRegisteration)
router.post('/otp-check-register', otpCheckForRegister)
router.post('/otp-login', otpLogin)
router.post('/otp-check-login', otpCheckLogin)
router.post('/get-current-user', getCurrentUser)


export default router;