import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, IconButton, CircularProgress } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DestinationList = () => {
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/destinations');
                setDestinations(response.data);
            } catch (err) {
                console.error("Error fetching destinations:", err.response ? err.response.data : err.message);
                setError('Error fetching destinations');
            }
        };

        fetchDestinations();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await axios.delete(`http://localhost:5000/api/destinations/${id}`);
            setDestinations(destinations.filter(destination => destination._id !== id));
        } catch (err) {
            console.error("Error deleting destination:", err.response ? err.response.data : err.message);
            setError('Error deleting destination');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            <Typography variant="h4">All Destinations</Typography>
            
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/destination/add')}
                style={{ marginBottom: '20px' }}
            >
                Add Destination
            </Button>

            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={3}>
                {destinations.map(destination => (
                    <Grid item xs={12} sm={6} md={4} key={destination._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{destination.name}</Typography>
                                <Typography variant="body1">{destination.location}</Typography>
                                <Typography variant="body2">Price: ${destination.price}</Typography>
                                <Typography variant="body2">{destination.description}</Typography>
                                <IconButton
                                    color="primary"
                                    aria-label="edit"
                                    onClick={() => navigate(`/destination/update/${destination._id}`)}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    aria-label="delete"
                                    onClick={() => handleDelete(destination._id)}
                                    disabled={deletingId === destination._id}
                                >
                                    {deletingId === destination._id ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        <Delete />
                                    )}
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default DestinationList;