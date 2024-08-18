import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Box, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setSnackbarMessage('Message sent successfully!');
            setSnackbarSeverity('success');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        } catch (error) {
            console.error('Error sending message:', error);
            setSnackbarMessage('Failed to send message. Please try again later.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '3rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    We would love to hear from you! Please reach out to us using the information below, or fill out the contact form.
                </Typography>
                <Grid container spacing={3} style={{ marginTop: '2rem' }}>
                    <Grid item xs={12} sm={4}>
                        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                            <Email color="primary" fontSize="large" />
                            <Typography variant="h6">Email</Typography>
                            <Typography variant="body2">contact@travelsphere.com</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                            <Phone color="primary" fontSize="large" />
                            <Typography variant="h6">Phone</Typography>
                            <Typography variant="body2">+1 (555) 123-4567</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                            <LocationOn color="primary" fontSize="large" />
                            <Typography variant="h6">Location</Typography>
                            <Typography variant="body2">123 Travel Lane, Wanderlust City</Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Your Name"
                                    name="name"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Your Email"
                                    name="email"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Subject"
                                    name="subject"
                                    variant="outlined"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Message"
                                    name="message"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button variant="contained" color="primary" size="large" type="submit">
                                    Send Message
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ContactUs;
