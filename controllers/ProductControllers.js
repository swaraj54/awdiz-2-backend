import Products from "../modals/Products.js";

export const addProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { Name, Price, Image } = req.body;
        if (!Name) return res.send("Name is required!");
        if (!Price) return res.send("Price is requierd!");
        const product = new Products({
            name: Name,
            price: Price,
            Image: Image
        })
        console.log(product, "check here")
        await product.save();
        return res.send(product);
    } catch (error) {
        return res.send(error);
    }
}


export const getAllProducts = async (req, res) => {
    try {
        const resposne = await Products.find({}).exec();
        if (resposne) {
            return res.send(resposne);
        } else {
            return res.send("No Products Found!");
        }
    } catch (error) {
        return res.send(error);
    }
}