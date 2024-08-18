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
    const [formErrors, setFormErrors] = useState({});

    // Validate the form inputs
    const validateForm = () => {
        const errors = {};
        const phonePattern = /^[\d\s-]{10,15}$/; // Simple phone number validation

        // Required fields validation
        if (!formData.name) errors.name = 'Restaurant name is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.phone || !phonePattern.test(formData.phone)) errors.phone = 'Valid phone number is required';
        if (!formData.area) errors.area = 'Area is required';
        if (!formData.cuisine) errors.cuisine = 'Cuisine type is required';
        if (!formData.priceRange) errors.priceRange = 'Price range is required';
        if (!formData.description) errors.description = 'Description is required';

        // Validate menu items
        formData.menu.forEach((item, index) => {
            if (!item.item) errors[`menuItem${index}`] = 'Menu item name is required';
            if (item.price <= 0) errors[`menuPrice${index}`] = 'Price must be a positive number';
        });

        return errors;
    };

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
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setError('Please correct the errors above.');
            setSuccess('');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/restaurants', formData);
            setSuccess('Restaurant added successfully');
            setError('');
            setFormErrors({});
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
                                    error={Boolean(formErrors.name)}
                                    helperText={formErrors.name}
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
                                    error={Boolean(formErrors.address)}
                                    helperText={formErrors.address}
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
                                    error={Boolean(formErrors.phone)}
                                    helperText={formErrors.phone}
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
                                    error={Boolean(formErrors.area)}
                                    helperText={formErrors.area}
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
                                    error={Boolean(formErrors.cuisine)}
                                    helperText={formErrors.cuisine}
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
                                    error={Boolean(formErrors.priceRange)}
                                    helperText={formErrors.priceRange}
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
                                    error={Boolean(formErrors.description)}
                                    helperText={formErrors.description}
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
                                                error={Boolean(formErrors[`menuItem${index}`])}
                                                helperText={formErrors[`menuItem${index}`]}
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
                                                error={Boolean(formErrors[`menuPrice${index}`])}
                                                helperText={formErrors[`menuPrice${index}`]}
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
