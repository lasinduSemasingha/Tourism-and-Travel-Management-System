const express = require('express');
const router = express.Router();
const User = require('../../models/user_managemnt/user');
const json2csv = require('json2csv').parse;
const { Response } = require('express');

// Route to generate a CSV report of all users
router.get('/report', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for report generation' });
    }

    const csv = json2csv(users.map(user => ({
      Name: user.name,
      Email: user.email,
      Address: user.address,
      Country: user.country,
      Gender: user.gender,
      Role: user.role
    })));

    res.header('Content-Type', 'text/csv');
    res.attachment('users_report.csv');
    res.send(csv);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ message: 'Error generating report' });
  }
});

module.exports = router;
