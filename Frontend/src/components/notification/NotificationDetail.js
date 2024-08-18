import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Container } from '@mui/material';

const NotificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notifications/${id}`);
        setNotification(response.data);
      } catch (error) {
        console.error('Error fetching notification details:', error);
      }
    };
    fetchNotification();
  }, [id]);

  const handleMarkAsUnread = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${id}/unread`);
      setNotification(prev => ({ ...prev, read: false }));
      window.location.reload()
    } catch (error) {
      console.error('Error marking notification as unread:', error);
    }
  };

  if (!notification) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4">Title: {notification.title}</Typography>
      <Typography variant="body1">Message: {notification.message}</Typography>
      <Typography variant="body2">Food Name: {notification.foodName}</Typography>
      <Typography variant="body2">Description: {notification.description}</Typography>
      <Typography variant="body2">Ingredients: {notification.ingredients.join(', ')}</Typography>
      <Typography variant="body2">Ratings: {notification.ratings}</Typography>
      <br />
      <Button variant="outlined" color="secondary" onClick={handleMarkAsUnread}>
        Mark as Unread
      </Button>
    </Container>
  );
};

export default NotificationDetail;
