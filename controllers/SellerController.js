import Products from "../modals/Products.js";

export const addProduct = async (req, res) => {
    try {
        const { productData, userId } = req.body;
        const { name, price, image } = productData;
        if (!name || !price || !image || !userId) {
            return res.status(404).json({ success: false, message: "All fields are mandtroy.." })
        }
        const product = new Products({ name, price, image, sellerId: userId })
        await product.save();
        return res.status(201).json({ success: true, message: "Product successfully added." })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}
export const sellerProducts = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(404).json({ success: false, message: "All fields are mandtroy.." })
        }
        const products = await Products.find({ sellerId: userId })
        return res.status(201).json({ success: true, message: "Product fetched successfully.", products: products })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}