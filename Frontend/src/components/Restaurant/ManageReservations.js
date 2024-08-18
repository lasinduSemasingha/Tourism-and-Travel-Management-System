import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Paper, TextField, IconButton, Snackbar } from '@mui/material';
import { Edit, Delete, CalendarToday, Group, ErrorOutline, CheckCircleOutline, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/restaurant-reservations');
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations', error);
                setSnackbarMessage('Failed to fetch reservations');
                setSnackbarOpen(true);
            }
        };

        fetchReservations();
    }, []);
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/restaurant-reservations/${id}`);
            setReservations((prev) => prev.filter((res) => res._id !== id));
            setSnackbarMessage('Reservation deleted successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting reservation', error);
            setSnackbarMessage('Failed to delete reservation');
            setSnackbarOpen(true);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', margin: '2rem auto', maxWidth: '1200px' }}>
            <Typography variant="h4" gutterBottom>
                Manage Reservations
            </Typography>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                action={
                    <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
                        {snackbarMessage.includes('Failed') ? <ErrorOutline /> : <CheckCircleOutline />}
                    </IconButton>
                }
            />
            <Grid container spacing={2}>
                {reservations.map((reservation) => (
                    <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">{reservation.restaurantId.name}</Typography>
                                <Typography variant="body1">
                                    <CalendarToday style={{ verticalAlign: 'middle' }} /> Date: {new Date(reservation.date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2">
                                    <Group style={{ verticalAlign: 'middle' }} /> Number of People: {reservation.numOfPeople}
                                </Typography>
                                <div style={{ marginTop: '1rem' }}>
                                    <Button
                                        startIcon={<Delete />}
                                        onClick={() => handleDelete(reservation._id)}
                                        variant="outlined"
                                        color="error"
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default ManageReservations;
