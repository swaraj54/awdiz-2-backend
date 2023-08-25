import Users from "../modals/Users.js";


export const login = async (req, res) => {
    try {
        const { email: userEmail, password: userPassword } = req.body.userData;
        if (!userEmail) return res.status(404).json({ success: false, message: "User Email is required!" });
        if (!userPassword) return res.status(404).json({ success: false, message: "User Password is required!" });
        const response = await Users.find({ email: userEmail }).exec();
        // console.log(response)
        if (response.length) {
            if (userPassword === response[0].password) {
                return res.status(200).json({ success: true, message: "Login Successfull." })
            } else {
                return res.status(404).json({ success: false, message: "Wrong password." })
            }
        } else {
            return res.status(404).json({ success: false, message: "User not found check your Email.." })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body.userData;
        if (!name) return res.status(404).json({ success: false, message: "User name is requierd!" });
        if (!email) return res.status(404).json({ success: false, message: "User email is required!" })
        if (!password) return res.status(404).json({ success: false, message: "User Password is required!" })
        if (!confirmPassword) return res.status(404).json({ success: false, message: "User Confirm Password is required!" })
        if (confirmPassword.length <= 8) {
            return res.status(404).json({ success: false, message: "User Password length is less than 8 !" })
        }
        if (password.length <= 8) {
            return res.status(404).json({ success: false, message: "User Confirm Password length is less than 8 !" })
        }
        if (password != confirmPassword) {
            return res.status(404).json({ success: false, message: "Password and Confirm Password Not matched!!" })
        }
        const response = await Users.find({ email: email }).exec();
        // console.log(response,"response")
        if (response.length) {
            return res.status(404).json({ success: false, message: "Email is already Taken or You are already resgistered!!" })
        }
        const user = new Users({
            name,
            email,
            password: password
        });
        await user.save();
        return res.status(200).json({ success: true, message: "Resgistration Succesfull!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}


export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.send("Email not found!")
        const response = await Users.find({ email }).exec();
        if (response) {
            return res.send(response[0])
        } else {
            return res.send("User not found!")
        }
    } catch (error) {
        return res.send(error)
    }
}


export const updateUser = async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!name) return res.send("Name not found!")
        const response = await Users.findOneAndUpdate({ email }, { name }).exec();
        res.send(response);
    } catch (error) {
        res.send(error)
    }
}