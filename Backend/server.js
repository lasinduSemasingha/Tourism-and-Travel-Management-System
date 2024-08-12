const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/user_managemnt/authRoutes');
const userRoutes = require('./routes/user_managemnt/userRoutes');
const adminRoutes = require('./routes/user_managemnt/adminRoutes');
const destinationRoutes = require('./routes/travel_destination/destinationRoutes');
const reservationRoutes = require('./routes/travel_destination/reservationRoutes');
//importing ticket routing
const ticketRoutes = require('./routes/ticket_booking/ticketRoutes');
//importing booking routing
const bookingRoutes = require('./routes/ticket_booking/bookingRoutes');
//importing feedback routing
const feedbackRoutes = require('./routes/ticket_booking/feedbackRoutes');
//importing discount routing
const discountRoutes = require('./routes/ticket_booking/discountRoutes');
const packageRoutes = require('./routes/tour_packages/packages');

//restaurant management
const restaurantRoutes = require('./routes/restaurants/restaurants');
const rest_reservations = require('./routes/restaurants/reservations');
const rest_feedback = require('./routes/restaurants/feedback');

const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());


app.use(cors()); 


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/reservations', reservationRoutes);

app.use('/api/tickets', ticketRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/discounts', discountRoutes);

app.use('/api/packages', packageRoutes);

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reservations', rest_reservations);
app.use('/api/feedback', rest_feedback);


// Environment Variables & Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
