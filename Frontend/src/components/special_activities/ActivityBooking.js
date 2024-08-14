import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ActivityBooking = () => {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userID = userInfo ? userInfo._id : null;
  
  const { id } = useParams(); // Extracting id from useParams
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState(null); // Initialize as null
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/activities/${id}`);
        setActivity(response.data);
      } catch (err) {
        setError('Error fetching activity');
      }
    };

    fetchActivity();
  }, [id]); // Add id to dependency array

  const handleBooking = async () => {
    setLoading(true);
    try {
      // Ensure that this endpoint exists and is correct for booking
      const response = await axios.post('http://localhost:5000/api/special/', {
        activityId: id,
        userId: userID,
        activityName: activity.name,
        activityLocation: activity.location,
        price: activity.price,
        date: date,
      });
      // Navigate to booking confirmation page
      navigate(`/book-confirmation/${response.data._id}`, {
        state: { booking: response.data },
      });
    } catch (err) {
      setError('Error booking the activity');
    } finally {
      setLoading(false);
    }
  };

  if (!activity) return <Typography variant="h6">Loading activity...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Book {activity.name}
      </Typography>
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? 'Booking...' : 'Book Now'}
      </Button>
    </Container>
  );
};

export default ActivityBooking;
