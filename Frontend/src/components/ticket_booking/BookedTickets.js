import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';

const BookedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookedTickets = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/bookedTickets', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        setTickets(response.data);
      } catch (err) {
        setError('Error fetching booked tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchBookedTickets();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Booked Tickets
      </Typography>
      <Grid container spacing={3}>
        {tickets.map(ticket => (
          <Grid item xs={12} sm={6} md={4} key={ticket._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Departure: {ticket.departure}</Typography>
                <Typography>Arrival: {ticket.arrival}</Typography>
                <Typography>Date: {new Date(ticket.travelDate).toLocaleDateString()}</Typography>
                <Typography>Price: ${ticket.price}</Typography>
                <Typography>Booking Date: {new Date(ticket.bookingDate).toLocaleDateString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookedTickets;
