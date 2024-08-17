const express = require('express');
const router = express.Router();
const discountCodeController = require('../../controllers/ticket_booking/discountController');

// Route to create a new discount code
router.post('/', discountCodeController.createDiscountCode);

// Route to get all discount codes
router.get('/', discountCodeController.getDiscountCodes);

// Route to get the discount by code
router.get('/:code', discountCodeController.getDiscountCodeByCode);

module.exports = router;
