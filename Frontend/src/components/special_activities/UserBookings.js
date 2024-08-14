import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBookings = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const userID = userInfo ? userInfo._id : null;

      if (userID) {
        try {
          const response = await fetch(`http://localhost:5000/api/special/user/${userID}`);
          if (!response.ok) throw new Error('Network response was not ok');
          
          const data = await response.json();
          setBookings(data);
        } catch (err) {
          setError('Error fetching bookings');
        } finally {
          setLoading(false);
        }
      } else {
        setError('User ID not found');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        My Bookings
      </Typography>
      <Grid container spacing={3}>
        {bookings.length === 0 ? (
          <Typography variant="h6" align="center" fullWidth>
            No bookings found.
          </Typography>
        ) : (
          bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Activity: {booking.activityName}
                  </Typography>
                  <Typography variant="body1">
                    Date: {booking.date}
                  </Typography>
                  <Typography variant="body1">
                    Location: {booking.activityLocation}
                  </Typography>
                  <Typography variant="body1">
                    Price: ${booking.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '1rem' }}
        onClick={() => navigate('/')}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default UserBookings;
