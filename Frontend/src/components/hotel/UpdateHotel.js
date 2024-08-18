import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';


const UpdateHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    address: '',
    country: '',
    city: '',
    contactNumber: '',
    email: '',
    image: null
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        const { name, owner, address, country, city, contactNumber, email, approvalStatus, image } = response.data;

        setFormData({
          name: name || '',
          owner: owner || '',
          address: address || '',
          country: country || '',
          city: city || '',
          contactNumber: contactNumber || '',
          email: email || '',
          approvalStatus: approvalStatus || 'pending',
          image: image ? URL.createObjectURL(new Blob([image.data])) : null
        });
      } catch (err) {
        setError(`Error fetching hotel: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.put(`http://localhost:5000/api/hotels/update/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage('Hotel updated successfully!');
      setTimeout(() => {
        window.location.href = '/admin/hotellist'
      }, 2000);
    } catch (err) {
      setError('Error updating hotel. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Update Hotel
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Hotel Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="file"
            name="image"
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Update Hotel'}
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {successMessage && (
        <Typography color="success" sx={{ mt: 2 }}>
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default UpdateHotel;
