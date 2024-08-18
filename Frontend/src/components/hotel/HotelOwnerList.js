// src/components/HotelList.js

import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button, IconButton } from '@mui/material';
import { Info, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch hotels from the server
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hotels'); // Adjust the endpoint as needed
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Hotels
      </Typography>
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel._id}>
            <Card>
              {hotel.image && hotel.image.data ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={`data:${hotel.image.contentType};base64,${hotel.image.data.toString('base64')}`}
                  alt={hotel.name}
                />
              ) : (
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/300x140?text=No+Image"
                  alt="No image available"
                />
              )}
              <CardContent>
                <Typography variant="h6">{hotel.name}</Typography>
                <Typography color="textSecondary">{hotel.city}, {hotel.country}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {hotel.price} per night
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {hotel.roomType}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Info />}
                onClick={() => navigate(`/hotels/${hotel._id}`)} // Navigate to hotel details
              >
                View Details
              </Button>
              <IconButton color="error" aria-label="delete" onClick={() => handleDelete(hotel._id)}>
                <Delete />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  // Function to handle hotel deletion
  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`); // Ensure this endpoint is correct
      setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };
};

export default HotelList;
