const ItemReservation = require('../../models/travel_item/itemReservation');
const Item = require('../../models/travel_item/item');


const { sendRestockAlert } = require('../../utils/emailstock');

// Get all item reservations with item details
exports.getItemReservations = async (req, res) => {
  try {
    const reservations = await ItemReservation.find()
      .populate('itemId', 'itemName description price category status');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item reservations', error: error.message });
  }
};

exports.addItemReservation = async (req, res) => {
  const cart = req.body.cart;
  try {
    for (const item of cart) {
      const { _id: itemId, quantity, userId } = item;

      const itemDoc = await Item.findById(itemId);
      if (!itemDoc) {
        return res.status(404).json({ message: `Item not found: ${itemId}` });
      }

      if (itemDoc.stockAmount < quantity) {
        return res.status(400).json({ message: `Insufficient stock for item: ${itemId}` });
      }

      const reservation = new ItemReservation({
        itemId,
        userId,
        quantity,
        status: 'in-stock',
      });

      await reservation.save();

      itemDoc.stockAmount -= quantity;
      await itemDoc.save();

      if (itemDoc.stockAmount < 5) {
        const itemNames = itemDoc.itemName;
        await sendRestockAlert(itemNames); // Call the email function
      }
    }

    res.status(201).json({ message: 'Reservations created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item reservations', error: error.message });
  }
};


// Update an item reservation
exports.updateItemReservation = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const reservation = await ItemReservation.findById(id)
      .populate('itemId', 'itemName description price category status');

    if (reservation) {
      if (status) {
        reservation.status = status;
      }

      const updatedReservation = await reservation.save();
      res.json(updatedReservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation', error: error.message });
  }
};

// Delete an item reservation
exports.deleteItemReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await ItemReservation.findById(id);

    if (reservation) {
      // Restore the stock amount upon deletion
      const item = await Item.findById(reservation.itemId);
      if (item) {
        item.stockAmount += reservation.quantity;
        await item.save();
      }

      await ItemReservation.deleteOne({ _id: id });
      res.json({ message: 'Reservation removed' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation', error: error.message });
  }
};

// Get reservations by user
exports.getItemReservationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const reservations = await ItemReservation.find({ userId })
      .populate('itemId', 'itemName description price category status');

    if (reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this user' });
    }

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};
