import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[10],
  },
  marginBottom: theme.spacing(2),
}));

const UserBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`http://localhost:5000/api/bookings/user/${user._id}`);
          setBookings(response.data);
        } else {
          setError('User is not authenticated');
        }
      } catch (err) {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      {bookings.length === 0 ? (
        <Typography variant="h6">No bookings found</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="body1">Departure: {booking.ticketId?.departure || 'N/A'}</Typography>
                  <Typography variant="body1">Arrival: {booking.ticketId?.arrival || 'N/A'}</Typography>
                  <Typography variant="body1">Travel Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
                  <Typography variant="body1">Number of Passengers: {booking.noOfPassengers}</Typography>
                  <Typography variant="body1">Total Amount: ${booking.totalAmount}</Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UserBookings;
