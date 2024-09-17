const express = require('express');
const router = express.Router();
const { signup, login, getUserProfile,getAllUsers,getAllMessages, sendMessage} = require('../controllers/userController');

const protect = require('../Middlewares/user.auth')
// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

router.get('/profile',protect, getUserProfile);

router.get('/getAll', getAllUsers);



// Route to get all messages
router.get('/messages', getAllMessages);

router.post('/add/message',sendMessage);
module.exports = router;
