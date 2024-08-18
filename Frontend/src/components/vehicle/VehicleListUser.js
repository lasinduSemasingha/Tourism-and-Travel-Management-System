import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, CircularProgress, TextField, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const VehicleListUser = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [reservingId, setReservingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehicles');
        const vehiclesWithImages = await Promise.all(response.data.map(async (vehicle) => {
          if (vehicle.image) {
            const imageResponse = await axios.get(`http://localhost:5000/api/vehicles/image/${vehicle._id}`);
            return { ...vehicle, image: imageResponse.data.imgSrc };
          }
          return vehicle;
        }));
        setVehicles(vehiclesWithImages);
        setFilteredVehicles(vehiclesWithImages); // Initialize filteredVehicles
      } catch (err) {
        console.error("Error fetching vehicles:", err.response ? err.response.data : err.message);
        setError('Error fetching vehicles');
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    // Filter vehicles based on search query
    const filtered = vehicles.filter(vehicle =>
      vehicle.vehicleType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVehicles(filtered);
  }, [searchQuery, vehicles]);

  const handleReserve = async (id) => {
    setReservingId(id);
    try {
      const vehicle = vehicles.find(v => v._id === id);
      if (!vehicle) {
        setError('Vehicle not found');
        return;
      }

      await axios.post('http://localhost:5000/api/vehiclereservations/vehicleadd', {
        vehicleId: id,
        userId: JSON.parse(localStorage.getItem('userInfo'))._id,
      });

      // Redirect to checkout page with vehicle details
      navigate('/checkout', { state: { vehicleId: id, vehicleType: vehicle.vehicleType, rentalPrice: vehicle.rentalPrice } });
    } catch (err) {
      console.error("Error reserving vehicle:", err.response ? err.response.data : err.message);
      setError('Error reserving vehicle');
    } finally {
      setReservingId(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1rem' }}>
        All Vehicles
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="Search Vehicles"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={1}>
        {filteredVehicles.map(vehicle => (
          <Grid item xs={12} sm={6} md={3} key={vehicle._id}>
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
                {vehicle.image && (
                  <img
                    src={vehicle.image}
                    alt="Vehicle"
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
                  {vehicle.vehicleType}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                  Registration: {vehicle.registrationNumber}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                  Price: ${vehicle.rentalPrice}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '0.5rem' }}>
                  Status: {vehicle.status}
                </Typography>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReserve(vehicle._id)}
                    disabled={reservingId === vehicle._id}
                  >
                    {reservingId === vehicle._id ? (
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

export default VehicleListUser;
