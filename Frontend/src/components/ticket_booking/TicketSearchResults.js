import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, Typography, Container, Grid, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const TicketSearchResults = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets', {
          params: {
            departure: query.get('departure') || '',
            arrival: query.get('arrival') || '',
            date: query.get('date') || '',
            passengers: query.get('passengers') || ''
          }
        });
        setTickets(response.data);
      } catch (error) {
        setError('Error fetching tickets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [location.search]);

  if (loading) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <Alert severity="error" style={{ margin: '20px' }}>{error}</Alert>;

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      {tickets.length > 0 ? (
        <Grid container spacing={3}>
          {tickets.map(ticket => (
            <Grid item xs={12} sm={6} md={4} key={ticket._id}>
              <Card style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                height: '200px', // Set a fixed height for uniformity
                padding: '20px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                borderRadius: '8px' 
              }}>
                <div>
                  <Typography variant="h6" gutterBottom>{ticket.departure} to {ticket.arrival}</Typography>
                  <Typography variant="body1" color="textSecondary">Date: {new Date(ticket.travelDate).toLocaleDateString()}</Typography>
                  <Typography variant="h5" color="primary">Price: ${ticket.price}</Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  href={`/bookings/${ticket._id}`}
                  style={{ marginTop: '10px' }}
                >
                  Book Now
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">No tickets available for the given search criteria.</Typography>
      )}
    </Container>
  );
};

export default TicketSearchResults;
