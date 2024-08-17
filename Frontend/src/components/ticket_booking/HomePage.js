import React from 'react';
import '../../css/homepage.css';
import SlideShow from './HomePageSlider/SlidShow';
import CategoryBoxes from './CategoryBoxes';
import FeedbackList from '../Feedback/Feedback';

const HomePage = () => {
  return (
    <>
      <h1>Welcome to Travel Sphere</h1>
      <div className='container'><SlideShow /></div><br /><br />
      <CategoryBoxes />
      <FeedbackList />
    </>
  );
};

export default HomePage;
