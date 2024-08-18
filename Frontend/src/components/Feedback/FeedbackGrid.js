import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Rating } from '@mui/material';
import axios from 'axios';

const FeedbackGrid = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Feedbacks
      </Typography>
      <Grid container spacing={4}>
        {feedbacks.map((feedback) => (
          <Grid item xs={12} sm={6} md={4} key={feedback._id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                <Rating value={feedback.rating} readOnly precision={0.5} />
              </Box>
              <Typography variant="body1" gutterBottom>
                {feedback.comment}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                - {feedback.userId.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeedbackGrid;
