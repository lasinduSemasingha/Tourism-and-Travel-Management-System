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

  const handlePayment = () => {
    // Perform validation
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      setError('All fields are required');
      return;
    }
    // Additional validations like regex for card number, expiry date format, etc.
    
    // If validation passes, simulate payment processing and redirect
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
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                fullWidth
                margin="normal"
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
