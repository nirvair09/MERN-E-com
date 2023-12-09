import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js'; // while importing file use .js very important


const authController = {
    signUp: async (req, res) => {
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
    },
    login: async (req, res) => {
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
    },


}

export default authController;