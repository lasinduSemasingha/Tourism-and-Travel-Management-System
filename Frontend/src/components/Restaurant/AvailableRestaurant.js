import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Place, Restaurant, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AvailableRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/restaurants/');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants', error);
            }
        };

        fetchRestaurants();
    }, []);

    const handleViewMenu = (id) => {
        navigate(`/restaurant/${id}`);
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Available Restaurants
            </Typography>
            <Grid container spacing={2}>
                {restaurants.map((restaurant) => (
                    <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {restaurant.name}
                                </Typography>
                                <Typography variant="body1">
                                    <Place style={{ verticalAlign: 'middle' }} /> {restaurant.area}
                                </Typography>
                                <Typography variant="body2">
                                    <Restaurant style={{ verticalAlign: 'middle' }} /> {restaurant.cuisine}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowForward />}
                                    style={{ marginTop: '1rem' }}
                                    onClick={() => handleViewMenu(restaurant._id)}
                                >
                                    View Menu
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default AvailableRestaurants;
