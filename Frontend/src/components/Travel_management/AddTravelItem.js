import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Input, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Category, AttachMoney, Inventory, Description, Image, AddShoppingCart } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Predefined category options for travel items
const categoryOptions = ['Bags', 'Tents', 'Travel Accessories', 'Packing Cubes', 'Other'];

// Predefined status options for travel items
const statusOptions = [
  { value: 'in-stock', label: 'in-stock' },
  { value: 'out-of-stock', label: 'out-of-stock' }
];

const AddTravelItem = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockAmount, setStockAmount] = useState('');
  const [category, setCategory] = useState('');
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
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stockAmount', stockAmount);
    formData.append('category', category);
    formData.append('status', status);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/travelitem/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/travelitem');
    } catch (err) {
      console.error("Error adding travel item:", err.response ? err.response.data : err.message);
      setError('Error adding travel item');
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
        Add Travel Item
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <AddShoppingCart />
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            InputProps={{
              startAdornment: <Description />
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <AttachMoney />
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Stock Amount"
            type="number"
            value={stockAmount}
            onChange={(e) => setStockAmount(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <Inventory />
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              startAdornment={<Category />}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal" variant="outlined">
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
            inputProps={{ 'aria-label': 'Upload Image' }}
            startAdornment={<Image />}
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
            Add Travel Item
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

export default AddTravelItem;
