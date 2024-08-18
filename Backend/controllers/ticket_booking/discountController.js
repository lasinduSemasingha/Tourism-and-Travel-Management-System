const DiscountCode = require('../../models/ticket_booking/Discount');

// Create a new discount code
exports.createDiscountCode = async (req, res) => {
  const { code, percentage } = req.body;
  try {
    // Check if the code already exists
    const existingCode = await DiscountCode.findOne({ code });
    if (existingCode) {
      return res.status(400).json({ message: 'Discount code already exists' });
    }

    const discountCode = new DiscountCode({ code, percentage });
    await discountCode.save();
    res.status(201).json(discountCode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all discount codes
exports.getDiscountCodes = async (req, res) => {
  try {
    const discountCodes = await DiscountCode.find();
    res.status(200).json(discountCodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a discount code by its code
exports.getDiscountCodeByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const discountCode = await DiscountCode.findOne({ code });
    if (!discountCode) {
      return res.status(404).json({ message: 'Discount code not found' });
    }
    res.status(200).json(discountCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
