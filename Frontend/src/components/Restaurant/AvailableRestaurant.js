import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Place, Restaurant } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AvailableRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

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
                                <Link to={`/restaurant/${restaurant._id}`} style={{ textDecoration: 'none' }}>
                                    <Typography variant="body2" color="primary" style={{ marginTop: '1rem', display: 'block' }}>
                                        View Menu
                                    </Typography>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default AvailableRestaurants;
