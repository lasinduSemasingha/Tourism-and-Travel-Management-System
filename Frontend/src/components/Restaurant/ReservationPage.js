import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CalendarToday, People, Feedback } from '@mui/icons-material';
import axios from 'axios';

const ReservationPage = ({ match }) => {
    const [reservationDetails, setReservationDetails] = useState({ date: '', numOfPeople: '' });
    const [feedback, setFeedback] = useState('');
    const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const restaurantId = match.params.id;

    const handleReservation = async () => {
        try {
            await axios.post(`http://localhost:5000/api/restaurant-reservations`, { restaurantId, ...reservationDetails });
            setSuccess('Reservation confirmed!');
            setOpenFeedbackDialog(true);
            setError('');
        } catch (err) {
            setError('Error making reservation');
        }
    };

    const handleFeedbackSubmit = async () => {
        try {
            await axios.post(`http://localhost:5000/api/feedback`, { restaurantId, feedback });
            setFeedback('');
            setOpenFeedbackDialog(false);
            setSuccess('Feedback submitted!');
            setError('');
        } catch (err) {
            setError('Error submitting feedback');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Make a Reservation
            </Typography>
            <TextField
                label="Reservation Date"
                type="date"
                value={reservationDetails.date}
                onChange={(e) => setReservationDetails({ ...reservationDetails, date: e.target.value })}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    startAdornment: (
                        <CalendarToday />
                    ),
                }}
            />
            <TextField
                label="Number of People"
                type="number"
                value={reservationDetails.numOfPeople}
                onChange={(e) => setReservationDetails({ ...reservationDetails, numOfPeople: e.target.value })}
                fullWidth
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <People />
                    ),
                }}
            />
            <Button variant="contained" color="primary" onClick={handleReservation}>
                Reserve
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
            
            {/* Feedback Dialog */}
            <Dialog open={openFeedbackDialog} onClose={() => setOpenFeedbackDialog(false)}>
                <DialogTitle>Leave Your Feedback</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <Feedback />
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFeedbackDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleFeedbackSubmit} color="primary">
                        Submit Feedback
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ReservationPage;
