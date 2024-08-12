import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Card, CardContent, Avatar, IconButton, CircularProgress, Alert } from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const UserProfilePage = () => {
  const { users } = useAuth();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  console.log("userID : ",userInfo._id);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userInfo._id}`);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          address: response.data.address,
          country: response.data.country,
          gender: response.data.gender,
        });
      } catch (err) {
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userInfo._id}`, formData); // Replace with actual user ID
      setUser(prevUser => ({ ...prevUser, ...formData }));
      setEditing(false);
    } catch (err) {
      setError('Error updating user profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      address: user.address,
      country: user.country,
      gender: user.gender,
    });
    setEditing(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
              <Avatar
                alt={user.name}
                src="/profile-picture.jpg" // Replace with actual profile picture URL
                sx={{ width: 100, height: 100, margin: 'auto' }}
              />
              <Typography variant="h6" gutterBottom>{user.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6" gutterBottom>Profile Information</Typography>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={!editing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!editing}
                margin="normal"
              />
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                {editing ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                      startIcon={<Save />}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancel}
                      startIcon={<Cancel />}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditing(true)}
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfilePage;