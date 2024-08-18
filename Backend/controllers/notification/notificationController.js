// controllers/notificationController.js
const Notification = require('../../models/Notification/Notification');

exports.createNotification = async (req, res) => {
    const { title, message, foodName, description, ingredients, ratings } = req.body;
    const notification = new Notification({ title, message, foodName, description, ingredients, ratings });
    await notification.save();
    res.status(201).send(notification);
};

exports.getNotifications = async (req, res) => {
    const notifications = await Notification.find();
    res.send(notifications);
};

exports.markAsRead = async (req, res) => {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    res.send(notification);
};

exports.markAsUnread = async (req, res) => {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: false }, { new: true });
    res.send(notification);
};

exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete notification with ID: ${id}`);
  
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(`Invalid ID format: ${id}`);
            return res.status(400).json({ message: 'Invalid ID format' });
        }
  
        const result = await Notification.findByIdAndDelete(id);
  
        if (!result) {
            console.log(`Notification with ID: ${id} not found`);
            return res.status(404).json({ message: 'Notification not found' });
        }
  
        console.log(`Notification with ID: ${id} deleted successfully`);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      res.json(notification);
    } catch (error) {
      console.error('Error fetching notification:', error);
      res.status(500).json({ message: 'Error fetching notification' });
    }
  };