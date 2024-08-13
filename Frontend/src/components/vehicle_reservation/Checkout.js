import React from 'react';
import { Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleId, vehicleType, rentalPrice } = location.state;

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { vehicleId, vehicleType, rentalPrice } });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h5">Checkout</Typography>
      <Typography variant="body1">Vehicle Type: {vehicleType}</Typography>
      <Typography variant="body1">Rental Price: ${rentalPrice}</Typography>
      <Button variant="contained" color="primary" onClick={handleProceedToPayment}>
        Proceed to Payment
      </Button>
    </div>
  );
};

export default Checkout;
