import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getStatusStyle = (status) => {
    switch (status) {
        case 'confirmed':
            return { color: 'green', fontWeight: 'bold' };
        case 'cancelled':
            return { color: 'red', fontWeight: 'bold' };
        case 'pending':
            return { color: 'orange', fontWeight: 'bold' };
        default:
            return { color: 'gray' };
    }
};

const AddedHotelReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hotelreservations');
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));

                if (!userInfo) {
                    navigate('/login');
                    return;
                }

                // Debug: Log response and userInfo
                console.log('Fetched Reservations:', response.data);
                console.log('Current User Info:', userInfo);

                // Adjusted comparison to match userId correctly
                const userReservations = response.data.filter(reservation => 
                    reservation.userId && reservation.userId._id === userInfo._id
                );

                console.log('User Reservations:', userReservations);
                setReservations(userReservations);
            } catch (err) {
                console.error("Error fetching reservations:", err.response ? err.response.data : err.message);
                setError('Error fetching reservations');
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
            <Typography variant="h4">My Hotel Reservations</Typography>
            <Grid container spacing={3}>
                {reservations.map(reservation => (
                    <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {reservation.hotelId ? reservation.hotelId.name : 'Hotel Not Found'}
                                </Typography>
                                <Typography variant="body1">
                                    Check-In: {new Date(reservation.checkInDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1">
                                    Check-Out: {new Date(reservation.checkOutDate).toLocaleDateString()}
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

export default AddedHotelReservation;
