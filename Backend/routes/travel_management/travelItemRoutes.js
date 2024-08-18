const express = require('express');
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  getItemById,
  getItemImage,
  updateStockForCart,
} = require('../../controllers/travel_item/travelItemController');
const upload = require('../../middlewares/upload'); // Adjust the path as needed

const router = express.Router();

// Fetch all items
router.get('/', getItems);

// Add a new item with image upload
router.post('/add', upload.single('image'), addItem);

// Update item details, including image
router.put('/update/:id', upload.single('image'), updateItem);

// Get an item by ID
router.get('/:id', getItemById);

// Delete an item by ID
router.delete('/:id', deleteItem);

// Get an item's image by ID
router.get('/image/:id', getItemImage);



router.put('/order', updateStockForCart);

module.exports = router;
