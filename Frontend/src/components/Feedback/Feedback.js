import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Rating, Box } from '@mui/material';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching feedbacks', err);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh" 
      px={2}
    >
      <Typography variant="h4" gutterBottom>
        Feedback Received
      </Typography>
      {feedbacks.length === 0 ? (
        <Typography>No feedback available.</Typography>
      ) : (
        feedbacks.map((feedback) => (
          <Card 
            key={feedback._id} 
            style={{ marginBottom: '16px', width: '100%', maxWidth: '600px' }} // Center the card and limit its width
          >
            <CardContent>
              <Rating 
                name={`rating-${feedback._id}`} 
                value={feedback.rating} 
                precision={0.5} 
                readOnly 
              />
              <Typography variant="body1" style={{ marginTop: '8px' }}>
                {feedback.comment}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default FeedbackList;
