import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Paper, TextField, IconButton, Snackbar } from '@mui/material';
import { Edit, Delete, CalendarToday, Group, ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [editReservation, setEditReservation] = useState(null);
    const [updatedDate, setUpdatedDate] = useState('');
    const [updatedNumOfPeople, setUpdatedNumOfPeople] = useState('');
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('userInfo'))?._id; // Retrieve user ID from localStorage

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/reservations/user/${userId}`);
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations', error);
                setError('Failed to fetch reservations');
                setOpenSnackbar(true);
            }
        };

        fetchReservations();
    }, [userId]);

    const handleUpdate = async (reservation) => {
        try {
            await axios.put(`http://localhost:5000/api/reservations/${reservation._id}`, {
                date: updatedDate || reservation.date,
                numOfPeople: updatedNumOfPeople || reservation.numOfPeople
            });
            setReservations((prev) =>
                prev.map((res) =>
                    res._id === reservation._id ? { ...res, date: updatedDate, numOfPeople: updatedNumOfPeople } : res
                )
            );
            setEditReservation(null);
            setUpdatedDate('');
            setUpdatedNumOfPeople('');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error updating reservation', error);
            setError('Failed to update reservation');
            setOpenSnackbar(true);
        }
    };

    const handleDelete = async (id) => {
        console.log('Attempting to delete reservation with ID:', id);
        try {
            const response = await axios.delete(`http://localhost:5000/api/reservations/${id}`);
            console.log('Delete response:', response.data);
            setReservations((prev) => prev.filter((res) => res._id !== id));
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error deleting reservation', error);
            setError('Failed to delete reservation');
            setOpenSnackbar(true);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', margin: '2rem auto', maxWidth: '1200px' }}>
            <Typography variant="h4" gutterBottom>
                Manage Reservations
            </Typography>
            {error && (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    message={error}
                    action={
                        <IconButton size="small" color="inherit" onClick={() => setOpenSnackbar(false)}>
                            <ErrorOutline />
                        </IconButton>
                    }
                />
            )}
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
                                        startIcon={<Edit />}
                                        onClick={() => setEditReservation(reservation)}
                                        variant="outlined"
                                        style={{ marginRight: '1rem' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        startIcon={<Delete />}
                                        onClick={() => handleDelete(reservation._id)}
                                        variant="outlined"
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {editReservation && (
                <Paper elevation={2} style={{ padding: '1rem', marginTop: '1rem' }}>
                    <Typography variant="h6">Edit Reservation</Typography>
                    <TextField
                        label="Date"
                        type="date"
                        value={updatedDate}
                        onChange={(e) => setUpdatedDate(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Number of People"
                        type="number"
                        value={updatedNumOfPeople}
                        onChange={(e) => setUpdatedNumOfPeople(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <div style={{ marginTop: '1rem' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdate(editReservation)}
                            style={{ marginRight: '1rem' }}
                        >
                            Update
                        </Button>
                        <Button onClick={() => setEditReservation(null)}>Cancel</Button>
                    </div>
                </Paper>
            )}
        </Paper>
    );
};

export default ManageReservations;
