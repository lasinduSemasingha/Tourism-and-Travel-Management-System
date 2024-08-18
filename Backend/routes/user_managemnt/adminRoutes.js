const express = require('express');
const { registerAdmin, authAdmin, getAdminProfile, updateAdminProfile } = require('../../controllers/user_management/adminController');

const router = express.Router();

// Register new admin
router.post('/create', registerAdmin);

// Admin login
router.post('/login', authAdmin);

// Get admin profile by ID 
router.get('/:id', getAdminProfile);

// Update admin profile by ID 

router.put('/:id', updateAdminProfile);

module.exports = router;

