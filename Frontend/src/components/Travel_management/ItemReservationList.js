import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const ItemReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/travelitemreservation/'); // Adjust the API endpoint as needed
                setReservations(response.data);
            } catch (err) {
                console.error("Error fetching item reservations:", err.response ? err.response.data : err.message);
                setError('Error fetching item reservations');
            }
        };

        fetchReservations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/travelitemreservation/${id}`); // Adjust the API endpoint as needed
            setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== id));
        } catch (err) {
            console.error("Error deleting item reservation:", err.response ? err.response.data : err.message);
            setError('Error deleting item reservation');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/travelitemreservation/update/${id}`, { status }); // Adjust the API endpoint as needed
            setReservations(prevReservations =>
                prevReservations.map(reservation =>
                    reservation._id === id ? response.data : reservation
                )
            );
        } catch (err) {
            console.error("Error updating item reservation status:", err.response ? err.response.data : err.message);
            setError('Error updating item reservation status');
        }
    };

    return (
        <div>
            <Typography variant="h4">All Item Reservations</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={3}>
                {reservations.map(reservation => (
                    <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">
                                    {reservation.itemId && reservation.itemId.itemName ? reservation.itemId.itemName : 'Unknown Item'}
                                </Typography>
                                <Typography variant="body1">
                                    {reservation.itemId && reservation.itemId.category ? `Category: ${reservation.itemId.category}` : 'Category: N/A'}
                                </Typography>
                                <Typography variant="body2">Quantity Reserved: {reservation.quantity}</Typography>
                                <Typography variant="body2">Reservation Date: {new Date(reservation.reservationDate).toLocaleDateString()}</Typography>
                                <Typography 
                                    variant="body2"
                                    style={{
                                        color: reservation.status === 'In-stock' ? 'green' :
                                               reservation.status === 'out-of-stock' ? 'red' :
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
                                    <MenuItem value="in-stock">in-stock</MenuItem>
                                    <MenuItem value="out-of-stock">out-of-stock</MenuItem>
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

export default ItemReservationList;
