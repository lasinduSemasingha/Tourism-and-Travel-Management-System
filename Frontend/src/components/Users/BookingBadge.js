import React from 'react';
import { Typography, Box } from '@mui/material';
import { purple, red, grey } from '@mui/material/colors';

const BookingBadge = ({ bookings }) => {
  let badgeColor = purple[500]; // Default color
  let dotColor = purple[500]; // Default dot color
  let title = "BRONZE \n MEMBER"

  if (bookings > 10) {
    badgeColor = red[500]; // Red color
    dotColor = red[500]; // Red dot color
    title = "GOLD \n MEMBER"
  } else if (bookings > 6) {
    badgeColor = grey[500]; // Yellow color
    dotColor = grey[500]; // Yellow dot color
    title = "SILVER \n MEMBER"
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: dotColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Typography variant="body2" color="white" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default BookingBadge;
