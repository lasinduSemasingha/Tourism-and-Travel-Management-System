import React from 'react';
import '../../css/homepage.css';
import SlideShow from './HomePageSlider/SlidShow';
import CategoryBoxes from './CategoryBoxes';
import FeedbackGrid from '../Feedback/FeedbackGrid';

const HomePage = () => {
  return (
    <>
      <h1>Welcome to Travel Sphere</h1>
      <div className='container'><SlideShow /></div><br /><br />
      <CategoryBoxes />
      <FeedbackGrid />
    </>
  );
};

export default HomePage;
