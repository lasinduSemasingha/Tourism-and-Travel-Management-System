import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';

const AdminDiscountCodePage = () => {
  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState('');
  const [error, setError] = useState(null);

  const handleCreateDiscountCode = async () => {
    try {
      await axios.post('http://localhost:5000/api/discount-codes', { code, percentage });
      alert('Discount code created!');
      setCode('');
      setPercentage('');
    } catch (err) {
      setError('Error creating discount code.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Create Discount Code
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        label="Discount Code"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Discount Percentage"
        type="number"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateDiscountCode}
        fullWidth
        style={{ marginTop: '1rem' }}
      >
        Create Discount Code
      </Button>
    </Container>
  );
};

export default AdminDiscountCodePage;
