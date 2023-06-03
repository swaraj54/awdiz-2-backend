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