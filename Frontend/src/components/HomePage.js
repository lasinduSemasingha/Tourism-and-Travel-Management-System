import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Updated import

const HomePage = () => {
  let [departure, setDeparture] = useState('');
  let [arrival, setArrival] = useState('');
  let [travelDate, setTravelDate] = useState('');
  let [passengers, setPassengers] = useState('');
  let navigate = useNavigate(); // Updated to useNavigate

  const handleSearch = () => {
    navigate(`/search?departure=${departure}&arrival=${arrival}&date=${travelDate}&passengers=${passengers}`); // Updated to useNavigate
  };

  return (
    <div>
      <TextField label="Departure" value={departure} onChange={(e) => setDeparture(e.target.value)} />
      <TextField label="Arrival" value={arrival} onChange={(e) => setArrival(e.target.value)} />
      <TextField type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
      <TextField label="Number of Passengers" type="number" value={passengers} onChange={(e) => setPassengers(e.target.value)} />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default HomePage;
