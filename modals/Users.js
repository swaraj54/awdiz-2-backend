import mongoose from "mongoose";
import { Schema } from "mongoose";


const User = new Schema({
    name: String,
    email: String,
    password: String,
    otp: String,
    number: Number,
    loginOtp: String,
    cartProduct: [String],
    role: {
        type: String,
        enum: ['buyer', 'seller', 'admin'],
        default: 'buyer'
    },
    isAdminVerified: {
        type: Boolean
    },
    otpForPhoneVerification: {
        type: String
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String
    }
    // 2 new shcema of number and emial with otp
});

export default mongoose.model("Users", User)