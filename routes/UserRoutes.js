import express from "express";
import { getUserByEmail, login, register, updateUser } from "../controllers/UserControllers.js";
import { addProduct, getAllProducts } from "../controllers/ProductControllers.js";
import { checkEmail } from "../middlewares/authMiddleware.js";
import { otpCheckForRegister, otpCheckLogin, otpLogin, otpRegisteration } from "../controllers/OtpControllers.js";

var router = express.Router();

router.use((req, res, next) => {
    console.log("INside router level middleware")
    if (true) {
        next();
    } else {
        return res.send("Returing from router middleware")
    }
})

router.get('/ping', (req, res) => {
    return res.send("Pong")
})

router.post('/login', login);
router.post('/register', register);
router.post('/add-product', checkEmail, addProduct);
router.get('/get-all-products', getAllProducts);
router.post('/get-user-by-email', checkEmail, getUserByEmail);
router.post('/update-user', checkEmail, updateUser);
router.post('/otp-register', otpRegisteration)
router.post('/otp-check-register', otpCheckForRegister)
router.post('/otp-login', otpLogin)
router.post('/otp-check-login', otpCheckLogin)

export default router;