const express = require('express');
const { registerUser, authUser } = require('../../controllers/user_management/authController');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', authUser);


module.exports = router;

