import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchemaCart = new Schema({
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
            shortTitle: String,
            longTitle: String,
        },
        required: true,
    },
    price: {
        type: {
            mrp: Number,
            cost: Number,
            discount: String,
        },
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    discount: {
        type: String,
    },
    tagline: {
        type: String,
    },
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userCart: [
        {
            product: productSchemaCart,
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});

userSchema.methods.clearUserCart = async function () {
    this.userCart = []; // Clear the userCart array
    await this.save(); // Save the updated user document
};

const User = mongoose.model('User', userSchema);

export default User;
