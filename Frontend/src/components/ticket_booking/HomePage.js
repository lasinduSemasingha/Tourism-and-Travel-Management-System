import React, { useState } from 'react';
import '../../css/homepage.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Bookmark } from '@mui/icons-material';

const HomePage = () => {
  
  return (
    <>
      <h1>Home Page</h1>
      <Button variant='contained' startIcon={<Bookmark />} color="success" component={Link} to="/tickets">Book a Ticket</Button>
    </>
  );
};

export default HomePage;
