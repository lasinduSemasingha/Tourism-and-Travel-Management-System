import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getStatusStyle = (status) => {
    switch (status) {
        case 'Confirmed':
            return { color: 'green', fontWeight: 'bold' };
        case 'Rejected':
            return { color: 'red', fontWeight: 'bold' };
        case 'Pending':
            return { color: 'orange', fontWeight: 'bold' };
        default:
            return { color: 'gray' };
    }
};

const AddedReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch reservations for the current user
        const fetchReservations = async () => {
            try {
                // Assuming the API endpoint fetches all reservations and includes user ID in the response
                const response = await axios.get('http://localhost:5000/api/reservations');
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));

                if (!userInfo) {
                    navigate('/login'); // Redirect to login if no user info is found
                    return;
                }

                // Filter reservations based on the current user's ID
                const userReservations = response.data.filter(reservation => reservation.userId === userInfo._id);
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
            <Typography variant="h4">My Reservations</Typography>
            <Grid container spacing={3}>
                {reservations.map(reservation => (
                    <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{reservation.destinationId.name}</Typography>
                                <Typography variant="body1">
                                    From: {new Date(reservation.fromDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1">
                                    To: {new Date(reservation.toDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1">
                                    Total Price: ${reservation.totalPrice}
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

export default AddedReservation;
