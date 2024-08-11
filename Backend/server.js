const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//importing auth routes for the user authentication when loggin
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
//importing ticket routing
const ticketRoutes = require('./routes/ticketRoutes');
//importing booking routing
const bookingRoutes = require('./routes/bookingRoutes');
//importing feedback routing
const feedbackRoutes = require('./routes/feedbackRoutes');
//importing discount routing
const discountRoutes = require('./routes/discountRoutes');

const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());  // Enable CORS
app.use(morgan('dev'));  // Log HTTP requests
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/discounts', discountRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Environment Variables & Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
