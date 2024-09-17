require('dotenv').config();  // Load .env variables
const mongoose = require('mongoose');

// Get MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

console.log('MongoDB URI:', mongoURI);  // Debug to check the URI

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
