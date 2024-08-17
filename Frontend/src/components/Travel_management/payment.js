import React, { useState } from 'react';
import { Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const Payment = ({ paymentVisible, handleTogglePayment, cart, handleStockUpdate }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      setError('Please fill out all fields');
      return;
    }

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Send request to create item reservations
      await axios.post('http://localhost:5000/api/itemreservation/add', { cart });

      // Send request to update the stock in the backend
      await axios.put('http://localhost:5000/api/travelitem/order', { cart });

      // Call the function to update the stock in the frontend
      handleStockUpdate();

      // Close the payment dialog on successful payment
      handleTogglePayment();
    } catch (err) {
      console.error("Payment failed:", err.response ? err.response.data : err.message);
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <Dialog open={paymentVisible} onClose={handleTogglePayment}>
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Payment Details</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Card Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <TextField
          label="Expiry Date (MM/YY)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <TextField
          label="CVV"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '1rem' }}>
          Pay
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleTogglePayment} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Payment;
