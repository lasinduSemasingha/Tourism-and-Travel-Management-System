import React from 'react';
import { Link } from 'react-router-dom';
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
    url: '/ella.jpg',
    title: 'Ella',
    link: '/ella',
  },
  {
    url: '/stupa.jpg',
    title: 'Stupa',
    link: '/stupa',
  },
  {
    url: '/example1.jpg',
    title: 'Example 1',
    link: '/example1',
  },
  {
    url: '/example2.jpg',
    title: 'Example 2',
    link: '/example2',
  },
  {
    url: '/example3.jpg',
    title: 'Example 3',
    link: '/example3',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative', // Increased height
  margin: '10px',
  width: 400,
  height: 400,
  [theme.breakpoints.down('sm')]: {
    height: '100px', // Adjusted height for small screens
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '5px solid white',
      height: -70
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
  return (
    <Box sx={{ flexGrow: 1, padding: '40px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Select Your Option</Typography>
      <Grid container spacing={2} justifyContent="center">
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.title}>
            <ImageButton component={Link} to={image.link} style={{ height: '100%' }}>
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Typography
                component="span"
                variant="h5"
                color="inherit"
                sx={{
                  color: 'white',
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 10px)`,
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
}

export default CategoryBoxes;
