import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Card, CardContent, Alert } from '@mui/material';
import axios from 'axios';

const TicketForm = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/tickets', {
        departure,
        arrival,
        travelDate,
        availableSeats,
        price,
      });
      setSuccess('Ticket added successfully!');
      setError(null);
      // Clear the form
      setDeparture('');
      setArrival('');
      setTravelDate('');
      setAvailableSeats('');
      setPrice('');
    } catch (err) {
      setError('Error adding ticket');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add a New Ticket
          </Typography>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Arrival"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Travel Date"
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Available Seats"
              type="number"
              value={availableSeats}
              onChange={(e) => setAvailableSeats(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Add Ticket
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TicketForm;
