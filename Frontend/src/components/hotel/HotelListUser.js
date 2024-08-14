import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HotelListUser = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [reservingId, setReservingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hotels');
        const hotelsWithImages = await Promise.all(response.data
          .filter(hotel => hotel.approvalStatus === 'approved')
          .map(async (hotel) => {
            if (hotel.image) {
              const imageResponse = await axios.get(`http://localhost:5000/api/hotels/image/${hotel._id}`);
              return { ...hotel, image: imageResponse.data.imgSrc };
            }
            return hotel;
          })
        );
        setHotels(hotelsWithImages);
      } catch (err) {
        console.error("Error fetching hotels:", err.response ? err.response.data : err.message);
        setError('Error fetching hotels');
      }
    };

    fetchHotels();
  }, []);

  const handleReserve = async (id) => {
    setReservingId(id);
    try {
      const hotel = hotels.find(h => h._id === id);
      if (!hotel) {
        setError('Hotel not found');
        return;
      }

      // Replace this URL with your actual reservation endpoint
      await axios.post('http://localhost:5000/api/hotelreservations/hoteladd', {
        hotelId: id,
        userId: JSON.parse(localStorage.getItem('userInfo'))._id,
      });

      // Redirect to reservation confirmation page
      navigate('/reservation-confirmation', { state: { hotelId: id } });
    } catch (err) {
      console.error("Error reserving hotel:", err.response ? err.response.data : err.message);
      setError('Error reserving hotel');
    } finally {
      setReservingId(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1rem' }}>
        Approved Hotels
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={1}>
        {hotels.map(hotel => (
          <Grid item xs={12} sm={6} md={4} key={hotel._id}>
            <Card
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '75%', // Adjusted aspect ratio
                }}
              >
                {hotel.image && (
                  <img
                    src={hotel.image}
                    alt="Hotel"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </div>
              <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                <Typography variant="h6" component="h2" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {hotel.name}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                  Location: {hotel.address}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                  Price: ${hotel.price}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                  Status: {hotel.approvalStatus}
                </Typography>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReserve(hotel._id)}
                    disabled={reservingId === hotel._id}
                  >
                    {reservingId === hotel._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      'Reserve'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HotelListUser;
