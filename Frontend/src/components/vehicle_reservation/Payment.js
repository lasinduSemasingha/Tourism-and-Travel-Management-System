import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const { vehicleType, rentalPrice } = location.state;
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateCardNumber = (number) => {
    return /^[0-9]{16}$/.test(number); // Basic check for 16 digit card numbers
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(date)) return false;
    const [month, year] = date.split('/').map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  const validateCvv = (cvv) => {
    return /^[0-9]{3}$/.test(cvv); // Restrict CVV to exactly 3 digits
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    // Remove non-digit characters and format as MM/YY
    const formattedValue = value
      .replace(/\D/g, '') // Remove all non-digit characters
      .replace(/^(\d{2})(\d{0,2})/, '$1/$2') // Add / after month
      .slice(0, 5); // Limit length to MM/YY
    setExpiryDate(formattedValue);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    // Allow only digits and limit to 3 characters
    const formattedValue = value
      .replace(/\D/g, '') // Remove all non-digit characters
      .slice(0, 3); // Limit length to 3 digits
    setCvv(formattedValue);
  };

  const handlePayment = () => {
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      setError('All fields are required');
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      setError('Invalid card number');
      return;
    }
    if (!validateExpiryDate(expiryDate)) {
      setError('Invalid or expired expiry date');
      return;
    }
    if (!validateCvv(cvv)) {
      setError('Invalid CVV');
      return;
    }

    setError(null);
    setTimeout(() => {
      setSuccessMessage('Payment successful! Vehicle reserved.');
      setTimeout(() => {
        navigate('/addedvehiclereservations');
      }, 2000); // Redirect after 2 seconds
    }, 1000); // Simulate payment processing time
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <Card>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CreditCardIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                Payment Details
              </Typography>
            </Grid>
          </Grid>

          <Divider style={{ margin: '1rem 0' }} />

          <Typography variant="body1" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            Vehicle Type: {vehicleType}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            Amount to Pay: ${rentalPrice}
          </Typography>

          <TextField
            label="Cardholder Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 16 }} // Limit input length
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 5 }} // Limit input length
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                value={cvv}
                onChange={handleCvvChange}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 3 }} // Limit input length
              />
            </Grid>
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
          {successMessage && <Typography color="primary" style={{ marginTop: '1rem' }}>{successMessage}</Typography>}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePayment}
            style={{ marginTop: '1rem' }}
          >
            Pay
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payment;
