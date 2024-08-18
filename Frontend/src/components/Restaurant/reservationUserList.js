import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Paper, TextField, IconButton, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete, CalendarToday, Group, ErrorOutline, CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ReservationUserList = () => {
    const [reservations, setReservations] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentReservation, setCurrentReservation] = useState(null);
    const [updatedDate, setUpdatedDate] = useState('');
    const [updatedNumOfPeople, setUpdatedNumOfPeople] = useState('');
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('userInfo'))?._id;

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/restaurant-reservations/user/${userId}`);
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations', error);
                setSnackbarMessage('Failed to fetch reservations');
                setSnackbarOpen(true);
            }
        };

        fetchReservations();
    }, [userId]);

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

    const handleUpdate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/restaurant-reservations/${id}`, {
                date: updatedDate,
                numOfPeople: updatedNumOfPeople
            });
            setReservations((prev) => prev.map((res) => res._id === id ? { ...res, date: updatedDate, numOfPeople: updatedNumOfPeople } : res));
            setSnackbarMessage('Reservation updated successfully');
            setSnackbarOpen(true);
            setOpenDialog(false);
        } catch (error) {
            console.error('Error updating reservation', error);
            setSnackbarMessage('Failed to update reservation');
            setSnackbarOpen(true);
        }
    };

    const handleOpenDialog = (reservation) => {
        setCurrentReservation(reservation);
        setUpdatedDate(reservation.date);
        setUpdatedNumOfPeople(reservation.numOfPeople);
        setOpenDialog(true);
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
                                        startIcon={<Edit />}
                                        onClick={() => handleOpenDialog(reservation)}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        startIcon={<Delete />}
                                        onClick={() => handleDelete(reservation._id)}
                                        variant="outlined"
                                        color="error"
                                        style={{ marginLeft: '0.5rem' }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Update Reservation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Update Reservation</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Reservation Date"
                        type="date"
                        value={updatedDate}
                        onChange={(e) => setUpdatedDate(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Number of People"
                        type="number"
                        value={updatedNumOfPeople}
                        onChange={(e) => setUpdatedNumOfPeople(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputProps={{ inputProps: { min: 1 } }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleUpdate(currentReservation._id)} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ReservationUserList;
