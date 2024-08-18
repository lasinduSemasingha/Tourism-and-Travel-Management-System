import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Input, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const statusOptions = [
  { value: 'available', label: 'Available' },
  { value: 'unavailable', label: 'Unavailable' },
  { value: 'pending', label: 'Pending' }
];

const vehicleOptions = ['car', 'bike', 'truck', 'cab', 'van'];

const AddVehicle = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [status, setStatus] = useState('available');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('vehicleType', vehicleType);
    formData.append('registrationNumber', registrationNumber);
    formData.append('rentalPrice', rentalPrice);
    formData.append('status', status);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/vehicles/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/vehiclelist');
    } catch (err) {
      console.error("Error adding vehicle:", err.response ? err.response.data : err.message);
      setError('Error adding vehicle');
    }
  };


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
        Add Vehicle
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Vehicle Type</InputLabel>
          <Select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            label="Vehicle Type"
          >
            {vehicleOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

        <Grid item xs={12}>
          <TextField
            label="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Rental Price"
            type="number"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
            accept="image/*"
            onChange={handleImageChange}
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
          >
            Add Vehicle
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default AddVehicle;
