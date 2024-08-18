import React from 'react';
import { Box, ButtonBase, Typography, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const categories = [
  { title: 'Manage Users', link: '/admin/users', image: '/users.jpg' },
  { title: 'Manage Reservations', link: '/admin/reservations', image: '/reservation.jpg' },
  { title: 'Manage Restaurants', link: '/admin/restaurants', image: '/food.jpg' },
  { title: 'Manage Tickets', link: '/admin/tickets', image: '/ticket.jpg' },
  { title: 'Manage Hotels', link: '/admin/hotellist', image: '/hotel.jpg' },
  { title: 'Manage Tours', link: '/admin/tours', image: '/tour.jpg' },
  { title: 'Manage Vehicles', link: '/admin/vehicles', image: '/vehicle.jpg' },
  { title: 'Add Activities', link: '/admin/activity', image: '/sports.jpg' },
  { title: 'Add Tour Packages', link: '/admin/package-manager', image: '/package.jpg' },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiTypography-root': {
      border: '5px solid white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const AdminDashboard = () => {
  const handleClick = (link) => {
    window.location.href = link;
  };

  return (
    <Paper elevation={3} style={{ padding: '2rem', margin: '2rem auto', maxWidth: '1200px' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginRight: '1rem' }} 
          onClick={() => handleClick('/admin/register')}
        >
          Register Admin
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => handleClick('/hotelowner/register')}
        >
          Register Hotel Owner
        </Button>
      </Box>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.title}>
            <ImageButton onClick={() => handleClick(category.link)}>
              <ImageSrc style={{ backgroundImage: `url(${category.image})` }} />
              <Typography
                component="span"
                variant="h5"
                color="inherit"
                sx={{
                  color: 'white',
                  position: 'absolute',
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  opacity: 0.8,
                  transition: 'opacity 0.3s',
                  width: '80%',
                  maxWidth: '300px',
                  borderRadius: '8px',
                }}
              >
                {category.title}
              </Typography>
            </ImageButton>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default AdminDashboard;
