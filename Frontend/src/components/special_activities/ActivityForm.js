import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

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
      navigate('/activity-list');
    } catch (err) {
      setError('Error saving activity');
    }
  };

  return (
    <div>
      <Typography variant="h4">{id ? 'Edit Activity' : 'Add Activity'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={activity.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={activity.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={activity.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={activity.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={activity.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Update' : 'Add'}
        </Button>
      </form>
    </div>
  );
};

export default ActivityForm;
