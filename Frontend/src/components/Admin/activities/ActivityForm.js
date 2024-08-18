import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const ActivityForm = () => {
  const [activity, setActivity] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    date: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/activities/${id}`);
          setActivity(response.data);
        } catch (err) {
          setError('Error fetching activity');
        }
      };

      fetchActivity();
    }
  }, [id]);

  const handleChange = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/activities/${id}`, activity);
      } else {
        await axios.post('http://localhost:5000/api/activities', activity);
      }
      navigate('/admin-dashboard');
    } catch (err) {
      setError('Error saving activity');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} style={{ padding: '2rem', width: '500px' }}>
        <Typography variant="h4" gutterBottom align="center">
          {id ? <EditIcon fontSize="large" color="primary" /> : <AddIcon fontSize="large" color="primary" />}
          {id ? ' Edit Activity' : ' Add Activity'}
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={activity.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <EventIcon position="start" color="action" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                value={activity.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <LocationOnIcon position="start" color="action" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={activity.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <AttachMoneyIcon position="start" color="action" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={activity.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                InputProps={{
                  startAdornment: (
                    <DescriptionIcon position="start" color="action" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={activity.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                startIcon={id ? <EditIcon /> : <AddIcon />}
              >
                {id ? 'Update' : 'Add'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ActivityForm;
