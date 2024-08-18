import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

const PackageDetails = () => {
  const { id } = useParams(); // Get the route parameter using useParams
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setPackageData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching package details');
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]); // Dependency array includes id

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      {packageData && (
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {packageData.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: ${packageData.price}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Description:</strong> {packageData.description}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Accommodations:</strong> {packageData.accommodations}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Tours:</strong> {packageData.tours}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Transfers:</strong> {packageData.transfers}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Special Discounts:</strong> {packageData.specialDiscounts}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default PackageDetails;
