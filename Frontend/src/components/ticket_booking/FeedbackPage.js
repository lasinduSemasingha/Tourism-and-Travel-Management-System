import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const FeedbackPage = () => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    await axios.post('/api/feedback', { rating, comment });
    // Handle feedback submission confirmation
  };

  return (
    <div>
      <TextField label="Rating" type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      <TextField label="Comment" multiline rows={4} value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={handleSubmit}>Submit Feedback</Button>
    </div>
  );
};

export default FeedbackPage;
