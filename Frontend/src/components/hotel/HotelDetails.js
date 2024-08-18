// src/pages/HotelDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

const HotelDetails = () => {
  const { id } = useParams(); // Get the hotel ID from the URL
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchHotel();
  }, [id]);

  if (!hotel) return <p>Loading...</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {hotel.name}
      </Typography>
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
          <Typography variant="body1" paragraph>
            Address: {hotel.address}
          </Typography>
          <Typography variant="body1" paragraph>
            Contact: {hotel.contactNumber}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HotelDetails;
