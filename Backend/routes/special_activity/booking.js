import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, CircularProgress, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [formData, setFormData] = useState({});
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

  const handleOpenUpdate = (booking) => {
    setSelectedBooking(booking);
    setFormData({
      activityName: booking.activityName,
      date: booking.date,
      activityLocation: booking.activityLocation,
      price: booking.price,
    });
    setUpdateOpen(true);
  };

  const handleCloseUpdate = () => {
    setUpdateOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch(`http://localhost:5000/api/special/${selectedBooking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const updatedBooking = await response.json();
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );
      handleCloseUpdate();
    } catch (err) {
      setError('Error updating booking');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/special/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (err) {
      setError('Error deleting booking');
    }
  };

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
                  <div style={{ marginTop: '1rem' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenUpdate(booking)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Delete
                    </Button>
                  </div>
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

      <Dialog open={updateOpen} onClose={handleCloseUpdate}>
        <DialogTitle>Update Booking</DialogTitle>
        <DialogContent>
          <TextField
            label="Activity Name"
            name="activityName"
            value={formData.activityName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            name="activityLocation"
            value={formData.activityLocation}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserBookings;
