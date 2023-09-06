import Users from "../modals/Users.js";
import jwt from 'jsonwebtoken';
import ProductSchema from '../modals/Products.js';


export const login = async (req, res) => {
    try {
        const { email: userEmail, password: userPassword } = req.body.userData;
        if (!userEmail) return res.status(404).json({ success: false, message: "User Email is required!" });
        if (!userPassword) return res.status(404).json({ success: false, message: "User Password is required!" });
        const response = await Users.find({ email: userEmail }).exec();
        // console.log(response)
        if (response.length) {
            if (userPassword === response[0].password) {
                const userObject = { name: response[0].name, picture: response[0].picture, email: response[0].email, userId: response[0]._id, role: response[0].role }
                const token = jwt.sign({ userId: response[0]._id }, process.env.JWT_SECRET)
                return res.status(200).json({ success: true, message: "Login Successfull.", user: userObject, token: token })
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
        const { name, email, password, confirmPassword, role } = req.body.userData;
        if (!name) return res.status(404).json({ success: false, message: "User name is requierd!" });
        if (!email) return res.status(404).json({ success: false, message: "User email is required!" })
        if (!password) return res.status(404).json({ success: false, message: "User Password is required!" })
        if (!confirmPassword) return res.status(404).json({ success: false, message: "User Confirm Password is required!" })
        if (!role) return res.status(404).json({ success: false, message: "Role is required!" })
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
            password: password,
            role
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


export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is required." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedData) return res.status(404).json({ success: false, message: "Token is not valid." })

        const userId = decodedData.userId;

        const user = await Users.findById(userId);
        if (user) {
            const userObject = { name: user.name, picture: user.picture, email: user.email, userId: user._id, role: user.role }
            return res.status(200).json({ success: true, user: userObject })
        }
        return res.status(404).json({ success: false, message: "User not found." })


    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const addCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        if (!productId) return res.status(404).json({ success: false, message: "Product Id is required." })
        if (!userId) return res.status(404).json({ success: false, message: "User Id is required." })

        const user = await Users.findByIdAndUpdate(userId, { $push: { cartProduct: productId } }, { new: true });
        // console.log(user, "user")
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." })
        }
        return res.status(200).json({ success: true, message: "Product added successfully to cart." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(404).json({ success: false, message: "User Id is required." })

        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found." })

        const cartProducts = user?.cartProduct;
        const finalArray = [];
        var totalPrice = 0;
        for (var i = 0; i < cartProducts.length; i++) {
            const product = await ProductSchema.findById(cartProducts[i])
            totalPrice = totalPrice + product?.price
            finalArray.push(product)
        }
        return res.status(200).json({ success: true, cartProducts: finalArray, totalPrice: totalPrice })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}