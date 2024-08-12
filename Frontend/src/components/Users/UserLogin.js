import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Card, CardContent, InputAdornment, IconButton } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            if (response.data && response.data._id) {
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                window.location.href = '/'; // Redirect to DestinationListUser page
            } else {
                setError('Login failed: User information is missing.');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center">
                        User Login
                    </Typography>
                    {error && <Typography color="error" align="center" paragraph>{error}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default UserLogin;
