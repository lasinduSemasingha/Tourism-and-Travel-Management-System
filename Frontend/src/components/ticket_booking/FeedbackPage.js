import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, Rating } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const FeedbackPage = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/feedback', { userId: user._id, rating: rating, comment: comment });
    window.location.href = '/';
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Feedback Form
        </Typography>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Rating
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            size="large"
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Comment"
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Submit Feedback
        </Button>
      </Paper>
    </Container>
  );
};

export default FeedbackPage;
