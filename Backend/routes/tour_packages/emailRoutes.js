// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../../controllers/tour_package/emailController');

router.post('/send', emailController.sendPromotionEmail);

module.exports = router;
