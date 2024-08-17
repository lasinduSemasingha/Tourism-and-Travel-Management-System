const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/user_managemnt/authRoutes');
const userRoutes = require('./routes/user_managemnt/userRoutes');
const adminRoutes = require('./routes/user_managemnt/adminRoutes');
const hotelOwnerRoutes = require('./routes/user_managemnt/hotelOwnerRoutes');
const destinationRoutes = require('./routes/travel_destination/destinationRoutes');
const reservationRoutes = require('./routes/travel_destination/reservationRoutes');

// Importing ticket routing
const ticketRoutes = require('./routes/ticket_booking/ticketRoutes');
// Importing booking routing
const bookingRoutes = require('./routes/ticket_booking/bookingRoutes');
// Importing feedback routing
const feedbackRoutes = require('./routes/ticket_booking/feedbackRoutes');
// Importing discount routing
const discountRoutes = require('./routes/ticket_booking/discountRoutes');
const packageRoutes = require('./routes/tour_packages/packages');
const emailRoutes = require('./routes/tour_packages/emailRoutes');


// Importing special activity routing
const specialActivityRoutes = require('./routes/special_activity/activities');
const specialActivityBooking = require('./routes/special_activity/booking')

// Restaurant management
const restaurantRoutes = require('./routes/restaurants/restaurants');
const rest_reservations = require('./routes/restaurants/reservations');
const rest_feedback = require('./routes/restaurants/feedback');

const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const vehicleRoutes = require('./routes/vehicle_reservation/vehicleRoutes');
const vehicleReservationRoutes = require('./routes/vehicle_reservation/vehicleReservationRoutes');

const hotelRoutes = require('./routes/hotel_management/hotelRoutes');
const hotelReservationRoutes = require('./routes/hotel_management/hotelReservationRoutes');

const travelItemRoutes = require('./routes/travel_management/travelItemRoutes');
const itemReservationRoutes = require('./routes/travel_management/ItemReservationRoutes');

const reportRoutes = require('./routes/user_managemnt/reportRoutes')




// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to handle large payloads
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hotelOwner', hotelOwnerRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/reservations', reservationRoutes);

app.use('/api/tickets', ticketRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/discounts', discountRoutes);

app.use('/api/packages', packageRoutes);

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/vehiclereservations', vehicleReservationRoutes);

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/restaurant-reservations', rest_reservations);
app.use('/api/feedback', rest_feedback);
app.use('/api/activities', specialActivityRoutes)
app.use('/api/special/', specialActivityBooking)

app.use('/api/hotels', hotelRoutes);
app.use('/api/hotelreservations', hotelReservationRoutes);
app.use('/api/discount-codes', discountRoutes)

// Use routes
app.use('/api/email', emailRoutes);

app.use('/api/travelitem', travelItemRoutes);
app.use('/api/travelitemreservation', itemReservationRoutes);


app.use('/uploads', express.static('uploads'));

app.use('report', reportRoutes)

// Environment Variables & Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
