import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: {
        type: String,
        required: true,
    },
    detailUrl: {
        type: String,
        required: true,
    },
    title: {
        type: {
            longTitle: String,
            // Add other properties as needed
        },
        required: true,
    },
    price: {
        type: {
            // Assuming price has properties like currency and amount
            currency: String,
            amount: Number,
        },
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
    },
    tagline: {
        type: String,
    },
    // Add other properties as needed
});

const Product = mongoose.model('Product', productSchema);

export default Product;
