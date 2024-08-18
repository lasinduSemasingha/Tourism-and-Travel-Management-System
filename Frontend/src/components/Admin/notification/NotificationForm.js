import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const NotificationForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [ratings, setRatings] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    try {
      // Convert ingredients to array
      const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

      // Post data to backend
      await axios.post('http://localhost:5000/api/notifications', {
        title,
        message,
        foodName,
        description,
        ingredients: ingredientsArray,
        ratings: parseFloat(ratings)
      });

      // Clear the form fields
      setTitle('');
      setMessage('');
      setFoodName('');
      setDescription('');
      setIngredients('');
      setRatings('');
      alert('Notification created successfully');
    } catch (error) {
      setError('Failed to create notification');
      console.error('Error creating notification:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Notification
      </Typography>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <TextField
          label="Food Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Ingredients (comma separated)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <TextField
          label="Ratings (1-5)"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          inputProps={{ min: 1, max: 5, step: 0.1 }}
          value={ratings}
          onChange={(e) => setRatings(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Create Notification
        </Button>
      </form>
    </Container>
  );
};

export default NotificationForm;
