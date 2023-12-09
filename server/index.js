import express from 'express';
import cors from 'cors';
import connectDB from './dataBase/databaseConnection.js';
import User from './src/model/userSchema.js';
import Product from './src/model/productSchema.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import stripe from 'stripe';
import bcrypt from 'bcrypt';
import 'dotenv/config';


connectDB();


const app = express();
const port = process.env.PORT || 8000

const stripeInstance = stripe(process.env.SECRET_KEY_STRIPE);


const router = express.Router();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

app.listen(port, () => {
    console.log(`server is listening at ${port}`);
});

app.post("/signUp", async (req, res) => {
    try {
        // Extracting username, email, and password from the request body
        const { username, email, password } = req.body;

        // Hashing the password using bcrypt with a cost factor of 16
        const hashedPassword = await bcrypt.hash(password, 16);

        // Creating a new User instance with the hashed password
        const newUser = new User({ username, email, password: hashedPassword });

        // Saving the new user to the database
        await newUser.save();

        // Sending a 201 (Created) response with the newly created user object
        res.status(201).send(newUser);
    } catch (error) {
        // Handling errors that may occur during the signup process
        console.error('Error during signup:', error);

        // Sending a 400 (Bad Request) response with the error details
        res.status(400).send(error);
    }
});

// router.post('/signUp', authController.signUp);

// app.post('/signUp', )

// router.post('/signup', authController.signup);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {

            const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);

            // Send the token to the client
            res.cookie('token', token, { httpOnly: true });

            return res.json({ message: 'Login successful', user, token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});


app.post('/add-to-cart', async (req, res) => {
    const { userId, productDetail, quantity } = req.body;
    // console.log(userId, productDetail, quantity);

    try {
        const userNow = await User.findById(userId);

        if (!userNow) {
            return res.status(404).json({ error: 'User not found' });
        }
        // const existingProductIndex = userNow.userCart.findIndex(
        //     (product) => product.product._id === productDetail._id
        // );
        // console.log(product.product._id)

        // if (existingProductIndex !== -1) {
        //     userNow.userCart[product.product._id].quantity += 1;
        // }
        // else {

        // }
        userNow.userCart.push({
            product: productDetail,
            quantity: quantity,
        });


        await userNow.save();

        res.status(200).json({ success: true, message: 'Product added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/remove-from-cart', async (req, res) => {

    const token = req.cookies.token;

    try {
        const { productId } = req.body;

        console.log(productId);

        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        console.log(product);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!user.userCart || !Array.isArray(user.userCart)) {
            return res.status(404).json({ message: 'User cart not found or is not an array' });
        }

        // console.log('user.userCart:', user.userCart);
        const itemIndex = user.userCart.findIndex(item => {
            console.log('item:', item);
            return item.product && item.product._id.equals(productId);
        });
        // console.log('itemIndex:', itemIndex);


        if (itemIndex !== -1) {
            // Remove the item from the cart array
            user.userCart.splice(itemIndex, 1);
        } else {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        // Save the updated user document
        await user.save();

        return res.json({ message: 'Product removed from cart successfully', user });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Define a route for retrieving the user's cart information
app.get('/user-cart', async (req, res) => {
    // Extract the token from the request cookies
    const token = req.cookies.token;

    try {
        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        // Find the user based on the user ID from the decoded token
        const user = await User.findById(decodedToken.userId);

        // If the user is not found, return a 404 response with an error message
        if (!user) {
            return res.status(404).json({ message: 'User not found, Please Login First' });
        } else {
            // If the user is found, return the user's cart information
            return res.json(user.userCart);
        }
    } catch (error) {
        // Handle any errors that occur during token verification or user retrieval
        console.error("Error:", error.message);

        // Return a 500 response with a generic error message
        return res.status(500).json({ message: "Server Error" });
    }
});

app.get('/fetch-user-details', async (req, res) => {
    // Check for the presence of the JWT token in the cookie
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: User not logged in' });
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        // Fetch user details based on the decoded token
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/getproducts', async (req, res) => {
    try {
        const products = await Product.find();
        // console.log('Sending products:', products);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/process-payment', async (req, res) => {
    const { amount, cartProduct } = req.body;

    try {
        // Log each product before creating the checkout session
        // cartProduct.forEach((product) => {
        //     console.log('Product:', product);
        //     console.log('Productprice:', product.product.price);
        // });

        // Create a checkout session
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartProduct.map((product) => {


                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product.product.title?.longTitle || 'Product Name',
                        },
                        unit_amount: product.product.price.mrp,
                    },
                    quantity: 1,
                };
            }),
            mode: 'payment',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/clear-cart', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: User not logged in' });
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        // Fetch user details based on the decoded token
        const user = await User.findById(decodedToken.userId);

        console.log(user);

        if (user) {
            await user.clearUserCart(); // Use the clearUserCart method to clear the userCart
            res.status(204).send(); // Respond with a 204 status for success
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});




// const YOUR_DOMAIN = 'http://localhost:3000';

// app.post('/process-payment', async (req, res) => {
//     const { amount, cartProduct } = req.body;

//     // const token = req.cookies.token;

//     try {

//         // const decodedToken = jwt.verify(token, 'your-secret-key');
//         // const userId = decodedToken.userId;

//         // Find the user based on the user ID from the decoded token
//         // const user = await User.findById(decodedToken.userId);
//         // Create a new order
//         // const order = new Order({
//         //     user: userId,
//         //     products: cartProduct.map((item) => ({
//         //         product: item.product._id,
//         //         quantity: item.quantity,
//         //     })),
//         //     totalAmount: amount,
//         // });
//         // await order.save();

//         // // Clear the user's cart (assuming `userCart` is a field in your User schema)
//         // await User.updateOne({ _id: userId })

//         // // Create a checkout session
//         const session = await stripeInstance.checkout.sessions.create({
//             payment_method_types: ['card'],

//             line_items: cartProduct.map((product) => ({
//                 console.log(product);
//                 price_data: {
//                     currency: 'inr',
//                     product_data: {
//                         name: product.name,

//                     },
//                     unit_amount: 10 * 100,
//                 },
//                 quantity: 1,
//             })),
//             mode: 'payment',
//             success_url: `${YOUR_DOMAIN}`,
//             cancel_url: `${YOUR_DOMAIN}`,
//         });

//         res.json({ id: session.id });
//     } catch (error) {
//         console.error('Error processing payment:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
