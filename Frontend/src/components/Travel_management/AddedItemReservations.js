import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Function to style the reservation status
const getStatusStyle = (status) => {
    switch (status) {
        case 'in-stock':
            return { color: 'green', fontWeight: 'bold' };
        case 'out-of-stock':
            return { color: 'red', fontWeight: 'bold' };
        default:
            return { color: 'gray' };
    }
};

const AddedItemReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/travelitemreservation/');
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));

                if (!userInfo) {
                    navigate('/login');
                    return;
                }

                // Debug: Log response and userInfo
                console.log('Fetched Item Reservations:', response.data);
                console.log('Current User Info:', userInfo);

                // Filter reservations for the current user
                const userReservations = response.data.filter(reservation => {
                    // Log values for debugging
                    console.log('Reservation User ID:', reservation.userId);
                    console.log('Current User ID:', userInfo._id);

                    // Compare user IDs
                    return reservation.userId === userInfo._id; 
                });

                console.log('User Item Reservations:', userReservations);
                setReservations(userReservations);
            } catch (err) {
                console.error("Error fetching item reservations:", err.response ? err.response.data : err.message);
                setError('Error fetching item reservations');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [navigate]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Typography variant="h4">My Item Reservations</Typography>
            <Grid container spacing={3}>
                {reservations.map(reservation => (
                    <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {reservation.itemId ? reservation.itemId.itemName : 'Item Not Found'}
                                </Typography>
                                <Typography variant="body1">
                                    Quantity Reserved: {reservation.quantity}
                                </Typography>
                                <Typography variant="body1">
                                    Reservation Date: {new Date(reservation.reservationDate).toLocaleDateString()}
                                </Typography>
                                <Typography 
                                    variant="body1"
                                    style={getStatusStyle(reservation.status)}
                                >
                                    Status: {reservation.status}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default AddedItemReservation;
