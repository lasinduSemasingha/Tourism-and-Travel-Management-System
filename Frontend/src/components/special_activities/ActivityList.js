import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Button, Grid, IconButton, TextField } from '@mui/material';
import { Edit, Delete, Preview } from '@mui/icons-material';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/activities');
        setActivities(response.data);
        setFilteredActivities(response.data);
      } catch (err) {
        setError('Error fetching activities');
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredActivities(
        activities.filter(activity =>
          activity.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredActivities(activities);
    }
  }, [searchQuery, activities]);

  return (
    <Container maxWidth="lg" sx={{ padding: '0 16px' }}>
      <Typography variant="h4" gutterBottom>
        Activities
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Search Activities"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Grid container spacing={3}>
        {filteredActivities.map(activity => (
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ActivityList;
