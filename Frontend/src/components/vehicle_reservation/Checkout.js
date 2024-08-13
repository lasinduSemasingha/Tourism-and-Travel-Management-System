import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleId, vehicleType, rentalPrice } = location.state;

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { vehicleId, vehicleType, rentalPrice } });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <Card>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <ShoppingCartIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                Checkout
              </Typography>
            </Grid>
          </Grid>

          <Divider style={{ margin: '1rem 0' }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Vehicle Type:
              </Typography>
              <Typography variant="body1">{vehicleType}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Rental Price:
              </Typography>
              <Typography variant="body1">${rentalPrice}</Typography>
            </Grid>
          </Grid>

          <Divider style={{ margin: '1rem 0' }} />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleProceedToPayment}
            style={{ marginTop: '1rem' }}
          >
            Proceed to Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
