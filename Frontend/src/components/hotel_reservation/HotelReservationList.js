import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const HotelReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hotelreservations');
                setReservations(response.data);
            } catch (err) {
                console.error("Error fetching hotel reservations:", err.response ? err.response.data : err.message);
                setError('Error fetching hotel reservations');
            }
        };

        fetchReservations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/hotelreservations/${id}`);
            setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== id));
        } catch (err) {
            console.error("Error deleting hotel reservation:", err.response ? err.response.data : err.message);
            setError('Error deleting hotel reservation');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/hotelreservations/update/${id}`, { status });
            setReservations(prevReservations =>
                prevReservations.map(reservation =>
                    reservation._id === id ? response.data : reservation
                )
            );
        } catch (err) {
            console.error("Error updating hotel reservation status:", err.response ? err.response.data : err.message);
            setError('Error updating hotel reservation status');
        }
    };

    return (
        <div>
            <Typography variant="h4">All Hotel Reservations</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={3}>
                {reservations.map(reservation => (
                    <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">
                                    {reservation.hotelId && reservation.hotelId.name ? reservation.hotelId.name : 'Unknown Hotel'}
                                </Typography>
                                <Typography variant="body1">
                                    {reservation.hotelId && reservation.hotelId.location ? `Location: ${reservation.hotelId.location}` : 'Location: N/A'}
                                </Typography>
                                <Typography variant="body2">Check-In: {new Date(reservation.checkInDate).toLocaleDateString()}</Typography>
                                <Typography variant="body2">Check-Out: {new Date(reservation.checkOutDate).toLocaleDateString()}</Typography>
                                <Typography 
                                    variant="body2"
                                    style={{
                                        color: reservation.status === 'confirmed' ? 'green' :
                                               reservation.status === 'cancelled' ? 'red' :
                                               reservation.status === 'pending' ? 'orange' :
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
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="confirmed">Confirmed</MenuItem>
                                    <MenuItem value="cancelled">Cancelled</MenuItem>
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

export default HotelReservationList;
