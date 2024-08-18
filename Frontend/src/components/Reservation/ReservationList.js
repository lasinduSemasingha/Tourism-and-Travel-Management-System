import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reservations');
                setReservations(response.data);
            } catch (err) {
                console.error("Error fetching reservations:", err.response ? err.response.data : err.message);
                setError('Error fetching reservations');
            }
        };

        fetchReservations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/reservations/${id}`);
            setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== id));
        } catch (err) {
            console.error("Error deleting reservation:", err.response ? err.response.data : err.message);
            setError('Error deleting reservation');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/reservations/update/${id}`, { status });
            setReservations(prevReservations =>
                prevReservations.map(reservation =>
                    reservation._id === id ? response.data : reservation
                )
            );
        } catch (err) {
            console.error("Error updating reservation status:", err.response ? err.response.data : err.message);
            setError('Error updating reservation status');
        }
    };

    return (
        <div>
            <Typography variant="h4">All Reservations</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={3}>
                {reservations.map(reservation => (
                    <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">
                                    {reservation.destinationId && reservation.destinationId.name ? reservation.destinationId.name : 'Unknown Destination'}
                                </Typography>
                                <Typography variant="body1">
                                    {reservation.destinationId && reservation.destinationId.location ? `Location: ${reservation.destinationId.location}` : 'Location: N/A'}
                                </Typography>
                                <Typography variant="body2">From: {new Date(reservation.fromDate).toLocaleDateString()}</Typography>
                                <Typography variant="body2">To: {new Date(reservation.toDate).toLocaleDateString()}</Typography>
                                <Typography variant="body2">Total Price: ${reservation.totalPrice}</Typography>
                                <Typography 
                                    variant="body2"
                                    style={{
                                        color: reservation.status === 'confirmed' ? 'green' :
                                               reservation.status === 'rejected' ? 'red' :
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
                                    <MenuItem value="rejected">Rejected</MenuItem>
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

export default ReservationList;
