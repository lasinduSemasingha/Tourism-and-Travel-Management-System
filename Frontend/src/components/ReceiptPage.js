import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import axios from 'axios';

const ReceiptPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await axios.get(`/api/bookings/${id}`);
      setBooking(response.data);
    };
    fetchBooking();
  }, [id]);

  if (!booking) return <div>Loading...</div>;

  return (
    <div>
      <Typography>Booking ID: {booking._id}</Typography>
      <Typography>Departure: {booking.ticketId.departure}</Typography>
      <Typography>Arrival: {booking.ticketId.arrival}</Typography>
      <Typography>Date: {new Date(booking.ticketId.travelDate).toLocaleDateString()}</Typography>
      <Typography>Number of Passengers: {booking.numOfPassengers}</Typography>
      <Typography>Total Amount: ${booking.totalAmount}</Typography>
    </div>
  );
};

export default ReceiptPage;
