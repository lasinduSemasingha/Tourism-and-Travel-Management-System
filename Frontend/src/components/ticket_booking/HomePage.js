import React from 'react';
import '../../css/homepage.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Bookmark } from '@mui/icons-material';
import SlideShow from './HomePageSlider/SlidShow';
import CategoryBoxes from './CategoryBoxes';

const HomePage = () => {
  return (
    <>
      <h1>Welcome to Travel Sphere</h1>
      <div className='container'><SlideShow /></div><br /><br />
      <CategoryBoxes />
    </>
  );
};

export default HomePage;
