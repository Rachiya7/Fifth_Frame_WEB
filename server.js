const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');  // Import user routes
require('dotenv').config();

const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', userRoutes);  // All routes related to users

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
