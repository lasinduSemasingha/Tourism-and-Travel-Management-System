import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const TicketBookingPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [numOfPassengers, setNumOfPassengers] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      const response = await axios.get(`/api/tickets/${id}`);
      setTicket(response.data);
    };
    fetchTicket();
  }, [id]);

  const handleBooking = async () => {
    await axios.post('/api/tickets', {
      ticketId: id,
      numOfPassengers,
      totalAmount,
    });
    // Handle booking confirmation
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div>
      <Typography>Departure: {ticket.departure}</Typography>
      <Typography>Arrival: {ticket.arrival}</Typography>
      <Typography>Date: {new Date(ticket.travelDate).toLocaleDateString()}</Typography>
      <Typography>Price per Seat: ${ticket.price}</Typography>
      <TextField label="Number of Passengers" type="number" value={numOfPassengers} onChange={(e) => setNumOfPassengers(e.target.value)} />
      <TextField label="Total Amount" type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
      <Button onClick={handleBooking}>Confirm Booking</Button>
    </div>
  );
};

export default TicketBookingPage;
