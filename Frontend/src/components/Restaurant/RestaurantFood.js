import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Card, CardContent, Button, TextField } from '@mui/material';
import { RestaurantMenu, Schedule } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantFood = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState('');
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [reservationDate, setReservationDate] = useState('');
    const [numOfPeople, setNumOfPeople] = useState(1); // Added state for number of people
    const userId = JSON.parse(localStorage.getItem('userInfo'))?._id; // Retrieve user ID from localStorage
    console.log(userId);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/restaurants/${id}/menu`);
                console.log('Menu data:', response.data); // Log the response data
                setMenu(response.data);
            } catch (error) {
                console.error('Error fetching menu', error);
                setError('Error fetching menu');
            }
        };

        fetchMenu();
    }, [id]);

    const handleReservation = async () => {
        if (!userId) {
            setError('You must be logged in to make a reservation.');
            return;
        }
        if (!reservationDate) {
            setError('Please select a reservation date.');
            return;
        }
        if (numOfPeople <= 0) {
            setError('Number of people must be at least 1.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/restaurant-reservations', {
                restaurantId: id,
                date: reservationDate,
                numOfPeople,
                userId: userId
            });
            setReservationSuccess(true);
            setError('');
            window.location.href = '/feedback';
        } catch (error) {
            setError('Error creating reservation');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', margin: '2rem auto', maxWidth: '1200px' }}>
            <Typography variant="h4" gutterBottom>
                Restaurant Menu
            </Typography>
            <Grid container spacing={2}>
                {menu.length > 0 ? (
                    menu.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">{item.item}</Typography>
                                    <Typography variant="body1">
                                        Price: ${item.price.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No menu items available.
                    </Typography>
                )}
            </Grid>
            <Typography variant="h6" gutterBottom style={{ marginTop: '2rem' }}>
                Make a Reservation
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {reservationSuccess && <Typography color="primary">Reservation successful!</Typography>}
            <TextField
                label="Reservation Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
            />
            <TextField
                label="Number of People"
                type="number"
                InputProps={{ inputProps: { min: 1 } }} // Ensure the value is at least 1
                fullWidth
                margin="normal"
                value={numOfPeople}
                onChange={(e) => setNumOfPeople(parseInt(e.target.value))}
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<Schedule />}
                onClick={handleReservation}
                style={{ marginTop: '1rem' }}
            >
                Reserve Now
            </Button>
        </Paper>
    );
};

export default RestaurantFood;
