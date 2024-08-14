import React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const images = [
  {
    url: '/ticket.jpg',
    title: 'Book a Ticket',
    link: '/tickets',
  },
  {
    url: '/hotel.jpg',
    title: 'Hotel & Accommodation',
    link: '/ella',
  },
  {
    url: '/stupa.jpg',
    title: 'Tour Packages',
    link: '/packages',
  },
  {
    url: '/food.jpg',
    title: 'Restaurants',
    link: '/example1',
  },
  {
    url: '/sports.jpg',
    title: 'Special Activities',
    link: '/activity-list',
  },
  {
    url: '/vehicle.jpg',
    title: 'Vehicle Reservation',
    link: '/vehicleuser',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '300px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.6
    },
    '& .MuiTypography-root': {
      border: '5px solid white',
      opacity: 1,
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

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const CategoryBoxes = () => {
  const handleClick = (link) => {
    window.location.href = link;
  };

  return (
    <Box sx={{ flexGrow: 1, padding: '40px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Select Your Option</Typography>
      <Grid container spacing={2} justifyContent="center">
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.title}>
            <ImageButton onClick={() => handleClick(image.link)}>
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
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
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </ImageButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryBoxes;
