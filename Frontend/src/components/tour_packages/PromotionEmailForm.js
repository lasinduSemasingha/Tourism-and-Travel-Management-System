// components/PromotionEmailForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const PromotionEmailForm = () => {
  const [emailDetails, setEmailDetails] = useState({
    to: '',
    subject: '',
    text: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/email/send', emailDetails);
      setSuccess(response.data.message);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Send Promotional Email
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Recipient Email"
          name="to"
          value={emailDetails.to}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Subject"
          name="subject"
          value={emailDetails.subject}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Text Body"
          name="text"
          value={emailDetails.text}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Send Email
        </Button>
      </form>
      {success && <Alert severity="success" style={{ marginTop: '1rem' }}>{success}</Alert>}
      {error && <Alert severity="error" style={{ marginTop: '1rem' }}>{error}</Alert>}
    </Container>
  );
};

export default PromotionEmailForm;
