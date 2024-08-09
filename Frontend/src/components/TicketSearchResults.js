import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, Typography } from '@mui/material';
import axios from 'axios';

const TicketSearchResults = () => {
  const [tickets, setTickets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets', {
          params: {
            departure: query.get('departure'),
            arrival: query.get('arrival'),
            travelDate: query.get('date'),
          }
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, [location.search]);

  return (
    <div>
      {tickets.map(ticket => (
        <Card key={ticket._id}>
          <Typography>Departure: {ticket.departure}</Typography>
          <Typography>Arrival: {ticket.arrival}</Typography>
          <Typography>Date: {new Date(ticket.travelDate).toLocaleDateString()}</Typography>
          <Typography>Price: ${ticket.price}</Typography>
          <Button href={`/booking/${ticket._id}`}>Book Now</Button>
        </Card>
      ))}
    </div>
  );
};

export default TicketSearchResults;
