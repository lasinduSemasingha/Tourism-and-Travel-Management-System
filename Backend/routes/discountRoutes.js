const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

//discount creating route
router.post('/apply', discountController.applyDiscount);

module.exports = router;
