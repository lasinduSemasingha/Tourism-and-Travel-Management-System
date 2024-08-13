import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const VehicleReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vehiclereservations');
                setReservations(response.data);
            } catch (err) {
                console.error("Error fetching vehicle reservations:", err.response ? err.response.data : err.message);
                setError('Error fetching vehicle reservations');
            }
        };

        fetchReservations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/vehiclereservations/${id}`);
            setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== id));
        } catch (err) {
            console.error("Error deleting vehicle reservation:", err.response ? err.response.data : err.message);
            setError('Error deleting vehicle reservation');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/vehiclereservations/update/${id}`, { status });
            setReservations(prevReservations =>
                prevReservations.map(reservation =>
                    reservation._id === id ? response.data : reservation
                )
            );
        } catch (err) {
            console.error("Error updating vehicle reservation status:", err.response ? err.response.data : err.message);
            setError('Error updating vehicle reservation status');
        }
    };

    return (
        <div>
            <Typography variant="h4">All Vehicle Reservations</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={3}>
                {reservations.map(reservation => (
                    <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">
                                    {reservation.vehicleId && reservation.vehicleId.vehicleType ? reservation.vehicleId.vehicleType : 'Unknown Vehicle'}
                                </Typography>
                                <Typography variant="body1">
                                    {reservation.vehicleId && reservation.vehicleId.registrationNumber ? `Registration: ${reservation.vehicleId.registrationNumber}` : 'Registration: N/A'}
                                </Typography>
                                <Typography variant="body1">
                                    {reservation.vehicleId && reservation.vehicleId.rentalPrice ? `Price: $${reservation.vehicleId.rentalPrice}` : 'Price: N/A'}
                                </Typography>
                                <Typography variant="body2">Total Price: ${reservation.totalPrice}</Typography>
                                <Typography 
                                    variant="body2"
                                    style={{
                                        color: reservation.status === 'available' ? 'green' :
                                               reservation.status === 'unavailable' ? 'red' :
                                               'gray',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Status: {reservation.status}
                                </Typography>
                                <Select
                                    value={reservation.status}
                                    onChange={(e) => handleStatusUpdate(reservation._id, e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="available">available</MenuItem>
                                    <MenuItem value="unavailable">unavailable</MenuItem>
                                </Select>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(reservation._id)}
                                    style={{ marginTop: '10px' }}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default VehicleReservationList;
