import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Button, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/activities');
        setActivities(response.data);
      } catch (err) {
        setError('Error fetching activities');
      }
    };

    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/activities/${id}`);
      setActivities(activities.filter(activity => activity._id !== id));
    } catch (err) {
      setError('Error deleting activity');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedActivity = {
        name: updatedName,
        location: updatedLocation,
        price: updatedPrice,
        description: updatedDescription,
      };
      await axios.put(`http://localhost:5000/api/activities/${id}`, updatedActivity);
      setActivities(activities.map(activity => activity._id === id ? { ...activity, ...updatedActivity } : activity));
      setOpenDialog(false);
    } catch (err) {
      setError('Error updating activity');
    }
  };

  const handleOpenDialog = (activity) => {
    setCurrentActivity(activity);
    setUpdatedName(activity.name);
    setUpdatedLocation(activity.location);
    setUpdatedPrice(activity.price);
    setUpdatedDescription(activity.description);
    setOpenDialog(true);
  };

  // Function to generate and download PDF
  const generatePDF = async () => {
    const input = document.getElementById('pdf-content');
    const canvas = await html2canvas(input);
    const data = canvas.toDataURL('image/png');
    const doc = new jsPDF('p', 'mm', 'a4');
    
    doc.addImage(data, 'PNG', 10, 10, 190, 0);
    doc.save('activities_report.pdf');
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '0 16px' }}>
      <Typography variant="h4" gutterBottom>
        Activities
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      {/* Button to generate PDF report */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: '16px' }}
        onClick={generatePDF}
      >
        Generate PDF Report
      </Button>

      <div id="pdf-content" style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" gutterBottom>
          Activities Report
        </Typography>
        <Grid container spacing={3}>
          {activities.map(activity => (
            <Grid item xs={12} sm={6} md={4} key={activity._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{activity.name}</Typography>
                  <Typography variant="body1">{activity.location}</Typography>
                  <Typography variant="body2">Price: ${activity.price}</Typography>
                  <Typography variant="body2">{activity.description}</Typography>
                  <IconButton color="primary" onClick={() => handleOpenDialog(activity)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(activity._id)}>
                    <Delete />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Update Activity Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Activity</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            label="Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(currentActivity._id)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ActivityList;
