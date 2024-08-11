import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../css/homepage.css';

const TicketFilter = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (departure) queryParams.append('departure', departure);
    if (arrival) queryParams.append('arrival', arrival);
    if (travelDate) queryParams.append('date', travelDate);
    if (passengers) queryParams.append('passengers', passengers);

    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <div className='container'>
      <TextField
        label="Departure"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
      />
      <TextField
        label="Arrival"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
      />
      <TextField
        type="date"
        value={travelDate}
        onChange={(e) => setTravelDate(e.target.value)}
      />
      <TextField
        label="Number of Passengers"
        type="number"
        value={passengers}
        onChange={(e) => setPassengers(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default TicketFilter;
