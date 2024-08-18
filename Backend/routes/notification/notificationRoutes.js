// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/notification/notificationController');

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getNotifications);
router.patch('/:id/read', notificationController.markAsRead);
router.patch('/:id/unread', notificationController.markAsUnread);
router.delete('/:id', notificationController.deleteNotification);
// Get a single notification by ID
router.get('/:id', notificationController.getNotificationById);

module.exports = router;
