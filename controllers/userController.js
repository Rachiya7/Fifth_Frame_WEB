const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Message = require('../models/messageModel'); // Adjust path as necessary
// Function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
    });
};

// @desc Register a new user
// @route POST /api/users/signup
// @access Public
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create({
            username,
            email,
            password, // This will be hashed automatically by the 'pre-save' hook in the model
        });

        if (user) {
            // Respond with the user data and a JWT token
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc Authenticate user and get a token (Login)
// @route POST /api/users/login
// @access Public
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Generate JWT token directly in the controller
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            // Respond with the user data and the token
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: token,  // Return the token
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc Get logged-in user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
    try {
        // req.user is set by the middleware
        const user = req.user;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);  // Return all users as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



const sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        
        res.status(200).send({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Failed to send message.' });
    }
};

const getAllMessages = async (req, res) => {
    try {
        // Fetch all messages from the database
        const messages = await Message.find();
        
        // Send a successful response with the messages
        res.status(200).send({ success: true, messages });
    } catch (error) {
        // Handle any errors that occur during the fetching
        res.status(500).send({ success: false, message: 'Failed to retrieve messages.' });
    }
};


module.exports = { signup, login, getUserProfile, getAllUsers, getAllMessages, sendMessage };
