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
            departure: query.get('departure') || '', // Provide default empty string if null
            arrival: query.get('arrival') || '',     // Provide default empty string if null
            date: query.get('date') || '',            // Provide default empty string if null
            passengers: query.get('passengers') || '' // Provide default empty string if null
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
      {tickets.length > 0 ? (
        tickets.map(ticket => (
          <Card key={ticket._id} style={{ margin: '20px', padding: '20px' }}>
            <Typography>Departure: {ticket.departure}</Typography>
            <Typography>Arrival: {ticket.arrival}</Typography>
            <Typography>Date: {new Date(ticket.travelDate).toLocaleDateString()}</Typography>
            <Typography>Price: ${ticket.price}</Typography>
            <Button href={`/tickets/${ticket._id}`}>Book Now</Button>
          </Card>
        ))
      ) : (
        <Typography>No tickets available for the given search criteria.</Typography>
      )}
    </div>
  );
};

export default TicketSearchResults;
