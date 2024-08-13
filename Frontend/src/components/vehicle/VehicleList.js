import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, IconButton, CircularProgress } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
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
      } catch (err) {
        console.error("Error fetching vehicles:", err.response ? err.response.data : err.message);
        setError('Error fetching vehicles');
      }
    };

    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/delete/${id}`);
      setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
    } catch (err) {
      console.error("Error deleting vehicle:", err.response ? err.response.data : err.message);
      setError('Error deleting vehicle');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1rem' }}>
        All Vehicles
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/vehicle/add')}
        style={{ marginBottom: '1rem' }}
      >
        Add Vehicle
      </Button>

      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={1}>
        {vehicles.map(vehicle => (
          <Grid item xs={12} sm={6} md={4} key={vehicle._id}>
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
                  paddingTop: '100%', // 1:1 Aspect Ratio
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
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => navigate(`/vehicle/update/${vehicle._id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => handleDelete(vehicle._id)}
                    disabled={deletingId === vehicle._id}
                  >
                    {deletingId === vehicle._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Delete />
                    )}
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VehicleList;
