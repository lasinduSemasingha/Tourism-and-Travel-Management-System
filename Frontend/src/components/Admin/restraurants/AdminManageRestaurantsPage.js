import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Snackbar } from '@mui/material';
import { Edit, Delete, Restaurant, LocationOn, Phone, AttachMoney, Description, Visibility, Add } from '@mui/icons-material';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const AdminManageRestaurantsPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialogMode, setDialogMode] = useState('view'); // 'view', 'edit'
    const navigate = useNavigate();

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/restaurants');
            setRestaurants(response.data);
        } catch (err) {
            console.error('Error fetching restaurants', err);
        }
    };

    const handleOpenDialog = (restaurant, mode) => {
        setSelectedRestaurant(restaurant);
        setDialogMode(mode);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/restaurants/${id}`);
            fetchRestaurants();
            setSnackbarMessage('Restaurant deleted successfully');
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error deleting restaurant', err);
            setSnackbarMessage('Error deleting restaurant');
            setOpenSnackbar(true);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/restaurants/${selectedRestaurant._id}`, selectedRestaurant);
            fetchRestaurants();
            setSnackbarMessage('Restaurant updated successfully');
            setOpenSnackbar(true);
            handleCloseDialog();
        } catch (err) {
            console.error('Error updating restaurant', err);
            setSnackbarMessage('Error updating restaurant');
            setOpenSnackbar(true);
        }
    };

    const handleInputChange = (e) => {
        setSelectedRestaurant({ ...selectedRestaurant, [e.target.name]: e.target.value });
    };

    const handleAddRestaurant = () => {
        window.location.href = '/admin/add-restaurants' // Redirect to the add restaurant page
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Manage Restaurants
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddRestaurant}
                style={{ marginBottom: '1rem' }}
            >
                Add Restaurant
            </Button>
            {restaurants.map((restaurant) => (
                <Card key={restaurant._id} style={{ marginBottom: '1rem' }}>
                    <CardContent>
                        <Typography variant="h6">{restaurant.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {restaurant.address} | {restaurant.phone}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {restaurant.cuisine} | {restaurant.priceRange}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {restaurant.description}
                        </Typography>
                        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                            <Grid item>
                                <IconButton color="secondary" onClick={() => handleOpenDialog(restaurant, 'view')}>
                                    <Visibility />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton color="primary" onClick={() => handleOpenDialog(restaurant, 'edit')}>
                                    <Edit />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton color="error" onClick={() => handleDelete(restaurant._id)}>
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
            
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{dialogMode === 'edit' ? 'Edit Restaurant' : 'View Restaurant'}</DialogTitle>
                <DialogContent>
                    {selectedRestaurant && (
                        <div>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={selectedRestaurant.name}
                                onChange={handleInputChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Restaurant />
                                        </InputAdornment>
                                    ),
                                }}
                                disabled={dialogMode === 'view'}
                            />
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={selectedRestaurant.address}
                                onChange={handleInputChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn />
                                        </InputAdornment>
                                    ),
                                }}
                                disabled={dialogMode === 'view'}
                            />
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={selectedRestaurant.phone}
                                onChange={handleInputChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                }}
                                disabled={dialogMode === 'view'}
                            />
                            <TextField
                                fullWidth
                                label="Area"
                                name="area"
                                value={selectedRestaurant.area}
                                onChange={handleInputChange}
                                margin="normal"
                                disabled={dialogMode === 'view'}
                            />
                            <TextField
                                fullWidth
                                label="Cuisine"
                                name="cuisine"
                                value={selectedRestaurant.cuisine}
                                onChange={handleInputChange}
                                margin="normal"
                                disabled={dialogMode === 'view'}
                            />
                            <TextField
                                fullWidth
                                label="Price Range"
                                name="priceRange"
                                value={selectedRestaurant.priceRange}
                                onChange={handleInputChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoney />
                                        </InputAdornment>
                                    ),
                                }}
                                disabled={dialogMode === 'view'}
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={selectedRestaurant.description}
                                onChange={handleInputChange}
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
                                disabled={dialogMode === 'view'}
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    {dialogMode === 'edit' && (
                        <Button onClick={handleUpdate} color="primary">
                            Update
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default AdminManageRestaurantsPage;
