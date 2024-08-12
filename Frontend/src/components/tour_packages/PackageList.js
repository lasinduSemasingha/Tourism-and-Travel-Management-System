import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/packages');
        setPackages(response.data);
      } catch (err) {
        setError('Error fetching packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tour Packages
      </Typography>
      <Grid container spacing={3}>
        {packages.map(pkg => (
          <Grid item xs={12} sm={6} md={4} key={pkg._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{pkg.name}</Typography>
                <Typography variant="body1">{pkg.description}</Typography>
                <Typography variant="h6">${pkg.price}</Typography>
                <Link to={`/packages/${pkg._id}`}>
                  <Button variant="contained" color="primary">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PackageList;
