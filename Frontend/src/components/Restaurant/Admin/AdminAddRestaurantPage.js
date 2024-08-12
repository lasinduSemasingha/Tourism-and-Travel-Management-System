import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Card, CardContent, Grid, InputAdornment } from '@mui/material';
import { Restaurant, LocationOn, Phone, AttachMoney, Description } from '@mui/icons-material';
import axios from 'axios';

const AdminAddRestaurantPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        area: '',
        cuisine: '',
        priceRange: '',
        description: '',
        menu: [{ item: '', price: 0 }] // Start with an empty menu item
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMenuChange = (index, e) => {
        const newMenu = [...formData.menu];
        newMenu[index][e.target.name] = e.target.value;
        setFormData({ ...formData, menu: newMenu });
    };

    const handleAddMenuItem = () => {
        setFormData({ ...formData, menu: [...formData.menu, { item: '', price: 0 }] });
    };

    const handleRemoveMenuItem = (index) => {
        const newMenu = formData.menu.filter((_, i) => i !== index);
        setFormData({ ...formData, menu: newMenu });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/restaurants', formData);
            setSuccess('Restaurant added successfully');
            setError('');
            setFormData({
                name: '',
                address: '',
                phone: '',
                area: '',
                cuisine: '',
                priceRange: '',
                description: '',
                menu: [{ item: '', price: 0 }]
            });
        } catch (err) {
            setError('Error adding restaurant');
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Add New Restaurant
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
            <Card style={{ padding: '1rem' }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Restaurant Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Restaurant />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOn />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Area"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Cuisine Type"
                                    name="cuisine"
                                    value={formData.cuisine}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Price Range"
                                    name="priceRange"
                                    value={formData.priceRange}
                                    onChange={handleChange}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoney />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Description />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">Menu</Typography>
                                {formData.menu.map((menuItem, index) => (
                                    <Grid container spacing={2} key={index}>
                                        <Grid item xs={5}>
                                            <TextField
                                                fullWidth
                                                label="Menu Item"
                                                name="item"
                                                value={menuItem.item}
                                                onChange={(e) => handleMenuChange(index, e)}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                fullWidth
                                                label="Price"
                                                name="price"
                                                type="number"
                                                value={menuItem.price}
                                                onChange={(e) => handleMenuChange(index, e)}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleRemoveMenuItem(index)}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddMenuItem}
                                >
                                    Add Menu Item
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Add Restaurant
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AdminAddRestaurantPage;