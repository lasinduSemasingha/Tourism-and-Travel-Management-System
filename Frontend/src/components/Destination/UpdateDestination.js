import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const UpdateDestination = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        description: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                console.log("Fetching destination with ID:", id);
                const response = await axios.get(`http://localhost:5000/api/destinations/${id}`);
                console.log("API Response:", response.data);
                
                if (Array.isArray(response.data) && response.data.length > 0) {
                    // Find the destination with the matching ID
                    const destination = response.data.find(dest => dest._id === id);
                    
                    if (destination) {
                        const { name, location, price, description } = destination;
                        console.log("Extracted data:", { name, location, price, description });
                        
                        setFormData(prevState => ({
                            ...prevState,
                            name: name || '',
                            location: location || '',
                            price: price ? price.toString() : '',
                            description: description || '',
                        }));
                        console.log("FormData set:", { name, location, price, description });
                    } else {
                        console.error("Destination not found in the response");
                        setError('Destination not found');
                    }
                } else {
                    console.error("Invalid response format from the server");
                    setError('Invalid response format from the server');
                }
            } catch (err) {
                console.error("Error fetching destination:", err);
                setError(`Error fetching destination: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [id]);

    useEffect(() => {
        console.log("FormData updated:", formData);
    }, [formData]); // Log whenever formData changes

    const handleChange = (e) => {
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await axios.put(`http://localhost:5000/api/destinations/${id}`, formData);
            setSuccessMessage('Destination updated successfully!');
            setTimeout(() => {
                navigate('/destination');
            }, 2000);
        } catch (err) {
            console.error("Error updating destination:", err.response ? err.response.data : err.message);
            setError('Error updating destination. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>Update Destination</Typography>
            {error && <Typography color="error" gutterBottom>{error}</Typography>}
            {successMessage && <Typography color="success" gutterBottom>{successMessage}</Typography>}
            
            <Typography variant="body2" gutterBottom>
                Debug - Current formData: {JSON.stringify(formData)}
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
                    type="text"
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
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    disabled={submitting}
                    sx={{ mt: 2 }}
                >
                    {submitting ? <CircularProgress size={24} /> : 'Update Destination'}
                </Button>
            </form>
        </Box>
    );
};

export default UpdateDestination;