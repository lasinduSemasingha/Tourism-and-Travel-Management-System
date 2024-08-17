import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Input, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { Category, AttachMoney, Inventory, Description, Image, Edit } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Predefined category options for travel items
const categoryOptions = ['Bags', 'Tents', 'Travel Accessories', 'Packing Cubes', 'Other'];



const UpdateTravelItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockAmount, setStockAmount] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTravelItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/travelitem/${id}`);
        const { itemName, description, price, stockAmount, category, image } = response.data;

        setItemName(itemName || '');
        setDescription(description || '');
        setPrice(price || '');
        setStockAmount(stockAmount || '');
        setCategory(category || '');
        setImage(image ? URL.createObjectURL(new Blob([image.data])) : null);
      } catch (err) {
        setError(`Error fetching travel item: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelItem();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stockAmount', stockAmount);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      await axios.put(`http://localhost:5000/api/travelitem/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/travelitem');
    } catch (err) {
      setError('Error updating travel item');
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
        Update Travel Item
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
              startAdornment: <Edit />
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
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Update Travel Item'}
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

export default UpdateTravelItem;
