import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../css/homepage.css'; // Ensure this file exists and is used for custom styles

const TicketFilter = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (departure) queryParams.append('departure', departure);
    if (arrival) queryParams.append('arrival', arrival);
    if (travelDate) queryParams.append('date', travelDate);
    if (passengers) queryParams.append('passengers', passengers);

    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Box 
        sx={{ 
          padding: '2rem', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
          backgroundColor: '#fff' 
        }}
      >
        <Typography variant="h5" gutterBottom>
          Find Your Tickets
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Arrival"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Number of Passengers"
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TicketFilter;
