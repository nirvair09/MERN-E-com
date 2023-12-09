import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('mongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
