import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Button, Grid, IconButton } from '@mui/material';
import { Edit, Delete, Preview } from '@mui/icons-material';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/activities');
        setActivities(response.data);
      } catch (err) {
        setError('Error fetching activities');
      }
    };

    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/activities/${id}`);
      setActivities(activities.filter(activity => activity._id !== id));
    } catch (err) {
      setError('Error deleting activity');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '0 16px' }}>
      <Typography variant="h4" gutterBottom>
        Activities
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {activities.map(activity => (
          <Grid item xs={12} sm={6} md={4} key={activity._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{activity.name}</Typography>
                <Typography variant="body1">{activity.location}</Typography>
                <Typography variant="body2">Price: ${activity.price}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
                <IconButton color="primary" onClick={() => window.location.href = `/activity/${activity._id}`}>
                  <Preview />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(activity._id)}>
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ActivityList;
