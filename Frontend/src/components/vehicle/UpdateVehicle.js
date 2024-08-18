import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress, Box, Input, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const statusOptions = [
  { value: 'available', label: 'Available' },
  { value: 'unavailable', label: 'Unavailable' },
  { value: 'pending', label: 'Pending' }
];

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleType: '',
    registrationNumber: '',
    rentalPrice: '',
    status: 'available',
    image: null
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${id}`);
        const { vehicleType, registrationNumber, rentalPrice, status, image } = response.data;

        setFormData({
          vehicleType: vehicleType || '',
          registrationNumber: registrationNumber || '',
          rentalPrice: rentalPrice ? rentalPrice.toString() : '',
          status: status || 'available',
          image: image || null
        });
      } catch (err) {
        setError(`Error fetching vehicle: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
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
      await axios.put(`http://localhost:5000/api/vehicles/update/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage('Vehicle updated successfully!');
      setTimeout(() => {
        navigate('/vehiclelist');
      }, 2000);
    } catch (err) {
      setError('Error updating vehicle. Please try again.');
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
        Update Vehicle
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Vehicle Type"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Registration Number"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Rental Price"
            name="rentalPrice"
            type="number"
            value={formData.rentalPrice}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            fullWidth
            margin="normal"
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
            {submitting ? <CircularProgress size={24} /> : 'Update Vehicle'}
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

export default UpdateVehicle;
