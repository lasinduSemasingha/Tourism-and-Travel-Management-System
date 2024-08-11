import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <Typography variant="h4">Add New Destination</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
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
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Destination
                </Button>
            </form>
            {successMessage && <Typography color="success">{successMessage}</Typography>}
            {error && <Typography color="error">{error}</Typography>}
        </div>
    );
};

export default AddDestination;
