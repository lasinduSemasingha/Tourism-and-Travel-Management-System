import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, InputLabel, FormControl, InputAdornment } from '@mui/material';
import axios from 'axios';
import { AccountCircle, Email, Lock } from '@mui/icons-material';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const managerRoles = [
        'User and Destination Manager',
        'Ticketing Manager',
        'Accommodation Manager',
        'Tour Manager',
        'Restaurant Manager',
        'Activity Manager',
        'Vehicle Manager',
        'Item Manager'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form Data:', formData);

        try {
            const response = await axios.post('http://localhost:5000/api/admin/create', formData);
            setSuccess('Admin registered successfully');
            setError('');
        } catch (err) {
            console.error('Error response:', err.response);
            setError('Error registering admin');
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Admin Registration
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="manager-role-label">Manager Role</InputLabel>
                    <Select
                        labelId="manager-role-label"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                    >
                        {managerRoles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                    Register Admin
                </Button>
            </form>
        </Container>
    );
};

export default AdminRegister;
