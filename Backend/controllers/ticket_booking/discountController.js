const Discount = require('../../models/ticket_booking/Discount');

exports.applyDiscount = async (req, res) => {
  const { code } = req.body;
  try {
    const discount = await Discount.findOne({ code });
    if (!discount) return res.status(404).json({ error: 'Invalid discount code' });
    res.status(200).json(discount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
