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
            return res.status(200).json({ success: true, products: resposne });
        } else {
            return res.status(404).json({ success: false, message: "No Products Found!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) throw new Error("Product id not found..")

        const product = await Products.findById(productId);
        if (product) {
            return res.status(200).json({ success: true, message: "Product found.", product: product })
        }
        throw new Error("No product found.")

    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}