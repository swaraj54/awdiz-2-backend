import mongoose from "mongoose";
import { Schema } from "mongoose";


const product = new Schema({
    name: String,
    price: Number,
    category: String,
    image: [String]
});


export default product;