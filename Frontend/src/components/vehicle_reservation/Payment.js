import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const { vehicleType, rentalPrice } = location.state;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState(null);

  const handlePayment = () => {
    // Perform validation
    if (!cardNumber || !expiryDate || !cvv) {
      setError('All fields are required');
      return;
    }
    // Additional validations like regex for card number, expiry date format, etc.
    // Submit payment (to be implemented)
    console.log('Payment successful');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h5">Payment</Typography>
      <Typography variant="body1">Vehicle Type: {vehicleType}</Typography>
      <Typography variant="body1">Amount to Pay: ${rentalPrice}</Typography>

      <TextField
        label="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Expiry Date (MM/YY)"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handlePayment}>
        Pay
      </Button>
    </div>
  );
};

export default Payment;
