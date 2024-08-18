const Item = require('../../models/travel_item/item'); // Adjust the path as necessary
const path = require('path');
const fs = require('fs');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

// Add a new item with image upload
exports.addItem = async (req, res) => {
  const { itemName, description, price, stockAmount, category, status } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path; // Save the path to the uploaded image
  }

  try {
    const item = new Item({
      itemName,
      description,
      price,
      stockAmount,
      category,
      status,
      image: imagePath ? { data: fs.readFileSync(imagePath), contentType: req.file.mimetype } : null
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);

    // Optionally, delete the file after saving to the database if needed
    if (imagePath) fs.unlinkSync(imagePath);

  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error: error.message });
  }
};

// Update item details, including image
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { itemName, description, price, stockAmount, category, status } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path; // Save the path to the uploaded image
  }

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.itemName = itemName || item.itemName;
    item.description = description || item.description;
    item.price = price || item.price;
    item.stockAmount = stockAmount !== undefined ? stockAmount : item.stockAmount;
    item.category = category || item.category;
    item.status = status || item.status;
    if (imagePath) {
      item.image = { data: fs.readFileSync(imagePath), contentType: req.file.mimetype };
    }

    const updatedItem = await item.save();

    // Optionally, delete the file after saving to the database if needed
    if (imagePath) fs.unlinkSync(imagePath);

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Item.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

// Get image for a specific item
exports.getItemImage = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);
    if (!item || !item.image) {
      return res.status(404).json({ message: 'Item or image not found' });
    }

    const base64Image = item.image.data.toString('base64');
    const imgSrc = `data:${item.image.contentType};base64,${base64Image}`;
    res.json({ imgSrc });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item image', error: error.message });
  }
};


// controllers/travel_item/travelItemController.js
exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
};

// Update stock for items in the cart
exports.updateStockForCart = async (req, res) => {
  const { cart } = req.body;

  try {
    // Update stock for each item in the cart
    await Promise.all(cart.map(async (item) => {
      const existingItem = await Item.findById(item._id);
      if (existingItem) {
        existingItem.stockAmount -= item.quantity; // Decrease stock amount
        if (existingItem.stockAmount <= 0) {
          existingItem.status = 'out-of-stock'; // Update status if stock is zero or less
        }
        await existingItem.save();
      }
    }));

    res.status(200).json({ message: 'Stock updated successfully' });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ message: 'Failed to update stock' });
  }
};