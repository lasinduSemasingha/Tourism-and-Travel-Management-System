import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Snackbar, Alert, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LocationOn, AttachMoney, Description, FlightTakeoff } from '@mui/icons-material';

const AddDestination = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        description: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/destinations/add', formData);
            setSuccessMessage('Destination added successfully!');
            setFormData({
                name: '',
                location: '',
                price: '',
                description: '',
            });
            setTimeout(() => {
                navigate('/destination'); // Redirect to the destination list page
            }, 1000);
        } catch (err) {
            console.error("Error adding destination:", err.response ? err.response.data : err.message);
            setError('Error adding destination');
        }
    };

    return (
        <Container component="main" maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add New Destination
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FlightTakeoff />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOn />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoney />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Description />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                        Add Destination
                    </Button>
                </form>
                {successMessage && (
                    <Snackbar
                        open={!!successMessage}
                        autoHideDuration={6000}
                        onClose={() => setSuccessMessage('')}
                    >
                        <Alert onClose={() => setSuccessMessage('')} severity="success">
                            {successMessage}
                        </Alert>
                    </Snackbar>
                )}
                {error && (
                    <Snackbar
                        open={!!error}
                        autoHideDuration={6000}
                        onClose={() => setError(null)}
                    >
                        <Alert onClose={() => setError(null)} severity="error">
                            {error}
                        </Alert>
                    </Snackbar>
                )}
            </Paper>
        </Container>
    );
};

export default AddDestination;
