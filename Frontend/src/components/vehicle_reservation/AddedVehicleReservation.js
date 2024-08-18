import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getStatusStyle = (status) => {
    switch (status) {
        case 'available':
            return { color: 'green', fontWeight: 'bold' };
        case 'unavailable':
            return { color: 'red', fontWeight: 'bold' };
        default:
            return { color: 'gray' };
    }
};

const AddedVehicleReservation = () => {
    const [vehicleReservations, setVehicleReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicleReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vehiclereservations');
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));

                if (!userInfo) {
                    navigate('/login');
                    return;
                }

                const userVehicleReservations = response.data.filter(reservation => reservation.userId === userInfo._id);
                setVehicleReservations(userVehicleReservations);
            } catch (err) {
                console.error("Error fetching vehicle reservations:", err.response ? err.response.data : err.message);
                setError('Error fetching vehicle reservations');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicleReservations();
    }, [navigate]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Typography variant="h4">My Vehicle Reservations</Typography>
            <Grid container spacing={3}>
                {vehicleReservations.map(reservation => (
                    <Grid item xs={12} sm={6} md={2} key={reservation._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {reservation.vehicleId.vehicleType} - {reservation.vehicleId.registrationNumber}
                                </Typography>
                                <Typography variant="body1">
                                    Rental Price: ${reservation.vehicleId.rentalPrice}
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

export default AddedVehicleReservation;
