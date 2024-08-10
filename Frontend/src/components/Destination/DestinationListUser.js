import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, TextField, DialogActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DestinationListUser = () => {
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState(null);
    const [reservationDates, setReservationDates] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/destinations');
                setDestinations(response.data);
            } catch (err) {
                console.error("Error fetching destinations:", err.response ? err.response.data : err.message);
                setError('Error fetching destinations');
            }
        };

        fetchDestinations();
    }, []);

    const handleDateChange = (destinationId, e) => {
        setReservationDates(prevDates => ({
            ...prevDates,
            [destinationId]: {
                ...prevDates[destinationId],
                [e.target.name]: e.target.value
            }
        }));
    };

    const calculateTotalPrice = (destination, fromDate, toDate) => {
        if (fromDate && toDate) {
            const start = new Date(fromDate);
            const end = new Date(toDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            return days * destination.price;
        }
        return destination.price;
    };

    const handleReserve = async (destinationId) => {
        const { fromDate, toDate } = reservationDates[destinationId] || {};
        if (!fromDate || !toDate) {
            setError('Please select both start and end dates.');
            return;
        }
    
        try {
            await axios.post('http://localhost:5000/api/reservations/add', {
                destinationId,  // Send the correct destination ID
                fromDate,
                toDate,
                totalPrice: calculateTotalPrice(
                    destinations.find(dest => dest._id === destinationId),
                    fromDate,
                    toDate
                )
            });
            navigate('/reservations');
        } catch (err) {
            console.error("Error adding reservation:", err.response ? err.response.data : err.message);
            setError('Error adding reservation');
        }
    };

    return (
        <div>
            <Typography variant="h4">All Destinations</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={3}>
                {destinations.map(destination => (
                    <Grid item xs={12} sm={6} md={4} key={destination._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{destination.name}</Typography>
                                <Typography variant="body1">{destination.location}</Typography>
                                <Typography variant="body2">Price: ${destination.price} per day</Typography>
                                <TextField
                                    label="From Date"
                                    name="fromDate"
                                    type="date"
                                    value={reservationDates[destination._id]?.fromDate || ''}
                                    onChange={(e) => handleDateChange(destination._id, e)}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="To Date"
                                    name="toDate"
                                    type="date"
                                    value={reservationDates[destination._id]?.toDate || ''}
                                    onChange={(e) => handleDateChange(destination._id, e)}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Typography variant="body2">
                                    Total Price: ${calculateTotalPrice(destination, reservationDates[destination._id]?.fromDate, reservationDates[destination._id]?.toDate)}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleReserve(destination._id)}
                                    disabled={!reservationDates[destination._id]?.fromDate || !reservationDates[destination._id]?.toDate}
                                >
                                    Reserve
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default DestinationListUser;