import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const { booking } = state || {};

  if (!booking) {
    return <Typography variant="h6" color="error">No booking information available.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Booking Confirmation
      </Typography>
      <Typography variant="h6">Activity: {booking.activityName}</Typography>
      <Typography variant="body1">Date: {booking.date}</Typography>
      <Typography variant="body1">Location: {booking.location}</Typography>
      <Typography variant="body1">Price: ${booking.price}</Typography>
      <QRCode value={booking.qrCodeValue} />
      <Button variant="contained" color="primary">
        Download Confirmation
      </Button>
    </Container>
  );
};

export default BookingConfirmation;
