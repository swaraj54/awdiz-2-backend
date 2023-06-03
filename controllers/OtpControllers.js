import { v4 as uuidv4 } from 'uuid';
import Users from '../modals/Users.js';

export const otpRegisteration = async (req, res) => {
    try {
        const { number, email } = req.body;
        if (!number) return res.send("Number is required !");
        if (!email) return res.send("Email is required !");

        var code = uuidv4();
        // console.log(code,"random code here")

        const isNumberPresent = await Users.find({ number }).exec();
        if (isNumberPresent.length) return res.send("Number already used!")

        const isEmailPresent = await Users.find({ email }).exec();
        if (isEmailPresent.length) return res.send("Email already used!")

        const user = new Users({
            email: email,
            number: number,
            otp: code
        })
        await user.save();
        res.send("Check your mobile number and gmail for otp!")

    } catch (error) {
        return res.send(error)
    }
}


export const otpCheckForRegister = async (req, res) => {
    try {
        const { number, email, otp } = req.body;
        if (!number) return res.send("Number is required!")
        if (!email) return res.send("Email is required")
        if (!otp) return res.send("Otp is required!")

        const user = await Users.find({ email }).exec();

        if (!user.length) return res.send("User not found!");

        if (user[0].otp == otp) {
            return res.send("Registration Done!");
        }
        return res.send("Otp is wrong!");

    } catch (error) {
        return res.send(error);
    }
}


export const otpLogin = async (req, res) => {
    try {
        const { email, number } = req.body;
        if (!email) return res.send("Email is required!")
        if (!number) return res.send("Number is required!")

        const user = await Users.find({ email, number }).exec();
        if (!user) return res.send("User is not found!");
        console.log(user, "user")
        const userId = user[0]?._id;
        const code = uuidv4();
        // crate another code
        const updateUser = await Users.findByIdAndUpdate({ _id: userId }, { loginOtp: code }).exec(); // update the 2 scheamas

        res.send("Check you email or number for otp.");

    } catch (error) {
        res.send(error)
    }
}


export const otpCheckLogin = async (req, res) => {
    try {
        const { otp, number, email } = req.body;
        if (!otp) return res.send("Otp not found!")
        if (!number) return res.send("Number not found!")
        if (!email) return res.send("Email not found!")

        const user = await Users.find({ number, email }).exec();

        if (user[0].loginOtp == otp) {
            return res.send("Login Successful.")
        }
        return res.send('Otp is wrong!');
    } catch (error) {
        return res.send(error)
    }
}