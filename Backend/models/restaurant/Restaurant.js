const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    cuisine: { type: String, required: true },
    priceRange: { type: String, required: true },
    description: { type: String },
    menu: [
        {
            item: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
